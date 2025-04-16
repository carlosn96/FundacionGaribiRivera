<?php

class EstudioSocioeconomicoSeccionEconomiaFamiliar {

    use Entidad;

    private int|array $ingresoMensual;
    private array $egresos;

    public function __construct(int|array $ingresoMensual, array $egresos) {
        $this->ingresoMensual = $ingresoMensual;
        $this->egresos = $egresos;
    }
}
