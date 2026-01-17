<?php

require_once '../../../../../../admin/dompdf/vendor/autoload.php';

use Dompdf\Dompdf;

class EstadisticasCorporativaRenderer
{
    private const TEMPLATE_PATH = __DIR__ . '/plantilla_corporativa_simple.html';
    private $template;
    private $data;

    public function __construct($data)
    {
        $this->template = file_get_contents(self::TEMPLATE_PATH);
        $this->data = $data;
    }

    public function render($stream = true)
    {
        $html = $this->template;

        // Reemplazar placeholders principales
        $html = str_replace('{{TITULO}}', 'Estadísticas Demográficas - Fundación Garibi Rivera', $html);
        $html = str_replace('{{FECHA_GENERACION}}', Util::obtenerFechaActual('d/m/Y H:i:s'), $html);
        $html = str_replace('{{FECHA_ID}}', date('Y') . '-0525-GR-' . substr(uniqid(), -4), $html);

        // Generar secciones
        $html = str_replace('{{ESTADISTICAS_DEMOGRAFICAS}}', $this->generarEstadisticasDemograficas(), $html);
        $html = str_replace('{{MUNICIPIOS_SECTION}}', $this->generarSeccionMunicipios(), $html);
        $html = str_replace('{{DETALLES_PARTICIPANTES}}', $this->generarDetallesParticipantes(), $html);

        // Estadísticas generales
        $totales = $this->data['categorias']['totales'][0] ?? [];
        $totalParticipantes = $totales['totalParticipantes'] ?? 0;
        $totalHombres = $totales['totalHombres'] ?? 0;
        $totalMujeres = $totales['totalMujeres'] ?? 0;

        $html = str_replace('{{TOTAL_PARTICIPANTES}}', $totalParticipantes, $html);
        $html = str_replace('{{TOTAL_HOMBRES}}', $totalHombres, $html);
        $html = str_replace('{{TOTAL_MUJERES}}', $totalMujeres, $html);

        $pctHombres = $totalParticipantes > 0 ? round(($totalHombres / $totalParticipantes) * 100, 1) : 0;
        $pctMujeres = $totalParticipantes > 0 ? round(($totalMujeres / $totalParticipantes) * 100, 1) : 0;

        $html = str_replace('{{PORCENTAJE_HOMBRES}}', $pctHombres, $html);
        $html = str_replace('{{PORCENTAJE_MUJERES}}', $pctMujeres, $html);

        return $html;
    }

    public function generarEstadisticasDemograficas()
    {
        $rangosEdad = $this->data['categorias']['rangosEdad'] ?? [];
        if (empty($rangosEdad)) {
            return '';
        }

        // Tabla principal de 1 fila con 2 columnas
        $html = '<div class="bg-white rounded border border-gray-200 p-6">';
        $html .= '<h4 class="text-sm font-semibold text-gray-900 mb-4">Distribución por Rangos de Edad</h4>';

        // Tabla de datos
        $html .= '<table class="corp-table">';
        $html .= '<thead>';
        $html .= '<tr class="bg-gray-50">';
        $html .= '<th>Rango de Edad</th>';
        $html .= '<th class="text-center">Total</th>';
        $html .= '<th class="text-center">Hombres</th>';
        $html .= '<th class="text-center">Mujeres</th>';
        $html .= '</tr>';
        $html .= '</thead>';
        $html .= '<tbody>';

        foreach ($rangosEdad as $rango) {
            $html .= '<tr>';
            $html .= '<td class="font-medium text-gray-900">' . htmlspecialchars($rango['descripcion']) . '</td>';
            $html .= '<td class="text-center">' . $rango['totalParticipantes'] . '</td>';
            $html .= '<td class="text-center">' . $rango['totalHombres'] . '</td>';
            $html .= '<td class="text-center">' . $rango['totalMujeres'] . '</td>';
            $html .= '</tr>';
        }

        $html .= '</tbody>';
        $html .= '</table>';
        $html .= '</div>';

        return $html;
    }

