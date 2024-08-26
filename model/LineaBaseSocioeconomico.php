<?php

class LineaBaseSocioeconomico {

    use Entidad;

    private $cantidadDependientesEconomicos;
    private $ocupacionActual;
    private $ingresoMensual;

    public function __construct($cantidadDependientes, $ocupacionActual, $ingresoMensual) {
        $this->cantidadDependientesEconomicos = $cantidadDependientes;
        $this->ocupacionActual = $ocupacionActual;
        $this->ingresoMensual = $ingresoMensual;
    }

    public function getCantidadDependientes() {
        return $this->cantidadDependientes;
    }

    public function getOcupacionActual() {
        return $this->ocupacionActual;
    }

    public function getIngresoMensual() {
        return $this->ingresoMensual;
    }

    public function setCantidadDependientes($cantidadDependientes): void {
        $this->cantidadDependientes = $cantidadDependientes;
    }

    public function setOcupacionActual($ocupacionActual): void {
        $this->ocupacionActual = $ocupacionActual;
    }

    public function setIngresoMensual($ingresoMensual): void {
        $this->ingresoMensual = $ingresoMensual;
    }
}
