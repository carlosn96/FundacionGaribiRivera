<?php

class LineaBaseDAO extends DAO {

    private const LINEA_BASE_INICIAL = ["nombre" => "inicial", "tabla" => "linea_base"];
    private const LINEA_BASE_FINAL = ["nombre" => "final", "tabla" => "linea_base_final"];
    private const TIPOS_LINEA_BASE = [self::LINEA_BASE_INICIAL, self::LINEA_BASE_FINAL];
    private const LISTAR_EMPRENDEDOR_LINEA_BASE = "SELECT * FROM listar_emprendedor_con_linea_base";
    private const LISTAR_EMPRENDEDOR_SIN_LINEA_BASE = "SELECT * FROM listar_emprendedor_sin_linea_base";
    private const LISTAR_EMPRENDEDOR_LINEA_BASE_INICIAL_FINAL = "SELECT * FROM listar_emprendedor_con_linea_base_inicial_final";
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
    private const CONSULTAR_LISTA_ESTRATEGIAS_VENTAS = "SELECT * FROM recuperar_linea_base_lista_estrategias_incrementar_ventas WHERE idLineaBase = ?";
    private const CONSULTAR_LISTA_ESTRATEGIAS_VENTAS_FINAL = "SELECT * FROM recuperar_linea_base_final_lista_estrategias_incrementar_ventas WHERE idLineaBase = ?";
    private const LISTAR_OBJETIVOS_AHORRO = "SELECT * FROM recuperar_linea_base_lista_objetivos_ahorro WHERE id_linea_base = ?";
    private const LISTAR_OBJETIVOS_AHORRO_FINAL = "SELECT * FROM recuperar_linea_base_final_lista_objetivos_ahorro WHERE id_linea_base = ?";

    public function listarEmprendedores($consulta, $params = []) {
        // Ejecuta la consulta y devuelve los resultados
        $rs = $this->ejecutarInstruccion($consulta, $params);
        return $rs ? $rs->fetch_all(MYSQLI_ASSOC) : [];
    }

    public function listarEmprendedoresLineaBase($etapa = null)
    {
        $where = "";
        if (is_array($etapa)) {
            if (count($etapa) > 0) {
                $ids = implode(",", array_map('intval', $etapa));
                $where = " WHERE idEtapa IN ($ids)";
            } else {
                // Si el array está vacío, no devolver ningún resultado.
                $where = " WHERE 1 = 0"; 
            }
        } else if (!is_null($etapa)) {
            // Para un solo ID de etapa. Ignoramos explícitamente '-' y '-1' aquí.
            // Asumimos que si no es un array y no es null, es un ID de etapa válido.
            $where = " WHERE idEtapa = " . intval($etapa);
        }
        // Si $etapa es null, $where permanece vacío, listando todos los emprendedores con línea base.
        return $this->listarEmprendedores(self::LISTAR_EMPRENDEDOR_LINEA_BASE . $where);
    }

    public function listarEmprendedoresSinLineaBase() {
        return $this->listarEmprendedores(self::LISTAR_EMPRENDEDOR_SIN_LINEA_BASE);
    }

    public function listarEmprendedoresLineaBaseInicialFinal() {
        return $this->listarEmprendedores(self::LISTAR_EMPRENDEDOR_LINEA_BASE_INICIAL_FINAL);
    }

    public function listarEmprendedoresParaImpactos($idUsuario) { //Se comentan las lineas sig para mejorar el filtro posteriormente
       /* $instruccion = "SELECT lista_registros_filtrados FROM linea_base_impacto_configuracion WHERE id_usuario = ?";
        $prep = $this->prepararInstruccion($instruccion);
        $prep->agregarInt($idUsuario);
        $idLineasBaseFiltrados = json_decode($prep->ejecutarConsulta()["lista_registros_filtrados"] ?? "") ?? [];*/
        $emprendedoresLineaBase = $this->listarEmprendedoresLineaBaseInicialFinal();
        foreach ($emprendedoresLineaBase as &$emprendedor) {
            $emprendedor['enLineaBase'] = true; /*empty($idLineasBaseFiltrados) || in_array($emprendedor['idLineaBase'], $idLineasBaseFiltrados);*/
        }
        return $emprendedoresLineaBase;
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
        //var_dump($this->getError());
        return $e;
    }

    public function getLineaBase($usuario) {
        $lineasBase = [];
        foreach (self::TIPOS_LINEA_BASE as $tipoLineaBase) {
            $existeLineaBase = $this->existeLineaBase($usuario, $tipoLineaBase["tabla"]);
            $lineasBase[$tipoLineaBase["nombre"]] = [
                "existeLineaBase" => $existeLineaBase,
                "data" => $existeLineaBase ? $this->agruparLineaBase($this->recuperarLineaBase($usuario, $tipoLineaBase), $tipoLineaBase["nombre"]) : []
            ];
        }
        return $lineasBase;
    }

    public function eliminarLineaBase($tipo, $usuario) {
        return $this->eliminarPorId("linea_base" . ($tipo === "final" ? "_$tipo" : ""), "id_usuario", $usuario);
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

    private function agruparLineaBase($result, $tipo) {
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

        if ($tipo === self::LINEA_BASE_INICIAL["nombre"]) {
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
                'numeroInterior' => $result['domicilioNumeroInterior'] ?? 0 ? $result['domicilioNumeroInterior'] : null,
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
        } else {
            $lineaBase['preliminar'] = [
                "huboBeneficiosPersonal" => $this->getArrayBool($result["huboBeneficioPersonal"]),
                "beneficios" => $result["beneficios"]
            ];
        }



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
                'numInterior' => ($result['negocioNumInterior'] === "null" && is_null($result['negocioNumInterior'])) ? "" : $result['negocioNumInterior'],
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
        return Util::getArrayBool($res);
    }

    public function actualizarEtapaEnLineaBase($idLineaBase, $idEtapa) {
        $prep = $this->prepararInstruccion("UPDATE linea_base SET id_etapa = ? WHERE id_linea_base = ?");
        $prep->agregarInt($idEtapa);
        $prep->agregarInt($idLineaBase);
        return $prep->ejecutar();
    }

    public function actualizarParametrosImpacto($params, $tipo, $idUsuario): bool {
        $tabla = "";
        foreach (self::TIPOS_LINEA_BASE as $tipoLineaBase) {
            if ($tipoLineaBase["nombre"] === $tipo) {
                $tabla = $tipoLineaBase["tabla"];
                break;
            }
        }
        $nombreIdLineaBase = "id_$tabla";
        $idLineaBase = $this->extraerIdTupla($nombreIdLineaBase, "id_usuario", $idUsuario, $tabla);
        foreach ($params as $columna => $valor) {
            switch ($columna) {
                case "id_rango_ingreso_mensual":
                    $tablaActualizar = $tabla . "_seccion_socioeconomico";
                    break;
                case 'monto_mensual_ventas':
                case 'monto_mensual_utilidades':
                case 'sueldo_mensual':
                case 'monto_ahorro_mensual':
                    $tablaActualizar = $tabla . "_seccion_administracion_ingresos";
                    break;
                default:
                    break;
            }
            if (!$this->ejecutarInstruccion("UPDATE $tablaActualizar SET $columna = $valor WHERE $nombreIdLineaBase = $idLineaBase")) {
                return false;
            } else {
                $fechaActual = Util::obtenerFechaActual("Y-m-d");
                $this->ejecutarInstruccion("UPDATE $tabla SET fecha_creacion = '$fechaActual' WHERE $nombreIdLineaBase = $idLineaBase");
            }
        }
        return true;
    }
}