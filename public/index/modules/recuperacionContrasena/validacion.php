<?php require_once 'assets/sesion.php'; ?>
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
                <a href="../inicio/">
                    <img src="../../../assets/images/logos/logo-dark.svg" alt="Logo">
                </a>
            </div>

            <div class="auth-card">
                <div class="auth-header auth-header--center">
                    <div class="auth-icon-circle auth-icon-circle--info">
                        <i class="fas fa-envelope-open-text"></i>
                    </div>
                    <h1 class="auth-title">Revisa tu correo</h1>
                    <p class="auth-subtitle">
                        Enviamos un código de verificación a<br>
                        <span class="auth-highlight"><?php echo htmlspecialchars($correoElectronico); ?></span>
                    </p>
                </div>

                <form id="formValidarCodigo">
                    <label class="auth-label" style="text-align:center; display:block;">Código de seguridad</label>
                    <div class="auth-otp-group">
                        <input type="text" class="auth-otp-input" id="codigo1" name="codigo[]" maxlength="1" required
                            inputmode="numeric">
                        <input type="text" class="auth-otp-input" id="codigo2" name="codigo[]" maxlength="1" required
                            inputmode="numeric">
                        <input type="text" class="auth-otp-input" id="codigo3" name="codigo[]" maxlength="1" required
                            inputmode="numeric">
                        <input type="text" class="auth-otp-input" id="codigo4" name="codigo[]" maxlength="1" required
                            inputmode="numeric">
                    </div>

                    <button type="submit" class="auth-btn auth-btn--primary">Validar Código</button>
                    <a href="../inicio/" class="auth-btn auth-btn--outline">
                        <i class="fas fa-arrow-left me-1" style="font-size:0.8rem;"></i> Cancelar
                    </a>
                </form>
            </div>

            <div class="auth-footer">
                &copy; <?php echo date('Y'); ?> Fundación Cardenal Garibi Rivera
            </div>
        </div>
    </div>

    <?php require_once '../../includes/scripts.php'; ?>
    <script src="api/validacion.js"></script>
</body>

</html>