<?php

class EstudioSocioeconomicoSeccionOtrosBienes {

    use Entidad;

    private $cuentaConVehiculoPropio;
    private string|null $tipoVehiculo;
    private string|null $marcaVehiculo;
    private string|null $modeloVehiculo;

    public function __construct($cuentaConVehiculoPropio, string|null $tipoVehiculo, string|null $marcaVehiculo, string|null $modeloVehiculo) {
        $this->cuentaConVehiculoPropio = $cuentaConVehiculoPropio;
        $this->tipoVehiculo = $tipoVehiculo;
        $this->marcaVehiculo = $marcaVehiculo;
        $this->modeloVehiculo = $modeloVehiculo;
    }
}
