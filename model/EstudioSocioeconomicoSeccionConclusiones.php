<?php

class EstudioSocioeconomicoSeccionConclusiones {

    use Entidad;

    private array $actitudesPositivas;
    private array $actitudesNegativas;
    private string $observaciones;
    private array $fotografias;

    public function __construct(array $actitudesPositivas, array $actitudesNegativas, string $observaciones, array $fotografias) {
        $this->actitudesPositivas = $actitudesPositivas;
        $this->actitudesNegativas = $actitudesNegativas;
        $this->observaciones = $observaciones;
        $this->fotografias = $fotografias;
    }
}
