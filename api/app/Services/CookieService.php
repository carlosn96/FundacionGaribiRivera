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
        $host = request()->getHost();
        $prodDomain = env('PARENT_DOMAIN_PRODUCTION', 'fundaciongaribirivera.com');

        if (strpos($host, $prodDomain) !== false) {
            $domain = '.' . $prodDomain;
            $secure = true;
            $sameSite = 'None';
        } else {
            $domain = null;
            $secure = false;
            $sameSite = 'Lax';
        }

        return [
            'path' => '/',
            'domain' => $domain,
            'secure' => $secure,
            'httpOnly' => true,
            'raw' => false,
            'sameSite' => $sameSite,
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
