<?php

require_once '../../../../../loader.php';
require_once '../../../../../admin/dompdf/autoload.inc.php';
use Dompdf\Dompdf;
use Dompdf\Options;

$admin = getAdminLineaBase();
$existeLineaBase = $admin->getLineaBase($id = $_GET["id"])["inicial"]["existeLineaBase"];
$estudio = getAdminEstudioSocioeconomico()->getEstudioSocioeconomico($id);
$emprendedor = getAdminUsuario()->buscarUsuarioPorID($id);

/**
 * Renderiza la tabla de familiares con formato optimizado para la nueva estructura
 */
function renderFamiliares($familiares)
{
    if (empty($familiares)) {
        return '<tr><td colspan="9" style="text-align:center; font-style:italic;">No hay información de familiares registrada</td></tr>';
    }
    
    $total = 0;
    $count = count($familiares);
    $html = '';
    
    foreach ($familiares as $f) {
        $fijo = (float) ($f['ingresoMensualFijo'] ?? 0);
        $variable = (float) ($f['ingresoMensualVariable'] ?? 0);
        $subtotal = $fijo + $variable;
        $total += $subtotal;
        
        $html .= "<tr>
            <td>" . htmlspecialchars($f['nombre'] ?? 'N/A') . "</td>
            <td>" . htmlspecialchars($f['edad'] ?? 'N/A') . "</td>
            <td>" . htmlspecialchars($f['estadoCivil']['value'] ?? 'N/A') . "</td>
            <td>" . htmlspecialchars($f['parentesco'] ?? 'N/A') . "</td>
            <td>" . htmlspecialchars($f['escolaridad']['value'] ?? 'N/A') . "</td>
            <td>" . htmlspecialchars($f['ocupacion']['value'] ?? 'N/A') . "</td>
            <td>$" . number_format($fijo, 2) . "</td>
            <td>$" . number_format($variable, 2) . "</td>
            <td>$" . number_format($subtotal, 2) . "</td>
        </tr>";
    }
    
    // Fila de total con clase CSS específica
    $html .= "<tr class='total-row'>
        <td colspan='8' style='text-align:right; font-weight:bold; background-color:#f3d03f;'>TOTAL INGRESOS FAMILIARES</td>
        <td style='font-weight:bold; background-color:#f3d03f;'>$" . number_format($total, 2) . "</td>
    </tr>";
    
    // Fila de promedio con clase CSS específica
    $promedio = $count > 0 ? $total / $count : 0;
    $html .= "<tr class='promedio-row'>
        <td colspan='8' style='text-align:right; font-weight:bold; background-color:#183f37; color:white;'>PROMEDIO POR INTEGRANTE</td>
        <td style='font-weight:bold; background-color:#183f37; color:white;'>$" . number_format($promedio, 2) . "</td>
    </tr>";
    
    return $html;
}

/**
 * Renderiza los gastos económicos con formato mejorado
 */
function renderGastos($economia)
{
    $gastos = [
        "alimentacion" => "Alimentación",
        "vivienda" => "Vivienda",
        "celular" => "Celular",
        "colegiaturas" => "Colegiaturas",
        "luz" => "Luz eléctrica",
        "camiones" => "Transporte público",
        "telefono" => "Teléfono",
        "gasolina" => "Gasolina",
        "gas" => "Gas doméstico",
        "medico" => "Gastos médicos",
        "agua" => "Agua",
        "diversiones" => "Entretenimiento",
        "internet" => "Internet",
        "deudas" => "Pago de deudas",
        "cable" => "Cable/TV",
        "medicinas" => "Medicamentos",
        "otros" => "Otros gastos"
    ];
    
    $html = '';
    $totalGastos = 0;
    
    foreach ($gastos as $key => $label) {
        if (isset($economia[$key]) && !empty($economia[$key]) && $economia[$key] > 0) {
            $monto = (float) $economia[$key];
            $totalGastos += $monto;
            $html .= "<tr>
                <td>" . htmlspecialchars($label) . "</td>
                <td style='text-align:right;'>$" . number_format($monto, 2) . "</td>
            </tr>";
        }
    }
    
    // Agregar fila de total
    if ($totalGastos > 0) {
        $html .= "<tr style='background-color:#f3d03f; font-weight:bold;'>
            <td>TOTAL EGRESOS</td>
            <td style='text-align:right;'>$" . number_format($totalGastos, 2) . "</td>
        </tr>";
    }
    
    // Si no hay gastos registrados
    if (empty($html)) {
        $html = "<tr><td colspan='2' style='text-align:center; font-style:italic;'>No hay gastos registrados</td></tr>";
    }
    
    return $html;
}

