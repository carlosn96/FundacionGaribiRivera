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
        // Forzamos el dominio con el punto inicial para compartir entre subdominios.
        // Solo lo dejamos en null si estamos en localhost (detección automática).
        $isLocal = in_array(request()->getHost(), ['localhost', '127.0.0.1']);
        $domain = $isLocal ? null : ('.' . env('PARENT_DOMAIN_PRODUCTION', 'fundaciongaribirivera.com'));

        return [
            'path' => '/',
            'domain' => $domain,
            'secure' => !$isLocal,
            'httpOnly' => true,
            'raw' => false,
            'sameSite' => 'None', // Indispensable para que el token cruce entre admin y emprendedores.
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
