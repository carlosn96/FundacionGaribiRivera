<?php

namespace App\Models;

class TipoUsuario
{
    public const EMPRENDEDOR = 1;
    public const ASISTENTE = 2; // Nuevo tipo para asistentes

    private static $tiposUsuario = [
        self::EMPRENDEDOR => ["rol" => "Emprendedor"],
        self::ASISTENTE => ["rol" => "Asistente"],
    ];

    public static function get($tipo)
    {
        return self::$tiposUsuario[$tipo] ?? 'Desconocido';
    }
}
