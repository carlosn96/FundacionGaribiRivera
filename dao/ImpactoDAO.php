<?php

class ImpactoDAO extends DAO {

    private const VISTA_ANALISIS_IMPACTO = 'analisis_impacto';
    private const RECUPERAR_RANGOS_FECHAS_LINEA_BASE = "SELECT * FROM recuperar_linea_base_rangos_fechas_registrados WHERE id_usuario = ?";
    private const INSERTAR_O_ACTUALIZAR_CONFIG_ANIOS = "
    INSERT INTO linea_base_impacto_configuracion (id_usuario, anio_inicio_selected, anio_fin_selected)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE
        anio_inicio_selected = VALUES(anio_inicio_selected),
        anio_fin_selected = VALUES(anio_fin_selected)";
    private const INSERTAR_O_ACTUALIZAR_CONFIG_LISTA = "
    INSERT INTO linea_base_impacto_configuracion (id_usuario, lista_registros_filtrados)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE
        lista_registros_filtrados = VALUES(lista_registros_filtrados)";
    private const CALIDAD_VIDA_1 = "recuperar_impacto_calidad_vida_seccion_1";
    private const CALIDAD_VIDA_2 = "recuperar_impacto_calidad_vida_seccion_2";
    private const ESTABILIDAD_ECONOMICA_1 = "recuperar_impacto_estabilidad_economica_seccion_1";
    private const ESTABILIDAD_ECONOMICA_2 = "recuperar_impacto_estabilidad_economica_seccion_2";
    private const ESTABILIDAD_ECONOMICA_3 = "recuperar_impacto_estabilidad_economica_seccion_3";
    private const RECUPERAR_IMPACTO_ESTABILIDAD_ECONOMICA = "CALL nuevo_recuperar_impacto_estabilidad_economica(?)";
    private const RECUPERAR_IMPACTO_CALIDAD_VIDA = "CALL nuevo_recuperar_impacto_calidad_vida(?)";
    private const CAMPOS_ADM_RECURSOS = [
        [
            "columna" => "cantEmpleados",
            "pregunta" => "Cantidad de empleados que trabajan en tu negocio"
        ],
        [
            "columna" => "registraEntradaSalida",
            "pregunta" => "¿Llevas registros de entradas y salidas de dinero?"
        ],
        [
            "columna" => "asignaSueldo",
            "pregunta" => "¿Tienes asignado un sueldo?"
        ],
        [
            "columna" => "conoceUtilidades",
            "pregunta" => "¿Conoces cuál es la utilidad que te deja tu negocio?"
        ],
        [
            "columna" => "identificaCompetencia",
            "pregunta" => "¿Identiﬁcas quién es tu competencia?"
        ],
        [
            "columna" => "existenEstrategias",
            "pregunta" => "¿Qué estrategias utilizas para incrementar tus ventas?"
        ],
        [
            "columna" => "conoceProductosMayorUtilidad",
            "pregunta" => "¿Conoces los productos o servicios que te generan mayor utilidad?"
        ],
        [
            "columna" => "llevaAhorro",
            "pregunta" => "¿Asignas ahorro mensual para mantenimiento de equipo o maquinaria?"
        ],
        [
            "columna" => "empleoGanancias",
            "pregunta" => "¿Cómo empleas las ganancias generadas?"
        ],
        [
            "columna" => "conocePuntoEquilibrio",
            "pregunta" => "¿Conoces el punto de equilibro?"
        ],
        [
            "columna" => "separaGastos",
            "pregunta" => "¿Separas los gastos del negocio de tus gastos personales?"
        ],
        [
            "columna" => "elaboraPresupuesto",
            "pregunta" => "¿Elaboras un presupuesto mensual para tu negocio?"
        ],
    ];
    private const CAMPOS_MEJORA_RECURSOS = [
        [
            "columna" => "ingresoMensual",
            "pregunta" => "Ingreso mensual"
        ],
        [
            "columna" => "montoMensualVentas",
            "pregunta" => "¿Cuál es el monto mensual de tus ventas?"
        ],
        [
            "columna" => "montoMensualUtilidades",
            "pregunta" => "¿Cuál es el monto de tus utilidades mensuales?"
        ],
        [
            "columna" => "sueldoMensual",
            "pregunta" => "¿Cuál es tu sueldo mensual?"
        ],
    ];
    private const CAMPOS_MEJORA_AHORROS = [
        [
            "columna" => "habitoAhorro",
            "pregunta" => "¿Tienes el hábito de ahorrar de manera constante y a largo plazo?"
        ],
        [
            "columna" => "cuentaSistemaAhorro",
            "pregunta" => "¿Cuentas con algún sistema de ahorro?"
        ],
        [
            "columna" => "objetivosAhorro",
            "pregunta" => "¿Cuál es el objetivo principal de tus ahorros?"
        ],
        [
            "columna" => "montoAhorroMensual",
            "pregunta" => "¿Cuál es el monto aproximado de tus ahorros mensuales?"
        ],
    ];
    private const CAMPOS_OPORTUNIDADES_ENTORNO = [
        ["columna" => 'tieneNegocio', "pregunta" => "¿Actualmente tienes un negocio?"]
    ];
    private const SECCIONES_IMPACTO = [
        'estabilidadEconomica' => [
            self::ESTABILIDAD_ECONOMICA_1 => [
                'nombre' => "Administración de los recursos y toma de decisiones",
                'campos' => self::CAMPOS_ADM_RECURSOS,
                'peso' => 60
            ],
            self::ESTABILIDAD_ECONOMICA_2 => [
                'nombre' => "Mejoras en los ingresos",
                'campos' => self::CAMPOS_MEJORA_RECURSOS,
                'peso' => 30
            ],
            self::ESTABILIDAD_ECONOMICA_3 => [
                'nombre' => "Mejoras en los ahorros",
                'campos' => self::CAMPOS_MEJORA_AHORROS,
                'peso' => 10
            ]
        ],
        'calidadVida' => [
            self::CALIDAD_VIDA_1 => [
                'nombre' => "Favorecimiento de oportunidades del entorno",
                'campos' => self::CAMPOS_OPORTUNIDADES_ENTORNO,
                'peso' => 50
            ]
        ]
    ];

