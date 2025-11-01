<aside class="left-sidebar with-vertical">
    <!-- Brand Logo -->
    <div class="brand-logo d-flex align-items-center justify-content-between">
        <a href="../../" class="text-nowrap logo-img">
            <img src="../../../assets/images/logos/logo-dark.svg" class="dark-logo img-fluid" alt="Logo-Dark" />
            <img src="../../../assets/images/logos/logo-light.svg" class="light-logo img-fluid" alt="Logo-light" />
        </a>
        <a href="javascript:void(0)" class="sidebartoggler ms-auto text-decoration-none fs-5 d-block d-xl-none">
            <i class="ti ti-x"></i>
        </a>
    </div>

    <!-- Sidebar Content -->
    <div class="scroll-sidebar" data-simplebar>
        <nav class="sidebar-nav">
            <ul id="sidebarnav" class="mb-0">
                <!-- Sección: Navegación -->
                <li class="nav-small-cap">
                    <iconify-icon icon="solar:menu-dots-bold-duotone" class="nav-small-cap-icon fs-5"></iconify-icon>
                    <span class="hide-menu">Navegación</span>
                </li>

                <!-- Botón de Retroceso -->
                <li class="sidebar-item">
                    <a class="sidebar-link primary-hover-bg" href="javascript:history.back()" aria-expanded="false">
                        <span class="aside-icon p-2 bg-primary-subtle rounded-1">
                            <iconify-icon icon="solar:arrow-left-line-duotone" class="fs-6"></iconify-icon>
                        </span>
                        <span class="hide-menu ps-1">Volver</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>

    <!-- Fixed Profile -->
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