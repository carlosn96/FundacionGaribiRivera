<?php

class ImpactoCapacitacionDAO extends DAO
{

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
    private const ESTABILIDAD_ECONOMICA_1 = "recuperar_impacto_estabilidad_economica_seccion_1";
    private const ESTABILIDAD_ECONOMICA_2 = "recuperar_impacto_estabilidad_economica_seccion_2";
    private const ESTABILIDAD_ECONOMICA_3 = "recuperar_impacto_estabilidad_economica_seccion_3";
    private const RECUPERAR_IMPACTO_ESTABILIDAD_ECONOMICA = "CALL recuperar_impacto_seguimiento_graduados(?)";
    private const CAMPOS_ADM_RECURSOS = [
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
        ]
    ];

    private const GUARDAR_SEGUIMIENTO_GRADUADO = 'CALL guardar_seguimiento_graduado(?)';
    private const ACTUALIZAR_SEGUIMIENTO_GRADUADO = 'CALL actualizar_seguimiento_graduado(?)';
    private const RECUPERAR_SEGUIMIENTO_GRADUADO = 'SELECT * FROM recuperar_seguimiento_graduado WHERE idEmprendedor = ?';
    private const CONSULTAR_LISTA_ESTRATEGIAS_VENTAS = "SELECT * FROM recuperar_seguimiento_graduado_lista_estrategias_inc_ventas WHERE idSeguimiento = ?";
    /**
     * Método genérico para recuperar el impacto de cualquier sección
     *
     * @param string $tipo Sección de impacto (estabilidadEconomica)
     * @param int $usuario ID del usuario
     * @return array
     */
    private function recuperarImpactoPorTipo(string $tipo, int $usuario): array
    {
        // Arreglo de mapeo de tipo de impacto con las constantes correspondientes
        $impactoMap = [
            'estabilidadEconomica' => self::RECUPERAR_IMPACTO_ESTABILIDAD_ECONOMICA
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
    private function recuperarImpacto(array $secciones, array $data): array
    {
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
    public function recuperarEstabilidadEconomica(int $usuario): array
    {
        return $this->recuperarImpactoPorTipo('estabilidadEconomica', $usuario);
    }

    public function getMedicionImpacto($usuario): array
    {
        $estabilidadEconomica = $this->recuperarEstabilidadEconomica($usuario);
        $medicionesEE = $estabilidadEconomica["mediciones"];
        $sumaPromediosEstabilidad = array_sum(array_column($medicionesEE, 'contribucionImpacto'));
        $fechas = $this->getAniosLineaBase($usuario);
        return [
            "fechas" => $fechas,
            "impactos" => [
                [
                    "nombre" => "Estabilidad económica",
                    "data" => $medicionesEE,
                    "narrativa" =>
                        $this->getNarrativa(
                            "estabilizar la economia",
                            $estabilidadEconomica["total_registros"],
                            $sumaPromediosEstabilidad,
                            $fechas["inicioSelected"],
                            $fechas["finSelected"]
                        )
                ]
            ]
        ];
    }
    public function getMedicionImpactoCapacitacion($usuario): array
    {
        $estabilidadEconomica = $this->recuperarEstabilidadEconomica($usuario);
        $medicionesEE = $estabilidadEconomica["mediciones"];
        $sumaPromediosEstabilidad = array_sum(array_column($medicionesEE, 'contribucionImpacto'));
        $fechas = $this->getAniosLineaBase($usuario);
        return [
            "fechas" => $fechas,
            "impactos" => [
                [
                    "nombre" => "Estabilidad económica",
                    "data" => $medicionesEE,
                    "narrativa" =>
                        $this->getNarrativa(
                            "estabilizar la economia",
                            $estabilidadEconomica["total_registros"],
                            $sumaPromediosEstabilidad,
                            $fechas["inicioSelected"],
                            $fechas["finSelected"]
                        )
                ]
            ]
        ];
    }

    private function getNarrativa($tipoImpacto, $cantFamilias, $porcentaje, $anioInicio, $anioFin)
    {
        return "Contribuimos a $tipoImpacto de <b> $cantFamilias </b> familias catalogadas 
        como poblaciones vulnerables con un cambio porcentual del ↑ $porcentaje% entre $anioInicio-$anioFin 
        a través de los proyectos de intervención social que amplían el acceso a la formación 
        y el impulso de créditos transparentes y deuda sana.";
    }

    private function getAniosLineaBase($usuario)
    {
        $prep = $this->prepararInstruccion(self::RECUPERAR_RANGOS_FECHAS_LINEA_BASE);
        $prep->agregarInt($usuario);
        $rs = $prep->ejecutarConsulta();
        $anioActual = Util::obtenerFechaActual();
        return $rs ?: [
            "inicio" => "2023-01-01",
            "fin" => $anioActual,
            "inicioSelected" => $anioActual,
            "finSelected" => $anioActual
        ];
    }

    public function actualizarConfiguracionAnios($inicio, $fin, $usuario)
    {
        $prep = $this->prepararInstruccion(self::INSERTAR_O_ACTUALIZAR_CONFIG_ANIOS);
        $prep->agregarInt($usuario);
        $prep->agregarString($inicio);
        $prep->agregarString($fin);
        return $prep->ejecutar();
    }

    public function actualizarConfiguracionListaEmprendedores(array $lista, $id)
    {
        $prep = $this->prepararInstruccion(self::INSERTAR_O_ACTUALIZAR_CONFIG_LISTA);
        $prep->agregarInt($id);
        $prep->agregarJSON($lista);
        return $prep->ejecutar();
    }

    public function recuperarVistaGeneral($tipo)
    {
        $tabla = self::VISTA_ANALISIS_IMPACTO . "_" . $tipo;
        Util::error_log("Recuperando vista general de impacto desde la tabla: $tabla");
        $rset = $this->selectPorCamposEspecificos("*", $tabla, "", true);
        $preguntas = array_merge(self::CAMPOS_ADM_RECURSOS, self::CAMPOS_MEJORA_RECURSOS, self::CAMPOS_MEJORA_AHORROS);
        $vista = [];
        Util::error_log($rset[0]);
        foreach ($rset as $row) {
            $rowVista = [];
            $rowVista["Etapa"] = $row["etapa"];
            $rowVista["Fecha"] = $row["fechaCreacion"];
            $rowVista["Nombre de emprendedor"] = $row["nombreUsuario"];
            foreach ($preguntas as $pregunta) {
                if (isset($row[$pregunta["columna"]])) {
                    $rowVista[$pregunta["pregunta"]] = $row[$pregunta["columna"]];
                }
            }
            $vista[] = $rowVista;
        }
        return $vista;
    }

    public function recuperarSeguimientoGraduado($emprendedor)
    {
        $prep = $this->prepararInstruccion(self::RECUPERAR_SEGUIMIENTO_GRADUADO);
        $prep->agregarInt($emprendedor);
        $seg = $this->agruparSeguimientoGraduado($prep->ejecutarConsulta());
        $seg['analisisNegocio']["listaEstrategiaVentas"] = $this->selectAllPorId(self::CONSULTAR_LISTA_ESTRATEGIAS_VENTAS, $seg["idSeguimiento"]);

        return $seg;
    }

    private function agruparSeguimientoGraduado($result)
    {
        $seguimiento = [];
        $seguimiento['idEmprendedor'] = $result['idEmprendedor'];
        $seguimiento['idSeguimiento'] = $result['idSeguimiento'];
        $seguimiento['fechaCreacion'] = $result['fechaCreacion'];
        $seguimiento['analisisNegocio'] = [
            'registraEntradaSalida' => Util::getArrayBool($result['negocioRegistraEntradaSalida']),
            'competencia' => [
                'identifica' => Util::getArrayBool($result['negocioIdentificaCompetencia']),
                "quien" => boolval($result['negocioIdentificaCompetencia']) ? $result['negocioQuienCompetencia'] : "No identificada"
            ],
            'conoceUtilidades' => Util::getArrayBool($result['negocioConoceUtilidades']),
            'ahorro' => [
                "asigna" => Util::getArrayBool($result['negocioLlevaAhorro']),
                "detalles" => (boolval($result['negocioLlevaAhorro']) ? $result['negocioCuantoAhorro'] : $result['negocioRazonesNoAhorro'])
            ],
            'conocePuntoEquilibrio' => Util::getArrayBool($result['negocioConocePuntoEquilibrio']),
            'conoceProductosMayorUtilidad' => [
                "conoce" => Util::getArrayBool($result['negocioConoceProductosMayorUtilidad']),
                "porcentaje" => $result['negocioConoceProductosMayorUtilidad'] ? $result['negocioPorcentajeGanancias'] : "No identifica productos con mayor utilidad",
            ],
            'separaGastos' => Util::getArrayBool($result['negocioSeparaGastos']),
            'elaboraPresupuesto' => Util::getArrayBool($result['negocioElaboraPresupuesto']),
            "listaEmpleoGanancias" => [json_decode($result["listaEmpleoGanancias"])]
        ];
        $seguimiento['administracionIngresos'] = [
            'sueldoMensual' => $result['sueldoMensual'],
            'montoMensualUtilidades' => $result['montoMensualUtilidades'],
            'montoAhorroMensual' => $result['montoAhorroMensual']
        ];
        return $seguimiento;
    }

    public function existeSeguimientoGraduado($emprendedor)
    {
        $prep = $this->prepararInstruccion("SELECT COUNT(*) AS existe FROM seguimiento_graduados WHERE id_emprendedor = ?");
        $prep->agregarInt($emprendedor);
        return $prep->ejecutarConsulta()["existe"];
    }

    public function guardarSeguimientoGraduado(SeguimientoGraduado $seguimientoGraduado)
    {
        return $this->insertarSeguimientoGraduado($seguimientoGraduado, self::GUARDAR_SEGUIMIENTO_GRADUADO);
    }

    public function actualizarSeguimientoGraduado(SeguimientoGraduado $seguimientoGraduado)
    {
        return $this->insertarSeguimientoGraduado($seguimientoGraduado, self::ACTUALIZAR_SEGUIMIENTO_GRADUADO);
    }

    public function eliminarSeguimientoGraduado($idEmprendedor)
    {
        return $this->eliminarPorId(
            "seguimiento_graduados",
            "id_emprendedor",
            $idEmprendedor,
        );
    }

    private function insertarSeguimientoGraduado(SeguimientoGraduado $seguimientoGraduado, $instruccion)
    {
        $prep = $this->prepararInstruccion($instruccion);
        $prep->agregarEntidad($seguimientoGraduado);
        return $prep->ejecutar();
    }
}
