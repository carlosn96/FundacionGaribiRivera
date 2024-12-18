<?php

class Medicion {

    use Entidad;

    private $inicial;
    private $final;
    private $variacionPorcentual;

    public function __construct($inicial, $final) {
        $this->inicial = $inicial;
        $this->final = $final;
        $this->setVariacionPorcentual();
    }

    public function getVariacionPorcentual() {
        return $this->variacionPorcentual;
    }

    public function getInicial() {
        return $this->inicial;
    }

    public function getFinal() {
        return $this->final;
    }

    public function setInicial($inicial): void {
        $this->inicial = $inicial;
        $this->setVariacionPorcentual();
    }

    public function setFinal($final): void {
        $this->final = $final;
        $this->setVariacionPorcentual();
    }

    private function setVariacionPorcentual() {
        if ($this->inicial == 0) {
            $this->variacionPorcentual = null;
        } else {
            $this->variacionPorcentual = round((($this->final - $this->inicial) / $this->inicial) * 100, 2);
        }
    }
}
