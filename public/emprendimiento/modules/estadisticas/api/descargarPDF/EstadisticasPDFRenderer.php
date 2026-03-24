<?php

require_once '../../../../../../admin/dompdf/vendor/autoload.php';

use Dompdf\Dompdf;

class EstadisticasPDFRenderer
{
    private const TEMPLATE_DOMPDF_PATH = __DIR__ . '/plantilla_dompdf_v2.html';
    private const NOMBRE_PDF = 'estadisticas_demograficas';
    private $template;
    private $data;
    private $dompdf;

    public function __construct($data)
    {
        $this->data = $data;
        $this->dompdf = new Dompdf();
        $options = $this->dompdf->getOptions();
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isRemoteEnabled', false);
        $options->set('defaultFont', 'DejaVu Sans');
        $this->dompdf->setOptions($options);
        $this->dompdf->setPaper('A4', 'portrait');
        $this->template = file_get_contents(self::TEMPLATE_DOMPDF_PATH);
    }

    public function render($stream = true)
    {
        $html  = $this->template;
        $date  = Util::obtenerFechaActual('d-m-Y H:i:s');
        $tipo  = $this->tipoReporte();

        $html = str_replace('{{TITULO}}',               'Estadísticas Demográficas de Emprendedores ' . $tipo . ' - Fundación Garibi Rivera', $html);
        $html = str_replace('{{FECHA_GENERACION}}',     $date,                                         $html);
        $html = str_replace('{{ENCABEZADO_FOOTER}}',    $this->generarEncabezadoFooter(),              $html);
        $html = str_replace('{{HEADER}}',               $this->generarHeader(),                        $html);
        $html = str_replace('{{FILTROS_SECTION}}',      $this->generarSeccionFiltros(),                $html);
        $html = str_replace('{{TOTALES_GENERALES}}',    $this->generarTotalesGenerales(),              $html);
        $html = str_replace('{{ESTADISTICAS_DEMOGRAFICAS}}', $this->generarEstadisticasDemograficas(), $html);
        $html = str_replace('{{MUNICIPIOS_SECTION}}',   $this->generarSeccionMunicipios(),             $html);
        $html = str_replace('{{DETALLES_PARTICIPANTES}}', $this->generarDetallesParticipantes(),       $html);

        $this->dompdf->loadHtml($html, 'UTF-8');
        $this->dompdf->render();

        if ($stream && php_sapi_name() !== 'cli') {
            $nombrePdf = 'estadisticas_demograficas_' . strtolower($tipo) . '_' . str_replace([' ', ':'], '_', $date);
            $this->dompdf->stream($nombrePdf, ['Attachment' => true]);
        } else {
            return $this->dompdf->output();
        }
    }

    /* ──────────────────────────────────────────────
     * HELPERS
     * ────────────────────────────────────────────── */

    private function tipoReporte(): string
    {
        return (isset($this->data['tipoReporte']) && $this->data['tipoReporte'] === 'Capacitados')
            ? 'Capacitados' : 'Inscritos';
    }

    private function esc(string $v): string
    {
        return htmlspecialchars($v, ENT_QUOTES, 'UTF-8');
    }

    private function sectionLabel(string $titulo): string
    {
        return '<div class="section-label">' . $titulo . '</div>'
             . '<div class="section-rule"></div>'
             . '<div class="section-rule-thin"></div>';
    }

    /* ──────────────────────────────────────────────
     * META / ENCABEZADO FOOTER
     * ────────────────────────────────────────────── */

    private function generarEncabezadoFooter(): string
    {
        $fecha = Util::obtenerFechaActual('d/m/Y H:i:s');
        $tipo  = $this->tipoReporte();

        return '<div class="doc-meta">'
             . '<span class="bold">Estadísticas Demográficas de Emprendedores ' . $tipo . '</span>'
             . ' &nbsp;|&nbsp; Fecha de emisión: ' . $fecha
             . ' &nbsp;|&nbsp; Fundación Garibi Rivera'
             . '</div>';
    }

