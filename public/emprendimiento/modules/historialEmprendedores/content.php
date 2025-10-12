<div class="container-fluid py-4">
    <div class="card shadow-sm border-0">
        <div class="card-header bg-white border-bottom">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h2 class="mb-0 fw-bold text-primary">
                    <i class="fas fa-users me-2"></i>Gestión de Emprendedores
                </h2>
                <div class="d-flex gap-2">
                    <button class="btn btn-outline-primary btn-sm" id="btn-refresh">
                        <i class="fas fa-sync-alt me-1"></i>Actualizar
                    </button>
                    <button class="btn btn-outline-success btn-sm" id="btn-export">
                        <i class="fas fa-file-export me-1"></i>Exportar
                    </button>
                </div>
            </div>
            
            <!-- Tabs Navigation -->
            <ul class="nav nav-tabs border-0" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#pills-all" type="button" role="tab" aria-controls="pills-all" aria-selected="true">
                        <i class="fas fa-list me-2"></i>Todos
                        <span class="badge bg-primary rounded-pill ms-2" id="badge-all">0</span>
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-capacitacion-tab" data-bs-toggle="pill" data-bs-target="#pills-capacitacion" type="button" role="tab" aria-controls="pills-capacitacion" aria-selected="false">
                        <i class="fas fa-graduation-cap me-2"></i>Capacitación
                        <span class="badge bg-info rounded-pill ms-2" id="badge-capacitacion">0</span>
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-credito-tab" data-bs-toggle="pill" data-bs-target="#pills-credito" type="button" role="tab" aria-controls="pills-credito" aria-selected="false">
                        <i class="fas fa-credit-card me-2"></i>Crédito
                        <span class="badge bg-success rounded-pill ms-2" id="badge-credito">0</span>
                    </button>
                </li>
            </ul>
        </div>

        <div class="card-body">
            <!-- Barra de búsqueda -->
            <div class="row mb-4">
                <div class="col-md-6">
                    <div class="input-group">
                        <span class="input-group-text bg-white">
                            <i class="fas fa-search text-muted"></i>
                        </span>
                        <input type="text" class="form-control" id="search-input" placeholder="Buscar por nombre, correo, celular o referencia...">
                    </div>
                </div>
                <div class="col-md-3">
                    <select class="form-select" id="filter-graduado">
                        <option value="">Todos</option>
                        <option value="1">Graduados</option>
                        <option value="0">No graduados</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <select class="form-select" id="filter-referencia">
                        <option value="">Todos</option>
                        <option value="con">Con referencia</option>
                        <option value="sin">Sin referencia</option>
                    </select>
                </div>
            </div>

            <!-- Contenido de pestañas -->
            <div class="tab-content" id="pills-tabContent">
                <!-- Tab: Todos -->
                <div class="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab">
                    <div id="tabla-all-container" class="table-responsive">
                        <!-- Contenido dinámico -->
                    </div>
                </div>

                <!-- Tab: Capacitación -->
                <div class="tab-pane fade" id="pills-capacitacion" role="tabpanel" aria-labelledby="pills-capacitacion-tab">
                    <div id="tabla-capacitacion-container" class="table-responsive">
                        <!-- Contenido dinámico -->
                    </div>
                </div>

                <!-- Tab: Crédito -->
                <div class="tab-pane fade" id="pills-credito" role="tabpanel" aria-labelledby="pills-credito-tab">
                    <div id="tabla-credito-container" class="table-responsive">
                        <!-- Contenido dinámico -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal para registrar fecha de graduación -->
<div class="modal fade" id="modalFechaGraduacion" tabindex="-1" aria-labelledby="modalFechaGraduacionLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalFechaGraduacionLabel">
                    <i class="fas fa-graduation-cap me-2"></i>Registrar Graduación
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="text-center mb-3">
                    <div class="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center" style="width: 60px; height: 60px;">
                        <i class="fas fa-graduation-cap fa-2x text-success"></i>
                    </div>
                </div>
                <p class="text-center mb-4">
                    <br>Por favor, registra la fecha de graduación de
                    <br>
                    <strong id="nombreEmprendedor"></strong>:
                </p>
                <div class="mb-3">
                    <label for="fechaGraduacion" class="form-label">
                        <i class="fas fa-calendar-alt me-2"></i>Fecha de Graduación
                    </label>
                    <input type="date" class="form-control" id="fechaGraduacion" required>
                    <div class="form-text">Selecciona la fecha en que se graduó el emprendedor</div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-warning" data-bs-dismiss="modal">
                    <i class="fas fa-times me-2"></i>Cancelar
                </button>
                <button type="button" class="btn btn-success" id="btnGuardarGraduacion">
                    <i class="fas fa-save me-2"></i>Guardar Graduación
                </button>
            </div>
        </div>
    </div>
</div>