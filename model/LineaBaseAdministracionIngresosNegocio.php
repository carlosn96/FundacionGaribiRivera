<?php

class LineaBaseAdministracionIngresosNegocio
{

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
    private array $objetivosAhorro;
    private $ahorroMensual;

    public function __construct(
        $sueldoMensual = null,
        $ventasMensuales = null,
        $gastosMensuales = null,
        $utilidadesMensuales = null,
        $esIngresoPrincipalPersonal = null,
        $esIngresoPrincipalFamiliar = null,
        $tieneHabitoAhorro = null,
        $cuentaConSistemaAhorro = null,
        $detallesSistemaAhorro = null,
        array $objetivosAhorro = [],
        $ahorroMensual = null
    ) {
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
