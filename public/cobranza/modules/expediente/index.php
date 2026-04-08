<?php

require_once '../../includes/cobranzaTemplate.php';

renderizarPlantillaCobranza(
    __DIR__,
    [
        'api/expedienteAPI.js',
        'api/helpers.js',
        'api/tabFinanciero.js',
        'api/tabAval.js',
        'api/tabInmueble.js',
        'api/tabResumen.js',
        'api/main.js'
    ],
    [
        'css/expediente.css'
    ]
);
