<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Responses\ApiResponse;
use App\Services\MailService;
use App\Services\SessionService;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;

class AuthController extends Controller
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

            // Generate JWT token for the verified email
            $customClaims = ['email' => $correo];
            $payload = JWTFactory::make($customClaims);
            $token = JWTAuth::encode($payload);

            return ApiResponse::success(['verified' => $verified, 'token' => $token], $msg);
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
        $validator = Validator::make(
            $request->all(), [
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'correo_electronico' => 'required|email|unique:usuarios,correo_electronico',
            'numero_celular' => 'required|string|max:15',
            'contrasena' => 'required|string|min:6',
            'estado_activo' => 'required|in:activo,inactivo',
            'tipo_usuario' => 'required|integer',
            ]
        );

        if ($validator->fails()) {
            return ApiResponse::error(
                'Validation failed',
                ApiResponse::HTTP_UNPROCESSABLE_ENTITY,
                $validator->errors()
            );
        }

        try {
            $user = Usuario::create(
                [
                'nombre' => $request->input('nombre'),
                'apellidos' => $request->input('apellidos'),
                'correo_electronico' => $request->input('correo_electronico'),
                'numero_celular' => $request->input('numero_celular'),
                'contrasena' => Hash::make($request->input('contrasena')),
                'estado_activo' => $request->input('estado_activo'),
                'tipo_usuario' => $request->input('tipo_usuario'),
                'fotografia' => Util::obtenerFotografiaRand(),
                ]
            );

            return ApiResponse::success(
                ['user_id' => $user->id],
                'User registered successfully',
                201
            );

        } catch (\Exception $e) {
            return ApiResponse::error(
                'User registration failed',
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

}
