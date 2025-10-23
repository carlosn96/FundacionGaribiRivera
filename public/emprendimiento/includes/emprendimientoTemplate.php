<?php

require '../../../../loader.php';
require '../../../assets/commons/template.php';

function renderizarPlantillaEmprendimiento($dir, $scripts = [])
{
    $aside = "../../includes/aside.php";
    inicializarPlantilla($dir, $aside, $scripts);
}

//Sesion::controlarAccesoUbicacion("emprendimiento");
Sesion::controlarPermisosAcceso(TipoUsuario::COORDINADOR_EMPRENDIMIENTO);