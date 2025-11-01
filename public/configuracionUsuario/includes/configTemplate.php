
<?php

include '../../../../loader.php';
include '../../../assets/commons/template.php';

function renderizarPlantillaConfiguracion($dir, $scripts = []) {
    $aside = "../../includes/aside.php";
    inicializarPlantilla($dir, $aside, $scripts);
}

//Sesion::controlarAccesoUbicacion("emprendedor");