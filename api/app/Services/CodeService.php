<?php

namespace App\Services;

class CodeService
{
    /**
     * Generate a random 4-digit verification code.
     *
     * @return string
     */
    public static function generateVerificationCode()
    {
        $dictionary = "0123456789";
        return substr(str_shuffle($dictionary), 0, 4);
    }
}