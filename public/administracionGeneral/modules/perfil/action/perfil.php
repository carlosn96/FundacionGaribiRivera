<?php

require_once '../../../includes.php';

switch ($_POST["case"]) {
    case "recuperarInfo":
        mostrarResultados(getAdmin()->recuperarAsistenteID($_POST["idUsuario"])->toArray());
        break;
    case "actualizar":
        actualizarAsistente();
        break;
    case "agregarNuevo":
        crearAsistente();
        break;
    default :
        mostrarResultados(OPERACION_INCOMPLETA);
}

function obtenerFotografia() {
    return ["fotografia" => obtenerFotografiaBin($_FILES["fotografia"]["tmp_name"])];
}
function crearAsistente() {
    $formulario = obtenerFormulario();
    $formulario["contrasenia"] = password_hash($formulario["contrasenia"], PASSWORD_DEFAULT);
    mostrarResultados(getAdmin()->agregarAsistente($formulario) ?
                    ACTUALIZACION_COMPLETA : ERROR_INSERTAR);
}

function obtenerFormulario() {
    return $_POST += obtenerFotografia();
}

function actualizarAsistente() {
    mostrarResultados(getAdmin()->actualizarAsistente(obtenerFormulario()) ?
                    ACTUALIZACION_COMPLETA : ERROR_INSERTAR);
}

function getAdmin(): AdminAsistente {
    return new AdminAsistente();
}

function mostrarResultados($rs) {
    echo json_encode($rs);
}
