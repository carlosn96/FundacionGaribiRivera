<?php


class AdminImpacto extends Admin {

    public function __construct() {
        parent::__construct(new ImpactoDAO());
    }
    
    public function getMedicionImpacto($usuario) {
        return $this->dao->getMedicionImpacto($usuario);
    }
    
    public function actualizarConfiguracionAnios($inicio, $fin, $usuario) {
        return $this->dao->actualizarConfiguracionAnios($inicio, $fin, $usuario);
    }
}
