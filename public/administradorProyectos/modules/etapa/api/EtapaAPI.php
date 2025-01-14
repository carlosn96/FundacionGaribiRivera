<?php

include_once '../../../../../loader.php';

class EtapaAPI extends API {

    function recuperarCampos() {
        $admEtapa = getAdminEtapaFormacion();
        $this->enviarRespuesta([
            "etapas" => ($etapas = $admEtapa->listarEtapasFormacion()),
            "tiposEtapa" => $admEtapa->listarTiposEtapasFormacion(),
            "aniosEtapas" => $this->filtrarAnios($etapas)
        ]);
    }
    
    function filtrarEtapasPorAnio() {
        $this->enviarRespuesta(getAdminEtapaFormacion()->listarEtapasFormacionPorAnio($this->getData("anio")));
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

    private function filtrarAnios($etapas) {
        return array_values(array_unique(array_map(function ($item) {
            return date('Y', strtotime($item['fechaInicio']));
        }, $etapas)));
    }
}

Util::iniciarAPI(EtapaAPI::class);
