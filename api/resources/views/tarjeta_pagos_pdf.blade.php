<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Tarjeta de Pagos</title>
    <style>
        /* =====================================================
           TOKENS DE MARCA — FGR (idénticos al pagaré)
           ===================================================== */
        /* fgr-green: #173f36 | fgr-gold: #b8972a | fgr-gold-lt: #f5e9c4
           fgr-paper: #fdfcf8  | fgr-border: #c8c0a8  | fgr-text: #0f1f1a
           fgr-muted: #4a5568 */

        @page {
            size: letter portrait;
            margin: 10mm 12mm 18mm 12mm;
        }

        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            font-size: 9pt;
            line-height: 1.3;
            color: #0f1f1a;
            background: #ffffff;
            margin: 0;
            padding: 0;
        }

        /* ---- Cabecera institucional ---- */
        .doc-header {
            background-color: #173f36;
            color: #ffffff;
            padding: 8px 14px;
            margin-bottom: 0;
        }

        .doc-header table {
            width: 100%;
            border-collapse: collapse;
            margin: 0;
        }

        .doc-header td {
            border: none;
            padding: 0;
            vertical-align: middle;
        }

        .doc-header__name {
            font-size: 10pt;
            font-weight: bold;
            letter-spacing: 0.04em;
            color: #ffffff;
        }

        .doc-header__sub {
            font-size: 7pt;
            color: rgba(255,255,255,0.65);
            margin-top: 1px;
        }

        .doc-header__doctype {
            text-align: right;
            font-size: 14pt;
            font-weight: bold;
            letter-spacing: 0.1em;
            color: #b8972a;
        }

        /* ---- Barra identificadora (n° ref + monto) ---- */
        .doc-meta-bar {
            border-bottom: 2px solid #173f36;
            border-left: 2px solid #173f36;
            border-right: 2px solid #173f36;
            margin-bottom: 6px;
        }

        .doc-meta-bar table {
            width: 100%;
            border-collapse: collapse;
            margin: 0;
        }

        .doc-meta-bar td {
            padding: 5px 10px;
            text-align: center;
            border: none;
            vertical-align: middle;
        }

        .doc-meta-bar td + td {
            border-left: 1px solid #c8c0a8;
        }

        .meta-label {
            font-size: 6.5pt;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.09em;
            color: #173f36;
            display: block;
        }

        .meta-value {
            font-size: 10pt;
            font-weight: bold;
            color: #0f1f1a;
            display: block;
        }

        .meta-highlight {
            background-color: #f5e9c4;
        }

        .meta-value--big {
            font-size: 13pt;
            color: #173f36;
        }

        /* ---- Sección: Resumen del apoyo ---- */
        .resumen-box {
            border-left: 3px solid #b8972a;
            background-color: #fdfcf8;
            padding: 6px 10px;
            margin-bottom: 6px;
        }

        .resumen-box p {
            margin: 2px 0;
            font-size: 9pt;
            text-align: left;
        }

        .resumen-box strong {
            color: #173f36;
        }

        /* ---- Sección: Información bancaria ---- */
        .banco-box {
            border: 1.5px solid #173f36;
            background-color: #fdfcf8;
            padding: 6px 10px;
            margin-bottom: 6px;
        }

        .banco-box .banco-title {
            font-size: 7.5pt;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #173f36;
            border-left: 3px solid #b8972a;
            padding-left: 5px;
            margin-bottom: 4px;
            display: block;
        }

        .banco-box table {
            width: 100%;
            border-collapse: collapse;
            margin: 0;
        }

        .banco-box td {
            border: none;
            padding: 1px 6px;
            font-size: 8.5pt;
            vertical-align: top;
        }

        .banco-box td:first-child {
            width: 55%;
            padding-left: 0;
        }

        .banco-box .label {
            font-weight: bold;
            color: #173f36;
        }

        .banco-box .importante {
            font-size: 7.5pt;
            font-weight: bold;
            color: #8B0000;
            text-align: center;
            border-top: 1px dashed #c8c0a8;
            margin-top: 4px;
            padding-top: 4px;
        }

        /* ---- Alerta de referencia ---- */
        .alert-ref {
            background-color: #f5e9c4;
            border: 1px solid #b8972a;
            padding: 4px 8px;
            font-size: 7.5pt;
            font-weight: bold;
            color: #0f1f1a;
            text-align: center;
            margin-bottom: 6px;
        }

        /* ---- Tabla de Pagos ---- */
        .section-label {
            font-size: 7pt;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.09em;
            color: #173f36;
            border-left: 3px solid #b8972a;
            padding-left: 5px;
            margin-bottom: 4px;
        }

        table.pagos-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 6px;
            font-size: 8pt;
        }

        table.pagos-table th {
            background-color: #173f36;
            color: #ffffff;
            text-align: center;
            padding: 4px 6px;
            font-size: 7.5pt;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        table.pagos-table td {
            border: 1px solid #c8c0a8;
            padding: 3px 6px;
            text-align: center;
            font-size: 8pt;
        }

        table.pagos-table tr.row-alt {
            background-color: #f5f5ef;
        }

        table.pagos-table tr.row-saldo-inicial td {
            background-color: #e8ece9;
            font-weight: bold;
            font-size: 7.5pt;
            text-align: right;
        }

        table.pagos-table tr.row-saldo-inicial td:last-child {
            text-align: center;
            color: #173f36;
        }

        /* Para cuando se parte en dos columnas */
        .pagos-cols-wrapper table {
            border-collapse: collapse;
            margin: 0;
        }

        .pagos-cols-wrapper td.col-pad {
            padding: 0 4px 0 0;
            vertical-align: top;
            border: none;
        }

        .pagos-cols-wrapper td.col-pad:last-child {
            padding: 0 0 0 4px;
        }

        /* ---- Condiciones ---- */
        .condiciones-wrapper {
            margin-top: 5px;
            margin-bottom: 5px;
        }

        .condiciones-title {
            font-size: 7pt;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.09em;
            color: #173f36;
            border-left: 3px solid #b8972a;
            padding-left: 5px;
            margin-bottom: 4px;
        }

        .condiciones-cols table {
            width: 100%;
            border-collapse: collapse;
            margin: 0;
        }

        .condiciones-cols table td {
            vertical-align: top;
            border: none;
            padding: 0 6px 0 0;
            width: 50%;
        }

        .condiciones-cols table td:last-child {
            padding: 0 0 0 6px;
        }

        .cond-block {
            margin-bottom: 4px;
        }

        .cond-block-title {
            font-size: 7pt;
            font-weight: bold;
            color: #173f36;
            margin-bottom: 1px;
        }

        .cond-block ol {
            margin: 0;
            padding-left: 14px;
        }

        .cond-block ol li {
            font-size: 7pt;
            color: #0f1f1a;
            text-align: justify;
            margin-bottom: 1.5px;
            line-height: 1.25;
        }

        /* ---- Pie institucional (fijo al final de cada página) ---- */
        footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 14px;
            text-align: center;
            font-size: 6pt;
            font-weight: bold;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            background-color: #173f36;
            color: #ffffff;
            padding: 2px 0;
        }

        /* ---- Sección de firma ---- */
        .firma-wrapper {
            border: 1.5px solid #173f36;
            margin-top: 10px;
            page-break-inside: avoid;
        }

        .firma-header {
            background-color: #173f36;
            padding: 3px 10px;
        }

        .firma-header-text {
            font-size: 7.5pt;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #ffffff;
        }

        .firma-body {
            padding: 6px 10px 10px 10px;
        }

        .firma-body table {
            width: 100%;
            border-collapse: collapse;
            margin: 0;
        }

        .firma-body td {
            border: none;
            padding: 0;
            text-align: center;
            vertical-align: bottom;
            width: 50%;
        }

        .firma-space {
            height: 30px;
        }

        .firma-line {
            border-top: 1px solid #0f1f1a;
            margin: 0 20px 3px 20px;
        }

        .firma-name {
            font-size: 7.5pt;
            font-weight: bold;
            color: #0f1f1a;
        }

        .firma-sublabel {
            font-size: 6.5pt;
            color: #4a5568;
            text-transform: uppercase;
            letter-spacing: 0.06em;
        }
    </style>
