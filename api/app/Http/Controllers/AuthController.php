<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;
use App\Http\Responses\ApiResponse;
use Log;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Cookie;
use Carbon\Carbon;
use App\Http\Controllers\Traits\RespondsWithToken;
use App\Services\MailService;
use App\Services\SessionService;

class AuthController extends Controller
{
    use RespondsWithToken;

    public function __construct()
    {
        $this->middleware('jwt.cookie', ['except' => ['login', 'forgotPassword', 'resetPassword']]);
        $this->middleware('auth:api', ['except' => ['login', 'forgotPassword', 'resetPassword']]);
    }

    public function login(Request $request)
    {
        $validatedData = $this->validateLoginRequest($request);
        $inputCredentials = $validatedData;
        $rememberMe = $validatedData['rememberMe'] ?? false;

        $user = Usuario::where('correo_electronico', $inputCredentials['correo'])->first();
        if (!$user) {
            return ApiResponse::unauthorized('Correo no encontrado.');
        }
        if (!Hash::check($inputCredentials['contrasena'], $user->contrasena)) {
            return ApiResponse::unauthorized('Contraseña incorrecta.');
        }
        JWTAuth::factory()->setTTL($rememberMe ? 60 * 24 * 7 : 60 * 24); // 1 semana o 1 día
        auth()->login($user);
        try {
            $token = JWTAuth::fromUser($user);
        } catch (\Exception $e) {
            return ApiResponse::error('Error al generar el token. ' . $e->getMessage(), 500);
        }
        return $this->respondWithToken($token, $user);
    }

    protected function validateLoginRequest(Request $request)
    {
        return $this->validate(
            $request,
            [
                'correo' => 'required|email',
                'contrasena' => 'required|string',
                'rememberMe' => 'required|boolean'
            ]
        );
    }


    public function me()
    {
       // Log::info('Fetching authenticated user info for user ID: ' . auth()->id());
        return ApiResponse::success(auth()->user(), "User retrieved successfully.");
    }

    public function logout()
    {
        try {
            // Obtén el token si viene por cookie/Authorization
            $token = null;
            try {
                $token = JWTAuth::getToken();
            } catch (\Throwable $t) {
                // Sin token o mal formado → continuar para limpiar estado del cliente
            }

            // Cerrar sesión del guard (si estuviera autenticado)
            try {
                auth()->logout();
            } catch (\Throwable $t) {
                // Guard ya estaba desconectado → continuar
            }

            // Invalidar token si existe (ignorar estados inválidos/expirados)
            if ($token) {
                try {
                    JWTAuth::invalidate($token);
                } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
                    // Ya expirado → considerado como cerrado
                } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
                    // Token inválido → considerado como cerrado
                } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
                    // No se pudo invalidar → continuar
                }
            }

            // Eliminar cookie del token
            try {
                Cookie::queue(Cookie::forget('access_token'));
            } catch (\Throwable $t) {
                // Fallback manual si Cookie facade no puede
                @setcookie('access_token', '', time() - 3600, '/', '', true, true);
            }

            return ApiResponse::success(null, 'Sesión cerrada correctamente');
        } catch (\Throwable $e) {
            // Fallback final: garantizar JSON y limpiar cookie
            @setcookie('access_token', '', time() - 3600, '/', '', true, true);
            return ApiResponse::success(null, 'Sesión cerrada');
        }
    }

    public function refresh()
    {
        $token = JWTAuth::refresh();
        return $this->respondWithToken($token, auth()->user());
    }

    public function forgotPassword(Request $request)
    {
        $this->validate(
            $request,
            [
                'correo' => 'required|email',
            ]
        );
        $correo = $request->input('correo');
        $user = Usuario::where('correo_electronico', $correo)->first();
        if (!$user) {
            return ApiResponse::error('Correo no encontrado.', 404);
        }
        $codigo = \App\Services\CodeService::generateVerificationCode();
        if (!MailService::enviarCorreoRestablecerCuenta($correo, $user->nombre, $codigo)) {
            return ApiResponse::error('Error al enviar el código de verificación.', 500);
        }
        SessionService::set('reset_' . $correo, $codigo);
        return ApiResponse::success(['sent' => true], 'Código enviado exitosamente');
    }

    public function resetPassword(Request $request)
    {
        $this->validate(
            $request,
            [
                'correo' => 'required|email',
                'codigo' => 'required|string|max:4',
                'nueva_contrasena' => 'required|string|min:6',
            ]
        );
        $correo = $request->input('correo');
        $codigo = $request->input('codigo');
        $nuevaContrasena = $request->input('nueva_contrasena');
        $user = Usuario::where('correo_electronico', $correo)->first();
        if (!$user) {
            return ApiResponse::error('Correo no encontrado.', 404);
        }
        $storedCode = SessionService::get('reset_' . $correo);
        if ($storedCode !== $codigo) {
            return ApiResponse::error('Código incorrecto.', 400);
        }
        $user->contrasena = Hash::make($nuevaContrasena);
        $user->save();
        SessionService::unset('reset_' . $correo);
        return ApiResponse::success(['reset' => true], 'Contraseña restablecida exitosamente');
    }
}
