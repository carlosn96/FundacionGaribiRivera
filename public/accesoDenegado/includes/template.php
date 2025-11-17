<?php

require '../../../../loader.php';
require '../../../assets/commons/template.php';

function renderizarPlantillaAccesoDenegado($dir, $scripts = [])
{
    $aside = "../../includes/aside.php";
    inicializarPlantilla($dir, $aside, $scripts);
}
