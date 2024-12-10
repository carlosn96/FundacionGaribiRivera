<?php

class LineaBaseNegocio {

    use Entidad;

    private $nombre;
    private $telefono;
    private $calle;
    private $calleCruce1;
    private $calleCruce2;
    private $numExterior;
    private $numInterior;
    private $codigoPostal;
    private $colonia;
    private $antiguedad;
    private $cantEmpleados;
    private $actividad;
    private $otraActividad;
    private $giro;

    public function __construct($nombre, $telefono, $calle, $calleCruce1, $calleCruce2, $numExterior,
            $numInterior, $codigoPostal, $colonia,$antiguedad, $cantEmpleados,
            $actividad, $otraActividad, $giroNegocio) {
        $this->nombre = $nombre;
        $this->telefono = $telefono;
        $this->calle = $calle;
        $this->calleCruce1 = $calleCruce1;
        $this->calleCruce2 = $calleCruce2;
        $this->numExterior = $numExterior;
        $this->numInterior = $numInterior;
        $this->codigoPostal = $codigoPostal;
        $this->colonia = $colonia;
        $this->antiguedad = $antiguedad;
        $this->cantEmpleados = $cantEmpleados;
        $this->actividad = $actividad;
        $this->otraActividad = $otraActividad;
        $this->giro = $giroNegocio;
    }

    public function getNombre() {
        return $this->nombre;
    }

    public function getTelefono() {
        return $this->telefono;
    }

    public function getCalle() {
        return $this->calle;
    }

    public function getCalleCruce1() {
        return $this->calleCruce1;
    }

    public function getCalleCruce2() {
        return $this->calleCruce2;
    }

    public function getNumExterior() {
        return $this->numExterior;
    }

    public function getNumInterior() {
        return $this->numInterior;
    }

    public function getCodigoPostal() {
        return $this->codigoPostal;
    }

    public function getAntiguedad() {
        return $this->antiguedad;
    }

    public function getCantEmpleados() {
        return $this->cantEmpleados;
    }

    public function getActividad() {
        return $this->actividad;
    }

    public function getOtraActividad() {
        return $this->otraActividad;
    }

    public function getGiroNegocio() {
        return $this->giro;
    }

    public function setNombre($nombre): void {
        $this->nombre = $nombre;
    }

    public function setTelefono($telefono): void {
        $this->telefono = $telefono;
    }

    public function setCalle($calle): void {
        $this->calle = $calle;
    }

    public function setCalleCruce1($calleCruce1): void {
        $this->calleCruce1 = $calleCruce1;
    }

    public function setCalleCruce2($calleCruce2): void {
        $this->calleCruce2 = $calleCruce2;
    }

    public function setNumExterior($numExterior): void {
        $this->numExterior = $numExterior;
    }

    public function setNumInterior($numInterior): void {
        $this->numInterior = $numInterior;
    }

    public function setCodigoPostal($codigoPostal): void {
        $this->codigoPostal = $codigoPostal;
    }

    public function setAntiguedad($antiguedad): void {
        $this->antiguedad = $antiguedad;
    }

    public function setCantEmpleados($cantEmpleados): void {
        $this->cantEmpleados = $cantEmpleados;
    }

    public function setActividad($actividad): void {
        $this->actividad = $actividad;
    }

    public function setOtraActividad($otraActividad): void {
        $this->otraActividad = $otraActividad;
    }

    public function setGiroNegocio($giroNegocio): void {
        $this->giroNegocio = $giroNegocio;
    }
}
