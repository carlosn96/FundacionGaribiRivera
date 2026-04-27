<div class="container-fluid py-4">
    <div class="row">
        <div class="col-12">
            <div class="card border-0 shadow-sm">

                <!-- ═══════════ HEADER + TOOLBAR ═══════════ -->
                <div class="card-header bg-white border-bottom py-3">
                    <div class="row align-items-center g-3">
                        <!-- Title -->
                        <div class="col-lg-5 col-md-6">
                            <div class="d-flex align-items-center">
                                <div class="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                                    <i class="ti ti-book fs-4 text-primary"></i>
                                </div>
                                <div>
                                    <h4 class="mb-0 fw-bold">Talleres</h4>
                                    <small class="text-muted">Gestión de sesiones formativas</small>
                                </div>
                                <span class="badge bg-primary bg-opacity-10 text-primary ms-3 rounded-pill fs-7" id="totalTalleresCount">0</span>
                            </div>
                        </div>

                        <!-- Search + Actions -->
                        <div class="col-lg-7 col-md-6">
                            <div class="d-flex align-items-center gap-2 justify-content-md-end flex-wrap">
                                <!-- Search -->
                                <div class="input-group input-group-sm flex-grow-1" style="max-width: 280px;">
                                    <span class="input-group-text bg-white border-end-0">
                                        <i class="ti ti-search text-muted"></i>
                                    </span>
                                    <input type="text" class="form-control border-start-0 ps-0" id="searchTaller"
                                        placeholder="Buscar taller..." aria-label="Buscar taller">
                                </div>

                                <!-- View Switcher -->
                                <div class="btn-group btn-group-sm" role="group" aria-label="Cambiar vista">
                                    <button type="button" class="btn btn-outline-secondary active" id="btn-grid-view"
                                        title="Vista de tarjetas">
                                        <i class="ti ti-layout-grid"></i>
                                    </button>
                                    <button type="button" class="btn btn-outline-secondary" id="btn-table-view"
                                        title="Vista de tabla">
                                        <i class="ti ti-list"></i>
                                    </button>
                                </div>

                                <!-- New Dropdown -->
                                <div class="dropdown">
                                    <button class="btn btn-primary btn-sm dropdown-toggle d-flex align-items-center gap-1"
                                        type="button" id="dropdownNuevo" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="ti ti-plus"></i>
                                        <span class="d-none d-sm-inline">Nuevo</span>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 mt-2 p-2"
                                        aria-labelledby="dropdownNuevo">
                                        <li>
                                            <a class="dropdown-item py-2 px-3 d-flex align-items-center rounded-2 mb-1"
                                                href="#" data-bs-toggle="modal" data-bs-target="#modalNuevoTaller">
                                                <div class="bg-primary bg-opacity-10 rounded p-1 me-3 d-flex align-items-center justify-content-center" style="width:28px;height:28px;">
                                                    <i class="ti ti-book text-primary"></i>
                                                </div>
                                                <div>
                                                    <div class="fw-semibold small text-dark">Taller</div>
                                                    <small class="text-muted" style="font-size:0.7rem;">Crear nueva sesión</small>
                                                </div>
                                            </a>
                                        </li>
                                        <li><hr class="dropdown-divider opacity-10 mx-2"></li>
                                        <li>
                                            <a class="dropdown-item py-2 px-3 d-flex align-items-center rounded-2"
                                                href="../instructores">
                                                <div class="bg-secondary bg-opacity-10 rounded p-1 me-3 d-flex align-items-center justify-content-center" style="width:28px;height:28px;">
                                                    <i class="ti ti-user-plus text-secondary"></i>
                                                </div>
                                                <div>
                                                    <div class="fw-semibold small text-dark">Instructor</div>
                                                    <small class="text-muted" style="font-size:0.7rem;">Dar de alta formador</small>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ═══════════ KPI STRIP ═══════════ -->
                <div class="bg-light border-bottom px-4 py-2" id="kpiStrip">
                    <div class="row g-2 align-items-center">
                        <div class="col-4 col-md-3">
                            <div class="d-flex align-items-center gap-2">
                                <div class="bg-primary bg-opacity-10 rounded p-1 d-flex align-items-center justify-content-center" style="width:30px;height:30px;">
                                    <i class="ti ti-book text-primary" style="font-size:0.85rem;"></i>
                                </div>
                                <div>
                                    <div class="fw-bold text-dark small" id="kpiTotal">0</div>
                                    <div class="text-muted" style="font-size:0.65rem;">Total</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 col-md-3">
                            <div class="d-flex align-items-center gap-2">
                                <div class="bg-success bg-opacity-10 rounded p-1 d-flex align-items-center justify-content-center" style="width:30px;height:30px;">
                                    <i class="ti ti-users text-success" style="font-size:0.85rem;"></i>
                                </div>
                                <div>
                                    <div class="fw-bold text-success small" id="kpiInstructores">0</div>
                                    <div class="text-muted" style="font-size:0.65rem;">Instructores</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 col-md-3">
                            <div class="d-flex align-items-center gap-2">
                                <div class="bg-info bg-opacity-10 rounded p-1 d-flex align-items-center justify-content-center" style="width:30px;height:30px;">
                                    <i class="ti ti-category text-info" style="font-size:0.85rem;"></i>
                                </div>
                                <div>
                                    <div class="fw-bold text-info small" id="kpiModulos">0</div>
                                    <div class="text-muted" style="font-size:0.65rem;">Módulos</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-3 d-none d-md-block">
                            <div class="d-flex align-items-center gap-2">
                                <div class="bg-warning bg-opacity-10 rounded p-1 d-flex align-items-center justify-content-center" style="width:30px;height:30px;">
                                    <i class="ti ti-checkbox text-warning" style="font-size:0.85rem;"></i>
                                </div>
                                <div>
                                    <div class="fw-bold text-warning small" id="kpiConEvaluacion">0</div>
                                    <div class="text-muted" style="font-size:0.65rem;">Con evaluación</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ═══════════ CONTENT AREA ═══════════ -->
                <div class="card-body p-4">
                    <!-- Loading State -->
                    <div id="loadingState" class="text-center py-5">
                        <div class="spinner-border text-primary" role="status"></div>
                        <p class="mt-2 text-muted small">Cargando talleres...</p>
                    </div>

                    <!-- Empty State -->
                    <div id="emptyState" class="text-center py-5" style="display:none;">
                        <div class="bg-primary bg-opacity-10 rounded-circle p-4 mb-3 d-inline-flex">
                            <i class="ti ti-book-off text-primary" style="font-size: 2.5rem;"></i>
                        </div>
                        <h6 class="text-muted mb-1">Sin talleres registrados</h6>
                        <p class="text-muted small mb-3">Aún no hay sesiones formativas.</p>
                        <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modalNuevoTaller">
                            <i class="ti ti-plus me-1"></i>Crear primer taller
                        </button>
                    </div>

                    <!-- No Results (from search) -->
                    <div id="noResultsState" class="text-center py-5" style="display:none;">
                        <div class="bg-warning bg-opacity-10 rounded-circle p-4 mb-3 d-inline-flex">
                            <i class="ti ti-search-off text-warning" style="font-size: 2rem;"></i>
                        </div>
                        <h6 class="text-muted mb-1">Sin resultados</h6>
                        <p class="text-muted small mb-0">No se encontraron talleres con ese criterio.</p>
                    </div>

                    <!-- Grid View -->
                    <div class="row g-3" id="talleresContent" style="display:none;"></div>

                    <!-- Table View -->
                    <div id="talleresTableView" style="display:none;">
                        <div class="table-responsive" style="max-height: 500px; overflow-y: auto;">
                            <table id="talleresTable" class="table table-hover align-middle mb-0" role="grid"
                                aria-label="Lista de talleres">
                                <thead>
                                    <tr class="text-uppercase small text-muted" style="letter-spacing: 0.05em;">
                                        <th class="border-0 ps-3 fw-semibold" style="width:40px;">#</th>
                                        <th class="border-0 fw-semibold">Taller</th>
                                        <th class="border-0 fw-semibold d-none d-md-table-cell">Módulo</th>
                                        <th class="border-0 fw-semibold">Instructor</th>
                                        <th class="border-0 text-end fw-semibold pe-3" style="width:80px;">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="talleresTableBody"></tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- ═══════════ FOOTER ═══════════ -->
                <div class="card-footer bg-white border-top py-2">
                    <div class="d-flex align-items-center justify-content-between">
                        <small class="text-muted" id="footerInfo">
                            <i class="ti ti-info-circle me-1"></i>
                            <span id="footerText">Cargando...</span>
                        </small>
                    </div>
                </div>

            </div><!-- /.card -->
        </div>
    </div>
