<div class="container-fluid p-0">
    <div class="card border-0 shadow-sm">
        
        <!-- Mobile Header -->
        <div class="d-lg-none bg-white border-bottom">
            <div class="d-flex align-items-center gap-3 p-3">
                <button class="btn btn-primary d-flex align-items-center justify-content-center" 
                        type="button" 
                        data-bs-toggle="offcanvas" 
                        data-bs-target="#chat-sidebar" 
                        aria-controls="chat-sidebar"
                        style="width: 40px; height: 40px;">
                    <i class="ti ti-menu-2 fs-5"></i>
                </button>
                <div class="position-relative flex-grow-1">
                    <input type="text" 
                           class="form-control search-chat ps-5 pe-3 py-2 border-0 bg-body-secondary" 
                           placeholder="Buscar usuario">
                    <i class="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-muted ms-3"></i>
                </div>
            </div>
        </div>

        <!-- Main Content Wrapper -->
        <div class="d-flex w-100" style="height: calc(100vh - 120px);">
            
            <!-- Sidebar - Desktop -->
            <div class="left-part bg-body-secondary d-none d-lg-flex flex-column border-end" style="width: 280px; min-width: 280px;">
                <div class="p-3 bg-white border-bottom">
                    <button class="btn btn-primary fw-semibold w-100 d-flex align-items-center justify-content-center gap-2 py-2">
                        <i class="ti ti-plus fs-5"></i>
                        <span>Nuevo usuario</span>
                    </button>
                </div>
                
                <div class="flex-grow-1 overflow-auto">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item border-0 bg-transparent px-3 py-2">
                            <a class="d-flex align-items-center gap-3 text-decoration-none text-dark px-3 py-2 rounded-2 all-contacts-btn hover-bg-primary-subtle transition-all" 
                               href="javascript:void(0)">
                                <div class="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-2" 
                                     style="width: 40px; height: 40px;">
                                    <i class="ti ti-inbox fs-5 text-primary"></i>
                                </div>
                                <span class="fw-semibold">Todos los usuarios</span>
                            </a>
                        </li>
                        <li class="border-top mx-3 my-2"></li>
                        <li class="px-3 py-2">
                            <p class="text-uppercase text-muted fw-semibold small mb-0 ls-1">Permisos de usuario</p>
                        </li>
                        <li class="list-group-item border-0 bg-transparent px-3">
                            <div id="user-roles-container"></div>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Content Area Wrapper -->
            <div class="d-flex flex-grow-1 overflow-hidden">
                
                <!-- Contacts List Panel -->
                <div class="bg-white d-flex flex-column border-end" style="width: 380px; min-width: 320px;">
                    <div class="user-chat-box h-100 d-flex flex-column">
                        
                        <!-- Search Bar - Desktop -->
                        <div class="p-3 d-none d-lg-block bg-white border-bottom">
                            <div class="position-relative">
                                <input type="text" 
                                       class="form-control search-chat ps-5 pe-3 py-2 bg-body-secondary border-0" 
                                       placeholder="Buscar usuario..." />
                                <i class="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-muted ms-3"></i>
                            </div>
                        </div>
                        
                        <!-- Contacts List -->
                        <div class="app-chat flex-grow-1 overflow-auto">
                            <ul class="chat-users list-unstyled mb-0">
                                <!-- Contacts will be dynamically inserted here -->
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Contact Details Panel -->
                <div class="flex-grow-1 bg-white d-flex flex-column overflow-hidden">
                    <div class="chat-container h-100 d-flex flex-column">
                        <div class="chat-box-inner-part h-100 d-flex flex-column">
                            <div class="chatting-box app-email-chatting-box flex-grow-1 d-flex flex-column" style="display: none;">
                                
                                <!-- Header -->
                                <div class="p-3 bg-white border-bottom">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="d-flex align-items-center gap-2">
                                            <a class="text-dark d-lg-none d-flex align-items-center justify-content-center back-btn rounded-circle hover-bg-light" 
                                               href="javascript:void(0)" 
                                               style="width: 36px; height: 36px;">
                                                <i class="ti ti-arrow-left fs-5"></i>
                                            </a>
                                            <h5 class="mb-0 fw-semibold">Detalles del usuario</h5>
                                        </div>
                                        <div class="d-flex align-items-center gap-2">
                                            <button id="btn-editar-usuario" 
                                                    class="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center" 
                                                    style="width: 36px; height: 36px;" 
                                                    data-bs-toggle="tooltip" 
                                                    data-bs-placement="top" 
                                                    title="Editar usuario">
                                                <i class="ti ti-pencil fs-5"></i>
                                            </button>
                                            <button id="btn-eliminar-usuario" 
                                                    class="btn btn-sm btn-outline-danger rounded-circle d-flex align-items-center justify-content-center" 
                                                    style="width: 36px; height: 36px;" 
                                                    data-bs-toggle="tooltip" 
                                                    data-bs-placement="top" 
                                                    title="Eliminar usuario">
                                                <i class="ti ti-trash fs-5"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Content Area -->
                                <div class="position-relative flex-grow-1 overflow-auto bg-body-secondary">
                                    <div class="chat-box email-box p-3 p-lg-4">
                                        <!-- Contact details will be dynamically inserted here -->
                                        <div class="d-flex align-items-center justify-content-center h-100 text-muted">
                                            <div class="text-center py-5">
                                                <i class="ti ti-user-circle mb-3 d-block" style="font-size: 4rem;"></i>
                                                <p class="mb-0">Selecciona un usuario para ver sus detalles</p>
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

        <!-- Mobile Offcanvas Sidebar -->
        <div class="offcanvas offcanvas-start" 
             tabindex="-1" 
             id="chat-sidebar" 
             aria-labelledby="offcanvasSidebarLabel" 
             style="width: 280px;">
            <div class="offcanvas-header border-bottom bg-white">
                <h5 class="offcanvas-title fw-semibold" id="offcanvasSidebarLabel">Roles y permisos</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
            </div>
            <div class="offcanvas-body p-0 bg-body-secondary">
                <div class="p-3 bg-white border-bottom">
                    <button class="btn btn-primary fw-semibold w-100 d-flex align-items-center justify-content-center gap-2 py-2">
                        <i class="ti ti-plus fs-5"></i>
                        <span>Nuevo usuario</span>
                    </button>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item border-0 bg-transparent px-3 py-2">
                        <a class="d-flex align-items-center gap-3 text-decoration-none text-dark px-3 py-2 rounded-2 all-contacts-btn hover-bg-primary-subtle" 
                           href="javascript:void(0)">
                            <div class="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-2" 
                                 style="width: 40px; height: 40px;">
                                <i class="ti ti-inbox fs-5 text-primary"></i>
                            </div>
                            <span class="fw-semibold">Todos los usuarios</span>
                        </a>
                    </li>
                    <li class="border-top mx-3 my-2"></li>
                    <li class="px-3 py-2">
                        <p class="text-uppercase text-muted fw-semibold small mb-0 ls-1">Permisos de usuario</p>
                    </li>
                    <li class="list-group-item border-0 bg-transparent px-3">
                        <div id="user-roles-container-mobile"></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>

