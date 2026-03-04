<link rel="stylesheet" href="instructores-premium.css">

<div class="instructores-premium-wrapper container-fluid py-4">
    <!-- Header Hero -->
    <div class="text-center mb-5">
        <h2 class="display-6 fw-bold text-dark mb-2">Directorio de Instructores</h2>
        <p class="lead text-muted mx-auto" style="max-width: 600px;">Administra a los formadores que imparten los
            talleres y su información de contacto.</p>
    </div>

    <div class="row justify-content-center">
        <div class="col-xl-10 col-xxl-9">
            <!-- Tab Navigation -->
            <ul class="nav nav-pills premium-nav-tabs d-inline-flex mx-auto mb-5 shadow-sm" role="tablist"
                style="display: flex !important;">
                <li class="nav-item" role="presentation">
                    <a class="nav-link active d-flex align-items-center rounded-pill" data-bs-toggle="tab"
                        href="#listInstructorsTab" role="tab" aria-controls="listInstructorsTab" aria-selected="true">
                        <i class="ti ti-users fs-5 me-2"></i> Listar Instructores
                    </a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link d-flex align-items-center rounded-pill" data-bs-toggle="tab"
                        href="#newInstructorTab" role="tab" aria-controls="newInstructorTab" aria-selected="false">
                        <i class="ti ti-user-plus fs-5 me-2"></i> Nuevo Instructor
                    </a>
                </li>
            </ul>

            <!-- Tab Content -->
            <div class="tab-content premium-tab-content mt-2">
                <!-- Tab Pane for Listing Instructors -->
                <div class="tab-pane fade show active" id="listInstructorsTab" role="tabpanel"
                    aria-labelledby="listInstructorsTab">
                    <div
                        class="d-flex flex-column flex-md-row align-items-center justify-content-between w-100 mb-4 bg-white p-3 rounded-4 shadow-sm border border-light">
                        <div class="premium-search-box position-relative w-100 flex-grow-1 mb-3 mb-md-0 me-md-4">
                            <i
                                class="ti ti-search position-absolute top-50 start-0 translate-middle-y ms-3 fs-5 text-primary"></i>
                            <input type="text" class="form-control premium-search ps-5 py-2 w-100" id="searchInstructor"
                                placeholder="Buscar por nombre o apellido...">
                        </div>

                        <div class="d-flex justify-content-end">
                            <div class="btn-group premium-view-switcher rounded-pill shadow-sm border" role="group"
                                aria-label="View switcher">
                                <button type="button" class="btn btn-sm rounded-pill px-3 active"
                                    id="btn-grid-view-instructors" aria-label="Vista de cuadrícula">
                                    <i class="ti ti-layout-grid fs-5"></i>
                                </button>
                                <button type="button" class="btn btn-sm rounded-pill px-3"
                                    id="btn-table-view-instructors" aria-label="Vista de tabla">
                                    <i class="ti ti-list fs-5"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div id="cardsInstructores" class="row g-4"></div>

                    <!-- Table View -->
                    <div id="instructorsTableView"
                        class="premium-table-container rounded-4 shadow-sm overflow-hidden mt-4" style="display: none;">
                        <div class="table-responsive bg-white">
                            <table id="instructorsTable" class="table premium-table align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th class="border-0 text-uppercase fw-bold text-muted">Instructor</th>
                                        <th class="border-0 text-uppercase fw-bold text-muted">Teléfono</th>
                                        <th class="border-0 text-uppercase fw-bold text-muted text-end">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="instructorsTableBody" class="border-top-0">
                                    <!-- JS Rows -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Tab Pane for New Instructor Form -->
                <div class="tab-pane fade" id="newInstructorTab" role="tabpanel" aria-labelledby="newInstructorTab">
                    <form id="instructorForm" class="needs-validation">

                        <!-- Section: Profile Picture -->
                        <div class="premium-form-card">
                            <div class="card-header bg-success-subtle border-success-subtle">
                                <h6 class="mb-0 text-success"><i class="ti ti-photo-circle fs-5 me-2"></i>Fotografía de
                                    Perfil</h6>
                            </div>
                            <div class="card-body text-center">
                                <div class="mb-4 position-relative d-inline-block custom-file-upload">
                                    <label for="fotografiaInstructor" class="form-label d-block m-0">
                                        <div class="mb-3">
                                            <img id="previewImage" src="../../../assets/images/profile/user-1.jpg"
                                                alt="Imagen de perfil" class="preview-image-premium shadow">
                                        </div>
                                        <span class="btn btn-outline-success rounded-pill px-4 shadow-sm"><i
                                                class="ti ti-upload fs-5 me-2"></i> Subir imagen (opcional)</span>
                                    </label>
                                    <input type="file" class="d-none" id="fotografiaInstructor"
                                        name="fotografiaInstructor" accept="image/*">
                                </div>
                                <p class="text-muted small">Se permiten formatos JPG y PNG. Se recomienda una imagen
                                    cuadrada.</p>
                            </div>
                        </div>

                        <!-- Section: Personal Information -->
                        <div class="premium-form-card">
                            <div class="card-header">
                                <h6 class="mb-0"><i class="ti ti-id fs-5 me-2"></i>Información Personal</h6>
                            </div>
                            <div class="card-body">
                                <div class="row g-4">
                                    <div class="col-md-12">
                                        <div class="form-floating premium-floating">
                                            <input type="text" class="form-control" id="nombreInstructor"
                                                name="nombreInstructor" placeholder="Nombre" required>
                                            <label for="nombreInstructor">
                                                <i class="ti ti-user me-2 text-success"></i> Nombre Completo
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating premium-floating">
                                            <input type="text" class="form-control" id="apellidoPaterno"
                                                name="apellidoPaterno" placeholder="Apellido Paterno" required>
                                            <label for="apellidoPaterno">
                                                <i class="ti ti-user-edit me-2 text-success"></i> Apellido Paterno
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating premium-floating">
                                            <input type="text" class="form-control" id="apellidoMaterno"
                                                name="apellidoMaterno" placeholder="Apellido Materno" required>
                                            <label for="apellidoMaterno">
                                                <i class="ti ti-user-edit me-2 text-success"></i> Apellido Materno
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Section: Contact Information -->
                        <div class="premium-form-card">
                            <div class="card-header">
                                <h6 class="mb-0"><i class="ti ti-address-book fs-5 me-2"></i>Información de Contacto
                                </h6>
                            </div>
                            <div class="card-body">
                                <div class="row g-4">
                                    <div class="col-md-6">
                                        <div class="form-floating premium-floating">
                                            <input type="email" class="form-control" id="correoInstructor"
                                                name="correoInstructor" placeholder="Correo electrónico" required>
                                            <label for="correoInstructor">
                                                <i class="ti ti-mail me-2 text-success"></i> Correo Electrónico
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating premium-floating">
                                            <input type="tel" class="form-control" id="telefonoInstructor"
                                                name="telefonoInstructor" placeholder="Teléfono">
                                            <label for="telefonoInstructor">
                                                <i class="ti ti-phone me-2 text-success"></i> Teléfono Móvil
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Save Button -->
                        <div class="d-flex justify-content-end mb-5">
                            <button type="submit"
                                class="btn btn-primary premium-btn d-flex align-items-center py-3 px-5 shadow">
                                <i class="ti ti-device-floppy fs-4 me-2"></i>
                                Registrar Instructor
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>