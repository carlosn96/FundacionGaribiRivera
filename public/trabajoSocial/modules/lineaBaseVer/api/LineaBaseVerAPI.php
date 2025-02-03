<?php

include_once '../../../../../loader.php';

class LineaBaseVerAPI extends API {

    function recuperarInfoLineaBase() {
        $tipo = Sesion::getInfoTemporal("tipoLineaBase");
        $id = Sesion::getInfoTemporal("idUsuario");
        $lb = getAdminLineaBase()->getLineaBase($id);
        $existeLineaBase = $lb[$tipo]["existeLineaBase"];
        $data = $lb[$tipo]["data"];
        $emprendedor = getAdminUsuario()->buscarUsuarioPorID($id);
        $this->enviarRespuesta(compact('existeLineaBase','tipo', 'emprendedor', 'data'));
    }
}

LineaBaseVerAPI::start();