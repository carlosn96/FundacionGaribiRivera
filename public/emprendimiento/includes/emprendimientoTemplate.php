<?php

require '../../../../loader.php';
require '../../../assets/commons/template.php';

function renderizarPlantillaEmprendimiento($dir, $scripts = [], $styles = [])
{
    $aside = "../../includes/aside.php";
    inicializarPlantilla($dir, $aside, $scripts, $styles);
}

//Sesion::controlarAccesoUbicacion("emprendimiento");
Sesion::controlarPermisosAcceso(TipoUsuario::COORDINADOR_EMPRENDIMIENTO);