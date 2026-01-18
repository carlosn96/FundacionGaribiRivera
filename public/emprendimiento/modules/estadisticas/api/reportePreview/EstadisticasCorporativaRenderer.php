<?php

require_once '../../../../../../admin/dompdf/vendor/autoload.php';

use Dompdf\Dompdf;

class EstadisticasCorporativaRenderer
{
    private const TEMPLATE_PATH = __DIR__ . '/plantilla_corporativa_simple.html';
    private const REGISTROS_POR_PAGINA = 8;
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

        // Construir subtítulo basado en filtros
        $html = str_replace('{{SUBTITULO}}', $subtitulo = $this->construirSubtitulo(), $html);
        $html = str_replace('{{ETAPA}}', $this->data['etapa'] ?? 'Etapa no especificada', $html);

        // Reemplazar placeholders principales
        $html = str_replace('{{TITULO}}', 'Estadísticas Demográficas', $html);
        $html = str_replace('{{FECHA_GENERACION}}', Util::obtenerFechaActual('d/m/Y H:i:s'), $html);
        $html = str_replace('{{FECHA_ID}}', date('Y') . '-0525-GR-' . substr(uniqid(), -4), $html);

        // Generar secciones
        $html = str_replace('{{ESTADISTICAS_DEMOGRAFICAS}}', $this->generarEstadisticasDemograficas(), $html);
        $html = str_replace('{{MUNICIPIOS_SECTION}}', $this->generarSeccionMunicipios(), $html);

        // Generar tabla de participantes (solo primeros registros por página)
        $detalles = $this->data['detalles'] ?? [];
        $html = str_replace('{{DETALLES_PARTICIPANTES}}', $this->generarDetallesParticipantes(array_slice($detalles, 0, self::REGISTROS_POR_PAGINA), 0), $html);

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

        // Generar páginas adicionales si hay más de REGISTROS_POR_PAGINA participantes
        if (count($detalles) > self::REGISTROS_POR_PAGINA) {
            $html .= $this->generarPaginasAdicionales($detalles);
        }

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

    public function generarDetallesParticipantes($detalles, $startIndex = 0)
    {
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

        $rowIndex = $startIndex + 1;
        foreach ($detalles as $detalle) {
            $bgClass = (($rowIndex - 1) % 2 === 0) ? 'bg-gray-50' : 'bg-white';
            $html .= '<tr class="' . $bgClass . '">';
            $html .= '<td class="text-center">' . $rowIndex . '</td>';
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

    private function generarPaginasAdicionales($detalles)
    {
        $chunks = array_chunk($detalles, self::REGISTROS_POR_PAGINA);
        $html = '';
        $totalPages = count($chunks);

        // Empezar desde el segundo chunk (el primero ya está en la plantilla)
        for ($i = 1; $i < $totalPages; $i++) {
            $pageNumber = $i + 3; // +3 porque ya tenemos 3 páginas base (portada, resumen, primera tabla)
            $html .= $this->generarPaginaParticipantes($chunks[$i], $i * self::REGISTROS_POR_PAGINA, $pageNumber, $totalPages + 2);
        }

        return $html;
    }

    private function generarPaginaParticipantes($detalles, $startIndex, $pageNumber, $totalPages)
    {
        $etapa = $this->data['etapa'] ?? 'Sin especificar';

        $html = '
    <!-- PÁGINA ' . $pageNumber . ': LISTADO DETALLADO (Continuación) -->
    <div class="page page-landscape" style="display: flex; flex-direction: column;">
        <!-- Header Página -->
        <div class="flex justify-between items-end mb-6" style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem;">
            <div>
                <h3 class="text-lg font-bold" style="color: var(--text-primary); font-size: 1.125rem; font-weight: 700; margin: 0;">Listado de Participantes (Continuación)</h3>
                <p class="text-xs mt-1" style="color: var(--text-secondary); font-size: 0.75rem; margin-top: 0.25rem;">Desglose completo de asistentes registrados</p>
            </div>
            <div class="text-right" style="text-align: right;">
                <span class="badge">' . htmlspecialchars($etapa) . '</span>
            </div>
        </div>

        <!-- Tabla -->
        <div class="flex-grow" style="flex-grow: 1;">
            ' . $this->generarDetallesParticipantes($detalles, $startIndex) . '
        </div>

        <!-- Footer -->
        <div class="doc-footer" style="margin-top: auto; border-top: 2px solid var(--accent); padding-top: 12px; display: flex; justify-content: space-between; font-size: 9px; color: var(--text-primary);">
            <span>Fundación Garibi Rivera &bull; Reporte Interno</span>
            <span>Página ' . $pageNumber . ' de ' . $totalPages . '</span>
        </div>
    </div>
';

        return $html;
    }

    private function construirSubtitulo()
    {
        $etapa = $this->data['etapa'] ?? 'Sin especificar';
        $filtros = $this->data['filtros'] ?? [];

        $fechaInicioStr = '';
        $fechaFinStr = '';
        $hasEtapa = $etapa !== 'Sin especificar';
        $hasFechas = false;

        foreach ($filtros as $filtro) {
            if (strpos($filtro, 'Fecha inicio:') === 0) {
                $fechaInicioStr = trim(str_replace('Fecha inicio:', '', $filtro));
            } elseif (strpos($filtro, 'Fecha fin:') === 0) {
                $fechaFinStr = trim(str_replace('Fecha fin:', '', $filtro));
            }
        }

        $hasFechas = !empty($fechaInicioStr) && !empty($fechaFinStr);

        if ($hasEtapa && !$hasFechas) {
            return "Etapa: $etapa";
        } elseif (!$hasEtapa && $hasFechas) {
            return "Del $fechaInicioStr al $fechaFinStr";
        } elseif ($hasEtapa && $hasFechas) {
            return "Etapa: $etapa - Del $fechaInicioStr al $fechaFinStr";
        } else {
            return 'Reporte General';
        }
    }
}