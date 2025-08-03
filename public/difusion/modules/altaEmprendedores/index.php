<?php

require_once '../../includes/proyectosTemplate.php';

renderizarPlantillaProyectos(
    __DIR__, [
    'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.2/papaparse.min.js',
    'api/altaEmprendedores.js'
    ]
);
