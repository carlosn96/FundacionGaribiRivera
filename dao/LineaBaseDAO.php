<?php

class LineaBaseDAO extends DAO {

    private const LINEA_BASE_INICIAL = ["nombre" => "inicial", "tabla" => "linea_base"];
    private const LINEA_BASE_FINAL = ["nombre" => "final", "tabla" => "linea_base_final"];
    private const TIPOS_LINEA_BASE = [self::LINEA_BASE_INICIAL, self::LINEA_BASE_FINAL];
    private const LISTAR_EMPRENDEDOR_LINEA_BASE = "SELECT * FROM listar_emprendedor_con_linea_base";
    private const BUSCAR_CP = "CALL buscar_codigo_postal(?)";
    private const BUSCAR_PARROQUIA = "CALL buscar_comunidad_parroquial(?)";
    private const EXISTE_LINEA_BASE = "SELECT EXISTS(SELECT * FROM TIPO_LINEA_BASE WHERE id_usuario = ?) existe_linea_base";
    private const GUARDAR_LINEA_BASE = "CALL guardar_linea_base(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    private const GUARDAR_LINEA_BASE_FINAL = "CALL guardar_linea_base_final(?, ?, ?, ?, ?, ?, ?, ?)";
    private const CONSULTAR_LINEA_BASE = "SELECT * FROM recuperar_linea_base WHERE idUsuario = ?";
    private const CONSULTAR_LINEA_BASE_FINAL = "SELECT * FROM recuperar_linea_base_final WHERE idUsuario = ?";
    private const CONSULTAR_LISTA_MEDIO_CONOCIMIENTO = "SELECT * FROM recuperar_linea_base_lista_medio_conocimiento WHERE idLineaBase = ?";
    private const CONSULTAR_LISTA_EMPLEO_GANANCIAS = "SELECT * FROM recuperar_linea_base_lista_empleo_ganancias WHERE idLineaBase = ?";
    private const CONSULTAR_LISTA_EMPLEO_GANANCIAS_FINAL = "SELECT * FROM recuperar_linea_base_lista_empleo_ganancias WHERE idLineaBase = ?";
    private const CONSULTAR_LISTA_ESTRATEGIAS_VENTAS = "SELECT * FROM recuperar_linea_base_final_lista_estrategias_incrementar_ventas WHERE idLineaBase = ?";
    private const CONSULTAR_LISTA_ESTRATEGIAS_VENTAS_FINAL = "SELECT * FROM recuperar_linea_base_final_lista_estrategias_incrementar_ventas WHERE idLineaBase = ?";
    private const LISTAR_OBJETIVOS_AHORRO = "SELECT * FROM recuperar_linea_base_lista_objetivos_ahorro WHERE id_linea_base = ?";
    private const LISTAR_OBJETIVOS_AHORRO_FINAL = "SELECT * FROM recuperar_linea_base_final_lista_objetivos_ahorro WHERE id_linea_base = ?";

    public function listarEmprendedoresLineaBase() {
        $rs = $this->ejecutarInstruccion(self::LISTAR_EMPRENDEDOR_LINEA_BASE);
        return $rs ? $rs->fetch_all(MYSQLI_ASSOC) : [];
    }

    public function buscarCodigoPostal($cp) {
        $prep = $this->prepararInstruccion(self::BUSCAR_CP);
        $prep->agregarString($cp);
        return $prep->ejecutarConsultaMultiple();
    }

    public function buscarParroquia($parroquia) {
        $prep = $this->prepararInstruccion(self::BUSCAR_PARROQUIA);
        $prep->agregarString($parroquia);
        return $prep->ejecutarConsultaMultiple();
    }

    public function guardarLineaBase(LineaBase $lineaBase) {
        $prep = $this->prepararInstruccion(self::GUARDAR_LINEA_BASE);
        $prep->agregarInt($lineaBase->getIdUsuario());
        $prep->agregarInt($lineaBase->getIdEtapa());
        $prep->agregarString(Util::obtenerFechaActual());
        $prep->agregarEntidad($lineaBase->getPreliminar());
        $prep->agregarEntidad($lineaBase->getIdentificacion());
        $prep->agregarEntidad($lineaBase->getDomicilio());
        $prep->agregarEntidad($lineaBase->getSocioeconomico());
        $prep->agregarEntidad($lineaBase->getNegocio());
        $prep->agregarEntidad($lineaBase->getAnalisisNegocio());
        $prep->agregarEntidad($lineaBase->getAdministracionIngresos());
        // var_dump($prep);
        return $prep->ejecutar();
    }

    public function guardarLineaBaseFinal(LineaBaseFinal $lineaBase) {
        //var_dump($lineaBase);
        $prep = $this->prepararInstruccion(self::GUARDAR_LINEA_BASE_FINAL);
        $prep->agregarInt($lineaBase->getIdLineaBaseInicial());
        $prep->agregarInt($lineaBase->getIdUsuario());
        $prep->agregarString($lineaBase->getFechaCreacion());
        $prep->agregarEntidad($lineaBase->getPreliminar());
        $prep->agregarEntidad($lineaBase->getSocioeconomico());
        $prep->agregarEntidad($lineaBase->getNegocio());
        $prep->agregarEntidad($lineaBase->getAnalisisNegocio());
        $prep->agregarEntidad($lineaBase->getAdministracionIngresos());
        $e = $prep->ejecutar();
        var_dump($this->getError());
        return $e;
    }

