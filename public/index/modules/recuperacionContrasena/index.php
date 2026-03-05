<!DOCTYPE html>
<html lang="es">

<head>
    <?php include_once '../../includes/head.php'; ?>
</head>

<body>
    <?php require_once '../../../assets/commons/preloader.php'; ?>

    <div class="auth-page">
        <div class="auth-container">
            <div class="auth-logo">
                <a href="../inicio/">
                    <img src="../../../assets/images/logos/logo-dark.svg" alt="Logo">
                </a>
            </div>

            <div class="auth-card">
                <div class="auth-header auth-header--center">
                    <div class="auth-icon-circle auth-icon-circle--brand">
                        <i class="fas fa-key"></i>
                    </div>
                    <h1 class="auth-title">¿Olvidaste tu contraseña?</h1>
                    <p class="auth-subtitle">Ingresa tu correo y te enviaremos un enlace para restablecerla.</p>
                </div>

                <form method="POST" id="formEnviarCorreo">
                    <label class="auth-label" for="correo_electronico">Correo electrónico</label>
                    <div class="auth-field">
                        <input type="email" class="auth-input" id="correo_electronico" name="correo_electronico"
                            placeholder="tu@correo.com" required>
                    </div>

                    <button type="submit" class="auth-btn auth-btn--primary">
                        Enviar correo de verificación
                        <span id="spinner" class="spinner-border spinner-border-sm d-none ms-2" role="status"></span>
                    </button>
                    <a href="../inicio/" class="auth-btn auth-btn--outline">
                        <i class="fas fa-arrow-left me-1" style="font-size:0.8rem;"></i> Volver al inicio
                    </a>
                </form>
            </div>

            <div class="auth-footer">
                &copy; <?php echo date('Y'); ?> Fundación Cardenal Garibi Rivera
            </div>
        </div>
    </div>

    <?php require_once '../../includes/scripts.php'; ?>
    <script src="api/recuperar.js"></script>
</body>

</html>