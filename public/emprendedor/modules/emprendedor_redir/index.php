<?php

include '../../../../loader.php';

// Objetivo: crear un "bridge token" JWT y redirigir a la nueva app.

$usuario = Sesion::obtenerUsuarioActual();
if (!$usuario) {
	// No hay sesión activa → volver a la página de login
	$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
	$serverName = $_SERVER['SERVER_NAME'];
	$root = "{$protocol}://{$serverName}";
	if (strpos($serverName, 'localhost') !== false || $serverName === '127.0.0.1') {
		$rootPath = explode('/', trim($_SERVER['REQUEST_URI'], '/'))[0] ?? '';
		$root .= "/{$rootPath}";
	}
	Util::redirigir($root . '/public/index');
}

if (!in_array(TipoUsuario::EMPRENDEDOR, $usuario["permisos"])) {
	// No es emprendedor → comportamiento normal (redirigir a dashboard del usuario)
	$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
	$serverName = $_SERVER['SERVER_NAME'];
	$root = "{$protocol}://{$serverName}";
	if (strpos($serverName, 'localhost') !== false || $serverName === '127.0.0.1') {
		$rootPath = explode('/', trim($_SERVER['REQUEST_URI'], '/'))[0] ?? '';
		$root .= "/{$rootPath}";
	}
	Util::redirigir($root . '/public/' . ($usuario['tipo_usuario']['url'] ?? ''));
}

// Generar JWT (HS256) con datos mínimos: {user_id, email, timestamp, issued_by}, exp = 5 minutos
function base64UrlEncode($data)
{
	return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

$payload = [
	'user_id' => $usuario['id'] ?? 0,
	'email' => $usuario['correo_electronico'],
	'timestamp' => time(),
	'issued_by' => 'legacy_app_v1',
	'exp' => time() + 300
];
$header = ['alg' => 'HS256', 'typ' => 'JWT'];

// Obtener secreto compartido: primer intento ENV, luego archivo /api/.env
$bridgeSecret = BRIDGE_SECRET ?: null;
if (!$bridgeSecret) {
	$envPath = __DIR__ . '/../../../../api/.env';
	if (file_exists($envPath)) {
		$lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
		foreach ($lines as $line) {
			if (strpos(trim($line), '#') === 0)
				continue;
			if (strpos($line, 'BRIDGE_SECRET=') === 0) {
				$bridgeSecret = trim(substr($line, strlen('BRIDGE_SECRET=')));
				$bridgeSecret = trim($bridgeSecret, " \t\r\n\"'");
				break;
			}
		}
	}
}
if (!$bridgeSecret) {
	Util::print('Error: BRIDGE_SECRET no está configurado.');
	return;
}

$b64Header = base64UrlEncode(json_encode($header));
$b64Payload = base64UrlEncode(json_encode($payload));
$signature = hash_hmac('sha256', "$b64Header.$b64Payload", $bridgeSecret, true);
$b64Sig = base64UrlEncode($signature);
$jwt = "$b64Header.$b64Payload.$b64Sig";
// Redirigir al nuevo sistema con token en query string
$newAppUrl = NEW_APP_URL ?: null;
if (!$newAppUrl) {
	// Intentar leer api/.env
	$envPath = __DIR__ . '/../../../../api/.env';
	if (file_exists($envPath)) {
		$lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
		foreach ($lines as $line) {
			if (strpos(trim($line), '#') === 0)
				continue;
			if (strpos($line, 'NEW_APP_URL=') === 0) {
				$newAppUrl = trim(substr($line, strlen('NEW_APP_URL=')));
				$newAppUrl = trim($newAppUrl, " \t\r\n\"'");
				break;
			}
		}
	}
}

if (!$newAppUrl) {
	Util::print('Error: NEW_APP_URL no está configurado.');
	return;
}

$redirectTo = rtrim($newAppUrl ) . 'token=' . urlencode($jwt).'&source=legacy_app_v1';

Util::redirigir($redirectTo);