    public function getLineaBase($usuario) {
        $lineasBase = [];
        foreach (self::TIPOS_LINEA_BASE as $tipoLineaBase) {
            $existeLineaBase = $this->existeLineaBase($usuario, $tipoLineaBase["tabla"]);
            $lineasBase[$tipoLineaBase["nombre"]] = [
                "existeLineaBase" => $existeLineaBase,
                "data" => $existeLineaBase ? $this->agruparLineaBase($this->recuperarLineaBase($usuario, $tipoLineaBase)) : []
            ];
        }
        return $lineasBase;
    }

    private function existeLineaBase($idUsuario, $tipoLineaBase): bool {
        $sql = str_replace("TIPO_LINEA_BASE", $tipoLineaBase, self::EXISTE_LINEA_BASE);
        $prep = $this->prepararInstruccion($sql);
        $prep->agregarInt($idUsuario);
        return $prep->ejecutarConsulta()["existe_linea_base"];
    }
    
    private function recuperarLineaBase($usuario, $tipoLineaBase) {
        switch ($tipoLineaBase["nombre"]) {
            case self::LINEA_BASE_INICIAL["nombre"]:
                return $this->consultarLineaBase($usuario);
            case self::LINEA_BASE_FINAL["nombre"]:
                return $this->consultarLineaBaseFinal($usuario);
        }
    }

    private function consultarLineaBase($idUsuario) {
        $lb = $this->selectPorId(self::CONSULTAR_LINEA_BASE, $idUsuario);
        $id = $lb["idLineaBase"];
        $lb["listaMedioConoceFundacion"] = $this->selectAllPorId(self::CONSULTAR_LISTA_MEDIO_CONOCIMIENTO, $id);
        $lb["listaEmpleoGanancias"] = $this->selectAllPorId(self::CONSULTAR_LISTA_EMPLEO_GANANCIAS, $id);
        $lb["listaEstrategiaVentas"] = $this->selectAllPorId(self::CONSULTAR_LISTA_ESTRATEGIAS_VENTAS, $id);
        $lb["objetivosAhorro"] = $this->selectAllPorId(self::LISTAR_OBJETIVOS_AHORRO, $id);
        return $lb;
    }

    private function consultarLineaBaseFinal($idUsuario) {
        $lb = $this->selectPorId(self::CONSULTAR_LINEA_BASE_FINAL, $idUsuario);
        $id = $lb["idLineaBaseFinal"];
        $lb["listaEmpleoGanancias"] = $this->selectAllPorId(self::CONSULTAR_LISTA_EMPLEO_GANANCIAS_FINAL, $id);
        $lb["listaEstrategiaVentas"] = $this->selectAllPorId(self::CONSULTAR_LISTA_ESTRATEGIAS_VENTAS_FINAL, $id);
        $lb["objetivosAhorro"] = $this->selectAllPorId(self::LISTAR_OBJETIVOS_AHORRO_FINAL, $id);
        return $lb;
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
            'listaMedioConoceFundacion' => $result['listaMedioConoceFundacion'] ?? "",
            'otroMedioConoceFundacion' => $result['otroMedioConoceFundacion'] ?? "",
            'otraRazonRecurreFundacion' => $result['otraRazonRecurreFundacion'] ?? "",
            'razonRecurreFundacion' => [
                'id' => $result['idRazonRecurreFundacion'] ?? "",
                'descripcion' => $result['razonRecurreDescripcion'] ?? ""
            ],
            'solicitaCredito' => [
                'id' => $result['idSolicitaCredito'] ?? "",
                'descripcion' => $result['solicitaCreditoDescripcion'] ?? 0 ? "El crédito lo solicitaría para " . $result['solicitaCreditoDescripcion'] : null
            ],
            'utilizaCredito' => [
                'id' => $result['idUtilizaCredito'] ?? "",
                'descripcion' => $result['utilizaCreditoDescripcion'] ?? 0 ? "El crédito lo utilizaría para " . $result['utilizaCreditoDescripcion'] : null
            ],
            'tiempoDedicaCapacitacion' => [
                'id' => $result['idTiempoDedicaCapacitacion'] ?? "",
                'descripcion' => $result['tiempoDedicaCapacitacionDescripcion'] ?? ""
            ]
        ];

        $lineaBase['identificacion'] = [
            'genero' => $result['genero'] ?? "",
            'edad' => $result['edad'] ?? "",
            'estadoCivil' => [
                'id' => $result['estadoCivil'] ?? "",
                'descripcion' => $result['estadoCivilDescripcion'] ?? ""
            ],
            'escolaridad' => [
                'id' => $result['escolaridad'] ?? "",
                'descripcion' => $result['escolaridadDescripcion'] ?? ""
            ],
            'discapacidad' => $result['discapacidad'] ?? 'No'
        ];

