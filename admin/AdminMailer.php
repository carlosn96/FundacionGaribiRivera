<?php

/**
 * Description of AdminMailer
 *
 * @author JuanCarlos
 */
require_once 'PHPMailer/PHPMailer.php';
require_once 'PHPMailer/SMTP.php';

use PHPMailer\PHPMailer;

class AdminMailer {

    private static function enviarCorreo($destinatario, $asunto, $tipo, $body) {
        $mailer = new PHPMailer(true);
        $mailer->isSMTP();
        $mailer->Host = MAIL_HOST;
        $mailer->SMTPAuth = true;
        $mailer->Username = MAIL_USERNAME;
        $mailer->Password = MAIL_PASSWORD;
        $mailer->SMTPSecure = MAIL_ENCRYPTION;
        $mailer->Port = MAIL_PORT;
        $mailer->CharSet = 'UTF-8';
        $mailer->Encoding = 'base64';
        $mailer->setFrom(MAIL_FROM_ADDRESS, MAIL_FROM_NAME);
        $mailer->addAddress($destinatario);
        $mailer->Subject = $asunto;
        $mailer->isHTML(true);
        $template = file_get_contents(ROOT_APP . 'public/assets/plantillas/correo.html');
        $mailer->Body = str_replace("{TIPO_CORREO}", $tipo, str_replace('{year}', date('Y'), str_replace('{CONTENIDO}', $body, $template)));
        $mailer->addEmbeddedImage(ROOT_APP . 'public/assets/images/logos/logoLight.png', 'logo_cid');
        return $mailer->send();
    }

    public static function enviarCorreoRestablecerCuenta($destinatario, $codigoVerificacion) {
        $body = "<p>Ha solicitado restablecer su contraseña. Por favor, use el siguiente código para completar el proceso:</p>
                <p style='font-size: 24px; font-weight: bold; text-align: center;'>$codigoVerificacion</p>
                <p>Si no solicitó este cambio, por favor, ignore este correo electrónico.</p>";
        return self::enviarCorreo($destinatario, "Restablecer contraseña", "Restablecimiento de contraseña", $body);
    }

    public static function enviarCorreoVerificacionCuenta($destinatario, $codigoVerificacion) {
        $body = "<p>Utilice el siguiente código para verificar su cuenta: </p>
                <p style='font-size: 24px; font-weight: bold; text-align: center;'>$codigoVerificacion</p>
                <p>Si no solicitó verificar su cuenta, por favor, ignore este correo electrónico.</p>";
        return self::enviarCorreo($destinatario, "Validar cuenta nueva", 'Creación de cuenta', $body);
    }

}
