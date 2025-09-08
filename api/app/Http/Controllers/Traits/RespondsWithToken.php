<?php

namespace App\Http\Controllers\Traits;

use App\Http\Responses\ApiResponse;
use Illuminate\Support\Facades\Cookie;
use Tymon\JWTAuth\Facades\JWTAuth;

trait RespondsWithToken
{
    protected function respondWithToken($token, $user, $message = 'Authenticated', $status = 200)
    {
        $expiresIn = JWTAuth::factory()->getTTL(); // en minutos

        $cookie = Cookie::create(
            'access_token',
            $token,
            $expiresIn, // expiración en minutos
            '/', // ruta
            null, // dominio
            env('APP_ENV') !== 'local', // seguro
            true, // httponly
            false, // raw
            'none' // samesite
        );

        return ApiResponse::success($user, $message, $status)
            ->withCookie($cookie);
    }
}
