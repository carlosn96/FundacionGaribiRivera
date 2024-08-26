<?php

abstract class Admin {

    protected $dao;
    
    public function __construct(DAO $dao) {
        $this->dao = $dao;
    }

    protected function extraerInfoCampoEspecifico($nombre_tabla, $id, $campo, $where = "") {
        $lista = [];
        foreach ($this->dao->selectPorCamposEspecificos("*", $nombre_tabla, $where, true) as $tupla) {
            array_push($lista, [$id => $tupla[$id], $campo => $tupla[$campo]]);
        }
        return $lista;
    }

}
