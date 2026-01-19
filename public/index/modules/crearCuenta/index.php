<!DOCTYPE html>
<html lang="es" dir="ltr" data-bs-theme="dark" data-color-theme="Blue_Theme" data-layout="vertical">
    <head>
        <!-- Head -->
        <?php
        require_once '../../includes/head.php';
        ?>
    </head>
    <body>
        <!-- Preloader y Overlay con Spinner -->
        <?php
        require_once '../../../assets/commons/preloader.php';
        ?>
        <div class="min-vh-100 d-flex align-items-center justify-content-center p-3 bg-white">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-12 col-xl-10 col-xxl-8">
                        <div class="card shadow-lg border-0 rounded-4 overflow-hidden">
                            <div class="row g-0">
                                <!-- Illustration Column -->
                                <div class="col-lg-6 d-none d-lg-flex align-items-center justify-content-center bg-warning bg-opacity-10">
                                    <div class="text-center p-4">
                                        <img src="../../../assets/images/backgrounds/fondoRegistro.png" alt="" class="img-fluid rounded-3 shadow-sm" />
                                    </div>
                                </div>
                                
                                <!-- Form Column -->
                                <div class="col-lg-6">
                                    <div class="card-body p-4 p-md-5 d-flex flex-column justify-content-center">
                                        <div class="text-center mb-4">
                                            <h2 class="h4 fw-bold text-dark mb-2">Crear nueva cuenta</h2>
                                            <p class="text-muted small">Complete todos los campos para registrarse</p>
                                        </div>
                                        
                                        <form id="crearCuentaForm" class="needs-validation" novalidate>
                                            <div class="mb-3">
                                                <label for="nombre" class="form-label fw-bold text-dark small">Nombre:</label>
                                                <input type="text" class="form-control border-warning" id="nombre" name="nombre" aria-label="nombre" required>
                                                <div class="invalid-feedback">Por favor, ingrese su nombre.</div>
                                            </div>

                                            <div class="mb-3">
                                                <label for="apellidos" class="form-label fw-bold text-dark small">Apellidos:</label>
                                                <input type="text" class="form-control border-warning" id="apellidos" name="apellidos" aria-label="apellidos" required>
                                                <div class="invalid-feedback">Por favor, ingrese sus apellidos.</div>
                                            </div>

                                            <div class="mb-3">
                                                <label for="correo" class="form-label fw-bold text-dark small">Correo electrónico:</label>
                                                <input type="email" class="form-control border-warning" id="correo" name="correo" aria-describedby="emailHelp" required>
                                                <div class="invalid-feedback">Debes proporcionar un correo electrónico válido que no haya sido registrado anteriormente.</div>
                                            </div>

                                            <div class="mb-3">
                                                <label for="numero_celular" class="form-label fw-bold text-dark small">Número celular:</label>
                                                <input type="tel" class="form-control border-warning" id="numero_celular" name="numero_celular" required>
                                                <div class="invalid-feedback">Por favor, ingrese su número celular.</div>
                                            </div>

                                            <div class="mb-4">
                                                <label for="contrasena" class="form-label fw-bold text-dark small">Contraseña:</label>
                                                <input type="password" class="form-control border-warning" id="contrasena" name="contrasena" required>
                                                <div class="invalid-feedback">Por favor, ingrese una contraseña.</div>
                                            </div>

                                            <div class="d-grid mb-3">
                                                <button disabled type="submit" id="submitBtn" class="btn btn-warning btn-lg rounded-pill fw-bold">
                                                    Registrarme
                                                    <span id="spinner" class="spinner-border spinner-border-sm d-none ms-2" role="status"></span>
                                                </button>
                                            </div>
                                        </form>

                                        <div class="d-flex justify-content-between align-items-center">
                                            <p class="mb-0 text-muted small">¿Ya tienes cuenta?</p>
                                            <a class="text-warning fw-bold text-decoration-none small" href="../inicio/">Iniciar sesión</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
        require_once '../../includes/scripts.php';
        ?>
        <script src="api/crearCuenta.js"></script>
    </body>

</html>
