<?php

class EstadisticasDAO extends DAO
{

    private const RECUPERAR_ESTADISTICAS_LINEA_BASE = "SELECT * FROM estadisticas_linea_base";

    /**
     * Obtiene las estadísticas agregadas para el dashboard de línea base.
     *
     * @return array Un arreglo con los datos para cada pregunta.
     */
    public function obtenerEstadisticasLineaBase()
    {

        // Ejecutar la consulta y devolver los resultados
        $resultado = $this->ejecutarInstruccionResult(self::RECUPERAR_ESTADISTICAS_LINEA_BASE);
        // Organizar los resultados en un arreglo asociativo
        $datos = [
            'mediosConocimiento' => [],
            'razonRecurre' => [],
            'solicitaCredito' => [],
            'utilizaCredito' => []
        ];

        foreach ($resultado as $row) {
            // Asignar los resultados a las categorías correspondientes
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
