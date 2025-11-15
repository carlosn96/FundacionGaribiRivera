<?php
class AdminLLM extends Admin
{
    private const MAX_RETRIES = 2;
    private const RETRY_DELAY_MS = 1000;
    
    public function __construct()
    {
        parent::__construct(new LogDAO());
    }

    /**
     * Realiza una llamada optimizada a la API de Z.AI con reintentos automáticos
     */
    public function callTextZAI($msg)
    {
        // Verificar constantes necesarias
        if (!defined('MODEL_NAME') || !defined('Z_AI_KEY') || !defined('REQUEST_URL_Z_AI')) {
            return Util::enum("Faltan constantes de configuración para la API de Z.AI.", true);
        }

        // Preparar datos para la solicitud
        $data = [
            "model" => MODEL_NAME,
            "messages" => [
                ["role" => "user", "content" => $msg]
            ],
            "temperature" => 0.3,
            "max_tokens" => 4000
        ];

        $payload = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        
        // Configurar cabeceras optimizadas
        $headers = [
            "Authorization: Bearer " . Z_AI_KEY,
            "Content-Type: application/json; charset=utf-8",
            "Accept: application/json",
            "Accept-Language: es-MX,es;q=0.9",
            "Accept-Encoding: gzip, deflate",
            "Content-Length: " . strlen($payload),
            "Connection: keep-alive",
            "User-Agent: PHP-App/1.0"
        ];

        // Intentar la llamada con reintentos
        $lastError = null;
        for ($attempt = 0; $attempt <= self::MAX_RETRIES; $attempt++) {
            if ($attempt > 0) {
                usleep(self::RETRY_DELAY_MS * 1000 * $attempt); // Backoff exponencial
            }

            $result = $this->_executeCurlRequest(REQUEST_URL_Z_AI, $payload, $headers);
            
            if (!$result['error']) {
                return Util::enum($result['content'], false);
            }
            
            $lastError = $result['message'];
            
            // No reintentar en errores 4xx (client errors)
            if ($result['http_code'] >= 400 && $result['http_code'] < 500) {
                break;
            }
        }

        return Util::enum("Error en la API de Z.AI: {$lastError}", true);
    }

    /**
     * Ejecuta la petición cURL optimizada
     */
    private function _executeCurlRequest(string $url, string $payload, array $headers): array
    {
        $ch = curl_init($url);
        
        curl_setopt_array($ch, [
            // Configuración básica
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_HTTPHEADER => $headers,
            
            // Timeouts optimizados
            CURLOPT_TIMEOUT => 90,
            CURLOPT_CONNECTTIMEOUT => 15,
            
            // Seguridad SSL
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_SSL_VERIFYHOST => 2,
            
            // Optimizaciones de red
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_2_0,
            CURLOPT_TCP_KEEPALIVE => 1,
            CURLOPT_TCP_KEEPIDLE => 120,
            CURLOPT_TCP_KEEPINTVL => 60,
            
            // Compresión automática
            CURLOPT_ENCODING => '', // Acepta todas las codificaciones soportadas
            
            // No seguir redirecciones para APIs
            CURLOPT_FOLLOWLOCATION => false,
            CURLOPT_MAXREDIRS => 0,
            
            // Información detallada para debugging
            CURLOPT_VERBOSE => false,
            
            // Deshabilitar señales (para PHP en servidores con señales)
            CURLOPT_NOSIGNAL => 1,
        ]);

        // Ejecutar solicitud
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        $curlErrno = curl_errno($ch);
        curl_close($ch);

        // Manejar errores de cURL
        if ($response === false) {
            return [
                'error' => true,
                'message' => "Error de conexión: {$curlError} (código {$curlErrno})",
                'http_code' => 0,
                'content' => null
            ];
        }

        // Verificar respuesta HTTP
        if ($httpCode < 200 || $httpCode >= 300) {
            $errorMsg = $this->_parseErrorResponse($response, $httpCode);
            return [
                'error' => true,
                'message' => $errorMsg,
                'http_code' => $httpCode,
                'content' => null
            ];
        }

        // Decodificar respuesta JSON
        $json = json_decode($response, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return [
                'error' => true,
                'message' => "Error al decodificar JSON: " . json_last_error_msg(),
                'http_code' => $httpCode,
                'content' => null
            ];
        }

        // Verificar contenido de la respuesta
        $content = $json['choices'][0]['message']['content'] ?? null;
        if (!$content) {
            return [
                'error' => true,
                'message' => "Respuesta de Z.AI con estructura inválida",
                'http_code' => $httpCode,
                'content' => null
            ];
        }

        return [
            'error' => false,
            'message' => 'success',
            'http_code' => $httpCode,
            'content' => $content
        ];
    }

