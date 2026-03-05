<!DOCTYPE html>
<html lang="es">

<head>
    <?php require_once '../../includes/head.php'; ?>
</head>

<body>
    <?php require_once '../../../assets/commons/preloader.php'; ?>

    <div class="auth-page">
        <div class="auth-container auth-container--wide">
            <div class="auth-logo">
                <a href="https://fundaciongaribirivera.com/" target="_blank">
                    <img src="../../../assets/images/logos/logo-dark.svg" alt="Fundación Garibi Rivera">
                </a>
            </div>

            <div class="auth-card">
                <div class="auth-header">
                    <div class="auth-icon-circle auth-icon-circle--brand">
                        <i class="fas fa-user-plus"></i>
                    </div>
                    <h1 class="auth-title">Crear cuenta</h1>
                    <p class="auth-subtitle">Completa los campos para registrarte</p>
                </div>

                <form id="crearCuentaForm" class="needs-validation" novalidate>
                    <div class="auth-row-2">
                        <div>
                            <label class="auth-label" for="nombre">Nombre</label>
                            <div class="auth-field">
                                <input type="text" class="auth-input" id="nombre" name="nombre" placeholder="Juan"
                                    required>
                                <div class="auth-invalid-feedback">Ingrese su nombre.</div>
                            </div>
                        </div>
                        <div>
                            <label class="auth-label" for="apellidos">Apellidos</label>
                            <div class="auth-field">
                                <input type="text" class="auth-input" id="apellidos" name="apellidos"
                                    placeholder="Pérez García" required>
                                <div class="auth-invalid-feedback">Ingrese sus apellidos.</div>
                            </div>
                        </div>
                    </div>

                    <label class="auth-label" for="correo">Correo electrónico</label>
                    <div class="auth-field">
                        <input type="email" class="auth-input" id="correo" name="correo" placeholder="tu@correo.com"
                            required>
                        <div class="auth-invalid-feedback">Correo no válido o ya registrado.</div>
                    </div>

                    <div class="auth-row-2">
                        <div>
                            <label class="auth-label" for="numero_celular">Celular</label>
                            <div class="auth-field">
                                <input type="tel" class="auth-input" id="numero_celular" name="numero_celular"
                                    placeholder="33 1234 5678" required>
                                <div class="auth-invalid-feedback">Ingrese su número celular.</div>
                            </div>
                        </div>
                        <div>
                            <label class="auth-label" for="contrasena">Contraseña</label>
                            <div class="auth-field">
                                <input type="password" class="auth-input" id="contrasena" name="contrasena"
                                    placeholder="••••••••" required>
                                <div class="auth-invalid-feedback">Ingrese una contraseña.</div>
                            </div>
                        </div>
                    </div>

                    <div class="form-check mb-3">
                        <input type="checkbox" class="form-check-input" id="terminos" name="terminos" required
                            style="cursor:pointer;">
                        <label class="form-check-label" for="terminos"
                            style="cursor:pointer; font-size:0.8rem; color:var(--auth-text-soft)">
                            He leído y acepto los
                            <a href="https://www.fundaciongaribirivera.com/privacy-policy" target="_blank"
                                class="auth-link">términos y condiciones</a>
                        </label>
                        <div class="auth-invalid-feedback">Debes aceptar los términos.</div>
                    </div>

                    <button disabled type="submit" id="submitBtn" class="auth-btn auth-btn--primary">
                        Registrarme
                        <span id="spinner" class="spinner-border spinner-border-sm d-none ms-2" role="status"></span>
                    </button>
                </form>

                <div class="auth-divider"><span>o</span></div>

                <div class="auth-register-link">
                    ¿Ya tienes cuenta? <a href="../inicio/">Iniciar sesión</a>
                </div>
            </div>

            <div class="auth-footer">
                &copy; <?php echo date('Y'); ?> Fundación Cardenal Garibi Rivera
            </div>
        </div>
    </div>

    <?php require_once '../../includes/scripts.php'; ?>
    <script src="api/crearCuenta.js"></script>
</body>

</html>