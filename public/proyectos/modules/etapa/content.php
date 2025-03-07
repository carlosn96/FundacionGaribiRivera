<div class="card">
    <div class="card-body">
        <h4 class="card-title">Etapas de formación</h4>
        <!-- Barra de navegación para las pestañas -->
        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item" role="presentation">
                <a class="nav-link d-flex active" data-bs-toggle="tab" href="#etapasDisponibles" role="tab" aria-selected="true">
                    <span>
                        <i class="ti ti-calendar fs-4"></i>
                    </span>
                    <span class="d-none d-md-block ms-2">Etapas disponibles</span>
                </a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link d-flex" data-bs-toggle="tab" href="#nuevaEtapa" role="tab" aria-selected="false">
                    <span>
                        <i class="ti ti-playlist-add fs-4"></i>
                    </span>
                    <span class="d-none d-md-block ms-2">Nueva etapa</span>
                </a>
            </li>
        </ul>

        <div class="tab-content mt-3">
            <!-- Tab: Etapas Disponibles -->
            <div class="tab-pane fade show active" id="etapasDisponibles" role="tabpanel" aria-labelledby="etapasDisponibles-tab">
                <div class="mb-4">
                    <form id="filterForm">
                        <label for="etapasFilter" class="mb-0 me-2">Mostrar etapas por año:</label>
                        <div class="input-group" id="selector">
                            <button id="botonAplicarFiltro" type="submit" class="btn btn-outline-primary">Filtrar</button>
                            <button type="button" class="btn btn-outline-danger" onclick="refresh()">Deshacer filtro</button>
                        </div>
                    </form>
                </div>
                <div class="table-responsive" id="tablaEtapas">
                    <!-- Aquí se generará la tabla de etapas dinámicamente -->
                </div>
            </div>

            <!-- Tab: Nueva Etapa -->
            <div class="tab-pane fade p-3" id="nuevaEtapa" role="tabpanel" aria-labelledby="nuevaEtapa-tab">
                <h4 class="mb-4">Crear etapa</h4>
                <form id="etapaForm" class="needs-validation">
                    <!-- Nombre de la Etapa -->
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="nombre" name="nombre" maxlength="45" placeholder="Nombre de la etapa" required>
                        <label for="nombre">
                            <i class="ti ti-list me-2 fs-4 text-warning"></i>
                            <strong>Nombre de la etapa</strong>
                        </label>
                    </div>

                    <!-- Tipo de Etapa -->
                    <div class="mb-3">
                        <label class="form-label">
                            <i class="ti ti-clipboard me-2 fs-4 text-warning"></i>
                            <strong>Tipo de etapa</strong>
                        </label>
                        <div id="tipoEtapa">
                            <!-- Aquí se pueden agregar opciones dinámicas -->
                        </div>
                    </div>

                    <!-- Fechas de Inicio y Fin -->
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <div class="form-floating">
                                <input type="datetime-local" class="form-control" id="fechaInicio" name="fechaInicio" required>
                                <label for="fechaInicio">
                                    <i class="ti ti-calendar me-2 fs-4 text-warning"></i>
                                    Fecha de inicio
                                </label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-floating">
                                <input type="datetime-local" class="form-control" id="fechaFin" name="fechaFin" required>
                                <label for="fechaFin">
                                    <i class="ti ti-calendar me-2 fs-4 text-warning"></i> Fecha de fin
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Tamaño de Clave de Acceso -->
                    <div class="mb-4">
                        <label class="form-label d-flex align-items-center">
                            <i class="ti ti-key me-2 fs-4 text-warning"></i>
                            <strong>Tamaño de clave de acceso</strong>
                        </label>
                        <div class="row">
                            <div class="col-12 col-md-4 mb-2">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="tamClave" id="tamClave5" value="5" checked>
                                    <label class="form-check-label" for="tamClave5">5 caracteres</label>
                                </div>
                            </div>
                            <div class="col-12 col-md-4 mb-2">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="tamClave" id="tamClave10" value="10">
                                    <label class="form-check-label" for="tamClave10">10 caracteres</label>
                                </div>
                            </div>
                            <div class="col-12 col-md-4 mb-2">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="tamClave" id="tamClave15" value="15">
                                    <label class="form-check-label" for="tamClave15">15 caracteres</label>
                                </div>
                            </div>
                        </div>
                        <div class="invalid-feedback">
                            <i class="ti ti-alert-circle me-2"></i> Selecciona un tamaño de clave.
                        </div>
                    </div>

                    <!-- Clave de Acceso -->
                    <div class="mb-4">
                        <label class="form-label d-flex align-items-center">
                            <i class="fas fa-key me-2 text-warning"></i>
                            <strong>Clave de Acceso</strong>
                        </label>
                        <div class="d-flex flex-column flex-sm-row align-items-center">
                            <button type="button" class="btn btn-outline-warning mb-2 mb-sm-0 d-flex align-items-center" onclick="generarClaveAccesoAleatoria()">
                                <i class="fas fa-key me-2"></i> <span class="text-truncate" style="max-width: 150px;">Generar clave</span>
                            </button>
                            <input name="claveAcceso" id="claveAcceso" maxlength="5" class="form-control ms-0 ms-sm-2 clave" placeholder="************" required>
                        </div>
                        <div class="invalid-feedback">
                            <i class="ti ti-alert-circle me-2"></i> La clave de acceso es obligatoria.
                        </div>
                    </div>
                    <div class="d-grid gap-2 col-6 mx-auto">
                        <button type="submit" class="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2" aria-label="Guardar la etapa">
                            <i class="fas fa-save" aria-hidden="true"></i>
                            <span>Guardar etapa</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalDetallesEtapa" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalDetallesEtapaLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <form id="actualizarEtapaForm" class="needs-validation" novalidate>
            <div class="modal-content">
                <!-- Encabezado del modal -->
                <div class="modal-header bg-warning text-white d-flex align-items-center">
                    <h5 class="modal-title" id="modalDetallesEtapaLabel">
                        <i class="ti ti-edit me-2"></i> Editar Etapa
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <!-- Cuerpo del modal -->
                <div class="modal-body">
                    <input id="idEtapa" name="idEtapa" type="hidden">

                    <!-- Campo Nombre -->
                    <div class="mb-3">
                        <label for="nombreEtapaModal" class="form-label">Nombre de la etapa</label>
                        <input id="nombreEtapaModal" name="nombre" type="text" class="form-control" placeholder="Nombre de la etapa" required>
                        <div class="invalid-feedback">
                            Por favor, ingresa un nombre válido.
                        </div>
                    </div>

                    <!-- Campo Tipo de Etapa -->
                    <div class="mb-3">
                        <label for="tipoEtapaModal" class="form-label">Tipo de etapa</label>
                        <div id="tipoEtapaModal">
                            <!-- Opciones de tipo de etapa dinámicas aquí -->
                        </div>
                        <div class="invalid-feedback">
                            Debes seleccionar un tipo de etapa.
                        </div>
                    </div>

                    <!-- Campo Clave de Acceso -->
                    <div class="mb-3">
                        <label for="claveAccesoModal" class="form-label">Clave de acceso</label>
                        <input id="claveAccesoModal" name="claveAcceso" type="text" class="form-control clave" placeholder="Editar clave" required>
                        <div class="invalid-feedback">
                            La clave de acceso es obligatoria.
                        </div>
                    </div>

                    <!-- Fechas de Inicio y Fin -->
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="fechaInicioModal" class="form-label">Fecha de inicio</label>
                            <input id="fechaInicioModal" name="fechaInicio" type="datetime-local" class="form-control" required>
                            <div class="invalid-feedback">
                                La fecha de inicio es obligatoria.
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="fechaFinModal" class="form-label">Fecha de fin</label>
                            <input id="fechaFinModal" name="fechaFin" type="datetime-local" class="form-control" required>
                            <div class="invalid-feedback">
                                La fecha de fin es obligatoria.
                            </div>
                        </div>
                    </div>

                </div>
                
                <div class="modal-footer">
                    <button type="submit" class="btn btn-outline-primary">
                        <i class="ti ti-send me-2"></i> Guardar Cambios
                    </button>
                    <button type="button" class="btn btn-warning" data-bs-dismiss="modal">
                        <i class="ti ti-x me-2"></i> Cancelar
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>

