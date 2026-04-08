<?php

require_once '../../includes/cobranzaTemplate.php';

renderizarPlantillaCobranza(
    __DIR__,
    [
        '../expediente/api/expedienteAPI.js',
        '../expediente/api/helpers.js',
        'api/contrato.js',
    ],
    [
        'css/contrato.css'
    ]
);
