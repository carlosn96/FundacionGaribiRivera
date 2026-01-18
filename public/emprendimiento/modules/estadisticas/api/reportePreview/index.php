<?php

require_once '../../../../../../loader.php';

require_once __DIR__ . '/EstadisticasCorporativaRenderer.php';

// Validar campos de entrada
if (!sonCamposValidos()) {
    die("Campos inválidos proporcionados.");
}

echo (new EstadisticasCorporativaRenderer(prepararDatosParaPlantilla()))->render();


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
        'etapa' => $etapaData ? $etapaData['nombre'] : 'Sin especificar',
        'filtros' => [
            'Fecha inicio: ' . $fechaInicio,
            'Fecha fin: ' . $fechaFin,
            'Etapa: ' . ($etapaData ? $etapaData['nombre'] : 'Todas')
        ],
        'categorias' => $data,
        'detalles' => $detalles
    ];
}

/**
 * Prepara los datos para la plantilla
 */
function prepararDatosParaPlantilla()
{
    return obtenerEstadisticasDemograficas();
}