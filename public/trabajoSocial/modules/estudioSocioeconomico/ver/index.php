<?php

include_once '../../../../../loader.php';

$admin = getAdminLineaBase();
$existeLineaBase = $admin->getLineaBase($id = $_GET["id"])["inicial"]["existeLineaBase"];
$estudioSocioeconomico = getAdminEstudioSocioeconomico()->getEstudioSocioeconomico($id);
Sesion::setInfoTemporal("estudioSocioeconomico", $estudioSocioeconomico);
Sesion::setInfoTemporal("emprendedor", $emprendedor = getAdminUsuario()->buscarUsuarioPorID($id));

Util::redirigir("../../estudioSocioeconomicoVer/");