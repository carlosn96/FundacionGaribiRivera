<?php

include_once '../../../../../loader.php';

class SeguimientoCasoAPI extends API {

    function recuperarEmprendedores() {
        $this->enviarRespuesta([
            "emprendedores"=>getAdminLineaBase()->listarEmprendoresConLineaBase(),
            "etapas"=> getAdminEtapaFormacion()->listarEtapasFormacion()
        ]);
    }
    
    function actualizarEtapa() {
        $idLineaBase = $this->getData("id");
        $idEtapa = $this->getData("val");
        $this->enviarResultadoOperacion(getAdminLineaBase()->actualizarEtapaEnLineaBase($idLineaBase, $idEtapa));
    }

    function recuperarSeguimientoCaso() {
        $this->enviarRespuesta(["seguimientoCaso" => getAdminEmprendedor()->recuperarSeguimientoCaso($this->data["idLineaBase"])]);
    }
    function eliminarSeguimientoCaso() {
        $this->enviarResultadoOperacion(getAdminEmprendedor()->eliminarSeguimientoCaso($this->data["id"]));
    }
}

Util::iniciarAPI(SeguimientoCasoAPI::class);
