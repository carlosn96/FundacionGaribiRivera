
<?php

include '../../../../loader.php';
include '../../../assets/commons/template.php';

function renderizarPlantillaEmprendedor($dir, $scripts = []) {
    $aside = "../../includes/aside.php";
    inicializarPlantilla($dir, $aside, $scripts);
}

Sesion::controlarAccesoUbicacion("emprendedor");