</div>

<!-- ═══════════ MODAL: EDITAR TALLER ═══════════ -->
<div class="modal fade" id="modalEditarTaller" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 shadow">
            <div class="modal-header bg-white border-bottom py-3">
                <h5 class="modal-title fw-bold d-flex align-items-center">
                    <div class="bg-warning bg-opacity-10 rounded-circle p-2 me-3">
                        <i class="ti ti-edit text-warning"></i>
                    </div>
                    Editar Taller
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body p-4">
                <form id="editarTallerForm">
                    <!-- Instructor Preview -->
                    <div class="text-center mb-4">
                        <div class="position-relative d-inline-block">
                            <img class="rounded-circle shadow-sm border border-3 border-white" alt="Instructor"
                                id="imagenInstructor" width="80" height="80" style="object-fit: cover;">
                            <span class="position-absolute bottom-0 start-50 translate-middle-x badge bg-primary bg-opacity-10 text-primary border rounded-pill px-2 shadow-sm"
                                style="font-size: 0.65rem;">Instructor</span>
                        </div>
                        <div class="mt-3 mx-auto" style="max-width: 280px;" id="selectorInstructores"></div>
                        <div class="mt-2" id="spinnerImagenInstructor" hidden>
                            <div class="spinner-border spinner-border-sm text-primary" role="status"></div>
                        </div>
                    </div>

                    <div class="row g-3">
                        <input id="idTaller" name="idTaller" hidden>

                        <div class="col-12">
                            <label for="nombreTaller" class="form-label small fw-semibold text-uppercase text-muted"
                                style="letter-spacing:0.05em;">Nombre del Taller</label>
                            <input required type="text" class="form-control" id="nombreTaller" name="nombreTaller"
                                placeholder="Ej. Modelo de Negocio con Alma">
                        </div>

                        <div class="col-md-6">
                            <label for="numeroTaller" class="form-label small fw-semibold text-uppercase text-muted"
                                style="letter-spacing:0.05em;">Secuencia (1 a 15)</label>
                            <div class="input-group">
                                <span class="input-group-text bg-white"><i class="ti ti-hash text-muted"></i></span>
                                <input required type="number" class="form-control" id="numeroTaller"
                                    name="numeroTaller" min="1" max="15">
                            </div>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label small fw-semibold text-uppercase text-muted"
                                style="letter-spacing:0.05em;">Módulo</label>
                            <div id="selectorTipoTalleres"></div>
                        </div>

                        <div class="col-12">
                            <label for="observaciones" class="form-label small fw-semibold text-uppercase text-muted"
                                style="letter-spacing:0.05em;">Observaciones</label>
                            <textarea class="form-control" id="observaciones" name="observaciones" rows="2"
                                placeholder="Notas o requerimientos..."></textarea>
                        </div>

                        <div class="col-12">
                            <div class="bg-light rounded-3 border p-3 d-flex justify-content-between align-items-center">
                                <div>
                                    <div class="fw-semibold small text-dark">Evaluación habilitada</div>
                                    <small class="text-muted" style="font-size:0.7rem;">Permite registrar calificaciones</small>
                                </div>
                                <div class="form-check form-switch m-0 fs-5">
                                    <input class="form-check-input" type="checkbox" id="evaluacionHabilitada"
                                        name="evaluacionHabilitada">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                        <button type="button" class="btn btn-light btn-sm px-3" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary btn-sm px-3 d-flex align-items-center gap-1">
                            <i class="ti ti-device-floppy"></i> Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- ═══════════ MODAL: CREAR TALLER ═══════════ -->
