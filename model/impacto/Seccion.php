<?php

class Seccion {

    use Entidad;

    private string $titulo;
    private array $cuestionario;
    
    public function __construct(string $titulo) {
        $this->titulo = $titulo;
    }


    public function addPregunta(string $pregunta) { 
        $this->cuestionario[] = $pregunta;
    }
}
