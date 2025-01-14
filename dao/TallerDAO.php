<?php

class TallerDAO extends DAO {

    private const LISTAR_TALLERES = "listar_talleres";
    private const LISTAR_INSTRUCTORES = "listar_taller_instructor";
    private const LISTAR_NOMBRE_TALLERES = "SELECT id_taller id, CONCAT(nombre_taller, ' (', tipo_taller_descripcion, ')') nombre FROM listar_talleres";
    private const ACTUALIZAR_TALLER = "CALL actualizar_taller(?,?,?,?,?,?)";
    private const GUARDAR_TALLER = "CALL guardar_taller(?,?,?,?,?)";

    function listarTalleres($tipoTaller) {
        $where = empty($tipoTaller) ? "" : "  WHERE idTipoTaller = " . $tipoTaller;
        return $this->selectPorCamposEspecificos("*", self::LISTAR_TALLERES, $where, true);
    }

    function listarNombreTalleres() {
        return $this->selectPorCamposEspecificos("*", self::LISTAR_NOMBRE_TALLERES, "");
    }

    function listarInstructores() {
        return $this->recuperarInstructores("");
    }

    function obtenerInstructorPorId($id) {
        return $this->recuperarInstructores(" WHERE idInstructor = $id")[0];
    }

    private function recuperarInstructores($where) {
        return $this->selectPorCamposEspecificos("*", self::LISTAR_INSTRUCTORES, $where, true);
    }

    public function actualizarTaller(Taller $taller) {
        $prep = $this->prepararInstruccion(self::ACTUALIZAR_TALLER);
        $prep->agregarInt($taller->getId());
        $prep->agregarString($taller->getNombre());
        $prep->agregarInt($taller->getInstructor());
        $prep->agregarInt($taller->getTipoTaller());
        $prep->agregarString($taller->getObservaciones());
        $prep->agregarBoolean($taller->getEvaluacionHabilitada());
        return $prep->ejecutar();
    }
    
    public function agregarTaller(Taller $taller) {
        $prep = $this->prepararInstruccion(self::GUARDAR_TALLER);
        $prep->agregarString($taller->getNombre());
        $prep->agregarInt($taller->getInstructor());
        $prep->agregarInt($taller->getTipoTaller());
        $prep->agregarString($taller->getObservaciones());
        $prep->agregarBoolean($taller->getEvaluacionHabilitada());
        return $prep->ejecutar();
    }
    
    public function eliminarTaller($id) {
        return $this->eliminarPorId("taller", "id_taller", $id);
    }
}
