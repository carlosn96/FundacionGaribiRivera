<aside class="left-sidebar with-vertical">
    <!-- ---------------------------------- -->
    <!-- Start Vertical Layout Sidebar -->
    <!-- ---------------------------------- -->
    <div class="brand-logo d-flex align-items-center justify-content-between">
        <a href="../../" class="text-nowrap logo-img">
            <img src="../../../assets/images/logos/logo-dark.svg" class="dark-logo img-fluid" alt="Logo-Dark" />
            <img src="../../../assets/images/logos/logo-light.svg" class="light-logo img-fluid" alt="Logo-light" />
        </a>
        <a href="javascript:void(0)" class="sidebartoggler ms-auto text-decoration-none fs-5 d-block d-xl-none">
            <i class="ti ti-x"></i>
        </a>
    </div>
    <div class="scroll-sidebar" data-simplebar>
        <!-- Sidebar navigation-->
        <nav class="sidebar-nav">
            <ul id="sidebarnav" class="mb-0">
                <!-- ============================= -->
                <!-- Inicio -->
                <!-- ============================= -->
                <li class="nav-small-cap">
                    <span class="hide-menu">Inicio</span>
                </li>
                <li class="sidebar-item">
                    <a class="sidebar-link primary-hover-bg" href="../inicio/" aria-expanded="false">
                        <span class="aside-icon p-2 bg-primary-subtle rounded-1">
                            <!-- Ícono actualizado para "Inicio" -->
                            <iconify-icon icon="mdi:home" class="fs-6"></iconify-icon>
                        </span>
                        <span class="hide-menu ps-1">Inicio</span>
                    </a>
                </li>
                <!-- ============================= -->
                <!-- Configuracion -->
                <!-- ============================= -->
                <li class="nav-small-cap">
                    <span class="hide-menu">Configuración</span>
                </li>
                <li class="sidebar-item">
                    <a class="sidebar-link sidebar-link success-hover-bg" href="../informacionGeneral/" aria-expanded="false">
                        <span class="aside-icon p-2 bg-success-subtle rounded-1">
                            <!-- Ícono actualizado para "Información General" -->
                            <iconify-icon icon="mdi:information-outline" class="fs-6"></iconify-icon>
                        </span>
                        <span class="hide-menu ps-1">Información General</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a class="sidebar-link sidebar-link success-hover-bg" href="../actualizacionParametros/" aria-expanded="false">
                        <span class="aside-icon p-2 bg-success-subtle rounded-1">
                            <!-- Ícono actualizado para "Actualización de parámetros" -->
                            <iconify-icon icon="mdi:cogs" class="fs-6"></iconify-icon>
                        </span>
                        <span class="hide-menu ps-1">Parámetros</span>
                    </a>
                </li>
            </ul>
        </nav>
        <!-- End Sidebar navigation -->
    </div>

    <div class="fixed-profile mx-3 mt-3">
        <div class="card bg-primary-subtle mb-0 shadow-none">
            <div class="card-body p-4">
                <div class="d-flex align-items-center justify-content-between gap-3">
                    <div class="d-flex align-items-center gap-3">
                        <img src="data:image/jpeg;base64," width="45" height="45" class="img-fluid rounded-circle img-usuario" alt="img-usuario" />
                        <div>
                            <h5 class="mb-1 profile-name"></h5>
                            <p class="mb-0 profile-subtext"></p>
                        </div>
                    </div>
                    <a href="javascript:cerrarSesion()" class="position-relative" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Salir">
                        <iconify-icon icon="solar:logout-line-duotone" class="fs-8"></iconify-icon>
                    </a>
                </div>
            </div>
        </div>
    </div>
</aside>
