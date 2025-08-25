<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;

class SessionService
{
    /**
     * Set a value in the session.
     *
     * @param  string $key
     * @param  mixed  $value
     * @return void
     */
    public static function set(string $key, $value): void
    {
        Cache::put('session_service:' . $key, $value, 600);
    }

    public static function unset(string $key): void
    {
        Cache::forget('session_service:' . $key);
    }

    /**
     * Get a value from the session.
     *
     * @param  string $key
     * @return mixed
     */
    public static function get(string $key)
    {
        return Cache::get('session_service:' . $key) ?? [];
    }
}
