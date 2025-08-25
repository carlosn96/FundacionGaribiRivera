<?php

class AsistenciaTallerDAO extends DAO {

    public function guardarAsistencia($idTaller, $idEmprendedor, $fecha) {
        $sql = "INSERT INTO asistencia_taller (id_taller, id_emprendedor, fecha) VALUES (?, ?, ?)";
        $stmt = $this->prepararInstruccion($sql);
        $stmt->bind_param("iis", $idTaller, $idEmprendedor, $fecha);
        return $stmt->execute();
    }
}