/**
 * Renderiza listas de vulnerabilidades u otros elementos
 */
function renderLista($items, $key = 'descripcion')
{
    if (empty($items)) {
        return '<li style="color:#28a745; font-weight:bold;">NO presenta vulnerabilidades identificadas</li>';
    }
    
    $html = '';
    foreach ($items as $item) {
        $descripcion = is_array($item) ? ($item[$key] ?? 'Sin descripción') : $item;
        $html .= "<li>" . htmlspecialchars($descripcion) . "</li>";
    }
    
    return $html;
}

/**
 * Renderiza arrays de tags/etiquetas con formato mejorado
 */
function renderTags($array)
{
    if (is_null($array) || empty($array)) {
        return '<span style="font-style:italic; color:#666;">Sin información</span>';
    }
    
    if (is_array($array)) {
        $tags = array_map(
            function ($item) {
                return is_array($item) ? ($item['value'] ?? $item['descripcion'] ?? 'N/A') : $item;
            }, $array
        );
        return htmlspecialchars(implode(', ', $tags));
    }
    
    return htmlspecialchars($array);
}

/**
 * Renderiza las fotografías optimizado para TCPDF
 */
function renderFotografias($fotos)
{
    if (empty($fotos)) {
        return '<div class="foto-container" style="padding:20px; text-align:center; border:2px dashed #183f37; background-color:#f8f9fa;">
            <div style="color:#666; font-size:8pt;">No se adjuntaron fotografías al estudio</div>
        </div>';
    }

    $html = '<table class="fotos-grid" cellspacing="0" cellpadding="3" border="0" style="width:100%;">';
    $counter = 0;
    $fotosPerRow = 3;
    
    // Abrir primera fila
    $html .= '<tr>';
    
    foreach ($fotos as $index => $f) {
        // Verificar que existe la fotografía en base64
        if (!empty($f["fotografia"])) {
            $html .= '<td style="width:33.33%; text-align:center; padding:3px; border:none;">
                <div class="foto-container" style="border:1px solid #183f37; padding:2px; background-color:#f9f9f9;">
                    <img src="data:image/jpeg;base64,' . $f["fotografia"] . '" style="width:150px; height:100px; object-fit:cover;" />
                    <div style="font-size:6pt; color:#666; margin-top:2px;">Fotografía ' . ($index + 1) . '</div>
                </div>
            </td>';
        } else {
            $html .= '<td style="width:33.33%; text-align:center; padding:3px; border:none;">
                <div class="foto-container" style="border:2px dashed #ccc; padding:2px; background-color:#f9f9f9; height:104px; line-height:100px;">
                    <div style="color:#999; font-size:7pt;">Imagen no disponible</div>
                </div>
            </td>';
        }
        
        $counter++;
        
        // Cerrar fila cada 3 fotos o al final
        if ($counter % $fotosPerRow == 0 && $counter < count($fotos)) {
            $html .= '</tr><tr>';
        }
    }
    
    // Rellenar celdas vacías si es necesario
    $remaining = $fotosPerRow - ($counter % $fotosPerRow);
    if ($remaining < $fotosPerRow && $remaining > 0) {
        for ($i = 0; $i < $remaining; $i++) {
            $html .= '<td style="width:33.33%; border:none;"></td>';
        }
    }
    
    $html .= '</tr></table>';
    return $html;
}

/**
 * Función auxiliar para limpiar y formatear texto
 */
function limpiarTexto($texto, $default = 'N/A')
{
    if (is_null($texto) || $texto === '' || $texto === 'null') {
        return '<span style="font-style:italic; color:#666;">' . $default . '</span>';
    }
    return htmlspecialchars($texto);
}

/**
 * Función auxiliar para formatear números monetarios
 */
function formatearMonto($monto)
{
    if (is_null($monto) || $monto === '' || $monto === 0) {
        return '$0.00';
    }
    return '$' . number_format((float)$monto, 2);
}

/**
 * Función auxiliar para formatear respuestas booleanas
 */
