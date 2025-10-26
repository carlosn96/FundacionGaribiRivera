<?php

require_once '../../../../loader.php';
require_once '../../../../admin/dompdf/autoload.inc.php'; // Include Dompdf autoloader
use Dompdf\Dompdf;
use Dompdf\Options;

$seguimientoData = Sesion::getInfoTemporal("seguimientoGraduado");
$emprendedor = Sesion::getInfoTemporal("emprendedorData");

if (!isset($seguimientoData['data']) || !$seguimientoData['existeSeguimientoGraduado']) {
    echo "No se encontró información de seguimiento de graduado para el emprendedor seleccionado.";
    exit;
}

$seguimiento = $seguimientoData['data'];

// Start output buffering to capture HTML
ob_start();
include 'pantilla_seguimiento_graduado.php';
$html = ob_get_clean(); // Get the HTML content
ob_end_clean(); // End output buffering


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
$nombreArchivo = 'Seg_Graduado_' .
    preg_replace('/[^a-zA-Z0-9_-]/', '_', $emprendedor['nombre']) . '_' .
    preg_replace('/[^a-zA-Z0-9_-]/', '_', $emprendedor["apellidos"]) . '_' .
    date('Y-m-d_H-i-s');

// Output PDF
$dompdf->stream($nombreArchivo . '.pdf', array("Attachment" => true)); // "Attachment" => false to display in browser, true for download

?>