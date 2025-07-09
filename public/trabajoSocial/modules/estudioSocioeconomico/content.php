<div class="card shadow-sm border-1">
    <div class="card-header bg-white">
        <h4 class="card-title mb-1">Estudio Socioeconómico</h4>
        <p class="card-subtitle mb-3">Listado de emprendedores con Línea Base</p>

        <form id="filterForm" class="mb-3">
            <div class="row g-3 align-items-center">
                <div class="col-12 col-md-auto">
                    <label for="etapasFilter" class="form-label mb-0 me-2">Filtrar por etapas:</label>
                </div>
                <div class="col-12 col-md">
                    <div class="input-group" id="selector">
                        <!-- Selector dinámico aquí -->
                        <!-- Botones dentro del input-group -->
                        <button id="botonAplicarFiltro" type="submit" class="btn btn-outline-primary">Aplicar Filtro</button>
                        <button type="button" class="btn btn-outline-danger" onclick="refresh()">Quitar Filtro</button>
                    </div>
                </div>
            </div>
            <div class="row g-3 align-items-center mt-3">
                <div class="col-12 col-md-auto">
                    <label class="form-label mb-0 me-2" for="estudioFiltro">Filtrar por estudio socioeconómico completo:</label>
                </div>
                <div class="col-12 col-md">
                    <div class="btn-group w-100" role="group" aria-label="Filtro de estudio">
                        <input type="radio" class="btn-check" name="filtroEstudio" id="conEstudio" value="con" autocomplete="off">
                        <label class="btn btn-outline-primary" for="conEstudio">Con estudio</label>
                        <input type="radio" class="btn-check" name="filtroEstudio" id="sinEstudio" value="sin" autocomplete="off">
                        <label class="btn btn-outline-primary" for="sinEstudio">Sin estudio</label>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div class="card-body">
        <div id="tablaEmprendedoresContenedor" class="table-responsive"></div>
    </div>
</div>