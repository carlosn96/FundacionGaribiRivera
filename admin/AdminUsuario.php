<?php

class AdminUsuario extends Admin {

    public function __construct() {
        parent::__construct(new UsuarioDAO());
    }

    public function existeCorreo($correo) {
        return $this->dao->existeCorreo($correo);
    }

    public function buscarUsuarioPorCorreo($correo) {
        return $this->dao->buscarUsuarioPorCorreo($correo);
    }

    public function insertarUsuario($nombre, $apellidos, $correo, $numero_celular, $contrasena, $id_tipo_usuario) {
        $fotografia = file_get_contents(Util::obtenerFotografiaRand());
        return $this->dao->insertarUsuario($nombre, $apellidos, $correo, $numero_celular,
                        Util::encriptarContrasenia($contrasena), $id_tipo_usuario, $fotografia);
    }

    public function cambiarContrasena($correo, $contrasena) {
        return $this->dao->cambiarContrasena($correo, Util::encriptarContrasenia($contrasena));
    }

    public function actualizarFotoPerfil($usuario, $correo) {
        try {
            return $this->dao->actualizarFotoPerfil($usuario, $correo);
        } catch (mysqli_sql_exception $e) {
            return false;
        }
    }

    public function actualizarInfoPersonal($data, $usuario) {
        return $this->dao->actualizarInfoPersonal($data, $usuario);
    }

    public function listarEmprendedores() {
        return $this->dao->listarEmprendedores();
    }

}