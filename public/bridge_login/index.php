<?php

include '../../loader.php';

const ERROR_DISPLAY_URL = '/public/index/modules/error_display/?error=';

// Definir root para redirecciones
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$serverName = $_SERVER['SERVER_NAME'];
$root = "{$protocol}://{$serverName}";
// Extraer la ruta base del proyecto usando la posición de '/public/' en SCRIPT_NAME
// Esto soporta cualquier nivel de anidación (ej. localhost/carpeta1/carpeta2/public/...)
$basePath = '';
if (($pos = strpos($_SERVER['SCRIPT_NAME'], '/public/')) !== false) {
    $basePath = substr($_SERVER['SCRIPT_NAME'], 0, $pos);
}
$root .= $basePath;

// Recibir token de query string o leerlo de la cookie access_token
$tokenGet = $_GET['token'] ?? null;
$tokenCookie = $_COOKIE['access_token'] ?? null;
$token = $tokenGet ?? $tokenCookie ?? null;

if (!$token) {
    // No token, redirigir a login
    echo "No token provided.";
    Util::redirigir($root . '/public/index');
}

$email = null;

// Si el token viene por GET, intentamos primero validarlo como token de la app externa (Bridge)
if ($tokenGet) {
    list($ok, $result) = BridgeValidator::verifyJwt($tokenGet);
    if ($ok && isset($result['email'])) {
        $email = $result['email'];
    }
}

// Si aún no tenemos email, intentamos validarlo contra la API de Lumen (sirve para login nativo usando cookie o GET)
if (!$email) {
    $apiUrl = "{$root}/api/auth/me";
    $ch = curl_init($apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    // Add both Cookie and Bearer for maximum compatibility with Lumen Middleware
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer {$token}",
        "Cookie: access_token={$token}",
        "Accept: application/json"
    ]);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200) {
        $apiResult = json_decode($response, true);
        $email = $apiResult['data']['correo_electronico'] ?? null;
        
        if (!$email) {
            // Log response error for debugging in production
            $errorLog = "Time: " . date('Y-m-d H:i:s') . "\nURL: $apiUrl\nHttpCode: $httpCode\nJSON Error: " . json_last_error_msg() . "\nDecode Result: " . print_r($apiResult, true) . "\nResponse: $response\n\n";
            file_put_contents(__DIR__ . '/debug_bridge.log', $errorLog, FILE_APPEND);
            
            // As a fallback to strictly ensure we can display the error on screen if needed:
            Util::redirigir($root . ERROR_DISPLAY_URL . 'missing_user_email_debug&debug=' . urlencode(substr($response, 0, 200)));
            exit();
        }
    } else {
        // Log the exact error for debugging
        file_put_contents(__DIR__ . '/debug_bridge.log', "Time: " . date('Y-m-d H:i:s') . "\nURL: $apiUrl\nHttpCode: $httpCode\nResponse: $response\n\n", FILE_APPEND);
        
        // Si la API rechaza el token, borramos la cookie y redirigimos
        setcookie('access_token', '', time() - 3600, '/');
        Util::redirigir($root . ERROR_DISPLAY_URL . 'api_unauthorized_code_' . $httpCode);
        exit();
    }
}

if (!$email) {
    Util::redirigir($root . ERROR_DISPLAY_URL . 'missing_user_email_final');
    exit();
}

$adminUsuario = getAdminUsuario();
$usuario = $adminUsuario->buscarUsuarioPorCorreo($email);
if (!$usuario) {
    Util::redirigir($root . ERROR_DISPLAY_URL . 'user_not_found');
    exit();
}

// Iniciar sesión
Sesion::iniciarSesionNueva($usuario, false); // No recordar por defecto

// Redirigir al módulo correspondiente
$urlUsuario = $usuario['tipo_usuario']['url'] ?? 'dashboard';
Util::redirigir($root . '/public/' . $urlUsuario);
exit();