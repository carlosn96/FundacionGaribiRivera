<?php

namespace App\Services;

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
        $_SESSION[$key] = $value;
    }

    public static function unset(string $key): void
    {
        unset($_SESSION[$key]);
    }

    /**
     * Get a value from the session.
     *
     * @param  string $key
     * @return mixed
     */
    public static function get(string $key)
    {
        return $_SESSION[$key] ?? [];
    }
}
