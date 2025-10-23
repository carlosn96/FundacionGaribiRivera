<?php

require '../../../../loader.php';
require '../../../assets/commons/template.php';

function renderizarPlantillaProyectos($dir, $scripts = [])
{
    $aside = "../../includes/aside.php";
    inicializarPlantilla($dir, $aside, $scripts);
}

//Sesion::controlarAccesoUbicacion("difusion");
Sesion::controlarPermisosAcceso(TipoUsuario::AUXILIAR_DIFUSION);
