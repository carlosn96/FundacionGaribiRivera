<?php

include_once '../../../../../loader.php';

require_once '../../../../../admin/TCPDF/tcpdf.php';

$admin = getAdminLineaBase();


$existeLineaBase = $admin->getLineaBase($id = $_GET["id"])["inicial"]["existeLineaBase"];
$estudio = getAdminEstudioSocioeconomico()->getEstudioSocioeconomico($id);
$emprendedor = getAdminUsuario()->buscarUsuarioPorID($id);

function renderFamiliares($familiares) {
    $total = 0;
    $count = count($familiares);
    $html = '';
    foreach ($familiares as $f) {
        $fijo = (float) $f['ingresoMensualFijo'];
        $variable = (float) $f['ingresoMensualVariable'];
        $subtotal = $fijo + $variable;
        $total += $subtotal;
        $html .= "<tr>
            <td>{$f['nombre']}</td>
            <td>{$f['edad']}</td>
            <td>{$f['estadoCivil']['value']}</td>
            <td>{$f['parentesco']}</td>
            <td>{$f['escolaridad']['value']}</td>
            <td>{$f['ocupacion']['value']}</td>
            <td>\${$fijo}</td>
            <td>\${$variable}</td>
            <td>\${$subtotal}</td>
        </tr>";
    }
    $promedio = $count > 0 ? $total / $count : 0;
    $html .= "<tr>
        <td colspan='8' style='text-align:right; font-weight:bold;'>Total</td>
        <td>\${$total}</td>
    </tr>";
    $html .= "<tr>
        <td colspan='8' style='text-align:right; font-weight:bold;'>PROMEDIO POR INTEGRANTE</td>
        <td>\${$promedio}</td>
    </tr>";
    return $html;
}

function renderGastos($economia) {
    $gastos = [
        "alimentacion", "vivienda", "celular", "colegiaturas", "luz", "camiones",
        "telefono", "gasolina", "gas", "medico", "agua", "diversiones",
        "internet", "deudas", "cable", "medicinas", "otros"
    ];
    $html = '';
    foreach ($gastos as $key) {
        if (isset($economia[$key])) {
            $html .= "<tr><td>" . ucfirst($key) . "</td><td>$" . $economia[$key] . "</td></tr>";
        }
    }
    return $html;
}

function renderLista($items, $key = 'descripcion') {
    if (empty($items)) {
        return '<li>NO es vulnerable</li>';
    }
    $html = '';
    foreach ($items as $item) {
        $html .= "<li>{$item[$key]}</li>";
    }
    return $html;
}

function renderTags($array) {
    return !is_null($array) ? implode(', ', array_map(fn($a) => $a['value'], $array)) : "Sin información";
}

function renderFotografias($fotos) {
    $html = '<table cellspacing="5" cellpadding="0" border="0" width="100%"><tr>';
    $counter = 0;
    foreach ($fotos as $f) {
        $html .= '
            <td align="center" valign="middle" style="border:1px solid #ccc; padding:5px;">
                <img src="data:image/jpeg;base64,' . $f . '" width="150" height="100" />
            </td>';
        $counter++;
        if ($counter % 3 == 0) {
            $html .= '</tr><tr>';
        }
    }
    $html .= '</tr></table>';
    return $html;
}



$html = file_get_contents("plantilla_estudio.html");

