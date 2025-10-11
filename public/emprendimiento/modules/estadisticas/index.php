<?php

require_once '../../includes/emprendimientoTemplate.php';

renderizarPlantillaEmprendimiento(
    __DIR__,
    [
        'api/estadisticas.js',
        'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js'
    ]
);
