
<?php

include '../../../../loader.php';
include '../../../assets/commons/template.php';

function renderizarPlantillaProyectos($dir, $scripts = []) {
    $aside = "../../includes/aside.php";
    inicializarPlantilla($dir, $aside, $scripts);
}

Sesion::controlarAccesoUbicacion("proyectos");
