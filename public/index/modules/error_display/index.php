<!DOCTYPE html>
<html lang="es">

<head>
    <?php require_once '../../includes/head.php'; ?>
</head>

<body>
    <?php require_once '../../../assets/commons/preloader.php'; ?>

    <div class="auth-page">
        <div class="auth-container">
            <div class="auth-logo">
                <a href="https://fundaciongaribirivera.com/" target="_blank">
                    <img src="../../../assets/images/logos/logo-dark.svg" alt="Logo">
                </a>
            </div>

            <div class="auth-card">
                <div class="auth-header auth-header--center">
                    <div class="auth-icon-circle auth-icon-circle--danger">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <h1 class="auth-title">Error de Inicio de Sesión</h1>
                    <p class="auth-subtitle">Ha ocurrido un error al procesar su solicitud</p>
                </div>

                <?php
                $error = $_GET['error'] ?? null;
                if ($error) {
                    $messages = [
                        'invalid_token' => 'Token inválido o ausente.',
                        'missing_user_id' => 'Usuario no encontrado.',
                        'user_not_found' => 'Usuario no encontrado.',
                        'invalid_format' => 'Formato de token inválido.',
                        'invalid_json' => 'Datos del token inválidos.',
                        'unsupported_alg' => 'Algoritmo de token no soportado.',
                        'no_secret_configured' => 'Configuración de seguridad faltante. Contacte al administrador.',
                        'invalid_signature' => 'Firma del token inválida.',
                        'expired' => 'Token expirado.',
                        'invalid_source' => 'Origen del token inválido.',
                        'missing_payload_key_issued_by' => 'Datos del token incompletos.',
                        'missing_payload_key_user_id' => 'Datos del token incompletos.',
                        'missing_payload_key_email' => 'Datos del token incompletos.',
                        'missing_payload_key_timestamp' => 'Datos del token incompletos.',
                        'missing_payload_key_exp' => 'Datos del token incompletos.',
                        'invalid_user_id' => 'ID de usuario inválido.',
                        'invalid_timestamp' => 'Timestamp del token inválido.',
                        'timestamp_too_old' => 'Token demasiado antiguo.',
                        'invalid_or_expired_exp' => 'Token expirado o inválido.',
                        'invalid_email' => 'Correo electrónico del token inválido.',
                    ];
                    $message = $messages[$error] ?? 'Error desconocido: ' . htmlspecialchars($error);
                    ?>
                    <div class="auth-alert auth-alert--danger">
                        <i class="fas fa-info-circle me-1"></i>
                        <?php echo htmlspecialchars($message); ?>
                        <br><span style="font-size:0.75rem; opacity:0.7;">Intente iniciar sesión nuevamente.</span>
                    </div>
                <?php } ?>

                <a class="auth-btn auth-btn--primary" href="../inicio/">
                    <i class="fas fa-arrow-left me-2"></i> Volver al Inicio
                </a>
            </div>

            <div class="auth-footer">
                &copy; <?php echo date('Y'); ?> Fundación Cardenal Garibi Rivera
            </div>
        </div>
    </div>

    <?php require_once '../../includes/scripts.php'; ?>
</body>

</html>