    public function generarSeccionMunicipios()
    {
        $municipios = $this->data['categorias']['municipios'] ?? [];
        if (empty($municipios)) {
            return '';
        }

        $html = '<div class="bg-white rounded border border-gray-200 p-6">';
        $html .= '<h4 class="text-sm font-semibold text-gray-900 mb-4">Participantes por Municipio</h4>';

        // Tabla de municipios
        $html .= '<table class="corp-table">';
        $html .= '<thead>';
        $html .= '<tr class="bg-gray-50">';
        $html .= '<th>Municipio</th>';
        $html .= '<th class="text-center">Total Participantes</th>';
        $html .= '<th class="text-center">Hombres</th>';
        $html .= '<th class="text-center">Mujeres</th>';
        $html .= '</tr>';
        $html .= '</thead>';
        $html .= '<tbody>';

        foreach ($municipios as $municipio) {
            $html .= '<tr>';
            $html .= '<td class="font-medium text-gray-900">' . htmlspecialchars($municipio['descripcion']) . '</td>';
            $html .= '<td class="text-center">' . $municipio['totalParticipantes'] . '</td>';
            $html .= '<td class="text-center">' . ($municipio['totalHombres'] ?? 0) . '</td>';
            $html .= '<td class="text-center">' . ($municipio['totalMujeres'] ?? 0) . '</td>';
            $html .= '</tr>';
        }

        $html .= '</tbody>';
        $html .= '</table>';
        $html .= '</div>';

        return $html;
    }

    public function generarDetallesParticipantes()
    {
        $detalles = $this->data['detalles'] ?? [];
        if (empty($detalles)) {
            return '<div class="bg-white rounded border border-gray-200 p-6 text-center text-gray-500">No hay detalles de participantes disponibles para mostrar.</div>';
        }

        $html = '<table class="corp-table">';
        $html .= '<thead>';
        $html .= '<tr class="bg-gray-50">';
        $html .= '<th style="width: 4%">N°</th>';
        $html .= '<th style="width: 20%">Emprendedor</th>';
        $html .= '<th style="width: 15%">Correo</th>';
        $html .= '<th style="width: 8%">Teléfono</th>';
        $html .= '<th style="width: 8%">Edad</th>';
        $html .= '<th style="width: 15%">Giro</th>';
        $html .= '<th style="width: 15%">Municipio</th>';
        $html .= '<th style="width: 15%">Colonia</th>';
        $html .= '</tr>';
        $html .= '</thead>';
        $html .= '<tbody>';

        $rowIndex = 0;
        foreach ($detalles as $detalle) {
            $bgClass = ($rowIndex % 2 === 0) ? 'bg-gray-50' : 'bg-white';
            $html .= '<tr class="' . $bgClass . '">';
            $html .= '<td class="text-center">' . ($rowIndex + 1) . '</td>';
            $html .= '<td class="font-medium text-gray-900">' . htmlspecialchars($detalle['emprendedor'] ?? '-') . '</td>';
            $html .= '<td>' . htmlspecialchars($detalle['correo'] ?? '-') . '</td>';
            $html .= '<td>' . htmlspecialchars($detalle['tel'] ?? '-') . '</td>';
            $html .= '<td class="text-center">' . htmlspecialchars($detalle['edad'] ?? '-') . '</td>';
            $html .= '<td>' . htmlspecialchars($detalle['giro'] ?? '-') . '</td>';
            $html .= '<td><span class="badge">' . htmlspecialchars($detalle['municipio'] ?? '-') . '</span></td>';
            $html .= '<td class="text-sm text-gray-600">' . htmlspecialchars($detalle['colonia'] ?? '-') . '</td>';
            $html .= '</tr>';
            $rowIndex++;
        }

        $html .= '</tbody>';
        $html .= '</table>';

        return $html;
    }
}