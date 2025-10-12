<?php

class AdminEstadisticas extends Admin
{
    private $estadisticasDAO;

    public function __construct()
    {
        parent::__construct(new EstadisticasDAO());
    }

    /**
     * Orquesta la obtención de datos estadísticos y los devuelve como Array.
     */
    public function obtenerEstadisticasLineaBase($etapa = 0, $fechaInicio = '', $fechaFin = '')
    {
        return $this->dao->obtenerEstadisticasLineaBase($etapa, $fechaInicio, $fechaFin);
    }
}