<!-- Modal para Crear/Editar Usuario -->
<div class="modal fade" 
     id="modalUsuario" 
     tabindex="-1" 
     aria-labelledby="modalUsuarioLabel" 
     aria-hidden="true" 
     data-bs-backdrop="static" 
     data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
        <div class="modal-content border-0 shadow-lg">
            
            <!-- Modal Header -->
            <div class="modal-header bg-primary text-white border-0">
                <div class="d-flex align-items-center gap-3">
                    <div class="d-flex align-items-center justify-content-center bg-white bg-opacity-25 rounded-circle" 
                         style="width: 48px; height: 48px;">
                        <i class="ti ti-user-plus fs-4"></i>
                    </div>
                    <div>
                        <h5 class="modal-title fw-semibold mb-0" id="modalUsuarioLabel">Nuevo Usuario</h5>
                        <small class="opacity-75">Complete la información del usuario</small>
                    </div>
                </div>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body p-4">
                <form id="formUsuario" novalidate>
                    <input type="hidden" id="usuarioId" name="usuarioId">
                    
                    <!-- Información Personal -->
                    <div class="mb-4">
                        <div class="d-flex align-items-center gap-2 mb-3">
                            <i class="ti ti-user fs-5 text-primary"></i>
                            <h6 class="mb-0 fw-semibold">Información Personal</h6>
                        </div>
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label for="nombre" class="form-label fw-semibold small">
                                    Nombre(s) <span class="text-danger">*</span>
                                </label>
                                <input type="text" 
                                       class="form-control" 
                                       id="nombre" 
                                       name="nombre" 
                                       placeholder="Ingrese el nombre" 
                                       required>
                                <div class="invalid-feedback">Por favor ingrese el nombre.</div>
                            </div>
                            <div class="col-md-6">
                                <label for="apellidos" class="form-label fw-semibold small">
                                    Apellido(s) <span class="text-danger">*</span>
                                </label>
                                <input type="text" 
                                       class="form-control" 
                                       id="apellidos" 
                                       name="apellidos" 
                                       placeholder="Ingrese los apellidos" 
                                       required>
                                <div class="invalid-feedback">Por favor ingrese los apellidos.</div>
                            </div>
                        </div>
                    </div>

                    <!-- Información de Contacto -->
                    <div class="mb-4">
                        <div class="d-flex align-items-center gap-2 mb-3">
                            <i class="ti ti-address-book fs-5 text-info"></i>
                            <h6 class="mb-0 fw-semibold">Información de Contacto</h6>
                        </div>
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label for="correo" class="form-label fw-semibold small">
                                    Correo Electrónico <span class="text-danger">*</span>
                                </label>
                                <div class="input-group">
                                    <span class="input-group-text bg-body-secondary border-end-0">
                                        <i class="ti ti-mail"></i>
                                    </span>
                                    <input type="email" 
                                           class="form-control border-start-0 ps-0" 
                                           id="correo" 
                                           name="correo" 
                                           placeholder="usuario@ejemplo.com" 
                                           required>
                                </div>
                                <div class="invalid-feedback">Por favor ingrese un correo electrónico válido.</div>
                            </div>
                            <div class="col-md-6">
                                <label for="telefono" class="form-label fw-semibold small">Teléfono</label>
                                <div class="input-group">
                                    <span class="input-group-text bg-body-secondary border-end-0">
                                        <i class="ti ti-phone"></i>
                                    </span>
                                    <input type="tel" 
                                           class="form-control border-start-0 ps-0" 
                                           id="telefono" 
                                           name="telefono" 
                                           placeholder="(000) 000-0000">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Contraseña -->
                    <div class="mb-4" id="seccionContrasena">
                        <div class="d-flex align-items-center gap-2 mb-3">
                            <i class="ti ti-key fs-5 text-secondary"></i>
                            <h6 class="mb-0 fw-semibold">Contraseña</h6>
                        </div>
                        <div class="row g-3">
                            <div class="col-12">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" 
                                           type="checkbox" 
                                           role="switch" 
                                           id="generar_contrasena_auto" 
                                           name="generar_contrasena_auto" 
                                           checked>
                                    <label class="form-check-label" for="generar_contrasena_auto">
                                        Generar contraseña automáticamente
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-8" id="campo-contrasena-manual" style="display: none;">
                                <label for="contrasena" class="form-label fw-semibold small">Contraseña Manual</label>
                                <input type="password" class="form-control" id="contrasena" name="contrasena">
                                <div class="invalid-feedback">La contraseña es requerida si no se genera automáticamente.</div>
                            </div>
                        </div>
                    </div>

                    <!-- Permisos y Roles -->
                    <div class="mb-4">
                        <div class="d-flex align-items-center gap-2 mb-3">
                            <i class="ti ti-shield-check fs-5 text-success"></i>
                            <h6 class="mb-0 fw-semibold">Permisos y Roles</h6>
                        </div>
                        <div class="row g-3">
                            <div class="col-12">
                                <label class="form-label fw-semibold small">
                                    Asignar Roles <span class="text-danger">*</span>
                                </label>
                                <div id="rolesCheckboxContainer" class="border rounded-3 p-3 bg-body-secondary">
                                    <div class="text-center text-muted py-2">
                                        <div class="spinner-border spinner-border-sm me-2" role="status">
                                            <span class="visually-hidden">Cargando...</span>
                                        </div>
                                        <span class="small">Cargando roles...</span>
                                    </div>
                                </div>
                                <div class="invalid-feedback d-block" id="rolesError" style="display: none !important;">
                                    Por favor seleccione al menos un rol.
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Fotografía -->
                    <div class="mb-3">
                        <div class="d-flex align-items-center gap-2 mb-3">
                            <i class="ti ti-camera fs-5 text-warning"></i>
                            <h6 class="mb-0 fw-semibold">Fotografía de Perfil</h6>
                        </div>
                        <div class="row g-3">
                            <div class="col-12">
                                <div class="card border border-2 border-dashed">
                                    <div class="card-body text-center p-4">
                                        <div class="mb-3">
                                            <img id="preview-imagen" 
                                                 src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23adb5bd' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E" 
                                                 alt="Vista previa" 
                                                 class="rounded-circle border border-3 shadow-sm mb-3" 
                                                 style="width: 120px; height: 120px; object-fit: cover;">
                                        </div>
                                        <label for="fotografia" class="btn btn-outline-primary btn-sm mb-2">
                                            <i class="ti ti-upload me-1"></i>
                                            Seleccionar imagen
                                        </label>
                                        <input type="file" 
                                               class="d-none" 
                                               id="fotografia" 
                                               name="fotografia" 
                                               accept="image/*">
                                        <p class="text-muted small mb-0 mt-2">
                                            Formatos aceptados: JPG, PNG, GIF (máx. 2MB)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Modal Footer -->
            <div class="modal-footer bg-body-secondary border-0 gap-2 p-3">
                <button type="button" class="btn btn-outline-secondary fw-semibold px-4" data-bs-dismiss="modal">
                    <i class="ti ti-x me-1"></i>
                    Cancelar
                </button>
                <button type="button" class="btn btn-primary fw-semibold px-4" id="btnGuardarUsuario">
                    <i class="ti ti-device-floppy me-1"></i>
                    Guardar Usuario
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Modal para Cambiar Contraseña -->
<div class="modal fade" 
     id="modalCambiarContrasena" 
     tabindex="-1" 
     aria-labelledby="modalCambiarContrasenaLabel" 
     aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
            
            <!-- Header -->
            <div class="modal-header bg-primary text-white border-0">
                <div class="d-flex align-items-center gap-3">
                    <div class="d-flex align-items-center justify-content-center bg-white bg-opacity-25 rounded-circle" 
                         style="width: 48px; height: 48px;">
                        <i class="ti ti-key fs-4"></i>
                    </div>
                    <div>
                        <h5 class="modal-title fw-semibold mb-0" id="modalCambiarContrasenaLabel">Cambiar Contraseña</h5>
                        <small class="opacity-75">Establezca una nueva contraseña para el usuario</small>
                    </div>
                </div>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            
            <!-- Body -->
            <div class="modal-body p-4">
                <form id="formCambiarContrasena" novalidate>
                    <input type="hidden" id="cambiarContrasenaUsuarioId">
                    
                    <div class="mb-3">
                        <label for="nuevaContrasena" class="form-label fw-semibold small">Nueva Contraseña</label>
                        <div class="input-group has-validation">
                            <input type="password" 
                                   class="form-control" 
                                   id="nuevaContrasena" 
                                   required 
                                   minlength="8">
                            <button class="btn btn-outline-secondary" type="button" id="toggleNuevaContrasena">
                                <i class="ti ti-eye"></i>
                            </button>
                            <div class="invalid-feedback">La contraseña debe tener al menos 8 caracteres.</div>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <label for="confirmarContrasena" class="form-label fw-semibold small">Confirmar Contraseña</label>
                        <div class="input-group has-validation">
                            <input type="password" 
                                   class="form-control" 
                                   id="confirmarContrasena" 
                                   required>
                            <button class="btn btn-outline-secondary" type="button" id="toggleConfirmarContrasena">
                                <i class="ti ti-eye"></i>
                            </button>
                            <div class="invalid-feedback">Este campo es requerido y debe coincidir con la nueva contraseña.</div>
                        </div>
                    </div>
                </form>
            </div>
            
            <!-- Footer -->
            <div class="modal-footer bg-body-secondary border-0 gap-2 p-3">
                <button type="button" class="btn btn-outline-secondary fw-semibold px-4" data-bs-dismiss="modal">
                    Cancelar
                </button>
                <button type="button" class="btn btn-primary fw-semibold px-4" id="btnGuardarNuevaContrasena">
                    Guardar Cambios
                </button>
            </div>
        </div>
    </div>
