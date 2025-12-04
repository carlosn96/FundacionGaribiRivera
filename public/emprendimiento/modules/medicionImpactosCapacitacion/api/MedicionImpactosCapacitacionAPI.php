<?php

include_once '../../../../../loader.php';

class MedicionImpactosCapacitacionAPI extends API {


    function consultarMedicionImpactos() {
        $idUsuario = $this->getUsuarioActual();
        $this->enviarRespuesta([
            "impactos" => getAdminImpactoCapacitacion()->getMedicionImpacto($idUsuario),
            "emprendedores" => getAdminLineaBase()->listarEmprendedoresParaImpactos($idUsuario),
        ]);
    }

    function actualizarConfiguracionFechas() {
        $inicio = $this->getData("fechaInicio");
        $fin = $this->getData("fechaFin");
        $this->enviarResultadoOperacion(getAdminImpacto()->actualizarConfiguracionAnios(
                        $inicio,
                        $fin,
                        $this->getUsuarioActual()));
    }

    function actualizarFiltroEmprendedores() {
        $this->enviarResultadoOperacion(getAdminImpacto()->actualizarConfiguracionListaEmprendedores($this->data["seleccionados"]??[], $this->getUsuarioActual()));
    }
    
    function recuperarVistaGeneral() {
        $this->enviarRespuesta(getAdminImpactoCapacitacion()->recuperarVistaGeneral($this->getData("tipo")));
    }
    
}

Util::iniciarAPI(MedicionImpactosCapacitacionAPI::class);
