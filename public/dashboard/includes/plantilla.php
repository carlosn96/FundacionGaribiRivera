<?php
include_once "controlPermisos.php";
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include '../../../assets/commons/head.php'; ?>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --primary: #183f37;
            --primary-dark: #0f2420;
            --accent: #f3d03e;
            --success: #11998e;
            --info: #4facfe;
            --light-bg: #f6f7fb;
            --border: #e8eef7;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html,
        body {
            height: 100%;
        }

        body {
            background: linear-gradient(135deg, var(--light-bg) 0%, #ffffff 100%);
            font-family: 'Segoe UI', Roboto, sans-serif;
            color: #2d3748;
            min-height: 100vh;
        }

        /* NAVBAR */
        .navbar-custom {
            background: linear-gradient(135deg, var(--primary) 0%, #2a5f54 100%);
            box-shadow: 0 4px 20px rgba(24, 63, 55, 0.15);
            padding: 0.8rem 2rem;
        }

        .navbar-brand {
            font-size: 1.3rem;
            font-weight: 700;
            letter-spacing: -0.5px;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 0.8rem;
            color: white !important;
            filter: brightness(1.2);
        }

        .navbar-brand img {
            filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 25px rgba(243, 208, 62, 0.4)) drop-shadow(0 2px 8px rgba(255, 255, 255, 0.6));
            position: relative;
            z-index: 1;
        }

        .navbar-brand span {
            font-weight: 700;
            font-size: 1.1rem;
        }

        .navbar-nav {
            align-items: center;
        }

        .nav-item {
            margin: 0;
        }

        .nav-link {
            color: rgba(255, 255, 255, 0.88) !important;
            font-weight: 500;
            font-size: 0.95rem;
            transition: all 0.3s ease;
            position: relative;
            padding: 0.5rem 0.75rem !important;
            display: flex;
            align-items: center;
            white-space: nowrap;
            border-radius: 8px;
        }

        .nav-link:hover {
            color: white !important;
            background: rgba(255, 255, 255, 0.08);
        }

        .nav-link.active {
            color: white !important;
            background: rgba(255, 255, 255, 0.12);
            border-bottom: 3px solid var(--accent);
        }



        .nav-link:hover {
            color: white !important;
            background: rgba(255, 255, 255, 0.08);
        }

        .nav-link.active {
            color: white !important;
            background: rgba(255, 255, 255, 0.12);
        }

        .dropdown-menu {
            border: 2px solid var(--border) !important;
            border-radius: 12px !important;
            padding: 0.5rem 0;
        }

        .dropdown-item {
            padding: 0.7rem 1rem;
            font-size: 0.95rem;
            transition: all 0.2s ease;
            color: var(--primary);
            border-radius: 8px;
            margin: 0.2rem 0.3rem;
        }

        .dropdown-item:hover {
            background: var(--light-bg);
            color: var(--primary);
        }

        .dropdown-divider {
            margin: 0.3rem 0;
            opacity: 0.3;
        }

        .img-usuario {
            transition: transform 0.3s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .nav-link:hover .img-usuario {
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(243, 208, 62, 0.4);
        }

        /* MAIN LAYOUT */
        main {
            min-height: calc(100vh - 70px);
            padding: 2rem;
        }

        /* MAIN LAYOUT */
        main {
            min-height: calc(100vh - 70px);
            padding: 2rem;
        }

        /* WELCOME HERO */
        .welcome-header {
            background: linear-gradient(135deg, white 0%, #fafbfc 100%);
            border: 2px solid var(--border);
            border-radius: 20px;
            padding: 3rem;
            margin-bottom: 2rem;
            position: relative;
            overflow: hidden;
        }

        .welcome-header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -10%;
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(243, 208, 62, 0.08) 0%, transparent 70%);
            border-radius: 50%;
        }

        .welcome-header h1 {
            color: var(--primary);
            font-weight: 700;
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            position: relative;
            z-index: 1;
        }

        .welcome-header p {
            font-size: 1.1rem;
            color: #718096;
            position: relative;
            z-index: 1;
        }

        /* STATS GRID */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 3rem;
        }

        .stat-card {
            background: white;
            border: 2px solid var(--border);
            border-radius: 16px;
            padding: 1.5rem;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
        }

        .stat-card:hover {
            border-color: var(--primary);
            box-shadow: 0 12px 30px rgba(24, 63, 55, 0.12);
            transform: translateY(-4px);
        }

        .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            right: -30px;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            opacity: 0.05;
            transition: all 0.3s ease;
        }

        .stat-card.primary::before {
            background: var(--primary);
        }

        .stat-card.success::before {
            background: var(--success);
        }

        .stat-card.info::before {
            background: var(--info);
        }

        .stat-card.accent::before {
            background: var(--accent);
        }

        .stat-card:hover::before {
            right: -10px;
            opacity: 0.1;
        }

        .stat-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1rem;
        }

        .stat-info h3 {
            font-size: 2rem;
            font-weight: 700;
            color: var(--primary);
            margin: 0.5rem 0;
        }

        .stat-label {
            font-size: 0.85rem;
            font-weight: 600;
            color: #a0aec0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .stat-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            padding: 0.4rem 0.8rem;
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: 600;
        }

        .stat-badge.success {
            background: rgba(17, 153, 142, 0.1);
            color: var(--success);
        }

        .stat-badge.danger {
            background: rgba(220, 53, 69, 0.1);
            color: #dc3545;
        }

        .stat-icon {
            width: 60px;
            height: 60px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            color: white;
        }

        /* MODULES SECTION */
        .section-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }

        .section-header h2 {
            font-size: 1.4rem;
            font-weight: 700;
            color: var(--primary);
            margin: 0;
        }

        .section-header i {
            font-size: 1.6rem;
            color: var(--accent);
        }

        .modules-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
            margin-bottom: 3rem;
        }

        .module-card {
            background: white;
            border: 2px solid var(--border);
            border-radius: 16px;
            padding: 1.8rem;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
        }

        .module-card:hover {
            border-color: var(--primary);
            box-shadow: 0 16px 40px rgba(24, 63, 55, 0.15);
            transform: translateY(-6px);
        }

        .module-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.2rem;
        }

        .module-icon {
            width: 56px;
            height: 56px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            color: white;
            transition: transform 0.3s ease;
        }

        .module-card:hover .module-icon {
            transform: scale(1.1) rotate(5deg);
        }

        .module-title {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 0.3rem;
        }

        .module-count {
            display: inline-block;
            padding: 0.3rem 0.7rem;
            background: rgba(24, 63, 55, 0.08);
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--primary);
        }

        .module-desc {
            color: #718096;
            font-size: 0.95rem;
            margin-bottom: 1rem;
            line-height: 1.5;
        }

        .module-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--primary);
            font-weight: 600;
            font-size: 0.95rem;
            transition: all 0.3s ease;
        }

        .module-card:hover .module-link {
            gap: 1rem;
        }

        /* TABLE SECTION */
        .table-wrapper {
            background: white;
            border: 2px solid var(--border);
            border-radius: 16px;
            overflow: hidden;
        }

        .table-header {
            padding: 1.5rem;
            border-bottom: 2px solid var(--border);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .table-header h3 {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--primary);
            margin: 0;
        }

        .table-custom {
            font-size: 0.95rem;
        }

        .table-custom thead th {
            background: var(--light-bg);
            border: none;
            color: #718096;
            font-weight: 600;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 1rem;
        }

        .table-custom tbody tr {
            border-top: 1px solid var(--border);
            transition: background 0.2s ease;
        }

        .table-custom tbody tr:hover {
            background: var(--light-bg);
        }

        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            margin-right: 0.8rem;
        }

        .badge-custom {
            padding: 0.4rem 0.8rem;
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: 600;
        }

        /* SIDEBAR */
        .sidebar-box {
            background: white;
            border: 2px solid var(--border);
            border-radius: 16px;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
            transition: all 0.3s ease;
        }

        .sidebar-box:hover {
            border-color: var(--primary);
            box-shadow: 0 8px 20px rgba(24, 63, 55, 0.1);
        }

        .sidebar-title {
            font-size: 1rem;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 1rem;
        }

        .progress-circle {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: conic-gradient(var(--primary) 0deg 306deg, var(--light-bg) 306deg);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
            position: relative;
        }

        .progress-circle-inner {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }

        .progress-value {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--primary);
        }

        .progress-label {
            font-size: 0.75rem;
            color: #718096;
        }

        .stat-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            text-align: center;
            padding-top: 1rem;
            border-top: 1px solid var(--border);
        }

        .stat-item h4 {
            font-size: 1.3rem;
            font-weight: 700;
            color: var(--primary);
            margin: 0.5rem 0 0;
        }

        .stat-item p {
            font-size: 0.8rem;
            color: #a0aec0;
            margin: 0;
        }

        /* NOTIFICATIONS */
        .notification-card {
            background: var(--light-bg);
            border-left: 4px solid transparent;
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 0.8rem;
            transition: all 0.3s ease;
        }

        .notification-card:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .notification-card.success {
            border-left-color: var(--success);
        }

        .notification-card.warning {
            border-left-color: var(--accent);
        }

        .notification-card.info {
            border-left-color: var(--info);
        }

        .notification-title {
            font-weight: 600;
            color: var(--primary);
            margin-bottom: 0.3rem;
        }

        .notification-time {
            font-size: 0.8rem;
            color: #a0aec0;
        }

        /* ACTION BUTTONS */
        .action-buttons {
            display: grid;
            gap: 0.8rem;
        }

        .btn-action {
            padding: 1rem;
            border-radius: 12px;
            font-weight: 600;
            border: none;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            font-size: 0.95rem;
        }

        .btn-primary-action {
            background: linear-gradient(135deg, var(--accent) 0%, #d4b534 100%);
            color: var(--primary);
        }

        .btn-primary-action:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(243, 208, 62, 0.3);
            color: var(--primary);
        }

        .btn-secondary-action {
            background: var(--light-bg);
            color: var(--primary);
            border: 2px solid var(--border);
        }

        .btn-secondary-action:hover {
            background: white;
            border-color: var(--primary);
            color: var(--primary);
            transform: translateY(-2px);
        }

        /* MODALS */
        .modal-content {
            border: 2px solid var(--border);
            border-radius: 16px;
        }

        .modal-header {
            border-bottom: 2px solid var(--border);
            padding: 1.5rem;
        }

        .modal-title {
            font-weight: 700;
            color: var(--primary);
        }

        .modal-body {
            padding: 1.5rem;
        }

        .modal-links {
            display: grid;
            gap: 0.8rem;
        }

        .modal-link {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            padding: 0.8rem 1rem;
            border: 2px solid var(--border);
            border-radius: 10px;
            color: var(--primary);
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        .modal-link:hover {
            background: var(--light-bg);
            border-color: var(--primary);
            color: var(--primary);
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
            main {
                padding: 1rem;
            }

            .welcome-header {
                padding: 1.5rem;
                text-align: center;
            }

            .welcome-header h1 {
                font-size: 1.8rem;
            }

            .stats-grid,
            .modules-grid {
                grid-template-columns: 1fr;
            }

            .stat-row {
                grid-template-columns: 1fr;
            }

            .navbar-custom {
                padding: 0.6rem 1rem;
            }

            .nav-link {
                padding: 0.4rem 0.6rem !important;
            }

            .navbar-brand {
                font-size: 1.1rem;
            }
        }
    </style>
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

            <button class="navbar-toggler border-0 ms-auto" type="button" data-bs-toggle="collapse"
                data-bs-target="#mainNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="mainNavbar">
                <ul class="navbar-nav mx-auto gap-0">
                    <li class="nav-item">
                        <a class="nav-link active" href="#inicio" title="Dashboard">
                            <i class="fas fa-home"></i><span class="d-none d-lg-inline ms-2">Dashboard</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#adminModal"
                            title="Administración">
                            <i class="fas fa-users-cog"></i><span class="d-none d-lg-inline ms-2">Administración</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#difusionModal"
                            title="Difusión">
                            <i class="fas fa-bullhorn"></i><span class="d-none d-lg-inline ms-2">Difusión</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#emprendimientoModal"
                            title="Emprendimiento">
                            <i class="fas fa-lightbulb"></i><span class="d-none d-lg-inline ms-2">Emprendimiento</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#socialModal"
                            title="Trabajo Social">
                            <i class="fas fa-people-carry"></i><span class="d-none d-lg-inline ms-2">Trabajo
                                Social</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#creditoModal"
                            title="Crédito y cobranza">
                            <i class="fas fa-credit-card"></i><span class="d-none d-lg-inline ms-2">Crédito y
                                cobranza</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" title="Reportes">
                            <i class="fas fa-file-pdf"></i><span class="d-none d-lg-inline ms-2">Reportes</span>
                        </a>
                    </li>
                </ul>

                <div class="d-flex align-items-center ms-auto">
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
    <?php include '../../../assets/commons/footer.php'; ?>

    <script>
        function ready() {
        }
    </script>


    <!-- Scripts -->
    <?php include '../../../assets/commons/scripts.php'; ?>
</body>

</html>