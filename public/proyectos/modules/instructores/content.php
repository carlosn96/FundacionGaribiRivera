<div class="container-fluid">
    <div class="card">
        <div class="card-body">
            <h5 class="card-title fw-semibold mb-4">Nuevo Instructor</h5>
            <form id="instructorForm" class="needs-validation">
                <div class="row mb-3">
                    <!-- Fotografía -->
                    <div class="col-12 text-center mb-4">
                        <div class="col-4 mx-auto">
                            <img id="previewImage" width="200" class="rounded-1 img-thumbnail mb-3" style="max-width: 100%; height: auto;">
                        </div>
                        <label for="fotografia" class="form-label text-success">Fotografía</label>
                        <input type="file" class="form-control form-control-sm border border-success" id="fotografiaInstructor" name="fotografiaInstructor" accept="image/*">
                        <div class="form-text text-success">Solo se permiten imágenes (JPG, PNG, etc.)</div>
                    </div>
                </div>

                <div class="row mb-3">
                    <!-- Nombre -->
                    <div class="col-12">
                        <div class="form-floating">
                            <input type="text" class="form-control border border-success" id="nombreInstructor" name="nombreInstructor" placeholder="Nombre" required>
                            <label for="nombre">
                                <i class="ti ti-user me-2 fs-4 text-success"></i>
                                <span class="border-start border-success ps-3">Nombre</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="row mb-3">
                    <!-- Apellido Paterno -->
                    <div class="col-md-6 col-12 mb-3 mb-md-0">
                        <div class="form-floating">
                            <input type="text" class="form-control border border-success" id="apellidoPaterno" name="apellidoPaterno" placeholder="Apellido Paterno" required>
                            <label for="apellidoPaterno">
                                <i class="ti ti-user-plus me-2 fs-4 text-success"></i>
                                <span class="border-start border-success ps-3">Apellido Paterno</span>
                            </label>
                        </div>
                    </div>

                    <!-- Apellido Materno -->
                    <div class="col-md-6 col-12">
                        <div class="form-floating">
                            <input type="text" class="form-control border border-success" id="apellidoMaterno" name="apellidoMaterno" placeholder="Apellido Materno" required>
                            <label for="apellidoMaterno">
                                <i class="ti ti-user-plus me-2 fs-4 text-success"></i>
                                <span class="border-start border-success ps-3">Apellido Materno</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="row mb-3">
                    <!-- Correo Electrónico -->
                    <div class="col-md-6 col-12 mb-3 mb-md-0">
                        <div class="form-floating">
                            <input type="email" class="form-control border border-success" id="correoInstructor" name="correoInstructor" placeholder="Correo electrónico" required>
                            <label for="correoElectronico">
                                <i class="ti ti-mail me-2 fs-4 text-success"></i>
                                <span class="border-start border-success ps-3">Correo electrónico</span>
                            </label>
                        </div>
                    </div>

                    <!-- Teléfono -->
                    <div class="col-md-6 col-12">
                        <div class="form-floating">
                            <input type="tel" class="form-control border border-success" id="telefonoInstructor" name="telefonoInstructor" placeholder="Teléfono">
                            <label for="telefono">
                                <i class="ti ti-phone me-2 fs-4 text-success"></i>
                                <span class="border-start border-success ps-3">Teléfono</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="d-md-flex align-items-center">
                    <!-- Botón de guardar -->
                    <div class="mt-3 mt-md-0 ms-auto">
                        <button type="submit" class="btn btn-outline-primary hstack gap-6">
                            <i class="ti ti-send me-2 fs-4"></i>
                            Guardar Instructor
                        </button>
                    </div>
                </div>
            </form>

        </div>
    </div>
    <div class="card" hidden="">
        <div class="card-body">
            <h4 class="card-title mb-4 pb-2">Instructores</h4>
            <div class="table-responsive pb-4">
                <table id="tablaInstructores" class="table table-striped table-bordered border text-nowrap align-middle">
                    <thead>
                        <tr>
                            <th>Nombre</th>
<!--                            <th>Correo electrónico</th>
                            <th>Teléfono</th>-->
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div id="cardsInstructores" class="row"></div>
</div>