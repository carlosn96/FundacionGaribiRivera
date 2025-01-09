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

    public function eliminar($id) {
        return $this->dao->eliminar($id);
    }
}
