<?php

class EtapaFormacionDAO extends DAO {

    private const TABLA = "etapa_formacion";
    private const VISTA = "listar_etapas_formacion";
    private const LISTAR_ETAPAS_FORMACION = "SELECT * FROM " . self::VISTA;
    private const LISTAR_TIPOS_ETAPAS_FORMACION = "SELECT * FROM " . self::TABLA . "_tipo";
    private const OBTENER_ETAPA_ACTUAL = self::LISTAR_ETAPAS_FORMACION . " WHERE esActual = 1";
    private const INSERTAR_ETAPA = "CALL guardar_etapa_formacion(?,?,?,?,?)";
    private const ACTUALIZAR_ETAPA = "UPDATE " . self::TABLA . " SET nombre = ?, fecha_inicio = ?, fecha_fin = ?, clave_acceso = ?, id_tipo=? WHERE id_etapa = ?";
    private const ELIMINAR_ETAPA = "CALL eliminar_etapa_formacion(?)";
    private const ACTUALIZAR_ETAPA_ACTUAL = "CALL actualizar_etapa_actual(?)";

    public function listarEtapasFormacion($anio) {
        $where = empty($anio) || is_null($anio) ? "" : " WHERE fechaInicio BETWEEN $anio AND $anio";
        $rs = $this->ejecutarInstruccion(self::LISTAR_ETAPAS_FORMACION. $where." ORDER BY fechaInicio DESC");
        return $rs ? $rs->fetch_all(MYSQLI_ASSOC) : [];
    }

    public function obtenerEtapaActual() {
        $rs = $this->ejecutarInstruccion(self::OBTENER_ETAPA_ACTUAL);
        return $rs ? $rs->fetch_assoc() : [];
    }

    public function listarTiposEtapasFormacion() {
        $rs = $this->ejecutarInstruccion(self::LISTAR_TIPOS_ETAPAS_FORMACION);
        return $rs ? $rs->fetch_all(MYSQLI_ASSOC) : [];
    }

    public function insertarEtapa(EtapaFormacion $etapa) {
        $prep = $this->prepararInstruccion(self::INSERTAR_ETAPA);
        $prep->agregarString($etapa->getNombre());
        $prep->agregarString($etapa->getFechaInicio());
        $prep->agregarString($etapa->getFechaFin());
        $prep->agregarInt($etapa->getTipo());
        $prep->agregarString($etapa->getClaveAcceso());
        
        return $prep->ejecutar();
    }

    public function eliminarEtapa($id) {
        $prep = $this->prepararInstruccion(self::ELIMINAR_ETAPA);
        $prep->agregarInt($id);
        return $prep->ejecutar();
    }

    public function actualizarEtapa(EtapaFormacion $etapa) {
        $prep = $this->prepararInstruccion(self::ACTUALIZAR_ETAPA);
        $prep->agregarString($etapa->getNombre());
        $prep->agregarString($etapa->getFechaInicio());
        $prep->agregarString($etapa->getFechaFin());
        $prep->agregarString($etapa->getClaveAcceso());
        $prep->agregarInt($etapa->getTipo());
        $prep->agregarInt($etapa->getIdEtapa());
        return $prep->ejecutar();
    }

    public function actualizarEtapaActual($id) {
        $prep = $this->prepararInstruccion(self::ACTUALIZAR_ETAPA_ACTUAL);
        $prep->agregarInt($id);
        return $prep->ejecutar();
    }

}
