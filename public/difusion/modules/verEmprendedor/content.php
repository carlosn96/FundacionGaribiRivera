<div class="container-fluid py-4" style="background-color: #f8fafc; min-height: 100vh;">
    <!-- Navegación -->
    <div class="row mb-4">
        <div class="col-12">
            <a href="../listadoGeneralEmprendedores/" class="btn btn-outline-secondary btn-sm">
                <i class="ti ti-arrow-left me-2"></i>Volver al listado
            </a>
        </div>
    </div>

    <!-- Alert Container -->
    <div id="alert-container" class="row mb-4">
        <div class="col-12"></div>
    </div>

    <!-- Perfil del Emprendedor -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="card border-0 shadow-sm rounded-3">
                <!-- Loading State -->
                <div id="emprendedor-loading-spinner" class="text-center py-5">
                    <div class="spinner-border text-primary spinner-border-sm" role="status" style="width: 2.5rem; height: 2.5rem;">
                        <span class="visually-hidden">Cargando...</span>
                    </div>
                    <p class="mt-3 text-muted small">Cargando información del emprendedor...</p>
                </div>

                <!-- Content -->
                <div id="emprendedor-info-container" style="display: none;">
                    <div class="row g-0">
                        <!-- Photo Section -->
                        <div class="col-md-4 p-4 d-flex flex-column align-items-center justify-content-center" style="background-color: #f0f4f3; border-right: 1px solid #e8ebe9;">
                            <div class="mb-3" style="position: relative; width: 140px; height: 140px;">
                                <img id="emprendedor-photo" src="" alt="Foto del emprendedor" 
                                     class="rounded-circle" 
                                     style="width: 100%; height: 100%; object-fit: cover; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            </div>
                            <h3 id="emprendedor-name" class="text-dark fw-bold text-center mb-2" style="font-size: 1.25rem;">
                                Nombre del Emprendedor
                            </h3>
                            <span id="emprendedor-status-badge" class="badge bg-success rounded-pill px-3 py-2" style="font-size: 0.8rem;">
                                <i class="ti ti-circle-filled me-1" style="font-size: 0.5rem;"></i>Activo
                            </span>
                        </div>

                        <!-- Info Section -->
                        <div class="col-md-8 p-4">
                            <div class="row g-3">
                                <!-- Email -->
                                <div class="col-12 col-lg-6">
                                    <div class="d-flex gap-2">
                                        <div class="flex-shrink-0">
                                            <div class="p-2 rounded-2" style="background-color: rgba(24,63,55,0.08);">
                                                <i class="ti ti-mail text-primary" style="font-size: 1.2rem;"></i>
                                            </div>
                                        </div>
                                        <div class="flex-grow-1">
                                            <p class="text-muted mb-1" style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Correo</p>
                                            <a id="emprendedor-email" href="mailto:" class="text-decoration-none text-dark fw-500 small">correo@ejemplo.com</a>
                                        </div>
                                    </div>
                                </div>

                                <!-- Phone -->
                                <div class="col-12 col-lg-6">
                                    <div class="d-flex gap-2">
                                        <div class="flex-shrink-0">
                                            <div class="p-2 rounded-2" style="background-color: rgba(24,63,55,0.08);">
                                                <i class="ti ti-phone text-primary" style="font-size: 1.2rem;"></i>
                                            </div>
                                        </div>
                                        <div class="flex-grow-1">
                                            <p class="text-muted mb-1" style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Teléfono</p>
                                            <a id="emprendedor-phone" href="tel:" class="text-decoration-none text-dark fw-500 small">+1 (000) 000-0000</a>
                                        </div>
                                    </div>
                                </div>

                                <!-- Inscription Date -->
                                <div class="col-12 col-lg-6">
                                    <div class="d-flex gap-2">
                                        <div class="flex-shrink-0">
                                            <div class="p-2 rounded-2" style="background-color: rgba(24,63,55,0.08);">
                                                <i class="ti ti-calendar text-primary" style="font-size: 1.2rem;"></i>
                                            </div>
                                        </div>
                                        <div class="flex-grow-1">
                                            <p class="text-muted mb-1" style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Inscripción</p>
                                            <p id="emprendedor-inscription-date" class="fw-500 mb-0 small text-dark">01/01/2024</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Business Info -->
                                <div class="col-12 col-lg-6">
                                    <div class="d-flex gap-2">
                                        <div class="flex-shrink-0">
                                            <div class="p-2 rounded-2" style="background-color: rgba(24,63,55,0.08);">
                                                <i class="ti ti-briefcase text-primary" style="font-size: 1.2rem;"></i>
                                            </div>
                                        </div>
                                        <div class="flex-grow-1">
                                            <p class="text-muted mb-1" style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Negocio</p>
                                            <p id="emprendedor-business" class="fw-500 mb-0 small text-dark">—</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Etapa y Asistencias -->
    <div class="row g-4 mb-4">
        <!-- Etapa Actual -->
        <div class="col-12 col-lg-6">
            <div class="card border-0 shadow-sm rounded-3 h-100">
                <div class="card-header border-bottom" style="background-color: #f0f4f3; border-color: #e8ebe9 !important;">
                    <h5 class="card-title mb-0 text-dark fw-bold">
                        <i class="ti ti-stairs me-2" style="color: #183f37;"></i>Etapa Actual
                    </h5>
                </div>
                <div class="card-body" id="etapa-info-container">
                    <!-- Loading -->
                    <div class="text-center py-4" id="etapa-loading-spinner">
                        <div class="spinner-border spinner-border-sm text-primary" role="status">
                            <span class="visually-hidden">Cargando...</span>
                        </div>
                        <p class="mt-2 text-muted small">Cargando...</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Asistencias -->
        <div class="col-12 col-lg-6">
            <div class="card border-0 shadow-sm rounded-3 h-100">
                <div class="card-header border-bottom" style="background-color: #f0f4f3; border-color: #e8ebe9 !important;">
                    <h5 class="card-title mb-0 text-dark fw-bold">
                        <i class="ti ti-checkbox me-2" style="color: #183f37;"></i>Asistencias
                    </h5>
                </div>
                <div class="card-body" id="asistencias-list-container">
                    <!-- Loading -->
                    <div class="text-center py-4" id="asistencias-loading-spinner">
                        <div class="spinner-border spinner-border-sm text-primary" role="status">
                            <span class="visually-hidden">Cargando...</span>
                        </div>
                        <p class="mt-2 text-muted small">Cargando...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>