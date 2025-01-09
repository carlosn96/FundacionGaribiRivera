<?php

class AdminLineaBase extends Admin {

    public function __construct() {
        parent::__construct(new LineaBaseDAO());
    }

    public function getLineaBase($usuario) {
        return $this->dao->getLineaBase($usuario);
    }

    public function guardarLineaBase($data) {
        //var_dump($data);
        $preliminar = $this->construirSeccionPreliminarInicial($data);
        $identificacion = $this->construirSeccionIdentificacion($data);
        $domicilio = $this->construirSeccionDomicilio($data);
        $socioeconomico = $this->construirSeccionSocioeconomico($data);
        $negocio = boolval($data["tieneNegocio"]) ? $this->construirSeccionNegocio($data) : null;
        $analisisNegocio = is_null($negocio) ? null : $this->construirSeccionAnalisisNegocio($data);
        $administracionIngresos = is_null($negocio) ? null : $this->construirSeccionAdministracionIngresosNegocio($data);
        return $this->dao->guardarLineaBase(new LineaBase($data["idEtapa"], $data["idUsuario"],
                                $preliminar,
                                $identificacion,
                                $domicilio,
                                $socioeconomico,
                                $negocio,
                                $analisisNegocio,
                                $administracionIngresos));
    }

    public function guardarLineaBaseFinal($data) {
        //var_dump($data);
        $preliminar = $this->construirSeccionPreliminarFinal($data);
        $socioeconomico = $this->construirSeccionSocioeconomico($data);
        $negocio = boolval($data["tieneNegocio"]) ? $this->construirSeccionNegocio($data) : null;
        $analisisNegocio = is_null($negocio) ? null : $this->construirSeccionAnalisisNegocio($data);
        $administracionIngresos = is_null($negocio) ? null : $this->construirSeccionAdministracionIngresosNegocio($data);
        $idUsuario = $data["idUsuario"];
        $fecha = Util::obtenerFechaActual();
        $lbfinal = new LineaBaseFinal($preliminar,
                $socioeconomico, $negocio, $analisisNegocio,
                $administracionIngresos, $data["idLineaBaseInicial"],
                $idUsuario, $fecha);
        //var_dump($lbfinal);
        return $this->dao->guardarLineaBaseFinal($lbfinal);
    }

    public function construirSeccionAnalisisNegocio($data): LineaBaseAnalisisNegocio {
        $registraEntradaSalida = intval($data["registraEntradaSalida"]);
        $asignaSueldo = intval($data["asignaSueldo"]);
        $conoceUtilidades = intval($data["conoceUtilidades"]);
        $identificaCompetencia = intval($data["identificaCompetencia"]);
        $quienCompetencia = $data["quienCompetencia"] ?? null;
        $clientesNegocio = $data["clientesNegocio"];
        $ventajasNegocio = $data["ventajasNegocio"];
        $problemasNegocio = $data["problemasNegocio"];
        $estrategiasIncrementarVentas = $data["estrategiasIncrementarVentas"] ?? [];
        $comoEmpleaGanancias = [$data["comoEmpleaGanancias"]];
        $conoceProductosMayorUtilidad = intval($data["conoceProductosMayorUtilidad"]);
        $porcentajeGanancias = boolval($conoceProductosMayorUtilidad) ? $data["porcentajeGanancias"] : null;
        $ahorro = intval($data["ahorro"]);
        $cuantoAhorro = floatval($data["cuantoAhorro"] ?? 0);
        $razonesNoAhorro = $data["razonesNoAhorro"] ?? null;
        $conocePuntoEquilibrio = intval($data["conocePuntoEquilibrio"]);
        $separaGastos = intval($data["separaGastos"]);
        $elaboraPresupuesto = intval($data["elaboraPresupuesto"]);
        return new LineaBaseAnalisisNegocio($registraEntradaSalida, $asignaSueldo,
                $conoceUtilidades, $identificaCompetencia, $quienCompetencia,
                $clientesNegocio, $ventajasNegocio, $problemasNegocio,
                $estrategiasIncrementarVentas, $comoEmpleaGanancias, $conoceProductosMayorUtilidad, $porcentajeGanancias,
                $ahorro, $cuantoAhorro, $razonesNoAhorro, $conocePuntoEquilibrio,
                $separaGastos, $elaboraPresupuesto);
    }

