<div class="card">
    <div class="card-body">
        <div class="mb-3">
            <h5 class="mb-0">Configuración de perfil</h5>
        </div>
        <div class="row mt-3">
            <div class="col-md-3">
                <div class="text-center nav flex-column nav-pills mb-4 mb-md-0" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">
                        Información general
                    </a>
                    <a class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false" tabindex="-1">
                        Acceso
                    </a>
                </div>
            </div>
            <div class="col-md-9">
                <div class="tab-content" id="v-pills-tabContent">
                    <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                        <div class="text-center mb-4">
                            <input type="file" id="uploadImage" hidden accept="image/jpeg">
                            <img src="data:image/jpeg;base64," style="cursor: pointer;" id="imgPerfil" alt="Profile Picture" class="rounded-circle mb-3" width="150" height="150">
                            <h5 id="profileName" class="card-title"></h5>
                        </div>
                        <div class="row g-2">
                            <div class="col-12 col-md-6">
                                <label for="nombre">Nombre</label>
                                <div class="input-group mb-3">
                                    <input id="nombre" type="text" aria-label="Nombre" class="form-control" placeholder="Nombre">
                                    <button class="btn btn-sm btn-warning" type="button" id="btnActualizarNombre" aria-controls="nombre">
                                        <i class="ti ti-reload"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="apellidos">Apellido</label>
                                <div class="input-group mb-3">
                                    <input id="apellidos" type="text" aria-label="Apellidos" class="form-control" placeholder="Apellidos">
                                    <button class="btn btn-sm btn-warning" type="button" id="btnActualizarApellidos" aria-controls="apellidos">
                                        <i class="ti ti-reload"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-12 col-md-6">
                                <div class="form-group form-group-default">
                                    <label for="numero_celular">Número de celular</label>
                                    <div class="input-group mb-3">
                                        <input type="tel" class="form-control" id="numero_celular" name="numero_celular">
                                        <button class="btn btn-sm btn-warning" type="button" id="btnActualizarTelefono" aria-controls="numero_celular">
                                            <i class="ti ti-reload"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                        <div class="mb-4 row align-items-center">
                            <label for="profileEmail" class="form-label col-sm-5 col-form-label">Correo electrónico actual:</label>
                            <div class="col-sm-7">
                                <div class="input-group mb-3">
                                    <input name="profileEmail" type="email" readonly id="profileEmail" class="form-control border-0 ps-2" aria-label="Correo electrónico actual">
                                    <button class="btn bg-warning " type="button"1>
                                        <i class="ti ti-pencil fs-4"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="mb-4 row align-items-center">
                            <label for="contrasena" class="form-label col-sm-5 col-form-label">Contraseña</label>
                            <div class="col-sm-7">
                                <div class="input-group mb-3">
                                    <input type="password" readonly class="form-control border-0 ps-2" value="default" aria-label="Contraseña">
                                    <button class="btn bg-warning " type="button" data-bs-toggle="modal" data-bs-target="#modalCambiarContrasena">
                                        <i class="ti ti-pencil fs-4"></i>
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

<div class="modal fade" id="modalCambiarContrasena" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Crea una nueva contraseña</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="configuracionForm" class="needs-validation" novalidate>
                <div class="modal-body">
                    <div class="row mt-3">
                        <div class="col-md-12 col-md-6">
                            <div class="form-group form-group-default mb-3">
                                <label for="newPassword">Nueva contraseña</label>
                                <input type="password" class="form-control" id="newPassword" name="newPassword" required>
                                <div class="invalid-feedback">Este campo es obligatorio.</div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3 mb-1">
                        <div class="col-md-12 col-md-6">
                            <div class="form-group form-group-default mb-3">
                                <label for="confirmPassword">Confirmar nueva contraseña</label>
                                <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" required>
                                <div class="invalid-feedback" id="confirmPasswordFeedback"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-darky" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn btn-warning">Guardar cambios</button>
                </div>
            </form>
        </div>
    </div>
</div>
