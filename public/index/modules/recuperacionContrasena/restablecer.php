<?php include_once 'assets/sesion.php'; ?>
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
                    <div class="auth-icon-circle auth-icon-circle--success">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <h1 class="auth-title">Nueva contraseña</h1>
                    <p class="auth-subtitle">
                        Ingresa tu nueva contraseña para<br>
                        <span class="auth-highlight"><?php echo htmlspecialchars($correoElectronico); ?></span>
                    </p>
                </div>

                <form method="POST" id="enviarToken" name="enviarToken">
                    <label class="auth-label" for="contrasena">Nueva contraseña</label>
                    <div class="auth-field">
                        <input type="password" class="auth-input" id="contrasena" name="contrasena"
                            placeholder="••••••••" required>
                    </div>

                    <label class="auth-label" for="confirmar_contrasena">Confirmar contraseña</label>
                    <div class="auth-field">
                        <input type="password" class="auth-input" id="confirmar_contrasena" name="confirmar_contrasena"
                            placeholder="••••••••" required>
                    </div>

                    <button type="submit" name="enviarToken" class="auth-btn auth-btn--primary">
                        <i class="fas fa-lock me-2"></i> Cambiar Contraseña
                    </button>
                </form>
            </div>

            <div class="auth-footer">
                &copy; <?php echo date('Y'); ?> Fundación Cardenal Garibi Rivera
            </div>
        </div>
    </div>

    <?php include_once '../../includes/scripts.php'; ?>
    <script src="api/restablecer.js"></script>
</body>

</html>