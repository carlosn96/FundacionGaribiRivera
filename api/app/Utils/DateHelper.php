<?php

namespace App\Utils;

use Carbon\Carbon;

class DateHelper
{
    private const DATE_FORMAT = 'Y-m-d';
    private const DATETIME_FORMAT = 'Y-m-d H:i:s';

    /**
     * Obtiene la fecha actual en formato Y-m-d usando la zona horaria configurada.
     *
     * @return string
     */
    public static function getCurrentDate()
    {
        return self::format(self::now(), self::DATE_FORMAT);
    }

    /**
     * Obtiene la fecha y hora actual en formato Y-m-d H:i:s usando la zona horaria configurada.
     *
     * @return string
     */
    public static function getCurrentDateTime()
    {
        return self::format(self::now(), self::DATETIME_FORMAT);
    }

    /**
     * Formatea una fecha dada al formato especificado.
     *
     * @param string $date Fecha en cualquier formato reconocible por Carbon
     * @param string $format Formato de salida (por defecto 'Y-m-d')
     * @return string
     */
    public static function formatDate($date, $format = self::DATE_FORMAT)
    {
        return self::format(self::parse($date), $format);
    }

    /**
     * Verifica si una fecha es válida.
     *
     * @param string $date Fecha a validar
     * @param string $format Formato esperado (opcional)
     * @return bool
     */
    public static function isValidDate($date, $format = self::DATE_FORMAT)
    {
        try {
            Carbon::createFromFormat($format, $date);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Agrega días a una fecha dada.
     *
     * @param string $date Fecha base
     * @param int $days Número de días a agregar (puede ser negativo)
     * @return string Fecha resultante en Y-m-d
     */
    public static function addDays($date, $days)
    {
        return self::format(self::parse($date)->addDays($days), self::DATE_FORMAT);
    }

    /**
     * Devuelve la fecha/hora actual con la zona horaria de la app.
     */
    private static function now(): Carbon
    {
        return Carbon::now();
    }

    /**
     * Convierte una fecha textual a una instancia Carbon.
     */
    private static function parse($date): Carbon
    {
        return Carbon::parse($date);
    }

    /**
     * Formatea una instancia Carbon usando el formato indicado.
     */
    private static function format(Carbon $date, string $format): string
    {
        return $date->format($format);
    }
}