</div>

<style>
.hover-bg-primary-subtle:hover {
    background-color: rgba(var(--bs-primary-rgb), 0.1) !important;
}

.hover-bg-light:hover {
    background-color: var(--bs-light) !important;
}

.transition-all {
    transition: all 0.2s ease-in-out;
}

.ls-1 {
    letter-spacing: 0.5px;
}

.chat-user {
    transition: background-color 0.2s ease;
}

.chat-user:hover {
    background-color: var(--bs-light);
}

.chat-user.active {
    background-color: rgba(var(--bs-primary-rgb), 0.1);
    border-left: 3px solid var(--bs-primary);
}

.role-filter-button {
    transition: background-color 0.2s ease;
}

.role-filter-button:hover {
    background-color: rgba(var(--bs-primary-rgb), 0.05);
}

.role-filter-button.active {
    background-color: rgba(var(--bs-primary-rgb), 0.1);
    font-weight: 600;
}

#modalUsuario .modal-content,
#modalCambiarContrasena .modal-content {
    border-radius: 1rem;
}

#modalUsuario .form-control:focus,
#modalUsuario .form-select:focus {
    border-color: var(--bs-primary);
    box-shadow: 0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.15);
}

#modalUsuario .input-group-text {
    border-right: 0;
}

#modalUsuario .border-start-0 {
    border-left: 0 !important;
}

