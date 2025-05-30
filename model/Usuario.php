<?php

class Usuario {

    private $nombre_completo;
    private $telefono;
    private $contrasenia;
    private $tipo_usuario;
    private $es_verificado;
    private $id_usuario;
    private $fotografia;

    public function __construct($nombre_completo, $telefono, $contrasenia, 
            $tipo_usuario, $es_verificado = false, $id_usuario = 0) {
        $this->nombre_completo = $nombre_completo;
        $this->telefono = $telefono;
        $this->contrasenia = $contrasenia;
        $this->tipo_usuario = $tipo_usuario;
        $this->es_verificado = $es_verificado;
        $this->id_usuario = $id_usuario;
    }

    public function get_fotografia() {
        return $this->fotografia;
    }

    public function set_fotografia($fotografia) {
        $this->fotografia = $fotografia;
    }

    public function get_nombre_completo() {
        return $this->nombre_completo;
    }

    public function get_telefono() {
        return $this->telefono;
    }

    public function get_contrasenia() {
        return $this->contrasenia;
    }

    public function get_tipo_usuario() {
        return $this->tipo_usuario;
    }

    public function get_es_verificado() {
        return $this->es_verificado;
    }

    public function get_id_usuario() {
        return $this->id_usuario;
    }

    public function set_nombre_completo($nombre_completo): void {
        $this->nombre_completo = $nombre_completo;
    }

    public function set_telefono($telefono): void {
        $this->telefono = $telefono;
    }

    public function set_contrasenia($contrasenia): void {
        $this->contrasenia = $contrasenia;
    }

    public function set_tipo_usuario($tipo_usuario): void {
        $this->tipo_usuario = $tipo_usuario;
    }

    public function set_es_verificado($es_verificado): void {
        $this->es_verificado = $es_verificado;
    }

    public function set_id_usuario($id_usuario): void {
        $this->id_usuario = $id_usuario;
    }

    public function to_array() {
        return get_object_vars($this);
    }
}
