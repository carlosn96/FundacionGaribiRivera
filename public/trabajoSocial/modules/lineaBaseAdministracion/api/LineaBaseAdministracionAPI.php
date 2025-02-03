<?php

include_once '../../../../../loader.php';

class LineaBaseAdministracionAPI extends API {

    function recuperarEmprendedores() {
        $this->enviarRespuesta([
            "emprendedores" => getAdminLineaBase()->listarEmprendoresConLineaBase(),
            "etapas" => getAdminEtapaFormacion()->listarEtapasFormacion()
        ]);
    }

    function filtrarEmprendedores() {
        $etapa = $this->getData("etapa");
        $this->enviarRespuesta([
            "emprendedores" => getAdminLineaBase()->listarEmprendoresConLineaBase($etapa),
            "etapas" => getAdminEtapaFormacion()->listarEtapasFormacion()
        ]);
    }

    function lineaBaseAction() {
        try {
            Sesion::setInfoTemporal("idUsuario", $this->getData("idUsuario"));
            Sesion::setInfoTemporal("tipoLineaBase", "final");
            $rs["success"] = true;
        } catch (Exception $exc) {
            $rs["success"] = false;
            $rs["msg"] = $exc->getMessage();
        } finally {
            $this->enviarRespuesta($rs);
        }
    }
}

LineaBaseAdministracionAPI::start();