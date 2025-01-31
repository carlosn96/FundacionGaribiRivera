<?php

include_once '../../../../../loader.php';

class InicioAdminProyectosAPI extends API {

    private const FILTRO_SIN_ETAPA = '-';
    private const FILTRO_TODOS = '-1';
    private const FILTRAR_EMPRENDEDORES_SIN_ETAPA = [self::FILTRO_SIN_ETAPA, 'Sin etapa asignada (emprendedores sin línea base)'];
    private const FILTRAR_EMPRENDEDORES_TODOS = [self::FILTRO_TODOS, 'Todos los registros'];

    function recuperarEmprendedores() {
        $etapas = getAdminEtapaFormacion()->listarEtapasFormacion();
        array_unshift($etapas, self::FILTRAR_EMPRENDEDORES_SIN_ETAPA, ($estapaSeleccionada = self::FILTRAR_EMPRENDEDORES_TODOS));
        $this->enviarRespuesta([
            "etapas" => [
                "lista" => $etapas,
                "estapaSeleccionada" => $estapaSeleccionada
            ],
            "emprendedores" => getAdminEmprendedor()->listar()
        ]);
    }

    function filtrarEmprendedores() {
        $etapa = $this->getData("etapa");
        $adminEmprendedor = getAdminEmprendedor();
        $emprendedores = ($etapa === self::FILTRO_TODOS) ? $adminEmprendedor->listar() : $adminEmprendedor->listarPorEtapa($etapa);
        $this->enviarRespuesta($emprendedores);
    }

    function eliminarEmprendedor() {
        $this->enviarResultadoOperacion(getAdminEmprendedor()->eliminarEmprendedor($this->getData("id")));
    }
}

Util::iniciarAPI(InicioAdminProyectosAPI::class);
