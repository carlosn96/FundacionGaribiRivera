<?php

namespace App\Http\Controllers;

use Dompdf\Dompdf;
use Dompdf\Options;

class PdfController extends Controller
{
    /**
     * Construye y retorna el stream o archivo de un PDF con información parametrizable.
     * Es independiente de los modelos de negocio.
     *
     * @param string $viewName   Nombre de la vista Blade (ej: 'contrato_pdf')
     * @param array  $viewData   Arreglo asociativo con los datos que consumirá la vista
     * @param string $filename   Nombre sugerido para el archivo PDF (ej: 'Documento.pdf')
     * @param string $paperSize  Tamaño de hoja ('letter', 'a4', 'legal', etc.)
     * @param string $orientation Orientación ('portrait' o 'landscape')
     * @param bool   $download   Si es true, fuerza la descarga. Si es false, lo muestra en navegador.
     * @return void
     */
    public function renderPdfBase($viewName, $viewData, $filename = 'documento.pdf', $paperSize = 'letter', $orientation = 'portrait', $download = false)
    {
        // Cargar Dompdf manualmente si no está en el autoloader de Lumen
        $autoloadPath = base_path('../admin/dompdf/vendor/autoload.php');
        if (file_exists($autoloadPath)) {
            require_once $autoloadPath;
        }

        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isRemoteEnabled', true);
        $options->set('isPhpEnabled', true);
        
        // Aquí se pueden agregar configuraciones extra al ser parametrizable

        $dompdf = new Dompdf($options);
        
        // Renderizar el HTML con los datos mandados
        $html = view($viewName, $viewData)->render();

        $dompdf->loadHtml($html);
        $dompdf->setPaper($paperSize, $orientation);
        $dompdf->render();

        $dompdf->stream($filename, [
            "Attachment" => $download
        ]);
        exit;
    }
}
