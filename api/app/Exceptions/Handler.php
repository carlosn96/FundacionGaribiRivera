<?php

namespace App\Exceptions;

use App\Http\Responses\ApiResponse;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Laravel\Lumen\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;
use App\Exceptions\DatabaseErrorHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        AuthorizationException::class,
        HttpException::class,
        ModelNotFoundException::class,
        ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {
        if ($this->isDatabaseException($exception)) {
            return ApiResponse::errorInterno(DatabaseErrorHandler::handle($exception));
        }
        return parent::render($request, $exception);
    }

    /**
     * Verifica si la excepción es de tipo base de datos.
     *
     * @param Throwable $exception
     * @return bool
     */
    protected function isDatabaseException(Throwable $exception): bool
    {
        $isQueryException = class_exists('\Illuminate\Database\QueryException') && $exception instanceof \Illuminate\Database\QueryException;
        $isPDOException = $exception instanceof \PDOException;
        return $isPDOException || $isQueryException;
    }
}
