<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $allowedOriginsEnv = env('CORS_ALLOWED_ORIGINS', 'http://localhost');
        $origin = $request->header('Origin');
        $prodDomain = env('PARENT_DOMAIN_PRODUCTION', 'fundaciongaribirivera.com');

        $allowedOrigins = explode(',', $allowedOriginsEnv);

        // Permitir si está en el .env O si es un subdominio de la fundación en producción
        $isAllowed = in_array($origin, $allowedOrigins) || ($origin && strpos($origin, $prodDomain) !== false);

        if (!$isAllowed) {
            return $next($request);
        }

        $headers = [
            'Access-Control-Allow-Origin'      => $origin,
            'Access-Control-Allow-Methods'     => 'POST, GET, OPTIONS, PUT, DELETE',
            'Access-Control-Allow-Credentials' => 'true',
            'Access-Control-Max-Age'           => '86400',
            'Access-Control-Allow-Headers'     => 'Content-Type, Authorization, X-Requested-With, Origin'
        ];

        // For pre-flight requests (OPTIONS), return a 200 response with the headers.
        if ($request->isMethod('OPTIONS')) {
            return response()->json(['method' => 'OPTIONS'], 200, $headers);
        }

        $response = $next($request);

        // Add the headers to the final response.
        if ($response instanceof \Symfony\Component\HttpFoundation\StreamedResponse) {
            return $response;
        }

        foreach($headers as $key => $value) {
            $response->header($key, $value);
        }

        return $response;
    }
}
