<?php

class Seccion {

    use Entidad;

    private string $titulo;
    private array $cuestionario;
    private float $peso;
    private float $obtenido;
    private float $contribucionImpacto;

    public function __construct(string $titulo, float $peso, array $cuestionario, float $obtenido = 0) {
        $this->titulo = $titulo;
        $this->cuestionario = $cuestionario;
        $this->peso = $peso;
        if (empty($cuestionario)) {
            $this->obtenido = round($obtenido, 2);
        } else {
            $this->setPromedio();
        }
        $this->contribucionImpacto = $this->obtenido * ($this->peso / 100);
    }

    private function setPromedio() {
        $this->obtenido = 0;
        foreach ($this->cuestionario as $medicion) {
            $this->obtenido += $medicion->getVariacionPorcentual();
        }
    }

    public function toSeccionArray() {
        $array = $this->toArray();
        foreach ($this->cuestionario as $key => $medicion) {
            $array['cuestionario'][$key] = $medicion->toArray();
        }
        return $array;
    }
}
