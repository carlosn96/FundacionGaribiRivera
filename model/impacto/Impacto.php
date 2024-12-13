<?php

class Impacto {

    use Entidad;

    private array $secciones;
    private string $nombre;

    public function __construct(string $nombre) {
        $this->nombre = $nombre;
    }

    public function addSeccion(string $seccion) {
        $this->secciones[] = $seccion;
    }
}
