<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ApiResponse
{
    // 1xx Informational
    public const HTTP_CONTINUE = Response::HTTP_CONTINUE;
    public const HTTP_SWITCHING_PROTOCOLS = Response::HTTP_SWITCHING_PROTOCOLS;
    public const HTTP_PROCESSING = Response::HTTP_PROCESSING;
    public const HTTP_EARLY_HINTS = Response::HTTP_EARLY_HINTS;

    // 2xx Success
    public const HTTP_OK = Response::HTTP_OK;
    public const HTTP_CREATED = Response::HTTP_CREATED;
    public const HTTP_ACCEPTED = Response::HTTP_ACCEPTED;
    public const HTTP_NON_AUTHORITATIVE_INFORMATION = Response::HTTP_NON_AUTHORITATIVE_INFORMATION;
    public const HTTP_NO_CONTENT = Response::HTTP_NO_CONTENT;
    public const HTTP_RESET_CONTENT = Response::HTTP_RESET_CONTENT;
    public const HTTP_PARTIAL_CONTENT = Response::HTTP_PARTIAL_CONTENT;
    public const HTTP_MULTI_STATUS = Response::HTTP_MULTI_STATUS;
    public const HTTP_ALREADY_REPORTED = Response::HTTP_ALREADY_REPORTED;
    public const HTTP_IM_USED = Response::HTTP_IM_USED;

    // 3xx Redirection
    public const HTTP_MULTIPLE_CHOICES = Response::HTTP_MULTIPLE_CHOICES;
    public const HTTP_MOVED_PERMANENTLY = Response::HTTP_MOVED_PERMANENTLY;
    public const HTTP_FOUND = Response::HTTP_FOUND;
    public const HTTP_SEE_OTHER = Response::HTTP_SEE_OTHER;
    public const HTTP_NOT_MODIFIED = Response::HTTP_NOT_MODIFIED;
    public const HTTP_USE_PROXY = Response::HTTP_USE_PROXY;
    public const HTTP_RESERVED = Response::HTTP_RESERVED;
    public const HTTP_TEMPORARY_REDIRECT = Response::HTTP_TEMPORARY_REDIRECT;
    public const HTTP_PERMANENTLY_REDIRECT = Response::HTTP_PERMANENTLY_REDIRECT;

    // 4xx Client Error
    public const HTTP_BAD_REQUEST = Response::HTTP_BAD_REQUEST;
    public const HTTP_UNAUTHORIZED = Response::HTTP_UNAUTHORIZED;
    public const HTTP_PAYMENT_REQUIRED = Response::HTTP_PAYMENT_REQUIRED;
    public const HTTP_FORBIDDEN = Response::HTTP_FORBIDDEN;
    public const HTTP_NOT_FOUND = Response::HTTP_NOT_FOUND;
    public const HTTP_METHOD_NOT_ALLOWED = Response::HTTP_METHOD_NOT_ALLOWED;
    public const HTTP_NOT_ACCEPTABLE = Response::HTTP_NOT_ACCEPTABLE;
    public const HTTP_PROXY_AUTHENTICATION_REQUIRED = Response::HTTP_PROXY_AUTHENTICATION_REQUIRED;
    public const HTTP_REQUEST_TIMEOUT = Response::HTTP_REQUEST_TIMEOUT;
    public const HTTP_CONFLICT = Response::HTTP_CONFLICT;
    public const HTTP_GONE = Response::HTTP_GONE;
    public const HTTP_LENGTH_REQUIRED = Response::HTTP_LENGTH_REQUIRED;
    public const HTTP_PRECONDITION_FAILED = Response::HTTP_PRECONDITION_FAILED;
    public const HTTP_PAYLOAD_TOO_LARGE = Response::HTTP_PAYLOAD_TOO_LARGE;
    public const HTTP_URI_TOO_LONG = Response::HTTP_URI_TOO_LONG;
    public const HTTP_UNSUPPORTED_MEDIA_TYPE = Response::HTTP_UNSUPPORTED_MEDIA_TYPE;
    public const HTTP_RANGE_NOT_SATISFIABLE = Response::HTTP_RANGE_NOT_SATISFIABLE;
    public const HTTP_EXPECTATION_FAILED = Response::HTTP_EXPECTATION_FAILED;
    public const HTTP_I_AM_A_TEAPOT = Response::HTTP_I_AM_A_TEAPOT;
    public const HTTP_MISDIRECTED_REQUEST = Response::HTTP_MISDIRECTED_REQUEST;
    public const HTTP_UNPROCESSABLE_ENTITY = Response::HTTP_UNPROCESSABLE_ENTITY;
    public const HTTP_LOCKED = Response::HTTP_LOCKED;
    public const HTTP_FAILED_DEPENDENCY = Response::HTTP_FAILED_DEPENDENCY;
    public const HTTP_TOO_EARLY = Response::HTTP_TOO_EARLY;
    public const HTTP_UPGRADE_REQUIRED = Response::HTTP_UPGRADE_REQUIRED;
    public const HTTP_PRECONDITION_REQUIRED = Response::HTTP_PRECONDITION_REQUIRED;
    public const HTTP_TOO_MANY_REQUESTS = Response::HTTP_TOO_MANY_REQUESTS;
    public const HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE = Response::HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE;
    public const HTTP_UNAVAILABLE_FOR_LEGAL_REASONS = Response::HTTP_UNAVAILABLE_FOR_LEGAL_REASONS;

    // 5xx Server Error
    public const HTTP_INTERNAL_SERVER_ERROR = Response::HTTP_INTERNAL_SERVER_ERROR;
    public const HTTP_NOT_IMPLEMENTED = Response::HTTP_NOT_IMPLEMENTED;
    public const HTTP_BAD_GATEWAY = Response::HTTP_BAD_GATEWAY;
    public const HTTP_SERVICE_UNAVAILABLE = Response::HTTP_SERVICE_UNAVAILABLE;
    public const HTTP_GATEWAY_TIMEOUT = Response::HTTP_GATEWAY_TIMEOUT;
    public const HTTP_VERSION_NOT_SUPPORTED = Response::HTTP_VERSION_NOT_SUPPORTED;
    public const HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL = Response::HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL;
    public const HTTP_INSUFFICIENT_STORAGE = Response::HTTP_INSUFFICIENT_STORAGE;
    public const HTTP_LOOP_DETECTED = Response::HTTP_LOOP_DETECTED;
    public const HTTP_NOT_EXTENDED = Response::HTTP_NOT_EXTENDED;
    public const HTTP_NETWORK_AUTHENTICATION_REQUIRED = Response::HTTP_NETWORK_AUTHENTICATION_REQUIRED;

    public static function success($data = [], string $message = 'Success', int $statusCode = self::HTTP_OK): JsonResponse
    {
        return response()->json([
            'message' => $message,
            'data' => $data,
            'status' => $statusCode,
        ], $statusCode);
    }

    public static function error(string $message = 'Error', int $statusCode = self::HTTP_BAD_REQUEST, $errors = []): JsonResponse
    {
        return response()->json([
            'message' => $message,
            'errors' => $errors,
            'status' => $statusCode,
        ], $statusCode);
    }

    public static function notFound(string $message = 'Resource not found'): JsonResponse
    {
        return self::error($message, self::HTTP_NOT_FOUND);
    }

    public static function unauthorized(string $message = 'Unauthorized'): JsonResponse
    {
        return self::error($message, self::HTTP_UNAUTHORIZED);
    }

    public static function validationError(string $message = 'Validation Error', $errors = []): JsonResponse
    {
        return self::error($message, self::HTTP_UNPROCESSABLE_ENTITY, $errors);
    }
}