    public function construirSeccionAdministracionIngresosNegocio($data): LineaBaseAdministracionIngresosNegocio {
        $ventasMensuales = (float) $data['ventasMensuales'];
        $gastosMensuales = (float) $data['gastosMensuales'];
        $utilidadesMensuales = (float) $data['utilidadesMensuales'];
        $sueldoMensual = (float) $data['sueldoMensual'];
        $esIngresoPrincipalPersonal = intval($data['esIngresoPrincipalPersonal']);
        $esIngresoPrincipalFamiliar = intval($data['esIngresoPrincipalFamiliar']);
        $tieneHabitoAhorro = intval($data['tieneHabitoAhorro']);
        $cuentaConSistemaAhorro = intval($data['cuentaConSistemaAhorro']);
        $detallesSistemaAhorro = $data['detallesSistemaAhorro'] ?? "";
        $objetivosAhorro = [$data['objetivosAhorro']];
        $ahorroMensual = (float) ($data['ahorroMensual'] ?? 0);
        return new LineaBaseAdministracionIngresosNegocio($sueldoMensual,
                $ventasMensuales, $gastosMensuales, $utilidadesMensuales,
                $esIngresoPrincipalPersonal, $esIngresoPrincipalFamiliar,
                $tieneHabitoAhorro, $cuentaConSistemaAhorro, $detallesSistemaAhorro,
                $objetivosAhorro, $ahorroMensual);
    }

    public function construirSeccionNegocio($data): LineaBaseNegocio {
        $nombre = $data["nombreNegocio"];
        $telefono = $data["telefonoNegocio"];
        $antiguedad = $data["antiguedadNegocio"];
        $calle = $data["calleNegocio"];
        $calleCruce1 = $data["calleCruce1Negocio"];
        $calleCruce2 = $data["calleCruce2Negocio"];
        $numExterior = $data["numExteriorNegocio"];
        $numInterior = empty($data["numInteriorNegocio"]) ? null : $data["numInteriorNegocio"];
        $codigoPostal = $data["idCodigoPostalNegocio"];
        $colonia = $data["coloniaNegocio"];
        $cantEmpleados = $data["cantEmpleadosNegocio"];
        $giroNegocio = $data["giroNegocio"];
        [$actividad, $otraActividad] = $data["actividadNegocio"] === "Otra" ? [null, $data["otraActividadNegocio"]] : [$data["actividadNegocio"], null];
        return new LineaBaseNegocio($nombre, $telefono, $calle, $calleCruce1,
                $calleCruce2, $numExterior, $numInterior, $codigoPostal, $colonia,
                $antiguedad, $cantEmpleados, $actividad, $otraActividad, $giroNegocio);
    }

    public function construirSeccionSocioeconomico($data): LineaBaseSocioeconomico {
        $cantidadDependientes = $data["cantidadDependientesEconomicos"] ?? 0;
        $ocupacionActual = $data["ocupacionActual"];
        $ingresoMensual = $data["ingresoMensual"];
        return new LineaBaseSocioeconomico($cantidadDependientes, $ocupacionActual, $ingresoMensual);
    }

    public function construirSeccionDomicilio($data): LineaBaseDomicilio {
        $calle = $data["calle"];
        $calleCruce1 = $data["calleCruce1"];
        $calleCruce2 = $data["calleCruce2"];
        $numeroExterior = $data["numExterior"];
        $numeroInterior = empty($data["numInterior"]) ? null : $data["numInterior"];
        $codigoPostal = $data["idCodigoPostal"];
        $colonia = $data["colonia"];
        $comunidadParroquial = $data["comunidadParroquial"];
        return new LineaBaseDomicilio($calle, $calleCruce1, $calleCruce2,
                $numeroExterior, $numeroInterior,
                $codigoPostal, $colonia, $comunidadParroquial);
    }

    public function construirSeccionIdentificacion($data): LineaBaseIdentificacion {
        $genero = $data["genero"];
        $edad = $data["edad"];
        $estadoCivil = $data["estadoCivil"];
        $escolaridad = $data["escolaridad"];
        $discapacidad = isset($data["discapacidad"]) ? $data["discapacidad"] : null;
        return new LineaBaseIdentificacion($genero, $edad, $estadoCivil,
                $escolaridad, $discapacidad);
    }

    public function construirSeccionPreliminarInicial($data): LineaBasePreliminarInicial {
        $medioConoceFundacion = $data["medioConocimiento"] ?? [];
        $otroMedioConoceFundacion = $data["otroMedioConocimiento"][1] ?? null;
        $razonRecurreFundacion = empty($data["razonRecurre"]) ? null : $data["razonRecurre"];
        $otraRazonRecurreFundacion = $data["otraRazonRecurre"] ?? null;
        $solicitaCredito = $data["solicitaCredito"] ?? null;
        $utilizaCredito = $data["utilizaCredito"] ?? null;
        $tiempoDedicaCapacitacion = $data["tiempoCapacitacion"];
        return new LineaBasePreliminarInicial($medioConoceFundacion, $otroMedioConoceFundacion,
                $razonRecurreFundacion, $otraRazonRecurreFundacion, $solicitaCredito, $utilizaCredito,
                $tiempoDedicaCapacitacion);
    }

