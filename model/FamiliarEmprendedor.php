<?php

class FamiliarEmprendedor {

    use Entidad;

    private string $nombre;
    private string $parentesco;
    private int $edad;
    private int|array $estadoCivil;
    private int|array $escolaridad;
    private int|array $ocupacion;
    private float $ingresMensualFijo;
    private float $ingresoMensualVariable;

    public function __construct(string $nombre, string $parentesco, int $edad,
            int|array $estadoCivil, int|array $escolaridad, int|array $ocupacion,
            float $ingresMensualFijo, float $ingresoMensualVariable) {
        $this->nombre = $nombre;
        $this->parentesco = $parentesco;
        $this->edad = $edad;
        $this->estadoCivil = $estadoCivil;
        $this->escolaridad = $escolaridad;
        $this->ocupacion = $ocupacion;
        $this->ingresMensualFijo = $ingresMensualFijo;
        $this->ingresoMensualVariable = $ingresoMensualVariable;
    }

    public function getNombre(): string {
        return $this->nombre;
    }

    public function getParentesco(): string {
        return $this->parentesco;
    }

    public function getEdad(): int {
        return $this->edad;
    }

    public function getEstadoCivil(): int|array {
        return $this->estadoCivil;
    }

    public function getEscolaridad(): int|array {
        return $this->escolaridad;
    }

    public function getOcupacion(): int|array {
        return $this->ocupacion;
    }

    public function getIngresMensualFijo(): float {
        return $this->ingresMensualFijo;
    }

    public function getIngresoMensualVariable(): float {
        return $this->ingresoMensualVariable;
    }

    public function setNombre(string $nombre): void {
        $this->nombre = $nombre;
    }

    public function setParentesco(string $parentesco): void {
        $this->parentesco = $parentesco;
    }

    public function setEdad(int $edad): void {
        $this->edad = $edad;
    }

    public function setEstadoCivil(int|array $estadoCivil): void {
        $this->estadoCivil = $estadoCivil;
    }

    public function setEscolaridad(int|array $escolaridad): void {
        $this->escolaridad = $escolaridad;
    }

    public function setOcupacion(int|array $ocupacion): void {
        $this->ocupacion = $ocupacion;
    }

    public function setIngresMensualFijo(float $ingresMensualFijo): void {
        $this->ingresMensualFijo = $ingresMensualFijo;
    }

    public function setIngresoMensualVariable(float $ingresoMensualVariable): void {
        $this->ingresoMensualVariable = $ingresoMensualVariable;
    }
}
