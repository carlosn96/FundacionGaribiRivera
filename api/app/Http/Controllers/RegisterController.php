<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Responses\ApiResponse;
use App\Services\MailService;
use App\Services\SessionService;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\Exceptions\JWTException;

class RegisterController extends Controller
{
    public function verifyEmail(Request $request)
    {
        $this->validate(
            $request, [
            'correo' => 'required|email',
            'nombre' => 'required|string|max:255',
            ]
        );
        $correo = $request->input('correo');
        if (Usuario::where('correo_electronico', $correo)->first()) {
            return ApiResponse::success(['exists' => true], "El correo electronico {$correo} ya se encuentra registrado");
        }
        if (!$this->sendCode($correo, $request->input('nombre'))) {
            return ApiResponse::error('No se pudo verificar el correo electrónico', ApiResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
        return ApiResponse::success(['exists' => false], "El correo electrónico {$correo} está disponible");
    }


    public function verifyCode(Request $request)
    {
        $this->validate(
            $request, [
            'correo' => 'required|email',
            'codigo' => 'required|string|max:4',
            ]
        );
    
        $correo = $request->input('correo');
        $codigo = $request->input('codigo');
        $storedCode = SessionService::get($correo);
    
        if (($verified = intval($storedCode) === intval($codigo))) {
            SessionService::unset($correo);
            $msg = 'Correo verificado exitosamente';
            $now = Carbon::now();
            $exp = $now->copy()->addMinutes(15);

            // Claims JWT completos
            $customClaims = [
            'sub' => $correo,                  // identificador único (temporal)
            'email' => $correo,               // info adicional
            'iat' => $now->timestamp,         // emitido en
            'exp' => $exp->timestamp,         // expira en 15 min
            'nbf' => $now->timestamp,         // válido desde ahora
            'iss' => 'fundacion-api',         // identificador del emisor
            'jti' => uniqid(),                // JWT ID único
            ];
        
            $payload = JWTFactory::customClaims($customClaims)->make();
            $token = JWTAuth::encode($payload)->get();
        
            $secure = env('APP_ENV') !== 'local';

            $cookie = Cookie::create(
                'access_token',
                $token,
                15, // minutes
                '/', // path
                null, // domain
                $secure, // secure
                true, // httponly
                false, // raw
                'None' // samesite
            );
            return ApiResponse::success(['verified' => $verified], $msg)->withCookie($cookie);
        } else {
            $msg = 'Código de verificación incorrecto, inténtalo de nuevo';
            return ApiResponse::success(['verified' => $verified], $msg);
        }
    }

    public function resendCodeVerifyAccount(Request $request)
    {
        $this->validate(
            $request, [
            'correo' => 'required|email',
            'nombre' => 'required|string|max:255',
            ]
        );
        $codeSent = $this->sendCode($request->input('correo'), $request->input('nombre'));
        return ApiResponse::success(
            ['resent' => $codeSent],
            $codeSent ? 'Código de verificación reenviado' : 'No se pudo reenviar el código de verificación, intente más tarde'
        );
    }

    private function sendCode($correo, $nombre)
    {
        $codigo = self::getAccountValidationCode();
        if(($emailSent = MailService::enviarCorreoVerificacionCuenta(
            $correo,
            $nombre,
            $codigo
        ))
        ) {
             SessionService::set($correo, $codigo);
        }
        return $emailSent;
    }

    public function register(Request $request)
    {
        try {
            $payload = JWTAuth::getPayload();
            $emailFromToken = $payload->get('email');
        } catch (JWTException $e) {
            return ApiResponse::error(
                'Token inválido, expirado o no proporcionado.',
                ApiResponse::HTTP_UNAUTHORIZED,
                ['exception' => $e->getMessage()]
            );
        }

        $validator = Validator::make(
            $request->all(),
            [
                'nombre' => 'required|string|max:255',
                'apellidos' => 'required|string|max:255',
                'correo' => 'required|email|unique:usuario,correo_electronico',
                'numero_celular' => 'required|string|max:15',
                'contrasena' => 'required|string|min:6'
            ]
        );

        if ($validator->fails()) {
            return ApiResponse::error(
                'Error de validación: '.print_r($validator->errors()->all()),
                ApiResponse::HTTP_UNPROCESSABLE_ENTITY,
                $validator->errors()
            );
        }

        if ($request->input('correo') !== $emailFromToken) {
            return ApiResponse::error(
                'El correo electrónico no coincide con el correo verificado.',
                ApiResponse::HTTP_BAD_REQUEST
            );
        }

        try {
            $user = Usuario::create(
                [
                    'nombre' => $request->input('nombre'),
                    'apellidos' => $request->input('apellidos'),
                    'correo_electronico' => $emailFromToken,
                    'numero_celular' => $request->input('numero_celular'),
                    'contrasena' => Hash::make($request->input('contrasena')),
                    'tipo_usuario' => 1,
                    'fotografia' => self::obtenerFotografiaRand(),
                ]
            );

            return ApiResponse::success(
                ['user_id' => $user->id],
                'Registro completo. Ya puedes iniciar sesión.',
                201
            );
        } catch (\Exception $e) {
            return ApiResponse::error(
                'No se pudo registrar al usuario.',
                ApiResponse::HTTP_INTERNAL_SERVER_ERROR,
                ['exception' => $e->getMessage()]
            );
        }
    }


    private static function getAccountValidationCode()
    {
        $dictionary = "0123456789";
        return substr(str_shuffle($dictionary), 0, 4);
    }

    private static function obtenerFotografiaRand()
    {
        $fotos = [];
        $dir = base_path("../public/assets/images/profile");
        if (is_dir($dir)) {
            $archivos = array_diff(scandir($dir), array('.', '..'));
            foreach ($archivos as $fotografias) {
                $fotos[] = $dir . DIRECTORY_SEPARATOR . $fotografias;
            }
        }
        return file_get_contents($fotos[rand(0, count($fotos) - 1)]);
    }

}
