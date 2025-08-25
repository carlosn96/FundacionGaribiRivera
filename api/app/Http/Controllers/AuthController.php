<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;
use App\Models\TipoUsuario;
use App\Http\Responses\ApiResponse;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function login(Request $request)
    {
        $inputCredentials = $request->only('correo', 'contrasena');
        $user = Usuario::where('correo_electronico', $inputCredentials['correo'])->first();
        if (!$user) {
            return ApiResponse::unauthorized('Correo no encontrado.');
        }
        if (!Hash::check($inputCredentials['contrasena'], $user->contrasena)) {
            return ApiResponse::unauthorized('Contraseña incorrecta.');
        }
        // If password is correct and user is active, manually log in the user
        auth()->login($user);

        // Generate the token for the authenticated user
        $token = auth()->fromUser($user);

        return $this->respondWithToken($token, $user);
    }

    public function me()
    {
        return ApiResponse::success(auth()->user());
    }

    public function logout()
    {
        auth()->logout();

        return ApiResponse::success(null, 'Successfully logged out');
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh(), auth()->user());
    }

    protected function respondWithToken($token, $user)
    {
        $data = [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
            'user' => $user
        ];
        return ApiResponse::success($data, 'Authenticated');
    }
}
