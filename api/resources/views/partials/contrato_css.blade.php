{{ $p ?? '' }} .text-center { text-align: center; }
{{ $p ?? '' }} .text-justify { text-align: justify; }
{{ $p ?? '' }} .fw-bold { font-weight: bold; }
{{ $p ?? '' }} .underline-span { border-bottom: 1px solid #000; display: inline-block; }
{{ $p ?? '' }} .mb-1 { margin-bottom: 5px; }
{{ $p ?? '' }} .mb-2 { margin-bottom: 10px; }
{{ $p ?? '' }} .mb-3 { margin-bottom: 15px; }
{{ $p ?? '' }} .mb-4 { margin-bottom: 20px; }
{{ $p ?? '' }} .my-4 { margin-top: 20px; margin-bottom: 20px; }
{{ $p ?? '' }} .mt-2 { margin-top: 10px; }
{{ $p ?? '' }} .mt-3 { margin-top: 15px; }
{{ $p ?? '' }} .mt-4 { margin-top: 20px; }
{{ $p ?? '' }} .ms-5 { margin-left: 40px; }

{{ $p ?? '' }} h5, {{ $p ?? '' }} h6 {
    color: #173f36;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    margin: 20px 0;
    font-size: 10pt;
}

{{ $p ?? '' }} ul, {{ $p ?? '' }} ol {
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 25px;
}

{{ $p ?? '' }} li {
    margin-bottom: 8px;
    text-align: justify;
}

{{ $p ?? '' }} .list-unstyled {
    list-style: none;
    padding-left: 0;
}

{{ $p ?? '' }} p {
    margin-bottom: 12px;
    text-align: justify;
}

{{ $p ?? '' }} em { font-style: italic; }

{{ $p ?? '' }} .doc-body { padding: 0; font-size: 9pt; line-height: 1.3; }

/* ── Sección de firmas ejecutivas ── */

/* Tabla wrapper con borde exterior */
{{ $p ?? '' }} .sig-wrapper-table {
    width: 100%;
    border-collapse: collapse;
    page-break-inside: avoid;
    margin-top: 24px;
}
{{ $p ?? '' }} .sig-wrapper-cell {
    border: 1.5px solid #173f36;
    padding: 10px 8px 4px 8px;
    border-radius: 0;
}

{{ $p ?? '' }} .sig-section {
    width: 100%;
    border-collapse: collapse;
}

{{ $p ?? '' }} .sig-col {
    width: 50%;
    text-align: center;
    vertical-align: top;
    padding: 0 16px 18px 16px;
}

{{ $p ?? '' }} .sig-col-full {
    width: 100%;
    text-align: center;
    vertical-align: top;
    padding: 0 70px 18px 70px;
}

{{ $p ?? '' }} .sig-role {
    font-size: 7pt;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #173f36;
    margin-bottom: 3px;
    border-bottom: 0.5px dotted #173f36;
    padding-bottom: 2px;
}

/* Recuadro sombreado tenue para el espacio de firma */
{{ $p ?? '' }} .sig-blank {
    height: 44px;
    background-color: #f5f7f5;
    border: 1px dashed #b0c0b8;
    margin: 3px 0;
}

/* Línea punteada de firma */
{{ $p ?? '' }} .sig-line {
    border: none;
    border-top: 1.2px dotted #444;
    margin: 0 auto;
    width: 100%;
}

{{ $p ?? '' }} .sig-name {
    font-size: 8pt;
    font-weight: bold;
    text-transform: uppercase;
    margin-top: 4px;
    letter-spacing: 0.3px;
    color: #111;
}

{{ $p ?? '' }} .sig-cargo {
    font-size: 7pt;
    color: #555;
    margin-top: 1px;
    font-style: italic;
}

