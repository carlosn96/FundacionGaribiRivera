<div class="container-fluid px-0">
    <!-- Header Section -->
    <div class="bg-white border-bottom border-2 mb-4 py-4">
        <div class="container-fluid px-4">
            <div class="d-flex align-items-center">
                <div class="rounded-circle bg-light p-3 me-3">
                    <i class="ti ti-user-cog fs-3 text-success"></i>
                </div>
                <div>
                    <h4 class="mb-1 fw-bold text-success">Actualización Información de Emprendedor</h4>
                    <p class="text-muted mb-0 small">Administrar información personal y credenciales de acceso</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <div class="container-fluid px-4" id="container">
        <div class="row g-4">
            <!-- Sidebar Navigation -->
            <div class="col-lg-3">
                <div class="bg-white rounded-3 border shadow-sm overflow-hidden position-sticky" style="top: 20px;">
                    <div class="nav flex-column" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a class="nav-link active d-flex align-items-center px-4 py-3 border-bottom" 
                           id="v-pills-home-tab" 
                           data-bs-toggle="pill" 
                           href="#v-pills-home" 
                           role="tab" 
                           aria-controls="v-pills-home" 
                           aria-selected="true">
                            <i class="ti ti-user-circle me-3 fs-5"></i>
                            <div>
                                <div class="fw-semibold">Información general</div>
                                <small class="text-muted">Datos personales</small>
                            </div>
                        </a>
                        <a class="nav-link d-flex align-items-center px-4 py-3" 
                           id="v-pills-profile-tab" 
                           data-bs-toggle="pill" 
                           href="#v-pills-profile" 
                           role="tab" 
                           aria-controls="v-pills-profile" 
                           aria-selected="false" 
                           tabindex="-1">
                            <i class="ti ti-shield-lock me-3 fs-5"></i>
                            <div>
                                <div class="fw-semibold">Acceso</div>
                                <small class="text-muted">Seguridad</small>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Content Area -->
            <div class="col-lg-9">
                <div class="tab-content" id="v-pills-tabContent">
                    <!-- Tab: Información General -->
                    <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                        <div class="bg-white rounded-3 border shadow-sm p-4 mb-4">
                            <!-- Profile Picture Section -->
                            <div class="text-center pb-4 mb-4 border-bottom">
                                <input type="file" id="uploadImage" hidden accept="image/jpeg">
                                <div class="position-relative d-inline-block">
                                    <img src="data:image/jpeg;base64," 
                                         style="cursor: pointer; object-fit: cover;" 
                                         id="imgPerfil" 
                                         alt="Foto de perfil" 
                                         class="rounded-circle border border-3 shadow-sm mb-3" 
                                         width="140" 
                                         height="140">
                                    <div class="position-absolute bottom-0 end-0 bg-warning rounded-circle p-2 shadow" 
                                         style="cursor: pointer; margin-bottom: 1rem; margin-right: 0.5rem;"
                                         onclick="document.getElementById('uploadImage').click()">
                                        <i class="ti ti-camera text-white"></i>
                                    </div>
                                </div>
                                <h5 id="profileName" class="fw-bold mt-3 mb-1 text-success"></h5>
                                <p class="text-muted small mb-0">Haz clic en la imagen para cambiarla</p>
                            </div>

                            <!-- Personal Information Form -->
                            <div class="row g-3">
                                <div class="col-12">
                                    <h6 class="fw-bold mb-3 text-success">
                                        <i class="ti ti-id me-2"></i>Datos personales
                                    </h6>
                                </div>

                                <div class="col-md-6">
                                    <label for="nombre" class="form-label fw-semibold small text-success mb-2">
                                        <i class="ti ti-user me-1"></i>Nombre
                                    </label>
                                    <div class="input-group">
                                        <button id="btnEstandarizarNombre" class="btn bg-info-subtle text-info border" type="button" data-bs-toggle="tooltip" data-bs-placement="top" title="Estandarizar">
                                            <i class="ti ti-sparkles"></i>
                                        </button>
                                        <input id="nombre" 
                                               type="text" 
                                               aria-label="Nombre" 
                                               class="form-control" 
                                               placeholder="Actualizar Nombre">
                                        <button class="btn btn-outline-warning" 
                                                type="button" 
                                                id="btnActualizarNombre" 
                                                aria-controls="nombre"
                                                title="Actualizar nombre">
                                            <i class="ti ti-reload"></i>
                                        </button>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <label for="apellidos" class="form-label fw-semibold small text-success mb-2">
                                        <i class="ti ti-user me-1"></i>Apellidos
                                    </label>
                                    <div class="input-group">
                                        <button id="btnEstandarizarApellidos" class="btn bg-info-subtle text-info border" type="button" data-bs-toggle="tooltip" data-bs-placement="top" title="Estandarizar">
                                            <i class="ti ti-sparkles"></i>
                                        </button>
                                        <input id="apellidos" 
                                               type="text" 
                                               aria-label="Apellidos" 
                                               class="form-control" 
                                               placeholder="Actualizar apellidos">
                                        <button class="btn btn-outline-warning" 
                                                type="button" 
                                                id="btnActualizarApellidos" 
                                                aria-controls="apellidos"
                                                title="Actualizar apellidos">
                                            <i class="ti ti-reload"></i>
                                        </button>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <label for="numero_celular" class="form-label fw-semibold small text-success mb-2">
                                        <i class="ti ti-phone me-1"></i>Número de celular
                                    </label>
                                    <div class="input-group">
                                        <input type="tel" 
                                               class="form-control" 
                                               id="numero_celular" 
                                               name="numero_celular"
                                               placeholder="10 dígitos">
                                        <button class="btn btn-outline-warning" 
                                                type="button" 
                                                id="btnActualizarTelefono" 
                                                aria-controls="numero_celular"
                                                title="Actualizar teléfono">
                                            <i class="ti ti-reload"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Info Alert -->
                            <div class="alert alert-info border d-flex align-items-start mt-4 mb-0">
                                <i class="ti ti-info-circle me-3 fs-5"></i>
                                <div class="small">
                                    <strong>Importante:</strong> Presiona el botón <i class="ti ti-reload mx-1"></i> junto a cada campo para guardar los cambios realizados.
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tab: Acceso -->
                    <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                        <div class="bg-white rounded-3 border shadow-sm p-4">
                            <div class="mb-4">
                                <h6 class="fw-bold mb-3 text-success">
                                    <i class="ti ti-shield-lock me-2"></i>Configuración de seguridad
                                </h6>
                                <p class="text-muted small mb-0">Administra tus credenciales de acceso al sistema</p>
                            </div>

                            <!-- Email Section -->
                            <div class="border rounded-3 p-4 mb-3 bg-light">
                                <div class="row align-items-center">
                                    <div class="col-lg-4 mb-3 mb-lg-0">
                                        <label for="profileEmail" class="form-label fw-semibold mb-1">
                                            <i class="ti ti-mail me-2"></i>Correo electrónico
                                        </label>
                                        <p class="text-muted small mb-0">Tu correo de acceso</p>
                                    </div>
                                    <div class="col-lg-8">
                                        <div class="input-group">
                                            <span class="input-group-text bg-white">
                                                <i class="ti ti-at"></i>
                                            </span>
                                            <input name="profileEmail" 
                                                   type="email" 
                                                   readonly 
                                                   id="profileEmail" 
                                                   class="form-control bg-white" 
                                                   aria-label="Correo electrónico actual">
                                            <button class="btn btn-outline-warning" type="button" title="Editar correo">
                                                <i class="ti ti-pencil me-2"></i>Editar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Password Section -->
                            <div class="border rounded-3 p-4 bg-light">
                                <div class="row align-items-center">
                                    <div class="col-lg-4 mb-3 mb-lg-0">
                                        <label for="contrasena" class="form-label fw-semibold mb-1">
                                            <i class="ti ti-lock me-2"></i>Contraseña
                                        </label>
                                        <p class="text-muted small mb-0">Protege tu cuenta</p>
                                    </div>
                                    <div class="col-lg-8">
                                        <div class="input-group">
                                            <span class="input-group-text bg-white">
                                                <i class="ti ti-key"></i>
                                            </span>
                                            <input type="password" 
                                                   readonly 
                                                   class="form-control bg-white" 
                                                   value="••••••••" 
                                                   aria-label="Contraseña">
                                            <button class="btn btn-outline-warning" 
                                                    type="button" 
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#modalCambiarContrasena"
                                                    title="Cambiar contraseña">
                                                <i class="ti ti-pencil me-2"></i>Cambiar
                                            </button>
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
</div>

