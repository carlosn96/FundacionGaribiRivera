<?php

require_once '../../../includes.php';

switch ($_POST["case"]) {
    case "actualizar":
        actualizarAsistente();
        break;
    case "contrasenia":
        actualizarContrasenia();
        break;
    default :
        mostrarResultados(OPERACION_INCOMPLETA);
}

function actualizarContrasenia() {
    $usuario = getUsuario();
    $contraseniaHash = $_POST["contraseniaHash"];
    $contraseniaActual = $_POST["contraseniaActual"];
    $contraseniaNueva = password_hash($_POST["contraseniaNueva"], PASSWORD_DEFAULT);
    if (password_verify($contraseniaActual, $contraseniaHash)) {
        if (getAdmin()->actualizarContrasenia($usuario->obtenerIdentificadorAcceso(), $contraseniaNueva)) {
            actualizarSesion($usuario);
            $resultado = OPERACION_COMPLETA;
        } else {
            $resultado = OPERACION_INCOMPLETA;
        }
    } else {
        $resultado = ERROR_CONTRASENIA_ACTUAL;
    }
    mostrarResultados($resultado);
}

function obtenerFormulario() {
    $fotografia = ["fotografia" => obtenerFotografiaBin($_FILES["fotografia"]["tmp_name"])];
    $formulario = $_POST += $fotografia;
    return $formulario;
}

function actualizarAsistente() {
    if (getAdmin()->actualizarAsistente(obtenerFormulario())) {
        $usuario = getUsuario();
        //$idAcceso = $usuario->obtenerIdentificadorAcceso();
        //$usuario->establecerIdentificadorAcceso(0);
        //$sesion->actualizar($usuario);
        actualizarSesion($usuario);
        $resultado = ACTUALIZACION_COMPLETA;
    } else {
        $resultado = ERROR_INSERTAR;
    }
    mostrarResultados($resultado);
}

function getAdmin(): AdminAsistente {
    return new AdminAsistente();
}

function mostrarResultados($rs) {
    echo json_encode($rs);
}

function actualizarSesion($usuario) {
    getSesion()->actualizar(getAdmin()->recuperarAsistenteID($usuario->obtenerIdentificadorUsuario()));
}

function getUsuario() {
    return getSesion()->obtenerUsuarioActual()["usuario"];
}
