<?php

include_once '../../../../../loader.php';

class MedicionImpactosAPI extends API
{

    function consultarMedicionImpactos()
    {
        $idUsuario = $this->getUsuarioActual();
        $this->enviarRespuesta([
            "impactos" => getAdminImpacto()->getMedicionImpacto($idUsuario),
            "emprendedores" => getAdminLineaBase()->listarEmprendedoresParaImpactos($idUsuario)
        ]);
    }

    function actualizarConfiguracionFechas()
    {
        $inicio = $this->getData("fechaInicio");
        $fin = $this->getData("fechaFin");
        $this->enviarResultadoOperacion(getAdminImpacto()->actualizarConfiguracionAnios(
            $inicio,
            $fin,
            $this->getUsuarioActual()
        ));
    }

    function actualizarFiltroEmprendedores()
    {
        $this->enviarResultadoOperacion(getAdminImpacto()->actualizarConfiguracionListaEmprendedores($this->data["seleccionados"] ?? [], $this->getUsuarioActual()));
    }

    function recuperarVistaGeneral()
    {
        $this->enviarRespuesta($this->getVistaGeneral($this->getData("tipo")));
    }

    function aplicarPreprocesamiento()
    {
        $preprocesamiento = $this->getData("preprocesamiento");
        $this->enviarResultadoOperacion(getAdminImpacto()->actualizarConfiguracionPreprocesamiento($preprocesamiento, $this->getUsuarioActual()));
    }

    private function getVistaGeneral($tipo)
    {
        return getAdminImpacto()->recuperarVistaGeneral($tipo);
    }

}

Util::iniciarAPI(MedicionImpactosAPI::class);
