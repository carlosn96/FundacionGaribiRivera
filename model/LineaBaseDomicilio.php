<?php

class LineaBaseDomicilio {

    use Entidad;

    private string $calle;
    private string $calleCruce1;
    private string $calleCruce2;
    private string $numeroExterior;
    private ?string $numeroInterior;
    private int $codigoPostal;
    private string $colonia;
    private int $comunidadParroquial;

    public function __construct(string $calle, string $calleCruce1, 
            string $calleCruce2, string $numeroExterior, ?string $numeroInterior, 
            int $codigoPostal, string $colonia, int $comunidadParroquial) {
        $this->calle = $calle;
        $this->calleCruce1 = $calleCruce1;
        $this->calleCruce2 = $calleCruce2;
        $this->numeroExterior = $numeroExterior;
        $this->numeroInterior = $numeroInterior;
        $this->codigoPostal = $codigoPostal;
        $this->colonia = $colonia;
        $this->comunidadParroquial = $comunidadParroquial;
    }

    public function getColonia(): string {
        return $this->colonia;
    }

    public function setColonia(string $colonia): void {
        $this->colonia = $colonia;
    }

    public function getCalle(): string {
        return $this->calle;
    }

    public function getCalleCruce1(): string {
        return $this->calleCruce1;
    }

    public function getCalleCruce2(): string {
        return $this->calleCruce2;
    }

    public function getNumeroExterior(): string {
        return $this->numeroExterior;
    }

    public function getNumeroInterior(): ?string {
        return $this->numeroInterior;
    }

    public function getCodigoPostal(): int {
        return $this->codigoPostal;
    }

    public function getComunidadParroquial(): int {
        return $this->comunidadParroquial;
    }

    public function setCalle(string $calle): void {
        $this->calle = $calle;
    }

    public function setCalleCruce1(string $calleCruce1): void {
        $this->calleCruce1 = $calleCruce1;
    }

    public function setCalleCruce2(string $calleCruce2): void {
        $this->calleCruce2 = $calleCruce2;
    }

    public function setNumeroExterior(string $numeroExterior): void {
        $this->numeroExterior = $numeroExterior;
    }

    public function setNumeroInterior(?string $numeroInterior): void {
        $this->numeroInterior = $numeroInterior;
    }

    public function setCodigoPostal(int $codigoPostal): void {
        $this->codigoPostal = $codigoPostal;
    }

    public function setComunidadParroquial(int $comunidadParroquial): void {
        $this->comunidadParroquial = $comunidadParroquial;
    }
}
