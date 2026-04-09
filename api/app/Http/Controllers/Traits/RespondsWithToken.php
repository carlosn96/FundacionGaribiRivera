<?php

namespace App\Http\Controllers\Traits;

use App\Http\Responses\ApiResponse;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Services\CookieService;

trait RespondsWithToken
{
    protected function respondWithToken($token, $user, $message = 'Authenticated', $status = 200)
    {
        $expiresIn = JWTAuth::factory()->getTTL(); // en minutos
        $cookie = CookieService::createAccessToken($token, $expiresIn);

        // Crear refresh token con TTL más largo
        $refreshTtl = config('jwt.refresh_ttl', 20160); // 2 semanas por defecto
        JWTAuth::factory()->setTTL($refreshTtl);
        $refreshToken = JWTAuth::fromUser($user);
        // Reset TTL al valor original (puede ser 15, 60, etc. dependiéndo de rememberMe)
        JWTAuth::factory()->setTTL($expiresIn);

        $refreshCookie = CookieService::createRefreshToken($refreshToken, $refreshTtl);

        return ApiResponse::success(array_merge($user->toArray(), ['access_token' => $token]), $message, $status)
            ->withCookie($cookie)
            ->withCookie($refreshCookie);
    }
}
