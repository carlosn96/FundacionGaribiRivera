<?php

class AdminLineaBase extends Admin {

    public function __construct() {
        parent::__construct(new LineaBaseDAO());
    }

    public function guardarLineaBase($data) {
        //var_dump($data);
        $preliminar = $this->construirSeccionPreliminar($data);
        $identificacion = $this->construirSeccionIdentificacion($data);
        $domicilio = $this->construirSeccionDomicilio($data);
        $socioeconomico = $this->construirSeccionSocioeconomico($data);
        $negocio = boolval($data["tieneNegocio"]) ? $this->construirSeccionNegocio($data) : null;
        $analisisNegocio = is_null($negocio) ? null : $this->construirSeccionAnalisisNegocio($data);
        return $this->dao->guardarLineaBase(new LineaBase($data["idEtapa"], $data["idUsuario"],
                                $preliminar,
                                $identificacion,
                                $domicilio,
                                $socioeconomico,
                                $negocio,
                                $analisisNegocio));
    }

    public function consultarLineaBase($idUsuario) {
        return $this->agruparLineaBase($this->dao->consultarLineaBase($idUsuario));
    }

    private function agruparLineaBase($result) {
        $lineaBase = [];
        $lineaBase['idLineaBase'] = $result['idLineaBase'];
        $lineaBase['idUsuario'] = $result['idUsuario'];
        $lineaBase['etapa'] = [
            'idEtapa' => $result['idEtapa'],
            'nombre' => $result['etapaNombre'],
            'fechaInicio' => $result['etapaFechaInicio'],
            'fechaFin' => $result['etapaFechaFin'],
            'tipo' => $result['etapaTipo']
        ];
        $lineaBase['fechaCreacion'] = $result['fechaCreacion'];

        $lineaBase['preliminar'] = [
            'listaMedioConoceFundacion' => $result['listaMedioConoceFundacion'],
            'otroMedioConoceFundacion' => $result['otroMedioConoceFundacion'],
            'otraRazonRecurreFundacion' => $result['otraRazonRecurreFundacion'],
            'razonRecurreFundacion' => [
                'id' => $result['idRazonRecurreFundacion'],
                'descripcion' => $result['razonRecurreDescripcion']
            ],
            'solicitaCredito' => [
                'id' => $result['idSolicitaCredito'],
                'descripcion' => $result['solicitaCreditoDescripcion'] ? "El crédito lo solicitaría para " . $result['solicitaCreditoDescripcion'] : null
            ],
            'utilizaCredito' => [
                'id' => $result['idUtilizaCredito'],
                'descripcion' => $result['utilizaCreditoDescripcion'] ? "El crédito lo utilizaría para " . $result['utilizaCreditoDescripcion'] : null
            ],
            'tiempoDedicaCapacitacion' => [
                'id' => $result['idTiempoDedicaCapacitacion'],
                'descripcion' => $result['tiempoDedicaCapacitacionDescripcion']
            ]
        ];

        $lineaBase['identificacion'] = [
            'genero' => $result['genero'],
            'edad' => $result['edad'],
            'estadoCivil' => [
                'id' => $result['estadoCivil'],
                'descripcion' => $result['estadoCivilDescripcion']
            ],
            'escolaridad' => [
                'id' => $result['escolaridad'],
                'descripcion' => $result['escolaridadDescripcion']
            ],
            'discapacidad' => $result['discapacidad'] ?? 'No'
        ];

        $lineaBase['domicilio'] = [
            'calle' => $result['domicilioCalle'],
            'calleCruce1' => $result['domicilioCalleCruce1'],
            'calleCruce2' => $result['domicilioCalleCruce2'],
            'numeroExterior' => $result['domicilioNumeroExterior'],
            'numeroInterior' => $result['domicilioNumeroInterior'] ? "(" . $result['domicilioNumeroInterior'] . ")" : null,
            'codigoPostal' => [
                'id' => $result['domicilioIdCodigoPostal'],
                'codigo' => $result['domicilioCodigoPostal'],
                'colonia' => $result['domicilioColonia']
            ],
            'municipio' => [
                'id' => $result['domicilioIdMunicipio'],
                'nombre' => $result['domicilioMunicipioNombre']
            ],
            'estado' => $result['domicilioEstadoNombre'],
            'comunidadParroquial' => [
                'id' => $result['domicilioIdComunidadParroquial'],
                'nombre' => $result['domicilioComunidadParroquialNombre'],
                'decanato' => $result['domicilioDecanatoNombre'],
                'vicaria' => $result['domicilioVicariaNombre']
            ]
        ];

        $lineaBase['socioeconomico'] = [
            'cantidadDependientes' => $result['cantidadDependientes'] . " dependiente" . (intval($result['cantidadDependientes']) > 1 ? "s" : ""),
            'ocupacionActual' => [
                'id' => $result['idOcupacionActual'],
                'descripcion' => $result['ocupacionDescripcion']
            ],
            'ingresoMensual' => [
                'id' => $result['idIngresoMensual'],
                'descripcion' => $result['ingresoMensualDescripcion']
            ]
        ];
        if ($result["negocioNombre"]) {
            $lineaBase['negocio'] = [
                'nombre' => $result['negocioNombre'],
                'telefono' => $result['negocioTelefono'],
                'calle' => $result['negocioCalle'],
                'calleCruce1' => $result['negocioCalleCruce1'],
                'calleCruce2' => $result['negocioCalleCruce2'],
                'numExterior' => $result['negocioNumExterior'],
                'numInterior' => $result['negocioNumInterior'],
                'numeroInterior' => $result['negocioNumInterior'] ? "(" . $result['negocioNumInterior'] . ")" : null,
                'codigoPostal' => [
                    'id' => $result['negocioIdCodigoPostal'],
                    'codigo' => $result['negocioCodigoPostal'],
                    'colonia' => $result['negocioColonia']
                ],
                'municipio' => [
                    'id' => $result['negocioIdMunicipio'],
                    'nombre' => $result['negocioMunicipioNombre']
                ],
                'estado' => $result['negocioEstadoNombre'],
                'antiguedad' => $result['negocioAntiguedad'],
                'cantEmpleados' => $result['negocioCantEmpleados'] . " empleado" . (intval($result['negocioCantEmpleados']) > 1 ? "s" : ""),
                'giro' => [
                    'id' => $result['negocioIdGiro'],
                    'descripcion' => $result['negocioGiro']
                ],
                'actividad' => [
                    'id' => $result['idNegocioActividad'],
                    'descripcion' => $result['negocioActividadDescripcion'] ?? $result['otraActividad']
                ]
            ];

            $lineaBase['analisisNegocio'] = [
                'problemasNegocio' => $result['negocioProblemas'],
                'registraEntradaSalida' => Util::respuestaBoolToStr($result['negocioRegistraEntradaSalida']),
                'asignaSueldo' => Util::respuestaBoolToStr($result['negocioAsignaSueldo']),
                'conoceUtilidades' => Util::respuestaBoolToStr($result['negocioConoceUtilidades']),
                'competencia' => boolval($result['negocioIdentificaCompetencia']) ? $result['negocioQuienCompetencia'] : "No identificada",
                'clientesNegocio' => $result['negocioClientes'],
                'ventajasNegocio' => $result['negocioVentajas'],
                'porcentajeProductosMayorUtilidad' => $result['negocioConoceProductosMayorUtilidad'] ? $result['negocioPorcentajeGanancias'] . "%" : "No identifica productos con mayor utilidad",
                'ahorro' => Util::respuestaBoolToStr($result['negocioLlevaAhorro']) . " asigna ahorro: " . (boolval($result['negocioLlevaAhorro']) ? $result['negocioCuantoAhorro'] : $result['negocioRazonesNoAhorro']),
                'conocePuntoEquilibrio' => Util::respuestaBoolToStr($result['negocioConocePuntoEquilibrio']),
                'separaGastos' => Util::respuestaBoolToStr($result['negocioSeparaGastos']),
                'elaboraPresupuesto' => Util::respuestaBoolToStr($result['negocioElaboraPresupuesto']),
                "listaEmpleoGanancias" => $result["listaEmpleoGanancias"],
                "listaEstrategiaVentas" => $result["listaEstrategiaVentas"]
            ];
        }
        return $lineaBase;
    }