function formatearBoolean($valor)
{
    if (is_bool($valor)) {
        return $valor ? '<span style="color:#28a745; font-weight:bold;">SÍ</span>' : '<span style="color:#dc3545; font-weight:bold;">NO</span>';
    }
    
    $valorLower = strtolower(trim($valor));
    if (in_array($valorLower, ['sí', 'si', 'yes', '1', 'true'])) {
        return '<span style="color:#28a745; font-weight:bold;">SÍ</span>';
    } elseif (in_array($valorLower, ['no', '0', 'false'])) {
        return '<span style="color:#dc3545; font-weight:bold;">NO</span>';
    }
    
    return limpiarTexto($valor);
}

// Cargar la plantilla HTML
$html = file_get_contents("plantilla_estudio_3.html");

// Mapeo de variables con funciones de limpieza y formato
$map = [
    // Información básica
    '{{nombre}}' => limpiarTexto($emprendedor['nombre']),
    '{{apellidos}}' => limpiarTexto($emprendedor['apellidos']),
    '{{correo}}' => limpiarTexto($emprendedor['correo_electronico']),
    '{{celular}}' => limpiarTexto($emprendedor['numero_celular']),
    '{{resultadoVisita}}' => limpiarTexto($estudio['resultadoVisita'], 'No especificado'),
    '{{fechaCreacion}}' => date('d/m/Y', strtotime($estudio['fechaCreacion'] ?? 'now')),
    '{{trabajadorSocial}}' => limpiarTexto($estudio["trabajadorSocial"], 'No asignado'),
    
    // Empleabilidad actual
    '{{empleoActualEmpresa}}' => limpiarTexto($estudio['empleabilidad']['empleoActualEmpresa'] ?? null),
    '{{empleoActualPuesto}}' => limpiarTexto($estudio['empleabilidad']['empleoActualPuesto'] ?? null),
    '{{empleoActualAntiguedad}}' => limpiarTexto($estudio['empleabilidad']['empleoActualAntiguedad'] ?? null, '0'),
    '{{cuentaConSeguroSocial}}' => formatearBoolean($estudio['empleabilidad']['cuentaConSeguroSocial'] ?? false),
    
    // Empleo anterior
    '{{empleoAnteriorEmpresa}}' => limpiarTexto($estudio['empleabilidad']['empleoAnteriorEmpresa'] ?? null),
    '{{empleoAnteriorPuesto}}' => limpiarTexto($estudio['empleabilidad']['empleoAnteriorPuesto'] ?? null),
    '{{empleoAnteriorAntiguedad}}' => limpiarTexto($estudio['empleabilidad']['empleoAnteriorAntiguedad'] ?? null, '0'),
    '{{empleoAnteriorMotivoRetiro}}' => limpiarTexto($estudio['empleabilidad']['empleoAnteriorMotivoRetiro'] ?? null),
    
    // Familia y economía
    '{{familiares}}' => renderFamiliares($estudio['familiares'] ?? []),
    '{{totalFamiliares}}' => count($estudio['familiares'] ?? []),
    '{{ingresoMensual}}' => limpiarTexto($estudio['economia']['ingresoMensual']['value'] ?? null, 'No especificado'),
    '{{economiaGastos}}' => renderGastos($estudio['economia'] ?? []),
    
    // Vivienda
    '{{tipo}}' => limpiarTexto($estudio['vivienda']['tipo']['value'] ?? null),
    '{{condicion}}' => limpiarTexto($estudio['vivienda']['condicion']['value'] ?? null),
    '{{uso}}' => limpiarTexto($estudio['vivienda']['uso']['value'] ?? null),
    '{{familiasHabitantes}}' => limpiarTexto($estudio['vivienda']['familiasHabitantes']['value'] ?? null),
    '{{piso}}' => renderTags($estudio['vivienda']['piso'] ?? null),
    '{{techo}}' => renderTags($estudio['vivienda']['techo'] ?? null),
    '{{paredes}}' => renderTags($estudio['vivienda']['paredes'] ?? null),
    '{{distribucion}}' => renderTags($estudio['vivienda']['distribucion'] ?? null),
    '{{servicios}}' => renderTags($estudio['vivienda']['servicios'] ?? null),
    
    // Otros bienes
    '{{vehiculo}}' => formatearBoolean($estudio['otrosBienes']['cuentaConVehiculoPropio'] ?? false),
    '{{tipoVehiculo}}' => ($estudio['otrosBienes']['cuentaConVehiculoPropio'] ?? false) ? 
        "<br><strong>Tipo:</strong> " . limpiarTexto($estudio['otrosBienes']['tipoVehiculo'] ?? null) : "",
    '{{marcaVehiculo}}' => ($estudio['otrosBienes']['cuentaConVehiculoPropio'] ?? false) ? 
        "<br><strong>Marca:</strong> " . limpiarTexto($estudio['otrosBienes']['marcaVehiculo'] ?? null) : "",
    '{{modeloVehiculo}}' => ($estudio['otrosBienes']['cuentaConVehiculoPropio'] ?? false) ? 
        "<br><strong>Modelo:</strong> " . limpiarTexto($estudio['otrosBienes']['modeloVehiculo'] ?? null) : "",
    
    // Referencias
    '{{refComercialEmpresa}}' => limpiarTexto($estudio['referencias']['comercial']['empresa'] ?? null),
    '{{refComercialMontoCredito}}' => formatearMonto($estudio['referencias']['comercial']['montoCredito'] ?? null),
    '{{refComercialLimiteCredito}}' => formatearMonto($estudio['referencias']['comercial']['limiteCredito'] ?? null),
    
    '{{refFamiliarNombre}}' => limpiarTexto($estudio['referencias']['familiar']['nombre'] ?? null),
    '{{refFamiliarTelefono}}' => limpiarTexto($estudio['referencias']['familiar']['telefono'] ?? null),
    '{{refFamiliarParentesco}}' => limpiarTexto($estudio['referencias']['familiar']['parentesco'] ?? null),
    '{{refFamiliarOpinion}}' => limpiarTexto($estudio['referencias']['familiar']['opinion'] ?? null),
    
    '{{refPersonalNombre}}' => limpiarTexto($estudio['referencias']['personal']['nombre'] ?? null),
    '{{refPersonalTelefono}}' => limpiarTexto($estudio['referencias']['personal']['telefono'] ?? null),
    '{{refPersonalTiempoConocerlo}}' => limpiarTexto($estudio['referencias']['personal']['tiempoConocerlo'] ?? null, '0') . 
        " año" . (($estudio['referencias']['personal']['tiempoConocerlo'] ?? 0) != 1 ? "s" : ""),
    '{{refPersonalOpinion}}' => limpiarTexto($estudio['referencias']['personal']['opinion'] ?? null),
    
    // Conclusiones
    '{{vulnerabilidades}}' => renderLista($estudio['vulnerabilidades'] ?? []),
    '{{observaciones}}' => limpiarTexto($estudio['conclusiones']['observaciones'] ?? null, 'Sin observaciones'),
    '{{actitudesPositivas}}' => renderTags($estudio['conclusiones']['actitudesPositivas'] ?? null),
    '{{actitudesNegativas}}' => renderTags($estudio['conclusiones']['actitudesNegativas'] ?? null),
    '{{fotografias}}' => renderFotografias($estudio['conclusiones']['fotografias'] ?? []),
    '{{currentYear}}' => date('Y'),
];

