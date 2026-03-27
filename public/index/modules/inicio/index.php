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
                    <img src="../../../assets/images/logos/logo-dark.svg" alt="Fundación Garibi Rivera">
                </a>
            </div>

            <div class="auth-card">
                <div class="auth-header">
                    <h1 class="auth-title">Iniciar sesión</h1>
                    <p class="auth-subtitle">Ingresa tus credenciales para continuar</p>
                </div>

                <form id="loginForm">
                    <label class="auth-label" for="correo">Correo electrónico</label>
                    <div class="auth-field">
                        <input value="carlos_n96@hotmail.com" type="email" value="" class="auth-input" id="correo" name="correo" placeholder="tu@correo.com"
                            required autocomplete="email">
                    </div>

                    <label class="auth-label" for="contrasena">Contraseña</label>
                    <div class="auth-field">
                        <input value="321654987Aa" type="password" class="auth-input auth-input--with-toggle" id="contrasena"
                            name="contrasena" value="" placeholder="••••••••" required autocomplete="current-password">
                        <button class="auth-pw-toggle" type="button" id="togglePassword"
                            aria-label="Mostrar contraseña">
                            <i class="fas fa-eye" id="eyeIcon"></i>
                        </button>
                    </div>

                    <div class="auth-options">
                        <div class="form-check m-0">
                            <input class="form-check-input" type="checkbox" id="rememberMe">
                            <label class="form-check-label" style="font-size:0.8rem;color:var(--auth-text-soft)"
                                for="rememberMe">Recuérdame</label>
                        </div>
                        <a class="auth-link" href="../recuperacionContrasena/">¿Olvidaste tu contraseña?</a>
                    </div>

                    <button id="submitButton" type="submit" class="auth-btn auth-btn--primary">
                        <span id="buttonText">Entrar</span>
                        <span id="spinner"
                            class="spinner-border spinner-border-sm d-none position-absolute top-50 start-50 translate-middle"
                            role="status">
                            <span class="visually-hidden">Cargando...</span>
                        </span>
                    </button>
                </form>

                <div class="auth-divider"><span>o</span></div>

                <div class="auth-register-link">
                    ¿No tienes cuenta? <a href="../crearCuenta/">Regístrate aquí</a>
                </div>
            </div>

            <div class="auth-footer">
                &copy; <?php echo date('Y'); ?> Fundación Cardenal Garibi Rivera
            </div>
        </div>
    </div>

    <?php require '../../includes/scripts.php'; ?>
    <script src="../../../assets/js/controlSesion.js"></script>
    <script src="api/inicio.js"></script>
</body>

</html>