<div class="card shadow-sm border-0">
    <div class="card-header bg-white">
        <h4 class="card-title mb-3">Historial de Emprendedores Registrados</h4>
        <form id="filterForm">
            <div class="row mb-3">
                <div class="col-md-12">
                    <div class="btn-group w-100" role="group" id="modoFiltro">
                        <input type="radio" class="btn-check" name="filtro_principal" id="filtroEtapas" value="etapas" checked>
                        <label class="btn btn-outline-primary" for="filtroEtapas">Filtrar por Etapas</label>

                        <input type="radio" class="btn-check" name="filtro_principal" id="filtroSinEtapa" value="-">
                        <label class="btn btn-outline-primary" for="filtroSinEtapa">Emprendedores Sin Etapa</label>

                        <input type="radio" class="btn-check" name="filtro_principal" id="filtroTodos" value="-1">
                        <label class="btn btn-outline-primary" for="filtroTodos">Ver Todos los Registros</label>
                    </div>
                </div>
            </div>

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
                                <!-- Las etapas se cargan como checkboxes -->
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
    <div class="card-body">
        <div class="table-responsive" id="container">
            <!-- Aquí se generará la tabla de emprendedores dinámicamente -->
        </div>
    </div>
</div>
