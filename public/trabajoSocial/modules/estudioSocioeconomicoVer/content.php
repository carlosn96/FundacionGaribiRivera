<div id="content">
    <div class="card">
        <ul class="nav nav-pills user-profile-tab" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
                <button
                    class="nav-link position-relative rounded-0 active d-flex align-items-center justify-content-center bg-transparent fs-3 py-3"
                    id="pills-resumen-tab" data-bs-toggle="pill" data-bs-target="#pills-resumen" type="button"
                    role="tab" aria-controls="pills-resumen" aria-selected="true">
                    <i class="ti ti-user-circle me-2 fs-6"></i>
                    <span class="d-none d-md-block">Resumen</span>
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button
                    class="nav-link position-relative rounded-0  d-flex align-items-center justify-content-center bg-transparent fs-3 py-3"
                    id="pills-fotos-tab" data-bs-toggle="pill" data-bs-target="#pills-fotos" type="button"
                    role="tab" aria-controls="pills-fotos" aria-selected="true">
                    <i class="ti ti-user-circle me-2 fs-6"></i>
                    <span class="d-none d-md-block">Fotografías de la visita</span>
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button
                    class="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-3"
                    id="pills-notifications-tab" data-bs-toggle="pill" data-bs-target="#pills-notifications"
                    type="button" role="tab" aria-controls="pills-notifications" aria-selected="false" tabindex="-1">
                    <i class="ti ti-briefcase me-2 fs-6"></i>
                    <span class="d-none d-md-block">Empleabilidad</span>
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button
                    class="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-3"
                    id="pills-bills-tab" data-bs-toggle="pill" data-bs-target="#pills-bills" type="button" role="tab"
                    aria-controls="pills-bills" aria-selected="false" tabindex="-1">
                    <i class="ti ti-friends me-2 fs-6"></i>
                    <span class="d-none d-md-block">Familiares</span>
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button
                    class="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-3"
                    id="pills-security-tab" data-bs-toggle="pill" data-bs-target="#pills-security" type="button"
                    role="tab" aria-controls="pills-security" aria-selected="false" tabindex="-1">
                    <i class="ti ti-coin me-2 fs-6"></i>
                    <span class="d-none d-md-block">Economia</span>
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button
                    class="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-3"
                    id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab"
                    aria-controls="pills-home" aria-selected="false" tabindex="-1">
                    <i class="ti ti-home me-2 fs-6"></i>
                    <span class="d-none d-md-block">vivienda</span>
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button
                    class="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-3"
                    id="pills-referencias-tab" data-bs-toggle="pill" data-bs-target="#pills-referencias" type="button"
                    role="tab" aria-controls="pills-referencias" aria-selected="false" tabindex="-1">
                    <i class="ti ti-users-group me-2 fs-6"></i>
                    <span class="d-none d-md-block">Referencias</span>
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button
                    class="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-3"
                    id="pills-vulnerabilidad-tab" data-bs-toggle="pill" data-bs-target="#pills-vulnerabilidad"
                    type="button" role="tab" aria-controls="pills-vulnerabilidad" aria-selected="false" tabindex="-1">
                    <i class="ti ti-info-triangle me-2 fs-6"></i>
                    <span class="d-none d-md-block">Vulnerabilidades</span>
                </button>
            </li>
        </ul>

        <div class="card-body">
            <div class="tab-content">
                <!-- TAB: Resumen -->
                <div class="tab-pane fade show active" id="pills-resumen" role="tabpanel"
                    aria-labelledby="pills-resumen-tab" tabindex="0">
                    <div class="row justify-content-center">
                        <div class="col-12 col-md-10 col-lg-12">
                            <div class="card border shadow-none">
                                <div class="card-body p-3 p-md-4">
                                    <!-- Información del emprendedor -->
                                    <div class="d-flex flex-column flex-sm-row align-items-center gap-3 mb-4">
                                        <img src="" alt="Foto de perfil" class="rounded-circle shadow-sm" width="60"
                                            height="60" id="emprendedorProfilePicture">
                                        <div class="text-center text-sm-start">
                                            <h6 class="mb-0 fw-semibold" id="emprendedorNombre"></h6>
                                            <small class="text-muted">Emprendedor</small>
                                        </div>
                                    </div>

                                    <!-- Resultado de la visita -->
                                    <div class="mb-4">
                                        <div
                                            class="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
                                            <h5 class="mb-0 fw-semibold text-center text-md-start">Resultado de la
                                                visita</h5>
                                            <span class="badge bg-warning text-white fs-6 px-3 py-2"
                                                id="resultadoVisita"></span>
                                        </div>
                                    </div>

                                    <!-- Observaciones -->
                                    <div class="mb-4 position-relative">
                                        <label for="observaciones" class="form-label fw-semibold">Observaciones</label>
                                        <textarea class="form-control" rows="10" id="observaciones"
                                            placeholder="Aquí puedes agregar tus observaciones..."></textarea>

                                        <!-- Botones -->
                                        <div class="d-flex gap-2 position-absolute end-0 mt-2" style="bottom: -45px;">
                                            <button type="button" class="btn btn-outline-success btn-sm"
                                                id="btnActualizarObservaciones">
                                                <i class="ti ti-refresh me-1"></i>Actualizar
                                            </button>
                                            <button type="button" class="btn btn-outline-success btn-sm"
                                                id="btnMejorarObservaciones">
                                                <i class="ti ti-sparkles me-1"></i>Mejorar
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Actitudes de la persona -->
                                    <div class="mb-5">
                                        <h5 class="card-title mb-3 fw-semibold">
                                            <i class="ti ti-user-heart me-2"></i>Actitudes de la persona
                                        </h5>
                                        <ul class="list-group" id="actitudes"></ul>
                                    </div>

                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- TAB: Empleabilidad -->
                <div class="tab-pane fade" id="pills-notifications" role="tabpanel"
                    aria-labelledby="pills-notifications-tab" tabindex="0">
                    <div class="row justify-content-center">
                        <div id="empleabilidadContainer" class="container mt-5"></div>
                    </div>
                </div>

                <!-- TAB: Familiares -->
                <div class="tab-pane fade" id="pills-bills" role="tabpanel" aria-labelledby="pills-bills-tab"
                    tabindex="0">
                    <!-- Tabla de familiares -->
                    <div class="row justify-content-center">
                        <div class="col-12">
                            <div class="card border-0 shadow-sm">
                                <div class="card-body p-0">
                                    <div class="card-header bg-light border-bottom-0 py-3">
                                        <div class="row align-items-center">
                                            <div class="col-md-8">
                                                <h5 class="mb-0">
                                                    <i class="ti ti-users text-primary me-2"></i>
                                                    Composición familiar (Dependientes económicos)
                                                    <span class="badge bg-primary ms-2" id="totalCount">3</span>
                                                </h5>
                                            </div>
                                            <div class="col-md-4 text-md-end">
                                                <small class="text-muted d-block">
                                                    <i class="ti ti-currency-dollar me-1"></i>
                                                    Total de Ingresos: <span class="fw-bold text-success"
                                                        id="totalIncome"></span>
                                                </small>
                                                <small class="text-muted d-block">
                                                    Fijo: <span class="fw-bold" id="totalFixedIncome"></span> •
                                                    Variable: <span class="fw-bold" id="totalVariableIncome"></span>
                                                </small>
                                                <small class="text-muted d-block">
                                                    Promedio por integrante: <span class="fw-bold"
                                                        id="averageIncomePerMember"></span>
                                                </small>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="table-responsive">
                                        <table class="table table-hover mb-0" id="familiaresTable">
                                            <thead class="table-light">
                                                <tr>
                                                    <th scope="col" class="border-0 ps-4">
                                                        <button
                                                            class="btn btn-sm btn-link p-0 text-decoration-none text-dark fw-semibold"
                                                            onclick="sortTable(0)">
                                                            <i class="ti ti-user me-1"></i>Familiar
                                                            <i class="ti ti-chevron-up-down ms-1"></i>
                                                        </button>
                                                    </th>
                                                    <th scope="col" class="border-0 text-center">
                                                        <button
                                                            class="btn btn-sm btn-link p-0 text-decoration-none text-dark fw-semibold"
                                                            onclick="sortTable(1)">
                                                            <i class="ti ti-calendar me-1"></i>Edad
                                                            <i class="ti ti-chevron-up-down ms-1"></i>
                                                        </button>
                                                    </th>
                                                    <th scope="col" class="border-0">
                                                        <button
                                                            class="btn btn-sm btn-link p-0 text-decoration-none text-dark fw-semibold"
                                                            onclick="sortTable(2)">
                                                            <i class="ti ti-home me-1"></i>Parentesco
                                                            <i class="ti ti-chevron-up-down ms-1"></i>
                                                        </button>
                                                    </th>
                                                    <th scope="col" class="border-0 d-none d-md-table-cell">
                                                        <i class="ti ti-heart me-1"></i>Estado Civil
                                                    </th>
                                                    <th scope="col" class="border-0 d-none d-lg-table-cell">
                                                        <i class="ti ti-book me-1"></i>Escolaridad
                                                    </th>
                                                    <th scope="col" class="border-0 d-none d-lg-table-cell">
                                                        <i class="ti ti-briefcase me-1"></i>Ocupación
                                                    </th>
                                                    <th scope="col" class="border-0 text-end">
                                                        <button
                                                            class="btn btn-sm btn-link p-0 text-decoration-none text-dark fw-semibold"
                                                            onclick="sortTable(6)">
                                                            <i class="ti ti-currency-dollar me-1"></i>Ingresos
                                                            <i class="ti ti-chevron-up-down ms-1"></i>
                                                        </button>
                                                    </th>
                                                    <th scope="col" class="border-0 text-center pe-4">
                                                        <i class="ti ti-settings me-1"></i>Acciones
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody id="familiaresTableBody"></tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Paginación -->
                    <div class="row mt-4">
                        <div class="col-12">
                            <nav aria-label="Paginación de familiares">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="text-muted">
                                        <small>Mostrando 1-3 de 3 familiares</small>
                                    </div>
                                    <ul class="pagination mb-0">
                                        <li class="page-item disabled">
                                            <a class="page-link" href="#" tabindex="-1">
                                                <i class="ti ti-chevron-left"></i>
                                            </a>
                                        </li>
                                        <li class="page-item active">
                                            <a class="page-link" href="#">1</a>
                                        </li>
                                        <li class="page-item disabled">
                                            <a class="page-link" href="#">
                                                <i class="ti ti-chevron-right"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>

                    <div class="mt-4 p-3 border rounded bg-white shadow-sm" id="vulnerabilidadSeccion">
                        <h6 class="mb-3 fw-bold">Evaluación de Vulnerabilidad</h6>
                        <div class="row">
                            <div class="col-md-6">
                                <p class="mb-1 fw-semibold">¿Vulnerable por ingresos?</p>
                                <span id="esVulnerable" class="badge bg-secondary">Sin calcular</span>
                            </div>
                            <div class="col-md-6">
                                <p class="mb-1 fw-semibold">¿En pobreza extrema por ingresos?</p>
                                <span id="esPobrezaExtrema" class="badge bg-secondary">Sin calcular</span>
                            </div>
                        </div>
                    </div>

                    <div class="mt-4 p-4 border rounded bg-light shadow-sm">
                        <h5 class="mb-3 fw-bold">
                            CONEVAL
                            <small class="text-muted d-block fw-normal fs-6">
                                Información de referencia para determinar pobreza por ingresos
                            </small>
                        </h5>

                        <!-- Fecha de referencia -->
                        <div class="mb-4">
                            <label for="fechaMuestra" class="form-label fw-semibold">Fecha de referencia</label>
                            <div class="input-group">
                                <input type="text" id="fechaMuestra" name="fechaMuestra"
                                    class="form-control form-control-sm" placeholder="dd/mm/yyyy">
                                <span class="input-group-text">
                                    <i class="fas fa-calendar-alt"></i>
                                </span>
                            </div>
                        </div>

                        <!-- Montos CONEVAL -->
                        <div class="row gy-3">
                            <div class="col-md-6">
                                <label for="montoVulnerableIngreso" class="form-label fw-semibold">Vulnerable por
                                    ingresos</label>
                                <div class="input-group input-group-sm">
                                    <span class="input-group-text bg-white text-muted">MXN</span>
                                    <input type="text" id="montoVulnerableIngreso" name="montoVulnerableIngreso"
                                        class="form-control" placeholder="Monto" readonly>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="montoPobrezaExtrema" class="form-label fw-semibold">Pobreza extrema por
                                    ingresos</label>
                                <div class="input-group input-group-sm">
                                    <span class="input-group-text bg-white text-muted">MXN</span>
                                    <input type="text" id="montoPobrezaExtrema" name="montoPobrezaExtrema"
                                        class="form-control" placeholder="Monto" readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- TAB: Economía -->
                <div class="tab-pane fade" id="pills-security" role="tabpanel" aria-labelledby="pills-security-tab"
                    tabindex="0">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card border shadow-none">
                                <div class="card-body p-4">
                                    <h4 class="card-title mb-4">Economía</h4>
                                    <div class="mb-4">
                                        <p class="card-subtitle text-muted fw-semibold border-bottom pb-2">Rango de
                                            ingresos familiares (información de la línea base)</p>
                                        <div class="border p-2 rounded" id="ingresoMensual"></div>
                                    </div>
                                    <div class="mb-3">
                                        <p class="card-subtitle text-muted fw-semibold border-bottom pb-2">Relación de
                                            gastos por categoría</p>
                                        <div class="col">
                                            <small class="text-muted d-block">
                                                <i class="ti ti-currency-dollar me-1"></i>
                                                Total de Gastos: <span class="fw-bold text-success"
                                                    id="totalExpenditures"></span>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div class="row row-cols-1 row-cols-md-3 g-3" id="economia"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- TAB: Vivienda -->
                <div class="tab-pane fade" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">

                    <div class="row mb-3">
                        <div class="col-12">
                            <div class="card  border shadow-none ">
                                <div class="card-body py-3">
                                    <div class="row align-items-center">
                                        <div class="col-8">
                                            <h6 class="mb-1 fw-bold">
                                                <i class="ti ti-house-door me-2"></i>
                                                Tipo de vivienda:
                                                <span id="tipoVivienda">-</span>
                                            </h6>
                                            <small class="opacity-75">
                                                Condición:
                                                <span id="condicionVivienda">-</span> • 
                                                Uso:
                                                <span id="usoVivienda">-</span> • 
                                                Familias que habitan:
                                                <span id="familiasVivienda">-</span> familia(s)
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Grid compacto de información principal -->
                    <div class="row g-2 mb-3">
                        <!-- Construcción -->
                        <div class="col-12 col-lg-6">
                            <div class="card border shadow-none h-100">
                                <div class="card-header  py-2">
                                    <h6 class="mb-0 text-primary">
                                        <i class="ti ti-tools me-2"></i>Construcción
                                    </h6>
                                </div>
                                <div class="card-body p-3">
                                    <div class="row g-2">
                                        <div class="col-4">
                                            <div class="text-center">
                                                <i class="ti ti-wall text-muted d-block mb-1" style="font-size: 1.5rem;"></i>
                                                <small class="text-muted d-block mb-1">Paredes</small>
                                                <div id="paredesContainer" class="small">
                                                    <!-- Materiales de paredes -->
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="text-center">
                                                <i class="ti ti-home-up text-muted d-block mb-1" style="font-size: 1.5rem;"></i>
                                                <small class="text-muted d-block mb-1">Techo</small>
                                                <div id="techoContainer" class="small">
                                                    <!-- Materiales de techo -->
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="text-center">
                                                <i class="ti ti-home-down text-muted d-block mb-1" style="font-size: 1.5rem;"></i>
                                                <small class="text-muted d-block mb-1">Piso</small>
                                                <div id="pisoContainer" class="small">
                                                    <!-- Material de piso -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Distribución -->
                        <div class="col-12 col-lg-6">
                            <div class="card border shadow-none h-100">
                                <div class="card-header py-2 d-flex justify-content-between align-items-center">
                                    <h6 class="mb-0 text-primary">
                                        <i class="ti ti-grid-3x3 me-2"></i>Espacios
                                    </h6>
                                </div>
                                <div class="card-body p-3">
                                    <div id="distribucionContainer" class="row g-2">
                                        <!-- Espacios se cargarán aquí -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Segunda fila de información -->
                    <div class="row g-2 mb-3">
                        <!-- Servicios -->
                        <div class="col-12 col-lg-6">
                            <div class="card border-0 shadow-sm h-100">
                                <div class="card-header bg-light border-0 py-2">
                                    <h6 class="mb-0 text-primary">
                                        <i class="ti ti-gear me-2"></i>Servicios
                                    </h6>
                                </div>
                                <div class="card-body p-3">
                                    <div id="serviciosContainer" class="row g-2">
                                        <!-- Servicios se cargarán aquí -->
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Otros Bienes -->
                        <div class="col-12 col-lg-6">
                            <div class="card border-0 shadow-sm h-100">
                                <div class="card-header bg-light border-0 py-2">
                                    <h6 class="mb-0 text-primary">
                                        <i class="ti ti-car-front me-2"></i>Otros Bienes
                                    </h6>
                                </div>
                                <div class="card-body p-3">
                                    <div id="otrosBienesContainer">
                                        <div class="row g-2">
                                            <div class="col-6">
                                                <div class="card bg-light border-0">
                                                    <div class="card-body p-2 text-center">
                                                        <i class="ti ti-car-front text-primary mb-1" style="font-size: 1.5rem;"></i>
                                                        <small class="d-block mb-2 fw-bold">Vehículos</small>
                                                        <button class="btn btn-outline-primary btn-sm py-1 px-2">
                                                            <i class="ti ti-plus" style="font-size: 0.8rem;"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="card bg-light border-0">
                                                    <div class="card-body p-2 text-center">
                                                        <i class="ti ti-box text-primary mb-1" style="font-size: 1.5rem;"></i>
                                                        <small class="d-block mb-2 fw-bold">Otros</small>
                                                        <button class="btn btn-outline-primary btn-sm py-1 px-2">
                                                            <i class="ti ti-plus" style="font-size: 0.8rem;"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- TAB: Referencias -->
                <div class="tab-pane fade" id="pills-referencias" role="tabpanel"
                    aria-labelledby="pills-referencias-tab" tabindex="0">
                    <div class="row justify-content-center">
                        <div id="referenciasContainer" class="container mt-5"></div>
                    </div>
                </div>

                <!-- TAB: Vulnerabilidades -->
                <div class="tab-pane fade" id="pills-vulnerabilidad" role="tabpanel"
                    aria-labelledby="pills-vulnerabilidad-tab" tabindex="0">
                    <div class="row justify-content-center">
                        <div class="col-12 col-md-10 col-lg-12">
                            <div class="card border shadow-none">
                                <div class="card-body p-3 p-md-4" id="vulnerabilidadesContainer">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- TAB: Fotos -->
                <div class="tab-pane fade" id="pills-fotos" role="tabpanel" aria-labelledby="pills-fotos-tab" tabindex="0">
                    <div class="row justify-content-center">
                        <div class="col-lg-10">
                            <!-- Header Section -->
                            <div class="border-start border-warning border-4 ps-4 mb-4">
                                <div class="d-flex justify-content-between align-items-center flex-wrap">
                                    <span class="badge bg-warning fs-6 px-3 py-2">
                                        <i class="ti ti-photo me-1"></i>
                                        <span id="photoCount">0</span>
                                    </span>
                                </div>
                            </div>

                            <!-- Carrusel de fotos guardadas -->
                            <div id="carouselSection" style="display: none;" class="mb-4">
                                <div id="photoCarousel" class="carousel slide" data-bs-ride="carousel">
                                    <div class="carousel-inner" id="carouselItems"></div>
                                    <div class="carousel-indicators" id="carouselIndicators"></div>

                                    <button class="carousel-control-prev" type="button" data-bs-target="#photoCarousel"
                                        data-bs-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Anterior</span>
                                    </button>
                                    <button class="carousel-control-next" type="button" data-bs-target="#photoCarousel"
                                        data-bs-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Siguiente</span>
                                    </button>
                                </div>

                                <!-- Botones editar/eliminar foto activa -->
                                <div class="d-flex justify-content-center mt-3 gap-2" id="carouselEditBtnContainer" style="display: none;">
                                    <button disabled class="btn btn-sm btn-outline-primary" id="btnEditarFoto">
                                        <i class="ti ti-pencil me-1"></i>Cambiar foto
                                    </button>
                                    <button class="btn btn-sm btn-outline-danger" id="btnEliminarFoto">
                                        <i class="ti ti-trash me-1"></i>Eliminar foto
                                    </button>
                                </div>
                            </div>

                            <!-- Empty State -->
                            <div class="text-center py-5 text-muted" id="emptyState">
                                <i class="ti ti-camera display-1 opacity-25"></i>
                                <h5 class="mt-3">No hay fotografías</h5>
                                <p class="mb-0">Comienza agregando algunas imágenes de tu visita</p>
                            </div>

                            <!-- Accordion para Agregar nuevas fotografías -->
                            <div class="accordion mb-4" id="uploadAccordion">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingUpload">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseUpload" aria-expanded="false" aria-controls="collapseUpload">
                                            <i class="ti ti-circle-plus me-2"></i>Agregar nuevas fotografías
                                        </button>
                                    </h2>
                                    <div id="collapseUpload" class="accordion-collapse collapse" aria-labelledby="headingUpload" data-bs-parent="#uploadAccordion">
                                        <div class="accordion-body">
                                            <div class="border border-2 border-dashed rounded-3 p-4 text-center bg-light" id="uploadZone">
                                                <i class="ti ti-cloud-upload display-4 text-primary mb-3"></i>
                                                <h6 class="fw-semibold mb-2">Arrastra y suelta tus fotos aquí</h6>
                                                <p class="text-muted mb-3">o haz clic para seleccionar archivos</p>
                                                <button type="button" class="btn btn-outline-primary" id="selectFilesBtn">
                                                    <i class="ti ti-folder-open me-2"></i>Seleccionar fotos
                                                </button>
                                                <input type="file" id="inputAgregarFotos" class="d-none" accept=".jpg,.jpeg,.png,.webp" multiple>
                                            </div>
                                            <div class="mt-3">
                                                <small class="text-muted">
                                                    <i class="ti ti-info-circle me-1"></i>
                                                    Formatos soportados: JPG, JPEG, PNG, WebP (máx. 5MB por archivo)
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Preview Section -->
                            <div class="card shadow-sm mb-4" id="previewSection" style="display: none;">
                                <div class="card-header bg-light">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h6 class="fw-semibold mb-0">
                                            <i class="ti ti-eye me-2"></i>Vista previa
                                        </h6>
                                        <button class="btn btn-outline-danger btn-sm" id="clearAllBtn">
                                            <i class="ti ti-trash me-1"></i>Limpiar todo
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div id="previewFotos"
                                        class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-3"></div>
                                </div>
                            </div>

                            <!-- Action Buttons -->
                            <div class="d-flex gap-2 justify-content-end flex-wrap mb-4">
                                <button id="btnCancelar" class="btn btn-outline-success" style="display: none;">
                                    <i class="ti ti-x me-2"></i>Cancelar
                                </button>
                                <button id="btnGuardarFotos" class="btn btn-primary" disabled>
                                    <i class="ti ti-cloud-upload me-2"></i>
                                    <span id="btnText">Guardar fotografías</span>
                                    <span class="spinner-border spinner-border-sm ms-2 d-none" id="btnSpinner" role="status">
                                        <span class="visually-hidden">Cargando...</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> <!-- Cierre de tab-content -->
        </div> <!-- Cierre de card-body -->
    </div> <!-- Cierre de card -->
