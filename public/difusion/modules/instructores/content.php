<div class="container-fluid">
    <div class="card">
        <div class="card-body">
            <!-- Tab Navigation -->
            <ul class="nav nav-pills flex-column flex-sm-row mt-4 mb-4" role="tablist">
                <li class="nav-item flex-sm-fill text-sm-center" role="presentation">
                    <a class="nav-link border active" data-bs-toggle="tab" href="#listInstructorsTab" role="tab" aria-controls="listInstructorsTab" aria-selected="true">
                        <i class="ti ti-users me-2"></i> Listar Instructores
                    </a>
                </li>
                <li class="nav-item flex-sm-fill text-sm-center" role="presentation">
                    <a class="nav-link border" data-bs-toggle="tab" href="#newInstructorTab" role="tab" aria-controls="newInstructorTab" aria-selected="false">
                        <i class="ti ti-user-plus me-2"></i> Nuevo Instructor
                    </a>
                </li>
            </ul>

            <!-- Tab Content -->
            <div class="tab-content border mt-2">
                <!-- Tab Pane for Listing Instructors -->
                <div class="tab-pane fade show active p-3" id="listInstructorsTab" role="tabpanel" aria-labelledby="listInstructorsTab">
                    <div class="d-flex flex-column flex-md-row align-items-center w-100 mb-3">
                        <form class="position-relative me-3 w-100 w-md-auto">
                            <input type="text" class="form-control search-chat py-2 ps-5" id="searchInstructor" placeholder="Buscar instructor">
                            <i class="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3"></i>
                        </form>
                        <div class="ms-auto">
                            <div class="d-flex justify-content-end">
                                <div class="btn-group" role="group" aria-label="View switcher">
                                    <button type="button" class="btn btn-outline-primary active" id="btn-grid-view-instructors" aria-label="Vista de cuadrícula">
                                        <i class="ti ti-layout-grid"></i>
                                    </button>
                                    <button type="button" class="btn btn-outline-primary" id="btn-table-view-instructors" aria-label="Vista de tabla">
                                        <i class="ti ti-list"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="cardsInstructores" class="row"></div>
                    <div id="instructorsTableView" class="table-responsive" style="display: none;">
                        <table id="instructorsTable" class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Teléfono</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="instructorsTableBody">
                                <!-- Rows will be inserted here by JavaScript -->
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Tab Pane for New Instructor Form -->
                <div class="tab-pane fade p-3" id="newInstructorTab" role="tabpanel" aria-labelledby="newInstructorTab">
                    <h5 class="card-title fw-semibold mb-4">Crear Nuevo Instructor</h5>
                    <form id="instructorForm" class="needs-validation">

    <!-- Section: Personal Information -->
    <div class="card mb-3">
        <div class="card-header">
            <h6 class="mb-0">Información Personal</h6>
        </div>
        <div class="card-body">
            <div class="row g-3"> <!-- Use g-3 for consistent gutter -->
                <div class="col-md-12">
                    <div class="form-floating mb-3"> <!-- Nombre -->
                        <input type="text" class="form-control border border-success" id="nombreInstructor" name="nombreInstructor" placeholder="Nombre" required>
                        <label for="nombreInstructor">
                            <i class="ti ti-user me-2 fs-4 text-success"></i>
                            <span class="border-start border-success ps-3">Nombre</span>
                        </label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-floating mb-3"> <!-- Apellido Paterno -->
                        <input type="text" class="form-control border border-success" id="apellidoPaterno" name="apellidoPaterno" placeholder="Apellido Paterno" required>
                        <label for="apellidoPaterno">
                            <i class="ti ti-user-plus me-2 fs-4 text-success"></i>
                            <span class="border-start border-success ps-3">Apellido Paterno</span>
                        </label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-floating mb-3"> <!-- Apellido Materno -->
                        <input type="text" class="form-control border border-success" id="apellidoMaterno" name="apellidoMaterno" placeholder="Apellido Materno" required>
                        <label for="apellidoMaterno">
                            <i class="ti ti-user-plus me-2 fs-4 text-success"></i>
                            <span class="border-start border-success ps-3">Apellido Materno</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Section: Contact Information -->
    <div class="card mb-3">
        <div class="card-header">
            <h6 class="mb-0">Información de Contacto</h6>
        </div>
        <div class="card-body">
            <div class="row g-3">
                <div class="col-md-6">
                    <div class="form-floating mb-3"> <!-- Correo Electrónico -->
                        <input type="email" class="form-control border border-success" id="correoInstructor" name="correoInstructor" placeholder="Correo electrónico" required>
                        <label for="correoInstructor">
                            <i class="ti ti-mail me-2 fs-4 text-success"></i>
                            <span class="border-start border-success ps-3">Correo electrónico</span>
                        </label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-floating mb-3"> <!-- Teléfono -->
                        <input type="tel" class="form-control border border-success" id="telefonoInstructor" name="telefonoInstructor" placeholder="Teléfono">
                        <label for="telefonoInstructor">
                            <i class="ti ti-phone me-2 fs-4 text-success"></i>
                            <span class="border-start border-success ps-3">Teléfono</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Section: Profile Picture -->
    <div class="card mb-3">
        <div class="card-header">
            <h6 class="mb-0">Fotografía de Perfil</h6>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12 text-center mb-4">
                    <label for="fotografiaInstructor" class="form-label text-success">Seleccionar Fotografía</label>
                    <input type="file" class="form-control form-control-sm border border-success" id="fotografiaInstructor" name="fotografiaInstructor" accept="image/*">
                    <div class="form-text text-success">Solo se permiten imágenes (JPG, PNG, etc.)</div>
                    <div class="col-4 mx-auto mt-3">
                        <img id="previewImage" src="../../../assets/images/profile/user-1.jpg" alt="Imagen de perfil" width="200" class="rounded-1 img-thumbnail mb-3" style="max-width: 100%; height: auto;">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Save Button -->
    <div class="d-md-flex align-items-center">
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
        </div>
    </div>
</div>
