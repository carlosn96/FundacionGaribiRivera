<?php

include_once '../../../../../loader.php';

class VisitaSeguimientoAPI extends API {

    function recuperarEmprendedores() {
        $lista = getAdminLineaBase()->listarEmprendoresConLineaBase();
        foreach ($lista as &$emprendedor) {
            $emprendedor["visitasSeguimiento"] = getAdminVisitaSeguimiento()->listadoSimple($emprendedor["idUsuario"]);
        }
        $this->enviarRespuesta($lista);
    }

}

Util::iniciarAPI(VisitaSeguimientoAPI::class);