        $lineaBase['domicilio'] = [
            'calle' => $result['domicilioCalle'] ?? "",
            'calleCruce1' => $result['domicilioCalleCruce1'] ?? "",
            'calleCruce2' => $result['domicilioCalleCruce2'] ?? "",
            'numeroExterior' => $result['domicilioNumeroExterior'] ?? "",
            'numeroInterior' => $result['domicilioNumeroInterior'] ?? 0 ? "(" . $result['domicilioNumeroInterior'] . ")" : null,
            'codigoPostal' => [
                'id' => $result['domicilioIdCodigoPostal'] ?? "",
                'codigo' => $result['domicilioCodigoPostal'] ?? "",
                'colonia' => $result['domicilioColonia'] ?? ""
            ],
            "colonia" => $result["colonia"] ?? "",
            'municipio' => [
                'id' => $result['domicilioIdMunicipio'] ?? "",
                'nombre' => $result['domicilioMunicipioNombre'] ?? ""
            ],
            'estado' => $result['domicilioEstadoNombre'] ?? "",
            'comunidadParroquial' => [
                'id' => $result['domicilioIdComunidadParroquial'] ?? "",
                'nombre' => $result['domicilioComunidadParroquialNombre'] ?? "",
                'decanato' => $result['domicilioDecanatoNombre'] ?? "",
                'vicaria' => $result['domicilioVicariaNombre'] ?? ""
            ]
        ];

        $lineaBase['socioeconomico'] = [
            'cantidadDependientes' => $result['cantidadDependientes'] ?? 0,
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
                'cantEmpleados' => ["descripcion" => $result['negocioCantEmpleados'] . " empleado" . (intval($result['negocioCantEmpleados']) > 1 ? "s" : ""), "num" => $result['negocioCantEmpleados']],
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
                'registraEntradaSalida' => $this->getArrayBool($result['negocioRegistraEntradaSalida']),
                'asignaSueldo' => $this->getArrayBool($result['negocioAsignaSueldo']),
                'conoceUtilidades' => $this->getArrayBool($result['negocioConoceUtilidades']),
                'competencia' => [
                    'identifica' => $this->getArrayBool($result['negocioIdentificaCompetencia']),
                    "quien" => boolval($result['negocioIdentificaCompetencia']) ? $result['negocioQuienCompetencia'] : "No identificada"
                ],
                'clientesNegocio' => $result['negocioClientes'],
                'ventajasNegocio' => $result['negocioVentajas'],
                'conoceProductosMayorUtilidad' => [
                    "conoce" => $this->getArrayBool($result['negocioConoceProductosMayorUtilidad']),
                    "porcentaje" => $result['negocioConoceProductosMayorUtilidad'] ? $result['negocioPorcentajeGanancias'] : "No identifica productos con mayor utilidad",
                ],
                'ahorro' => [
                    "asigna" => $this->getArrayBool($result['negocioLlevaAhorro']),
                    "detalles" => (boolval($result['negocioLlevaAhorro']) ? $result['negocioCuantoAhorro'] : $result['negocioRazonesNoAhorro'])
                ],
                'conocePuntoEquilibrio' => $this->getArrayBool($result['negocioConocePuntoEquilibrio']),
                'separaGastos' => $this->getArrayBool($result['negocioSeparaGastos']),
                'elaboraPresupuesto' => $this->getArrayBool($result['negocioElaboraPresupuesto']),
                "listaEmpleoGanancias" => $result["listaEmpleoGanancias"],
                "listaEstrategiaVentas" => $result["listaEstrategiaVentas"]
            ];
            $lineaBase['administracionIngresos'] = [
                'sueldoMensual' => $result['sueldoMensual'],
                'montoMensualVentas' => $result['montoMensualVentas'],
                'montoMensualEgresos' => $result['montoMensualEgresos'],
                'montoMensualUtilidades' => $result['montoMensualUtilidades'],
                'esNegocioPrincipalFuentePersonal' => $this->getArrayBool($result['esNegocioPrincipalFuentePersonal']),
                'esNegocioPrincipalFuenteFamiliar' => $this->getArrayBool($result['esNegocioPrincipalFuenteFamiliar']),
                'habitoAhorro' => $this->getArrayBool($result['habitoAhorro']),
                'sistemaAhorro' => [
                    "cuenta" => $this->getArrayBool($result['cuentaSistemaAhorro']),
                    'detalle' => $result['detalleSistemaAhorro']
                ],
                'montoAhorroMensual' => $result['montoAhorroMensual'],
                "objetivosAhorro" => $result["objetivosAhorro"]
            ];
        }
        return $lineaBase;
    }

    private function getArrayBool($res) {
        return [
            "res" => Util::respuestaBoolToStr($res),
            "val" => $res
        ];
    }
}
