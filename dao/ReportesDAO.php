<?php

class ReportesDAO extends DAO {

    public function getPersonasCapacitadasPorAnio($anio) {
        $sql = "SELECT COUNT(DISTINCT id_emprendedor) AS total FROM asistencia_taller WHERE YEAR(fecha) = ?";
        $stmt = $this->prepararInstruccion($sql);
        $stmt->bind_param("i", $anio);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function getEmprendedoresConAsistenciaIncompleta() {
        $sql = "SELECT u.nombre, u.email, u.telefono, COUNT(DISTINCT a.id_taller) AS talleres_asistidos, (SELECT COUNT(*) FROM taller) AS talleres_totales FROM usuario u JOIN asistencia_taller a ON u.id = a.id_emprendedor GROUP BY u.id HAVING talleres_asistidos = talleres_totales - 1";
        return $this->ejecutarInstruccion($sql)->fetch_all(MYSQLI_ASSOC);
    }

    public function getAniosDisponibles() {
        $sql = "SELECT DISTINCT YEAR(fecha) AS anio FROM asistencia_taller ORDER BY anio DESC";
        return $this->ejecutarInstruccion($sql)->fetch_all(MYSQLI_ASSOC);
    }
}
