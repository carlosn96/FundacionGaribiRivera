<?php

require_once '../../includes/cobranzaTemplate.php';

renderizarPlantillaCobranza(
    __DIR__, [
        'api/pagosController.js'
    ],
    ['assets/styles.css']
);
