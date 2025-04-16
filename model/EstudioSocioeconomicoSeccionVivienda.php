<?php

class EstudioSocioeconomicoSeccionVivienda {

    use Entidad;

    private int|array $tipo;
    private int|array $condicion;
    private int|array $familiasHabitantes;
    private int|array $uso;
    private array $piso;
    private array $techo;
    private array $paredes;
    private array $distribucion;
    private array $servicios;

    public function __construct(int|array $tipo, int|array $condicion, int|array $familiasHabitantes, int|array $uso, array $piso, array $techo, array $paredes, array $distribucion, array $servicios) {
        $this->tipo = $tipo;
        $this->condicion = $condicion;
        $this->familiasHabitantes = $familiasHabitantes;
        $this->uso = $uso;
        $this->piso = $piso;
        $this->techo = $techo;
        $this->paredes = $paredes;
        $this->distribucion = $distribucion;
        $this->servicios = $servicios;
    }
}
