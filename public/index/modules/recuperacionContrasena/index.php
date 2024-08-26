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
                        <div class="card-body">
                            <a href="../inicio/" class="">
                                <img src="../../../assets/images/logos/logo-dark.svg" class="light-logo" alt="Logo-Dark" />
                            </a>
                            <div class="row align-items-center justify-content-around pt-6 pb-5">
                                <div class="col-lg-6 col-xl-5 d-none d-lg-block">
                                    <div class="text-center text-lg-start">
                                        <img src="../../../assets/images/backgrounds/login-security.png" alt="" class="img-fluid" />
                                    </div>
                                </div>
                                <div class="col-lg-6 col-xl-5">
                                    <h2 class="mb-6 fs-8 fw-bolder text-center">¿Olvidaste tu contraseña?</h2>
                                    <p class="text-dark fs-4 mb-7">
                                        Ingresa el correo asociado a tu cuenta y te enviaremos un enlace para restablecer tu contraseña.
                                    </p>
                                    <form method="POST" id="formEnviarCorreo">
                                        <div class="mb-7">
                                            <label for="correo_electronico" class="form-label text-dark fw-bold">Correo Electrónico</label>
                                            <input type="email" class="form-control py-2" id="correo_electronico" name="correo_electronico" aria-describedby="emailHelp" required>
                                        </div>
                                        <button type="submit"class="btn btn-warning w-100 mb-3 rounded-pill">
                                            Enviar correo de verificación
                                            <span id="spinner" class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
                                        </button>
                                        <a href = '../inicio/' class="btn btn-success w-100 rounded-pill">Cancelar</a>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
        include_once '../../includes/scripts.php';
        ?>
        <!-- Script para manejar la solicitud de envío de correo -->
        <script src="api/recuperar.js"></script>
    </body>
</html>