    /**
     * Método genérico para recuperar el impacto de cualquier sección
     *
     * @param string $tipo Sección de impacto (estabilidadEconomica o calidadVida)
     * @param int $usuario ID del usuario
     * @return array
     */
    private function recuperarImpactoPorTipo(string $tipo, int $usuario): array {
        // Arreglo de mapeo de tipo de impacto con las constantes correspondientes
        $impactoMap = [
            'estabilidadEconomica' => self::RECUPERAR_IMPACTO_ESTABILIDAD_ECONOMICA,
            'calidadVida' => self::RECUPERAR_IMPACTO_CALIDAD_VIDA
        ];

        // Verificar si el tipo está en el arreglo de mapeo
        if (!array_key_exists($tipo, $impactoMap)) {
            throw new InvalidArgumentException("Tipo de impacto no válido: " . $tipo);
        }

        // Preparar la consulta según el tipo de impacto
        $prep = $this->prepararInstruccion($impactoMap[$tipo]);
        $prep->agregarInt($usuario);
        $data = $prep->ejecutarConsulta();
        // Procesar los datos de impacto
        return ["mediciones" => $this->recuperarImpacto(self::SECCIONES_IMPACTO[$tipo], $data), "total_registros" => $data["total_registros"]];
    }

    /**
     * Método común para procesar el impacto
     *
     * @param array $secciones Configuración de las secciones (campos, nombres, pesos)
     * @param array $data Datos de la consulta ejecutada
     * @return array
     */
    private function recuperarImpacto(array $secciones, array $data): array {
        $seccionesArray = [];
        foreach ($secciones as $key => $seccion) {
            $mediciones = [];
            foreach ($seccion['campos'] as $campo) {
                $columna = $campo["columna"];
                $inicial = (float) $data["{$columna}Inicial"];
                $final = (float) $data["{$columna}Final"];
                $mediciones[$campo["pregunta"]] = new Medicion($inicial, $final);
            }
            $seccionesArray[] = (new Seccion($seccion['nombre'], $seccion['peso'], $mediciones))->toSeccionArray();
        }
        return $seccionesArray;
    }

    /**
     * Recupera la estabilidad económica del usuario
     *
     * @param int $usuario ID del usuario
     * @return array
     */
    public function recuperarEstabilidadEconomica(int $usuario): array {
        return $this->recuperarImpactoPorTipo('estabilidadEconomica', $usuario);
    }

