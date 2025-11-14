<?php

include_once '../../../../../loader.php';

class MedicionImpactosAPI extends API {

    function consultarMedicionImpactos() {
        $idUsuario = $this->getUsuarioActual();
        $this->enviarRespuesta([
            "impactos" => getAdminImpacto()->getMedicionImpacto($idUsuario),
            "emprendedores" => getAdminLineaBase()->listarEmprendedoresParaImpactos($idUsuario),
        ]);
    }

    function actualizarConfiguracionFechas() {
        $this->enviarRespuesta($this->data);
    }

    function actualizarConfiguracionAnios() {
        $inicio = $this->getData("anioInicio");
        $fin = $this->getData("anioFin");
        $this->enviarResultadoOperacion(getAdminImpacto()->actualizarConfiguracionAnios(
                        $inicio,
                        $fin,
                        $this->getUsuarioActual()));
    }

    function actualizarFiltroEmprendedores() {
        $this->enviarResultadoOperacion(getAdminImpacto()->actualizarConfiguracionListaEmprendedores($this->data["seleccionados"]??[], $this->getUsuarioActual()));
    }
    
    function recuperarVistaGeneral() {
        $this->enviarRespuesta($this->getVistaGeneral($this->getData("tipo")));
    }
    
    private function getVistaGeneral($tipo) {
        return getAdminImpacto()->recuperarVistaGeneral($tipo);
    }
    
}

Util::iniciarAPI(MedicionImpactosAPI::class);
