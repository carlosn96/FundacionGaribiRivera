<div class="container-fluid px-3 px-md-4 py-4">
    <div class="card border-0 shadow-sm">
        <!-- Header -->
        <div class="card-header bg-white border-bottom-0 pt-4 pb-3">
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
                <h1 class="h3 mb-0 fw-semibold text-dark d-flex align-items-center">
                    <span class="bg-primary bg-opacity-10 rounded-3 p-2 me-3">
                        <i class="fas fa-users text-primary"></i>
                    </span>
                    Gestión de Emprendedores
                </h1>
                <div class="d-flex gap-2">
                    <button class="btn btn-outline-secondary btn-sm d-flex align-items-center" id="btn-refresh">
                        <i class="fas fa-sync-alt me-2"></i>
                        <span class="d-none d-sm-inline">Actualizar</span>
                    </button>
                    <button class="btn btn-success btn-sm d-flex align-items-center" id="btn-export">
                        <i class="fas fa-download me-2"></i>
                        <span class="d-none d-sm-inline">Exportar</span>
                    </button>
                </div>
            </div>
            
            <!-- Tabs Navigation -->
            <ul class="nav nav-pills gap-2" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active d-flex align-items-center" id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#pills-all" type="button" role="tab">
                        <i class="fas fa-list me-2"></i>
                        <span>Todos</span>
                        <span class="badge bg-primary bg-opacity-10 text-primary rounded-pill ms-2" id="badge-all">0</span>
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link d-flex align-items-center" id="pills-capacitacion-tab" data-bs-toggle="pill" data-bs-target="#pills-capacitacion" type="button" role="tab">
                        <i class="fas fa-graduation-cap me-2"></i>
                        <span>Capacitación</span>
                        <span class="badge bg-info bg-opacity-10 text-info rounded-pill ms-2" id="badge-capacitacion">0</span>
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link d-flex align-items-center" id="pills-credito-tab" data-bs-toggle="pill" data-bs-target="#pills-credito" type="button" role="tab">
                        <i class="fas fa-credit-card me-2"></i>
                        <span>Crédito</span>
                        <span class="badge bg-success bg-opacity-10 text-success rounded-pill ms-2" id="badge-credito">0</span>
                    </button>
                </li>
            </ul>
        </div>

        <div class="card-body p-3 p-md-4">
            <!-- Filtros -->
            <div class="row g-3 mb-4">
                <div class="col-12 col-md-6 col-lg-5">
                    <div class="position-relative">
                        <i class="fas fa-search position-absolute text-muted" style="left: 12px; top: 50%; transform: translateY(-50%);"></i>
                        <input type="text" class="form-control ps-5 border-1" id="search-input" placeholder="Buscar por nombre, correo, celular o referencia...">
                    </div>
                </div>
                <div class="col-6 col-md-3 col-lg-3">
                    <select class="form-select border-1" id="filter-graduado">
                        <option value="">Estado: Todos</option>
                        <option value="1">Graduados</option>
                        <option value="0">En Capacitación</option>
                    </select>
                </div>
                <div class="col-6 col-md-3 col-lg-4">
                    <select class="form-select border-1" id="filter-referencia">
                        <option value="">Referencia: Todas</option>
                        <option value="con">Con referencia</option>
                        <option value="sin">Sin referencia</option>
                    </select>
                </div>
            </div>

            <!-- Contenido de pestañas -->
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-all" role="tabpanel">
                    <div id="tabla-all-container"></div>
                </div>
                <div class="tab-pane fade" id="pills-capacitacion" role="tabpanel">
                    <div id="tabla-capacitacion-container"></div>
                </div>
                <div class="tab-pane fade" id="pills-credito" role="tabpanel">
                    <div id="tabla-credito-container"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Graduación -->
<div class="modal fade" id="modalFechaGraduacion" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow">
            <div class="modal-header border-0 pb-0">
                <h5 class="modal-title fw-semibold">
                    <i class="fas fa-graduation-cap text-success me-2"></i>Registrar Graduación
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body pt-2">
                <div class="text-center mb-4">
                    <div class="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center" style="width: 64px; height: 64px;">
                        <i class="fas fa-graduation-cap fa-2x text-success"></i>
                    </div>
                    <p class="mt-3 mb-2 text-muted">
                        Registra la fecha de graduación de
                    </p>
                    <p class="fw-semibold fs-5 mb-0" id="nombreEmprendedor"></p>
                </div>
                <div class="mb-3">
                    <label for="fechaGraduacion" class="form-label fw-medium">
                        <i class="fas fa-calendar-alt text-primary me-2"></i>Fecha de Graduación
                    </label>
                    <input type="date" class="form-control" id="fechaGraduacion" required>
                    <div class="form-text">Selecciona la fecha en que se graduó</div>
                </div>
            </div>
            <div class="modal-footer border-0 pt-0">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">
                    <i class="fas fa-times me-2"></i>Cancelar
                </button>
                <button type="button" class="btn btn-success" id="btnGuardarGraduacion">
                    <i class="fas fa-check me-2"></i>Guardar
                </button>
            </div>
        </div>
    </div>
</div>