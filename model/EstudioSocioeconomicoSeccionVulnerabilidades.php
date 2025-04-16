<?php

class EstudioSocioeconomicoSeccionVulnerabilidades {

    use Entidad;

    private int $esVulnerable;
    private array $vulnerabilidades;

    public function __construct(array $vulnerabilidades) {
        $this->esVulnerable = count($vulnerabilidades) > 0;
        $this->vulnerabilidades = $vulnerabilidades;
    }
}
