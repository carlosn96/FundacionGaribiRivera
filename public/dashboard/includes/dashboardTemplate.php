<?php

include '../../../../loader.php';

function renderizarPlantillaDashboard()
{
    include __DIR__ . '/plantilla.php';

}

Sesion::controlarPermisosAccesoEmprendedor();