<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Contrato de Préstamo - {{ $emprendedor->usuario->nombre }}</title>
    <style>
        @page {
            margin: 1.27cm;
            size: letter portrait;
        }

        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            font-size: 10pt;
            line-height: 1.4;
            color: #0f1f1a;
            background: #ffffff;
        }

        /* ---- CSS Compartido ---- */
        @include('partials.contrato_css')
        
        /* Footer Global (Fijo en todas las páginas) */
        footer {
            position: fixed;
            bottom: 0px;
            left: 0;
            right: 0;
            height: 20px;
            text-align: right;
            font-size: 8pt;
            color: #4a5568;
            border-top: 1px solid #e2e8f0;
            padding-top: 5px;
        }
    </style>
</head>

<body>

    <footer>
        <!-- Footer para la raya de separación superpuesta -->
    </footer>

    <main>
        @include('partials.contrato_body')
    </main>

    <!-- Contador de páginas mediante renderizado global en DOMPDF -->
    <script type="text/php">
        if (isset($pdf)) {
            $x = $pdf->get_width() - 85;
            $y = $pdf->get_height() - 25;
            $text = "Página {PAGE_NUM} de {PAGE_COUNT}";
            $font = $fontMetrics->get_font("helvetica", "normal");
            $size = 8;
            $color = array(0.29, 0.33, 0.41);
            $word_space = 0.0;
            $char_space = 0.0;
            $angle = 0.0;
            $pdf->page_text($x, $y, $text, $font, $size, $color, $word_space, $char_space, $angle);
        }
    </script>
</body>

</html>