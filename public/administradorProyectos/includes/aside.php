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
                    <a class="sidebar-link warning-hover-bg" href="../inicio/" aria-expanded="false">
                        <span class="aside-icon p-2 bg-warning-subtle rounded-1">
                            <iconify-icon icon="solar:screencast-2-line-duotone" class="fs-6"></iconify-icon>
                        </span>
                        <span class="hide-menu ps-1">Inicio</span>
                    </a>
                </li>
                <!-- ============================= -->
                <!-- Configuraciones -->
                <!-- ============================= -->
                <li class="nav-small-cap">
                    <span class="hide-menu">Configuraciones</span>
                </li>
                <li class="sidebar-item">
                    <a class="sidebar-link sidebar-link success-hover-bg" href="../etapa/" aria-expanded="false">
                        <span class="aside-icon p-2 bg-warning-subtle rounded-1">
                            <iconify-icon icon="solar:calendar-add-broken" class="fs-6"></iconify-icon>
                        </span>
                        <span class="hide-menu ps-1">Etapas de formación</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a class="sidebar-link has-arrow success-hover-bg" href="javascript:void(0)" aria-expanded="false">
                        <span class="aside-icon p-2 bg-warning-subtle rounded-1">
                            <iconify-icon icon="solar:square-academic-cap-line-duotone" class="fs-6"></iconify-icon>
                        </span>
                        <span class="hide-menu ps-1">Talleres</span>
                    </a>
                    <ul aria-expanded="false" class="collapse first-level">
                        <li class="sidebar-item">
                            <a href="../taller/" class="sidebar-link">
                                <span class="sidebar-icon"></span>
                                <span class="hide-menu">Lista de talleres</span>
                            </a>
                        </li>
                        <li class="sidebar-item">
                            <a href="../instructores/" class="sidebar-link">
                                <span class="sidebar-icon"></span>
                                <span class="hide-menu">Instructores</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <!-- ============================= -->
                <!-- Seguimiento -->
                <!-- ============================= -->
                <li class="nav-small-cap">
                    <span class="hide-menu">Seguimiento</span>
                </li>
                <li class="sidebar-item">
                    <a class="sidebar-link sidebar-link success-hover-bg" href="../seguimientoCaso/" aria-expanded="false">
                        <span class="aside-icon p-2 bg-success-subtle rounded-1">
                            <iconify-icon icon="solar:file-text-line-duotone" class="fs-6"></iconify-icon>
                        </span>
                        <span class="hide-menu ps-1">Seguimiento de caso</span>
                    </a>
                </li>
                <!--                <li class="sidebar-item">
                                    <a class="sidebar-link sidebar-link success-hover-bg" href="#" aria-expanded="false">
                                        <span class="aside-icon p-2 bg-success-subtle rounded-1">
                                            <iconify-icon icon="solar:clipboard-check-broken" class="fs-6"></iconify-icon>
                                        </span>
                                        <span class="hide-menu ps-1">Visita de seguimiento</span>
                                    </a>
                                </li>-->
                <li class="nav-small-cap">
                    <span class="hide-menu">Impacto</span>
                </li>
                <li class="sidebar-item">
                    <a class="sidebar-link sidebar-link success-hover-bg" href="../medicionImpactos/" aria-expanded="false">
                        <span class="aside-icon p-2 bg-success-subtle rounded-1">
                            <iconify-icon icon="streamline:decent-work-and-economic-growth" class="fs-6"></iconify-icon>
                        </span>
                        <span class="hide-menu ps-1">Medición de Impactos</span>
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
                        <img src="data:image/jpeg;base64," width="45" height="45" class="img-usuario img-fluid rounded-circle" alt="spike-img" />
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
