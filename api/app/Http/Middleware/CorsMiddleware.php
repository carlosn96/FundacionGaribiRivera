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

        $allowedOrigins = explode(',', $allowedOriginsEnv);

        if (!in_array($origin,  $allowedOrigins)) {
            return $next($request); // If origin not allowed, continue without CORS headers
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
