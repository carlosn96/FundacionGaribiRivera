<?php

require_once '../../includes/cobranzaTemplate.php';

renderizarPlantillaCobranza(
    __DIR__, [
        'api/expedienteController.js'
    ]
);
