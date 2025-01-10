<?php

include_once '../../../../../loader.php';

class SeguimientoCasoAPI extends API {

    function recuperarEmprendedores() {
        $this->enviarRespuesta([
            "emprendedores" => getAdminLineaBase()->listarEmprendoresConLineaBase(),
            "etapas" => getAdminEtapaFormacion()->listarEtapasFormacion()
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

    function eliminarLineaBase() {
        $this->enviarResultadoOperacion(getAdminLineaBase()->eliminarLineaBase($this->data["tipo"], $this->data["usuario"]));
    }

    function lineaBaseAction() {
        try {
            Sesion::setInfoTemporal("idUsuario", $this->getData("idUsuario"));
            Sesion::setInfoTemporal("tipoLineaBase", $this->getData("tipo"));
            $rs["success"] = true;
        } catch (Exception $exc) {
            $rs["success"] = false;
            $rs["msg"] = $exc->getMessage();
        } finally {
            $this->enviarRespuesta($rs);
        }
    }
}

Util::iniciarAPI(SeguimientoCasoAPI::class);
