<?php

class EvaluacionFormacion {

    use Entidad;

    private $huboBeneficioPersonal;
    private $beneficiosObtenidos;
    private $ventasMensuales;
    private $gastosMensuales;
    private $utilidadesMensuales;
    private $sueldoMensual;
    private $esIngresoPrincipalPersonal;
    private $esIngresoPrincipalFamiliar;
    private $tieneHabitoAhorro;
    private $cuentaConSistemaAhorro;
    private $detallesSistemaAhorro;
    private $objetivosAhorro;
    private $ahorroMensual;
    private $idUsuario;

    public function __construct($huboBeneficioPersonal, $beneficiosObtenidos,
            $ventasMensuales, $gastosMensuales, $utilidadesMensuales, $sueldoMensual,
            $esIngresoPrincipalPersonal, $esIngresoPrincipalFamiliar, $tieneHabitoAhorro,
            $cuentaConSistemaAhorro, $detallesSistemaAhorro, $objetivosAhorro,
            $ahorroMensual, $idUsuario) {
        $this->huboBeneficioPersonal = $huboBeneficioPersonal;
        $this->beneficiosObtenidos = $beneficiosObtenidos;
        $this->ventasMensuales = $ventasMensuales;
        $this->gastosMensuales = $gastosMensuales;
        $this->utilidadesMensuales = $utilidadesMensuales;
        $this->sueldoMensual = $sueldoMensual;
        $this->esIngresoPrincipalPersonal = $esIngresoPrincipalPersonal;
        $this->esIngresoPrincipalFamiliar = $esIngresoPrincipalFamiliar;
        $this->tieneHabitoAhorro = $tieneHabitoAhorro;
        $this->cuentaConSistemaAhorro = $cuentaConSistemaAhorro;
        $this->detallesSistemaAhorro = $detallesSistemaAhorro;
        $this->objetivosAhorro = $objetivosAhorro;
        $this->ahorroMensual = $ahorroMensual;
        $this->idUsuario = $idUsuario;
    }

    public function getHuboBeneficioPersonal() {
        return $this->huboBeneficioPersonal;
    }

    public function getBeneficiosObtenidos() {
        return $this->beneficiosObtenidos;
    }

    public function getVentasMensuales() {
        return $this->ventasMensuales;
    }

    public function getGastosMensuales() {
        return $this->gastosMensuales;
    }

    public function getUtilidadesMensuales() {
        return $this->utilidadesMensuales;
    }

    public function getSueldoMensual() {
        return $this->sueldoMensual;
    }

    public function getEsIngresoPrincipalPersonal() {
        return $this->esIngresoPrincipalPersonal;
    }

    public function getEsIngresoPrincipalFamiliar() {
        return $this->esIngresoPrincipalFamiliar;
    }

    public function getTieneHabitoAhorro() {
        return $this->tieneHabitoAhorro;
    }

    public function getCuentaConSistemaAhorro() {
        return $this->cuentaConSistemaAhorro;
    }

    public function getDetallesSistemaAhorro() {
        return $this->detallesSistemaAhorro;
    }

    public function getObjetivosAhorro() {
        return $this->objetivosAhorro;
    }

    public function getAhorroMensual() {
        return $this->ahorroMensual;
    }

    public function getIdUsuario() {
        return $this->idUsuario;
    }

    public function setHuboBeneficioPersonal($huboBeneficioPersonal): void {
        $this->huboBeneficioPersonal = $huboBeneficioPersonal;
    }

    public function setBeneficiosObtenidos($beneficiosObtenidos): void {
        $this->beneficiosObtenidos = $beneficiosObtenidos;
    }

    public function setVentasMensuales($ventasMensuales): void {
        $this->ventasMensuales = $ventasMensuales;
    }

    public function setGastosMensuales($gastosMensuales): void {
        $this->gastosMensuales = $gastosMensuales;
    }

    public function setUtilidadesMensuales($utilidadesMensuales): void {
        $this->utilidadesMensuales = $utilidadesMensuales;
    }

    public function setSueldoMensual($sueldoMensual): void {
        $this->sueldoMensual = $sueldoMensual;
    }

    public function setEsIngresoPrincipalPersonal($esIngresoPrincipalPersonal): void {
        $this->esIngresoPrincipalPersonal = $esIngresoPrincipalPersonal;
    }

    public function setEsIngresoPrincipalFamiliar($esIngresoPrincipalFamiliar): void {
        $this->esIngresoPrincipalFamiliar = $esIngresoPrincipalFamiliar;
    }

    public function setTieneHabitoAhorro($tieneHabitoAhorro): void {
        $this->tieneHabitoAhorro = $tieneHabitoAhorro;
    }

    public function setCuentaConSistemaAhorro($cuentaConSistemaAhorro): void {
        $this->cuentaConSistemaAhorro = $cuentaConSistemaAhorro;
    }

    public function setDetallesSistemaAhorro($detallesSistemaAhorro): void {
        $this->detallesSistemaAhorro = $detallesSistemaAhorro;
    }

    public function setObjetivosAhorro($objetivosAhorro): void {
        $this->objetivosAhorro = $objetivosAhorro;
    }

    public function setAhorroMensual($ahorroMensual): void {
        $this->ahorroMensual = $ahorroMensual;
    }

    public function setIdUsuario($idUsuario): void {
        $this->idUsuario = $idUsuario;
    }
}
