<?php

require_once '../../../includes.php';

switch ($_POST["case"]) {
    case "recuperarInfo":
        mostrarResultados(getAdmin()->recuperarInfoEmpresa()->toArray());
        break;
    case "guardarTupla":
        mostrarResultados(guardarTupla());
        break;
    case "eliminar":
        mostrarResultados(eliminarTupla());
        break;
    case "recuperarInfoCampo":
        mostrarResultados(recuperarInfoCampo());
        break;
    case "actualizarCampoInfoGeneral":
        mostrarResultados(actualizarCampoInfoGeneral());
        break;
    default :
        mostrarResultados(OPERACION_INCOMPLETA);
}

function actualizarCampoInfoGeneral() {
    $data = separaCamposFomulario($_POST["data"]);
    $tabla = obtenerNombreTabla($data["tipoRegistro"]);
    $id = $data["id"];
    unset($data["tipoRegistro"]);
    unset($data["id"]);
    return getAdmin()->actualizarInfoGeneral($tabla, $data, $id) ? OPERACION_COMPLETA : OPERACION_INCOMPLETA;
}

function guardarTupla() {
    return getAdmin()->crearRegistroInfoInfoGeneral(obtenerNombreTabla($_POST["tabla"])["tabla"], $_POST["data"]) ? OPERACION_COMPLETA : OPERACION_INCOMPLETA;
}

function obtenerNombreTabla($case) {
    switch ($case) {
        case "NumTelefonos":
        case "telefonos":
            $tabla = AsistenteDAO::TABLA_INFO_EMPRESA_TEL;
            $primaryKey = "id_telefono";
            break;
        case "Correos":
        case "correos":
            $tabla = AsistenteDAO::TABLA_INFO_EMPRESA_CORREO;
            $primaryKey = "id_correo";
            break;
        case "Cuentas":
        case "cuentasBancarias":
            $tabla = AsistenteDAO::TABLA_INFO_EMPRESA_BANCO;
            $primaryKey = "id_cuenta";
            break;
        case "Clausulas":
        case "clausulas":
            $tabla = AsistenteDAO::TABLA_INFO_EMPRESA_CLAUSULA;
            $primaryKey = "id_clausula";
            break;
    }
    return ["tabla" => $tabla, "primaryKey" => $primaryKey];
}

function recuperarInfoCampo() {
    $data = $_POST["data"];
    return getAdmin()->recuperarInfoEmpresaID(obtenerNombreTabla($data["tipo"]), $data["id"]);
}

function eliminarTupla() {
    return getAdmin()->eliminarRegistroInfoGeneral(obtenerNombreTabla($_POST["tipoRegistro"]), $_POST["id"]) ? OPERACION_COMPLETA : OPERACION_INCOMPLETA;
}

function getAdmin(): AdminAsistente {
    return new AdminAsistente();
}

function mostrarResultados($rs) {
    echo json_encode($rs);
}
