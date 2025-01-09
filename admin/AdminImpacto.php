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

    public function actualizarConfiguracionListaEmprendedores(array $lista, int $idUsuario) {
        return $this->dao->actualizarConfiguracionListaEmprendedores(array_map('intval', $lista), $idUsuario);
    }
    
    public function recuperarVistaGeneral($tipo) {
        return $this->dao->recuperarVistaGeneral($tipo);
    }
}
