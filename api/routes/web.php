<?php

/**
 * @var \Laravel\Lumen\Routing\Router $router 
 */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get(
    '/', function () use ($router) {
        $appUrl = env('APP_URL');
        $result = [
            'app'     => 'Fundacion Garibi Rivera API',
            'framework-version' => $router->app->version(),
            'app-version' => "2025.08.24",
            'author'  => 'Juan Carlos Gonzalez A.',
            'accesPoints' => [
                'POST ' . $appUrl . '/auth/verify-email' => 'Verifica si un correo electrónico ya está registrado y envía un código de verificación si no lo está.',
                'POST ' . $appUrl . '/auth/verify-code' => 'Verifica el código de verificación enviado al correo electrónico del usuario.',
                'POST ' . $appUrl . '/auth/register' => 'Registra una nueva cuenta de usuario después de verificar el código.',
                'POST ' . $appUrl . '/auth/login' => 'Autentica a un usuario y devuelve un token de acceso.',
                'POST ' . $appUrl . '/auth/logout' => 'Cierra la sesión del usuario.',
                'POST ' . $appUrl . '/auth/refresh' => 'Renueva el token de acceso del usuario.',
                'GET ' . $appUrl . '/auth/me' => 'Obtiene la información del usuario autenticado.'
            ]
        ];
        return response()->json($result);
    }
);

$router->group(
    ['prefix' => 'auth'], function () use ($router) {
        $router->post('verify-email', 'RegisterController@verifyEmail');
        $router->post('verify-code', 'RegisterController@verifyCode');
        $router->post('register', ['middleware' => 'jwt.cookie', 'uses' => 'RegisterController@register']);
        $router->post('login', 'AuthController@login');
        $router->post('logout', 'AuthController@logout');
        $router->post('refresh', ['middleware' => 'jwt.cookie', 'uses' => 'AuthController@refresh']);
        $router->get('me', 'AuthController@me');
        // Bridge endpoint to verify/register bridge tokens coming from legacy app
        $router->post('bridge', 'BridgeController@register');
        $router->get('bridge/me', 'BridgeController@me');
    }
);
