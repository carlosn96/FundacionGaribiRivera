<?php

class LineaBaseAdministracionIngresosNegocio {

    use Entidad;

    private $sueldoMensual;
    private $ventasMensuales;
    private $gastosMensuales;
    private $utilidadesMensuales;
    private $esIngresoPrincipalPersonal;
    private $esIngresoPrincipalFamiliar;
    private $tieneHabitoAhorro;
    private $cuentaConSistemaAhorro;
    private $detallesSistemaAhorro;
    private $objetivosAhorro;
    private $ahorroMensual;

    public function __construct($sueldoMensual, $ventasMensuales, $gastosMensuales, $utilidadesMensuales, $esIngresoPrincipalPersonal, $esIngresoPrincipalFamiliar, $tieneHabitoAhorro, $cuentaConSistemaAhorro, $detallesSistemaAhorro, $objetivosAhorro, $ahorroMensual) {
        $this->sueldoMensual = $sueldoMensual;
        $this->ventasMensuales = $ventasMensuales;
        $this->gastosMensuales = $gastosMensuales;
        $this->utilidadesMensuales = $utilidadesMensuales;
        $this->esIngresoPrincipalPersonal = $esIngresoPrincipalPersonal;
        $this->esIngresoPrincipalFamiliar = $esIngresoPrincipalFamiliar;
        $this->tieneHabitoAhorro = $tieneHabitoAhorro;
        $this->cuentaConSistemaAhorro = $cuentaConSistemaAhorro;
        $this->detallesSistemaAhorro = $detallesSistemaAhorro;
        $this->objetivosAhorro = $objetivosAhorro;
        $this->ahorroMensual = $ahorroMensual;
    }
}
