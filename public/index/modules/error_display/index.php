<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error de Inicio de Sesión - Fundación Garibi Rivera</title>
    <link rel="icon" href="../../../assets/images/logos/ico.png" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        body {
            background-color: #f8f9fa;
        }
        .card {
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        }
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .preloader.hidden {
            display: none;
        }
    </style>
</head>

<body>
    <!-- Preloader -->
    <div class="preloader" id="preloader">
        <div class="spinner-border text-warning" role="status">
            <span class="visually-hidden">Cargando...</span>
        </div>
    </div>

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
                            <h1 class="h4 fw-bold text-dark mb-2">Error de Inicio de Sesión</h1>
                            <p class="mb-0 text-muted small">Ha ocurrido un error al procesar su solicitud</p>
                            <?php
                            $error = $_GET['error'] ?? null;
                            if ($error) {
                                $message = '';
                                switch ($error) {
                                    case 'invalid_token':
                                        $message = 'Token inválido o ausente. Intente iniciar sesión nuevamente.';
                                        break;
                                    case 'missing_user_id':
                                        $message = 'Usuario no encontrado. Intente iniciar sesión nuevamente.';
                                        break;
                                    case 'user_not_found':
                                        $message = 'Usuario no encontrado. Intente iniciar sesión nuevamente.';
                                        break;
                                    case 'invalid_format':
                                        $message = 'Formato de token inválido. Intente iniciar sesión nuevamente.';
                                        break;
                                    case 'invalid_json':
                                        $message = 'Datos del token inválidos. Intente iniciar sesión nuevamente.';
                                        break;
                                    case 'unsupported_alg':
                                        $message = 'Algoritmo de token no soportado. Intente iniciar sesión nuevamente.';
                                        break;
                                    case 'no_secret_configured':
                                        $message = 'Configuración de seguridad faltante. Contacte al administrador.';
                                        break;
                                    case 'invalid_signature':
                                        $message = 'Firma del token inválida. Intente iniciar sesión nuevamente.';
                                        break;
                                    case 'expired':
                                        $message = 'Token expirado. Intente iniciar sesión nuevamente.';
                                        break;
                                    case 'invalid_source':
                                        $message = 'Origen del token inválido. Intente iniciar sesión nuevamente.';
                                        break;
                                    case 'missing_payload_key_issued_by':
                                    case 'missing_payload_key_user_id':
                                    case 'missing_payload_key_email':
                                    case 'missing_payload_key_timestamp':
                                    case 'missing_payload_key_exp':
                                        $message = 'Datos del token incompletos. Intente iniciar sesión nuevamente.';
                                        break;
                                    case 'invalid_user_id':
                                        $message = 'ID de usuario inválido. Intente iniciar sesión nuevamente.';
                                        break;
                                    case 'invalid_timestamp':
                                        $message = 'Timestamp del token inválido. Intente iniciar sesión nuevamente.';
                                        break;
                                    case 'timestamp_too_old':
                                        $message = 'Token demasiado antiguo. Intente iniciar sesión nuevamente.';
                                        break;
                                    case 'invalid_or_expired_exp':
                                        $message = 'Token expirado o inválido. Intente iniciar sesión nuevamente.';
                                        break;
                                    case 'invalid_email':
                                        $message = 'Correo electrónico del token inválido. Intente iniciar sesión nuevamente.';
                                        break;
                                    default:
                                        $message = 'Error desconocido. Intente iniciar sesión nuevamente.';
                                }
                                echo '<div class="alert alert-danger text-center small mb-3">' . htmlspecialchars($message) . '</div>';
                            }
                            ?>
                        </div>
                        <!-- Body -->
                        <div class="card-body px-4 px-md-5 pb-5 pt-4">
                            <div class="text-center">
                                <a class="btn btn-warning btn-lg fw-bold shadow-sm" href="../inicio/">
                                    Volver al Inicio de Sesión
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        $(document).ready(function() {
            // Hide preloader after page load
            $('#preloader').addClass('hidden');
        });
    </script>
</body>

</html>