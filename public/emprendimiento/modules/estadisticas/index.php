<?php

require_once '../../includes/emprendimientoTemplate.php';

renderizarPlantillaEmprendimiento(
    __DIR__,
    [
        'api/estadisticas.js',
        '../../../assets/libs/apexcharts/dist/apexcharts.min.js'
    ]
);
