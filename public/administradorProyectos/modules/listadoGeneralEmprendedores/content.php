<div class="card shadow-sm border-0">
    <div class="card-header bg-white">
        <!-- Título de la tarjeta -->
        <h4 class="card-title mb-3">Lista de Emprendedores Registrados</h4>
        <form id="filterForm">
            <label for="etapasFilter" class="mb-0 me-2">Filtrar por etapas:</label>
            <div class="input-group" id="selector">
                <button id="botonAplicarFiltro" type="submit" class="btn btn-outline-primary">Aplicar Filtro</button>
            </div>
        </form>
    </div>
    <div class="card-body">
        <div class="table-responsive" id="container">
            <!-- Aquí se generará la tabla de emprendedores dinámicamente -->
        </div>
    </div>
</div>
