<?php

class EstadisticasDAO extends DAO
{
    private const RECUPERAR_ESTADISTICAS_LINEA_BASE = "CALL consultar_estadisticas_linea_base (?,?,?)";
    private const RECUPERAR_ESTADISTICAS_LINEA_BASE_DETALLES = "SELECT CAMPOS FROM estadisticas_linea_base_detalles lb";
    private const RECUPERAR_ESTADISTICAS_DEMOGRAFICAS = "CALL consultar_estadistica_demografica(?,?,?)";

    /**
     * Obtiene las estadísticas agregadas para el dashboard de línea base.
     *
     * @return array Un arreglo con los datos para cada pregunta y la lista de emprendedores filtrados.
     */
    public function obtenerEstadisticasLineaBase($seleccion, $etapa, $fechaInicio, $fechaFin)
    {
        return [
            "categorias" => $this->consultarCategoriasLineaBase($etapa, $fechaInicio, $fechaFin),
            "detalle" => $this->obtenerDetalleLineaBase($seleccion, $etapa, $fechaInicio, $fechaFin)
        ];

    }

    public function camposDisponiblesReporte()
    {
        return [
            "referencia" => ["campo" => "Referencia", "obligatorio" => true],
            "fechaCredito" => ["campo" => "Fecha de crédito", "obligatorio" => true],
            'graduado' => ["campo" => "Graduado", "obligatorio" => true],
            'fechaGraduacion' => ["campo" => "Fecha de graduación", "obligatorio" => true],
            "emprendedor" => ["campo" => "Emprendedor", "obligatorio" => true],
            "etapaNombre" => ["campo" => "Etapa", "obligatorio" => false],
            "correo" => ["campo" => "Correo", "obligatorio" => false],
            "tel" => ["campo" => "Celular", "obligatorio" => false],
            "razonRecurreDescripcion" => ["campo" => "Recurre a la Fundación para", "obligatorio" => false],
            "solicitaCreditoDescripcion" => ["campo" => "El crédito lo solicitarías para", "obligatorio" => false],
            "utilizaCreditoDescripcion" => ["campo" => "El crédito lo utilizarías para", "obligatorio" => false],
            "mediosConocimiento" => ["campo" => "¿Cómo te enteraste de la Fundación?", "obligatorio" => false],
            "fechaCreacion" => ["campo" => "Fecha de registro", "obligatorio" => true],
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
    private function obtenerDetalleLineaBase($seleccion, $etapa, $fechaInicio, $fechaFin)
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
        return $this->ejecutarInstruccionResult(str_replace("CAMPOS", $seleccion, $sql));
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

    /**
     * Obtiene las estadísticas demográficas.
     *
     * @param string $fechaInicio Fecha de inicio (puede ser vacío).
     * @param string $fechaFin    Fecha de fin (puede ser vacío).
     * @param int $idEtapa        ID de la etapa (puede ser 0).
     * 
     * @return array Un arreglo con los datos demográficos organizados por categoría.
     */
    public function obtenerEstadisticasDemograficas($fechaInicio, $fechaFin, $idEtapa)
    {
        $prep = $this->prepararInstruccion(self::RECUPERAR_ESTADISTICAS_DEMOGRAFICAS);
        $prep->agregarNullableString(empty($fechaInicio) ? null : $fechaInicio);
        $prep->agregarNullableString(empty($fechaFin) ? null : $fechaFin);
        $prep->agregarInt($idEtapa);
        
        $resultado = $prep->ejecutarConsultaMultiple();

        // Organizar los resultados en un arreglo asociativo
        $datos = [
            'totales' => [],
            'rangosEdad' => [],
            'municipios' => []
        ];

        // Clasificar los resultados según la categoría
        foreach ($resultado as $row) {
            switch ($row['categoria']) {
                case 'Participantes':
                    $datos['totales'][] = $row;
                    break;
                case 'Rango Edad':
                    $datos['rangosEdad'][] = $row;
                    break;
                case 'Municipios':
                    $datos['municipios'][] = $row;
                    break;
            }
        }
        return $datos;
    }

    public function obtenerEstadisticasDetalle($fechaInicio, $fechaFin, $idEtapa)
    {
        return $this->obtenerDetalleLineaBase('*', $idEtapa, $fechaInicio, $fechaFin);
    }

}
