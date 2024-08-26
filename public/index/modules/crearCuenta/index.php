<!DOCTYPE html>
<html lang="en" dir="ltr" data-bs-theme="dark" data-color-theme="Blue_Theme" data-layout="vertical">
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
            <div class="auth-login position-relative overflow-hidden d-flex align-items-center justify-content-center px-4 px-md-7 px-xxl-0 rounded-3 h-100">
                <div class="auth-login-shape position-relative w-100">
                    <div class="auth-login-wrapper card mb-0 container position-relative z-1 h-100 max-h-770" data-simplebar>
                        <div class="card-body">
                            <a href="https://www.fundaciongaribirivera.com"  target="_blank"  class="d-block text-center mb-4">
                                <img src="../../../assets/images/logos/logo-dark.svg" class="light-logo" alt="Logo-Dark" />
                            </a>

                            <div class="row align-items-center justify-content-center pt-4 pb-4">
                                <div class="col-lg-6 col-xl-5 d-none d-lg-block">
                                    <div class="text-center text-lg-start">
                                        <img src="../../../assets/images/backgrounds/fondoRegistro.png" alt="" class="img-fluid" />
                                    </div>
                                </div>
                                <div class="col-12 col-lg-6 col-xl-5">
                                    <h2 class="mb-4 fs-6 fw-bolder text-center text-lg-start">Crear nueva cuenta</h2>


                                    <form id="crearCuentaForm" class="needs-validation" novalidate>
                                        <div class="form-group mb-4 position-relative">
                                            <label for="nombre" class="form-label text-dark fw-bold">Nombre:</label>
                                            <input type="text" class="form-control py-2" id="nombre" name="nombre" placeholder="" aria-label="nombre" required />
                                            <div class="invalid-feedback">Por favor, ingrese su nombre.</div>
                                        </div>
                                        <div class="form-group mb-4 position-relative">
                                            <label for="apellidos" class="form-label text-dark fw-bold">Apellidos:</label>
                                            <input type="text" class="form-control py-2" id="apellidos" name="apellidos" placeholder="" aria-label="apellidos" required />
                                            <div class="invalid-feedback">Por favor, ingrese sus apellidos.</div>
                                        </div>
                                        <div class="form-group mb-4 position-relative">
                                            <label for="correo" class="form-label text-dark fw-bold">Correo electrónico:</label>
                                            <input type="email" class="form-control py-2" id="correo" name="correo" aria-describedby="emailHelp" required />
                                            <div class="invalid-feedback">Debes proporcionar un correo electrónico válido que no haya sido registrado anteriormente.</div>
                                        </div>
                                        <div class="form-group mb-4 position-relative">
                                            <label for="numero_celular" class="form-label text-dark fw-bold">Número celular:</label>
                                            <input type="tel" class="form-control py-2" id="numero_celular" name="numero_celular" required />
                                            <div class="invalid-feedback">Por favor, ingrese su número celular.</div>
                                        </div>
                                        <div class="form-group mb-4 position-relative">
                                            <label for="contrasena" class="form-label text-dark fw-bold">Contraseña:</label>
                                            <input type="password" class="form-control py-2" id="contrasena" name="contrasena" required />
                                            <div class="invalid-feedback">Por favor, ingrese una contraseña.</div>
                                        </div>
                                        <button type="submit" id="submitBtn" class="btn btn-warning w-100 mb-4 rounded-pill position-relative">
                                            Registrarme
                                            <span id="spinner" class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
                                        </button>
                                    </form>
                                    <div class="d-flex flex-column align-items-center">
                                        <p class="fs-5 mb-2 fw-medium text-center">  ¿Ya tienes cuenta? </p>
                                        <a class="text-warning fw-bold fs-5" href="../inicio/">Inicia sesión</a>
                                    </div>
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
        <script src="api/crearCuenta.js"></script>
    </body>

</html>