</div> <!-- Cierre de content -->

<!-- Modal: Mejorar Observaciones -->
<div class="modal fade" id="modalMejorarObservaciones" tabindex="-1" aria-labelledby="mejorarObservacionesLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">

            <!-- Header -->
            <div class="modal-header">
                <h5 class="modal-title" id="mejorarObservacionesLabel">
                    <i class="ti ti-sparkles me-2"></i>Mejorar Observaciones
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>

            <!-- Body -->
            <div class="modal-body">

                <!-- Texto Original -->
                <div class="mb-4">
                    <label for="observacionesOriginal" class="form-label fw-semibold">Texto original</label>
                    <textarea class="form-control" id="observacionesOriginal" rows="6" readonly></textarea>
                </div>

                <!-- Selector de modelo + botón de mejorar -->
                <div class="mb-3 row align-items-center">
                    <div class="col-md-6">
                        <label for="modeloIA" class="form-label fw-semibold">Seleccionar modelo de mejora:</label>
                        <select class="form-select" id="modeloIA">
                            <option value="gpt-4" selected>GPT-4 (alta calidad)</option>
                            <option value="gpt-3.5">GPT-3.5 (más rápido)</option>
                            <option value="claude">Claude (alternativa)</option>
                        </select>
                    </div>
                    <div class="col-md-6 mt-3 mt-md-4 text-md-end">
                        <button type="button" class="btn btn-outline-success" id="btnMejorarTextoIA">
                            <i class="ti ti-sparkles me-1"></i>Mejorar texto
                        </button>
                    </div>
                </div>

                <!-- Texto Mejorado -->
                <div>
                    <label for="observacionesMejoradas" class="form-label fw-semibold">Texto mejorado</label>
                    <textarea class="form-control bg-light" id="observacionesMejoradas" rows="6" readonly></textarea>
                </div>

            </div>

            <!-- Footer -->
            <div class="modal-footer d-flex justify-content-between flex-column flex-md-row">
                <div class="text-muted small">El texto mejorado es generado automáticamente por IA. Verifica antes de
                    usar.</div>
                <div class="d-flex gap-2">
                    <button type="button" class="btn btn-outline-primary" id="btnUsarTextoMejorado">
                        <i class="ti ti-check me-1"></i>Usar texto mejorado
                    </button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                </div>
            </div>

        </div>
    </div>