    /**
     * Parsea mensajes de error de la API
     */
    private function _parseErrorResponse(string $response, int $httpCode): string
    {
        $json = json_decode($response, true);
        
        if (isset($json['error']['message'])) {
            return "Error HTTP {$httpCode}: {$json['error']['message']}";
        }
        
        if (isset($json['message'])) {
            return "Error HTTP {$httpCode}: {$json['message']}";
        }
        
        // Truncar respuesta larga para el mensaje de error
        $truncated = strlen($response) > 200 ? substr($response, 0, 200) . '...' : $response;
        return "Error HTTP {$httpCode}: {$truncated}";
    }

    /**
     * Ejecuta una instrucción de texto simple en la IA y devuelve solo la respuesta.
     *
     * @param string $instruccion La instrucción o prompt para la IA.
     * @return string La respuesta de texto de la IA, o una cadena vacía si hay un error.
     */
    public function generarTextoSimple(string $instruccion): string
    {
        if (empty(trim($instruccion))) {
            return '';
        }

        $resultado = $this->callTextZAI($instruccion);

        if (isset($resultado['mensaje']) && !$resultado['es_valor_error']) {
            return $resultado['mensaje'];
        }

        return '';
    }

    // --- Configuración de Prompts para IA ---

    private const PROMPT_BASE = "Actúa como un asistente experto en la redacción de informes para Trabajo Social en español. Tu tarea es reescribir el siguiente texto de observaciones según las directrices proporcionadas. Debes entregar únicamente el texto resultante, sin introducciones, explicaciones o acotaciones como 'Texto mejorado:'.";

    private const PROMPT_TIPOS_ESCRITO = [
        'Nota para Expediente' => "El texto debe ser objetivo, claro y detallado, adecuado para un registro interno. Mantén un tono profesional y factual, describiendo los hechos observados de manera precisa.",
        'Resumen de Fortalezas' => "El texto debe ser un párrafo conciso que se enfoque exclusivamente en los aspectos positivos, recursos, resiliencia y fortalezas de la persona o familia. Usa un tono constructivo y esperanzador.",
        'Análisis de Vulnerabilidades' => "El texto debe describir de manera clara y específica los retos, vulnerabilidades, riesgos y áreas que necesitan apoyo. Sé preciso y usa un lenguaje técnico apropiado para un análisis de caso, pero sin ser alarmista.",
        'Comunicado para Beneficiario' => "El texto debe estar redactado en un lenguaje simple, claro y empático. Evita la jerga técnica. El objetivo es que la persona a la que se refiere el texto pueda entenderlo fácilmente. Dirígete a la persona de manera respetuosa y directa.",
        'default' => "El texto debe ser claro, coherente y con buena gramática."
    ];

    private const PROMPT_AJUSTES = [
        'anonimizar' => "IMPORTANTE: Omite y reemplaza cualquier nombre propio de personas, direcciones, números de teléfono u otros datos personales identificables por descripciones genéricas (ej. 'el solicitante', 'su hija mayor', 'el domicilio', 'el negocio familiar'). La confidencialidad es crítica."
    ];

    /**
     * Mejora un texto utilizando la IA, con opciones de formato específicas para Trabajo Social.
     *
     * @param string $texto El texto original a mejorar.
     * @param array $opciones Un array asociativo con las configuraciones. Ej:
     *  [
     *      'tipo_escrito' => 'Nota para Expediente',
     *      'anonimizar' => true,
     *  ]
     * @return array El resultado de la operación, encapsulado por Util::enum.
     */
    public function mejorarTextoAI(string $texto, array $opciones = [])
    {
        // Validar entrada
        if (empty(trim($texto))) {
            return Util::enum("El texto a mejorar no puede estar vacío.", true);
        }
        if (strlen($texto) > 15000) {
            return Util::enum("El texto es demasiado largo (máximo 15000 caracteres).", true);
        }

        // Construir el prompt y llamar a la IA
        $promptFinal = $this->_construirPromptParaTrabajoSocial($texto, $opciones);
        return $this->callTextZAI($promptFinal);
    }

    /**
     * Método privado para construir el prompt basado en las opciones.
     *
     * @param string $texto
     * @param array $opciones
     * @return string El prompt final para enviar a la IA.
     */
    private function _construirPromptParaTrabajoSocial(string $texto, array $opciones): string
    {
        $partesPrompt = [self::PROMPT_BASE];

        // Añadir instrucción principal basada en el tipo de escrito
        $tipoEscrito = $opciones['tipo_escrito'] ?? 'default';
        $partesPrompt[] = self::PROMPT_TIPOS_ESCRITO[$tipoEscrito] ?? self::PROMPT_TIPOS_ESCRITO['default'];

        // Añadir ajustes adicionales
        if (!empty($opciones['anonimizar'])) {
            $partesPrompt[] = self::PROMPT_AJUSTES['anonimizar'];
        }

        // Ensamblar el prompt del sistema
        $promptSistema = implode(" ", $partesPrompt);

        // Devolver el prompt final combinado con el texto del usuario
        return $promptSistema . "\n\n--- TEXTO A MEJORAR ---\n" . $texto;
    }
}