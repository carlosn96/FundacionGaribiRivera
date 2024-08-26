<?php

class SeguimientoCaso {

    use Entidad;

    private int $idLineaBase;
    private string $numeroCaso;
    private array $etapasFormacion;
    private string $observacionesGenerales;
    private array $fotografiasCaso;
    private int $idSeguimientoCaso;

    public function __construct(int $idLineaBase, string $numeroCaso, array $etapasFormacion,
            string $observacionesGenerales, array $fotografiasCaso, int $idSeguimientoCaso) {
        $this->idLineaBase = $idLineaBase;
        $this->numeroCaso = $numeroCaso;
        $this->etapasFormacion = $etapasFormacion;
        $this->observacionesGenerales = $observacionesGenerales;
        $this->fotografiasCaso = $fotografiasCaso;
        $this->idSeguimientoCaso = $idSeguimientoCaso;
    }
    
    public function getIdLineaBase(): int {
        return $this->idLineaBase;
    }

    public function setIdLineaBase(int $idLineaBase): void {
        $this->idLineaBase = $idLineaBase;
    }
    
    public function getNumeroCaso(): string {
        return $this->numeroCaso;
    }

    public function getEtapasFormacion(): array {
        return $this->etapasFormacion;
    }

    public function getObservacionesGenerales(): string {
        return $this->observacionesGenerales;
    }

    public function getFotografiasCaso(): array {
        return $this->fotografiasCaso;
    }

    public function setNumeroCaso(string $numeroCaso): void {
        $this->numeroCaso = $numeroCaso;
    }

    public function setEtapasFormacion(array $etapasFormacion): void {
        $this->etapasFormacion = $etapasFormacion;
    }

    public function setObservacionesGenerales(string $observacionesGenerales): void {
        $this->observacionesGenerales = $observacionesGenerales;
    }

    public function setFotografiasCaso(array $fotografiasCaso): void {
        $this->fotografiasCaso = $fotografiasCaso;
    }
}
