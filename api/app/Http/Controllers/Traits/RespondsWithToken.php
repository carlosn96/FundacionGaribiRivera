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

        $secure = env('APP_ENV') !== 'local';

        $cookie = Cookie::create(
            'access_token',
            $token,
            $expiresIn, // minutes
            '/', // path
            null, // domain
            true, // secure (use the $secure variable)
            true, // httponly
            false, // raw
            'None' // samesite (MUST be 'None' for cross-site fetch)
        );

        return ApiResponse::success($user, $message, $status)
            ->withCookie($cookie);
    }
}