</head>
<body>

@php
    $nombreCompleto = mb_strtoupper(trim(($emprendedor->usuario->nombre ?? '') . ' ' . ($emprendedor->usuario->apellidos ?? '')), 'UTF-8');
    $referencia     = $emprendedor->referencia ?: 'SIN REFERENCIA';
    $numPagos       = count($pagos);
    $montoFmt       = '$' . number_format($monto, 2);
    $mensualFmt     = '$' . number_format($monto_mensual, 2);

    /* Dividir pagos en dos columnas si son más de 12 */
    $mitad      = ceil($numPagos / 2);
    $dosCols    = $numPagos > 12;
    $col1       = array_slice($pagos, 0, $mitad);
    $col2       = array_slice($pagos, $mitad);
@endphp

<!-- ══════════════════════ HEADER INSTITUCIONAL ══════════════════════ -->
<div class="doc-header">
    <table>
        <tr>
            <td>
                <div class="doc-header__name">FUNDACIÓN CARDENAL GARIBI RIVERA, A.C.</div>
                <div class="doc-header__sub">Crédito y Cobranza — Tarjeta de Pagos</div>
            </td>
            <td style="text-align:right; width:120px;">
                <div class="doc-header__doctype">TARJETA DE PAGOS</div>
            </td>
        </tr>
    </table>
