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
            'version' => $router->app->version(),
            'author'  => 'Juan Carlos Gonzalez A.',
            'accesPoints' => [
                'POST /auth/verify-email' => 'Verifica si un correo electrónico ya está registrado y envía un código de verificación si no lo está.',
                'POST /auth/verify-code' => 'Verifica el código de verificación enviado al correo electrónico del usuario.',
                'POST /auth/register' => 'Registra una nueva cuenta de usuario después de verificar el código.',
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
        $router->post('verify-email', 'AuthController@verifyEmail');
        $router->post('verify-code', 'AuthController@verifyCode');
        $router->post('register', ['middleware' => 'auth', 'uses' => 'AuthController@register']);
    }
);
