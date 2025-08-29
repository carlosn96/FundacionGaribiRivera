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
                            <div class="card-body p-4 p-md-5">
                                <!-- Logo Section -->
                                <div class="text-center mb-4">
                                    <a href="https://fundaciongaribirivera.com/" target="_blank" class="d-inline-block mb-3">
                                        <img src="../../../assets/images/logos/logo-dark.svg" class="img-fluid" alt="Logo-Dark" style="max-height: 60px;">
                                    </a>
                                    <h2 class="h4 fw-bold text-dark mb-2">Iniciar sesión</h2>
                                    <p class="text-muted small">Ingresa tus credenciales para acceder</p>
                                </div>

                                <!-- Login Form -->
                                <form id="loginForm">
                                    <div class="mb-3">
                                        <label for="correo" class="form-label fw-semibold text-dark">Correo electrónico:</label>
                                        <input value="carlos_n96@hotmail.com" type="email" class="form-control border-warning" id="correo" name="correo" required>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label for="contrasena" class="form-label fw-semibold text-dark">Contraseña:</label>
                                        <input value="1" type="password" class="form-control border-warning" id="contrasena" name="contrasena" required>
                                    </div>
                                    
                                    <div class="text-end mb-4">
                                        <a class="text-warning text-decoration-none small" href="../recuperacionContrasena/">¿Olvidaste tu contraseña?</a>
                                    </div>
                                    
                                    <div class="d-grid mb-3">
                                        <button id="submitButton" type="submit" class="btn btn-warning btn-lg fw-bold">
                                            <span id="buttonText">Entrar</span>
                                            <div id="spinner" class="spinner-border spinner-border-sm d-none ms-2" role="status">
                                                <span class="visually-hidden">Cargando...</span>
                                            </div>
                                        </button>
                                    </div>
                                    
                                    <div class="d-flex justify-content-between align-items-center">
                                        <p class="mb-0 text-muted small">¿No tienes cuenta?</p>
                                        <a class="text-warning fw-bold text-decoration-none small" href="../crearCuenta/">Crear una cuenta</a>
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
