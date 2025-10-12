<?php
require_once __DIR__ . '/../../../../../loader.php';

class EstadisticasAPI extends API
{

    public function filtrarEstadisticas()
    {

        $fechaFin = empty($d = $this->getData("fechaFin")) ? $d : Util::obtenerFechaEstandar($d);
        $fechaInicio = empty($d = $this->getData("fechaInicio")) ? $d : Util::obtenerFechaEstandar($d);
        $etapa = intval($this->getData("etapa"));
        Util::error_log("Pasando etapa=$etapa" . " fechaInicio=$fechaInicio" . " fechaFin=$fechaFin");
        $this->enviarRespuesta(getAdminEstadisticas()->obtenerEstadisticasLineaBase($etapa, $fechaInicio, $fechaFin));
    }

    public function init()
    {
        $this->enviarRespuesta([
            "estadistica" => getAdminEstadisticas()->obtenerEstadisticasLineaBase(),
            "listaEtapas" => getAdminEtapaFormacion()->listarEtapasFormacion()
        ]);
    }
}

EstadisticasAPI::start();
