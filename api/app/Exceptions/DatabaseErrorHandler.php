<?php

namespace App\Exceptions;
use Throwable;

class DatabaseErrorHandler
{
    /**
     * Mensajes base por familia SQLSTATE (2 primeros caracteres).
     */
    private const SQLSTATE_CLASS_MESSAGES = [
        '08' => 'Tenemos un inconveniente de conectividad con nuestros sistemas. Por favor, intenta nuevamente en unos minutos.',
        '0A' => 'La operación solicitada no está disponible en este momento. Por favor, intenta más tarde.',
        '22' => 'Algunos datos no tienen el formato esperado. Por favor, revisa la información ingresada.',
        '23' => 'No se pudo completar la operación por una regla de integridad de datos. Verifica la información e inténtalo de nuevo.',
        '24' => 'No fue posible completar la consulta en este momento. Intenta nuevamente.',
        '25' => 'La operación no pudo completarse por el estado actual de la transacción. Intenta nuevamente.',
        '28' => 'Tenemos un inconveniente de autenticación con el servicio de datos. Por favor, intenta más tarde.',
        '40' => 'La operación fue interrumpida para proteger la consistencia de los datos. Intenta nuevamente.',
        '42' => 'Se presentó un inconveniente interno al procesar la solicitud. Nuestro equipo puede revisarlo.',
        '53' => 'El sistema está temporalmente saturado de recursos. Por favor, intenta nuevamente más tarde.',
        '54' => 'La operación excedió un límite interno del sistema. Por favor, intenta con una solicitud más simple.',
        '55' => 'No se pudo completar la operación por el estado actual del sistema. Intenta nuevamente.',
        '57' => 'La operación fue detenida temporalmente por mantenimiento u operación interna. Intenta más tarde.',
        '58' => 'Se detectó un error interno del sistema de datos. Por favor, intenta nuevamente más tarde.',
        'HY' => 'Se presentó un error general en el acceso a datos. Por favor, intenta nuevamente más tarde.',
    ];

    /**
     * Heurísticas por mensaje para detectar casos frecuentes sin depender de códigos concretos.
     */
    private const KEYWORD_RULES = [
        'duplicate|already exists|unique|duplicado|ya existe' => 'Parece que esta información ya está registrada. Por favor, verifica que no haya datos duplicados.',
        'foreign key|referential|constraint fails|llave foranea|clave foranea' => 'No se puede procesar la solicitud porque faltan datos relacionados o están siendo utilizados por otro proceso.',
        'deadlock|serialization failure|lock wait timeout|could not serialize' => 'Detectamos concurrencia en el sistema al guardar tus datos. Intenta nuevamente en unos segundos.',
        'timeout|timed out|server has gone away|connection refused|could not connect|no such host' => 'Tenemos un inconveniente temporal de conexión con el servicio de datos. Por favor, intenta nuevamente más tarde.',
        'data too long|out of range|invalid datetime|incorrect .* value|truncated' => 'Algunos datos no cumplen el formato esperado. Revisa la información capturada.',
        'table .* doesn\'t exist|unknown column|syntax error|permission denied|access denied' => 'Se presentó un inconveniente interno al procesar la solicitud. Nuestro equipo puede revisarlo.',
    ];

    private const FALLBACK_MESSAGE = 'Estamos experimentando dificultades temporales con nuestros sistemas. Por favor, intenta nuevamente más tarde.';

    /**
     * Traduce una excepción de base de datos a un mensaje amigable para el usuario.
     *
     * @param Throwable $exception
     * @return array Mensaje amigable para el usuario contenido en un array con detalles si se requiere información adicional.
     */
    public static function handle(Throwable $exception): array
    {
        $metadata = self::extractMetadata($exception);

        // Priorizamos vendorCode porque describe con mayor precisión el error real del motor.
        $message = self::resolveByVendorCode(
            $metadata['vendorCode'],
            $metadata['normalizedMessage']
        );
        if ($message === null) {
            $message = self::resolveBySqlState(
            $metadata['sqlState'],
            $metadata['vendorCode'],
            $metadata['normalizedMessage']
            );
        }
        if ($message === null) {
            $message = self::resolveByKeyword($metadata['normalizedMessage']);
        }
        if ($message === null) {
            $message = self::FALLBACK_MESSAGE;
        }

        if (self::isDebugEnabled()) {
            $message .= ' [Trace interno: ' . $exception->getMessage() . ']';
        }

        return [
            'message' => $message,
            'details' => $exception->getMessage(),
        ];
    }

