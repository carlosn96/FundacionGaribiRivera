<!DOCTYPE html>
<html lang="es">

<head>
    <!-- Head -->
    <?php
    require_once '../../includes/head.php';
    ?>
</head>

<body>
    <!-- Preloader y Overlay con Spinner -->
    <?php
    require_once '../../includes/overlay.php';
    ?>

    <div class="min-vh-100 d-flex align-items-center justify-content-center p-3 bg-white">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3">
                    <div class="card shadow-lg border-0 rounded-4">
                        <!-- Header -->
                        <div class="card-header bg-white text-center pt-5 pb-4 border-0">
                            <a href="https://fundaciongaribirivera.com/" target="_blank" class="d-inline-block mb-3">
                                <img src="../../../assets/images/logos/logo-dark.svg" class="img-fluid" alt="Logo"
                                    style="max-height: 60px;">
                            </a>
                            <h1 class="h4 fw-bold text-dark mb-2">Iniciar sesión</h1>
                            <p class="mb-0 text-muted small">Ingresa tus credenciales para acceder</p>
                        </div>
                        <!-- Body -->
                        <div class="card-body px-4 px-md-5 pb-5 pt-4">
                            <form id="loginForm">

                                <!-- Email -->
                                <div class="mb-4">
                                    <label for="correo" class="form-label fw-semibold text-success small mb-2">
                                        Correo electrónico
                                    </label>
                                    <div class="input-group input-group-lg">
                                        <span
                                            class="input-group-text bg-white border-success border-end-0 rounded-start">
                                            <i class="fas fa-envelope text-success"></i>
                                        </span>
                                        <input type="email"
                                            class="form-control form-control-lg border-success border-start-0 ps-0"
                                            id="correo" name="correo"
                                            aria-label="Correo electrónico" aria-describedby="email-icon" required
                                            autocomplete="email">
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <label for="contrasena" class="form-label fw-semibold text-success small mb-2">
                                        Contraseña
                                    </label>
                                    <div class="input-group input-group-lg">
                                        <span
                                            class="input-group-text bg-white border-success border-end-0 rounded-start">
                                            <i class="fas fa-lock text-success"></i>
                                        </span>
                                        <input type="password"
                                            class="form-control form-control-lg border-success border-start-0 border-end-0 ps-0"
                                            id="contrasena" name="contrasena" placeholder="••••••••"
                                            aria-label="Contraseña" aria-describedby="password-icon toggle-password"
                                            required autocomplete="current-password">
                                        <button class="btn border-success"
                                            type="button" id="togglePassword" aria-label="Mostrar contraseña">
                                            <i class="fas fa-eye text-success" id="eyeIcon"></i>
                                        </button>
                                    </div>
                                </div>

                                <div class="d-flex justify-content-between align-items-center mb-4">
                                    <div class="form-check">
                                        <input class="form-check-input warning border-success" type="checkbox" value=""
                                            id="rememberMe" >
                                        <label class="form-check-label text-muted small" for="rememberMe">
                                            Recuérdame
                                        </label>
                                    </div>
                                    <a class="text-warning text-decoration-none small fw-semibold"
                                        href="../recuperacionContrasena/">
                                        ¿Olvidaste tu contraseña?
                                    </a>
                                </div>

                                <div class="d-grid mb-4">
                                    <button id="submitButton" type="submit"
                                        class="btn btn-warning btn-lg fw-bold shadow-sm position-relative">
                                        <span id="buttonText">Entrar</span>
                                        <span id="spinner"
                                            class="spinner-border spinner-border-sm d-none position-absolute top-50 start-50 translate-middle"
                                            role="status">
                                            <span class="visually-hidden">Cargando...</span>
                                        </span>
                                    </button>
                                </div>

                                <div class="text-center">
                                    <p class="mb-0 text-muted small">
                                        ¿No tienes cuenta?
                                        <a class="text-warning fw-bold text-decoration-none"
                                            href="../crearCuenta/">Crear una cuenta</a>
                                    </p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php
    require '../../includes/scripts.php';
    ?>
    <script src="../../../assets/js/controlSesion.js"></script>
    <script src="api/inicio.js"></script>
</body>

</html>