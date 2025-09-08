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
        $this->middleware('jwt.cookie', ['except' => ['login']]); // Extract token from cookie first
        $this->middleware('auth:api', ['except' => ['login']]); // Then authenticate
    }

    public function login(Request $request)
    {
        $validatedData = $this->validateLoginRequest($request);
        $inputCredentials = $validatedData;
        $rememberMe = $validatedData['rememberMe'] ?? false;
        $user = $this->findUserByEmail($inputCredentials['correo']);
        if (!$this->checkPassword($inputCredentials['contrasena'], $user->contrasena)) {
            return ApiResponse::unauthorized('Contraseña incorrecta.');
        }

        JWTAuth::factory()->setTTL($rememberMe ? 60 * 24 * 7 : 60 * 60 * 24); // en minutos
        auth()->login($user);
        try {
            $token =  JWTAuth::fromUser($user);
        } catch (\Exception $e) {
            return ApiResponse::error('Error al generar el token.'. $e->getMessage(), 500);
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

    protected function findUserByEmail($email)
    {
        $user = Usuario::where('correo_electronico', $email)->first();

        if (!$user) {
            throw new \Exception('Correo no encontrado.');
        }

        return $user;
    }
    protected function checkPassword($inputPassword, $storedPassword)
    {
        return Hash::check($inputPassword, $storedPassword);
    }


    public function me()
    {
        return ApiResponse::success(auth()->user());
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