</div>

<!-- Modal para vista detallada de familiares en móvil -->
<div class="modal fade" id="memberDetailModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">
                    <i class="ti ti-user me-2"></i>Detalles del Familiar
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body" id="memberDetailContent">
                <!-- Contenido dinámico -->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" onclick="editMemberFromModal()">
                    <i class="ti ti-edit me-1"></i>Editar
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Modal: Editar Familiar -->
<div class="modal fade" id="modalEditarFamiliar" tabindex="-1" aria-labelledby="modalEditarFamiliarLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form id="formEditarFamiliar" novalidate>
                <div class="modal-header">
                    <h5 class="modal-title" id="modalEditarFamiliarLabel">Editar Información del Familiar</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>

                <div class="modal-body">
                    <input type="hidden" id="editIdFamiliar" name="idFamiliar">

                    <!-- Información Personal -->
                    <div class="row mb-4">
                        <div class="col-12">
                            <h6 class="text-primary border-bottom pb-2 mb-3">Información Personal</h6>
                        </div>
                        <div class="col-md-8 mb-3">
                            <label for="editNombre" class="form-label fw-semibold">Nombre completo</label>
                            <input type="text" class="form-control" id="editNombre" name="nombre" required>
                            <div class="invalid-feedback">
                                Por favor ingrese el nombre completo.
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="editEdad" class="form-label fw-semibold">Edad</label>
                            <input type="number" class="form-control" id="editEdad" name="edad" min="0" max="120"
                                required>
                            <div class="invalid-feedback">
                                Por favor ingrese una edad válida.
                            </div>
                        </div>
                    </div>

                    <!-- Relación Familiar -->
                    <div class="row mb-4">
                        <div class="col-12">
                            <h6 class="text-primary border-bottom pb-2 mb-3">Relación Familiar</h6>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="editParentesco" class="form-label fw-semibold">Parentesco</label>
                            <select class="form-select" id="editParentesco" name="parentesco" required>
                                <option value="">Seleccione el parentesco</option>
                                <option value="Padre">Padre</option>
                                <option value="Madre">Madre</option>
                                <option value="Hijo/a">Hijo/a</option>
                                <option value="Hermano/a">Hermano/a</option>
                                <option value="Abuelo/a">Abuelo/a</option>
                                <option value="Tío/a">Tío/a</option>
                                <option value="Primo/a">Primo/a</option>
                                <option value="Cónyuge">Cónyuge</option>
                                <option value="Otro">Otro</option>
                            </select>
                            <div class="invalid-feedback">
                                Por favor seleccione el parentesco.
                            </div>
                        </div>
                    </div>

                    <!-- Información Económica -->
                    <div class="row mb-3">
                        <div class="col-12">
                            <h6 class="text-primary border-bottom pb-2 mb-3">Información Económica</h6>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="editIngresoFijo" class="form-label fw-semibold">Ingreso Mensual Fijo</label>
                            <div class="input-group">
                                <span class="input-group-text">$</span>
                                <input type="number" class="form-control" id="editIngresoFijo" name="ingresoFijo"
                                    step="0.01" min="0" required>
                                <div class="invalid-feedback">
                                    Por favor ingrese un monto válido.
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="editIngresoVariable" class="form-label fw-semibold">Ingreso Variable</label>
                            <div class="input-group">
                                <span class="input-group-text">$</span>
                                <input type="number" class="form-control" id="editIngresoVariable"
                                    name="ingresoVariable" step="0.01" min="0" required>
                                <div class="invalid-feedback">
                                    Por favor ingrese un monto válido.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <i class="fas fa-times me-2"></i>Cancelar
                    </button>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save me-2"></i>Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Toast para mensajes -->
<div class="toast-container position-fixed top-0 end-0 p-3">
    <div id="toastMessage" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <i id="toastIcon" class="ti ti-check-circle text-success"></i>
            <strong class="me-auto ms-2" id="toastTitle">Éxito</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body" id="toastBody">
            Operación completada exitosamente
        </div>
    </div>
</div>
