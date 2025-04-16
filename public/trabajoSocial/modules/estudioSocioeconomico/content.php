
<div class="card shadow-sm border-1">
    <div class="card-header bg-white">
        <h4 class="card-title ">Estudio Socioeconomico</h4>
        <p class="card-subtitle mb-3">Listado de emprendedores con Línea Base</p>
        <form id="filterForm">
            <label for="etapasFilter" class="mb-0 me-2">Filtrar por etapas:</label>
            <div class="input-group" id="selector">
                <button id="botonAplicarFiltro" type="submit" class="btn btn-outline-primary">Aplicar Filtro</button>
                <button type="submit" class="btn btn-outline-danger" onclick="refresh()">Quitar Filtro</button>
            </div>
        </form>
    </div>
    <div class="card-body">
        <div id="tablaEmprendedoresContenedor" class="table-responsive">
        </div>
    </div>
</div>

