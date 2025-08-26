<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use App\Http\Responses\ApiResponse;

class JwtFromCookieMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $token = $request->cookie('access_token');

        if (!$token) {
            return ApiResponse::unauthorized('Token not provided in cookie.');
        }

        try {
            JWTAuth::setToken($token)->authenticate();
        } catch (TokenExpiredException $e) {
            return ApiResponse::unauthorized('Token has expired.');
        } catch (TokenInvalidException $e) {
            return ApiResponse::unauthorized('Token is invalid.');
        } catch (JWTException $e) {
            return ApiResponse::unauthorized('Token could not be parsed from the cookie.');
        }

        return $next($request);
    }
}
