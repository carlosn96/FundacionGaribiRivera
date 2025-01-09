<?php

class Seccion {

    use Entidad;

    private string $titulo;
    private array $mediciones;
    private float $peso;
    private float $obtenido;
    private float $contribucionImpacto;

    public function __construct(string $titulo, float $peso, array $mediciones, float $obtenido = 0) {
        $this->titulo = $titulo;
        $this->mediciones = $mediciones;
        $this->peso = $peso;
        if (empty($mediciones)) {
            $this->obtenido = round($obtenido, 2);
        } else {
            $this->setPromedio();
        }
        $this->contribucionImpacto = round($this->obtenido * ($this->peso / 100), 2);
    }

    private function setPromedio() {
        $sumaVariaciones = 0;
        foreach ($this->mediciones as $medicion) {
            $sumaVariaciones += $medicion->getVariacionPorcentual();
        }
        $this->obtenido = ($len = count($this->mediciones)) == 0 ? 0 : round($sumaVariaciones / $len, 2);
    }

    public function toSeccionArray() {
        $array = $this->toArray();
        foreach ($this->mediciones as $key => $medicion) {
            $array['mediciones'][$key] = $medicion->toArray();
        }
        return $array;
    }
}
