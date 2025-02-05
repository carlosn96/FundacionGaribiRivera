

<div class="card shadow-sm border-1">
    <div class="card-body">
        <h4 class="card-title">Administración de Línea Base</h4>
        <!-- Nav tabs -->
        <ul class="nav nav-pills flex-column flex-sm-row mt-4" role="tablist">
            <li class="nav-item flex-sm-fill text-sm-center">
                <a class="nav-link active" data-bs-toggle="tab" href="#navpill-11" role="tab">
                    <span>Con línea base</span>
                </a>
            </li>
            <li class="nav-item flex-sm-fill text-sm-center">
                <a class="nav-link" data-bs-toggle="tab" href="#navpill-22" role="tab">
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
                        <label for="etapasFilter" class="mb-0 me-2">Filtrar por etapas:</label>
                        <div class="input-group" id="selector">
                            <button id="botonAplicarFiltro" type="submit" class="btn btn-outline-primary">Aplicar Filtro</button>
                            <button type="submit" class="btn btn-outline-danger" onclick="refresh()">Quitar Filtro</button>
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
                <div class="row">
                    <div id="tablaEmprendedoresSinLineaBaseContenedor" class="table-responsive">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>