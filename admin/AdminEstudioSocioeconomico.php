<?php

class AdminEstudioSocioeconomico extends Admin
{

    public function __construct()
    {
        parent::__construct(new EstudioSocioeconomicoDAO());
    }

    public function guardarEstudioSocioeconomico(array $data)
    {
        return $this->dao->guardar($this->construirEstudioSocioeconomico($data));
    }

    public function getEstudioSocioeconomico(int $idEmprendedor): EstudioSocioeconomico|array|null
    {
        $es = $this->dao->getEstudioSocioeconomico($idEmprendedor);
        return count($es) ? $es : null;
    }

    public function eliminarPorEmprendedor($emprendedor)
    {
        return $this->dao->eliminarPorEmprendedor($emprendedor);
    }

    public function getListaIDEmprendedoresConES()
    {
        return $this->dao->getListaIDEmprendedoresConES();
    }

    public function recuperarTiposVivienda()
    {
        return $this->extraerInfoCampoEspecifico("estudio_socioeconomico_vivienda_tipo", "id_tipo_vivienda", "tipo");
    }

    public function recuperarCondicionVivienda()
    {
        return $this->extraerInfoCampoEspecifico("estudio_socioeconomico_vivienda_condicion", "id_condicion", "condicion");
    }

    public function recuperarUsoVivienda()
    {
        return $this->extraerInfoCampoEspecifico("estudio_socioeconomico_vivienda_uso", "id_uso", "uso");
    }

    public function recuperarTipoFamiliaHabitanteVivienda()
    {
        return $this->extraerInfoCampoEspecifico("estudio_socioeconomico_vivienda_familia_habitante", "id_familia", "familia");
    }

    public function recuperarVulnerabilidades()
    {
        return $this->extraerInfoCampoEspecifico("estudio_socioeconomico_vulnerabilidad", "id_vulnerabilidad", "descripcion");
    }

    public function recuperarActitudesPositivas()
    {
        return $this->recuperarActitudes("positiva");
    }

    public function recuperarActitudesNegativas()
    {
        return $this->recuperarActitudes("negativa");
    }

    private function recuperarActitudes($tipo)
    {
        return $this->extraerInfoCampoEspecifico("estudio_socioeconomico_actitud", "id_actitud", "actitud", " WHERE tipo = '$tipo' ");
    }

    public function recuperarTipoPisosVivienda()
    {
        return $this->extraerInfoCampoEspecifico("estudio_socioeconomico_vivienda_tipo_piso", "id_piso", "descripcion");
    }

    public function recuperarTipoTechoVivienda()
    {
        return $this->extraerInfoCampoEspecifico("estudio_socioeconomico_vivienda_tipo_techo", "id_techo", "descripcion");
    }

    public function recuperarTipoParedVivienda()
    {
        return $this->extraerInfoCampoEspecifico("estudio_socioeconomico_vivienda_tipo_pared", "id_pared", "descripcion");
    }

    public function recuperarDistribucionVivienda()
    {
        return $this->extraerInfoCampoEspecifico("estudio_socioeconomico_vivienda_distribucion", "id_distribucion", "descripcion");
    }

    public function recuperarServicioVivienda()
    {
        return $this->extraerInfoCampoEspecifico("estudio_socioeconomico_vivienda_servicio", "id_servicio", "descripcion");
    }

    private function construirEstudioSocioeconomico($data)
    {
        return new EstudioSocioeconomico(
            $data["idEmprendedor"],
            $this->construirSeccionEmpleabilidad($data),
            $this->construirSeccionFamiliares($data),
            $this->construirSeccionEconomiaFamiliar($data),
            $this->construirSeccionVivienda($data),
            $this->construirSeccionOtrosBienes($data),
            $this->construirSeccionReferencias($data),
            $this->construirSeccionVulnerabilidades($data),
            $this->construirSeccionConclusiones($data),
            $data["resultadoVisita"],
            $data["trabajadorSocial"],
            $data["fechaCreacion"] ?? ""
        );
    }

