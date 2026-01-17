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
        $this->dompdf->setOptions($options);
        $this->dompdf->setPaper('A4', 'portrait');
        $this->template = file_get_contents(self::TEMPLATE_DOMPDF_PATH);

    }

    public function render($stream = true)
    {
        // Para plantilla Dompdf
        $html = $this->template;
        $date = Util::obtenerFechaActual('d-m-Y H:i:s');

        // Reemplazar placeholders principales
        $html = str_replace('{{TITULO}}', 'Estadísticas Demográficas - Fundación Garibi Rivera', $html);
        $html = str_replace('{{FECHA_GENERACION}}', $date, $html);
        $html = str_replace('{{HEADER}}', $this->generarHeader(), $html);
        $html = str_replace('{{ENCABEZADO_FOOTER}}', $this->generarEncabezadoFooter(), $html);

        // Generar secciones
        $html = str_replace('{{FILTROS_SECTION}}', $this->generarSeccionFiltros(), $html);
        $html = str_replace('{{TOTALES_GENERALES}}', $this->generarTotalesGenerales(), $html);
        $html = str_replace('{{ESTADISTICAS_DEMOGRAFICAS}}', $this->generarEstadisticasDemograficas(), $html);
        $html = str_replace('{{MUNICIPIOS_SECTION}}', $this->generarSeccionMunicipios(), $html);
        $html = str_replace('{{DETALLES_PARTICIPANTES}}', $this->generarDetallesParticipantes(), $html);

        $this->dompdf->loadHtml($html);
        $this->dompdf->render();

        if ($stream && php_sapi_name() !== 'cli') {
            $this->dompdf->stream(self::NOMBRE_PDF . " " . $date, array('Attachment' => true));
        } else {
            return $this->dompdf->output();
        }
    }

    public function generarHeader()
    {
        $subtitulo = 'Reporte de Estadísticas';
        if (!empty($this->data['etapa'])) {
            $subtitulo .= ' - ' . $this->data['etapa'];
        }

        $html = '<table width="100%" cellpadding="15" cellspacing="0" style="margin-bottom: 15px;">';
        $html .= '<tr>';
        $html .= '<td class="bg-green text-white">';
        $html .= '<div class="text-3xl bold">ESTADÍSTICAS DEMOGRÁFICAS</div>';
        $html .= '<div class="text-lg" style="margin-top: 5px;">' . htmlspecialchars($subtitulo) . '</div>';
        $html .= '</td>';
        $html .= '</tr>';
        $html .= '</table>';

        return $html;
    }

    public function generarSeccionFiltros()
    {
        if (empty($this->data['filtros'])) {
            return '';
        }

        $html = '<table width="100%" cellpadding="10" cellspacing="0" class="border-yellow" style="margin-bottom: 15px;">';
        $html .= '<tr>';
        $html .= '<td class="bg-yellow-light">';
        $html .= '<div class="text-lg bold text-green" style="margin-bottom: 8px;">Filtros Aplicados</div>';

        // Tabla interna para los filtros
        $html .= '<table width="100%" cellpadding="0" cellspacing="0">';
        foreach ($this->data['filtros'] as $filtro) {
            $html .= '<tr><td class="bg-white border-left-green text-sm" style="padding: 5px 10px; margin-bottom: 4px;">';
            $html .= htmlspecialchars($filtro);
            $html .= '</td></tr>';
        }
        $html .= '</table>';

        $html .= '</td>';
        $html .= '</tr>';
        $html .= '</table>';

        return $html;
    }

    public function generarTotalesGenerales()
    {
        $totales = $this->data['categorias']['totales'] ?? [];
        if (empty($totales)) {
            return '';
        }

        $html = '<table width="100%" cellpadding="10" cellspacing="0" class="border-yellow-light" style="margin-bottom: 15px;">';
        $html .= '<tr>';
        $html .= '<td class="bg-white">';
        $html .= '<div class="text-sm bold uppercase text-green-dark border-bottom-thick" style="padding-bottom: 5px; margin-bottom: 12px;">Totales Generales</div>';

        foreach ($totales as $total) {
            // Tabla de 1 fila con 3 columnas para los totales
            $html .= '<table width="100%" cellpadding="10" cellspacing="0">';
            $html .= '<tr>';

            // Total Participantes
            $html .= '<td width="33%" class="bg-yellow-light text-center" style="padding: 12px;">';
            $html .= '<div class="text-3xl bold text-green" style="margin: 5px 0;">' . $total['totalParticipantes'] . '</div>';
            $html .= '<div class="text-xs bold uppercase">Total Participantes</div>';
            $html .= '</td>';

            // Hombres
            $html .= '<td width="33%" class="bg-yellow-light text-center" style="padding: 12px;">';
            $html .= '<div class="text-3xl bold text-green" style="margin: 5px 0;">' . $total['totalHombres'] . '</div>';
            $html .= '<div class="text-xs bold uppercase">Hombres</div>';
            $html .= '</td>';

            // Mujeres
            $html .= '<td width="33%" class="bg-yellow-light text-center" style="padding: 12px;">';
            $html .= '<div class="text-3xl bold text-green" style="margin: 5px 0;">' . $total['totalMujeres'] . '</div>';
            $html .= '<div class="text-xs bold uppercase">Mujeres</div>';
            $html .= '</td>';

            $html .= '</tr>';
            $html .= '</table>';
        }

        $html .= '</td>';
        $html .= '</tr>';
        $html .= '</table>';

        return $html;
    }

    public function generarEstadisticasDemograficas()
    {
        $rangosEdad = $this->data['categorias']['rangosEdad'] ?? [];
        if (empty($rangosEdad)) {
            return '';
        }

        // Tabla principal de 1 fila con 2 columnas
        $html = '<table width="100%" cellpadding="5" cellspacing="0" style="margin-bottom: 15px;">';
        $html .= '<tr>';

        // COLUMNA 1: Distribución por Rangos de Edad
        $html .= '<td width="48%" style="vertical-align: top; padding-right: 10px;">';
        $html .= '<table width="100%" cellpadding="10" cellspacing="0" class="border-yellow-light">';
        $html .= '<tr><td class="bg-white">';
        $html .= '<div class="text-sm bold uppercase text-green-dark border-bottom-thick" style="padding-bottom: 5px; margin-bottom: 10px;">Distribución por Rangos de Edad</div>';

        // Tabla interna 2x2 para los items
        $html .= '<table width="100%" cellpadding="5" cellspacing="0">';
        $itemCount = 0;
        foreach ($rangosEdad as $rango) {
            if ($itemCount % 2 === 0) {
                $html .= '<tr>';
            }

            $html .= '<td width="48%" class="bg-gray border-left-yellow" style="padding: 8px; margin-bottom: 5px;">';
            $html .= '<table width="100%" cellpadding="0" cellspacing="0"><tr>';
            $html .= '<td class="text-sm" style="width: 65%;">' . htmlspecialchars($rango['descripcion']) . '</td>';
            $html .= '<td class="text-xl bold text-green text-right" style="width: 35%;">' . $rango['totalParticipantes'] . '</td>';
            $html .= '</tr></table>';
            $html .= '</td>';

            if ($itemCount % 2 === 1) {
                $html .= '</tr>';
            } elseif ($itemCount === count($rangosEdad) - 1) {
                // Completar fila si es impar y es el último
                $html .= '<td width="48%"></td>';
                $html .= '</tr>';
            }
            $itemCount++;
        }
        $html .= '</table>';

        $html .= '</td></tr></table>';
        $html .= '</td>';

        // COLUMNA 2: Desglose por género
        $html .= '<td width="48%" style="vertical-align: top; padding-left: 10px;">';
        // Verificar si hay algún rango de edad con datos de género
        $hasGeneroData = false;
        foreach ($rangosEdad as $rango) {
            if (!empty($rango['totalHombres']) || !empty($rango['totalMujeres'])) {
                $hasGeneroData = true;
                break;
            }
        }

        if ($hasGeneroData) {
            $html .= '<table width="100%" cellpadding="10" cellspacing="0" class="border-yellow-light">';
            $html .= '<tr><td class="bg-white">';
            $html .= '<div class="text-sm bold uppercase text-green-dark border-bottom-thick" style="padding-bottom: 5px; margin-bottom: 10px;">Desglose por Género y Edad</div>';

            // Tabla de datos
            $html .= '<table width="100%" cellpadding="8" cellspacing="0">';
            $html .= '<tr class="bg-green text-white text-xs bold uppercase">';
            $html .= '<td width="40%">Rango de Edad</td>';
            $html .= '<td width="20%" class="text-center">Total</td>';
            $html .= '<td width="20%" class="text-center">Hombres</td>';
            $html .= '<td width="20%" class="text-center">Mujeres</td>';
            $html .= '</tr>';

            $rowIndex = 0;
            foreach ($rangosEdad as $rango) {
                $bgClass = ($rowIndex % 2 === 0) ? 'bg-yellow-light' : 'bg-white';
                $html .= '<tr class="' . $bgClass . ' text-sm border-bottom">';
                $html .= '<td width="40%" class="bold text-green">' . htmlspecialchars($rango['descripcion']) . '</td>';
                $html .= '<td width="20%" class="text-center">' . $rango['totalParticipantes'] . '</td>';
                $html .= '<td width="20%" class="text-center">' . $rango['totalHombres'] . '</td>';
                $html .= '<td width="20%" class="text-center">' . $rango['totalMujeres'] . '</td>';
                $html .= '</tr>';
                $rowIndex++;
            }

            $html .= '</table>';
            $html .= '</td></tr></table>';
        }
        $html .= '</td>';

        $html .= '</tr>';
        $html .= '</table>';

        return $html;
    }

    public function generarSeccionMunicipios()
    {
        $municipios = $this->data['categorias']['municipios'] ?? [];
        if (empty($municipios)) {
            return '';
        }

        $html = '<table width="100%" cellpadding="10" cellspacing="0" style="margin-bottom: 15px;">';
        $html .= '<tr><td>';

        // Título de sección
        $html .= '<div class="text-2xl bold text-green border-bottom-thick" style="padding-bottom: 8px; margin-bottom: 12px;">Participantes por Municipio</div>';

        // Dividir los municipios en chunks de 20 para las tarjetas
        $cardChunks = array_chunk($municipios, 20);
        $chunkIndex = 0;

        foreach ($cardChunks as $chunk) {
            if ($chunkIndex > 0) {
                // Salto de página antes de cada chunk adicional de tarjetas
                $html .= '<div style="page-break-before: always;"></div>';
                // Repetir título en páginas siguientes
                $html .= '<div class="text-2xl bold text-green border-bottom-thick" style="padding-bottom: 8px; margin-bottom: 12px;">Participantes por Municipio (Continuación)</div>';
            }

            // Tabla de items de municipios (2 columnas) para este chunk
            $html .= '<table width="100%" cellpadding="5" cellspacing="0" style="margin-bottom: 15px;">';
            $itemCount = 0;
            foreach ($chunk as $municipio) {
                if ($itemCount % 2 === 0) {
                    $html .= '<tr>';
                }

                $html .= '<td width="48%" class="bg-white border-yellow-light" style="padding: 10px; margin-bottom: 8px;">';
                $html .= '<table width="100%" cellpadding="0" cellspacing="0"><tr>';
                $html .= '<td class="text-md bold text-green" style="width: 70%;">' . htmlspecialchars($municipio['descripcion']) . '</td>';
                $html .= '<td class="bg-green text-yellow bold text-lg text-center" style="width: 30%; padding: 4px 8px;">' . $municipio['totalParticipantes'] . '</td>';
                $html .= '</tr></table>';
                $html .= '</td>';

                if ($itemCount % 2 === 1) {
                    $html .= '</tr>';
                } elseif ($itemCount === count($chunk) - 1) {
                    // Completar fila si es impar y es el último
                    $html .= '<td width="48%"></td>';
                    $html .= '</tr>';
                }
                $itemCount++;
            }
            $html .= '</table>';

            $chunkIndex++;
        }

        // Tabla detallada de municipios
        // Dividir los municipios en chunks de 15 filas
        $chunks = array_chunk($municipios, 15);
        $chunkIndex = 0;

        foreach ($chunks as $chunk) {
            if ($chunkIndex > 0) {
                // Salto de página antes de cada chunk adicional
                $html .= '<div style="page-break-before: always;"></div>';
                // Repetir título en páginas siguientes
                $html .= '<div class="text-2xl bold text-green border-bottom-thick" style="padding-bottom: 8px; margin-bottom: 12px;">Participantes por Municipio (Continuación)</div>';
            }

            // Tabla para este chunk
            $html .= '<table width="100%" cellpadding="8" cellspacing="0" style="margin-bottom: 15px;">';
            $html .= '<thead>';
            $html .= '<tr class="bg-green text-white text-xs bold uppercase">';
            $html .= '<td width="50%">Municipio</td>';
            $html .= '<td width="20%" class="text-center">Total Participantes</td>';
            $html .= '<td width="15%" class="text-center">Hombres</td>';
            $html .= '<td width="15%" class="text-center">Mujeres</td>';
            $html .= '</tr>';
            $html .= '</thead>';
            $html .= '<tbody>';

            $rowIndex = $chunkIndex * 20;
            foreach ($chunk as $municipio) {
                $bgClass = ($rowIndex % 2 === 0) ? 'bg-yellow-light' : 'bg-white';
                $html .= '<tr class="' . $bgClass . ' text-sm border-bottom">';
                $html .= '<td width="50%" class="bold text-green">' . htmlspecialchars($municipio['descripcion']) . '</td>';
                $html .= '<td width="20%" class="text-center">' . $municipio['totalParticipantes'] . '</td>';
                $html .= '<td width="15%" class="text-center">' . $municipio['totalHombres'] . '</td>';
                $html .= '<td width="15%" class="text-center">' . $municipio['totalMujeres'] . '</td>';
                $html .= '</tr>';
                $rowIndex++;
            }

            $html .= '</tbody>';
            $html .= '</table>';

            $chunkIndex++;
        }

        $html .= '</td></tr></table>';
        return $html;
    }

    public function generarDetallesParticipantes()
    {
        $detalles = $this->data['detalles'] ?? [];
        if (empty($detalles)) {
            return '<table width="100%" cellpadding="20" cellspacing="0" style="margin-bottom: 15px;"><tr><td class="bg-yellow-light text-center text-md text-green" style="font-style: italic;">No hay detalles de participantes disponibles para mostrar.</td></tr></table>';
        }

        $totalParticipantes = count($detalles);

        // Forzar salto de página antes de la tabla de detalles
        $html = '<div style="page-break-before: always;"></div>';
        $html .= '<table width="100%" cellpadding="10" cellspacing="0" style="margin-bottom: 15px;">';
        $html .= '<tr><td>';

        // Título
        $html .= '<div class="text-2xl bold text-green border-bottom-thick" style="padding-bottom: 8px; margin-bottom: 12px;">Listado Detallado de Participantes</div>';

        // Badge de total
        $html .= '<div class="bg-yellow text-green bold text-lg" style="padding: 8px 15px; margin-bottom: 12px; display: inline-block;">Total de Participantes: ' . $totalParticipantes . '</div>';

        // Dividir los detalles en chunks de 20 filas
        $chunks = array_chunk($detalles, 20);
        $chunkIndex = 0;

        foreach ($chunks as $chunk) {
            if ($chunkIndex > 0) {
                // Salto de página antes de cada chunk adicional
                $html .= '<div style="page-break-before: always;"></div>';
                // Repetir título en páginas siguientes
                $html .= '<div class="text-2xl bold text-green border-bottom-thick" style="padding-bottom: 8px; margin-bottom: 12px;">Listado Detallado de Participantes (Continuación)</div>';
            }

            // Tabla para este chunk
            $html .= '<table width="100%" cellpadding="4" cellspacing="0" style="font-size: 8px; margin-bottom: 15px;">';
            $html .= '<thead>';
            $html .= '<tr class="bg-green text-white text-xs bold uppercase">';
            $html .= '<td width="4%" style="padding: 6px 4px;">N°</td>';
            $html .= '<td width="13%" style="padding: 6px 4px;">Emprendedor</td>';
            $html .= '<td width="17%" style="padding: 6px 4px;">Correo</td>';
            $html .= '<td width="8%" style="padding: 6px 4px;">Teléfono</td>';
            $html .= '<td width="8%" style="padding: 6px 4px;">Etapa</td>';
            $html .= '<td width="8%" style="padding: 6px 4px;">Razón Recurre</td>';
            $html .= '<td width="8%" style="padding: 6px 4px;">Solicita Crédito</td>';
            $html .= '<td width="8%" style="padding: 6px 4px;">Utiliza Crédito</td>';
            $html .= '<td width="8%" style="padding: 6px 4px;">Medios Conocimiento</td>';
            $html .= '<td width="4%" style="padding: 6px 4px;">Fecha Creación</td>';
            $html .= '</tr>';
            $html .= '</thead>';
            $html .= '<tbody>';

            $rowIndex = $chunkIndex * 20;
            foreach ($chunk as $detalle) {
                $bgClass = ($rowIndex % 2 === 0) ? 'bg-yellow-light' : 'bg-white';
                $html .= '<tr class="' . $bgClass . ' border-bottom">';
                $html .= '<td class="text-center" width="4%" style="padding: 6px 4px;">' . ($rowIndex + 1) . '</td>';
                $html .= '<td class="bold text-green" width="13%" style="padding: 6px 4px;">' . htmlspecialchars($detalle['emprendedor'] ?? '-') . '</td>';
                $html .= '<td width="17%" style="padding: 6px 4px;">' . htmlspecialchars($detalle['correo'] ?? '-') . '</td>';
                $html .= '<td width="8%" style="padding: 6px 4px;">' . htmlspecialchars($detalle['tel'] ?? '-') . '</td>';
                $html .= '<td width="8%" style="padding: 6px 4px;">' . htmlspecialchars($detalle['etapaNombre'] ?? '-') . '</td>';
                $html .= '<td width="8%" style="padding: 6px 4px;">' . htmlspecialchars($detalle['razonRecurreDescripcion'] ?? '-') . '</td>';
                $html .= '<td width="8%" style="padding: 6px 4px;">' . htmlspecialchars($detalle['solicitaCreditoDescripcion'] ?? '-') . '</td>';
                $html .= '<td width="8%" style="padding: 6px 4px;">' . htmlspecialchars($detalle['utilizaCreditoDescripcion'] ?? '-') . '</td>';
                $html .= '<td width="8%" style="padding: 6px 4px;">' . htmlspecialchars($detalle['mediosConocimiento'] ?? '-') . '</td>';
                $html .= '<td width="4%" style="padding: 6px 4px;">' . htmlspecialchars($detalle['fechaCreacion'] ?? '-') . '</td>';
                $html .= '</tr>';
                $rowIndex++;
            }

            $html .= '</tbody>';
            $html .= '</table>';

            $chunkIndex++;
        }

        $html .= '</td></tr></table>';

        return $html;
    }

    private function generarEncabezadoFooter()
    {
        $fecha = Util::obtenerFechaActual('d/m/Y H:i:s');
        $html = '<div class="header-footer">';
        $html .= 'Estadísticas Demográficas | Documento generado el ' . $fecha . ' | Fundación Garibi Rivera';
        $html .= '</div>';
        return $html;
    }

    private function generarTablaParticipantesCorporativa()
    {
        $detalles = $this->data['detalles'] ?? [];
        $html = '';

        foreach ($detalles as $participante) {
            $nombre = htmlspecialchars($participante['emprendedor'] ?? 'N/A');
            $edad = htmlspecialchars($participante['edad'] ?? 'N/A');
            $giro = htmlspecialchars($participante['giro'] ?? 'No especificado');
            $municipio = htmlspecialchars($participante['municipio'] ?? 'N/A');
            $colonia = htmlspecialchars($participante['colonia'] ?? 'N/A');

            $bizClass = ($giro === 'No especificado' || $giro === 'No Especificado') ?
                "text-gray-400 italic" : "text-gray-700";

            $html .= "<tr>";
            $html .= "<td>{$nombre}</td>";
            $html .= "<td class=\"text-center text-gray-500 tabular-nums\">{$edad}</td>";
            $html .= "<td class=\"{$bizClass}\">{$giro}</td>";
            $html .= "<td><span class=\"badge\">{$municipio}</span></td>";
            $html .= "<td class=\"text-gray-500 text-xs\">{$colonia}</td>";
            $html .= "</tr>";
        }

        return $html;
    }

    private function prepararDatosGraficas()
    {
        $municipalityData = [];
        $ageData = [
            'labels' => ['13-17', '18-35', '36-59', '60+'],
            'hombres' => [0, 0, 0, 0],
            'mujeres' => [0, 0, 0, 0]
        ];

        // Procesar datos de municipios
        if (isset($this->data['categorias']['municipios'])) {
            foreach ($this->data['categorias']['municipios'] as $mun) {
                $municipalityData[] = [
                    'label' => $mun['descripcion'] ?? 'N/A',
                    'value' => $mun['totalParticipantes'] ?? 0
                ];
            }
        }

        // Procesar datos de rangos de edad
        if (isset($this->data['categorias']['rangosEdad'])) {
            foreach ($this->data['categorias']['rangosEdad'] as $rango) {
                $index = 0;
                $desc = strtolower($rango['descripcion'] ?? '');
                if (strpos($desc, '18') !== false)
                    $index = 1;
                else if (strpos($desc, '36') !== false)
                    $index = 2;
                else if (strpos($desc, '60') !== false)
                    $index = 3;

                $ageData['hombres'][$index] = $rango['totalHombres'] ?? 0;
                $ageData['mujeres'][$index] = $rango['totalMujeres'] ?? 0;
            }
        }

        return [
            'municipalityData' => $municipalityData,
            'ageData' => $ageData
        ];
    }
}