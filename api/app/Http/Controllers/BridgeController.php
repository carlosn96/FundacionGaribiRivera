<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Http\Responses\ApiResponse;
use App\Models\Usuario;
use App\Http\Controllers\Traits\RespondsWithToken;
use Tymon\JWTAuth\Facades\JWTAuth;

class BridgeController extends BaseController
{
    use RespondsWithToken;
    // Get env value from Lumen env, falling back to project root .env
    private function getEnvValue(string $key): ?string
    {
        $val = env($key);
        if ($val !== null && $val !== '') {
            return $val;
        }

        $rootEnv = realpath(__DIR__ . '/../../../..') . DIRECTORY_SEPARATOR . '.env';
        if (!is_file($rootEnv)) {
            return null;
        }

        $lines = file($rootEnv, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos(trim($line), '#') === 0) {
                continue;
            }
            if (!preg_match('/^\s*' . preg_quote($key, '/') . '\s*=\s*(.*)$/', $line, $m)) {
                continue;
            }
            $raw = trim($m[1]);
            // strip surrounding quotes if any
            if ((str_starts_with($raw, '"') && str_ends_with($raw, '"')) || (str_starts_with($raw, "'") && str_ends_with($raw, "'"))) {
                $raw = substr($raw, 1, -1);
            }
            return $raw;
        }
        return null;
    }

    // Helper: base64 url decode
    private function base64UrlDecode($input)
    {
        $remainder = strlen($input) % 4;
        if ($remainder) {
            $padlen = 4 - $remainder;
            $input .= str_repeat('=', $padlen);
        }
        return base64_decode(strtr($input, '-_', '+/'));
    }

    // Verify a simple HS256 JWT using shared secret from env BRIDGE_SECRET
    private function verifyJwt($jwt)
    {
        $parts = explode('.', $jwt);
        if (count($parts) !== 3)
            return [false, 'invalid_format'];

        list($b64header, $b64payload, $b64sig) = $parts;
        $header = json_decode($this->base64UrlDecode($b64header), true);
        $payload = json_decode($this->base64UrlDecode($b64payload), true);
        if (!$header || !$payload)
            return [false, 'invalid_json'];

        $alg = $header['alg'] ?? '';
        if ($alg !== 'HS256')
            return [false, 'unsupported_alg'];

        $secret = $this->getEnvValue('BRIDGE_SECRET') ?: null;
        if (!$secret)
            return [false, 'no_secret_configured'];

        $sig = $this->base64UrlDecode($b64sig);
        $expected = hash_hmac('sha256', "$b64header.$b64payload", $secret, true);

        if (!hash_equals($expected, $sig))
            return [false, 'invalid_signature'];

        // expiration optional: check if 'exp' present
        if (isset($payload['exp']) && time() > intval($payload['exp']))
            return [false, 'expired'];

        return [true, $payload];
    }

    public function register(Request $request)
    {
        $token = $request->input('token') ?? $request->getContent();
        if (!$token) {
            return ApiResponse::error('missing_token', ApiResponse::HTTP_BAD_REQUEST);
        }

        list($ok, $result) = $this->verifyJwt($token);
        if (!$ok) {
            return ApiResponse::error('invalid_token: ' . $result, ApiResponse::HTTP_BAD_REQUEST);
        }

        // Optionally: persist a record of the bridge request for audit (omitted here)

        // Regresamos el payload validado y, para mayor utilidad, el mismo token como token_nuevo
        return ApiResponse::success(
            [
                'payload' => $result,
                'token_nuevo' => $token,
            ],
            'bridge_token_valid'
        );
    }

    public function me(Request $request)
    {
        $authHeader = $request->header('Authorization');
        if (!$authHeader || stripos($authHeader, 'Bearer ') !== 0) {
            return ApiResponse::unauthorized('missing_bearer_token');
        }

        $provided = trim(substr($authHeader, 7));
        $expected = $this->getEnvValue('BRIDGE_SECRET');

        if (!$expected || !hash_equals($expected, $provided)) {
            return ApiResponse::unauthorized('invalid_bridge_api_key');
        }

        $userId = $request->input('user_id');
        if (!$userId || !is_numeric($userId)) {
            return ApiResponse::error('missing_or_invalid_user_id', ApiResponse::HTTP_BAD_REQUEST);
        }

        $user = Usuario::find($userId);
        if (!$user) {
            return ApiResponse::notFound('User not found.');
        }

        return $this->respondWithToken(JWTAuth::fromUser($user), $user, 'User retrieved successfully.');

    }
}
