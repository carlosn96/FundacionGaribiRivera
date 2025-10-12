<?php

class EstadisticasDAO extends DAO
{
    private const RECUPERAR_ESTADISTICAS_LINEA_BASE = "CALL consultar_estadisticas_linea_base (?,?,?)";
    private const RECUPERAR_ESTADISTICAS_LINEA_BASE_DETALLES = "SELECT * FROM estadisticas_linea_base_detalles lb";

    /**
     * Obtiene las estadísticas agregadas para el dashboard de línea base.
     *
     * @return array Un arreglo con los datos para cada pregunta.
     */
    public function obtenerEstadisticasLineaBase($etapa, $fechaInicio, $fechaFin)
    {
        return [
            "categorias" => $this->consultarCategoriasLineaBase($etapa, $fechaInicio, $fechaFin),
            "detalle" => $this->obtenerDetalleLineaBase($etapa, $fechaInicio, $fechaFin)
        ];

    }

    /**
     * Filtra las estadísticas según la etapa, fecha de inicio y fecha de fin.
     *
     * @param string $etapa        ID de la etapa (puede ser vacío).
     * @param string $fechaInicio  Fecha de inicio (puede ser vacío).
     * @param string $fechaFin     Fecha de fin (puede ser vacío).
     * 
     * @return array Un arreglo con los datos filtrados.
     */
    private function obtenerDetalleLineaBase($etapa, $fechaInicio, $fechaFin)
    {
        // Inicializar el array de condiciones
        $condiciones = [];

        // Filtrar por fecha si las fechas no están vacías
        if (!empty($fechaInicio) && !empty($fechaFin)) {
            $condiciones[] = "lb.fechaCreacion BETWEEN '$fechaInicio' AND '$fechaFin'";
        }

        // Filtrar por etapa si no está vacía
        if ($etapa) {
            $condiciones[] = "lb.idEtapa = $etapa";
        }

        // Si no hay filtros, no se agregan condiciones
        $where = '';
        if (!empty($condiciones)) {
            $where = 'WHERE ' . implode(' AND ', $condiciones);
        }
        $sql = self::RECUPERAR_ESTADISTICAS_LINEA_BASE_DETALLES . " $where";
        return $this->ejecutarInstruccionResult($sql);
    }



    private function consultarCategoriasLineaBase($etapa, $fechaInicio, $fechaFin)
    {
        $prep = $this->prepararInstruccion(self::RECUPERAR_ESTADISTICAS_LINEA_BASE);
        $prep->agregarString($fechaInicio);
        $prep->agregarString($fechaFin);
        $prep->agregarInt($etapa);

        $resultado = $prep->ejecutarConsultaMultiple();

        // Organizar los resultados en un arreglo asociativo
        $datos = [
            'mediosConocimiento' => [],
            'razonRecurre' => [],
            'solicitaCredito' => [],
            'utilizaCredito' => []
        ];

        // Clasificar los resultados según la categoría
        foreach ($resultado as $row) {
            switch ($row['categoria']) {
                case 'Medio Conocimiento':
                    $datos['mediosConocimiento'][] = $row;
                    break;
                case 'Razon Recurre':
                    $datos['razonRecurre'][] = $row;
                    break;
                case 'Solicita Credito':
                    $datos['solicitaCredito'][] = $row;
                    break;
                case 'Utiliza Credito':
                    $datos['utilizaCredito'][] = $row;
                    break;
            }
        }

        return $datos;
    }
}
