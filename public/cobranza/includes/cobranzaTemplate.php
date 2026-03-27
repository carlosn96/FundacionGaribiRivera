<?php

require '../../../../loader.php';
require '../../../assets/commons/template.php';

function renderizarPlantillaCobranza($dir, $scripts = [], $styles = [])
{
    $aside = "../../includes/aside.php";
    inicializarPlantilla($dir, $aside, $scripts, $styles);
}

Sesion::controlarPermisosAcceso(TipoUsuario::ENCARGADO_CREDITO_COBRANZA);
