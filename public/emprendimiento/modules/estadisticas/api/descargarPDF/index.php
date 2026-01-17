<?php

require_once '../../../../../../loader.php';

require_once __DIR__ . '/EstadisticasPDFRenderer.php';

// Validar campos de entrada
if (!sonCamposValidos()) {
    die("Campos inválidos proporcionados.");
}


(new EstadisticasPDFRenderer(prepararDatosParaPlantilla(), $_POST['plantilla'] ?? 'dompdf'))->render();


/**
 * Valida que los campos de entrada sean correctos
 */
function sonCamposValidos()
{
    $campos = $_POST;
    $hasEtapa = isset($campos['etapa']) && !empty($campos['etapa']) && $campos['etapa'] != '0';
    $hasFechas = isset($campos['fechaInicio']) && isset($campos['fechaFin']) && !empty($campos['fechaInicio']) && !empty($campos['fechaFin']);
    return $hasEtapa || $hasFechas;
}

/**
 * Obtiene los datos de estadísticas demográficas
 */
function obtenerEstadisticasDemograficas()
{
    $campos = $_POST;
    $fechaInicio = $campos["fechaInicio"] ?? '';
    $fechaFin = $campos["fechaFin"] ?? '';
    $etapa = intval($campos["etapa"]);

    $data = getAdminEstadisticas()->obtenerEstadisticasDemograficas($fechaInicio, $fechaFin, $etapa);
    $detalles = getAdminEstadisticas()->obtenerEstadisticasDetalle($fechaInicio, $fechaFin, $etapa);

    // Ordenar detalles por fecha de creación
    if (is_array($detalles)) {
        usort($detalles, function ($a, $b) {
            return strcmp($a['fechaCreacion'], $b['fechaCreacion']);
        });
    }

    $etapaData = null;
    if ($etapa > 0) {
        $etapaData = getAdminEtapaFormacion()->obtenerEtapaPorId($etapa);
    }

    return [
        'data' => [
            'categorias' => $data,
            'detalles' => $detalles
        ],
        'etapa' => $etapaData ? ($etapaData['tipo']['val'] . ' ' . $etapaData['nombre'] . ' (del ' . $etapaData['fechaInicio'] . ' al ' . $etapaData['fechaFin'] . ')') : '',
        'fechaInicio' => $fechaInicio,
        'fechaFin' => $fechaFin
    ];
}

/**
 * Prepara los datos en el formato adecuado para la plantilla
 */
function prepararDatosParaPlantilla()
{
    $result = obtenerEstadisticasDemograficas();
    $filtros = [];

    // Agregar filtros aplicados
    if (!empty($result['etapa'])) {
        $filtros[] = 'Filtro de Etapa: ' . $result['etapa'];
    }
    if (!empty($result['fechaInicio'])) {
        $filtros[] = 'Filtro de Fecha de Inicio: ' . $result['fechaInicio'];
    }
    if (!empty($result['fechaFin'])) {
        $filtros[] = 'Filtro de Fecha de Fin: ' . $result['fechaFin'];
    }

    return [
        'categorias' => $result['data']['categorias'],
        'detalles' => $result['data']['detalles'] ?? [],
        'etapa' => $result['etapa'],
        'filtros' => $filtros,
        'fechaInicio' => $result['fechaInicio'],
        'fechaFin' => $result['fechaFin']
    ];
}