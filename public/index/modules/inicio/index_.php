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
        <div id="main-wrapper" class="p-0 bg-white">
            <div class="auth-login position-relative overflow-hidden d-flex align-items-center justify-content-center px-7 px-xxl-0 rounded-3 h-n20">
                <div class="auth-login-shape position-relative w-100">
                    <div class="auth-login-wrapper card mb-0 container position-relative z-1 h-100 max-h-770" data-simplebar>
                        <div class="card-body glass-effect">
                            <a href="https://fundaciongaribirivera.com/" class="">
                                <img src="../../../assets/images/logos/logo-dark.svg" class="light-logo" alt="Logo-Dark" />
                            </a>
                            <div class="row align-items-center justify-content-around pt-6 pb-5">
                                <div class="col-lg-6 col-xl-5 d-none d-lg-block">
                                    <div class="text-center text-lg-start">
                                        <img src="../../../assets/images/backgrounds/IMGS.jpg" alt="" class="img-fluid" />
                                    </div>
                                </div>
                                <div class="col-12 col-lg-6 col-xl-5">
                                    <h2 class="mb-6 fs-8 fw-bolder text-center">Iniciar sesión</h2>
                                    <form id="loginForm">
                                        <div class="mb-3">
                                            <label for="correo" class="form-label">Correo electrónico:</label>
                                            <input value="carlos_n96@hotmail.com" type="email" class="form-control" id="correo" name="correo" required>
                                        </div>
                                        <div class="mb-3">
                                            <label for="contrasena" class="form-label">Contraseña:</label>
                                            <input value="123" type="password" class="form-control" id="contrasena" name="contrasena" required>
                                        </div>
                                        <div class="d-flex justify-content-between mb-3">
                                            <a class="text-warning" href="../recuperacionContrasena/">¿Olvidaste tu contraseña?</a>
                                        </div>
                                        <button id="submitButton" type="submit" class="btn btn-warning w-100 mb-3">
                                            <span id="buttonText">Entrar</span>
                                            <div id="spinner" class="spinner-border d-none" role="status">
                                                <span class="visually-hidden"></span>
                                            </div>
                                        </button>
                                        <div class="d-flex justify-content-between">
                                            <p class="mb-0">¿No tienes cuenta?</p>
                                            <a class="text-warning fw-bold ms-2" href="../crearCuenta/">Crear una cuenta</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
        include '../../includes/scripts.php';
        ?>

        <!-- Script -->

        <script src="../../../assets/js/controlSesion.js"></script>
        <script src="api/inicio.js"></script>
    </body>
</html>