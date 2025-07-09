<?php

include_once '../../../../../loader.php';

class EstudioSocioeconomicoAPI extends API
{

    function eliminar()
    {
        //Util::error_log();
        $this->enviarResultadoOperacion(getAdminEstudioSocioeconomico()->eliminarPorEmprendedor($this->getData("id")));
    }

    function recuperarEmprendedores()
    {
        $this->enviarRespuesta([
            "emprendedores" => $this->listarEmprendedores(),
            "etapas" => getAdminEtapaFormacion()->listarEtapasFormacion()
        ]);
    }

    function filtrarEmprendedores()
    {
        $etapa = $this->getData("etapa");
        $this->enviarRespuesta([
            "emprendedores" => getAdminLineaBase()->listarEmprendoresConLineaBase($etapa),
            "etapas" => getAdminEtapaFormacion()->listarEtapasFormacion()
        ]);
    }

    private function listarEmprendedores()
    {
        $conLineaBase = getAdminLineaBase()->listarEmprendoresConLineaBase();
        $conES = array_flip(getAdminEstudioSocioeconomico()->getListaIDEmprendedoresConES());
        $emprendedoresConES = [];
        $emprendedoresSinES = [];
        foreach ($conLineaBase as &$emprendedor) {
            $id = $emprendedor["idUsuario"];
            $tieneES = isset($conES[$id]);
            $emprendedor["tieneES"] = $tieneES;
            if ($tieneES) {
                $emprendedoresConES[] = $emprendedor;
            } else {
                $emprendedoresSinES[] = $emprendedor;
            }
        }
        unset($emprendedor); // Buenas prácticas con foreach por referencia
        Sesion::setInfoTemporal("emprendedoresConES", $emprendedoresConES);
        Sesion::setInfoTemporal("emprendedoresSinES", $emprendedoresSinES);
        return $conLineaBase;
    }


    public function getEmprendedoresPorTipo()
    {
        $tipo = strtolower(trim($this->getData("tipo") ?? ''));
        if ($tipo !== 'con' && $tipo !== 'sin') {
            throw new Exception("Tipo de emprendedores no válido o no especificado. Debe ser 'con' o 'sin'.");
        }
        $key = $tipo === 'con' ? "emprendedoresConES" : "emprendedoresSinES";
        $emprendedores = Sesion::getInfoTemporal($key);
        if ($emprendedores === null) {
            $this->listarEmprendedores();
            $emprendedores = Sesion::getInfoTemporal($key);
        }
        $this->enviarRespuesta( ["emprendedores"=>$emprendedores]);
    }
}

EstudioSocioeconomicoAPI::start();
