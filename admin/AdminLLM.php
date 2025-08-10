<?php
class AdminLLM extends Admin
{
    public function __construct()
    {
        parent::__construct(new LogDAO());
    }

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
            "temperature" => 0.3,  // Para respuestas más consistentes
            "max_tokens" => 4000   // Aumentar límite para textos largos
        ];

        // Configurar cabeceras
        $headers = [
            "Authorization: Bearer " . Z_AI_KEY,
            "Content-Type: application/json",
            "Accept-Language: es-MX,es",
            "User-Agent: PHP-App/1.0"
        ];

        // Inicializar cURL
        $ch = curl_init(REQUEST_URL_Z_AI);
        curl_setopt_array(
            $ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($data),
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_TIMEOUT => 90,        // Aumentar timeout para textos largos
            CURLOPT_CONNECTTIMEOUT => 20,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_SSL_VERIFYHOST => 2
            ]
        );

        // Ejecutar solicitud
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);

        // Manejar errores de cURL
        if ($response === false) {
            return Util::enum("Error de conexión con Z.AI: {$curlError}", true);
        }

        // Verificar respuesta HTTP
        if ($httpCode < 200 || $httpCode >= 300) {
            return Util::enum("Error en la API de Z.AI (HTTP {$httpCode}): {$response}", true);
        }

        // Decodificar respuesta JSON
        $json = json_decode($response, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return Util::enum("Error al decodificar respuesta JSON: " . json_last_error_msg(), true);
        }

        // Verificar contenido de la respuesta
        $content = $json['choices'][0]['message']['content'] ?? null;
        if (!$content) {
            return Util::enum("Respuesta inesperada de Z.AI. Estructura inválida.", true);
        }

        return Util::enum($content, false);
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
     *      'tipo_escrito' => 'Nota para Expediente', // Valor de PROMPT_TIPOS_ESCRITO
     *      'anonimizar' => true,                     // Valor de PROMPT_AJUSTES
     *  ]
     * @return array El resultado de la operación, encapsulado por Util::enum.
     */
    public function mejorarTextoAI(string $texto, array $opciones = [])
    {
        // 1. Validar entrada
        if (empty(trim($texto))) {
            return Util::enum("El texto a mejorar no puede estar vacío.", true);
        }
        if (strlen($texto) > 15000) {
            return Util::enum("El texto es demasiado largo (máximo 15000 caracteres).", true);
        }

        // 2. Construir el prompt y llamar a la IA
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
        $partesPrompt = [];
        $partesPrompt[] = self::PROMPT_BASE;

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
