<!DOCTYPE html>
<html lang="es">
    <head>
        <!-- Head -->
        <?php
        include_once '../../includes/head.php';
        ?>
    </head>
    <body>
        <!-- Preloader y Overlay con Spinner -->
        <?php
        include_once '../../includes/overlay.php';
        ?>
        <div id="main-wrapper" class="p-0 bg-white auth-customizer-none">
            <div class="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
                <div class="auth-login-shape-box position-relative">
                    <div class="d-flex align-items-center justify-content-center w-100 z-1 position-relative">
                        <div class="card auth-card mb-0 mx-3 glass-effect">
                            <div class="card-body pt-5">
                                <div class="row mb-5">
                                    <div class="col text-center">
                                        <a href="https://fundaciongaribirivera.com/" target="_blank">
                                            <img src="../../../assets/images/logos/logo-dark.svg" class="light-logo" alt="Logo-Dark" />
                                        </a>
                                    </div>
                                </div>
                                <h2 class="mb-4 text-center fs-6 fw-bolder">Iniciar sesión</h2>
                                <form id="loginForm">
                                    <div class="mb-3">
                                        <label for="correo" class="form-label">Correo electrónico:</label>
                                        <input  type="email" class="form-control border-warning" id="correo" name="correo" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="contrasena" class="form-label">Contraseña:</label>
                                        <input  type="password" class="form-control border-warning" id="contrasena" name="contrasena" required>
                                    </div>
                                    <div class="d-flex justify-content-between mb-4">
                                        <a class="text-warning" href="../recuperacionContrasena/">¿Olvidaste tu contraseña?</a>
                                    </div>
                                    <button id="submitButton" type="submit" class="btn btn-warning w-100 mb-3">
                                        <span id="buttonText">Entrar</span>
                                        <div id="spinner" class="spinner-border d-none" role="status">
                                            <span class="visually-hidden"></span>
                                        </div>
                                    </button>
                                    <div class="d-flex justify-content-between mb-4">
                                        <p class="mb-0">¿No tienes cuenta?</p>
                                        <a class="text-warning fw-bold" href="../crearCuenta/">Crear una cuenta</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
        include '../../includes/scripts.php';
        ?>
        <script src="../../../assets/js/controlSesion.js"></script>
        <script src="api/inicio.js"></script>
    </body>

</html>