    public function existeLineaBase($idUsuario): bool {
        return boolval($this->dao->existeLineaBase($idUsuario));
    }

    public function construirSeccionAnalisisNegocio($data): LineaBaseAnalisisNegocio {
        $problemasNegocio = $data["problemasNegocio"];
        $registraEntradaSalida = $data["registraEntradaSalida"];
        $asignaSueldo = $data["asignaSueldo"];
        $conoceUtilidades = $data["conoceUtilidades"];
        $identificaCompetencia = $data["identificaCompetencia"];
        $quienCompetencia = $data["quienCompetencia"] ?? null;
        $clientesNegocio = $data["clientesNegocio"];
        $ventajasNegocio = $data["ventajasNegocio"];
        $estrategiasIncrementarVentas = $data["estrategiasIncrementarVentas"] ?? [];
        $conoceProductosMayorUtilidad = $data["conoceProductosMayorUtilidad"];
        $porcentajeGanancias = $data["porcentajeGanancias"] ?? null;
        $ahorro = $data["ahorro"];
        $cuantoAhorro = $data["cuantoAhorro"] ?? null;
        $razonesNoAhorro = $data["razonesNoAhorro"] ?? null;
        $comoEmpleaGanancias = $data["comoEmpleaGanancias"] ?? [];
        $conocePuntoEquilibrio = $data["conocePuntoEquilibrio"];
        $separaGastos = $data["separaGastos"];
        $elaboraPresupuesto = $data["elaboraPresupuesto"];

        return new LineaBaseAnalisisNegocio($problemasNegocio, $registraEntradaSalida,
                $asignaSueldo, $conoceUtilidades, $identificaCompetencia,
                $quienCompetencia, $clientesNegocio, $ventajasNegocio,
                $estrategiasIncrementarVentas, $conoceProductosMayorUtilidad,
                $porcentajeGanancias, $ahorro, $cuantoAhorro,
                $razonesNoAhorro, $comoEmpleaGanancias, $conocePuntoEquilibrio,
                $separaGastos, $elaboraPresupuesto);
    }

