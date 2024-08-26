<?php

include_once '../../../../../loader.php';

class EtapaAPI extends API {

    function recuperarCampos() {
        $admEtapa = getAdminEtapaFormacion();
        $this->enviarRespuesta([
            "etapas" => $admEtapa->listarEtapasFormacion(),
            "talleres" => getAdminTaller()->listarNombreTalleres(),
            "tiposEtapa" => $admEtapa->listarTiposEtapasFormacion()
        ]);
    }

    function agregarEtapa() {
        $this->enviarResultadoOperacion(getAdminEtapaFormacion()->crearEtapa($this->data));
    }

    function eliminar() {
        $this->enviarResultadoOperacion(getAdminEtapaFormacion()->eliminarEtapa($this->data["id"]));
    }
    
    function actualizarEtapa() {
        $this->data["tipo"] = $this->data["tipoModal"];
        $this->enviarResultadoOperacion(getAdminEtapaFormacion()->actualizarEtapa($this->data));
    }
    
    function actualizarEtapaActual() {
        $this->enviarResultadoOperacion(getAdminEtapaFormacion()->actualizarEtapaActual($this->data["id"]));
    }
}

Util::iniciarAPI(EtapaAPI::class);
