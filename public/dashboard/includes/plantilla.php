<?php
include_once "controlPermisos.php";
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include '../../../assets/commons/head.php'; ?>
    <link rel="stylesheet" href="../../../assets/css/dashboard.css">
</head>

<body>
    <!-- Preloader -->
    <?php include '../../../assets/commons/preloader.php'; ?>

    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top">
        <div class="container-fluid px-3 px-md-4">
            <a href="../../" class="navbar-brand">
                <img src="../../../assets/images/logos/logo-light.svg" class="img-fluid" alt="Logo">
            </a>

            <!-- MOVED: User Dropdown (Order 2 on Desktop) -->
            <div class="d-flex align-items-center ms-auto order-lg-2">
                <!-- Theme Toggle -->
                <button class="btn btn-link nav-link p-0 me-3" onclick="toggleTheme()" title="Cambiar tema">
                    <i class="fas fa-sun theme-icon-sun" style="display: none;"></i>
                    <i class="fas fa-moon theme-icon-moon" style="display: none;"></i>
                </button>
                <div class="dropdown">
                    <a href="#" class="nav-link dropdown-toggle d-flex align-items-center gap-2" id="userDropdown"
                        role="button" data-bs-toggle="dropdown">
                        <img width="38" height="38" src="data:image/jpeg;base64," alt="Avatar"
                            class="img-usuario rounded-circle border-0">
                        <span class="d-none d-md-inline small"></span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                        <li>
                            <a class="dropdown-item" href="../../../configuracionUsuario">
                                <i class="fas fa-tools me-2"></i>Configuración de perfil</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="javascript:cerrarSesion()">
                                <i class="fas fa-sign-out-alt me-2"></i>Cerrar Sesión</a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- MOVED/UPDATED: Toggler (Order 3 on Desktop) -->
            <button class="navbar-toggler border-0 ms-2 order-lg-3" type="button" data-bs-toggle="collapse"
                data-bs-target="#mainNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- UPDATED: Collapse (Order 1 on Desktop) & Hidden Text Removed -->
            <div class="collapse navbar-collapse order-lg-1" id="mainNavbar">
                <ul class="navbar-nav mx-auto gap-0">
                    <li class="nav-item">
                        <a class="nav-link active" href="#inicio" title="Dashboard">
                            <i class="fas fa-home"></i><span class="ms-2">Dashboard</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#adminModal"
                            title="Administración">
                            <i class="fas fa-users-cog"></i><span class="ms-2">Administración</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#difusionModal"
                            title="Difusión">
                            <i class="fas fa-bullhorn"></i><span class="ms-2">Difusión</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#emprendimientoModal"
                            title="Emprendimiento">
                            <i class="fas fa-lightbulb"></i><span class="ms-2">Emprendimiento</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#socialModal"
                            title="Trabajo Social">
                            <i class="fas fa-people-carry"></i><span class="ms-2">Trabajo
                                Social</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#creditoModal"
                            title="Crédito y cobranza">
                            <i class="fas fa-credit-card"></i><span class="ms-2">Crédito y
                                cobranza</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" title="Reportes">
                            <i class="fas fa-file-pdf"></i><span class="ms-2">Reportes</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- MAIN CONTENT -->
    <main class="container-fluid" id="inicio">
        <!-- WELCOME HERO -->
        <div class="welcome-header">
            <div class="row align-items-center">
                <div class="col-md-8">
                    <h1>¡Bienvenido <span class="profile-name-full"></span>!</h1>
                    <p>Gestiona emprendedores, talleres y actividades en un solo lugar</p>
                </div>
                <?=renderizarAccionPrincipal()?>
            </div>
        </div>

        <!-- STATS -->
        <p class="text-muted small mb-3 text-center">
            <i class="fas fa-info-circle"></i>
            <strong>Función en desarrollo:</strong> La información mostrada es con fines ilustrativos. Próximamente se mostrará el conteo y estadísticas reales.
        </p>
        <div class="stats-grid">
            <div class="stat-card primary">
                <div class="stat-header">
                    <div class="stat-info">
                        <p class="stat-label">Total Emprendedores</p>
                        <h3>1,026</h3>
                    </div>
                    <div class="stat-icon" style="background: linear-gradient(135deg, var(--primary), #2a5f54);">
                        <i class="fas fa-users"></i>
                    </div>
                </div>
                <span class="stat-badge success">
                    <i class="fas fa-arrow-up"></i> 2.5% vs mes anterior
                </span>
            </div>

            <div class="stat-card success">
                <div class="stat-header">
                    <div class="stat-info">
                        <p class="stat-label">Talleres Activos</p>
                        <h3>12</h3>
                    </div>
                    <div class="stat-icon" style="background: var(--success);">
                        <i class="fas fa-chalkboard-teacher"></i>
                    </div>
                </div>
                <div class="progress" style="height: 6px; border-radius: 3px;">
                    <div class="progress-bar" style="width: 75%; background: var(--success);"></div>
                </div>
                <small class="text-muted">75% de capacidad</small>
            </div>

            <div class="stat-card info">
                <div class="stat-header">
                    <div class="stat-info">
                        <p class="stat-label">Registros Nuevos</p>
                        <h3>78</h3>
                    </div>
                    <div class="stat-icon" style="background: var(--info);">
                        <i class="fas fa-user-plus"></i>
                    </div>
                </div>
                <small class="text-muted">Este mes</small>
            </div>

            <div class="stat-card accent">
                <div class="stat-header">
                    <div class="stat-info">
                        <p class="stat-label">Créditos Otorgados</p>
                        <h3>$85k</h3>
                    </div>
                    <div class="stat-icon"
                        style="background: linear-gradient(135deg, var(--accent), #d4b534); color: var(--primary);">
                        <i class="fas fa-dollar-sign"></i>
                    </div>
                </div>
                <span class="stat-badge danger">
                    <i class="fas fa-arrow-down"></i> -0.23% vs mes anterior
                </span>
            </div>
        </div>

        

        <!-- MODULES SECTION -->
        <div class="section-header">
            <i class="fas fa-th"></i>
            <h2>Módulos de Acceso</h2>
        </div>

        <div class="modules-grid">
            <?=renderizarModulosAcceso()?>
        </div>


        <?=renderizarCajaAccesosDirectos()?>

        <!--<div class="row g-3">
            <div class="col">
                
                <div class="sidebar-box">
                    <h5 class="sidebar-title">
                        <i class="fas fa-chart-pie me-2"></i>Progreso de Registro de Línea Base
                    </h5>
                    <div class="progress-circle">
                        <div class="progress-circle-inner">
                            <div class="progress-value">85%</div>
                            <div class="progress-label">Completado</div>
                        </div>
                    </div>
                    <div class="stat-row">
                        <div class="stat-item">
                            <p>Activos</p>
                            <h4>675</h4>
                        </div>
                        <div class="stat-item">
                            <p>Completados</p>
                            <h4>250</h4>
                        </div>
                        <div class="stat-item">
                            <p>En Pausa</p>
                            <h4>50</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="sidebar-box">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5 class="sidebar-title m-0">
                            <i class="fas fa-bell me-2"></i>Notificaciones
                        </h5>
                        <a href="#" class="btn btn-sm btn-outline-primary">Ver todo</a>
                    </div>

                    <div class="notification-card success">
                        <div class="notification-title">
                            <i class="fas fa-file-alt me-2"></i>Laura Méndez completó estudio
                        </div>
                        <div class="notification-time"><i class="far fa-clock me-1"></i>hace 10 min</div>
                    </div>

                    <div class="notification-card warning">
                        <div class="notification-title">
                            <i class="fas fa-user-plus me-2"></i>Nuevo emprendedor Ana García
                        </div>
                        <div class="notification-time"><i class="far fa-clock me-1"></i>hace 25 min</div>
                    </div>

                    <div class="notification-card info">
                        <div class="notification-title">
                            <i class="fas fa-chalkboard-teacher me-2"></i>Taller "Marketing Digital" mañana
                        </div>
                        <div class="notification-time"><i class="far fa-clock me-1"></i>hace 1 hora</div>
                    </div>
                </div>
            </div>
        </div>-->

    </main>

    <!-- MODALS -->

    <!-- Modal Administración -->
    <div class="modal fade" id="adminModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title fw-bold" style="color: var(--primary);">
                        <i class="fas fa-users-cog me-2"></i>Administración General
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="modal-links">
                        <a href="../../../administracionGeneral/" class="modal-link">
                            <i class="fas fa-user-plus"></i>
                            <span>Administración de usuarios</span>
                        </a>
                        <a href="#" class="modal-link">
                            <i class="fas fa-file-invoice"></i>
                            <span>Información general</span>
                        </a>
                        <a href="#" class="modal-link">
                            <i class="fas fa-tasks"></i>
                            <span>Parámetros de Línea base</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Difusión -->
    <div class="modal fade" id="difusionModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title fw-bold" style="color: var(--success);">
                        <i class="fas fa-bullhorn me-2"></i>Difusión
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="modal-links">
                        <a href="../../../difusion/modules/etapa/" class="modal-link">
                            <i class="fas fa-layer-group"></i>
                            <span>Etapas</span>
                        </a>
                        <a href="../../../difusion/modules/taller/" class="modal-link">
                            <i class="fas fa-chalkboard-teacher"></i>
                            <span>Talleres</span>
                        </a>
                        <a href="../../../difusion/modules/instructores/" class="modal-link">
                            <i class="fas fa-user-tie"></i>
                            <span>Instructores</span>
                        </a>
                        <a href="../../../difusion/modules/asistenciaTaller/" class="modal-link">
                            <i class="fas fa-clipboard-check"></i>
                            <span>Asistencia</span>
                        </a>
                        <a href="../../../difusion/modules/altaEmprendedores/" class="modal-link">
                            <i class="fas fa-user-plus"></i>
                            <span>Nuevo Emprendedor</span>
                        </a>
                        <a href="../../../difusion/modules/listadoGeneralEmprendedores/" class="modal-link">
                            <i class="fas fa-history"></i>
                            <span>Historial de Emprendedores</span>
                        </a>
                        <a href="../../../difusion/modules/lineaBaseAdministracion/" class="modal-link">
                            <i class="fas fa-tasks"></i>
                            <span>Administración de la Linea Base</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Emprendimiento -->
    <div class="modal fade" id="emprendimientoModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title fw-bold" style="color: var(--accent);">
                        <i class="fas fa-lightbulb me-2"></i>Emprendimiento
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="modal-links">
                        <a href="../../../emprendimiento/modules/historialEmprendedores/" class="modal-link">
                            <i class="fas fa-user-graduate"></i>
                            <span>Seguimiento a Graduados</span>
                        </a>
                        <a href="../../../emprendimiento/modules/medicionImpactosCapacitacion/" class="modal-link">
                            <i class="fas fa-chalkboard-teacher"></i>
                            <span>Medición de Impacto: Capacitación</span>
                        </a>
                        <a href="../../../emprendimiento/modules/medicionImpactosCredito/" class="modal-link">
                            <i class="fas fa-money-bill-wave"></i>
                            <span>Medición de Impacto: Crédito</span>
                        </a>
                        <a href="../../../emprendimiento/modules/estadisticas/" class="modal-link">
                            <i class="fas fa-chart-bar"></i>
                            <span>Estadísticas</span>
                        </a>
                        <a href="../../../emprendimiento/modules/historialEmprendedores/" class="modal-link">
                            <i class="fas fa-history"></i>
                            <span>Historial de Emprendedores</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Trabajo Social -->
    <div class="modal fade" id="socialModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title fw-bold" style="color: var(--info);">
                        <i class="fas fa-people-carry me-2"></i>Trabajo Social
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="modal-links">
                        <a href="../../../trabajoSocial/modules/lineaBaseAdministracion/" class="modal-link">
                            <i class="fas fa-clipboard-check"></i>
                            <span>Ficha de Seguimiento</span>
                        </a>
                        <a href="../../../trabajoSocial/modules/estudioSocioeconomico/" class="modal-link">
                            <i class="fas fa-file-alt"></i>
                            <span>Estudio Socioeconómico</span>
                        </a>
                        <a href="../../../trabajoSocial/modules/configuracionConeval/" class="modal-link">
                            <i class="fas fa-cogs"></i>
                            <span>Configuración de Parámetros (CONEVAL)</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Crédito y cobranza -->
    <div class="modal fade" id="creditoModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title fw-bold" style="color: var(--primary);">
                        <i class="fas fa-credit-card me-2"></i>Crédito y cobranza
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="modal-links">
                        <a href="../../../cobranza/modules/inicio/" class="modal-link">
                            <i class="fas fa-history"></i>
                            <span>Historial de emprendedores</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <?php include 'footer.php'; ?>

    <script>
        function ready() {
        }
    </script>


    <!-- Scripts -->
    <?php include '../../../assets/commons/scripts.php'; ?>
</body>

</html>
