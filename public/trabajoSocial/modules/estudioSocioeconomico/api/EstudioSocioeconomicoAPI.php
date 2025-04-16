<?php

include_once '../../../../../loader.php';

class EstudioSocioeconomicoAPI extends API {

    function eliminar() {
        //Util::error_log();
        $this->enviarResultadoOperacion(getAdminEstudioSocioeconomico()->eliminarPorEmprendedor($this->getData("id")));
    }

    function recuperarEmprendedores() {
        $this->enviarRespuesta([
            "emprendedores" => $this->listarEmprendedores(),
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

    private function listarEmprendedores() {
        $conLineaBase = getAdminLineaBase()->listarEmprendoresConLineaBase();
        $conES = getAdminEstudioSocioeconomico()->getListaIDEmprendedoresConES();
        foreach ($conLineaBase as &$emprendedor) {
            $id = $emprendedor["idUsuario"];
            $emprendedor["tieneES"] = in_array($id, $conES);
        }
        return $conLineaBase;
    }
}

EstudioSocioeconomicoAPI::start();
