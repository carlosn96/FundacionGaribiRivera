<?php

include '../../loader.php';

const ERROR_DISPLAY_URL = '/public/index/modules/error_display/?error=';

// Definir root para redirecciones
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$serverName = $_SERVER['SERVER_NAME'];
$root = "{$protocol}://{$serverName}";
if (strpos($serverName, 'localhost') !== false || $serverName === '127.0.0.1') {
    $rootPath = explode('/', trim($_SERVER['REQUEST_URI'], '/'))[0] ?? '';
    $root .= "/{$rootPath}";
}

// Recibir token de query string
$token = $_GET['token'] ?? null;
if (!$token) {
    // No token, redirigir a login
    echo "No token provided.";
    Util::redirigir($root . '/public/index');
}

// Verificar JWT
list($ok, $result) = BridgeValidator::verifyJwt($token);
echo  print_r($result, true);
if (!$ok) {
    Util::redirigir($root . ERROR_DISPLAY_URL . urlencode($result));
}

// Token válido, obtener usuario
$userId = $result['user_id'] ?? null;
if (!$userId) {
    Util::redirigir($root . ERROR_DISPLAY_URL . 'missing_user_id');
}


$adminUsuario = getAdminUsuario();
$usuario = $adminUsuario->buscarUsuarioPorCorreo($result['email'] ?? null);
if (!$usuario) {
    Util::redirigir($root . ERROR_DISPLAY_URL . 'user_not_found');
}

// Iniciar sesión
Sesion::iniciarSesionNueva($usuario, false); // No recordar por defecto

// Redirigir al módulo correspondiente
$urlUsuario = $usuario['tipo_usuario']['url'] ?? 'dashboard';
Util::redirigir($root . '/public/' . $urlUsuario);