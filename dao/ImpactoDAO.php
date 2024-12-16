<?php

class ImpactoDAO extends DAO {

    private const CALIDAD_VIDA_1 = "recuperar_impacto_calidad_vida_seccion_1";
    private const CALIDAD_VIDA_2 = "recuperar_impacto_calidad_vida_seccion_2";
    private const ESTABILIDAD_ECONOMICA_1 = "recuperar_impacto_estabilidad_economica_seccion_1";
    private const ESTABILIDAD_ECONOMICA_2 = "recuperar_impacto_estabilidad_economica_seccion_2";
    private const ESTABILIDAD_ECONOMICA_3 = "recuperar_impacto_estabilidad_economica_seccion_3";
    private const RECUPERAR_EE = [
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
    ];
    private const RECUPERAR_CV = [
        self::CALIDAD_VIDA_1 => [
            'nombre' => "Favorecimiento de oportunidades del entorno",
            'campos' => ['tieneNegocio'],
            'peso' => 50
        ]
    ];

    private function recuperarImpacto(array $secciones): array {
        // Generar nombres de tablas a partir de las claves del array.
        $tabla = implode(",", array_keys($secciones));

        // Obtener datos generales.
        $data = $this->selectPorCamposEspecificos("*", $tabla, "", true)[0];
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

    public function recuperarEstabilidadEconomica(): array {
        return $this->recuperarImpacto(self::RECUPERAR_EE);
    }

    public function recuperarCalidadVida(): array {
        return $this->recuperarImpacto(self::RECUPERAR_CV);
    }

    public function getMedicionImpacto(): array {
        $estabilidadEconomica = $this->recuperarEstabilidadEconomica();
        $calidadVida = $this->recuperarCalidadVida();

        $sumaPromediosEstabilidad = array_sum(array_column($estabilidadEconomica, 'promedio'));

        $calidadVida[] = (new Seccion("Estabilidad económica", 50, [], $sumaPromediosEstabilidad))->toSeccionArray();

        return [
            [
                "nombre" => "Estabilidad económica",
                "data" => $estabilidadEconomica,
                "narrativa"=>"Descripción narrativa para Impacto A.",
                "narrativaNotas"=> "Notas adicionales."
            ],
            [
                "data" => $calidadVida,
                "nombre" => "Calidad de vida",
                "narrativa"=>"Descripción narrativa para Impacto B.",
                "narrativaNotas"=> "Notas adicionales."
            ]
        ];
    }
}
