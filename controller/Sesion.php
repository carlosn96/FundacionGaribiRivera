<?php

class Sesion {

    public static function setUsuarioActual($usuario) {
        $_SESSION["usuario"] = $usuario;
    }

    public static function iniciarSesionNueva($usuario) {
        // Generar un token único
        self::setToken(bin2hex(random_bytes(16))); // Genera un token de 32 caracteres hexadecimal
        self::setUsuarioActual($usuario);
    }

    public static function setToken($token) {
        // Almacenar el token y el tiempo de expiración en la sesión del usuario
        $_SESSION['token']["code"] = $token;
        // Establecer el tiempo de expiración (20 minutos en el futuro)
        date_default_timezone_set('America/Mexico_City');
        $_SESSION['token']['tiempoExpiracion'] = date(strtotime('+20 minute'));
    }

    public static function getToken() {
        return $_SESSION['token'] ?? null;
    }

    public static function cerrar() {
        unset($_SESSION);
        session_destroy();
    }

    public static function esActiva(): bool {
        $token = self::getToken();
        if (($esActiva = isset($token))) {
            if ($token["tiempoExpiracion"] < time()) {
                self::cerrar();
                return false;
            }
        }
        return $esActiva;
    }

    public static function obtenerUsuarioActual() {
        return $_SESSION["usuario"] ?? null;
    }

    public static function obtenerIDUsuarioActual() {
        return self::obtenerUsuarioActual()["id"] ?? 0;
    }

    public static function esCodigoRestablecerContraseniaCorrecto($codigo): bool {
        return self::getCodigoRestablecerContrasenia() === $codigo;
    }

    public static function setCodigoRestablecerContrasenia() {
        $codigo = Util::getCodigoValidacionCuenta();
        $_SESSION["codigo_recuperacion"] = $codigo;
        return $codigo;
    }

    public static function getCodigoRestablecerContrasenia() {
        return $_SESSION["codigo_recuperacion"];
    }

    public function actualizar($usuario) {
        self::setUsuarioActual($usuario);
    }

    /*private static function verificarURLSesion($usuario) {
        switch (is_null($usuario) ? "" : $usuario["id_tipo_usuario"]) {
            case TipoUsuario::EMPRENDEDOR:
                $url = self::EMPRENDEDOR;
                break;
            case TipoUsuario::ADMINISTRADOR:
                $url = self::ADMINISTRACION;
                break;
            default:
                $url = "";
        }
        return $url;
    }*/

    public static function info(): array {
        $info["usuario"] = ($usuario = self::obtenerUsuarioActual());
        //$info["url"] = self::verificarURLSesion($usuario);
        return $info;
    }

}
