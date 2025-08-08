<?php

class EtapaDAO extends DAO
{

    private const GUARDAR_ETAPA = "INSERT INTO etapa (nombre, fecha_inicio, fecha_fin, clave_acceso) VALUE(?, ?, ?, ?)";
    private const GUARDAR_LISTA_TALLERES_ETAPA = "INSERT INTO list_talleres_etapa (id_etapa, id_taller) VALUE(?, ?)";
    private const LISTAR_ETAPAS = "SELECT * FROM etapa ORDER BY id_etapa DESC";
    private const ELIMINAR_ETAPA = "DELETE FROM etapa WHERE id_etapa = ?";
    private const RECUPERAR_ETAPA = "SELECT * FROM etapa WHERE id_etapa = ?";
    private const ACTUALIZAR_ETAPA = "UPDATE etapa SET nombre = ?, fecha_inicio = ?, fecha_fin = ?, clave_acceso = ? WHERE id_etapa = ?";
    private const SELECCIONAR_MIN_MAX_FECHA_ETAPA = "SELECT DATE(MIN(fecha_inicio)) min, DATE(MAX(fecha_fin)) max FROM etapa";
    
    function guardar($nombre, $fechaInicio, $fechaFin, $talleres, $claveAcceso)
    {
        $stat = $this->prepararInstruccion(self::GUARDAR_ETAPA);
        $stat->bind_param("ssss", $nombre, $fechaInicio, $fechaFin, $claveAcceso);
        return $stat->execute() && $this->guardarListaTalleresPorEtapa($this->obtenerIdAutogenerado(), $talleres);
    }

    private function guardarListaTalleresPorEtapa($idEtapa, $talleres)
    {
        $stat = $this->prepararInstruccion(self::GUARDAR_LISTA_TALLERES_ETAPA);
        $totalEjecucionesCorrectas = 0;
        foreach ($talleres as $taller) {
            $stat->bind_param("ii", $idEtapa, $taller);
            $totalEjecucionesCorrectas += $stat->execute();
        }
        return $totalEjecucionesCorrectas == count($talleres);
    }

    function listar()
    {
        return $this->ejecutarInstruccion(self::LISTAR_ETAPAS)->fetch_all(MYSQLI_ASSOC);
    }

    function recuperar($idEtapa)
    {
        //        $stat = $this->prepararInstruccion(self::RECUPERAR_ETAPA);
        //        $stat->bind_param("i", $idEtapa);
        //        $stat->execute();
        return $this->selectPorID(self::RECUPERAR_ETAPA, $idEtapa);
        //return $stat->get_result()->fetch_assoc();
    }

    function eliminar($idEtapa)
    {
        $stat = $this->prepararInstruccion(self::ELIMINAR_ETAPA);
        $stat->bind_param("i", $idEtapa);
        return $stat->execute();
    }

    function actualizar($etapa)
    {
        $stat = $this->prepararInstruccion(self::ACTUALIZAR_ETAPA);
        $nombre = $etapa->getNombre();
        $fechaInicio = $etapa->getFechaInicio();
        $fechaFin = $etapa->getFechaFin();
        $claveAcceso = $etapa->getClaveAcceso();
        $id = $etapa->getId();
        $stat->bind_param("ssssi", $nombre, $fechaInicio, $fechaFin, $claveAcceso, $id);
        return $stat->execute();
    }
    
    public function eliminarTalleresPorEtapa($idEtapa)
    {
        $sql = "DELETE FROM list_talleres_etapa WHERE id_etapa = ?";
        $stat = $this->prepararInstruccion($sql);
        $stat->bind_param("i", $idEtapa);
        return $stat->execute();
    }

    
    function verificarClaveAcceso($idEtapa, $claveAcceso)
    {
        $etapa = $this->recuperar($idEtapa);
        return strcmp($etapa["clave_acceso"], $claveAcceso) == 0;
    }
    
    function obtenerTotalEtapas()
    {
        return $this->recuperarCountAll("etapa");
    }
    
    function obtenerRangoFechas()
    {
        return $this->ejecutarInstruccion(self::SELECCIONAR_MIN_MAX_FECHA_ETAPA)->fetch_assoc();
    }

    function listarTalleresPorEtapa($idEtapa)
    {
        $sql = "SELECT t.* FROM taller t INNER JOIN list_talleres_etapa lte ON t.id_taller = lte.id_taller WHERE lte.id_etapa = ?";
        $stat = $this->prepararInstruccion($sql);
        $stat->bind_param("i", $idEtapa);
        $stat->execute();
        return $stat->get_result()->fetch_all(MYSQLI_ASSOC);
    }
    

}
