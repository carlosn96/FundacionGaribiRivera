<?php
include_once '../../loader.php';


class BridgeValidator {

    // Helper: base64 url decode
    private static function base64UrlDecode($input) {
        $remainder = strlen($input) % 4;
        if ($remainder) {
            $padlen = 4 - $remainder;
            $input .= str_repeat('=', $padlen);
        }
        return base64_decode(strtr($input, '-_', '+/'));
    }

    // Verify a simple HS256 JWT using shared secret from env BRIDGE_SECRET
    public static function verifyJwt($jwt) {
        if (empty($jwt) || !is_string($jwt)) {
            return [false, 'invalid_token'];
        }
        $parts = explode('.', $jwt);
        if (count($parts) !== 3)
            return [false, 'invalid_format'];

        list($b64header, $b64payload, $b64sig) = $parts;
        $header = json_decode(self::base64UrlDecode($b64header), true);
        $payload = json_decode(self::base64UrlDecode($b64payload), true);
        if (!$header || !$payload)
            return [false, 'invalid_json'];

        $alg = $header['alg'] ?? '';
        if ($alg !== 'HS256')
            return [false, 'unsupported_alg'];

        $secret = BRIDGE_SECRET ?? null;
        if (!$secret)
            return [false, 'no_secret_configured'];

        $sig = self::base64UrlDecode($b64sig);
        $expected = hash_hmac('sha256', "$b64header.$b64payload", $secret, true);

        if (!hash_equals($expected, $sig))
            return [false, 'invalid_signature'];

        // expiration optional: check if 'exp' present
        if (isset($payload['exp']) && time() > intval($payload['exp']))
            return [false, 'expired'];

        // check source for security
        if (!isset($payload['issued_by']) || $payload['issued_by'] !== 'new_app_v1')
            return [false, 'invalid_source'];

        // validate all required payload keys
        $requiredKeys = ['issued_by', 'user_id', 'email', 'timestamp', 'exp'];
        foreach ($requiredKeys as $key) {
            if (!isset($payload[$key])) {
                return [false, 'missing_payload_key_' . $key];
            }
        }
        if (!is_numeric($payload['user_id']) || intval($payload['user_id']) <= 0) {
            return [false, 'invalid_user_id'];
        }
        if (!is_numeric($payload['timestamp']) || intval(value: $payload['timestamp']) <= 0) {
            return [false, 'invalid_timestamp'];
        }        // check timestamp is not too old (e.g., within 5 minutes)
        if (time() - intval($payload['timestamp']) > 300) {
            return [false, 'timestamp_too_old'];
        }        if (!is_numeric($payload['exp']) || intval($payload['exp']) <= time()) {
            return [false, 'invalid_or_expired_exp'];
        }
        // email can be basic validation
        if (!filter_var($payload['email'], FILTER_VALIDATE_EMAIL)) {
            return [false, 'invalid_email'];
        }

        return [true, $payload];
    }
}