    /* ──────────────────────────────────────────────
     * HEADER INSTITUCIONAL
     * ────────────────────────────────────────────── */

    public function generarHeader(): string
    {
        $tipo      = $this->tipoReporte();
        $subtitulo = 'Reporte de Estadísticas';
        if (!empty($this->data['etapa'])) {
            $subtitulo .= ' — ' . $this->esc($this->data['etapa']);
        }

        return '<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 10px;">'
             . '<tr><td class="bg-green text-white" style="padding: 12px 14px;">'
             . '<div class="text-xs uppercase" style="letter-spacing: 1px; opacity: 0.75; margin-bottom: 3px;">Fundación Garibi Rivera</div>'
             . '<div class="text-2xl bold" style="line-height: 1.2;">Estadísticas Demográficas de Emprendedores ' . strtoupper($tipo) . '</div>'
             . '<div class="text-sm" style="margin-top: 4px; opacity: 0.85;">' . $subtitulo . '</div>'
             . '</td></tr>'
             . '</table>';
    }

    /* ──────────────────────────────────────────────
     * FILTROS
     * ────────────────────────────────────────────── */

    public function generarSeccionFiltros(): string
    {
        if (empty($this->data['filtros'])) {
            return '';
        }

        $items = '';
        foreach ($this->data['filtros'] as $filtro) {
            $items .= '<div class="filter-pill">· ' . $this->esc($filtro) . '</div><br>';
        }

        return '<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 10px;">'
             . '<tr>'
             . '<td style="padding: 7px 10px; background-color: #F5F8F6; border-left: 3px solid #13493B;">'
             . '<div class="text-xs bold uppercase text-muted" style="margin-bottom: 4px;">Filtros Aplicados</div>'
             . $items
             . '</td>'
             . '</tr>'
             . '</table>';
    }

    /* ──────────────────────────────────────────────
     * TOTALES GENERALES
     * ────────────────────────────────────────────── */

    public function generarTotalesGenerales(): string
    {
        $totales = $this->data['categorias']['totales'] ?? [];
        if (empty($totales)) {
            return '';
        }

        $html = $this->sectionLabel('Totales Generales');

        foreach ($totales as $total) {
            $html .= '<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 10px;">'
                   . '<tr>'
                   . '<td width="33%" class="stat-cell" style="border-right: 1px solid #E8EEEA;">'
                   . '<div class="stat-number">' . ($total['totalParticipantes'] ?? 0) . '</div>'
                   . '<div class="stat-label">Total Participantes</div>'
                   . '</td>'
                   . '<td width="33%" class="stat-cell" style="border-right: 1px solid #E8EEEA;">'
                   . '<div class="stat-number">' . ($total['totalHombres'] ?? 0) . '</div>'
                   . '<div class="stat-label">Hombres</div>'
                   . '</td>'
                   . '<td width="33%" class="stat-cell">'
                   . '<div class="stat-number">' . ($total['totalMujeres'] ?? 0) . '</div>'
                   . '<div class="stat-label">Mujeres</div>'
                   . '</td>'
                   . '</tr>'
                   . '</table>';
        }

        return $html;
    }

    /* ──────────────────────────────────────────────
     * ESTADÍSTICAS DEMOGRÁFICAS
     * ────────────────────────────────────────────── */