    /**
     * Recupera la calidad de vida del usuario
     *
     * @param int $usuario ID del usuario
     * @return array
     */
    public function recuperarCalidadVida(int $usuario): array {
        return $this->recuperarImpactoPorTipo('calidadVida', $usuario);
    }

    public function getMedicionImpacto($usuario): array {
        $estabilidadEconomica = $this->recuperarEstabilidadEconomica($usuario);
        $medicionesEE = $estabilidadEconomica["mediciones"];
        $calidadVida = $this->recuperarCalidadVida($usuario);
        $medicionesCV = $calidadVida["mediciones"];
        $sumaPromediosEstabilidad = array_sum(array_column($medicionesEE, 'contribucionImpacto'));
        $medicionesCV[] = (new Seccion("Estabilidad económica", 50, [], $sumaPromediosEstabilidad))->toSeccionArray();
        $fechas = $this->getAniosLineaBase($usuario);
        return [
            "fechas" => $fechas,
            "impactos" => [
                [
                    "nombre" => "Estabilidad económica",
                    "data" => $medicionesEE,
                    "narrativa" =>
                    $this->getNarrativa("estabilizar la economia",
                            $estabilidadEconomica["total_registros"], $sumaPromediosEstabilidad, $fechas["inicioSelected"], $fechas["finSelected"])
                ],
                [
                    "data" => $medicionesCV,
                    "nombre" => "Calidad de vida",
                    "narrativa" =>
                    $this->getNarrativa("mejorar la calidad de vida",
                            $calidadVida["total_registros"], array_sum(array_column($medicionesCV, 'contribucionImpacto')),
                            $fechas["inicioSelected"], $fechas["finSelected"])
                ]
            ]
        ];
    }

    private function getNarrativa($tipoImpacto, $cantFamilias, $porcentaje, $anioInicio, $anioFin) {
        return "Contribuimos a $tipoImpacto de <b> $cantFamilias </b> familias catalogadas 
        como poblaciones vulnerables con un cambio porcentual del ↑ $porcentaje% entre $anioInicio-$anioFin 
        a través de los proyectos de intervención social que amplían el acceso a la formación 
        y el impulso de créditos transparentes y deuda sana.";
    }

    private function getAniosLineaBase($usuario) {
        $prep = $this->prepararInstruccion(self::RECUPERAR_RANGOS_FECHAS_LINEA_BASE);
        $prep->agregarInt($usuario);
        $rs = $prep->ejecutarConsulta();
        if ($rs) {
            return array_map('intval', $rs);
        } else {
            return [
                "inicio" => 2023,
                "fin" => ($anioActual = intval(Util::obtenerFechaActual("Y"))),
                "inicioSelected" => $anioActual,
                "finSelected" => $anioActual
            ];
        }
    }

    public function actualizarConfiguracionAnios($inicio, $fin, $usuario) {
        $prep = $this->prepararInstruccion(self::INSERTAR_O_ACTUALIZAR_CONFIG_ANIOS);
        $prep->agregarInt($usuario);
        $prep->agregarInt($inicio);
        $prep->agregarInt($fin);
        return $prep->ejecutar();
    }

    public function actualizarConfiguracionListaEmprendedores(array $lista, $id) {
        $prep = $this->prepararInstruccion(self::INSERTAR_O_ACTUALIZAR_CONFIG_LISTA);
        $prep->agregarInt($id);
        $prep->agregarJSON($lista);
        return $prep->ejecutar();
    }

    public function recuperarVistaGeneral($tipo) {
        $tabla = self::VISTA_ANALISIS_IMPACTO . "_" . $tipo;
        $rset = $this->selectPorCamposEspecificos("*", $tabla, "", true);
        $preguntas = array_merge(self::CAMPOS_ADM_RECURSOS, self::CAMPOS_MEJORA_RECURSOS, self::CAMPOS_MEJORA_AHORROS);
        $vista = [];
        foreach ($rset as $row) {
            $rowVista = [];
            $rowVista["Nombre de emprendedor"] = $row["nombreUsuario"];
            foreach ($preguntas as $pregunta) {
                $rowVista[$pregunta["pregunta"]] = $row[$pregunta["columna"]];
            }
            $vista[] = $rowVista;
        }
        return $vista;
    }
}
