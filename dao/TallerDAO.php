<?php

class TallerDAO extends DAO
{

    private const LISTAR_TALLERES = "listar_talleres";
    private const LISTAR_INSTRUCTORES = "listar_taller_instructor";
    private const LISTAR_NOMBRE_TALLERES = "SELECT id_taller id, CONCAT(nombre_taller, ' (', tipo_taller_descripcion, ')') nombre FROM listar_talleres";
    private const ACTUALIZAR_TALLER = "CALL actualizar_taller(?,?,?,?,?,?,?)";
    private const GUARDAR_TALLER = "CALL guardar_taller(?,?,?,?,?,?)";
    private const GUARDAR_INSTRUCTOR = "CALL guardar_instructor_taller(?)";
    private const ACTUALIZAR_INSTRUCTOR = "CALL actualizar_instructor_taller(?)";

    private function listarTalleresCondicion($where)
    {
        return $this->selectPorCamposEspecificos("*", self::LISTAR_TALLERES, $where, true);
    }

    function listarTalleres($tipoTaller)
    {
        $where = empty($tipoTaller) ? "" : "  WHERE idTipoTaller = " . $tipoTaller;
        return $this->listarTalleresCondicion($where);
    }

    function listarTalleresPorInstructor($id)
    {
        return $this->listarTalleresCondicion("  WHERE idInstructor = $id ");
    }

    function listarNombreTalleres()
    {
        return $this->selectPorCamposEspecificos("*", self::LISTAR_NOMBRE_TALLERES, "");
    }

    function listarInstructores()
    {
        return $this->recuperarInstructores("");
    }

    function obtenerInstructorPorId($id)
    {
        return ($instructor = $this->recuperarInstructores(" WHERE idInstructor = $id")) ? $instructor[0] : null;
    }

    private function recuperarInstructores($where)
    {
        return $this->selectPorCamposEspecificos("*", self::LISTAR_INSTRUCTORES, $where, true);
    }

    public function actualizarTaller(Taller $taller)
    {
        $prep = $this->prepararInstruccion(self::ACTUALIZAR_TALLER);
        $prep->agregarInt($taller->getId());
        $prep->agregarString($taller->getNombre());
        $prep->agregarInt($taller->getInstructor());
        $prep->agregarInt($taller->getTipoTaller());
        $prep->agregarString($taller->getObservaciones());
        $prep->agregarBoolean($taller->getEvaluacionHabilitada());
        $prep->agregarInt($taller->getNumeroTaller());
        return $prep->ejecutar();
    }

    public function agregarTaller(Taller $taller)
    {
        $prep = $this->prepararInstruccion(self::GUARDAR_TALLER);
        $prep->agregarString($taller->getNombre());
        $prep->agregarInt($taller->getInstructor());
        $prep->agregarInt($taller->getTipoTaller());
        $prep->agregarString($taller->getObservaciones());
        $prep->agregarBoolean($taller->getEvaluacionHabilitada());
        $prep->agregarInt($taller->getNumeroTaller());
        return $prep->ejecutar();
    }

    public function eliminarTaller($id)
    {
        return $this->eliminarPorId("taller", "id_taller", $id);
    }

    public function eliminarInstructor($id) 
    {
        return $this->eliminarPorId("taller_instructor", "id_instructor", $id);
    }

    public function guardarInstructor(InstructorTaller $instructor)
    {
        $prep = $this->prepararInstruccion(self::GUARDAR_INSTRUCTOR);
        $prep->agregarEntidad($instructor);
        return $prep->ejecutar();
    }

    public function actualizarInstructor(InstructorTaller $instructor)
    {
        $prep = $this->prepararInstruccion(self::ACTUALIZAR_INSTRUCTOR);
        $prep->agregarEntidad($instructor);
        return $prep->ejecutar();
    }

    public function listarTalleresPorEtapa($idEtapa)
    {
        $sql = "SELECT c.id_taller, t.nombreTaller as nombre_taller, DATE_FORMAT(c.fecha, '%d/%m/%Y') as fecha 
                FROM cronograma_taller c
                JOIN listar_talleres t ON c.id_taller = t.idTaller
                WHERE c.id_etapa = ? 
                ORDER BY c.fecha ASC";
        $prep = $this->prepararInstruccion($sql);
        $prep->agregarInt($idEtapa);
        return $prep->ejecutarConsultaMultiple();
    }

    public function recuperarListaInscritos($idTaller, $idEtapa)
    {
        $sql = "SELECT e.id, e.nombre, e.apellidos, e.correo_electronico, e.numero_celular, e.fotografia,
                       COALESCE(a.asiste, 0) as asiste, a.observacion
                FROM listar_emprendedores_por_etapa e
                LEFT JOIN asistencia_taller a 
                       ON e.id = a.id_emprendedor AND a.id_taller = ? AND a.id_etapa = ?
                WHERE e.id_etapa = ?";

        $prep = $this->prepararInstruccion($sql);
        $prep->agregarInt($idTaller);
        $prep->agregarInt($idEtapa);
        $prep->agregarInt($idEtapa);
        $res = $prep->ejecutarConsultaMultiple();

        // Transformar de BIN a Base64 usando la utilidad del sistema
        if ($res && is_array($res)) {
            foreach ($res as &$row) {
                if (!empty($row['fotografia'])) {
                    $row['fotografia'] = Util::binToBase64($row['fotografia']);
                }
            }
        }

        return $res;
    }

    public function actualizarAsistencia($idTaller, $idAsistente, $idEtapa, $asiste, $observacion)
    {
        $sql = "INSERT INTO asistencia_taller (id_taller, id_emprendedor, id_etapa, asiste, observacion, fecha) 
                VALUES (?, ?, ?, ?, ?, CURDATE()) 
                ON DUPLICATE KEY UPDATE asiste = VALUES(asiste), observacion = VALUES(observacion), fecha = VALUES(fecha)";
        $prep = $this->prepararInstruccion($sql);
        $prep->agregarInt($idTaller);
        $prep->agregarInt($idAsistente);
        $prep->agregarInt($idEtapa);
        $prep->agregarInt($asiste);
        $prep->agregarString($observacion !== null ? $observacion : "");
        return $prep->ejecutar();
    }

    public function recuperarAsistenciasEmprendedor($idEmprendedor)
    {
        $sql = "SELECT t.nombreTaller as nombre_taller, 
                       DATE_FORMAT(a.fecha, '%d/%m/%Y') as fecha,
                       a.observacion as descripcion,
                       a.asiste as asistio
                FROM asistencia_taller a
                JOIN listar_talleres t ON a.id_taller = t.idTaller
                WHERE a.id_emprendedor = ?
                ORDER BY a.fecha DESC";
        $prep = $this->prepararInstruccion($sql);
        $prep->agregarInt($idEmprendedor);
        return $prep->ejecutarConsultaMultiple();
    }
}
