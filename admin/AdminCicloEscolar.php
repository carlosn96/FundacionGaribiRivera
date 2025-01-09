<?php

class AdminCicloEscolar {

    private $dao;

    public function __construct() {
        $this->dao = new CicloEscolarDAO();
    }

    function agregar($nombre): bool {
        try {
            return $this->dao->agregar(new CicloEscolar($nombre));
        } catch (mysqli_sql_exception $e) {
            return false;
        }
    }

    public function recuperar_listado() {
        return $this->dao->recuperar_listado("");
    }
    
    public function recuperar_ciclo_actual($id_coordinador) {
        $configs = (new ConfigUsuarioDAO)->recuperar_configuracion_carrera_plantel($id_coordinador);
        return $configs["id_ciclo_escolar_actual"];
    }
    
    public function actualizar_ciclo_actual($id_coordinador, $ciclo) {
        return (new ConfigUsuarioDAO)->guardar_configuracion_ciclo_escolar($id_coordinador, $ciclo);
    }

    public function eliminar($id) {
        return $this->dao->eliminar($id);
    }
}