</div>

<!-- ══════════════════════ BARRA DE METADATOS ══════════════════════ -->
<div class="doc-meta-bar">
    <table>
        <tr>
            <td>
                <span class="meta-label">Emprendedor</span>
                <span class="meta-value">{{ $nombreCompleto }}</span>
            </td>
            <td style="width:160px;">
                <span class="meta-label">N° de Referencia</span>
                <span class="meta-value">{{ $referencia }}</span>
            </td>
            <td class="meta-highlight" style="width:130px;">
                <span class="meta-label">Monto Total</span>
                <span class="meta-value meta-value--big">{{ $montoFmt }}</span>
            </td>
        </tr>
    </table>
</div>

<!-- ══════════════════════ RESUMEN DEL APOYO ══════════════════════ -->
<div class="resumen-box">
    <p>
        APOYO SOLIDARIO POR <strong>{{ $montoFmt }}</strong> A PAGAR EN:
        <strong>{{ $num_pagos }} PAGOS</strong> DE <strong>{{ $mensualFmt }}</strong> CADA UNO.
    </p>
</div>

<!-- ══════════════════════ INFORMACIÓN BANCARIA ══════════════════════ -->
<div class="banco-box">
    <span class="banco-title">Información para Depósito</span>
    <table>
        <tr>
            <td>
                <span class="label">Banco:</span> BBVA<br>
                <span class="label">Cuenta:</span> 0111027506<br>
                <span class="label">Titular:</span> Fundación Cardenal Garibi Rivera, Fundación
            </td>
            <td>
                <span class="label">Teléfono de reporte:</span> (33) 3477 0317<br>
                <span class="label">Domicilio:</span> Calle Cobre 4235, Col. Lomas de la Victoria, Tlaquepaque, Jal.
            </td>
        </tr>
    </table>
    <div class="importante">
        AVISO: Reportar el depósito INMEDIATAMENTE después de realizado. Incluir SIEMPRE nombre completo y N° de referencia: <strong>{{ $referencia }}</strong>
    </div>
</div>

<!-- ══════════════════════ ALERTA REFERENCIA ══════════════════════ -->
<div class="alert-ref">
    IMPORTANTE: Al realizar tu depósito debes indicar tu NOMBRE COMPLETO y N° DE REFERENCIA
    ({{ $referencia }}) para la correcta acreditación de tu pago.
</div>

<!-- ══════════════════════ TABLA CALENDARIO DE PAGOS ══════════════════════ -->
<div class="section-label">Calendario de Pagos</div>

