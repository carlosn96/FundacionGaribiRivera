
<?php

include '../../../../loader.php';
include '../../../assets/commons/template.php';

function renderizarPlantillaTrabajoSocial($dir, $scripts = []) {
    inicializarPlantilla($dir, "../../includes/aside.php", $scripts);
}

Sesion::controlarAccesoUbicacion("trabajoSocial");
