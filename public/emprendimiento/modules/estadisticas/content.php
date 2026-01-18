<!-- Dashboard de Estadísticas - Línea Base -->
<div class="container-fluid px-3 px-md-4 py-4">
    <!-- Header con estadísticas resumidas -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="dashboard-header-card card border-0 shadow-sm mb-4 overflow-hidden">
                <div class="card-body p-4 position-relative">
                    <!-- Decoración de fondo -->
                    <div class="header-bg-decoration"></div>

                    <div
                        class="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3 position-relative">
                        <div class="flex-grow-1">
                            <div class="d-flex align-items-center gap-3 mb-2">
                                <div class="dashboard-icon-box">
                                    <i class="fas fa-chart-line fa-2x"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <h1 class="h3 fw-bold text-dark mb-1">
                                        Información estadística de la Línea Base
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-2 fs-3">
                        <div class="update-badge">
                            <small class="text-muted d-block mb-1 fw-semibold">
                                <i class="fas fa-clock me-1"></i>Última actualización
                            </small>
                            <span class="badge bg-primary-gradient px-3 py-2" id="lastUpdate">
                                <i class="fas fa-sync-alt me-1"></i>Cargando...
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Filtros y Exportación -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="card filters-card border-0 shadow-sm">
                <div class="card-header bg-gradient-light border-0 py-3">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
                            <span class="filter-icon-badge">
                                <i class="fas fa-filter"></i>
                            </span>
                            Filtros de Búsqueda
                        </h5>
                        <button type="button" class="btn btn-sm btn-outline-primary" id="toggleFilters"
                            aria-expanded="true" aria-controls="filterContent">
                            <i class="fas fa-chevron-up me-1"></i>
                            <span class="d-none d-sm-inline">Contraer</span>
                        </button>
                    </div>
                </div>
                <div class="card-body collapse show" id="filterContent">
                    <form id="filtrosEstadisticasForm" role="form" aria-label="Formulario de filtros">
                        <!-- Tabs para cambiar entre los filtros -->
                        <ul class="nav nav-pills nav-fill filter-tabs mb-4" id="filterTabs" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="fecha-tab" data-bs-toggle="tab"
                                    data-bs-target="#filtro-fecha" type="button" role="tab" aria-controls="filtro-fecha"
                                    aria-selected="true">
                                    <i class="fas fa-calendar-alt tab-icon"></i>
                                    <span class="tab-label">Por Fecha</span>
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="etapa-tab" data-bs-toggle="tab"
                                    data-bs-target="#filtro-etapa" type="button" role="tab" aria-controls="filtro-etapa"
                                    aria-selected="false">
                                    <i class="fas fa-users tab-icon"></i>
                                    <span class="tab-label">Por Etapa</span>
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="campos-tab" data-bs-toggle="tab"
                                    data-bs-target="#filtro-campos" type="button" role="tab"
                                    aria-controls="filtro-campos" aria-selected="false">
                                    <i class="fas fa-th-list tab-icon"></i>
                                    <span class="tab-label">Por Campos</span>
                                </button>
                            </li>
                        </ul>

                        <div class="tab-content" id="filterTabsContent">
                            <!-- Filtro por Fecha -->
                            <div class="tab-pane fade show active" id="filtro-fecha" role="tabpanel"
                                aria-labelledby="fecha-tab">
                                <div class="row g-3">
                                    <div class="col-12">
                                        <label class="form-label fw-semibold text-dark mb-2">
                                            <i class="fas fa-calendar-week me-2 text-primary"></i>Rango de Fechas
                                        </label>
                                        <div class="input-daterange input-group" id="date-range">
                                            <input type="text" class="form-control form-control-lg" id="fechaInicio" name="fechaInicio"
                                                placeholder="Fecha inicio" readonly>
                                            <span class="input-group-text bg-primary border-primary text-white px-3">
                                                <i class="fas fa-arrows-alt-h"></i>
                                            </span>
                                            <input type="text" class="form-control form-control-lg" id="fechaFin" name="fechaFin"
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
                                <div class="row g-3">
                                    <div class="col-12">
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

                            <!-- Filtro por Campos -->
                            <div class="tab-pane fade" id="filtro-campos" role="tabpanel" aria-labelledby="campos-tab">
                                <div id="campoSelectorContainer">
                                </div>
                            </div>
                        </div>

                        <!-- Acciones -->
                        <div class="d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-3 mt-4 pt-3 border-top">
                            <!-- Botones de filtro -->
                            <div class="d-flex gap-2">
                                <button type="button" id="limpiarFiltros" class="btn btn-outline-secondary btn-hover-effect">
                                    <i class="fas fa-eraser me-1"></i>Limpiar
                                </button>
                                <button type="submit" class="btn btn-primary btn-hover-effect px-4">
                                    <i class="fas fa-search me-1"></i>Aplicar
                                </button>
                            </div>
                            
                            <!-- Exportar -->
                            <div class="dropdown">
                                <button class="btn btn-outline-success btn-hover-effect dropdown-toggle" type="button"
                                    id="exportDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fas fa-download me-1"></i>Exportar
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="exportDropdown">
                                    <li>
                                        <a class="dropdown-item" href="javascript:descargarPDF();">
                                            <i class="fas fa-file-pdf me-2 text-danger"></i>PDF
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="javascript:reportePreview();">
                                            <i class="fas fa-eye me-2 text-success"></i>Preview
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Cards de resumen - MEJORADOS -->
    <div class="row g-3 g-md-4 mb-4" id="summaryCards">
        <!-- Tarjeta de Emprendedores -->
        <div class="col-12 col-sm-6 col-lg-4">
            <div class="summary-card card border-0 shadow-hover h-100 overflow-hidden">
                <div class="card-body p-4 position-relative">
                    <div class="card-bg-pattern card-bg-primary"></div>
                    <div class="d-flex justify-content-between align-items-start position-relative">
                        <div class="flex-grow-1">
                            <div class="d-flex align-items-center gap-2 mb-2">
                                <span class="category-badge badge-primary">
                                    <i class="fas fa-chart-line"></i>
                                </span>
                                <div class="text-uppercase fw-bold text-primary small">Emprendedores</div>
                            </div>
                            <div class="metric-value h2 fw-bold text-dark mb-2 count-up" id="totalEmprendedores"
                                data-target="0">0</div>
                            <div class="metric-change text-success small">
                                <i class="fas fa-arrow-up me-1"></i>
                                <span>+0%</span> vs. período anterior
                            </div>
                        </div>
                        <div class="icon-wrapper icon-primary">
                            <i class="fas fa-users fa-2x"></i>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-transparent border-0 pt-0 pb-3 px-4">
                    <button class="btn btn-sm btn-outline-primary w-100 view-details-summary-btn btn-hover-effect"
                        data-categoria="emprendedores">
                        <i class="fas fa-eye me-1"></i> Ver detalles completos
                    </button>
                </div>
            </div>
        </div>

        <!-- Tarjeta de Capacitación -->
        <div class="col-12 col-sm-6 col-lg-4">
            <div class="summary-card card border-0 shadow-hover h-100 overflow-hidden">
                <div class="card-body p-4 position-relative">
                    <div class="card-bg-pattern card-bg-success"></div>
                    <div class="d-flex justify-content-between align-items-start position-relative">
                        <div class="flex-grow-1">
                            <div class="d-flex align-items-center gap-2 mb-2">
                                <span class="category-badge badge-success">
                                    <i class="fas fa-check-circle"></i>
                                </span>
                                <div class="text-uppercase fw-bold text-success small">Capacitación</div>
                            </div>
                            <div class="metric-value h2 fw-bold text-dark mb-2 count-up" id="totalCapacitacion"
                                data-target="0">0</div>
                            <div class="metric-change text-success small">
                                <i class="fas fa-arrow-up me-1"></i>
                                <span>+0%</span> completados
                            </div>
                        </div>
                        <div class="icon-wrapper icon-success">
                            <i class="fas fa-graduation-cap fa-2x"></i>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-transparent border-0 pt-0 pb-3 px-4">
                    <button class="btn btn-sm btn-outline-success w-100 view-details-summary-btn btn-hover-effect"
                        data-categoria="capacitacion">
                        <i class="fas fa-eye me-1"></i> Ver detalles completos
                    </button>
                </div>
            </div>
        </div>

        <!-- Tarjeta de Créditos -->
        <div class="col-12 col-sm-6 col-lg-4">
            <div class="summary-card card border-0 shadow-hover h-100 overflow-hidden">
                <div class="card-body p-4 position-relative">
                    <div class="card-bg-pattern card-bg-info"></div>
                    <div class="d-flex justify-content-between align-items-start position-relative">
                        <div class="flex-grow-1">
                            <div class="d-flex align-items-center gap-2 mb-2">
                                <span class="category-badge badge-info">
                                    <i class="fas fa-dollar-sign"></i>
                                </span>
                                <div class="text-uppercase fw-bold text-info small">Créditos</div>
                            </div>
                            <div class="metric-value h2 fw-bold text-dark mb-2 count-up" id="totalCreditos"
                                data-target="0">0</div>
                            <div class="metric-change text-info small">
                                <i class="fas fa-dollar-sign me-1"></i>
                                <span>$0</span> otorgados
                            </div>
                        </div>
                        <div class="icon-wrapper icon-info">
                            <i class="fas fa-dollar-sign fa-2x"></i>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-transparent border-0 pt-0 pb-3 px-4">
                    <button class="btn btn-sm btn-outline-info w-100 view-details-summary-btn btn-hover-effect"
                        data-categoria="creditos">
                        <i class="fas fa-eye me-1"></i> Ver detalles completos
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Gráficas principales - MEJORADAS -->
    <div class="row g-4">
        <!-- Medio de Conocimiento -->
        <div class="col-12 col-xl-6">
            <div class="chart-card card border-0 shadow-hover h-100">
                <div class="card-header chart-header-primary border-0 py-3">
                    <div
                        class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
                        <div class="flex-grow-1">
                            <h6 class="mb-1 fw-bold text-white d-flex align-items-center gap-2">
                                <span class="chart-icon-badge">
                                    <i class="fas fa-bullhorn"></i>
                                </span>
                                ¿Cómo te enteraste de la Fundación?
                            </h6>
                            <small class="opacity-90 d-flex align-items-center gap-1">
                                <i class="fas fa-tag"></i>
                                Canales de difusión
                            </small>
                        </div>
                        <div class="btn-group chart-type-selector shadow-sm" role="group"
                            data-chart="chartMedioConocimiento" aria-label="Tipo de gráfico">
                            <button type="button" class="btn chart-type-btn btn-light active" data-type="pie"
                                title="Gráfico Circular" aria-pressed="true">
                                <i class="fas fa-chart-pie"></i>
                            </button>
                            <button type="button" class="btn chart-type-btn btn-outline-light" data-type="bar"
                                title="Gráfico de Barras" aria-pressed="false">
                                <i class="fas fa-chart-bar"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body p-4">
                    <!-- Loading skeleton -->
                    <div class="chart-skeleton d-none">
                        <div class="skeleton-loader"></div>
                    </div>
                    <!-- Chart wrapper -->
                    <div class="chart-wrapper position-relative">
                        <div id="chartMedioConocimiento" class="apex-chart"></div>
                        <div class="chart-empty-state d-none">
                            <i class="fas fa-chart-pie fa-3x text-muted mb-3"></i>
                            <p class="text-muted">No hay datos disponibles</p>
                        </div>
                    </div>
                    <div class="border-top mt-3 pt-3">
                        <div class="row text-center g-3">
                            <div class="col-6">
                                <div class="stat-box">
                                    <small class="text-muted d-block mb-2">
                                        <i class="fas fa-trophy me-1 text-warning"></i>Más popular
                                    </small>
                                    <div class="fw-bold text-truncate stat-value" id="statMedioTop" title="">-</div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="stat-box">
                                    <small class="text-muted d-block mb-2">
                                        <i class="fas fa-hashtag me-1"></i>Total respuestas
                                    </small>
                                    <div class="fw-bold stat-value" id="statMedioTotal">0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-light border-0 py-3">
                    <div class="d-flex gap-2 flex-wrap justify-content-center justify-content-sm-start">
                        <button
                            class="btn btn-sm btn-outline-primary download-btn flex-grow-1 flex-sm-grow-0 btn-action"
                            data-chart="chartMedioConocimiento" data-title="Medio_de_Conocimiento">
                            <i class="fas fa-download me-1"></i>CSV
                        </button>
                        <button
                            class="btn btn-sm btn-outline-secondary print-chart-btn flex-grow-1 flex-sm-grow-0 btn-action"
                            data-chart="chartMedioConocimiento">
                            <i class="fas fa-print me-1"></i>Imprimir
                        </button>
                        <button class="btn btn-sm btn-primary view-details-btn flex-grow-1 flex-sm-grow-0 btn-action"
                            data-chart="chartMedioConocimiento" data-title="¿Cómo te enteraste de la Fundación?">
                            <i class="fas fa-eye me-1"></i>Ver Detalles
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Razón Recurre -->
        <div class="col-12 col-xl-6">
            <div class="chart-card card border-0 shadow-hover h-100">
                <div class="card-header chart-header-success border-0 py-3">
                    <div
                        class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
                        <div class="flex-grow-1">
                            <h6 class="mb-1 fw-bold text-white d-flex align-items-center gap-2">
                                <span class="chart-icon-badge">
                                    <i class="fas fa-question-circle"></i>
                                </span>
                                Recurres a la Fundación para:
                            </h6>
                            <small class="opacity-90 d-flex align-items-center gap-1">
                                <i class="fas fa-tag"></i>
                                Motivación principal
                            </small>
                        </div>
                        <div class="btn-group chart-type-selector shadow-sm" role="group" data-chart="chartRazonRecurre"
                            aria-label="Tipo de gráfico">
                            <button type="button" class="btn chart-type-btn btn-light active" data-type="pie"
                                title="Gráfico Circular" aria-pressed="true">
                                <i class="fas fa-chart-pie"></i>
                            </button>
                            <button type="button" class="btn chart-type-btn btn-outline-light" data-type="donut"
                                title="Gráfico Dona" aria-pressed="false">
                                <i class="fas fa-circle-notch"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body p-4">
                    <!-- Loading skeleton -->
                    <div class="chart-skeleton d-none">
                        <div class="skeleton-loader"></div>
                    </div>
                    <!-- Chart wrapper -->
                    <div class="chart-wrapper position-relative">
                        <div id="chartRazonRecurre" class="apex-chart"></div>
                        <div class="chart-empty-state d-none">
                            <i class="fas fa-chart-pie fa-3x text-muted mb-3"></i>
                            <p class="text-muted">No hay datos disponibles</p>
                        </div>
                    </div>
                    <div class="border-top mt-3 pt-3">
                        <div class="row text-center g-3">
                            <div class="col-6">
                                <div class="stat-box">
                                    <small class="text-muted d-block mb-2">
                                        <i class="fas fa-trophy me-1 text-warning"></i>Más solicitado
                                    </small>
                                    <div class="fw-bold text-truncate stat-value" id="statRazonTop" title="">-</div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="stat-box">
                                    <small class="text-muted d-block mb-2">
                                        <i class="fas fa-hashtag me-1"></i>Total respuestas
                                    </small>
                                    <div class="fw-bold stat-value" id="statRazonTotal">0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-light border-0 py-3">
                    <div class="d-flex gap-2 flex-wrap justify-content-center justify-content-sm-start">
                        <button
                            class="btn btn-sm btn-outline-success download-btn flex-grow-1 flex-sm-grow-0 btn-action"
                            data-chart="chartRazonRecurre" data-title="Razon_Recurre">
                            <i class="fas fa-download me-1"></i>CSV
                        </button>
                        <button
                            class="btn btn-sm btn-outline-secondary print-chart-btn flex-grow-1 flex-sm-grow-0 btn-action"
                            data-chart="chartRazonRecurre">
                            <i class="fas fa-print me-1"></i>Imprimir
                        </button>
                        <button class="btn btn-sm btn-success view-details-btn flex-grow-1 flex-sm-grow-0 btn-action"
                            data-chart="chartRazonRecurre" data-title="Recurres a la Fundación para:">
                            <i class="fas fa-eye me-1"></i>Ver Detalles
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Solicita Crédito -->
        <div class="col-12 col-xl-6">
            <div class="chart-card card border-0 shadow-hover h-100">
                <div class="card-header chart-header-info border-0 py-3">
                    <div
                        class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
                        <div class="flex-grow-1">
                            <h6 class="mb-1 fw-bold text-white d-flex align-items-center gap-2">
                                <span class="chart-icon-badge">
                                    <i class="fas fa-hand-holding-usd"></i>
                                </span>
                                El crédito lo solicitarías para:
                            </h6>
                            <small class="opacity-90 d-flex align-items-center gap-1">
                                <i class="fas fa-tag"></i>
                                Propósito del crédito
                            </small>
                        </div>
                        <div class="btn-group chart-type-selector shadow-sm" role="group"
                            data-chart="chartSolicitaCredito" aria-label="Tipo de gráfico">
                            <button type="button" class="btn chart-type-btn btn-light active" data-type="bar"
                                title="Gráfico de Barras" aria-pressed="true">
                                <i class="fas fa-chart-bar"></i>
                            </button>
                            <button type="button" class="btn chart-type-btn btn-outline-light" data-type="horizontalBar"
                                title="Barras Horizontales" aria-pressed="false">
                                <i class="fas fa-arrows-alt-h"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body p-4">
                    <!-- Loading skeleton -->
                    <div class="chart-skeleton d-none">
                        <div class="skeleton-loader"></div>
                    </div>
                    <!-- Chart wrapper -->
                    <div class="chart-wrapper position-relative">
                        <div id="chartSolicitaCredito" class="apex-chart"></div>
                        <div class="chart-empty-state d-none">
                            <i class="fas fa-chart-bar fa-3x text-muted mb-3"></i>
                            <p class="text-muted">No hay datos disponibles</p>
                        </div>
                    </div>
                    <div class="border-top mt-3 pt-3">
                        <div class="row text-center g-3">
                            <div class="col-6">
                                <div class="stat-box">
                                    <small class="text-muted d-block mb-2">
                                        <i class="fas fa-trophy me-1 text-warning"></i>Principal uso
                                    </small>
                                    <div class="fw-bold text-truncate stat-value" id="statSolicitaTop" title="">-</div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="stat-box">
                                    <small class="text-muted d-block mb-2">
                                        <i class="fas fa-hashtag me-1"></i>Total respuestas
                                    </small>
                                    <div class="fw-bold stat-value" id="statSolicitaTotal">0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-light border-0 py-3">
                    <div class="d-flex gap-2 flex-wrap justify-content-center justify-content-sm-start">
                        <button class="btn btn-sm btn-outline-info download-btn flex-grow-1 flex-sm-grow-0 btn-action"
                            data-chart="chartSolicitaCredito" data-title="Solicita_Credito">
                            <i class="fas fa-download me-1"></i>CSV
                        </button>
                        <button
                            class="btn btn-sm btn-outline-secondary print-chart-btn flex-grow-1 flex-sm-grow-0 btn-action"
                            data-chart="chartSolicitaCredito">
                            <i class="fas fa-print me-1"></i>Imprimir
                        </button>
                        <button class="btn btn-sm btn-info view-details-btn flex-grow-1 flex-sm-grow-0 btn-action"
                            data-chart="chartSolicitaCredito" data-title="El crédito lo solicitarías para:">
                            <i class="fas fa-eye me-1"></i>Ver Detalles
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Utiliza Crédito -->
        <div class="col-12 col-xl-6">
            <div class="chart-card card border-0 shadow-hover h-100">
                <div class="card-header chart-header-warning border-0 py-3">
                    <div
                        class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
                        <div class="flex-grow-1">
                            <h6 class="mb-1 fw-bold text-white d-flex align-items-center gap-2">
                                <span class="chart-icon-badge">
                                    <i class="fas fa-shopping-cart"></i>
                                </span>
                                El crédito lo utilizarías para:
                            </h6>
                            <small class="opacity-90 d-flex align-items-center gap-1">
                                <i class="fas fa-tag"></i>
                                Destino de inversión
                            </small>
                        </div>
                        <div class="btn-group chart-type-selector shadow-sm" role="group"
                            data-chart="chartUtilizaCredito" aria-label="Tipo de gráfico">
                            <button type="button" class="btn chart-type-btn btn-light active" data-type="bar"
                                title="Gráfico de Barras" aria-pressed="true">
                                <i class="fas fa-chart-bar"></i>
                            </button>
                            <button type="button" class="btn chart-type-btn btn-outline-light" data-type="horizontalBar"
                                title="Barras Horizontales" aria-pressed="false">
                                <i class="fas fa-arrows-alt-h"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body p-4">
                    <!-- Loading skeleton -->
                    <div class="chart-skeleton d-none">
                        <div class="skeleton-loader"></div>
                    </div>
                    <!-- Chart wrapper -->
                    <div class="chart-wrapper position-relative">
                        <div id="chartUtilizaCredito" class="apex-chart"></div>
                        <div class="chart-empty-state d-none">
                            <i class="fas fa-chart-bar fa-3x text-muted mb-3"></i>
                            <p class="text-muted">No hay datos disponibles</p>
                        </div>
                    </div>
                    <div class="border-top mt-3 pt-3">
                        <div class="row text-center g-3">
                            <div class="col-6">
                                <div class="stat-box">
                                    <small class="text-muted d-block mb-2">
                                        <i class="fas fa-trophy me-1 text-warning"></i>Principal inversión
                                    </small>
                                    <div class="fw-bold text-truncate stat-value" id="statUtilizaTop" title="">-</div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="stat-box">
                                    <small class="text-muted d-block mb-2">
                                        <i class="fas fa-hashtag me-1"></i>Total respuestas
                                    </small>
                                    <div class="fw-bold stat-value" id="statUtilizaTotal">0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-light border-0 py-3">
                    <div class="d-flex gap-2 flex-wrap justify-content-center justify-content-sm-start">
                        <button
                            class="btn btn-sm btn-outline-warning download-btn flex-grow-1 flex-sm-grow-0 btn-action"
                            data-chart="chartUtilizaCredito" data-title="Utiliza_Credito">
                            <i class="fas fa-download me-1"></i>CSV
                        </button>
                        <button
                            class="btn btn-sm btn-outline-secondary print-chart-btn flex-grow-1 flex-sm-grow-0 btn-action"
                            data-chart="chartUtilizaCredito">
                            <i class="fas fa-print me-1"></i>Imprimir
                        </button>
                        <button class="btn btn-sm btn-warning view-details-btn flex-grow-1 flex-sm-grow-0 btn-action"
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
                        <caption class="visually-hidden">Detalles de la gráfica seleccionada con totales y porcentaje
                        </caption>
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
                    <!-- Paginación para tabla de detalles -->
                    <nav aria-label="Paginación de detalles" id="chartDetailsPagination" class="mt-2 d-none">
                        <ul class="pagination pagination-sm justify-content-end mb-0"></ul>
                    </nav>
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