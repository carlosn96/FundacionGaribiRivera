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
                'GET ' . $appUrl . '/auth/me' => 'Obtiene la información del usuario autenticado.',
                'GET ' . $appUrl . '/linea-base/{idUsuario}' => 'Obtiene la línea base completa para un usuario.',
                'POST ' . $appUrl . '/linea-base/{idUsuario}' => 'Guarda la línea base completa para un usuario.',
                'POST ' . $appUrl . '/linea-base/preliminar/{idUsuario}' => 'Guarda la sección preliminar de la línea base.',
                'POST ' . $appUrl . '/linea-base/identificacion/{idUsuario}' => 'Guarda la sección de identificación de la línea base.',
                'POST ' . $appUrl . '/linea-base/domicilio/{idUsuario}' => 'Guarda la sección de domicilio de la línea base.',
                'POST ' . $appUrl . '/linea-base/socioeconomico/{idUsuario}' => 'Guarda la sección socioeconómica de la línea base.',
                'POST ' . $appUrl . '/linea-base/negocio/{idUsuario}' => 'Guarda la sección de negocio de la línea base.',
                'POST ' . $appUrl . '/linea-base/analisis-negocio/{idUsuario}' => 'Guarda la sección de análisis de negocio de la línea base.',
                'POST ' . $appUrl . '/linea-base/administracion-ingresos/{idUsuario}' => 'Guarda la sección de administración de ingresos de la línea base.',
                'GET ' . $appUrl . '/linea-base/catalogos/{tipo}' => 'Obtiene la lista de un catálogo específico (ej. estados-civiles, escolaridades, etc.).',
                'GET ' . $appUrl . '/linea-base/catalogos' => 'Obtiene todos los catálogos disponibles.',
                'GET ' . $appUrl . '/linea-base/catalogos/municipios/{estadoId}' => 'Obtiene los municipios para un estado específico.',
                'GET ' . $appUrl . '/linea-base/catalogos/codigos-postales/{municipioId}' => 'Obtiene los códigos postales para un municipio específico.',
                'GET ' . $appUrl . '/linea-base/catalogos/codigos-postales?per_page={per_page}' => 'Obtiene todos los códigos postales con paginación.',
                'GET ' . $appUrl . '/linea-base/catalogos/codigos-postales/search?q={query}&per_page={per_page}' => 'Busca códigos postales por código postal o colonia con paginación.',
                'GET ' . $appUrl . '/linea-base/catalogos/codigo-postal/{id}' => 'Obtiene un código postal específico por su ID.',
                'GET ' . $appUrl . '/linea-base/catalogos/comunidades-parroquiales?per_page={per_page}' => 'Obtiene todas las comunidades parroquiales con paginación.',
                'GET ' . $appUrl . '/linea-base/catalogos/comunidades-parroquiales/search?q={query}&per_page={per_page}' => 'Busca comunidades parroquiales por nombre con paginación.',
                'GET ' . $appUrl . '/linea-base/catalogos/comunidades-parroquiales/{decanatoId}' => 'Obtiene las comunidades parroquiales para un decanato específico.',
                'GET ' . $appUrl . '/linea-base/catalogos/decanatos' => 'Obtiene la lista de decanatos.',
                'GET ' . $appUrl . '/linea-base/catalogos/vicarias' => 'Obtiene la lista de vicarias.'
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

$router->group(
    ['prefix' => 'linea-base', 'middleware' => 'jwt.cookie'], function () use ($router) {
        // Rutas para obtener catálogos (deben ir antes de las rutas con parámetros)
        $router->get('/catalogos', 'LineaBaseController@getAllCatalogosPorTipoInput');
        $router->get('/catalogos/municipios/{estadoId}', 'LineaBaseController@getMunicipios');
        $router->get('/catalogos/codigos-postales', 'LineaBaseController@getAllCodigosPostales');
        $router->get('/catalogos/codigos-postales/search', 'LineaBaseController@searchCodigosPostales');
        $router->get('/catalogos/codigos-postales/{municipioId}', 'LineaBaseController@getCodigosPostales');
        $router->get('/catalogos/codigo-postal/{id}', 'LineaBaseController@getCodigoPostalPorId');
        $router->get('/catalogos/comunidades-parroquiales', 'LineaBaseController@getAllComunidadesParroquiales');
        $router->get('/catalogos/comunidades-parroquiales/search', 'LineaBaseController@searchComunidadesParroquiales');
        $router->get('/catalogos/comunidades-parroquiales/{decanatoId}', 'LineaBaseController@getComunidadesParroquialesPorDecanato');
        $router->get('/catalogos/{tipo}', 'LineaBaseController@getCatalogo');

        $router->get('/', 'LineaBaseController@getLineaBase');
        $router->post('/{idUsuario}', 'LineaBaseController@saveAll');
        $router->post('/preliminar/{idUsuario}', 'LineaBaseController@savePreliminar');
        $router->post('/identificacion/{idUsuario}', 'LineaBaseController@saveIdentificacion');
        $router->post('/domicilio/{idUsuario}', 'LineaBaseController@saveDomicilio');
        $router->post('/socioeconomico/{idUsuario}', 'LineaBaseController@saveSocioeconomico');
        $router->post('/negocio/{idUsuario}', 'LineaBaseController@saveNegocio');
        $router->post('/analisis-negocio/{idUsuario}', 'LineaBaseController@saveAnalisisNegocio');
        $router->post('/administracion-ingresos/{idUsuario}', 'LineaBaseController@saveAdministracionIngresos');
    }
);
