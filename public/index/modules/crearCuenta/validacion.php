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
                                    <h2 class="mb-6 fs-8 fw-bolder">Revisa tu correo</h2>
                                    <p class="fs-4">
                                        Te enviamos un código de verificación a tu correo electrónico <br>
                                        <span>
                                            <?php
                                            $correo = $_SESSION["preregistro"]["correo"] ?? "";
                                            if (!strlen($correo)) {
                                                echo header("Location: ../");
                                            } else {
                                                echo $correo;
                                            }
                                            ?>
                                        </span><br>
                                    </p>
                                    <p id="reenviarCodigo">
                                        <a href="javascript:reenviarCodigo()">Reenviar código ...</a>
                                    </p>
                                    <form id="formValidarCuenta" method="post">
                                        <div class="mb-7">
                                            <label class="form-label fw-semibold">Escribe el código de seguridad</label>
                                            <div class="d-flex justify-content-between">
                                                <input type="text" class="form-control py-6 text-center mx-1" id="codigo1" name="codigo[]" maxlength="1" required>
                                                <input type="text" class="form-control py-6 text-center mx-1" id="codigo2" name="codigo[]" maxlength="1" required>
                                                <input type="text" class="form-control py-6 text-center mx-1" id="codigo3" name="codigo[]" maxlength="1" required>
                                                <input type="text" class="form-control py-6 text-center mx-1" id="codigo4" name="codigo[]" maxlength="1" required>
                                            </div>
                                        </div>
                                        <button type="submit" class="btn btn-success w-100 mb-4 rounded-pill">Validar cuenta</button>
                                    </form>
                                    <a href = '../inicio/' class="btn btn-warning w-100 rounded-pill">Cancelar</a>
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
        <script src="api/validarCuenta.js"></script>

    </body>

</html>