$map = [
    '{{nombre}}' => $emprendedor['nombre'],
    '{{apellidos}}' => $emprendedor['apellidos'],
    '{{correo}}' => $emprendedor['correo_electronico'],
    '{{celular}}' => $emprendedor['numero_celular'],
    '{{resultadoVisita}}' => $estudio['resultadoVisita'],
    '{{fechaCreacion}}' => $estudio['fechaCreacion'],
    '{{empleoActualEmpresa}}' => $estudio['empleabilidad']['empleoActualEmpresa'],
    '{{empleoActualPuesto}}' => $estudio['empleabilidad']['empleoActualPuesto'],
    '{{empleoActualAntiguedad}}' => $estudio['empleabilidad']['empleoActualAntiguedad'],
    '{{cuentaConSeguroSocial}}' => Util::respuestaBoolToStr($estudio['empleabilidad']['cuentaConSeguroSocial']),
    '{{empleoAnteriorEmpresa}}' => $estudio['empleabilidad']['empleoAnteriorEmpresa'],
    '{{empleoAnteriorPuesto}}' => $estudio['empleabilidad']['empleoAnteriorPuesto'],
    '{{empleoAnteriorAntiguedad}}' => $estudio['empleabilidad']['empleoAnteriorAntiguedad'],
    '{{empleoAnteriorMotivoRetiro}}' => $estudio['empleabilidad']['empleoAnteriorMotivoRetiro'],
    '{{familiares}}' => renderFamiliares($estudio['familiares']),
    '{{totalFamiliares}}' => count($estudio['familiares']),
    '{{ingresoMensual}}' => $estudio['economia']['ingresoMensual']['value'],
    '{{economiaGastos}}' => renderGastos($estudio['economia']),
    '{{tipo}}' => $estudio['vivienda']['tipo']['value'],
    '{{condicion}}' => $estudio['vivienda']['condicion']['value'],
    '{{uso}}' => $estudio['vivienda']['uso']['value'],
    '{{familiasHabitantes}}' => $estudio['vivienda']['familiasHabitantes']['value'],
    '{{piso}}' => renderTags($estudio['vivienda']['piso']),
    '{{techo}}' => renderTags($estudio['vivienda']['techo']),
    '{{paredes}}' => renderTags($estudio['vivienda']['paredes']),
    '{{distribucion}}' => renderTags($estudio['vivienda']['distribucion']),
    '{{servicios}}' => renderTags($estudio['vivienda']['servicios']),
    '{{vehiculo}}' => Util::respuestaBoolToStr($estudio['otrosBienes']['cuentaConVehiculoPropio']),
    '{{tipoVehiculo}}' => $estudio['otrosBienes']['cuentaConVehiculoPropio'] ? "<strong>Tipo de Vehículo: </strong>". $estudio['otrosBienes']['tipoVehiculo'] : "",
    '{{marcaVehiculo}}' => $estudio['otrosBienes']['cuentaConVehiculoPropio'] ? "<strong>Marca: </strong>". $estudio['otrosBienes']['marcaVehiculo'] : "",
    '{{modeloVehiculo}}' => $estudio['otrosBienes']['cuentaConVehiculoPropio'] ? "<strong>Modelo: </strong>". $estudio['otrosBienes']['modeloVehiculo'] : "",
    '{{refComercialEmpresa}}' => $estudio['referencias']['comercial']['empresa'],
    '{{refComercialMontoCredito}}' => $estudio['referencias']['comercial']['montoCredito'],
    '{{refComercialLimiteCredito}}' => $estudio['referencias']['comercial']['limiteCredito'],
    '{{refPersonalNombre}}' => $estudio['referencias']['familiar']['nombre'],
    '{{refPersonalTelefono}}' => $estudio['referencias']['familiar']['telefono'],
    '{{refPersonalParentesco}}' => $estudio['referencias']['familiar']['parentesco'],
    '{{refPersonalOpinion}}' => $estudio['referencias']['familiar']['opinion'],
    '{{refPersonalNombre}}' => $estudio['referencias']['personal']['nombre'],
    '{{refPersonalTelefono}}' => $estudio['referencias']['personal']['telefono'],
    '{{refPersonalTiempoConocerlo}}' => $estudio['referencias']['personal']['tiempoConocerlo'],
    '{{refPersonalOpinion}}' => $estudio['referencias']['personal']['opinion'],
    '{{vulnerabilidades}}' => renderLista($estudio['vulnerabilidades']),
    '{{observaciones}}' => $estudio['conclusiones']['observaciones'],
    '{{actitudesPositivas}}' => renderTags($estudio['conclusiones']['actitudesPositivas']),
    '{{actitudesNegativas}}' => renderTags($estudio['conclusiones']['actitudesNegativas']),
    '{{fotografias}}' => renderFotografias($estudio['conclusiones']['fotografias']),
    '{{currentYear}}' => Util::obtenerFechaActual("Y"),
    '{{trabajadorSocial}}' => $estudio["trabajadorSocial"],
];

foreach ($map as $key => $value) {
    $html = str_replace($key, $value, $html);
}


//Util::print($estudio);
//echo $html;

$pdf = new TCPDF();
$pdf->SetTitle('Estudio Socioeconómico');
$pdf->AddPage();
$pdf->writeHTML($html);
$nombreArchivo = 'Estudio_Socioeconomico_' . $emprendedor['nombre'] . '_' . $emprendedor["apellidos"] . '_' . Util::obtenerFechaActual();
$pdf->Output($nombreArchivo . '.pdf');

