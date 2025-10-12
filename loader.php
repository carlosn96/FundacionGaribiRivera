<?php

// Cargar variables de entorno desde .env
$dotenv_path = __DIR__ . '/.env';
if (file_exists($dotenv_path)) {
    $lines = file($dotenv_path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue;
        }
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);
        if (!empty($name)) {
            // Eliminar comillas si existen
            if (substr($value, 0, 1) == '"' && substr($value, -1) == '"') {
                $value = substr($value, 1, -1);
            }
            define($name, $value);
        }
    }
}

class Util
{

    public static function redirigir($url, $permanent = false)
    {
        if (headers_sent()) {
            echo "<script>window.location = '$url';</script>";
            echo "<script type='text/javascript'>window.location.replace('$url');</script>";
        } else {
            header('Location: ' . $url, true, $permanent ? 301 : 302);
        }
    }

    public static function separarCamposFomulario($data)
    {
        $campos = array();
        parse_str($data, $campos);
        return $campos;
    }

    public static function print($val, bool $return = false): void
    {
        echo '<pre>' . print_r($val, true) . '</pre>';
    }

    public static function enum($mensaje, $esError): array
    {
        return [
            "mensaje" => $mensaje,
            "es_valor_error" => $esError,
        ];
    }

    public static function map(int $id, string $val)
    {
        return ["id" => $id, "val" => $val];
    }

    public static function encriptarContrasenia($contrasenia)
    {
        return password_hash($contrasenia, PASSWORD_DEFAULT);
    }

    public static function verificarContrasenia($contraseniaIngresada, $hash)
    {
        return password_verify($contraseniaIngresada, $hash);
    }

    public static function iniciarAPI($nombre)
    {
        (new $nombre($_POST["case"] ?? "", isset($_POST["data"]) ? $_POST["data"] : ""));
    }

    public static function getCodigoValidacionCuenta()
    {
        return substr(str_shuffle("0123456789"), 0, 4);
    }

    public static function recuperarArchivosServidor($nombreInputFile, $toBase64 = true)
    {
        $archivos = [];
        $files = $_FILES[$nombreInputFile] ?? null;
        if (!$files) {
            return $archivos;  // Si no hay archivos, devolvemos un arreglo vacío
        }
        // Si el archivo es un solo archivo (no un array)
        $fileTmpNames = is_array($files['tmp_name']) ? $files['tmp_name'] : [$files['tmp_name']];
        foreach ($fileTmpNames as $file) {
            if ($file) {
                $content = file_get_contents($file);
                $archivos[] = $toBase64 ? self::binToBase64($content) : $content;
            }
        }
        return $archivos;
    }

    public static function binToBase64($fileContents)
    {
        return base64_encode($fileContents);
    }
    public static function base64ToBin($base64File)
    {
        return base64_decode($base64File);
    }

    public static function obtenerFechaEstandar($datestr)
    {
        $formatos = ['d/m/Y', 'm/d/Y', 'Y-m-d'];
        foreach ($formatos as $formato) {
            $fecha = DateTime::createFromFormat($formato, $datestr, new DateTimeZone("America/Mexico_City"));
            if ($fecha && $fecha->format($formato) === $datestr) {
                return $fecha->format('Y-m-d');
            }
        }
        // Si no se puede parsear, lanzar un error o devolver null
        throw new Exception("Formato de fecha no válido: " . $datestr);
    }


    public static function obtenerFechaActual($format = "Ymd")
    {
        $date = new DateTime("now", new DateTimeZone("America/Mexico_City"));
        return $date->format($format);
    }

    public static function respuestaBoolToStr(bool $respuesta)
    {
        return $respuesta ? "Sí" : "No";
    }

    public static function obtenerFotografiaRand()
    {
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

    public static function error_log($message)
    {
        if (is_array($message) || is_object($message)) {
            $message = print_r($message, true);
        }
        error_log($message);
    }

    public static function HTTPPost($url, $data = [], $headers = [], $isJson = false)
    {
        $ch = curl_init($url);

        // Codificar los datos según el tipo de contenido
        $payload = $isJson ? json_encode($data) : http_build_query($data);

        // Headers por defecto
        $defaultHeaders = $isJson
            ? ['Content-Type: application/json']
            : ['Content-Type: application/x-www-form-urlencoded'];

        // Merge de headers
        $headers = array_merge($defaultHeaders, $headers);

        curl_setopt_array(
            $ch,
            [
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_POST => true,
                CURLOPT_POSTFIELDS => $payload,
                CURLOPT_HTTPHEADER => $headers,
            ]
        );

        $response = curl_exec($ch);

        if (curl_errno($ch)) {
            $error = curl_error($ch);
            curl_close($ch);
            throw new Exception("cURL error: $error");
        }

        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode >= 400) {
            throw new Exception("HTTP error $httpCode: $response");
        }

        return $response;
    }

}

define("ROOT_APP", __DIR__ . DIRECTORY_SEPARATOR);
define("ROOT_PUBLIC_APP", ROOT_APP . "public" . DIRECTORY_SEPARATOR);
define("DIR_FOTOGRAFIAS", ROOT_PUBLIC_APP . "assets" . DIRECTORY_SEPARATOR . "images" . DIRECTORY_SEPARATOR . "profile");

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

spl_autoload_register(
    function ($clase) {
        $directorios = ["admin", "dao", "dao/util", "model", "model/impacto", "controller", "libs"];
        foreach ($directorios as $directorio) {
            if (buscar(ROOT_APP . $directorio, $clase)) {
                return;
            }
        }
    }
);

function buscar($directorio, $clase)
{
    // Convertir el namespace en una ruta de archivo
    $archivo = $directorio . DIRECTORY_SEPARATOR . str_replace('\\', DIRECTORY_SEPARATOR, $clase) . '.php';
    if (file_exists($archivo)) {
        include_once $archivo;
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

function getAdminEstadisticas(): AdminEstadisticas
{
    return AdminFactory::getAdminEstadisticas();
}

function getAdminLineaBase(): AdminLineaBase
{
    return AdminFactory::getAdminLineaBase();
}

function getAdminEstudioSocioeconomico(): AdminEstudioSocioeconomico
{
    return AdminFactory::getAdminEstudioSocioeconomico();
}

function getAdminEvaluacionFormacion(): AdminEvaluacionFormacion
{
    return AdminFactory::getAdminEvaluacionFormacion();
}
function getAdminUsuario(): AdminUsuario
{
    return AdminFactory::getAdminUsuario();
}

function getAdminEmprendedor(): AdminEmprendedor
{
    return AdminFactory::getAdminEmprendedor();
}

function getAdminTaller(): AdminTaller
{
    return AdminFactory::getAdminTaller();
}

function getAdminEtapaFormacion(): AdminEtapaFormacion
{
    return AdminFactory::getAdminEtapaFormacion();
}

function getAdminVisitaSeguimiento(): AdminVisitaSeguimiento
{
    return AdminFactory::getAdminVisitaSeguimiento();
}

function getAdminImpacto(): AdminImpacto
{
    return AdminFactory::getAdminImpacto();
}

function getAdminLog(): AdminLog
{
    return AdminFactory::getAdminLog();
}
function getAdminLLM(): AdminLLM
{
    return AdminFactory::getAdminLLM();
}
