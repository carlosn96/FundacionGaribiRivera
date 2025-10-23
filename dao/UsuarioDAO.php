<?php

class UsuarioDAO extends DAO
{

    private const NOMBRE_TABLA = "usuario";
    private const BUSCAR_USUARIO_CORREO = "SELECT * FROM " . self::NOMBRE_TABLA . " WHERE correo_electronico = ?";
    private const BUSCAR_USUARIO_ID = "SELECT * FROM " . self::NOMBRE_TABLA . " WHERE id = ?";
    private const ACTUALIZAR_CONTRASENA = "UPDATE " . self::NOMBRE_TABLA . " SET contrasena = ? WHERE correo_electronico = ?";
    private const INSERTAR_USUARIO = "INSERT INTO " . self::NOMBRE_TABLA . " "
        . "(nombre, apellidos, correo_electronico, numero_celular, contrasena, tipo_usuario, fotografia) VALUES (?, ?, ?, ?, ?, ?, ?)";
    private const ACTUALIZAR_FOTO_PERFIL = "UPDATE " . self::NOMBRE_TABLA . " SET fotografia = ? WHERE id = ?";
    private const LISTAR_ASISTENTES = "SELECT * FROM listar_asistentes WHERE id <> ?";

    private const CREAR_USUARIO_ASISTENTE = "CALL crear_usuario_asistente(?, ?, ?, ?, ?, ?, ?)";

    private const ACTUALIZAR_PERMISOS_USUARIO_ASISTENTE = "CALL actualizar_permisos_usuario_asistente(?, ?)";

    private function consultarUsuarioCorreo($correo)
    {
        $prep = $this->prepararInstruccion(self::BUSCAR_USUARIO_CORREO);
        $prep->agregarString($correo);
        if (($consulta = $prep->ejecutarConsulta())) {
            $consulta["fotografia"] = base64_encode($consulta["fotografia"]);
            $consulta["tipo_usuario"] = TipoUsuario::get($consulta["tipo_usuario"]);
        }
        return $consulta;
    }

    public function existeCorreo($correo)
    {
        $consulta = $this->consultarUsuarioCorreo($correo);
        return count($consulta) > 0;
    }

    public function buscarUsuarioPorCorreo($correo)
    {
        $result = $this->consultarUsuarioCorreo($correo);
        return count($result) > 0 ? $result : false;
    }

    public function buscarUsuarioPorID($id)
    {
        if (($consulta = $this->selectPorId(self::BUSCAR_USUARIO_ID, $id))) {
            $consulta["fotografia"] = base64_encode($consulta["fotografia"]);
            $consulta["tipo_usuario"] = TipoUsuario::get($consulta["tipo_usuario"]);
        }
        return $consulta;
    }

    public function cambiarContrasena($correo, $contrasena)
    {
        $stmt = $this->prepararInstruccion(self::ACTUALIZAR_CONTRASENA);
        $stmt->agregarString($contrasena);
        $stmt->agregarString($correo);
        return $stmt->ejecutar();
    }

    public function insertarUsuario(
        $nombre,
        $apellidos,
        $correo,
        $numero_celular,
        $contrasena,
        $id_tipo_usuario,
        $fotografia
    ) {
        $stmt = $this->prepararInstruccion(self::INSERTAR_USUARIO);
        $stmt->agregarString($nombre);
        $stmt->agregarString($apellidos);
        $stmt->agregarString($correo);
        $stmt->agregarString($numero_celular);
        $stmt->agregarString($contrasena);
        $stmt->agregarInt($id_tipo_usuario);
        $stmt->agregarBlob($fotografia);
        if ($stmt->ejecutar()) {
            return $this->obtenerIdAutogenerado();
        } else {
            return 0;
        }
    }

    public function actualizarFotoPerfil($usuario, $foto)
    {
        $args = $this->prepararInstruccion(self::ACTUALIZAR_FOTO_PERFIL);
        $args->agregarBlob($foto);
        $args->agregarInt($usuario["id"]);
        return $args->ejecutar();
    }

    public function actualizarInfoPersonal($data, $idUsuario)
    {
        $sql = "UPDATE " . self::NOMBRE_TABLA . " SET ";
        $sets = [];
        foreach ($data as $key => $val) {
            $sets[] = "$key = '$val'";
        }
        $sql .= implode(", ", $sets);
        $sql .= " WHERE id = $idUsuario";
        return $this->ejecutarInstruccion($sql);
    }

    public function listarAsistentes($idActual)
    {
        return $this->selectAllPorId(self::LISTAR_ASISTENTES, $idActual);
    }

    public function getPermisosUsuarios()
    {
        return $this->selectPorCamposEspecificos("*", "usuario_lista_permisos", "", true);
    }


    public function crearUsuarioAsistente(
        $nombre,
        $apellidos,
        $correo,
        $telefono,
        $contrasena,
        $permisos,
        $fotografia
    ) {
        $prep = $this->prepararInstruccion(self::CREAR_USUARIO_ASISTENTE);
        $prep->agregarString($nombre);
        $prep->agregarString($apellidos);
        $prep->agregarString($correo);
        $prep->agregarString($telefono);
        $prep->agregarString($contrasena);
        $prep->agregarJSON($permisos);
        $prep->agregarBlob($fotografia);
        return $prep->ejecutar();
    }

    public function eliminarUsuario($idUsuario)
    {
        return $this->eliminarPorId(self::NOMBRE_TABLA, "id", $idUsuario);
    }

    public function actualizarPermisosUsuarioAsistente($permisos, $id)
    {
        $prep = $this->prepararInstruccion(self::ACTUALIZAR_PERMISOS_USUARIO_ASISTENTE);
        $prep->agregarJSON($permisos);
        $prep->agregarInt($id);
        return $prep->ejecutar();
    }

}