    public function generarEstadisticasDemograficas(): string
    {
        $rangosEdad = $this->data['categorias']['rangosEdad'] ?? [];
        if (empty($rangosEdad)) {
            return '';
        }

        /* -- Distribución por rangos (grilla 2 col) -- */
        $html = $this->sectionLabel('Distribución por Rangos de Edad');

        $html .= '<table width="100%" cellpadding="0" cellspacing="4" style="margin-bottom: 10px;">';
        $i = 0;
        foreach ($rangosEdad as $rango) {
            if ($i % 2 === 0) $html .= '<tr>';

            $html .= '<td width="48%" style="padding: 6px 8px; background-color: #F5F8F6; border-left: 2px solid #13493B;">'
                   . '<table width="100%" cellpadding="0" cellspacing="0"><tr>'
                   . '<td class="text-sm text-green-dark">' . $this->esc($rango['descripcion'] ?? '-') . '</td>'
                   . '<td class="text-xl bold text-green text-right">' . ($rango['totalParticipantes'] ?? 0) . '</td>'
                   . '</tr></table>'
                   . '</td>';

            if ($i % 2 === 1) {
                $html .= '</tr>';
            } elseif ($i === count($rangosEdad) - 1) {
                $html .= '<td width="48%"></td></tr>';
            }
            $i++;
        }
        $html .= '</table>';

        /* -- Desglose por género y edad -- */
        $hasGenero = false;
        foreach ($rangosEdad as $r) {
            if (!empty($r['totalHombres']) || !empty($r['totalMujeres'])) { $hasGenero = true; break; }
        }

        if ($hasGenero) {
            $html .= $this->sectionLabel('Desglose por Género y Edad');

            $html .= '<table class="data-table" style="margin-bottom: 10px;">'
                   . '<thead><tr>'
                   . '<th width="40%">Rango de Edad</th>'
                   . '<th width="20%" style="text-align:center;">Total</th>'
                   . '<th width="20%" style="text-align:center;">Hombres</th>'
                   . '<th width="20%" style="text-align:center;">Mujeres</th>'
                   . '</tr></thead>'
                   . '<tbody>';

            foreach ($rangosEdad as $rango) {
                $html .= '<tr>'
                       . '<td class="bold text-green">' . $this->esc($rango['descripcion'] ?? '-') . '</td>'
                       . '<td class="text-center">' . ($rango['totalParticipantes'] ?? 0) . '</td>'
                       . '<td class="text-center">' . ($rango['totalHombres'] ?? 0) . '</td>'
                       . '<td class="text-center">' . ($rango['totalMujeres'] ?? 0) . '</td>'
                       . '</tr>';
            }

            $html .= '</tbody></table>';
        }

        return $html;
    }

    /* ──────────────────────────────────────────────
     * MUNICIPIOS
     * ────────────────────────────────────────────── */

    public function generarSeccionMunicipios(): string
    {
        $municipios = $this->data['categorias']['municipios'] ?? [];
        if (empty($municipios)) {
            return '';
        }

        $html = $this->sectionLabel('Participantes por Municipio');

        $chunks     = array_chunk($municipios, 20);
        $chunkIndex = 0;

        foreach ($chunks as $chunk) {
            if ($chunkIndex > 0) {
                $html .= '<div style="page-break-before: always;"></div>';
                $html .= $this->sectionLabel('Participantes por Municipio (Continuación)');
            }

            $html .= '<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 10px;">';
            $i = 0;
            foreach ($chunk as $municipio) {
                if ($i % 2 === 0) $html .= '<tr>';

                $total = $municipio['totalParticipantes'] ?? 0;
                $totalH = $municipio['totalHombres'] ?? 0;
                $totalM = $municipio['totalMujeres'] ?? 0;
                $nombre = $this->esc($municipio['descripcion'] ?? '-');

                // Separador horizontal entre filas de tarjetas
                $borderTop = $i >= 2 ? 'border-top: 1px solid #E8EEEA;' : '';

                $html .= '<td width="50%" style="padding: 6px 8px; ' . $borderTop . '">'
                       . '<table width="100%" cellpadding="0" cellspacing="0"><tr>'
                       . '<td class="text-md bold text-green" style="width: 65%;">' . $nombre . '</td>'
                       . '<td style="width: 35%;">'
                       . '<div class="mun-badge">' . $total . '</div>'
                       . '</td>'
                       . '</tr><tr>'
                       . '<td colspan="2" class="text-xs text-muted" style="padding-top: 2px;">'
                       . 'Hombres: <span class="bold text-green-dark">' . $totalH . '</span>'
                       . '&nbsp;&nbsp;Mujeres: <span class="bold text-green-dark">' . $totalM . '</span>'
                       . '</td>'
                       . '</tr></table>'
                       . '</td>';

                if ($i % 2 === 1) {
                    $html .= '</tr>';
                } elseif ($i === count($chunk) - 1) {
                    $html .= '<td width="50%"></td></tr>';
                }
                $i++;
            }
            $html .= '</table>';
            $chunkIndex++;
        }

        return $html;
    }

