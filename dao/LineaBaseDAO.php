<?php

class LineaBaseDAO extends DAO {

    private const LISTAR_EMPRENDEDOR_LINEA_BASE = "SELECT * FROM listar_emprendedor_con_linea_base";
    private const BUSCAR_CP = "CALL buscar_codigo_postal(?)";
    private const BUSCAR_PARROQUIA = "CALL buscar_comunidad_parroquial(?)";
    private const EXISTE_LINEA_BASE = "SELECT EXISTS(SELECT * FROM linea_base "
            . "WHERE id_usuario = ?) existe_linea_base";
    private const GUARDAR_LINEA_BASE = "CALL guardar_linea_base(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    private const GUARDAR_LINEA_BASE_FINAL = "CALL guardar_linea_base_final(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    private const CONSULTAR_LINEA_BASE = "SELECT * FROM recuperar_linea_base WHERE idUsuario = ?";
    private const CONSULTAR_LISTA_MEDIO_CONOCIMIENTO = "SELECT * FROM recuperar_linea_base_lista_medio_conocimiento WHERE idLineaBase = ?";
    private const CONSULTAR_LISTA_EMPLEO_GANANCIAS = "SELECT * FROM recuperar_linea_base_lista_empleo_ganancias WHERE idLineaBase = ?";
    private const CONSULTAR_LISTA_ESTRATEGIAS_VENTAS = "SELECT * FROM recuperar_linea_base_lista_estrategias_incrementar_ventas WHERE idLineaBase = ?";
    private const LISTAR_OBJETIVOS_AHORRO = "SELECT * FROM listar_objetivos_ahorro WHERE id_linea_base = ?";

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
        $e = $prep->ejecutar();
        return $e;
    }

    public function guardarLineaBaseFinal(LineaBaseFinal $lineaBase) {
        $prep = $this->prepararInstruccion(self::GUARDAR_LINEA_BASE_FINAL);
        $prep->agregarInt($lineaBase->getIdUsuario());
        $prep->agregarInt($lineaBase->getIdEtapa());
        $prep->agregarString(Util::obtenerFechaActual());
        $prep->agregarEntidad($lineaBase->getPreliminar());
        $prep->agregarEntidad($lineaBase->getSocioeconomico());
        $prep->agregarEntidad($lineaBase->getNegocio());
        $prep->agregarEntidad($lineaBase->getAnalisisNegocio());
        $prep->agregarEntidad($lineaBase->getAdministracionIngresos());
        return $prep->ejecutar();
    }

    public function consultarLineaBaseInicial($idUsuario) {
        $lb = $this->selectPorId(self::CONSULTAR_LINEA_BASE, $idUsuario);
        $id = $lb["idLineaBase"];
        $lb["listaMedioConoceFundacion"] = $this->selectAllPorId(self::CONSULTAR_LISTA_MEDIO_CONOCIMIENTO, $id);
        $lb["listaEmpleoGanancias"] = $this->selectAllPorId(self::CONSULTAR_LISTA_EMPLEO_GANANCIAS, $id);
        $lb["listaEstrategiaVentas"] = $this->selectAllPorId(self::CONSULTAR_LISTA_ESTRATEGIAS_VENTAS, $id);
        $lb["objetivosAhorro"] = $this->selectAllPorId(self::LISTAR_OBJETIVOS_AHORRO, $id);
        return $lb;
    }

    public function existeLineaBase($idUsuario): bool {
        $prep = $this->prepararInstruccion(self::EXISTE_LINEA_BASE);
        $prep->agregarInt($idUsuario);
        return $prep->ejecutarConsulta()["existe_linea_base"];
    }
}
