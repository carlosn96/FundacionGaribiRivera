<?php
require_once __DIR__ . '/../../../../../loader.php';

class EstadisticasAPI extends API
{

    public function filtrarEstadisticas()
    {
        $fechaFin = empty($d = $this->getData("fechaFin")) ? $d : Util::obtenerFechaEstandar($d);
        $fechaInicio = empty($d = $this->getData("fechaInicio")) ? $d : Util::obtenerFechaEstandar($d);
        $etapa = intval($this->getData("etapa"));
        $this->enviarRespuesta(getAdminEstadisticas()->obtenerEstadisticasLineaBase($this->getData('campos'), $etapa, $fechaInicio, $fechaFin));
    }

    public function init()
    {
        $adminEst = getAdminEstadisticas();
        $this->enviarRespuesta([
            "estadistica" => $adminEst->obtenerEstadisticasLineaBase(array_keys($campos = $adminEst->camposDisponiblesReporte())),
            "listaEtapas" => getAdminEtapaFormacion()->listarEtapasFormacion(),
            "campos" => $campos
        ]);
    }
}

EstadisticasAPI::start();
