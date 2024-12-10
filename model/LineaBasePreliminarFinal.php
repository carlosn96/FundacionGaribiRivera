<?php

class LineaBasePreliminarFinal {

    use Entidad;

    private $huboBeneficioPersonal;
    private $beneficiosObtenidos;

    public function __construct($huboBeneficioPersonal, $beneficiosObtenidos) {
        $this->huboBeneficioPersonal = $huboBeneficioPersonal;
        $this->beneficiosObtenidos = $beneficiosObtenidos;
    }

    public function getHuboBeneficioPersonal() {
        return $this->huboBeneficioPersonal;
    }

    public function getBeneficiosObtenidos() {
        return $this->beneficiosObtenidos;
    }

    public function setHuboBeneficioPersonal($huboBeneficioPersonal): void {
        $this->huboBeneficioPersonal = $huboBeneficioPersonal;
    }

    public function setBeneficiosObtenidos($beneficiosObtenidos): void {
        $this->beneficiosObtenidos = $beneficiosObtenidos;
    }
}
