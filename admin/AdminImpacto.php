<?php


class AdminImpacto extends Admin {

    public function __construct() {
        parent::__construct(new ImpactoDAO());
    }
    
    public function getMedicionImpacto() {
        return $this->dao->getMedicionImpacto();
    }
}
