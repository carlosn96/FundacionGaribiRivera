<!-- Dashboard de Estadísticas - Línea Base -->
<div class="container-fluid px-3 px-md-4 py-4">
    <!-- Header con estadísticas resumidas -->
    <div class="row mb-4">
        <div class="col-12">
            <div
                class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
                <div>
                    <h2 class="h3 fw-bold text-dark mb-2">Dashboard de Línea Base</h2>
                    <p class="text-muted mb-0 fs-6">Análisis del seguimiento a emprendedores</p>
                </div>
                <div class="text-start text-md-end">
                    <small class="text-muted d-block mb-1">Última actualización</small>
                    <span class="badge bg-primary fs-6" id="lastUpdate"></span>
                </div>
            </div>
        </div>
    </div>

    <!-- Filtros -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="card shadow-sm border-0">
                <div class="card-header bg-light border-0 py-3">
                    <h5 class="mb-0 fw-bold text-dark">
                        <i class="fas fa-sliders-h me-2 text-primary"></i>Filtros de Búsqueda
                    </h5>
                </div>
                <div class="card-body">
                    <form id="filtrosEstadisticasForm">
                        <!-- Tabs para cambiar entre los filtros -->
                        <ul class="nav nav-pills nav-fill mb-4" id="filterTabs" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="fecha-tab" data-bs-toggle="tab"
                                    data-bs-target="#filtro-fecha" type="button" role="tab" aria-controls="filtro-fecha"
                                    aria-selected="true">
                                    <i class="fas fa-calendar-alt me-2"></i>Por Fecha
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="etapa-tab" data-bs-toggle="tab"
                                    data-bs-target="#filtro-etapa" type="button" role="tab" aria-controls="filtro-etapa"
                                    aria-selected="false">
                                    <i class="fas fa-layer-group me-2"></i>Por Etapa
                                </button>
                            </li>
                        </ul>

                        <div class="tab-content" id="filterTabsContent">
                            <!-- Filtro por Fecha -->
                            <div class="tab-pane fade show active" id="filtro-fecha" role="tabpanel"
                                aria-labelledby="fecha-tab">
                                <div class="row g-3 align-items-end">
                                    <div class="col-12">
                                        <label class="form-label fw-semibold text-dark mb-2">
                                            <i class="fas fa-calendar-week me-2 text-primary"></i>Rango de Fechas
                                        </label>
                                        <div class="input-daterange input-group" id="date-range">
                                            <input type="text" class="form-control form-control-lg" name="fechaInicio"
                                                placeholder="Fecha inicio" readonly>
                                            <span class="input-group-text bg-primary border-primary text-white px-3">
                                                <i class="fas fa-arrows-alt-h"></i>
                                            </span>
                                            <input type="text" class="form-control form-control-lg" name="fechaFin"
                                                placeholder="Fecha fin" readonly>
                                        </div>
                                        <small class="form-text text-muted mt-2 d-block">
                                            <i class="fas fa-info-circle me-1"></i>Seleccione el rango de fechas para
                                            filtrar los resultados
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <!-- Filtro por Etapa -->
                            <div class="tab-pane fade" id="filtro-etapa" role="tabpanel" aria-labelledby="etapa-tab">
                                <div class="row g-3 align-items-end">
                                    <div class="col-12 col-md-8 col-lg-6">
                                        <label for="etapa" class="form-label fw-semibold text-dark mb-2">
                                            <i class="fas fa-tasks me-2 text-success"></i>Seleccionar Etapa
                                        </label>
                                        <select class="form-select form-select-lg" id="etapa" name="etapa">
                                            <option value="" selected>Todas las etapas</option>
                                            <!-- Opciones dinámicas se agregarán aquí -->
                                        </select>
                                        <small class="form-text text-muted mt-2 d-block">
                                            <i class="fas fa-info-circle me-1"></i>Filtre los emprendedores por su etapa
                                            actual
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Botones compartidos para ambos filtros -->
                        <div class="d-flex flex-column flex-sm-row justify-content-end gap-2 mt-4 pt-3 border-top">
                            <button type="button" id="limpiarFiltros" class="btn btn-outline-secondary">
                                <i class="fas fa-eraser me-2"></i>Limpiar Filtro
                            </button>
                            <button type="submit" class="btn btn-primary px-4">
                                <i class="fas fa-search me-2"></i>Aplicar Filtro
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Cards de resumen -->
    <div class="row g-3 g-md-4 mb-4" id="summaryCards">
        <!-- Tarjeta de Emprendedores -->
        <div class="col-12 col-sm-6 col-lg-4">
            <div class="card border-0 border-start border-primary border-4 shadow-sm h-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <div class="text-uppercase fw-bold text-primary small mb-2">Emprendedores</div>
                            <div class="h3 fw-bold text-dark mb-0" id="totalEmprendedores">0</div>
                        </div>
                        <div class="bg-primary bg-opacity-10 rounded-circle p-3">
                            <i class="fas fa-users fa-2x text-primary"></i>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-light border-0 text-end py-2">
                    <button class="btn btn-sm btn-outline-primary view-details-summary-btn" data-categoria="emprendedores">
                        <i class="fas fa-eye me-1"></i> Ver detalles
                    </button>
                </div>
            </div>
        </div>

        <!-- Tarjeta de Capacitación -->
        <div class="col-12 col-sm-6 col-lg-4">
            <div class="card border-0 border-start border-success border-4 shadow-sm h-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <div class="text-uppercase fw-bold text-success small mb-2">Capacitación</div>
                            <div class="h3 fw-bold text-dark mb-0" id="totalCapacitacion">0</div>
                        </div>
                        <div class="bg-success bg-opacity-10 rounded-circle p-3">
                            <i class="fas fa-graduation-cap fa-2x text-success"></i>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-light border-0 text-end py-2">
                    <button class="btn btn-sm btn-outline-success view-details-summary-btn" data-categoria="capacitacion">
                        <i class="fas fa-eye me-1"></i> Ver detalles
                    </button>
                </div>
            </div>
        </div>

        <!-- Tarjeta de Créditos -->
        <div class="col-12 col-sm-6 col-lg-4">
            <div class="card border-0 border-start border-info border-4 shadow-sm h-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <div class="text-uppercase fw-bold text-info small mb-2">Créditos</div>
                            <div class="h3 fw-bold text-dark mb-0" id="totalCreditos">0</div>
                        </div>
                        <div class="bg-info bg-opacity-10 rounded-circle p-3">
                            <i class="fas fa-dollar-sign fa-2x text-info"></i>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-light border-0 text-end py-2">
                    <button class="btn btn-sm btn-outline-info view-details-summary-btn" data-categoria="creditos">
                        <i class="fas fa-eye me-1"></i> Ver detalles
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Gráficas principales -->
    <div class="row g-4">
        <!-- Medio de Conocimiento -->
        <div class="col-12 col-xl-6">
            <div class="card shadow-sm border-0 h-100">
                <div class="card-header bg-primary text-white border-0 py-3">
                    <div
                        class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
                        <div>
                            <h6 class="mb-1 fw-bold">
                                <i class="fas fa-bullhorn me-2"></i>¿Cómo te enteraste de la Fundación?
                            </h6>
                            <small class="opacity-75">Canales de difusión</small>
                        </div>
                        <div class="btn-group btn-group-sm" role="group" data-chart="chartMedioConocimiento">
                            <button type="button" class="btn btn-light" data-type="pie" title="Gráfico Circular">
                                <i class="fas fa-chart-pie"></i>
                            </button>
                            <button type="button" class="btn btn-outline-light" data-type="bar"
                                title="Gráfico de Barras">
                                <i class="fas fa-chart-bar"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="chart-wrapper">
                        <div id="chartMedioConocimiento"></div>
                    </div>
                    <div class="border-top mt-3 pt-3">
                        <div class="row text-center g-3">
                            <div class="col-6">
                                <small class="text-muted d-block mb-1">Más popular</small>
                                <div class="fw-bold text-truncate" id="statMedioTop" title="">-</div>
                            </div>
                            <div class="col-6">
                                <small class="text-muted d-block mb-1">Total respuestas</small>
                                <div class="fw-bold" id="statMedioTotal">0</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-light border-0">
                    <div class="d-flex gap-2 flex-wrap">
                        <button class="btn btn-sm btn-outline-primary download-btn flex-grow-1 flex-sm-grow-0"
                            data-chart="chartMedioConocimiento" data-title="Medio_de_Conocimiento">
                            <i class="fas fa-download me-1"></i>Exportar CSV
                        </button>
                        <button class="btn btn-sm btn-outline-secondary print-chart-btn flex-grow-1 flex-sm-grow-0"
                            data-chart="chartMedioConocimiento">
                            <i class="fas fa-print me-1"></i>Imprimir
                        </button>
                        <button class="btn btn-sm btn-outline-info view-details-btn flex-grow-1 flex-sm-grow-0"
                            data-chart="chartMedioConocimiento" data-title="¿Cómo te enteraste de la Fundación?">
                            <i class="fas fa-eye me-1"></i>Ver Detalles
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Razón Recurre -->
        <div class="col-12 col-xl-6">
            <div class="card shadow-sm border-0 h-100">
                <div class="card-header bg-success text-white border-0 py-3">
                    <div
                        class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
                        <div>
                            <h6 class="mb-1 fw-bold">
                                <i class="fas fa-question-circle me-2"></i>Recurres a la Fundación para:
                            </h6>
                            <small class="opacity-75">Motivación principal</small>
                        </div>
                        <div class="btn-group btn-group-sm" role="group" data-chart="chartRazonRecurre">
                            <button type="button" class="btn btn-outline-light" data-type="pie"
                                title="Gráfico Circular">
                                <i class="fas fa-chart-pie"></i>
                            </button>
                            <button type="button" class="btn btn-light" data-type="donut" title="Gráfico Dona">
                                <i class="fas fa-circle-notch"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="chart-wrapper">
                        <div id="chartRazonRecurre"></div>
                    </div>
                    <div class="border-top mt-3 pt-3">
                        <div class="row text-center g-3">
                            <div class="col-6">
                                <small class="text-muted d-block mb-1">Más solicitado</small>
                                <div class="fw-bold text-truncate" id="statRazonTop" title="">-</div>
                            </div>
                            <div class="col-6">
                                <small class="text-muted d-block mb-1">Total respuestas</small>
                                <div class="fw-bold" id="statRazonTotal">0</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-light border-0">
                    <div class="d-flex gap-2 flex-wrap">
                        <button class="btn btn-sm btn-outline-success download-btn flex-grow-1 flex-sm-grow-0"
                            data-chart="chartRazonRecurre" data-title="Razon_Recurre">
                            <i class="fas fa-download me-1"></i>Exportar CSV
                        </button>
                        <button class="btn btn-sm btn-outline-secondary print-chart-btn flex-grow-1 flex-sm-grow-0"
                            data-chart="chartRazonRecurre">
                            <i class="fas fa-print me-1"></i>Imprimir
                        </button>
                        <button class="btn btn-sm btn-outline-info view-details-btn flex-grow-1 flex-sm-grow-0"
                            data-chart="chartRazonRecurre" data-title="Recurres a la Fundación para:">
                            <i class="fas fa-eye me-1"></i>Ver Detalles
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Solicita Crédito -->
        <div class="col-12 col-xl-6">
            <div class="card shadow-sm border-0 h-100">
                <div class="card-header bg-info text-white border-0 py-3">
                    <div
                        class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
                        <div>
                            <h6 class="mb-1 fw-bold">
                                <i class="fas fa-hand-holding-usd me-2"></i>El crédito lo solicitarías para:
                            </h6>
                            <small class="opacity-75">Propósito del crédito</small>
                        </div>
                        <div class="btn-group btn-group-sm" role="group" data-chart="chartSolicitaCredito">
                            <button type="button" class="btn btn-light" data-type="bar" title="Gráfico de Barras">
                                <i class="fas fa-chart-bar"></i>
                            </button>
                            <button type="button" class="btn btn-outline-light" data-type="horizontalBar"
                                title="Barras Horizontales">
                                <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="chart-wrapper">
                        <div id="chartSolicitaCredito"></div>
                    </div>
                    <div class="border-top mt-3 pt-3">
                        <div class="row text-center g-3">
                            <div class="col-6">
                                <small class="text-muted d-block mb-1">Principal uso</small>
                                <div class="fw-bold text-truncate" id="statSolicitaTop" title="">-</div>
                            </div>
                            <div class="col-6">
                                <small class="text-muted d-block mb-1">Total respuestas</small>
                                <div class="fw-bold" id="statSolicitaTotal">0</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-light border-0">
                    <div class="d-flex gap-2 flex-wrap">
                        <button class="btn btn-sm btn-outline-info download-btn flex-grow-1 flex-sm-grow-0"
                            data-chart="chartSolicitaCredito" data-title="Solicita_Credito">
                            <i class="fas fa-download me-1"></i>Exportar CSV
                        </button>
                        <button class="btn btn-sm btn-outline-secondary print-chart-btn flex-grow-1 flex-sm-grow-0"
                            data-chart="chartSolicitaCredito">
                            <i class="fas fa-print me-1"></i>Imprimir
                        </button>
                        <button class="btn btn-sm btn-outline-info view-details-btn flex-grow-1 flex-sm-grow-0"
                            data-chart="chartSolicitaCredito" data-title="El crédito lo solicitarías para:">
                            <i class="fas fa-eye me-1"></i>Ver Detalles
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Utiliza Crédito -->
        <div class="col-12 col-xl-6">
            <div class="card shadow-sm border-0 h-100">
                <div class="card-header bg-warning text-white border-0 py-3">
                    <div
                        class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
                        <div>
                            <h6 class="mb-1 fw-bold">
                                <i class="fas fa-shopping-cart me-2"></i>El crédito lo utilizarías para:
                            </h6>
                            <small class="opacity-75">Destino de inversión</small>
                        </div>
                        <div class="btn-group btn-group-sm" role="group" data-chart="chartUtilizaCredito">
                            <button type="button" class="btn btn-light" data-type="bar" title="Gráfico de Barras">
                                <i class="fas fa-chart-bar"></i>
                            </button>
                            <button type="button" class="btn btn-outline-light" data-type="horizontalBar"
                                title="Barras Horizontales">
                                <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="chart-wrapper">
                        <div id="chartUtilizaCredito"></div>
                    </div>
                    <div class="border-top mt-3 pt-3">
                        <div class="row text-center g-3">
                            <div class="col-6">
                                <small class="text-muted d-block mb-1">Principal inversión</small>
                                <div class="fw-bold text-truncate" id="statUtilizaTop" title="">-</div>
                            </div>
                            <div class="col-6">
                                <small class="text-muted d-block mb-1">Total respuestas</small>
                                <div class="fw-bold" id="statUtilizaTotal">0</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-light border-0">
                    <div class="d-flex gap-2 flex-wrap">
                        <button class="btn btn-sm btn-outline-warning download-btn flex-grow-1 flex-sm-grow-0"
                            data-chart="chartUtilizaCredito" data-title="Utiliza_Credito">
                            <i class="fas fa-download me-1"></i>Exportar CSV
                        </button>
                        <button class="btn btn-sm btn-outline-secondary print-chart-btn flex-grow-1 flex-sm-grow-0"
                            data-chart="chartUtilizaCredito">
                            <i class="fas fa-print me-1"></i>Imprimir
                        </button>
                        <button class="btn btn-sm btn-outline-info view-details-btn flex-grow-1 flex-sm-grow-0"
                            data-chart="chartUtilizaCredito" data-title="El crédito lo utilizarías para:">
                            <i class="fas fa-eye me-1"></i>Ver Detalles
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal para Ver Detalles -->
<div class="modal fade" id="chartDetailsModal" tabindex="-1" aria-labelledby="chartDetailsModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title fw-bold" id="chartDetailsModalLabel">
                    <i class="fas fa-chart-line me-2"></i>Detalles de la Gráfica
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="alert alert-info d-flex align-items-center mb-3" role="alert">
                    <i class="fas fa-info-circle me-2 fs-5"></i>
                    <div>
                        <strong>Información:</strong> A continuación se muestran los datos detallados de la gráfica
                        seleccionada.
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-hover table-striped align-middle" id="chartDetailsTable">
                        <thead class="table-primary">
                            <tr>
                                <th scope="col" class="fw-bold">#</th>
                                <th scope="col" class="fw-bold">Descripción</th>
                                <th scope="col" class="fw-bold text-end">Total</th>
                                <th scope="col" class="fw-bold text-end">Porcentaje</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer bg-light">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    <i class="fas fa-times me-1"></i>Cerrar
                </button>
                <button type="button" class="btn btn-primary" id="downloadModalData">
                    <i class="fas fa-download me-1"></i>Descargar Datos
                </button>
            </div>
        </div>
    </div>
</div>