    private function construirSeccionEmpleabilidad(array $data)
    {
        $empresaActual = $data["empresa"];
        $puestoActual = $data["puesto"];
        $antiguedadActual = $data["antiguedad"];
        $empresaAnterior = $data["empresaAnterior"];
        $puestoAnterior = $data["puestoAnterior"];
        $antiguedadAnterior = $data["antiguedadAnterior"];
        $motivoRetiro = $data["motivoRetiro"];
        $cuentaConSeguroSocial = intval($data["cuentaConSeguroSocial"]);
        return new EstudioSocioeconomicoSeccionEmpleabilidad(
            $empresaActual,
            $puestoActual,
            $antiguedadActual,
            $empresaAnterior,
            $puestoAnterior,
            $antiguedadAnterior,
            $motivoRetiro,
            $cuentaConSeguroSocial
        );
    }

    private function construirSeccionFamiliares(array $data)
    {
        return new EstudioSocioeconomicoSeccionFamiliares($data["familiares"] ?? []);
    }

    private function construirSeccionEconomiaFamiliar(array $data)
    {
        return new EstudioSocioeconomicoSeccionEconomiaFamiliar(
            $data["ingresoMensual"],
            $data["egresos"]
        );
    }

    private function construirSeccionVivienda(array $data)
    {
        return new EstudioSocioeconomicoSeccionVivienda(
            $data["tipoVivienda"],
            $data["condicionVivienda"],
            $data['familiasHabitantesVivienda'],
            $data["usoVivienda"],
            $data["piso"] ?? [],
            $data["techo"] ?? [],
            $data["pared"] ?? [],
            $data["distribucion"] ?? [],
            $data["servicios"] ?? []
        );
    }

    private function construirSeccionOtrosBienes(array $data)
    {
        return new EstudioSocioeconomicoSeccionOtrosBienes(
            intval($data["vehiculoPropio"]),
            $data["tipoVehiculo"] ?? null,
            $data["marcaVehiculo"] ?? null,
            $data["modeloVehiculo"] ?? null
        );
    }

    private function construirSeccionReferencias(array $data)
    {
        $comercial = $data["referencias"]["comercial"];
        $familiar = $data["referencias"]["familiar"];
        $personal = $data["referencias"]["personal"];
        return new EstudioSocioeconomicoSeccionReferencias($comercial, $familiar, $personal);
    }

    private function construirSeccionVulnerabilidades(array $data)
    {
        return new EstudioSocioeconomicoSeccionVulnerabilidades($data["vulnerabilidad"]["vulnerabilidades"] ?? []);
    }

    private function construirSeccionConclusiones(array $data)
    {
        return new EstudioSocioeconomicoSeccionConclusiones(
            $data["actitudesPositivas"] ?? [],
            $data["actitudesNegativas"] ?? [],
            $data["observacionesGenerales"] ?? [],
            $data["fotografiasEvidencia"]
        );
    }

    public function cambiarFotografia($idFotografia, $fotografia)
    {
        return $this->dao->cambiarFotografia($idFotografia, $fotografia);
    }
    public function eliminarFotografia($idFotografia)
    {
        return $this->dao->eliminarFotografia($idFotografia);
    }

    public function agregarFotografiasNuevas($idConclusiones, $fotografias)
    {
        return $this->dao->agregarFotografiasNuevas($idConclusiones, $fotografias);
    }

    public function actualizarObservaciones($id, $observaciones)
    {
        return $this->dao->actualizarObservaciones($id, $observaciones);
    }

    public function eliminarFamiliar($idFamiliar)
    {
        return $this->dao->eliminarFamiliar($idFamiliar);
    }


    public function eliminarVulnerabilidad($idVulnerabilidad, $idEstudio)
    {
        return $this->dao->eliminarVulnerabilidad($idVulnerabilidad, $idEstudio);
    }

    public function agregarVulnerabilidad($idVulnerabilidad, $idEstudio)
    {
        return $this->dao->agregarVulnerabilidad($idVulnerabilidad, $idEstudio);
    }
}
