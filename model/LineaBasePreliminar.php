<?php

class LineaBasePreliminar {

    use Entidad;

    private $medioConoceFundacion;
    private $otroMedioConoceFundacion;
    private $razonRecurreFundacion;
    private $otraRazonRecurreFundacion;
    private $solicitaCredito;
    private $utilizaCredito;
    private $tiempoDedicaCapacitacion;

    public function __construct($medioConoceFundacion,
            $otroMedioConoceFundacion, $razonRecurreFundacion, $otraRazonRecurreFundacion,
            $solicitaCredito, $utilizaCredito, $tiempoDedicaCapacitacion) {
        $this->medioConoceFundacion = $medioConoceFundacion;
        $this->otroMedioConoceFundacion = $otroMedioConoceFundacion;
        $this->razonRecurreFundacion = $razonRecurreFundacion;
        $this->otraRazonRecurreFundacion = $otraRazonRecurreFundacion;
        $this->solicitaCredito = $solicitaCredito;
        $this->utilizaCredito = $utilizaCredito;
        $this->tiempoDedicaCapacitacion = $tiempoDedicaCapacitacion;
    }

    public function getMedioConoceFundacion(): array {
        return $this->medioConoceFundacion;
    }

    public function getOtroMedioConoceFundacion(): string {
        return $this->otroMedioConoceFundacion;
    }

    public function getRazonRecurreFundacion(): int {
        return $this->razonRecurreFundacion;
    }

    public function getOtraRazonRecurreFundacion(): string {
        return $this->otraRazonRecurreFundacion;
    }

    public function getSolicitaCredito(): int {
        return $this->solicitaCredito;
    }

    public function getUtilizaCredito(): int {
        return $this->utilizaCredito;
    }

    public function getTiempoDedicaCapacitacion(): int {
        return $this->tiempoDedicaCapacitacion;
    }

    public function setMedioConoceFundacion(array $medioConoceFundacion): void {
        $this->medioConoceFundacion = $medioConoceFundacion;
    }

    public function setOtroMedioConoceFundacion(string $otroMedioConoceFundacion): void {
        $this->otroMedioConoceFundacion = $otroMedioConoceFundacion;
    }

    public function setRazonRecurreFundacion(int $razonRecurreFundacion): void {
        $this->razonRecurreFundacion = $razonRecurreFundacion;
    }

    public function setOtraRazonRecurreFundacion(string $otraRazonRecurreFundacion): void {
        $this->otraRazonRecurreFundacion = $otraRazonRecurreFundacion;
    }

    public function setSolicitaCredito(int $solicitaCredito): void {
        $this->solicitaCredito = $solicitaCredito;
    }

    public function setUtilizaCredito(int $utilizaCredito): void {
        $this->utilizaCredito = $utilizaCredito;
    }

    public function setTiempoDedicaCapacitacion(int $tiempoDedicaCapacitacion): void {
        $this->tiempoDedicaCapacitacion = $tiempoDedicaCapacitacion;
    }

}
