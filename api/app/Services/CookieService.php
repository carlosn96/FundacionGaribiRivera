<?php

namespace App\Services;

use Illuminate\Support\Facades\Cookie;

class CookieService
{
    /**
     * Get common cookie attributes.
     */
    private static function getCommonAttributes()
    {
        return [
            'path' => '/',
            'domain' => env('APP_ENV') === 'production' ? '.fundaciongaribirivera.com' : null,
            'secure' => true,      // HTTPS required
            'httpOnly' => true,    // JS cannot access
            'raw' => false,
            'sameSite' => 'None',  // Allows cross-site requests if frontend is separate
        ];
    }

    /**
     * Create an access token cookie.
     */
    public static function createAccessToken($token, $minutes)
    {
        $attrs = self::getCommonAttributes();
        return Cookie::create(
            'access_token',
            $token,
            $minutes,
            $attrs['path'],
            $attrs['domain'],
            $attrs['secure'],
            $attrs['httpOnly'],
            $attrs['raw'],
            $attrs['sameSite']
        );
    }

    /**
     * Create a refresh token cookie.
     */
    public static function createRefreshToken($token, $minutes)
    {
        $attrs = self::getCommonAttributes();
        return Cookie::create(
            'refresh_token',
            $token,
            $minutes,
            $attrs['path'],
            $attrs['domain'],
            $attrs['secure'],
            $attrs['httpOnly'],
            $attrs['raw'],
            $attrs['sameSite']
        );
    }

    /**
     * Forget a cookie.
     */
    public static function forget($name)
    {
        $attrs = self::getCommonAttributes();
        return Cookie::forget($name, $attrs['path'], $attrs['domain']);
    }
}
