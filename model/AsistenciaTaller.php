<?php

class AsistenciaTaller extends Entidad {

    private $id_asistencia_taller;
    private $id_taller;
    private $id_emprendedor;
    private $fecha;

    public function __construct($id_taller, $id_emprendedor, $fecha) {
        $this->id_taller = $id_taller;
        $this->id_emprendedor = $id_emprendedor;
        $this->fecha = $fecha;
    }

    public function getIdAsistenciaTaller() {
        return $this->id_asistencia_taller;
    }

    public function getIdTaller() {
        return $this->id_taller;
    }

    public function getIdEmprendedor() {
        return $this->id_emprendedor;
    }

    public function getFecha() {
        return $this->fecha;
    }
}
