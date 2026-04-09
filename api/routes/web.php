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
        $routes = $router->getRoutes();
        $appUrl = rtrim(env('APP_URL'), '/');
        $accessPoints = [];

        foreach ($routes as $route) {
            $method = isset($route['method']) ? $route['method'] : '';
            $uri = isset($route['uri']) ? ltrim($route['uri'], '/') : '';
            
            if ($method && $uri !== '') {
                $accessPoints[] = $method . ' ' . $appUrl . '/' . $uri;
            }
        }

        $result = [
            'app'               => 'Fundacion Garibi Rivera API',
            'framework-version' => $router->app->version(),
            'app-version'       => "2025.08.24",
            'author'            => 'Juan Carlos Gonzalez A.',
            'accessPoints'      => $accessPoints
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
        $router->post('refresh', 'AuthController@refresh');
        $router->get('me', 'AuthController@me');
        $router->post('forgot-password', 'AuthController@forgotPassword');
        $router->post('reset-password', 'AuthController@resetPassword');
        // Bridge endpoint to verify/register bridge tokens coming from legacy app
        $router->post('bridge', 'BridgeController@register');
        $router->get('bridge/me', 'BridgeController@me');
    }
);

$router->group(
    ['prefix' => 'linea-base', 'middleware' => 'jwt.cookie'], function () use ($router) {
        // Rutas para obtener catálogos (deben ir antes de las rutas con parámetros)
        $router->get('/catalogos', 'LineaBaseCatalogosController@getAllCatalogosPorTipoInput');
        $router->get('/catalogos/municipios/{estadoId}', 'LineaBaseCatalogosController@getMunicipios');
        $router->get('/catalogos/codigos-postales', 'LineaBaseCatalogosController@getAllCodigosPostales');
        $router->get('/catalogos/codigos-postales/search', 'LineaBaseCatalogosController@searchCodigosPostales');
        $router->get('/catalogos/codigos-postales/{municipioId}', 'LineaBaseCatalogosController@getCodigosPostales');
        $router->get('/catalogos/codigo-postal/{id}', 'LineaBaseCatalogosController@getCodigoPostalPorId');
        $router->get('/catalogos/comunidades-parroquiales', 'LineaBaseCatalogosController@getAllComunidadesParroquiales');
        $router->get('/catalogos/comunidades-parroquiales/search', 'LineaBaseCatalogosController@searchComunidadesParroquiales');
        $router->get('/catalogos/comunidades-parroquiales/{decanatoId}', 'LineaBaseCatalogosController@getComunidadesParroquialesPorDecanato');
        $router->get('/catalogos/{tipo}', 'LineaBaseCatalogosController@getCatalogo');

        $router->get('/', 'LineaBaseController@getLineaBase');
        $router->post('/', 'LineaBaseController@saveAll');

    }
);

$router->group(
    ['prefix' => 'cobranza', 'middleware' => 'jwt.cookie'], function () use ($router) {
        $router->get('/historial-emprendedores', 'CobranzaController@getHistorialEmprendedores');
        $router->post('/referencia', 'CobranzaController@actualizarReferencia');
        $router->get('/expediente/{id}', 'CobranzaController@getExpediente');
        $router->post('/expediente', 'CobranzaController@saveInfoFinanciera');
        $router->delete('/expediente/{id}', 'CobranzaController@eliminarExpediente');

        // Secciones del expediente
        $router->post('/expediente/aval', 'CobranzaController@saveAval');
        $router->post('/expediente/inmueble-garantia', 'CobranzaController@saveInmuebleGarantia');
        $router->post('/expediente/resumen-ejecutivo', 'CobranzaController@saveResumenEjecutivo');

        // ---- Pagos ----
        $router->get('/pagos/{idEmprendedor}', 'PagoController@getPagos');
        $router->get('/pagos/{idEmprendedor}/fechas', 'PagoController@getFechasPendientes');
        
        $router->post('/pagos', 'PagoController@agregarPago');
        $router->delete('/pagos/{idPago}', 'PagoController@eliminarPago');
        $router->put('/pagos/{idPago}/fecha-recepcion', 'PagoController@actualizarFechaRecepcionPago');
        
        $router->post('/pagos-parciales', 'PagoController@agregarPagoParcial');
        $router->put('/pagos-parciales/{idPago}', 'PagoController@modificarPagoParcial');
        $router->delete('/pagos-parciales/{idPago}', 'PagoController@eliminarPagoParcial');
        $router->get('/imprimir-contrato/{id}', 'CobranzaController@getContratoPdf');
        $router->get('/imprimir-tarjeta-pagos/{id}', 'CobranzaController@getTarjetaPagosPdf');
    }
);

$router->group(
    ['prefix' => 'emprendedor', 'middleware' => 'jwt.cookie'], function () use ($router) {
        $router->get('/perfil/{id}', 'EmprendedorController@getPerfil');
    }
);
