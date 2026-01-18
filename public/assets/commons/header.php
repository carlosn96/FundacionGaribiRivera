<nav class="navbar navbar-expand-lg p-0">
    <ul class="navbar-nav">
        <li class="nav-item nav-icon-hover-bg rounded-circle">
            <a class="nav-link sidebartoggler" id="headerCollapse" href="javascript:void(0)">
                <iconify-icon icon="solar:list-bold-duotone" class="fs-7"></iconify-icon>
            </a>
        </li>
    </ul>

    <div class="d-block d-lg-none py-3">
        <img src="../../../assets/images/logos/logo-dark.svg" class="dark-logo img-fluid" alt="Logo-Dark" />
        <img src="../../../assets/images/logos/logo-light.svg" class="light-logo img-fluid" alt="Logo-light" />
    </div>

    <a class="navbar-toggler p-0 border-0" href="javascript:void(0)" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="p-2">
            <i class="ti ti-dots fs-7"></i>
        </span>
    </a>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <div class="d-flex align-items-center justify-content-between">

            <ul class="navbar-nav flex-row ms-auto align-items-center justify-content-center">
                <li class="nav-item nav-icon-hover-bg rounded-circle">
                    <a class="nav-link moon dark-layout" href="javascript:void(0)">
                        <iconify-icon icon="solar:moon-line-duotone" class="moon fs-6"></iconify-icon>
                    </a>
                    <a class="nav-link sun light-layout" href="javascript:void(0)">
                        <iconify-icon icon="solar:sun-2-line-duotone" class="sun fs-6"></iconify-icon>
                    </a>
                </li>
                <!-- ------------------------------- -->
                <!-- start Messages cart Dropdown -->
                <!-- ------------------------------- -->
<!--                <li class="nav-item dropdown nav-icon-hover-bg rounded-circle">
                                           <a class="nav-link position-relative" href="javascript:void(0)" id="drop3" aria-expanded="false">
                                            <iconify-icon icon="solar:chat-dots-line-duotone" class="fs-6"></iconify-icon>
                                            <div class="pulse">
                                                <span class="heartbit border-warning"></span>
                                                <span class="point text-bg-warning"></span>
                                            </div>
                                        </a>
                                     <div class="dropdown-menu content-dd dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop3">
                                              Messages 
                                            <div class="d-flex align-items-center py-3 px-7">
                                                <h3 class="mb-0 fs-5">Mensajes</h3>
                                                <span class="badge bg-success ms-3">1 nuevo</span>
                                            </div>
                    
                                            <div class="message-body" data-simplebar>
                                                <a href="javascript:void(0)" class="dropdown-item px-7 d-flex align-items-center py-6">
                                                    <span class="flex-shrink-0">
                                                        <img src="../../../assets/images/profile/user-2.jpg" alt="user" width="45" class="rounded-circle" />
                                                    </span>
                                                    <div class="w-100 ps-3">
                                                        <div class="d-flex align-items-center justify-content-between">
                                                            <h5 class="mb-0 fs-3 fw-normal">
                                                                Roman Joined the Team!
                                                            </h5>
                                                            <span class="fs-2 text-nowrap d-block text-muted">9:08 AM</span>
                                                        </div>
                                                        <span class="fs-2 d-block mt-1 text-muted">Congratulate him</span>
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="py-6 px-7 mb-1">
                                                <button class="btn btn-warning w-100">
                                                    Ver todos los mensajes
                                                </button>
                                            </div>
                                        </div>
                </li>-->
                <!-- ------------------------------- -->
                <!-- end Messages cart Dropdown -->
                <!-- ------------------------------- -->



                <!-- ------------------------------- -->
                <!-- start profile Dropdown -->
                <!-- ------------------------------- -->
                <li class="nav-item dropdown">
                    <a class="nav-link position-relative ms-6" href="javascript:void(0)" id="drop1" aria-expanded="false">
                        <div class="d-flex align-items-center flex-shrink-0">
                            <div class="user-profile me-sm-3 me-2">
                                <img src="data:image/jpeg;base64," width="40" class="img-usuario rounded-circle" alt="img-usuario">
                            </div>
                            <span class="d-sm-none d-block"><iconify-icon icon="solar:alt-arrow-down-line-duotone"></iconify-icon></span>
                        </div>
                    </a>
                    <div class="dropdown-menu content-dd dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop1">
                        <div class="profile-dropdown position-relative" data-simplebar>
                            <div class="d-flex align-items-center justify-content-between pt-3 px-7">
                                <h3 class="mb-0 fs-5">Perfil de usuario</h3>
                            </div>

                            <div class="d-flex align-items-center mx-7 py-9 border-bottom">
                                <img src="data:image/jpeg;base64," alt="img-usuario" width="90" class="img-usuario rounded-circle" />
                                <div class="ms-4">
                                    <h4 class="mb-0 fs-5 fw-normal profile-name-full"></h4>
                                    <span class="profile-subtext badge fs-2 fw-bold rounded-pill bg-warning border-warning border"></span>
                                    <p class="text-muted mb-0 mt-1 d-flex align-items-center profile-emailD">
                                    <iconify-icon icon="solar:mailbox-line-duotone" class="fs-4 me-1"></iconify-icon>
                                    </p>
                                </div>
                            </div>

                            <div class="message-body">
                                <a id="urlPerfil" href="../../../configuracionUsuario/" class="dropdown-item px-7 d-flex align-items-center py-6">
                                    <span class="btn px-3 py-2 bg-warning-subtle rounded-1 text-warning shadow-none">
                                        <iconify-icon icon="solar:wallet-2-line-duotone" class="fs-7"></iconify-icon>
                                    </span>
                                    <div class="w-100 ps-3 ms-1">
                                        <h5 class="mb-0 mt-1 fs-4 fw-normal">
                                            Mi perfil
                                        </h5>
                                        <span class="fs-3 d-block mt-1 text-muted">Configuración de la cuenta</span>
                                    </div>
                                </a>
                            </div>

                            <div class="py-6 px-7 mb-1">
                                <a href="javascript:cerrarSesion()" class="btn btn-outline-warning w-100">Cerrar sesión</a>
                            </div>
                        </div>
                    </div>
                </li>
                <!-- ------------------------------- -->
                <!-- end profile Dropdown -->
                <!-- ------------------------------- -->
            </ul>
        </div>
    </div>
</nav>