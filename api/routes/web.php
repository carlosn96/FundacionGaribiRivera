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
        $result = [
            'app'     => 'Fundacion Garibi Rivera API',
            'framework-version' => $router->app->version(),
            'app-version' => "2025.08.24",
            'author'  => 'Juan Carlos Gonzalez A.',
            'accesPoints' => [
                'POST /auth/verify-email' => 'Verifica si un correo electrónico ya está registrado y envía un código de verificación si no lo está.',
                'POST /auth/verify-code' => 'Verifica el código de verificación enviado al correo electrónico del usuario.',
                'POST /auth/register' => 'Registra una nueva cuenta de usuario después de verificar el código.',
                'POST /auth/login' => 'Autentica a un usuario y devuelve un token de acceso.',
                'POST /auth/logout' => 'Cierra la sesión del usuario.',
                'POST /auth/refresh' => 'Renueva el token de acceso del usuario.',
                'POST /auth/me' => 'Obtiene la información del usuario autenticado.',
            ]
        ];
        return response()->json($result);
    }
);

$router->get(
    '/test', function () {
        return 'Hello World';
    }
);


$router->group(
    ['prefix' => 'auth'], function () use ($router) {
        $router->post('verify-email', 'RegisterController@verifyEmail');
        $router->post('verify-code', 'RegisterController@verifyCode');
        $router->post('register', 'RegisterController@register');
        $router->post('login', 'AuthController@login');
        $router->post('logout', 'AuthController@logout');
        $router->post('refresh', 'AuthController@refresh');
        $router->post('me', 'AuthController@me');
    }
);