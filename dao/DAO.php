<?php

abstract class DAO {

    private $conexion;

    function __construct() {
        $this->conexion = new Conexion();
    }

    function getConexion(): Conexion {
        return $this->conexion;
    }

    private function abrirConexion() {
        //$this->conexion->crearConexion();
    }

    protected function cerrarConexion() {
        $this->conexion->cerrarConexion();
    }

    protected function ejecutarInstruccion($instruccion) {
        //$this->abrirConexion();
        $resultado = $this->conexion->ejecutarInstruccion($instruccion);
        return $resultado;
    }

    /**
     * Regresa una tupla buscando por ID
     *
     * @param string $instruccion Sentencia SQL a ejecutar para extraer la tupla
     * @param int $idRegistro El id (primary key) de la tupla a extraer
     * @return El resultado de fetch_assoc
     * @see fetch_assoc()
     */
    protected function selectPorId($instruccion, $idRegistro) {
        $stat = $this->prepararInstruccion($instruccion);
        $stat->agregarInt($idRegistro);
        return $stat->ejecutarConsulta();
    }

    /**
     * Regresa un conjunto de tuplas buscando por ID o por una columna de tipo INT
     *
     * @param string $instruccion Sentencia SQL a ejecutar para extraer las tuplas
     * @param int $idRegistro La columna de tipo INT de la tupla a extraer
     * @return El resultado de fetch_all(MYSQLI_ASSOC)
     * @see fetch_all()
     */
    protected function selectAllPorId($instruccion, $idRegistro) {
        $stat = $this->prepararInstruccion($instruccion);
        $stat->agregarInt($idRegistro);
        return $stat->ejecutarConsultaMultiple();
    }

    public function selectPorCamposEspecificos($seleccion, $tabla, $where, $fetchassoc = false) {
        $result = $this->ejecutarInstruccion("SELECT " . $seleccion . " FROM " . $tabla . " " . $where);
        if ($result) {
            return $fetchassoc ? $result->fetch_all(MYSQLI_ASSOC) : $result->fetch_all();
        } else {
            return array();
        }
    }

    /**
     * 
     * @param string $tabla nombre de la tabla a buscar
     * @param string $campoBusqueda de la forma: nombre_campo = cadena_busqueda
     */
    protected function verificarCampoExistente($tabla, $campoBusqueda) {
        return $this->recuperarCountAll($tabla, $campoBusqueda);
    }

    protected function eliminarPorId($tabla, $columna, $id) {
        $instruccionDelete = "DELETE FROM " . $tabla . " WHERE " . $columna . " = ?";
        $pre = $this->prepararInstruccion($instruccionDelete);
        $pre->agregarInt($id);
        return $pre->ejecutar();
    }

    /* protected function actualizarPorId($tabla, $columna, $idUpdate, $args) {
      $instruccion = "UPDATE " . $tabla . " SET " . $columna . " = ? WHERE $idUpdate = ?";
      return $this->ejecutarInstruccionPreparada($instruccion, $args);
      // return $$this->ejecutarInstruccion($instruccion);
      } */

    protected function prepararInstruccion($instruccion): InstruccionPreparada {
        //$this->abrirConexion();
        return new InstruccionPreparada($this->conexion->prepararInstruccion($instruccion));
    }

    protected function obtenerIdAutogenerado() {
        return $this->conexion->obtenerIdAutogenerado();
    }

    protected function obtenerUltimoInsertado($id, $tabla) {
        return $this->ejecutarInstruccion("SELECT MAX($id) FROM $tabla")->fetch_row()[0];
    }

    protected function extraerIdTupla($nombreID, $campoBusqueda, $valorCampoBusqueda, $tabla) {
        $resultado = $this->ejecutarInstruccion("SELECT $nombreID FROM $tabla WHERE $campoBusqueda = '$valorCampoBusqueda'");
        $fila = $resultado->fetch_assoc();
        if ($fila !== null && isset($fila[$nombreID])) {
            return $fila[$nombreID];
        } else {
            return null;
        }
    }

    protected function recuperarCountAll($tabla, $where = null) {
        $sql = "SELECT COUNT(*) FROM $tabla " . ( empty($where) ? "" : " WHERE $where");
        $res = $this->ejecutarInstruccion($sql);
        return $res->fetch_array()[0];
    }

    protected function getError() {
        return $this->conexion->errorInfo();
    }
}
