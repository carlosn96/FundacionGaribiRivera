<div class="card">
    <div class="card-body">
        <h4 class="card-title">Etapas disponibles</h4>
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
        <div class="tab-content mt-2 mb-3">
            <div class="tab-pane fade show active" id="etapasDisponibles" role="tabpanel" aria-labelledby="etapasDisponibles-tab">
                <div class="card-body">
                    <div class="table-responsive" id="tablaEtapas">
                    </div>
                </div>
            </div>
            <div class="tab-pane fade p-3" id="nuevaEtapa" role="tabpanel" aria-labelledby="nuevaEtapa-tab">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Crear Nueva Etapa</h4>
                        <p class="card-subtitle mb-3">Formulario para crear una nueva etapa</p>
                        <form id="etapaForm">
                            <!-- Nombre de la etapa -->
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control " id="nombre" name="nombre" maxlength="45" placeholder="Nombre de la etapa" required>
                                <label for="nombre">
                                    <i class="ti ti-list me-2 fs-4 text-warning"></i>
                                    <span class="border-start border-warning ps-3">Nombre de la etapa</span>
                                </label>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">
                                    <i class="ti ti-clipboard me-2 fs-4 text-warning"></i>
                                    <span class="border-start border-warning ps-3">Tipo de etapa</span>
                                </label>
                                <div id="tipoEtapa">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <div class="form-floating">
                                        <input type="datetime-local" class="form-control " id="fechaInicio" name="fechaInicio" required>
                                        <label for="fechaInicio">
                                            <i class="ti ti-calendar me-2 fs-4 text-warning"></i>
                                            <span class="border-start border-warning ps-3">Fecha de inicio</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <div class="form-floating">
                                        <input type="datetime-local" class="form-control " id="fechaFin" name="fechaFin"required>
                                        <label for="fechaFin">
                                            <i class="ti ti-calendar me-2 fs-4 text-warning"></i>
                                            <span class="border-start border-warning ps-3">Fecha de fin</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- Grupo de Talleres -->
                            <div class="mb-3">
                                <label class="form-label">
                                    <i class="ti ti-clipboard me-2 fs-4 text-warning"></i>
                                    <span class="border-start border-warning ps-3">Selecciona los talleres para esta etapa</span>
                                </label>
                                <div id="grupoTalleres">
                                </div>
                            </div>

                            <!-- Tamaño de clave de acceso -->
                            <div class="mb-3">
                                <label class="form-label">
                                    <i class="ti ti-key me-2 fs-4 text-warning"></i>
                                    <span class="border-start border-warning ps-3">Tamaño de clave de acceso</span>
                                </label>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="tamClave" id="tamClave5" value="5" checked>
                                    <label class="form-check-label" for="tamClave5">5 caracteres</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="tamClave" id="tamClave10" value="10">
                                    <label class="form-check-label" for="tamClave10">10 caracteres</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="tamClave" id="tamClave15" value="15">
                                    <label class="form-check-label" for="tamClave15">15 caracteres</label>
                                </div>
                            </div>

                            <!-- Clave de Acceso -->
                            <div class="mb-3">
                                <label class="form-label">
                                    <i class="fas fa-key me-2 fs-4 text-warning"></i>
                                    <span class="border-start border-warning ps-3">Clave de Acceso</span>
                                </label>
                                <div class="input-group">
                                    <button type="button" class="btn btn-outline-warning" onclick="generarClaveAccesoAleatoria()">
                                        <i class="fas fa-key"></i> Generar clave aleatoria
                                    </button>
                                    <input name="claveAcceso" id="claveAcceso" maxlength="15" required class="form-control " placeholder="************">
                                </div>
                            </div>

                            <!-- Botón de Enviar -->
                            <div class="text-center mb-3">
                                <button type="submit" class="btn btn-primary hstack gap-3">
                                    <i class="fas fa-save"></i> Crear etapa
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

<div class="modal fade show" id="modalDetallesEtapa" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-modal="true" role="dialog">
    <div class="modal-dialog">
        <form id="actualizarEtapaForm" class="needs-validation" novalidate="">
            <div class="modal-content">
                <div class="modal-header d-flex align-items-center">
                    <h4 class="modal-title" id="myLargeModalLabel">
                        Editar etapa
                    </h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input id="idEtapa" name="idEtapa" hidden="">
                    <div class="mb-3">
                        <label for="nombreEtapaModal" class="form-label">Nombre</label>
                        <input id="nombreEtapaModal" name="nombre" type="text" class="form-control" placeholder="Nombre" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">
                            Tipo de etapa
                        </label>
                        <div id="tipoEtapaModal">
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="claveAccesoModal" class="form-label">Clave de acceso</label>
                        <input id="claveAccesoModal" name="claveAcceso" type="text" class="form-control" placeholder="Editar clave" required>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="fechaInicioModal" class="form-label">Fecha de inicio</label>
                            <input id="fechaInicioModal" name="fechaInicio" type="datetime-local" class="form-control" required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="fechaFinModal" class="form-label">Fecha de fin</label>
                            <input id="fechaFinModal" name="fechaFin" type="datetime-local" class="form-control" required>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" id="actualizarEtapaForm" class="btn btn-primary">Guardar</button>
                    <button type="button" class="btn bg-danger-subtle text-danger  waves-effect text-start" data-bs-dismiss="modal">
                        Cancelar
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
