<link rel="stylesheet" href="taller-premium.css">

<div class="taller-premium-wrapper">
    <!-- Header Hero -->
    <div class="premium-header mb-4 rounded-4 position-relative">
        <div class="position-absolute top-0 start-0 w-100 h-100 overflow-hidden rounded-4 z-0">
            <div class="premium-decorator position-absolute"></div>
            <div class="premium-decorator-2 position-absolute"></div>
        </div>
        <div class="row align-items-center position-relative z-1">
            <div class="col-lg-7">
                <h2 class="display-6 fw-bold mb-2 text-dark">Talleres de Capacitación</h2>
                <p class="lead mb-0 text-muted-premium">Busca y administra la oferta formativa de manera eficiente y
                    visual.</p>
            </div>
            <div class="col-lg-5 text-lg-end mt-4 mt-lg-0">
                <div class="d-flex flex-column flex-sm-row justify-content-lg-end align-items-center gap-3">
                    <!-- Search with floating modern style -->
                    <div class="premium-search-box position-relative w-100 flex-grow-1">
                        <i
                            class="ti ti-search position-absolute top-50 start-0 translate-middle-y ms-3 fs-5 text-primary"></i>
                        <input type="text" class="form-control premium-search ps-5 py-2 w-100" id="searchTaller"
                            placeholder="Buscar taller...">
                    </div>
                    <!-- Dropdown Nuevo -->
                    <div class="dropdown">
                        <button
                            class="btn btn-primary premium-btn shadow-sm dropdown-toggle d-flex align-items-center py-2 px-4"
                            type="button" id="dropdownNuevo" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="ti ti-plus fs-5 me-2"></i> Nuevo
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-4 mt-2 p-2"
                            aria-labelledby="dropdownNuevo">
                            <li>
                                <a class="dropdown-item py-2 px-3 d-flex align-items-center rounded-3 mb-1" href="#"
                                    data-bs-toggle="modal" data-bs-target="#modalNuevoTaller">
                                    <div class="icon-circle bg-primary-subtle text-primary me-3"><i
                                            class="ti ti-book fs-5"></i></div>
                                    <div>
                                        <h6 class="mb-0 fw-semibold text-dark">Taller</h6>
                                        <small class="text-muted d-block">Crear nueva sesión</small>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <hr class="dropdown-divider opacity-10 mx-3">
                            </li>
                            <li>
                                <a class="dropdown-item py-2 px-3 d-flex align-items-center rounded-3 mt-1"
                                    href="../instructores">
                                    <div class="icon-circle bg-secondary-subtle text-secondary me-3"><i
                                            class="ti ti-user-plus fs-5"></i></div>
                                    <div>
                                        <h6 class="mb-0 fw-semibold text-dark">Instructor</h6>
                                        <small class="text-muted d-block">Dar de alta formador</small>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- View Switcher & Actions -->
    <div class="d-flex justify-content-end mb-4">
        <div class="btn-group premium-view-switcher rounded-pill shadow-sm border" role="group">
            <button type="button" class="btn btn-sm rounded-pill px-3 active" id="btn-grid-view"
                aria-label="Vista de cuadrícula">
                <i class="ti ti-layout-grid fs-5"></i>
            </button>
            <button type="button" class="btn btn-sm rounded-pill px-3" id="btn-table-view" aria-label="Vista de tabla">
                <i class="ti ti-list fs-5"></i>
            </button>
        </div>
    </div>

    <!-- Content Area -->
    <div class="row g-4" id="talleresContent">
        <!-- JS Cards -->
    </div>
    <div id="talleresTableView" class="premium-table-container rounded-4 shadow-sm overflow-hidden"
        style="display: none;">
        <div class="table-responsive">
            <table id="talleresTable" class="table premium-table align-middle mb-0">
                <thead>
                    <tr>
                        <th class="border-0 text-uppercase fw-bold text-muted">Nombre del Taller</th>
                        <th class="border-0 text-uppercase fw-bold text-muted">Módulo</th>
                        <th class="border-0 text-uppercase fw-bold text-muted">Instructor</th>
                        <th class="border-0 text-uppercase fw-bold text-muted text-end">Acciones</th>
                    </tr>
                </thead>
                <tbody id="talleresTableBody" class="border-top-0">
                    <!-- JS Rows -->
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Modal para Editar Taller -->
<div class="modal fade premium-modal" id="modalEditarTaller" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header position-relative overflow-hidden">
                <h5 class="modal-title fw-bold text-dark position-relative z-1" id="modalEditarTallerLabel">
                    <i class="ti ti-edit text-primary me-2"></i>Editar Taller
                </h5>
                <button type="button" class="btn-close position-relative z-1" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="editarTallerForm">
                    <div class="text-center mb-5">
                        <div class="position-relative d-inline-block">
                            <img class="rounded-circle shadow-sm border border-3 border-white mt-2" alt=""
                                id="imagenInstructor" width="100" height="100" style="object-fit: cover;">
                            <span
                                class="position-absolute bottom-0 start-50 translate-middle-x badge bg-primary-subtle text-primary border border-white rounded-pill px-3 shadow-sm transform-bottom">Instructor</span>
                        </div>
                        <div class="mt-4 mx-auto" style="max-width: 300px;" id="selectorInstructores"></div>
                        <div class="mt-2" id="spinnerImagenInstructor" hidden>
                            <div class="spinner-border spinner-border-sm text-primary" role="status"></div>
                        </div>
                    </div>

                    <div class="row g-4">
                        <input id="idTaller" name="idTaller" hidden="">

                        <!-- Nombre del taller -->
                        <div class="col-md-12">
                            <label for="nombreTaller" class="form-label">Nombre del Taller</label>
                            <input required="" type="text" class="form-control" id="nombreTaller" name="nombreTaller"
                                placeholder="Ej. Modelo de Negocio con Alma">
                        </div>

                        <!-- Número de taller y Tipo -->
                        <div class="col-md-6">
                            <label for="numeroTaller" class="form-label">Secuencia (1 a 15)</label>
                            <div class="input-group">
                                <span class="input-group-text bg-white text-muted border-end-0"><i
                                        class="ti ti-hash"></i></span>
                                <input required="" type="number" class="form-control border-start-0 ps-0"
                                    id="numeroTaller" name="numeroTaller" min="1" max="15">
                            </div>
                        </div>

                        <div class="col-md-6">
                            <label for="tipoTaller" class="form-label">Módulo</label>
                            <div id="selectorTipoTalleres"></div>
                        </div>

                        <!-- Observaciones -->
                        <div class="col-md-12">
                            <label for="observaciones" class="form-label">Observaciones</label>
                            <textarea class="form-control" id="observaciones" name="observaciones" rows="3"
                                placeholder="Añade notas o requerimientos del taller..."></textarea>
                        </div>

                        <!-- Evaluación habilitada -->
                        <div class="col-md-12">
                            <div
                                class="p-3 bg-light rounded-3 border d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="mb-1 text-dark fw-semibold">Evaluación habilitada</h6>
                                    <small class="text-muted">Permite registrar calificaciones para esta sesión.</small>
                                </div>
                                <div class="form-check form-switch form-check-lg fs-4 mb-0">
                                    <input class="form-check-input" type="checkbox" id="evaluacionHabilitada"
                                        name="evaluacionHabilitada">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Botones -->
                    <div class="d-flex justify-content-end gap-3 mt-5 pt-3 border-top">
                        <button type="button" class="btn btn-light px-4" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary px-4 py-2 d-flex align-items-center shadow-sm">
                            <i class="ti ti-device-floppy fs-5 me-2"></i> Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Modal para crear Taller -->
