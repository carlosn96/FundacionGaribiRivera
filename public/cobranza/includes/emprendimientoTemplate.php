<?php

require '../../../../loader.php';
require '../../../assets/commons/template.php';

function renderizarPlantillaEmprendimiento($dir, $scripts = [])
{
    $aside = "../../includes/aside.php";
    inicializarPlantilla($dir, $aside, $scripts);
}

Sesion::controlarPermisosAcceso(TipoUsuario::ENCARGADO_CREDITO_COBRANZA);
