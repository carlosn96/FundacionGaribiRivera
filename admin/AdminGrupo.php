<?php

class AdminGrupo {

    private $dao;

    public function __construct() {
        $this->dao = new GrupoDAO();
    }
    
    public function crear_grupo($form) {
        $clave = $form["clave"];
        $seudonimo = $form["seudonimo"];
        $carrera = $form["carrera"];
        $plantel = $form["plantel"];
        return $this->dao->agregar(new Grupo($clave, $carrera, $plantel, $seudonimo));
    }

    function listar_grupos($carrera, $plantel) {
        return $this->dao->listar_grupos($carrera, $plantel);
    }
    
    function eliminar($id) {
        return $this->dao->eliminar($id);
    }

}
