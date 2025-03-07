<?php

include_once '../../../../../loader.php';

class LineaBaseVerAPI extends API {

    function recuperarInfoLineaBase() {
        $tipo = Sesion::getInfoTemporal("tipoLineaBase");
        $id = Sesion::getInfoTemporal("idUsuario");
        $lb = getAdminLineaBase()->getLineaBase($id);
        $existeLineaBase = $lb[$tipo]["existeLineaBase"];
        $data = $lb[$tipo]["data"];
        if($existeLineaBase && $tipo === "final") {
            $data["generalidades"] = getAdminEmprendedor()->recuperarSeguimientoCaso($data["idLineaBase"]); // El seguimiento de caso desaparece y se combina con la Linea Base Final (ahora Seguimiento)
        }
        $emprendedor = getAdminUsuario()->buscarUsuarioPorID($id);
        $this->enviarRespuesta(compact('existeLineaBase','tipo', 'emprendedor', 'data'));
    }
}

LineaBaseVerAPI::start();