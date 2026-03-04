<?php

class EtapaFormacion
{

    use Entidad;

    private $idEtapa;
    private $nombre;
    private $fechaInicio;
    private $fechaFin;
    private $tipo;
    private bool $esActual;
    private int $modalidad;
    private array $talleres;

    public function __construct($idEtapa, $nombre, $fechaInicio, $fechaFin, $tipo, $esActual, $modalidad = null)
    {
        $this->idEtapa = $idEtapa;
        $this->nombre = $nombre;
        $this->fechaInicio = $fechaInicio;
        $this->fechaFin = $fechaFin;
        $this->tipo = $tipo;
        $this->esActual = $esActual;
        $this->modalidad = $modalidad ?? 0;
        $this->setTalleres([]);
    }

    public function getIdEtapa()
    {
        return $this->idEtapa;
    }
    public function getTalleres(): array
    {
        return $this->talleres;
    }

    public function setTalleres(array $talleres): void
    {
        $this->talleres = $talleres;
    }

    public function getIdEntidad()
    {
        return $this->idEtapa;
    }

    public function getNombre()
    {
        return $this->nombre;
    }

    public function getFechaInicio()
    {
        return $this->fechaInicio;
    }

    public function getFechaFin()
    {
        return $this->fechaFin;
    }

    public function getTipo()
    {
        return $this->tipo;
    }

    public function setIdEntidad($idEntidad): void
    {
        $this->idEtapa = $idEntidad;
    }

    public function setNombre($nombre): void
    {
        $this->nombre = $nombre;
    }

    public function setFechaInicio($fechaInicio): void
    {
        $this->fechaInicio = $fechaInicio;
    }

    public function setFechaFin($fechaFin): void
    {
        $this->fechaFin = $fechaFin;
    }

    public function getModalidad(): int
    {
        return $this->modalidad;
    }

    public function setModalidad(int $modalidad): void
    {
        $this->modalidad = $modalidad;
    }

    public function setTipo($tipo): void
    {
        $this->tipo = $tipo;
    }

}
