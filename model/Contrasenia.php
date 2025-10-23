<?php
class Contrasenia
{
    public const TIPO_CONTRASENA_NUMERICA = 1;
    public const TIPO_CONTRASENA_ALFANUMERICA = 2;
    private const ALBAFETO_MINUSCULAS = 'abcdefghijklmnopqrstuvwxyz';
    private const ALBAFETO_MAYUSCULAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    private const NUMEROS = '0123456789';
    private const SIMBOLOS = '!@#$%^&*()-_=+[]{}|;:,.<>?';
    public const ALBAFETO_COMPLETO = ALBAFETO_MINUSCULAS + ALBAFETO_MAYUSCULAS + NUMEROS + SIMBOLOS;

    public static function generarContrasenaRand(int $longitud = 8, int $tipo = self::TIPO_CONTRASENA_ALFANUMERICA): string
    {

        if($longitud <= 0) {
            throw new InvalidArgumentException("La longitud de la contraseña debe ser mayor a cero.");
        } else if ($longitud > 10) {
            throw new InvalidArgumentException("La longitud de la contraseña no debe exceder 128 caracteres.");
        }

        $caracteres = '';

        switch ($tipo) {
            case self::TIPO_CONTRASENA_NUMERICA:
                $caracteres = self::NUMEROS;
                break;
            case self::TIPO_CONTRASENA_ALFANUMERICA:
                $caracteres = self::ALBAFETO_MINUSCULAS . self::ALBAFETO_MAYUSCULAS;
                break;
            default:
                $caracteres = self::ALBAFETO_COMPLETO;
                break;
        }

        $contrasena = '';
        $maxIndex = strlen($caracteres) - 1;
        for ($i = 0; $i < $longitud; $i++) {
            $index = random_int(0, $maxIndex);
            $contrasena .= $caracteres[$index];
        }
        return $contrasena;
    }

}