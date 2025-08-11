<?php

require_once '../../../../loader.php';
require_once '../../../../admin/dompdf/autoload.inc.php'; // Include Dompdf autoloader
use Dompdf\Dompdf;
use Dompdf\Options;

function recuperarInfoLineaBase()
{
    $tipo = Sesion::getInfoTemporal("tipoLineaBase");
    $id = Sesion::getInfoTemporal("idUsuario");
    $lb = getAdminLineaBase()->getLineaBase($id);
    $existeLineaBase = $lb[$tipo]["existeLineaBase"];
    $data = $lb[$tipo]["data"];
    $emprendedor = getAdminUsuario()->buscarUsuarioPorID($id);
    return compact('existeLineaBase', 'tipo', 'emprendedor', 'data');
}

// Retrieve data
$infoLineaBase = recuperarInfoLineaBase();
$existeLineaBase = $infoLineaBase['existeLineaBase'];
$tipo = $infoLineaBase['tipo'];
$emprendedor = $infoLineaBase['emprendedor'];
$data = $infoLineaBase['data'];

// Check if Linea Base exists
if (!$existeLineaBase) {
    echo "No se encontró información de Línea Base para el usuario.";
    exit;
}

// Start output buffering to capture HTML
ob_start();
include 'platilla_linea_base.html'; // Include the HTML template
$html = ob_get_clean(); // Get the HTML content

// Configure Dompdf
$options = new Options();
$options->set('isHtml5ParserEnabled', true);
$options->set('isRemoteEnabled', true); // Enable remote image loading if any
$options->set('defaultFont', 'helvetica'); // Set default font

$dompdf = new Dompdf($options);

// Load HTML into Dompdf
$dompdf->loadHtml($html);

// Set paper size and orientation
$dompdf->setPaper('A4', 'portrait');

// Render HTML to PDF
$dompdf->render();

// Generate filename
$nombreArchivo = 'Linea_Base_' .
    preg_replace('/[^a-zA-Z0-9_-]/', '_', $emprendedor['nombre']) . '_' .
    preg_replace('/[^a-zA-Z0-9_-]/', '_', $emprendedor["apellidos"]) . '_' .
    date('Y-m-d_H-i-s');

// Output PDF
$dompdf->stream($nombreArchivo . '.pdf', array("Attachment" => false)); // "Attachment" => false to display in browser, true for download

?>