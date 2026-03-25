<?php

require '../../../../loader.php';
require '../../../assets/commons/template.php';

function renderizarPlantillaProyectos($dir, $scripts = [], $estilos = [])
{
    $aside = "../../includes/aside.php";
    inicializarPlantilla($dir, $aside, $scripts, $estilos);
}

//Sesion::controlarAccesoUbicacion("difusion");
Sesion::controlarPermisosAcceso(TipoUsuario::AUXILIAR_DIFUSION);
