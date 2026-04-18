<?php

namespace App\Services;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class MailService
{

    private static function sendMail(string $toEmail, string $toName, string $subject, string $type, string $content)
    {
        $mail = new PHPMailer(true); // Passing true enables exceptions
        $mail->isSMTP();
        $mail->Host = env('MAIL_HOST');
        $mail->SMTPAuth = true;
        $mail->Username = env('MAIL_USERNAME');
        $mail->Password = env('MAIL_PASSWORD');
        $mail->SMTPSecure = env('MAIL_ENCRYPTION', 'tls');
        $mail->Port = env('MAIL_PORT', 587);
        $mail->CharSet = 'UTF-8'; // Set CharSet
        $mail->Encoding = 'base64'; // Set Encoding
        
        try {
            $mail->setFrom(env('MAIL_FROM_ADDRESS', 'no-reply@example.com'), env('MAIL_FROM_NAME', 'Mailer'));
            $mail->addAddress($toEmail, $toName);
            $mail->Subject = $subject;
            $mail->isHTML(true);
            // Load HTML template
            $templatePath = base_path('../public/assets/plantillas/correo_new.html');
            if (!file_exists($templatePath)) {
                throw new Exception('Email template not found: ' . $templatePath);
            }
            $template = file_get_contents($templatePath);
            // Replace placeholders
            $body = str_replace("{TIPO_CORREO}", $type, str_replace('{year}', date('Y'), str_replace('{CONTENIDO}', $content, $template)));
            $mail->Body = str_replace("{NOMBRE_USUARIO}", htmlspecialchars($toName, ENT_QUOTES, 'UTF-8'), $body);
            $mail->AltBody = strip_tags($content); // Plain text version
            $logoPath = base_path('../public/assets/images/logos/logoLight.png');
            if (file_exists($logoPath)) {
                $mail->addEmbeddedImage($logoPath, 'logo_cid');
            } else {
                error_log("Email logo not found: " . $logoPath);
            }
            return $mail->send();
        } catch (Exception $e) {
            error_log("Message could not be sent to {$toEmail}. Mailer Error: {$mail->ErrorInfo}. Exception: {$e->getMessage()}");
            return false;
        }
    }

    public static function enviarCorreoRestablecerCuenta($destinatario, $nombreDestinatario, $codigoVerificacion)
    {
        $body = "<p>Ha solicitado restablecer su contraseña. Por favor, use el siguiente código para completar el proceso:</p>
                <p style='font-size: 24px; font-weight: bold; text-align: center;'>$codigoVerificacion</p>
                <p>Si no solicitó este cambio, por favor, ignore este correo electrónico.</p>";
        return self::sendMail($destinatario, $nombreDestinatario, "Restablecer contraseña", "Restablecimiento de contraseña", $body);
    }

    public static function enviarCorreoVerificacionCuenta($destinatario, $nombreDestinatario, $codigoVerificacion)
    {
        $body = "<p>Utilice el siguiente código para verificar su cuenta: </p>
                <p style='font-size: 24px; font-weight: bold; text-align: center;'>$codigoVerificacion</p>
                <p>Si no solicitó verificar su cuenta, por favor, ignore este correo electrónico.</p>";
        return self::sendMail($destinatario, $nombreDestinatario, "Validar cuenta nueva", 'Creación de cuenta', $body);
    }
}
