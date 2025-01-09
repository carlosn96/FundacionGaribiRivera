<?php

class Evento {

    use Entidad;

    private string $titulo;
    private string $descripcion;
    private string $fecha;
    private string $url;
    private string $imagen;

    public function __construct(string $titulo, string $descripcion, string $fecha, string $url, string $imagen) {
        $this->titulo = $titulo;
        $this->descripcion = $descripcion;
        $this->fecha = $fecha;
        $this->url = $url;
        $this->imagen = $imagen;
    }
}