    /**
     * Clasificación por códigos de proveedor (vendor-specific), prioritaria.
     */
    private static function resolveByVendorCode($vendorCode, string $normalizedMessage): ?string
    {
        if (!is_numeric($vendorCode)) {
            return null;
        }

        $code = (int) $vendorCode;

        // Conectividad
        if (in_array($code, [2002, 2003, 2006, 2013], true)) {
            return self::SQLSTATE_CLASS_MESSAGES['08'];
        }

        // Integridad y duplicados
        if ($code === 1062) {
            return 'Parece que esta información ya está registrada. Por favor, verifica que no haya datos duplicados.';
        }
        if (in_array($code, [1451, 1452], true)) {
            return 'No se puede procesar la solicitud porque faltan datos relacionados o están siendo utilizados por otro proceso.';
        }

        // Formato y dominio de datos
        if (in_array($code, [1264, 1292, 1366, 1406], true)) {
            return self::SQLSTATE_CLASS_MESSAGES['22'];
        }

        // Afinación: algunos códigos de conexión vienen como HY000 + mensaje.
        if (self::hasConnectionSignal($vendorCode, $normalizedMessage)) {
            return self::SQLSTATE_CLASS_MESSAGES['08'];
        }

        return null;
    }

    /**
     * Extrae metadata uniforme para distintos drivers de base de datos.
     *
     * @param Throwable $exception
     * @return array{sqlState: ?string, vendorCode: int|string|null, normalizedMessage: string}
     */
    private static function extractMetadata(Throwable $exception): array
    {
        $sqlState = null;
        $vendorCode = null;

        if (isset($exception->errorInfo) && is_array($exception->errorInfo)) {
            if (isset($exception->errorInfo[0]) && is_string($exception->errorInfo[0]) && strlen($exception->errorInfo[0]) >= 2) {
                $sqlState = strtoupper(substr($exception->errorInfo[0], 0, 5));
            }

            if (isset($exception->errorInfo[1])) {
                $vendorCode = $exception->errorInfo[1];
            }
        }

        if ($sqlState === null) {
            $code = (string) $exception->getCode();
            if (preg_match('/^[A-Za-z0-9]{5}$/', $code) === 1) {
                $sqlState = strtoupper($code);
            }
        }

        return [
            'sqlState' => $sqlState,
            'vendorCode' => $vendorCode,
            'normalizedMessage' => self::normalizeMessage($exception->getMessage()),
        ];
    }

    /**
     * Clasifica por SQLSTATE class (dos primeros caracteres) para mantener escalabilidad.
     */
    private static function resolveBySqlState(?string $sqlState, $vendorCode = null, string $normalizedMessage = ''): ?string
    {
        if ($sqlState === null || strlen($sqlState) < 2) {
            return null;
        }

        $classCode = substr($sqlState, 0, 2);
        if (isset(self::SQLSTATE_CLASS_MESSAGES[$classCode])) {
            return self::SQLSTATE_CLASS_MESSAGES[$classCode];
        }

        // Algunos drivers usan HYxxx para errores generales.
        if (str_starts_with($sqlState, 'HY')) {
            // HY000 es genérico; afinamos con señales de conexión para capturar casos como [2002].
            if (self::hasConnectionSignal($vendorCode, $normalizedMessage)) {
                return self::SQLSTATE_CLASS_MESSAGES['08'];
            }

            return self::SQLSTATE_CLASS_MESSAGES['HY'];
        }

        return null;
    }

    /**
     * Detecta señales de conectividad sin depender de un único código de proveedor.
     */
    private static function hasConnectionSignal($vendorCode, string $normalizedMessage): bool
    {
        $connectionVendorCodes = [
            2002, // No se pudo conectar (MySQL)
            2003, // No route/host
            2006, // Server has gone away
            2013, // Lost connection during query
        ];

        return (is_numeric($vendorCode) && in_array((int) $vendorCode, $connectionVendorCodes, true)) ||
            preg_match('/connection refused|could not connect|no such host|server has gone away|lost connection|actively refused|connection timed out/i', $normalizedMessage) === 1;
    }

    /**
     * Heurística por contenido del mensaje para cubrir variaciones entre motores y versiones.
     */
    private static function resolveByKeyword(string $normalizedMessage): ?string
    {
        foreach (self::KEYWORD_RULES as $pattern => $friendlyMessage) {
            if (preg_match('/' . $pattern . '/i', $normalizedMessage) === 1) {
                return $friendlyMessage;
            }
        }

        return null;
    }

    private static function normalizeMessage(string $message): string
    {
        $message = trim($message);
        return preg_replace('/\s+/', ' ', $message) ?? $message;
    }

    private static function isDebugEnabled(): bool
    {
        return (bool) env('APP_DEBUG', false);
    }
}