<!-- Modal: Cambiar Contraseña -->
<div class="modal fade" id="modalCambiarContrasena" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg rounded-3">
            <div class="modal-header border-bottom">
                <div>
                    <h5 class="modal-title fw-bold mb-1 text-success" id="staticBackdropLabel">
                        <i class="ti ti-key me-2"></i>Cambiar contraseña
                    </h5>
                    <p class="text-muted small mb-0">Crea una contraseña segura para tu cuenta</p>
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            
            <form id="configuracionForm" class="needs-validation" novalidate>
                <input hidden id="idEmprendedor" name="idEmprendedor">
                <div class="modal-body p-4">
                    <div class="mb-4">
                        <label for="newPassword" class="form-label fw-semibold small text-success mb-2">
                            <i class="ti ti-lock me-1"></i>Nueva contraseña
                        </label>
                        <div class="input-group">
                            <span class="input-group-text bg-light">
                                <i class="ti ti-key"></i>
                            </span>
                            <input type="password" 
                                   class="form-control" 
                                   id="newPassword" 
                                   name="newPassword" 
                                   required
                                   placeholder="Mínimo 8 caracteres">
                        </div>
                        <div class="invalid-feedback">Por favor ingresa una contraseña válida.</div>
                        <div class="form-text small">
                            <i class="ti ti-info-circle me-1"></i>
                            Usa al menos 8 caracteres con letras y números
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="confirmPassword" class="form-label fw-semibold small text-success mb-2">
                            <i class="ti ti-check me-1"></i>Confirmar nueva contraseña
                        </label>
                        <div class="input-group">
                            <span class="input-group-text bg-light">
                                <i class="ti ti-checks"></i>
                            </span>
                            <input type="password" 
                                   class="form-control" 
                                   id="confirmPassword" 
                                   name="confirmPassword" 
                                   required
                                   placeholder="Repite la contraseña">
                        </div>
                        <div class="invalid-feedback" id="confirmPasswordFeedback">Las contraseñas no coinciden.</div>
                    </div>
                </div>

                <div class="modal-footer border-top">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                        <i class="ti ti-x me-2"></i>Cancelar
                    </button>
                    <button type="submit" class="btn btn-warning">
                        <i class="ti ti-device-floppy me-2"></i>Guardar cambios
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>