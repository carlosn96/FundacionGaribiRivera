<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;
use App\Http\Responses\ApiResponse;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Factory as JWTFactory;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.cookie', ['except' => ['login']]); // Extract token from cookie first
        $this->middleware('auth:api', ['except' => ['login']]); // Then authenticate
    }

    public function login(Request $request)
    {
        $inputCredentials = $request->only('correo', 'contrasena');
        $rememberMe = $request->has('remember_me') ? (bool)$request->input('remember_me') : false;

        $user = Usuario::where('correo_electronico', $inputCredentials['correo'])->first();

        if (!$user) {
            return ApiResponse::unauthorized('Correo no encontrado.');
        }

        if (!Hash::check($inputCredentials['contrasena'], $user->contrasena)) {
            return ApiResponse::unauthorized('Contraseña incorrecta.');
        }

        // Determine TTL based on remember_me
        if ($rememberMe) {
            JWTAuth::factory()->setTTL(43200); // 30 days
        } else {
            JWTAuth::factory()->setTTL(60); // 1 hour
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

        // Delete the access_token cookie
        $cookie = Cookie::create('access_token', null, -1, '/', null, true, true, false, 'strict');

        return ApiResponse::success(null, 'Successfully logged out')->withCookie($cookie);
    }

    public function refresh()
    {
        $token = auth()->refresh();
        return $this->respondWithToken($token, auth()->user());
    }

    protected function respondWithToken($token, $user)
    {
        $expiresIn = JWTAuth::factory()->getTTL() * 60; // in seconds

        $cookie = Cookie::create(
            'access_token',
            $token,
            time() + $expiresIn, // expiration time
            '/', // path
            null, // domain
            true, // secure
            true, // httponly
            false, // raw
            'strict' // samesite
        );
        return ApiResponse::success($user, 'Authenticated')->withCookie($cookie);
    }
}
