<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;
use App\Http\Responses\ApiResponse;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Cookie;
use Carbon\Carbon;
use App\Http\Controllers\Traits\RespondsWithToken;

class AuthController extends Controller
{
    use RespondsWithToken;

    public function __construct()
    {
        $this->middleware('jwt.cookie', ['except' => ['login']]);
        $this->middleware('auth:api', ['except' => ['login']]);
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
        return ApiResponse::success(auth()->user(), "User retrieved successfully.");
    }

    public function logout()
    {
        auth()->logout();
        // Delete the access_token cookie
        $cookie = Cookie::create('access_token', null, -1, '/', null, true, true, false, 'strict');
        return ApiResponse::success(null, 'Successfully logged out')->withCookie($cookie);
    }

    public function refresh()
    {
        $token = JWTAuth::refresh();
        return $this->respondWithToken($token, auth()->user());
    }
}
