<?php

class Taller
{

    use Entidad;

    private int $id;
    private string $nombre;
    private array|int $tipoTaller;
    private bool $evaluacionHabilitada;
    private string $observaciones;
    private InstructorTaller|int $instructor;
    private int $numeroTaller;

    public function __construct(string $nombre, array|int $tipoTaller, bool $evaluacionHabilitada, string $observaciones, InstructorTaller|int $instructor, int $numeroTaller = 0, int $id = 0)
    {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->tipoTaller = $tipoTaller;
        $this->evaluacionHabilitada = $evaluacionHabilitada;
        $this->observaciones = $observaciones;
        $this->instructor = $instructor;
        $this->numeroTaller = $numeroTaller;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getNombre(): string
    {
        return $this->nombre;
    }

    public function getTipoTaller(): array|int
    {
        return $this->tipoTaller;
    }

    public function getEvaluacionHabilitada(): bool
    {
        return $this->evaluacionHabilitada;
    }

    public function getObservaciones(): string
    {
        return $this->observaciones;
    }

    public function getInstructor(): InstructorTaller|int
    {
        return $this->instructor;
    }

    public function getNumeroTaller(): int
    {
        return $this->numeroTaller;
    }

    public function setId(int $id): void
    {
        $this->id = $id;
    }

    public function setNombre(string $nombre): void
    {
        $this->nombre = $nombre;
    }

    public function setTipoTaller(array $tipoTaller): void
    {
        $this->tipoTaller = $tipoTaller;
    }

    public function setEvaluacionHabilitada(bool $evaluacionHabilitada): void
    {
        $this->evaluacionHabilitada = $evaluacionHabilitada;
    }

    public function setObservaciones(string $observaciones): void
    {
        $this->observaciones = $observaciones;
    }

    public function setInstructor(Instructor $instructor): void
    {
        $this->instructor = $instructor;
    }

    public function setNumeroTaller(int $numeroTaller): void
    {
        $this->numeroTaller = $numeroTaller;
    }
}
