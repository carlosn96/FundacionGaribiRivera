<?php

class EstudioSocioeconomicoSeccionReferencias {

    use Entidad;

    private array $comercial;
    private array $personal;
    private array $familiar;

    public function __construct(array $comercial, array $familiar, array $personal) {
        $this->comercial = $comercial;
        $this->personal = $personal;
        $this->familiar = $familiar;
    }
}
