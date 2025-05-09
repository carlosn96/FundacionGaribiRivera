<?php

class Sesion {

    public static function controlarAccesoUbicacion($ubicacionActual) {
        if(self::esActiva()) {
            $usuario = self::obtenerUsuarioActual();
            $urlUsuario = $usuario["tipo_usuario"]["url"];
            $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https" : "http";
            $serverName = $_SERVER['SERVER_NAME'];
            $redirigir = "{$protocol}://{$serverName}/";
            if (strpos($serverName, 'localhost') !== false || $serverName === '127.0.0.1') {
                $rootPath = explode('/', trim($_SERVER['REQUEST_URI'], '/'))[0] ?? '';
                $redirigir .= "{$rootPath}";
            }
            if ($ubicacionActual !== $urlUsuario) {
                Util::redirigir($redirigir . "/public/" . $urlUsuario);
            }
        }
    }

    public static function setUsuarioActual($usuario) {
        $_SESSION["usuario"] = $usuario;
    }

    public static function iniciarSesionNueva($usuario) {
        self::setToken(bin2hex(random_bytes(16))); // Genera un token de 32 caracteres hexadecimal
        self::setUsuarioActual($usuario);
    }

    public static function setToken($token) {
        // Almacenar el token y el tiempo de expiración en la sesión del usuario
        $_SESSION['token']["code"] = $token;
        // Establecer el tiempo de expiración (20 minutos en el futuro)
        date_default_timezone_set('America/Mexico_City');
        $_SESSION['token']['tiempoExpiracion'] = date(strtotime('+35 minute'));
    }

    public static function getToken() {
        return isset($_SESSION) ? $_SESSION['token'] ?? null : null;
    }

    public static function cerrar() {
        $_SESSION = [];
        //session_destroy();
    }

    public static function esActiva(): bool {
        /* $token = self::getToken();
          if (!isset($token) || $token["tiempoExpiracion"] < time()) {
          self::cerrar();
          return false; // El token ha expirado, la sesión no está activa
          }
          return true; */
        return self::obtenerUsuarioActual() !== null;
    }

    public static function obtenerUsuarioActual() {
        return isset($_SESSION) ? $_SESSION["usuario"] ?? null : null;
    }

    public static function setInfoTemporal($key, $val) {
        $_SESSION[$key] = $val;
    }

    public static function getInfoTemporal($key) {
        return $_SESSION[$key] ?? [];
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
}