    public function construirSeccionPreliminarFinal($data): LineaBasePreliminarFinal {
        $huboBeneficioPersonal = intval($data["huboBeneficioPersonal"]);
        $beneficiosObtenidos = $data["beneficiosObtenidos"] ?? null;
        return new LineaBasePreliminarFinal($huboBeneficioPersonal, $beneficiosObtenidos);
    }

    public function recuperarListaMedioConocimientoFund() {
        return $this->extraerInfoCampoEspecifico("linea_base_medio_conocimiento", "id_medio", "descripcion");
    }

    public function recuperarListaEstrategiasIncrementarVentas() {
        return $this->extraerInfoCampoEspecifico("linea_base_estrategias_incrementar_ventas", "id_estrategia", "descripcion");
    }

    public function recuperarListaEmpleaGanancias() {
        return $this->extraerInfoCampoEspecifico("linea_base_empleo_ganancias", "id_empleo", "descripcion");
    }

    public function recuperarListaRazonRecurreFund() {
        return $this->extraerInfoCampoEspecifico("linea_base_razon_recurre", "id_razon", "descripcion");
    }

    public function recuperarListaSolicitaCredito() {
        return $this->extraerInfoCampoEspecifico("linea_base_solicita_credito", "id_solicitud", "descripcion");
    }

    public function recuperarListaUtilizaCredito() {
        return $this->extraerInfoCampoEspecifico("linea_base_utiliza_credito", "id_utilidad", "descripcion");
    }

    public function recuperarListaTiempoCapacitacion() {
        return $this->extraerInfoCampoEspecifico("linea_base_tiempo_capacitacion", "id_tiempo", "descripcion");
    }

    public function recuperarListaEscolaridad() {
        return $this->extraerInfoCampoEspecifico("linea_base_escolaridad", "id_escolaridad", "descripcion");
    }

    public function recuperarListaEstadoCivil() {
        return $this->extraerInfoCampoEspecifico("linea_base_estado_civil", "id_estado_civil", "descripcion");
    }

    public function recuperarListaVicarias() {
        return $this->extraerInfoCampoEspecifico("linea_base_arquidiocesis_vicaria", "id_vicaria", "nombre");
    }

    public function recuperarListaDecanato($vicaria) {
        return $this->extraerInfoCampoEspecifico("linea_base_arquidiocesis_decanato",
                        "id_decanato", "nombre", "WHERE id_vicaria = $vicaria");
    }

    public function recuperarListaComunidadParroquial($decanato) {
        return $this->extraerInfoCampoEspecifico("linea_base_arquidiocesis_comunidad_parroquial",
                        "id_comunidad", "nombre", "WHERE id_decanato = $decanato");
    }

    public function recuperarListaOcupaciones() {
        return $this->extraerInfoCampoEspecifico("linea_base_ocupacion",
                        "id_ocupacion", "descripcion");
    }

    public function recuperarListaRangosIngreso() {
        return $this->extraerInfoCampoEspecifico("linea_base_rango_ingreso_mensual",
                        "id_rango", "descripcion");
    }

    public function recuperarListaActividadNegocio() {
        return $this->extraerInfoCampoEspecifico("linea_base_giro_negocio",
                        "id_giro", "descripcion");
    }

    public function recuperarListaGiroNegocio() {
        return $this->extraerInfoCampoEspecifico("linea_base_giro_negocio_tipo",
                        "id_tipo_giro", "descripcion");
    }

    public function recuperarObjetivosAhorro() {
        return $this->extraerInfoCampoEspecifico("linea_base_objetivo_ahorros",
                        "id_objetivo", "descripcion");
    }

    public function listarEmprendoresConLineaBase() {
        return $this->dao->listarEmprendedoresLineaBase();
    }

    public function listarEmprendedoresParaImpactos($idUsuario) {
        return $this->dao->listarEmprendedoresParaImpactos($idUsuario);
    }

    public function buscarCodigoPostal($cp) {
        return $this->dao->buscarCodigoPostal($cp);
    }

    public function buscarParroquia($parroquia) {
        return $this->dao->buscarParroquia($parroquia);
    }

    public function actualizarEtapaEnLineaBase($idLineaBase, $idEtapa) {
        return $this->dao->actualizarEtapaEnLineaBase($idLineaBase, $idEtapa);
    }
    
    public function actualizarParametrosImpacto($params, $tipo, $id) : bool {
        return $this->dao->actualizarParametrosImpacto($params, $tipo, $id);
    }
}