// Configuración del PDF con TCPDF
$pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);

// Configuración del documento
$pdf->SetCreator('Fundación Garibi Rivera');
$pdf->SetAuthor('Sistema de Estudios Socioeconómicos');
$pdf->SetTitle('Estudio Socioeconómico - ' . $emprendedor['nombre'] . ' ' . $emprendedor['apellidos']);
$pdf->SetSubject('Informe de Estudio Socioeconómico');
$pdf->SetKeywords('Estudio, Socioeconómico, Fundación, Garibi, Rivera');

// Configuración de márgenes
$pdf->SetMargins(15, 20, 15);
$pdf->SetHeaderMargin(5);
$pdf->SetFooterMargin(10);
$pdf->SetAutoPageBreak(true, 25);

// Configuración de fuente por defecto
$pdf->SetFont('helvetica', '', 9);

// Agregar página
$pdf->AddPage();

// Procesar y escribir el HTML
$htmlFinal = str_replace(array_keys($map), array_values($map), $html);
$pdf->writeHTML($htmlFinal, true, false, true, false, '');

// Generar nombre del archivo
$nombreArchivo = 'Estudio_Socioeconomico_' . 
    preg_replace('/[^a-zA-Z0-9_-]/', '_', $emprendedor['nombre']) . '_' . 
    preg_replace('/[^a-zA-Z0-9_-]/', '_', $emprendedor["apellidos"]) . '_' . 
    date('Y-m-d_H-i-s');

// Salida del PDF
$pdf->Output($nombreArchivo . '.pdf', 'I'); // 'I' para mostrar en navegador, 'D' para descargar
