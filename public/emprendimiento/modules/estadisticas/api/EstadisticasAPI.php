<?php
require_once __DIR__ . '/../../../../../loader.php';

class EstadisticasAPI extends API
{

    public function obtenerEstadisticasLineaBase()
    {
        $data = getAdminEstadisticas()->obtenerEstadisticasLineaBase();
        $this->enviarRespuesta($data);
    }
}

EstadisticasAPI::start();
