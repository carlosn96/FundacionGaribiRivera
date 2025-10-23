
<?php

include '../../../../loader.php';
include '../../../assets/commons/template.php';

function renderizarPlantillaAdministrador($dir, $scripts = []) {
    $aside = "../../includes/aside.php";
    inicializarPlantilla($dir, $aside, $scripts);
}

//Sesion::controlarAccesoUbicacion("administracionGeneral");
Sesion::controlarPermisosAcceso(TipoUsuario::ADMINISTRADOR_GENERAL);