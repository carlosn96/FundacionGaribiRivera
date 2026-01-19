<!DOCTYPE html>
<html lang="es">
    <head>
        <?php
        include_once '../../includes/head.php';
        ?>
    </head>
    <body>
        <?php
        require_once '../../../assets/commons/preloader.php';
        ?>
        <div id="main-wrapper" class="p-0 bg-white">
            <div class="auth-login position-relative overflow-hidden d-flex align-items-center justify-content-center px-7 px-xxl-0 rounded-3 h-n20">
                <div class="auth-login-shape position-relative w-100">
                    <div class="auth-login-wrapper card mb-0 container position-relative z-1 h-100 max-h-770" data-simplebar>
                        <div class="card-body">
                            <a href="../inicio/" class="d-block text-center mb-4">
                                <img src="../../../assets/images/logos/logo-dark.svg" class="light-logo" alt="Logo-Dark" />
                            </a>
                            <div class="row align-items-center justify-content-around pt-4 pb-4">
                                <!-- Imagen en la parte izquierda solo en pantallas grandes -->
                                <div class="col-lg-6 col-xl-5 d-none d-lg-block">
                                    <div class="text-center text-lg-start">
                                        <img src="../../../assets/images/backgrounds/login-security.png" alt="Imagen de seguridad" class="img-fluid" />
                                    </div>
                                </div>

                                <!-- Formulario en la parte derecha -->
                                <div class="col-lg-6 col-xl-5">
                                    <h2 class="mb-4 text-center fs-6 fw-bolder">Revisa tu correo</h2>
                                    <p class="fs-5 mb-4">
                                        <?php
                                        $correo = $_SESSION["preregistro"]["correo"] ?? "";
                                        $nombre = $_SESSION["preregistro"]["nombreCompleto"] ?? "";
                                        if (!strlen($correo)) {
                                            header("Location: ../");
                                        }
                                        echo "<strong>$nombre</strong>, te enviamos un código de verificación a tu correo electrónico: <br><strong>$correo</strong>";
                                        ?>
                                    </p>

                                    <p id="reenviarCodigo" class="text-center">
                                        <a onclick="reenviarCodigo()" href="javascript:void(0)" class="text-decoration-none text-primary">Reenviar código...</a>
                                    </p>

                                    <form id="formValidarCuenta" method="post">
                                        <div class="mb-4">
                                            <label class="form-label fw-semibold text-dark">Escribe el código de seguridad</label>
                                            <div class="d-flex justify-content-center gap-2">
                                                <input type="text" class="form-control py-2 text-center border-warning rounded" id="codigo1" name="codigo[]" maxlength="1" required>
                                                <input type="text" class="form-control py-2 text-center border-warning rounded" id="codigo2" name="codigo[]" maxlength="1" required>
                                                <input type="text" class="form-control py-2 text-center border-warning rounded" id="codigo3" name="codigo[]" maxlength="1" required>
                                                <input type="text" class="form-control py-2 text-center border-warning rounded" id="codigo4" name="codigo[]" maxlength="1" required>
                                            </div>
                                        </div>
                                        <button type="submit" class="btn btn-warning w-100 mb-3 rounded-pill py-2 fw-bold">
                                            Validar cuenta
                                        </button>
                                    </form>
                                    <a href='../inicio/' class="btn btn-outline-warning w-100 rounded-pill py-2 fw-bold">Cancelar</a>
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
