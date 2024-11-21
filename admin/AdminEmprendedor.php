<?php

class AdminEmprendedor extends Admin {

    public function __construct() {
        parent::__construct(new EmprendedorDAO());
    }

    public function listar() {
        return $this->dao->listar();
    }

    public function guardarSeguimientoCaso($data) {
        return $this->dao->guardarSeguimientoCaso($this->construirSeguimientoCaso($data));
    }

    public function recuperarSeguimientoCaso($idLineaBase) {
        $data = $this->dao->recuperarSeguimientoCaso($idLineaBase);
        $segCaso = [];
        if ($data) {
            $data["fotografiasCaso"] = explode(",", $data["fotografiasCaso"]);
            $data["etapasFormacionCursadas"] = explode(",", $data["etapasFormacionCursadas"]);
            $segCaso = $this->construirSeguimientoCaso($data)->toArray();
        }
        return $segCaso;
    }

    private function construirSeguimientoCaso($data): SeguimientoCaso {
        $idLineaBase = $data["idLineaBase"];
        $numeroCaso = $data["numeroCaso"];
        $etapasFormacion = $data["etapasFormacionCursadas"];
        $observacionesGenerales = $data["observacionesGenerales"];
        $fotografiasCaso = $data["fotografiasCaso"];
        $idSeguimientoCaso = $data["idSeguimiento"] ?? 0;
        return new SeguimientoCaso($idLineaBase, $numeroCaso, $etapasFormacion,
                $observacionesGenerales, $fotografiasCaso, $idSeguimientoCaso);
    }

    public function eliminarSeguimientoCaso($id) {
        return $this->dao->eliminarSeguimientoCaso($id);
    }

    public function eliminarEmprendedor($id) {
        return $this->dao->eliminarEmprendedor($id);
    }
}
