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

        $secure = env('APP_ENV') === 'production';
        $domain = env('APP_ENV') === 'production' ? env('APP_DOMAIN', null) : null; // En desarrollo, usar null para evitar problemas de dominio
        $sameSite = $secure ? 'None' : 'Lax';

        $cookie = Cookie::create(
            'access_token',
            $token,
            $expiresIn, // minutes
            '/', // path
            $domain, // domain
            $secure, // secure
            true, // httponly
            false, // raw
            $sameSite // samesite
        );

        return ApiResponse::success($user, $message, $status)
            ->withCookie($cookie);
    }
}
