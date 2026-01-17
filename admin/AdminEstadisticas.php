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
    public function obtenerEstadisticasLineaBase(array $campos, $etapa = 0, $fechaInicio = '', $fechaFin = '')
    {
        $seleccion = empty($campos) ? '*' : implode(',', $campos);
        return $this->formatearRespuestaMultiple($this->dao->obtenerEstadisticasLineaBase($seleccion, $etapa, $fechaInicio, $fechaFin));
    }

    public function camposDisponiblesReporte()
    {
        return $this->dao->camposDisponiblesReporte();
    }

    /**
     * Orquesta la obtención de datos estadísticos demográficos y los devuelve como Array.
     */
    public function obtenerEstadisticasDemograficas($fechaInicio = '', $fechaFin = '', $idEtapa = 0)
    {
        return $this->dao->obtenerEstadisticasDemograficas($fechaInicio, $fechaFin, $idEtapa);
    }

    private function formatearRespuestaMultiple($respuesta)
    {
        if (isset($respuesta["detalle"][0]["mediosConocimiento"])) {
            foreach ($respuesta["detalle"] as &$detalle) {
                if (isset($detalle["mediosConocimiento"])) {
                    // Convierte la cadena en un array usando '^' como separador y elimina espacios extra
                    $detalle["mediosConocimiento"] = implode('; ', array_filter(
                        array_map('trim', explode('^', $detalle["mediosConocimiento"])),
                        fn($item) => $item !== ''
                    ));
                }
            }
            unset($detalle); // Buenas prácticas para referencias
        }
        return $respuesta;
    }

    public function obtenerEstadisticasDetalle($fechaInicio = '', $fechaFin = '', $idEtapa = 0)
    {
        return $this->dao->obtenerEstadisticasDetalle($fechaInicio, $fechaFin, $idEtapa);
    }

}
