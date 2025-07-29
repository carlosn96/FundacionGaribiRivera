<?php

class ConfiguracionConeval
{
    use Entidad;

    private $montoVulnerableIngreso;
    private $montoPobrezaExtrema;
    private $fechaMuestra;

    private $idConeval;

    public function __construct($montoVulnerableIngreso, $montoPobrezaExtrema, 
        $fechaMuestra, int $id = null
    ) {
        $this->montoVulnerableIngreso = $montoVulnerableIngreso;
        $this->montoPobrezaExtrema = $montoPobrezaExtrema;
        $this->fechaMuestra = $fechaMuestra;
        $this->idConeval = $id;
    }
}
