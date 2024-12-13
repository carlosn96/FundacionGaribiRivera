<?php


class AdminImpacto extends Admin {

    private const IMPACTOS = [
        
        "Estabilidad Enomómica" => [
            "Administración de los recursos y toma de decisiones",
            "Mejoras en los ingresos",
            "Mejoras en los ahorros"
        ],
        
        "Calidad de vida" => [
            "Favorecimiento de oportunidades del entorno",
            "Estabilidad económica",
        ]
    ];

    private array $impactos;

    public function __construct() {
        $this->crearSecciones();
    }

    private function crearSecciones() {
        foreach (self::IMPACTOS as $nombre => $secciones) {
            $impacto = new Impacto($nombre);
            foreach ($secciones as $seccion) {
                $impacto->addSeccion($seccion);
            }
            $this->impactos[] = $impacto;
        }
    }

    public function getImpactos() {
        return $this->impactos;
    }
}