@if($dosCols)
{{-- DOS COLUMNAS cuando hay más de 12 pagos --}}
<table class="pagos-cols-wrapper" style="width:100%; border-collapse:collapse; margin-bottom:6px;">
    <tr>
        <td class="col-pad" style="width:50%; border:none; padding:0 4px 0 0; vertical-align:top;">
            <table class="pagos-table" style="width:100%;">
                <thead>
                    <tr>
                        <th style="width:12%;">N°</th>
                        <th style="width:32%;">Fecha</th>
                        <th style="width:28%;">Monto</th>
                        <th style="width:28%;">Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="row-saldo-inicial">
                        <td colspan="3" style="text-align:right; padding-right:8px;">Saldo inicial:</td>
                        <td>{{ $montoFmt }}</td>
                    </tr>
                    @foreach($col1 as $index => $pago)
                    <tr class="{{ $index % 2 == 1 ? 'row-alt' : '' }}">
                        <td>{{ $pago['numero'] }}</td>
                        <td>{{ $pago['fecha'] }}</td>
                        <td>${{ number_format($pago['monto'], 2) }}</td>
                        <td>${{ number_format($pago['saldo'], 2) }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </td>
        <td class="col-pad" style="width:50%; border:none; padding:0 0 0 4px; vertical-align:top;">
            <table class="pagos-table" style="width:100%;">
                <thead>
                    <tr>
                        <th style="width:12%;">N°</th>
                        <th style="width:32%;">Fecha</th>
                        <th style="width:28%;">Monto</th>
                        <th style="width:28%;">Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($col2 as $index => $pago)
                    <tr class="{{ $index % 2 == 1 ? 'row-alt' : '' }}">
                        <td>{{ $pago['numero'] }}</td>
                        <td>{{ $pago['fecha'] }}</td>
                        <td>${{ number_format($pago['monto'], 2) }}</td>
                        <td>${{ number_format($pago['saldo'], 2) }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </td>
    </tr>
</table>
@else
{{-- UNA SOLA COLUMNA --}}
<table class="pagos-table">
    <thead>
        <tr>
            <th style="width:10%;">N° Pago</th>
            <th style="width:28%;">Fecha Límite</th>
            <th style="width:31%;">Monto del Pago</th>
            <th style="width:31%;">Saldo Restante</th>
        </tr>
    </thead>
    <tbody>
        <tr class="row-saldo-inicial">
            <td colspan="3" style="text-align:right; padding-right:8px;">Saldo inicial del crédito:</td>
            <td>{{ $montoFmt }}</td>
        </tr>
        @foreach($pagos as $index => $pago)
        <tr class="{{ $index % 2 == 1 ? 'row-alt' : '' }}">
            <td>{{ $pago['numero'] }}</td>
            <td>{{ $pago['fecha'] }}</td>
            <td>${{ number_format($pago['monto'], 2) }}</td>
            <td>${{ number_format($pago['saldo'], 2) }}</td>
        </tr>
        @endforeach
    </tbody>
</table>
@endif

<!-- ══════════════════════ CONDICIONES (2 columnas compactas) ══════════════════════ -->
<div class="condiciones-wrapper">
    <div class="condiciones-title">Condiciones y Términos del Acuerdo</div>
    <div class="condiciones-cols">
        <table>
            <tr>
                <!-- Columna izquierda -->
                <td>
                    <div class="cond-block">
                        <div class="cond-block-title">Generales</div>
                        <ol>
                            <li>Reportar cada depósito <strong>de inmediato</strong> o a más tardar dentro de los <strong>5 días</strong> posteriores a la fecha de pago.</li>
                            <li>Incluir siempre el <strong>nombre completo</strong> y <strong>número de referencia</strong> en el depósito o reporte.</li>
                            <li>El primer pago deberá realizarse en la fundación, junto con la comprobación del préstamo, en un plazo <strong>no mayor a 30 días</strong>.</li>
                        </ol>
                    </div>
                    <div class="cond-block">
                        <div class="cond-block-title">Obligaciones Administrativas</div>
                        <ol start="4">
                            <li>Guardar y presentar <strong>facturas o comprobantes</strong> que acrediten la correcta aplicación del crédito cuando sean solicitados.</li>
                            <li>Notificar de inmediato cualquier cambio de <strong>domicilio o número telefónico</strong>.</li>
                        </ol>
                    </div>
                </td>
                <!-- Columna derecha -->
                <td>
                    <div class="cond-block">
                        <div class="cond-block-title">Cobranza</div>
                        <ol start="6">
                            <li>En caso de mora, el emprendedor cubrirá gastos de cobranza a domicilio de <strong>$500.00 a $600.00 por visita</strong>.</li>
                            <li>La aportación solidaria (cuando aplique) se depositará <strong>por separado</strong> del pago mensual.</li>
                        </ol>
                    </div>
                    <div class="cond-block">
                        <div class="cond-block-title">Incumplimiento</div>
                        <ol start="8">
                            <li>Cuentas con <strong>más de 3 meses</strong> de morosidad serán turnadas al área jurídica.</li>
                            <li>Se cubrirán <strong>honorarios del abogado equivalentes al 20% del adeudo</strong>.</li>
                            <li>Pagos posteriores se aplicarán al adeudo total: capital, intereses, cobranza y honorarios.</li>
                            <li>La aportación solidaria puede incluirse en el pago mensual según el esquema del emprendedor.</li>
                        </ol>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</div>

<!-- ══════════════════════ FIRMA ══════════════════════ -->
<div class="firma-wrapper">
    <div class="firma-header">
        <span class="firma-header-text">Acuse de Recibido — El emprendedor firma de conformidad con los términos del presente documento</span>
    </div>
    <div class="firma-body">
        <table>
            <tr>
                <td>
                    <div class="firma-space"></div>
                    <div class="firma-line"></div>
                    <div class="firma-name">{{ $nombreCompleto }}</div>
                    <div class="firma-sublabel">Firma del Emprendedor</div>
                </td>
                <td>
                    <div class="firma-space"></div>
                    <div class="firma-line"></div>
                    <div class="firma-name">___________________________</div>
                    <div class="firma-sublabel">Emitido por la Fundación</div>
                </td>
            </tr>
        </table>
    </div>
</div>

<!-- PIE INSTITUCIONAL (posicionado al fondo via CSS fixed) -->
<footer>
    Fundación Cardenal Garibi Rivera, Fundación — Crédito y Cobranza
</footer>

<!-- Numeración de páginas via DOMPDF -->
<script type="text/php">
    if (isset($pdf)) {
        $x = $pdf->get_width() - 85;
        $y = $pdf->get_height() - 20;
        $text = "Página {PAGE_NUM} de {PAGE_COUNT}";
        $font = $fontMetrics->get_font("helvetica", "normal");
        $size = 7;
        $color = array(0.29, 0.33, 0.41);
        $pdf->page_text($x, $y, $text, $font, $size, $color, 0.0, 0.0, 0.0);
    }
</script>

</body>
</html>