<div class="modal fade" id="modalNuevoTaller" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 shadow">
            <div class="modal-header bg-white border-bottom py-3">
                <h5 class="modal-title fw-bold d-flex align-items-center">
                    <div class="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                        <i class="ti ti-square-plus text-success"></i>
                    </div>
                    Crear Taller
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body p-4">
                <form id="editarCrearTallerForm">
                    <div class="row g-3">
                        <div class="col-12">
                            <label class="form-label small fw-semibold text-uppercase text-muted"
                                style="letter-spacing:0.05em;">Instructor Asignado</label>
                            <div id="selectorInstructoresTallerCrear"></div>
                        </div>

                        <div class="col-12">
                            <label for="nombreCrearTaller" class="form-label small fw-semibold text-uppercase text-muted"
                                style="letter-spacing:0.05em;">Nombre de la Sesión</label>
                            <input required type="text" class="form-control" id="nombreCrearTaller"
                                name="nombreCrearTaller" placeholder="Ej. Aspectos Legales y Laborales">
                        </div>

                        <div class="col-md-6">
                            <label for="numeroTallerCrear" class="form-label small fw-semibold text-uppercase text-muted"
                                style="letter-spacing:0.05em;">Secuencia (1 a 15)</label>
                            <div class="input-group">
                                <span class="input-group-text bg-white"><i class="ti ti-hash text-muted"></i></span>
                                <input required type="number" class="form-control" id="numeroTallerCrear"
                                    name="numeroTallerCrear" min="1" max="15">
                            </div>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label small fw-semibold text-uppercase text-muted"
                                style="letter-spacing:0.05em;">Módulo</label>
                            <div id="selectorTipoTallerCrear"></div>
                        </div>

                        <div class="col-12">
                            <label for="observacionesTallerCrear" class="form-label small fw-semibold text-uppercase text-muted"
                                style="letter-spacing:0.05em;">Observaciones</label>
                            <textarea class="form-control" id="observacionesTallerCrear"
                                name="observacionesTallerCrear" rows="2" placeholder="Detalles extra..."></textarea>
                        </div>
                    </div>

                    <div class="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                        <button type="button" class="btn btn-light btn-sm px-3" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary btn-sm px-3 d-flex align-items-center gap-1">
                            <i class="ti ti-plus"></i> Registrar Taller
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>