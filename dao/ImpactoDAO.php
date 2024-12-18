<?php

class ImpactoDAO extends DAO {

    private const RECUPERAR_RANGOS_FECHAS_LINEA_BASE = "SELECT * FROM recuperar_linea_base_rangos_fechas_registrados WHERE id_usuario = ?";
    private const ACTUALIZAR_CONFIG_ANIOS = "UPDATE linea_base_impacto_configuracion SET anio_inicio_selected = ?, anio_fin_selected = ? WHERE id_usuario = ?";
    private const CALIDAD_VIDA_1 = "recuperar_impacto_calidad_vida_seccion_1";
    private const CALIDAD_VIDA_2 = "recuperar_impacto_calidad_vida_seccion_2";
    private const ESTABILIDAD_ECONOMICA_1 = "recuperar_impacto_estabilidad_economica_seccion_1";
    private const ESTABILIDAD_ECONOMICA_2 = "recuperar_impacto_estabilidad_economica_seccion_2";
    private const ESTABILIDAD_ECONOMICA_3 = "recuperar_impacto_estabilidad_economica_seccion_3";
    private const RECUPERAR_IMPACTO_ESTABILIDAD_ECONOMICA = "CALL recuperar_impacto_estabilidad_economica(?)";
    private const RECUPERAR_IMPACTO_CALIDAD_VIDA = "CALL recuperar_impacto_calidad_vida(?)";
    private const SECCIONES_IMPACTO = [
        'estabilidadEconomica' => [
            self::ESTABILIDAD_ECONOMICA_1 => [
                'nombre' => "Administración de los recursos y toma de decisiones",
                'campos' => [
                    'cantEmpleados', 'registraEntradaSalida', 'asignaSueldo', 'conoceUtilidades',
                    'identificaCompetencia', 'totalEstrategias', 'conoceProductosMayorUtilidad',
                    'llevaAhorro', 'totalEmpleoGanancia', 'conocePuntoEquilibrio',
                    'separaGastos', 'elaboraPresupuesto'
                ],
                'peso' => 60
            ],
            self::ESTABILIDAD_ECONOMICA_2 => [
                'nombre' => "Mejoras en los ingresos",
                'campos' => [
                    'ingresoMensual', 'montoMensualVentas', 'montoMensualUtilidades',
                    'sueldoMensual'
                ],
                'peso' => 30
            ],
            self::ESTABILIDAD_ECONOMICA_3 => [
                'nombre' => "Mejoras en los ahorros",
                'campos' => [
                    'habitoAhorro', 'cuentaSistemaAhorro', 'totalObjetivosAhorro',
                    'montoAhorroMensual'
                ],
                'peso' => 10
            ]
        ],
        'calidadVida' => [
            self::CALIDAD_VIDA_1 => [
                'nombre' => "Favorecimiento de oportunidades del entorno",
                'campos' => ['tieneNegocio'],
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
        return $this->recuperarImpacto(self::SECCIONES_IMPACTO[$tipo], $data);
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
                $inicial = (float) $data["{$campo}Inicial"];
                $final = (float) $data["{$campo}Final"];
                $mediciones[$campo] = new Medicion($inicial, $final);
            }
            $seccionesArray[] = (new Seccion(
                            $seccion['nombre'],
                            $seccion['peso'],
                            $mediciones)
                    )->toSeccionArray();
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
        $calidadVida = $this->recuperarCalidadVida($usuario);
        $sumaPromediosEstabilidad = array_sum(array_column($estabilidadEconomica, 'contribucionImpacto'));
        $calidadVida[] = (new Seccion("Estabilidad económica", 50, [], $sumaPromediosEstabilidad))->toSeccionArray();
        $fechas = $this->getAniosLineaBase($usuario);
        return [
            "fechas" => $fechas,
            "impactos" => [
                [
                    "nombre" => "Estabilidad económica",
                    "data" => $estabilidadEconomica,
                    "narrativa" =>
                    $this->getNarrativa("estabilizar la economia",
                            100, $sumaPromediosEstabilidad, $fechas["inicioSelected"], $fechas["finSelected"])
                ],
                [
                    "data" => $calidadVida,
                    "nombre" => "Calidad de vida",
                    "narrativa" =>
                    $this->getNarrativa("mejorar la calidad de vida",
                            100, array_sum(array_column($calidadVida, 'contribucionImpacto')),
                            $fechas["inicioSelected"], $fechas["finSelected"])
                ]
            ]
        ];
    }

    private function getNarrativa($tipoImpacto, $cantFamilias, $porcentaje, $anioInicio, $anioFin) {
        return "Contribuimos a $tipoImpacto de $cantFamilias familias catalogadas 
        como poblaciones vulnerables con un cambio porcentual del ↑ $porcentaje% entre $anioInicio-$anioFin 
        a través de los proyectos de intervención social que amplían el acceso a la formación 
        y el impulso de créditos transparentes y deuda sana.";
    }

    private function getAniosLineaBase($usuario) {
        $prep = $this->prepararInstruccion(self::RECUPERAR_RANGOS_FECHAS_LINEA_BASE);
        $prep->agregarInt($usuario);
        return $prep->ejecutarConsulta();
    }

    public function actualizarConfiguracionAnios($inicio, $fin, $usuario) {
        $prep = $this->prepararInstruccion(self::ACTUALIZAR_CONFIG_ANIOS);
        $prep->agregarInt($inicio);
        $prep->agregarInt($fin);
        $prep->agregarInt($usuario);
        return $prep->ejecutar();
    }
}
