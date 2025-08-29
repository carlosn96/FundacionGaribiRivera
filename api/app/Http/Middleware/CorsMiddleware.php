<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Orígenes permitidos para las solicitudes. Ajusta esto según sea necesario.
        $allowedOrigins = ['http://localhost:3000', 'http://localhost:9002', 'http://localhost'];

        $origin = $request->header('Origin');

        // Si el origen de la solicitud está en nuestra lista de permitidos, configuramos las cabeceras.
        if (in_array($origin, $allowedOrigins)) {
            $headers = [
                'Access-Control-Allow-Origin'      => $origin,
                'Access-Control-Allow-Methods'     => 'POST, GET, OPTIONS, PUT, DELETE',
                'Access-Control-Allow-Credentials' => 'true',
                'Access-Control-Max-Age'           => '86400',
                'Access-Control-Allow-Headers'     => 'Content-Type, Authorization, X-Requested-With, Origin'
            ];

            // Para solicitudes de pre-vuelo (OPTIONS), devolvemos una respuesta 200 con las cabeceras.
            if ($request->isMethod('OPTIONS')) {
                return response()->json(['method' => 'OPTIONS'], 200, $headers);
            }

            $response = $next($request);
            
            // Añadimos las cabeceras a la respuesta final.
            if ($response instanceof \Symfony\Component\HttpFoundation\StreamedResponse) {
                return $response;
            }
            
            foreach($headers as $key => $value) {
                $response->header($key, $value);
            }

            return $response;
        }

        // Si el origen no está permitido, continuamos sin añadir las cabeceras CORS.
        return $next($request);
    }
}
