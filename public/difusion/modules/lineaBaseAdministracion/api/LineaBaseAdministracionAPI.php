<?php

require_once '../../../../../loader.php';

class LineaBaseAdministracionAPI extends API
{
    private const FILTRO_SIN_ETAPA = '-';
    private const FILTRO_TODOS = '-1';
    private const FILTRAR_EMPRENDEDORES_SIN_ETAPA = [self::FILTRO_SIN_ETAPA, 'Sin etapa asignada (emprendedores sin línea base)'];
    private const FILTRAR_EMPRENDEDORES_TODOS = [self::FILTRO_TODOS, 'Todos los registros'];

    function recuperarEmprendedores()
    {
        $this->enviarRespuesta(
            [
            "emprendedores" => getAdminLineaBase()->listarEmprendoresConLineaBase(),
            "emprendedoresNoLineaBase" => getAdminLineaBase()->listarEmprendoresSinLineaBase(),
            "etapas" => getAdminEtapaFormacion()->listarEtapasFormacion()
            ]
        );
    }

    function filtrarEmprendedores()
    {
        $etapa = $this->getData("etapa");
        $this->enviarRespuesta(
            [
            "emprendedores" => getAdminLineaBase()->listarEmprendoresConLineaBase($etapa),
            "etapas" => getAdminEtapaFormacion()->listarEtapasFormacion()
            ]
        );
    }

    function actualizarEtapa()
    {
        $idLineaBase = $this->getData("lineaBase");
        $idEtapa = $this->getData("etapa");
        $this->enviarResultadoOperacion(getAdminLineaBase()->actualizarEtapaEnLineaBase($idLineaBase, $idEtapa));
    }

    function recuperarSeguimientoCaso()
    {
        $this->enviarRespuesta(["seguimientoCaso" => getAdminEmprendedor()->recuperarSeguimientoCaso($this->data["idLineaBase"])]);
    }

    function eliminarSeguimientoCaso()
    {
        $this->enviarResultadoOperacion(getAdminEmprendedor()->eliminarSeguimientoCaso($this->data["id"]));
    }

    function eliminarLineaBase()
    {
        $this->enviarResultadoOperacion(getAdminLineaBase()->eliminarLineaBase($this->data["tipo"], $this->data["usuario"]));
    }

    function lineaBaseAction()
    {
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

    function eliminarEmprendedoresSeleccionados()
    {
        $ids = $this->getData("ids");
        $this->enviarResultadoOperacion(getAdminEmprendedor()->eliminarMultipleEmprendedores($ids));
    }
}

LineaBaseAdministracionAPI::start();
