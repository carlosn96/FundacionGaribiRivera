<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use App\Http\Responses\ApiResponse;

class JwtFromCookieMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // 1. Obtener el token de acceso (Probamos Request -> PHP Raw -> Query -> Header)
        $accessToken = $request->cookie('access_token') ?: ($_COOKIE['access_token'] ?? null);

        if (!$accessToken) {
            $accessToken = $request->query('token');
        }

        if (!$accessToken && $request->hasHeader('Authorization')) {
            $header = $request->header('Authorization');
            if (strpos($header, 'Bearer ') === 0) {
                $accessToken = substr($header, 7);
            }
        }

        try {
            if (!$accessToken) {
                // Si falta el access, buscamos el refresh (Request o PHP Raw)
                $refreshToken = $request->cookie('refresh_token') ?: ($_COOKIE['refresh_token'] ?? null);
                
                if ($refreshToken) {
                    throw new TokenExpiredException('Access token missing, fallback to refresh');
                }
                throw new JWTException('Token not provided');
            }

            // Intentar autenticar con el token de acceso
            JWTAuth::setToken($accessToken)->authenticate();
            return $next($request);

        } catch (TokenExpiredException $e) {
            // --- INICIO DE REFRESCO AUTOMÁTICO EN SERVIDOR ---
            $refreshToken = $request->cookie('refresh_token');

            if ($refreshToken) {
                try {
                    // Intentar autenticar al usuario usando el Refresh Token
                    $user = JWTAuth::setToken($refreshToken)->authenticate();

                    // Si el refresh es válido, generamos un nuevo Access Token con TTL corto
                    JWTAuth::factory()->setTTL(config('jwt.ttl', 15));
                    $newToken = JWTAuth::fromUser($user);

                    // Forzar el login en el guard para la petición actual
                    auth()->login($user);

                    // Procesar la petición original
                    $response = $next($request);

                    // Si por algún motivo response no es un objeto de respuesta (ej. redirigido), lo devolvemos tal cual
                    if (!method_exists($response, 'withCookie')) {
                        return $response;
                    }

                    // Devolver la respuesta de la petición con la nueva cookie de acceso
                    $cookie = \App\Services\CookieService::createAccessToken($newToken, config('jwt.ttl', 15));
                    return $response->withCookie($cookie);

                } catch (\Exception $refreshError) {
                    // Si el refresh token también falló o expiró
                    return ApiResponse::unauthorized('La sesión ha expirado completamente. Inicie sesión de nuevo.');
                }
            }

            return ApiResponse::unauthorized('El token de acceso ha expirado.');
            // --- FIN DE REFRESCO AUTOMÁTICO ---

        } catch (TokenInvalidException $e) {
            return ApiResponse::unauthorized('El token es inválido.');
        } catch (JWTException $e) {
            return ApiResponse::unauthorized('No se pudo procesar el token de autenticación.'.$e->getMessage()  );
        }
    }
}