    public function construirSeccionNegocio($data): LineaBaseNegocio {
        $nombre = $data["nombreNegocio"];
        $telefono = $data["telefonoNegocio"];
        $antiguedad = $data["antiguedadNegocio"];
        $calle = $data["calleNegocio"];
        $calleCruce1 = $data["calleCruce1Negocio"];
        $calleCruce2 = $data["calleCruce2Negocio"];
        $numExterior = $data["numExteriorNegocio"];
        $numInterior = empty($data["numInteriorNegocio"]) ? null : $data["numInterior"];
        $codigoPostal = $data["idCodigoPostalNegocio"];
        $cantEmpleados = $data["cantEmpleadosNegocio"];
        $giroNegocio = $data["giroNegocio"];
        [$actividad, $otraActividad] = $data["actividadNegocio"] === "Otra" ? [null, $data["otraActividadNegocio"]] : [$data["actividadNegocio"], null];
        return new LineaBaseNegocio($nombre, $telefono, $calle, $calleCruce1,
                $calleCruce2, $numExterior, $numInterior, $codigoPostal,
                $antiguedad, $cantEmpleados, $actividad, $otraActividad, $giroNegocio);
    }

    public function construirSeccionSocioeconomico($data): LineaBaseSocioeconomico {
        $cantidadDependientes = $data["cantidadDependientesEconomicos"];
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
        $comunidadParroquial = $data["comunidadParroquial"];
        return new LineaBaseDomicilio($calle, $calleCruce1, $calleCruce2,
                $numeroExterior, $numeroInterior, $codigoPostal, $comunidadParroquial);
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

    public function construirSeccionPreliminar($data): LineaBasePreliminar {
        $medioConoceFundacion = $data["medioConocimiento"] ?? [];
        $otroMedioConoceFundacion = $data["otroMedioConocimiento"][1] ?? null;
        $razonRecurreFundacion = empty($data["razonRecurre"]) ? null : $data["razonRecurre"];
        $otraRazonRecurreFundacion = $data["otraRazonRecurre"] ?? null;
        $solicitaCredito = $data["solicitaCredito"] ?? null;
        $utilizaCredito = $data["utilizaCredito"] ?? null;
        $tiempoDedicaCapacitacion = $data["tiempoCapacitacion"];
        return new LineaBasePreliminar($medioConoceFundacion, $otroMedioConoceFundacion,
                $razonRecurreFundacion, $otraRazonRecurreFundacion, $solicitaCredito, $utilizaCredito,
                $tiempoDedicaCapacitacion);
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

    public function listarEmprendoresConLineaBase() {
        return $this->dao->listarEmprendedoresLineaBase();
    }

    public function buscarCodigoPostal($cp) {
        return $this->dao->buscarCodigoPostal($cp);
    }

    public function buscarParroquia($parroquia) {
        return $this->dao->buscarParroquia($parroquia);
    }
}
