<?php

namespace App\Utils;

/**
 * Clase de utilidades para validaciones de datos.
 */
class StringHelper
{
    /**
     * Valida que una cadena no sea null y no esté vacía (después de quitar espacios en blanco).
     *
     * @param string|null $string La cadena a validar.
     * @return bool True si la cadena no es null y no está vacía, false en caso contrario.
     */
    public static function isNotNullAndNotEmpty(?string $string): bool
    {
        return !is_null($string) && trim($string) !== '';
    }

    /**
     * Valida que una clave exista en un array y que su valor no esté vacío.
     *
     * @param array $array El array a validar.
     * @param string $key La clave a verificar.
     * @return bool True si la clave existe y su valor no está vacío, false en caso contrario.
     */
    public static function isArrayKeyValid(array $array, string $key): bool
    {
        return isset($array[$key]) && trim($array[$key]) !== '';
    }

    /**
     * Obtiene el valor de una clave en un array si existe y no está vacío, de lo contrario devuelve null.
     *
     * @param array $array El array.
     * @param string $key La clave.
     * @return string|null El valor si es válido, null en caso contrario.
     */
    public static function getValidValueOrNull(array $array, string $key): ?string
    {
        return ($array[$key] ?? '') ?: null;
    }

    public static function intValue(string $value): ?int
    {
        return intval(is_null($value) || trim($value) === '' ? 0 : $value);
    }

    public static function floatValue(string $value): ?float
    {
        return floatval(is_null($value) || trim($value) === '' ? 0 : $value);
    }

    public static function boolValue($value): ?bool
    {
        return filter_var(is_null($value) || trim($value) === '' ? 0 : $value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
    }

    public static function cleanString(string $value): ?string
    {
        if (is_null($value)) {
            return null;
        }
        $trimmed = trim($value);
        return $trimmed === '' ? null : $trimmed;
    }

    public static function cleanArrayStringValue(array $array, string $key): ?string
    {
        if (!isset($array[$key])) {
            return null;
        }
        $trimmed = trim($array[$key]);
        return $trimmed === '' ? null : $trimmed;
    }

    public static function cleanArrayString(array &$array) {
        foreach ($array as $key => $value) {
            if (is_string($value)) {
                $trimmed = trim($value);
                $array[$key] = $trimmed === '' ? null : $trimmed;
            }
        }
    }


}