    /* ──────────────────────────────────────────────
     * LISTADO DETALLADO DE PARTICIPANTES
     * ────────────────────────────────────────────── */

    public function generarDetallesParticipantes(): string
    {
        $detalles = $this->data['detalles'] ?? [];
        if (empty($detalles)) {
            return '<div style="page-break-before: always;"></div>'
                 . '<div style="padding: 20px; text-align: center; color: #6B7A70; font-style: italic; font-size: 9px;">No hay detalles de participantes disponibles.</div>';
        }

        $total = count($detalles);

        // Siempre en nueva página
        $html = '<div style="page-break-before: always;"></div>';

        $html .= $this->sectionLabel('Listado Detallado de Participantes');

        // Badge total
        $html .= '<div style="margin-bottom: 8px;">'
               . '<span style="background-color: #13493B; color: #E8C94A; font-weight: bold; font-size: 9px; padding: 4px 10px;">'
               . 'Total de Participantes: ' . $total
               . '</span>'
               . '</div>';

        $chunks     = array_chunk($detalles, 22);
        $chunkIndex = 0;

        foreach ($chunks as $chunk) {
            if ($chunkIndex > 0) {
                $html .= '<div style="page-break-before: always;"></div>';
                $html .= $this->sectionLabel('Listado Detallado de Participantes (Continuación)');
            }

            $html .= '<table class="data-table" style="margin-bottom: 12px;">'
                   . '<thead><tr>'
                   . '<th width="4%"  style="text-align:center;">N°</th>'
                   . '<th width="14%">Emprendedor</th>'
                   . '<th width="18%">Correo</th>'
                   . '<th width="10%">Teléfono</th>'
                   . '<th width="5%"  style="text-align:center;">Edad</th>'
                   . '<th width="16%">Giro</th>'
                   . '<th width="13%">Municipio</th>'
                   . '<th width="20%">Colonia</th>'
                   . '</tr></thead>'
                   . '<tbody>';

            $rowIndex = $chunkIndex * 22;
            foreach ($chunk as $detalle) {
                $giro = $this->esc($detalle['giro'] ?? '');
                $giroDisplay = (!$giro || strtolower($giro) === 'no especificado')
                    ? '<span style="color:#9AA59F; font-style:italic;">—</span>'
                    : $giro;

                $html .= '<tr>'
                       . '<td style="text-align:center;">' . ($rowIndex + 1) . '</td>'
                       . '<td class="bold text-green">' . $this->esc($detalle['emprendedor'] ?? '-') . '</td>'
                       . '<td class="text-muted">' . $this->esc($detalle['correo'] ?? '-') . '</td>'
                       . '<td>' . $this->esc($detalle['tel'] ?? '-') . '</td>'
                       . '<td style="text-align:center;">' . $this->esc((string)($detalle['edad'] ?? '-')) . '</td>'
                       . '<td>' . $giroDisplay . '</td>'
                       . '<td>' . $this->esc($detalle['municipio'] ?? '-') . '</td>'
                       . '<td class="text-muted">' . $this->esc($detalle['colonia'] ?? '-') . '</td>'
                       . '</tr>';
                $rowIndex++;
            }

            $html .= '</tbody></table>';
            $chunkIndex++;
        }

        return $html;
    }
}