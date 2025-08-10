<div class="card shadow-sm border-1">
    <div class="card-body">
        <h4 class="card-title">Administración de Línea Base</h4>
        <!-- Nav tabs -->
        <ul class="nav nav-pills flex-column flex-sm-row mt-4" role="tablist">
            <li class="nav-item flex-sm-fill text-sm-center">
                <a class="nav-link border active" data-bs-toggle="tab" href="#navpill-11" role="tab">
                    <span>Con línea base</span>
                </a>
            </li>
            <li class="nav-item flex-sm-fill text-sm-center">
                <a class="nav-link border" data-bs-toggle="tab" href="#navpill-22" role="tab">
                    <span>Sin línea base</span>
                </a>
            </li>
        </ul>
        <div class="tab-content border mt-2">
            <div class="tab-pane active p-3" id="navpill-11" role="tabpanel">
                <!-- Filtro de etapas -->
                <div class="row mb-4">
                    <h4 class="card-title"></h4>
                    <p class="card-subtitle mb-3">Listado de emprendedores con línea base completa</p>
                    <form id="filterForm">
                        <div id="filtros-avanzados" class="row g-3 align-items-end">
                            <div class="col-md-3">
                                <label for="fechaInicio" class="form-label">Desde</label>
                                <input type="date" class="form-control" id="fechaInicio">
                            </div>
                            <div class="col-md-3">
                                <label for="fechaFin" class="form-label">Hasta</label>
                                <input type="date" class="form-control" id="fechaFin">
                            </div>
                            <div class="col-md-3">
                                <label for="tipoEtapa" class="form-label">Tipo de Etapa</label>
                                <div id="tipoEtapa-buttons" class="btn-group w-100" role="group">
                                    <!-- Los botones de tipo de etapa se agregarán dinámicamente -->
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="esActualSwitch">
                                    <label class="form-check-label" for="esActualSwitch">Mostrar solo etapa actual</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="dropdown">
                                    <button class="btn btn-outline-success dropdown-toggle w-100" type="button" id="etapasDropdownMenu" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                                        Seleccionar etapas
                                    </button>
                                    <div class="dropdown-menu p-3 w-100" aria-labelledby="etapasDropdownMenu">
                                        <input type="search" id="etapasSearch" class="form-control mb-2" placeholder="Buscar etapas...">
                                        <div id="etapas-list" style="max-height: 200px; overflow-y: auto;">
                                            <!-- Las etapas se cargarán aquí como checkboxes -->
                                        </div>
                                        <div class="dropdown-divider"></div>
                                        <div class="text-end">
                                            <button type="button" class="btn btn-primary btn-sm" id="guardarSeleccionEtapas">Guardar selección</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 text-end mt-3">
                            <button id="botonAplicarFiltro" type="submit" class="btn btn-primary">Aplicar Filtro</button>
                        </div>
                    </form>
                </div>

                <!-- Tabla de emprendedores -->
                <div class="row mb-4">
                    <div id="tablaEmprendedoresContenedor" class="table-responsive">
                    </div>
                </div>
            </div>

            <div class="tab-pane p-3" id="navpill-22" role="tabpanel">
                <!--div class="row mb-2">
                    <div class="col-12 d-flex justify-content-end">
                        <button id="btn-eliminar-seleccionados" type="button" class="btn btn-outline-danger" onclick="eliminarSeleccionados()">
                            <i class="ti ti-trash me-2"></i>Eliminar seleccionados
                        </button>
                    </div>
                </div-->
                <div class="row">
                    <div id="tablaEmprendedoresSinLineaBaseContenedor" class="table-responsive">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