<div class="modal fade premium-modal" id="modalNuevoTaller" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header position-relative overflow-hidden">
                <h5 class="modal-title fw-bold text-dark position-relative z-1">
                    <i class="ti ti-square-plus text-primary me-2"></i>Crear Taller
                </h5>
                <button type="button" class="btn-close position-relative z-1" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="editarCrearTallerForm">
                    <div class="row g-4">
                        <!-- Instructor -->
                        <div class="col-md-12">
                            <label for="instructorTaller" class="form-label">Instructor Asignado</label>
                            <div id="selectorInstructoresTallerCrear"></div>
                        </div>

                        <!-- Nombre del taller -->
                        <div class="col-md-12">
                            <label for="nombreCrearTaller" class="form-label">Nombre de la Sesión</label>
                            <input required type="text" class="form-control" id="nombreCrearTaller"
                                name="nombreCrearTaller" placeholder="Ej. Aspectos Legales y Laborales">
                        </div>

                        <!-- Número y Tipo -->
                        <div class="col-md-6">
                            <label for="numeroTallerCrear" class="form-label">Secuencia (1 a 15)</label>
                            <div class="input-group">
                                <span class="input-group-text bg-white text-muted border-end-0"><i
                                        class="ti ti-hash"></i></span>
                                <input required type="number" class="form-control border-start-0 ps-0"
                                    id="numeroTallerCrear" name="numeroTallerCrear" min="1" max="15">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label for="tipoTaller" class="form-label">Módulo</label>
                            <div id="selectorTipoTallerCrear"></div>
                        </div>

                        <!-- Observaciones -->
                        <div class="col-md-12">
                            <label for="observacionesTallerCrear" class="form-label">Observaciones Adicionales</label>
                            <textarea class="form-control" id="observacionesTallerCrear" name="observacionesTallerCrear"
                                rows="3" placeholder="Detalles extra..."></textarea>
                        </div>
                    </div>

                    <div class="d-flex justify-content-end gap-3 mt-5 pt-3 border-top">
                        <button type="button" class="btn btn-light px-4" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary px-4 py-2 d-flex align-items-center shadow-sm">
                            <i class="ti ti-plus fs-5 me-2"></i> Registrar Taller
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>