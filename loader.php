<?php

class Util {
    
    

    public static function redirigir($url, $permanent = false) {
        echo $url;
        if (headers_sent()) {
            // echo "<script>window.location = '$url';</script>";
            //echo "<script type='text/javascript'>window.location.replace('$url');</script>";
        } else {
            //header('Location: ' . $url, true, $permanent ? 301 : 302);
        }
    }

    public static function separarCamposFomulario($data) {
        $campos = array();
        parse_str($data, $campos);
        return $campos;
    }

    public static function print($val) {
        echo print_r($val);
    }

    public static function enum($mensaje, $esError): array {
        return [
            "mensaje" => $mensaje,
            "es_valor_error" => $esError,
        ];
    }

    public static function map(int $id, string $val) {
        return ["id" => $id, "val" => $val];
    }

    public static function encriptarContrasenia($contrasenia) {
        return password_hash($contrasenia, PASSWORD_DEFAULT);
    }

    public static function verificarContrasenia($contraseniaIngresada, $hash) {
        return password_verify($contraseniaIngresada, $hash);
    }

    public static function iniciarAPI($nombre) {
        (new $nombre($_POST["case"] ?? "", isset($_POST["data"]) ? $_POST["data"] : ""));
    }

    public static function getCodigoValidacionCuenta() {
        return substr(str_shuffle("0123456789"), 0, 4);
    }

    public static function recuperarArchivosServidor($nombreInputFile) {
        $archivos = [];
        foreach ($_FILES[$nombreInputFile]['tmp_name'] as $file) {
            $archivos[] = self::binToBase64(file_get_contents($file));
        }
        return $archivos;
    }

    public static function binToBase64($fileContents) {
        return base64_encode($fileContents);
    }

    public static function obtenerFechaActual() {
        return date("Ymd");
    }

    public static function respuestaBoolToStr(bool $respuesta) {
        return $respuesta ? "Sí" : "No";
    }

    public static function obtenerFotografiaRand() {
        $fotos = [];
        $dir = DIR_FOTOGRAFIAS;
        if (is_dir($dir)) {
            $archivos = array_diff(scandir($dir), array('.', '..'));
            foreach ($archivos as $fotografias) {
                $fotos[] = $dir . DIRECTORY_SEPARATOR . $fotografias;
            }
        }
        return $fotos[rand(0, count($fotos) - 1)];
    }
}

// Definir variables de base de datos en config.php
define('DB_HOST', '193.203.166.72');
define('DB_USER', 'u775111066_pruebas');
define('DB_PASS', 'Pruebas2024');
define('DB_NAME', 'u775111066_pruebas');

// Definir variables de correo electrónico
define('EMAIL_HOST', 'smtp.hostinger.com');
define('EMAIL_USER', 'soporte@fundaciongaribirivera.com');
define('EMAIL_PASSWORD', '72P37y^K4bh|G');
define('EMAIL_PORT', 587);

define("ROOT_APP", __DIR__ . DIRECTORY_SEPARATOR);
define("DIR_FOTOGRAFIAS", ROOT_APP . "public" . DIRECTORY_SEPARATOR . "assets" . DIRECTORY_SEPARATOR . "images" . DIRECTORY_SEPARATOR . "profile");
define("INDEX", "FundacionCardenalGaribiRivera2024" . DIRECTORY_SEPARATOR);

define("ERROR_INSERTAR", Util::enum('Ha ocurrido un error al intentar almacenar la información proporcionada. Verifique los datos', true));
define("REGISTRO_COMPLETO", Util::enum('Registro completo', false));
define("OPERACION_COMPLETA", Util::enum("Operacion completa", false));
define("ACTUALIZACION_COMPLETA", Util::enum("La actualización de la información se ha realizado correctamente", false));
define("OPERACION_INCOMPLETA", Util::enum("Opreación incompleta", true));
define("USUARIO_YA_EXISTE", Util::enum("El número móvil ingresado ya se encuentra registrado", true));

define("ACCESO_DENEGADO", Util::enum('No tienes permiso de acceso', true));
define("ERROR_CLAVE", Util::enum('Verifique la clave ingresada.', true));
define("ERROR_ACCESO_USUARIO", Util::enum('Error de acceso: verifica el usuario ingresado.', true));
define("ERROR_ACCESO_PASSWORD", Util::enum('Error de acceso: contraseña incorrecta.', true));
define("ERROR_CONTRASENIA_ACTUAL", Util::enum('Contraseña actual incorrecta', true));
define("ERROR_CONTRASENIA_NUEVA", Util::enum('Las contraseñas no coinciden: verifica la contraseña nueva', true));
define("ERROR_DESCONOCIDO", Util::enum('Error desconocido', true));
define("ERROR_SEGURIDAD", Util::enum('La respuesta de seguridad no es correcta', true));
define("ERROR_FORMATO", Util::enum('Ingresa usuario válido', true));
define("UNDEFINED", Util::enum('Sin información', true));
define("NO_ERROR", Util::enum('', false));

define("NO_DATA_ERROR", Util::enum("No existe información disponible", true));
define("NO_COMPLETE_DATA_ERROR", Util::enum("La información solicitada no está completa", true));

define("ES_VALOR_ERROR", true);
define("NO_ES_VALOR_ERROR", !ES_VALOR_ERROR);

spl_autoload_register(function ($clase) {
    $directorios = ["admin", "dao", "dao/util", "model", "controller", "libs"];
    foreach ($directorios as $directorio) {
        if (buscar(ROOT_APP . $directorio, $clase)) {
            return;
        }
    }
});

function buscar($directorio, $clase) {
    // Convertir el namespace en una ruta de archivo
    $archivo = $directorio . DIRECTORY_SEPARATOR . str_replace('\\', DIRECTORY_SEPARATOR, $clase) . '.php';
    if (file_exists($archivo)) {
        require_once($archivo);
        return true;
    }
    // Si no se encuentra el archivo, buscar recursivamente en los subdirectorios
    foreach (glob($directorio . DIRECTORY_SEPARATOR . '*', GLOB_ONLYDIR) as $subdirectorio) {
        if (buscar($subdirectorio, $clase)) {
            return true;
        }
    }
    return false;
}

function getAdminLineaBase(): AdminLineaBase {
    return AdminFactory::getAdminLineaBase();
}

function getAdminEvaluacionFormacion(): AdminEvaluacionFormacion {
    return AdminFactory::getAdminEvaluacionFormacion();
}

function getAdminEmprendedor(): AdminEmprendedor {
    return AdminFactory::getAdminEmprendedor();
}

function getAdminTaller(): AdminTaller {
    return AdminFactory::getAdminTaller();
}

function getAdminEtapaFormacion(): AdminEtapaFormacion {
    return AdminFactory::getAdminEtapaFormacion();
}

function getAdminUsuario(): AdminUsuario {
    return AdminFactory::getAdminUsuario();
}

function getAdminVisitaSeguimiento(): AdminVisitaSeguimiento {
    return AdminFactory::getAdminVisitaSeguimiento();
}
