<!-- Main Content -->
    <div class="container-fluid py-4">
        <!-- Page Header -->
        <div class="row mb-4">
            <div class="col-12">
                <div class="card border-0 shadow-sm">
                    <div class="card-body bg-primary bg-opacity-10 rounded">
                        <div class="row align-items-center">
                            <div class="col-md-8">
                                <div class="d-flex align-items-center mb-2">
                                    <div class="bg-primary bg-opacity-25 rounded-circle p-2 me-3">
                                        <i class="ti ti-clipboard-check fs-3 text-primary"></i>
                                    </div>
                                    <div>
                                        <h1 class="display-6 fw-semibold text-dark mb-1">
                                            Registro de Asistencia a Talleres
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Filter Section -->
        <section class="mb-4">
            <div class="row">
                <div class="col-12">
                    <div class="card border-0 shadow-sm">
                        <div class="card-header bg-white border-bottom">
                            <div class="d-flex align-items-center justify-content-between">
                                <h5 class="card-title mb-0 d-flex align-items-center">
                                    <i class="ti ti-filter me-2 text-primary"></i>
                                    Filtros de Selección
                                </h5>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row g-3">
                                <!-- Selector de Etapa -->
                                <div class="col-lg-6">
                                    <label for="etapaSelect" class="form-label fw-semibold">
                                        <i class="ti ti-layers-intersect me-1 text-primary"></i>
                                        Etapa Formativa
                                        <span class="text-danger">*</span>
                                    </label>
                                    <div class="input-group">
                                        <span class="input-group-text bg-primary bg-opacity-10 text-primary border-0">
                                            <i class="ti ti-layers-intersect"></i>
                                        </span>
                                        <select class="form-select" id="etapaSelect" data-bs-toggle="tooltip" data-bs-placement="top" title="Seleccione la etapa formativa para filtrar los talleres">
                                            <option selected disabled>-- Selecciona una etapa --</option>
                                        </select>
                                    </div>
                                    <div class="invalid-feedback">
                                        Por favor seleccione una etapa válida.
                                    </div>
                                    <div class="form-text">
                                        <i class="ti ti-info-circle me-1"></i>
                                        Seleccione la etapa para filtrar los talleres disponibles
                                    </div>
                                </div>

                                <!-- Selector de Taller -->
                                <div class="col-lg-6">
                                    <label for="tallerSelect" class="form-label fw-semibold">
                                        <i class="ti ti-presentation me-1 text-primary"></i>
                                        Taller
                                        <span class="text-danger">*</span>
                                    </label>
                                    <div class="input-group">
                                        <span class="input-group-text bg-primary bg-opacity-10 text-primary border-0">
                                            <i class="ti ti-presentation"></i>
                                        </span>
                                        <select class="form-select" id="tallerSelect" disabled>
                                            <option selected disabled>-- Esperando selección de etapa --</option>
                                        </select>
                                        <span class="input-group-text d-none bg-primary bg-opacity-10 text-primary" id="tallerSpinner">
                                            <div class="spinner-border spinner-border-sm" role="status">
                                                <span class="visually-hidden">Cargando...</span>
                                            </div>
                                        </span>
                                    </div>
                                    <div class="invalid-feedback">
                                        Por favor seleccione un taller válido.
                                    </div>
                                    <div class="form-text">
                                        <i class="ti ti-info-circle me-1"></i>
                                        Los talleres se cargarán según la etapa seleccionada
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>



        <!-- Main Data Table Section -->
        <section>
            <div class="row">
                <div class="col-12">
                    <div class="card border-0 shadow-sm">
                        <div class="card-header bg-white border-bottom">
                            <div class="row align-items-center">
                                <div class="col-md-6">
                                    <h5 class="card-title mb-0 d-flex align-items-center">
                                        <i class="ti ti-users me-2 text-primary"></i>
                                        Lista de Emprendedores
                                        <span class="badge bg-primary bg-opacity-10 text-primary ms-2" id="totalRecordsDisplay">0</span>
                                    </h5>
                                </div>
                                <div class="col-md-6 text-end">
                                    <div class="btn-group btn-group-sm" role="group">
                                        <button type="button" class="btn btn-outline-secondary" data-bs-toggle="tooltip" title="Exportar a Excel">
                                            <i class="ti ti-file-spreadsheet"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Data Table -->
                        <div class="table-responsive">
                            <table class="table table-hover align-middle mb-0">
                                <thead class="table-light">
                                    <tr>
                                        <th class="border-0">
                                            <i class="ti ti-user text-muted me-1"></i>
                                            Emprendedor
                                            <button class="btn btn-sm p-0 ms-1" data-bs-toggle="tooltip" title="Ordenar">
                                                <i class="ti ti-arrows-sort text-muted"></i>
                                            </button>
                                        </th>
                                        <th class="border-0">
                                            <i class="ti ti-mail text-muted me-1"></i>
                                            Contacto
                                        </th>
                                        <th class="border-0 text-center">
                                            <i class="ti ti-phone text-muted me-1"></i>
                                            Teléfono
                                        </th>
                                        <th class="border-0 text-center" style="width: 200px;">
                                            <div class="form-check form-switch d-flex justify-content-center align-items-center">
                                                <input class="form-check-input" type="checkbox" role="switch" id="selectAllCheckbox">
                                                <label class="form-check-label ms-2 fw-semibold" for="selectAllCheckbox">
                                                    <i class="ti ti-clipboard-check me-1"></i>
                                                    Asistencia
                                                </label>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="asistenciaTbody">
                                    <!-- Template for JavaScript -->
                                    <template id="emprendedorRowTemplate">
                                        <tr class="table-row-hover">
                                            <td class="border-0">
                                                <div class="d-flex align-items-center">
                                                    <div class="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                                                        <i class="ti ti-user text-primary"></i>
                                                    </div>
                                                    <div>
                                                        <div class="fw-semibold text-dark"></div>
                                                        <div class="small text-muted">ID: <span class="emprendedor-id"></span></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="border-0">
                                                <div class="d-flex align-items-center">
                                                    <i class="ti ti-mail text-muted me-2"></i>
                                                    <span class="text-muted emprendedor-email"></span>
                                                </div>
                                            </td>
                                            <td class="border-0 text-center">
                                                <div class="d-flex align-items-center justify-content-center">
                                                    <i class="ti ti-phone text-muted me-2"></i>
                                                    <span class="text-muted emprendedor-telefono"></span>
                                                </div>
                                            </td>
                                            <td class="border-0 text-center">
                                                <div class="form-check form-switch d-flex justify-content-center">
                                                    <input class="form-check-input" type="checkbox" role="switch">
                                                    <label class="form-check-label ms-2">
                                                        <span class="badge bg-light text-muted">No registrado</span>
                                                    </label>
                                                </div>
                                            </td>
                                        </tr>
                                    </template>

                                    <!-- Initial Empty State -->
                                    <tr>
                                        <td colspan="4" class="text-center py-5 border-0">
                                            <div class="d-flex flex-column align-items-center">
                                                <div class="bg-primary bg-opacity-10 rounded-circle p-4 mb-3">
                                                    <i class="ti ti-users text-primary" style="font-size: 3rem;"></i>
                                                </div>
                                                <h5 class="text-muted mb-2">Selecciona un taller</h5>
                                                <p class="text-muted mb-0">
                                                    Para comenzar, selecciona una etapa y un taller en los filtros superiores
                                                </p>
                                                <button class="btn btn-outline-primary btn-sm mt-3" onclick="document.getElementById('etapaSelect').focus()">
                                                    <i class="ti ti-arrow-up me-1"></i>
                                                    Ir a filtros
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Table Footer with Pagination and Actions -->
                        <div class="card-footer bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-md-6">
                                    <div class="d-flex align-items-center gap-2">
                                        <small class="text-muted">
                                            <span class="fw-semibold text-success" id="selectedCount">0</span> seleccionados
                                        </small>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="d-flex justify-content-end gap-2">
                                        <button type="button" class="btn btn-success" id="guardarAsistencia" disabled>
                                            <i class="ti ti-device-floppy me-2"></i>
                                            Guardar Asistencia
                                            <span class="badge bg-white text-success ms-2" id="saveButtonCount">0</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
                <!-- Statistics Dashboard -->
        <section class="mb-4">
            <div class="row">
                <div class="col-12 mb-3">
                    <h6 class="text-muted text-uppercase fw-semibold">
                        <i class="ti ti-chart-bar me-1"></i>
                        Estadísticas de Asistencia
                    </h6>
                </div>
                <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
                    <div class="card border-0 shadow-sm h-100">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col">
                                    <h6 class="text-uppercase text-muted mb-2 fw-semibold fs-7">Total Emprendedores</h6>
                                    <h3 class="mb-0 text-dark fw-bold" id="totalEmprendedores">--</h3>
                                    <small class="text-success">
                                        <i class="ti ti-trending-up me-1"></i>
                                        +2.5% vs mes anterior
                                    </small>
                                </div>
                                <div class="col-auto">
                                    <div class="bg-primary bg-opacity-10 rounded-3 p-3">
                                        <i class="ti ti-users text-primary fs-4"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
                    <div class="card border-0 shadow-sm h-100">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col">
                                    <h6 class="text-uppercase text-muted mb-2 fw-semibold fs-7">Asistentes</h6>
                                    <h3 class="mb-0 text-success fw-bold" id="totalAsistentes">--</h3>
                                    <small class="text-success">
                                        <i class="ti ti-trending-up me-1"></i>
                                        +5.2% esta semana
                                    </small>
                                </div>
                                <div class="col-auto">
                                    <div class="bg-success bg-opacity-10 rounded-3 p-3">
                                        <i class="ti ti-user-check text-success fs-4"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
                    <div class="card border-0 shadow-sm h-100">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col">
                                    <h6 class="text-uppercase text-muted mb-2 fw-semibold fs-7">Ausentes</h6>
                                    <h3 class="mb-0 text-warning fw-bold" id="totalAusentes">--</h3>
                                    <small class="text-danger">
                                        <i class="ti ti-trending-down me-1"></i>
                                        -1.8% esta semana
                                    </small>
                                </div>
                                <div class="col-auto">
                                    <div class="bg-warning bg-opacity-10 rounded-3 p-3">
                                        <i class="ti ti-user-minus text-warning fs-4"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
                    <div class="card border-0 shadow-sm h-100">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col">
                                    <h6 class="text-uppercase text-muted mb-2 fw-semibold fs-7">% Asistencia</h6>
                                    <h3 class="mb-0 text-info fw-bold" id="porcentajeAsistencia">--%</h3>
                                    <div class="progress mt-2" style="height: 4px;">
                                        <div class="progress-bar bg-info" role="progressbar" style="width: 0%" id="progressBar"></div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <div class="bg-info bg-opacity-10 rounded-3 p-3">
                                        <i class="ti ti-chart-pie text-info fs-4"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>



    <!-- Quick Actions Floating Button -->
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1050;">
        <div class="dropup">
            <button class="btn btn-primary rounded-circle shadow-lg" type="button" data-bs-toggle="dropdown" style="width: 56px; height: 56px;">
                <i class="ti ti-plus fs-5"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end mb-2">
                <li><h6 class="dropdown-header">Acciones Rápidas</h6></li>
                <li><a class="dropdown-item" href="#"><i class="ti ti-user-plus me-2"></i>Nuevo Emprendedor</a></li>
                <li><a class="dropdown-item" href="#"><i class="ti ti-presentation me-2"></i>Nuevo Taller</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#"><i class="ti ti-file-export me-2"></i>Exportar Datos</a></li>
                <li><a class="dropdown-item" href="#"><i class="ti ti-report me-2"></i>Generar Reporte</a></li>
            </ul>
        </div>
    </div>
