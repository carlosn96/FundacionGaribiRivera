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

    public function buscarUsuarioPorID($id) {
        return $this->dao->buscarUsuarioPorID($id);
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

    public function listarAsistentes($idActual) {
        $lista = [];
        foreach ($this->dao->listarAsistentes($idActual) as &$row) {
            $row["fotografia"] = Util::binToBase64($row["fotografia"]);
            $lista[] = /*$this->construirAsistente($row);*/ $row;
        }
        return $lista;
    }

    private function construirAsistente($form) {
        $nombre_completo = $form["nombre"] ." ". $form["apellidos"];
        $telefono = $form["numero_celular"];
        $contrasenia = "";
        $tipo_usuario = TipoUsuario::get($form["tipo_usuario"])["rol"];
        $esVerificado = true;
        $id = $form["id"];
        $usuario = new Usuario($nombre_completo, $telefono, $contrasenia,
                $tipo_usuario, $esVerificado, $id);
        $usuario->set_fotografia(Util::binToBase64($form["fotografia"]));
        return $usuario->to_array();
    }
}
