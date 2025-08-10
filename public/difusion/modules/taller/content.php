<div class="course">
    <div class="card">
        <div class="card-body">
            <div class="row d-md-flex justify-content-between mb-4">
                <div class="mb-4 mb-md-0">
                    <h4 class="card-title">Talleres de Capacitación</h4>
                    <p class="card-subtitle mb-0">Puedes buscar talleres por instructor, nombre o tipo de formación</p>
                </div>
                <div class="d-flex flex-column flex-md-row align-items-center w-100">
                    <form class="position-relative me-3 mb-3 mb-md-0 w-100 w-md-auto">
                        <input type="text" class="form-control search-chat py-2 ps-5" id="searchTaller" placeholder="Buscar">
                        <i class="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3"></i>
                    </form>
                    <div class="ms-auto">
                        <!-- Menú desplegable -->
                        <div class="dropdown">
                            <button class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownNuevo" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fas fa-plus me-2"></i> Nuevo
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownNuevo">
                                <li>
                                    <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalNuevoTaller">
                                        <i class="fas fa-book me-2"></i> Taller
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="../instructores">
                                        <i class="fas fa-user-plus me-2"></i> Instructor
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-end mb-3">
                <div class="btn-group" role="group" aria-label="View switcher">
                    <button type="button" class="btn btn-outline-primary active" id="btn-grid-view" aria-label="Vista de cuadrícula">
                        <i class="ti ti-layout-grid"></i>
                    </button>
                    <button type="button" class="btn btn-outline-primary" id="btn-table-view" aria-label="Vista de tabla">
                        <i class="ti ti-list"></i>
                    </button>
                </div>
            </div>
            <div class="row" id="talleresContent">
                <!-- Aquí se mostrarán las tarjetas de los talleres -->
            </div>
            <div id="talleresTableView" class="table-responsive" style="display: none;">
                <table id="talleresTable" class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Nombre del Taller</th>
                            <th>Tipo de Formación</th>
                            <th>Instructor</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="talleresTableBody">
                        <!-- Rows will be inserted here by JavaScript -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>


<!-- Modal para Editar Taller -->
<div class="modal fade" id="modalEditarTaller" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalEditarTallerLabel">Editar Taller</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card">
                    <div class="card-body">
                        <form id="editarTallerForm">
                            <div class="text-center">
                                <img width="110" class="rounded-3 mb-3" alt="" id="imagenInstructor">
                                <span class="badge bg-primary-subtle text-primary fw-light rounded-pill mb-3 d-block">Instructor</span>
                                <div class="mb-3" id="selectorInstructores">
                                </div>
                                <div class="mb-3">
                                    <div class="spinner-grow text-warning" role="status" id="spinnerImagenInstructor" hidden>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-5">
                                <input id="idTaller" name="idTaller" hidden="">
                                <!-- Nombre del taller -->
                                <div class="mb-3">
                                    <label for="nombreTaller" class="form-label">Nombre del Taller</label>
                                    <input required="" type="text" class="form-control" id="nombreTaller" name="nombreTaller" placeholder="Introduce el nombre del taller">
                                </div>
                                <!-- Tipo de taller -->
                                <div class="mb-3">
                                    <label for="tipoTaller" class="form-label">Tipo de Taller</label>
                                    <div id="selectorTipoTalleres">
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label" for="evaluacionHabilitada">Evaluación habilitada:</label>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="evaluacionHabilitada" name="evaluacionHabilitada">
                                        <label class="form-check-label" for="evaluacionHabilitada" name="evaluacionHabilitada">Habilitar / Deshablitar</label>
                                    </div>
                                </div>
                                <!-- Observaciones -->
                                <div class="mb-3">
                                    <label for="observaciones" class="form-label">Observaciones</label>
                                    <textarea class="form-control" id="observaciones" name="observaciones" rows="3" placeholder="Observaciones adicionales sobre el taller"></textarea>
                                </div>
                                <!-- Botones para guardar o cancelar -->
                                <div class="d-flex justify-content-end gap-2">
                                    <button type="submit" class="btn btn-primary px-4 py-2 d-flex align-items-center">
                                        <i class="ti ti-check fs-5 me-2"></i>Actualizar
                                    </button>
                                    <button type="button" class="btn btn-outline-warning px-4 py-2" data-bs-dismiss="modal">
                                        <i class="ti ti-x fs-5 me-2"></i>Cancelar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal para crear Taller -->
<div class="modal fade" id="modalNuevoTaller" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalEditarTallerLabel">Crear Taller</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="editarCrearTallerForm">
                    <div class="mt-5">
                        <label for="instructorTaller" class="form-label">Instructor</label>
                        <div class="mb-3" id="selectorInstructoresTallerCrear"></div>
                        <div class="mb-3">
                            <label for="nombreCrearTaller" class="form-label">Nombre del Taller</label>
                            <input required type="text" class="form-control" id="nombreCrearTaller" name="nombreCrearTaller" placeholder="Introduce el nombre del taller">
                        </div>
                        <div class="mb-3">
                            <label for="tipoTaller" class="form-label">Tipo de Taller</label>
                            <div id="selectorTipoTallerCrear"></div>
                        </div>
                        <div class="mb-3">
                            <label for="observacionesTallerCrear" class="form-label">Observaciones</label>
                            <textarea class="form-control" id="observacionesTallerCrear" name="observacionesTallerCrear" rows="3" placeholder="Observaciones adicionales sobre el taller"></textarea>
                        </div>
                        <div class="d-flex justify-content-end gap-2">
                            <button type="submit" class="btn btn-primary px-4 py-2 d-flex align-items-center"><i class="ti ti-check fs-5 me-2"></i>Guardar</button>
                            <button type="button" class="btn btn-outline-warning px-4 py-2" data-bs-dismiss="modal"><i class="ti ti-x fs-5 me-2"></i>Cancelar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>