#modalUsuario .form-check-input:checked {
    background-color: var(--bs-primary);
    border-color: var(--bs-primary);
}

#preview-imagen {
    transition: transform 0.2s ease;
}

#preview-imagen:hover {
    transform: scale(1.05);
}

#rolesCheckboxContainer {
    max-height: 250px;
    overflow-y: auto;
}

#rolesCheckboxContainer::-webkit-scrollbar {
    width: 6px;
}

#rolesCheckboxContainer::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

#rolesCheckboxContainer::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
}

#rolesCheckboxContainer::-webkit-scrollbar-thumb:hover {
    background: #555;
}

.role-pill-wrapper {
    position: relative;
    display: inline-block;
}

.role-checkbox-hidden {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}

.role-pill-label {
    display: inline-block;
    padding: 0.625rem 1.5rem;
    font-size: 0.9375rem;
    font-weight: 500;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    border: 2px solid #dee2e6;
    border-radius: 2rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    user-select: none;
    white-space: nowrap;
    margin: 0;
}

.role-pill-label:hover {
    border-color: var(--bs-primary);
    background-color: rgba(var(--bs-primary-rgb), 0.05);
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.role-checkbox-hidden:checked + .role-pill-label {
    color: #fff;
    background-color: var(--bs-primary);
    border-color: var(--bs-primary);
    box-shadow: 0 2px 8px rgba(var(--bs-primary-rgb), 0.3);
}

.role-checkbox-hidden:checked + .role-pill-label:hover {
    background-color: var(--bs-primary);
    opacity: 0.9;
}

.role-checkbox-hidden:focus + .role-pill-label {
    outline: 2px solid rgba(var(--bs-primary-rgb), 0.25);
    outline-offset: 2px;
}
</style>