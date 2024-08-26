<?php

class LineaBaseIdentificacion {

    use Entidad;

    private $genero;
    private $edad;
    private $estadoCivil;
    private $escolaridad;
    private $discapacidad;

    public function __construct($genero, $edad, $estadoCivil, $escolaridad, $discapacidad) {
        $this->genero = $genero;
        $this->edad = $edad;
        $this->estadoCivil = $estadoCivil;
        $this->escolaridad = $escolaridad;
        $this->discapacidad = $discapacidad;
    }

    public function getGenero() {
        return $this->genero;
    }

    public function getEdad() {
        return $this->edad;
    }

    public function getEstadoCivil() {
        return $this->estadoCivil;
    }

    public function getEscolaridad() {
        return $this->escolaridad;
    }

    public function getDiscapacidad() {
        return $this->discapacidad;
    }

    public function setGenero($genero): void {
        $this->genero = $genero;
    }

    public function setEdad($edad): void {
        $this->edad = $edad;
    }

    public function setEstadoCivil($estadoCivil): void {
        $this->estadoCivil = $estadoCivil;
    }

    public function setEscolaridad($escolaridad): void {
        $this->escolaridad = $escolaridad;
    }

    public function setDiscapacidad($discapacidad): void {
        $this->discapacidad = $discapacidad;
    }
}
