<?php

class Conexion {

    private const SERVIDOR = DB_HOST;
    private const USUARIO = DB_USERNAME;
    private const CONTRASENIA = DB_PASSWORD;
    private const BD = DB_DATABASE;

    private $conexion;

    public function __construct() {
        $this->crearConexion();
    }

    private function crearConexion($servidor = self::SERVIDOR, $usuario = self::USUARIO, $contrasenia = self::CONTRASENIA, $bd = self::BD) {
        $this->cerrarConexion();
        $conexion = new mysqli($servidor, $usuario, $contrasenia, $bd);
        if ($conexion->connect_errno) {
            die("Connection failed: " . $conexion->connect_error);
            exit();
        } else {
            $conexion->set_charset("utf8");
        }
        $this->conexion = $conexion;
    }

    public function cerrarConexion() {
        if ($this->conexion !== null) {
            $this->conexion->close();
            $this->conexion = null;
        }
    }

    public function ejecutarInstruccion($instruccion) {
        return $this->conexion->query($instruccion);
    }

    public function prepararInstruccion($instruccion) {
        $prep = $this->conexion->prepare($instruccion);
        return $prep;
    }

    public function errorInfo() {
        return $this->conexion->error;
    }

    public function obtenerIdAutogenerado() {
        return $this->conexion->insert_id;
    }

}
