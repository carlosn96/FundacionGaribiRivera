<?php

class Sesion
{

    public static function controlarAccesoUbicacion($ubicacionActual)
    {
        if (self::esActiva()) {
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
    public static function controlarPermisosAcceso($permisoOrigen)
    {
        if (self::esActiva()) {
            $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https" : "http";
            $serverName = $_SERVER['SERVER_NAME'];
            $redirigir = "{$protocol}://{$serverName}/";
            if (strpos($serverName, 'localhost') !== false || $serverName === '127.0.0.1') {
                $rootPath = explode('/', trim($_SERVER['REQUEST_URI'], '/'))[0] ?? '';
                $redirigir .= "{$rootPath}";
            }
            $usuario = self::obtenerUsuarioActual();
            if ($usuario["tipo_usuario"] !== 1 && (!isset($usuario["permisos"]) || !in_array($permisoOrigen, $usuario["permisos"]))) {
                //Util::redirigir($redirigir . "/public/" . $usuario["tipo_usuario"]["url"]);
                Util::redirigir($redirigir . "/public/accesoDenegado");
            }
        }
    }

    public static function controlarPermisosAccesoEmprendedor()
    {
        if (self::esActiva()) {
            $usuario = self::obtenerUsuarioActual();
            if ($usuario["tipo_usuario"] === 1) {


                $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https" : "http";
                $serverName = $_SERVER['SERVER_NAME'];
                $redirigir = "{$protocol}://{$serverName}/";
                if (strpos($serverName, 'localhost') !== false || $serverName === '127.0.0.1') {
                    $rootPath = explode('/', trim($_SERVER['REQUEST_URI'], '/'))[0] ?? '';
                    $redirigir .= "{$rootPath}";
                }
                Util::redirigir($redirigir . "/public/" . TipoUsuario::get(TipoUsuario::EMPRENDEDOR)["url"]);
            }
        }
    }

    public static function setUsuarioActual($usuario)
    {
        $_SESSION["usuario"] = $usuario;
    }

    public static function iniciarSesionNueva($usuario, bool $recordar = false)
    {
        self::setUsuarioActual($usuario);
        if ($recordar) {
            self::setToken($usuario);
        }
    }

    public static function setToken($usuario)
    {
        $token = bin2hex(random_bytes(32));
        $selector = bin2hex(random_bytes(9));

        // Detección automática del dominio
        $domain = $_SERVER['SERVER_NAME'];
        if ($domain === "localhost" || $domain === "127.0.0.1") {
            // Para localhost NO se debe poner dominio
            $domain = "";
        }

        setcookie(
            "remember",
            "{$selector}:{$token}",
            [
                'expires' => time() + (86400 * 5),
                'path' => '/',            // IMPORTANTE
                'domain' => $domain,        // IMPORTANTE
                'secure' => false,          // true solo si usas https
                'httponly' => true,
                'samesite' => 'Strict'
            ]
        );

        // Guardar token en archivo
        $hashed = hash('sha256', $token);
        $tokenPath = __DIR__ . "/remember_tokens/";
        if (!is_dir($tokenPath))
            mkdir($tokenPath, 0755, true);

        file_put_contents($tokenPath . "{$selector}.dat", $usuario["id"] . "|" . $hashed);
    }
    public static function intentarAutoLogin()
    {
        if (self::esActiva())
            return;
        if (!isset($_COOKIE["remember"]))
            return;

        $remember = $_COOKIE["remember"];
        if (empty($remember) || strpos($remember, ":") === false)
            return;

        list($selector, $token) = explode(":", $remember);
        if (empty($selector) || empty($token))
            return;

        $ruta = __DIR__ . "/remember_tokens/{$selector}.dat";
        if (!file_exists($ruta))
            return;

        list($idUsuario, $hashGuardado) = explode("|", file_get_contents($ruta));

        if (hash('sha256', $token) !== $hashGuardado)
            return;

        // TOKEN VÁLIDO → BORRAR ARCHIVO VIEJO
        @unlink($ruta);

        // Recuperar usuario
        $usuario = getAdminUsuario()->buscarUsuarioPorID($idUsuario);
        if ($usuario) {
            // Rotar token (generar uno nuevo)
            self::iniciarSesionNueva($usuario, true);
        }
    }


    public static function getToken()
    {
        return isset($_SESSION) ? $_SESSION['token'] ?? null : null;
    }

    public static function cerrar()
    {
        // borrar cookie remember
        if (isset($_COOKIE["remember"])) {
            $remember = $_COOKIE["remember"];
            if (strpos($remember, ":") !== false) {
                list($selector) = explode(":", $remember);
                $file = __DIR__ . "/remember_tokens/{$selector}.dat";
                if (file_exists($file))
                    @unlink($file);
            }
            setcookie("remember", "", time() - 3600, "/", "", false, true);
        }
        $_SESSION = [];
    }

    public static function esActiva(): bool
    {
        return self::obtenerUsuarioActual() !== null;
    }

    public static function obtenerUsuarioActual()
    {
        return isset($_SESSION) ? $_SESSION["usuario"] ?? null : null;
    }

    public static function setInfoTemporal($key, $val)
    {
        $_SESSION[$key] = $val;
    }

    public static function getInfoTemporal($key)
    {
        return $_SESSION[$key] ?? [];
    }

    public static function obtenerIDUsuarioActual()
    {
        return self::obtenerUsuarioActual()["id"] ?? 0;
    }

    public static function esCodigoRestablecerContraseniaCorrecto($codigo): bool
    {
        return self::getCodigoRestablecerContrasenia() === $codigo;
    }

    public static function setCodigoRestablecerContrasenia()
    {
        $codigo = Util::getCodigoValidacionCuenta();
        $_SESSION["codigo_recuperacion"] = $codigo;
        return $codigo;
    }

    public static function getCodigoRestablecerContrasenia()
    {
        return $_SESSION["codigo_recuperacion"];
    }

    public function actualizar($usuario)
    {
        self::setUsuarioActual($usuario);
    }
}
