<!-- Dashboard de Estadísticas - Línea Base -->
<div class="container-fluid px-4 py-4">
    <!-- Header con estadísticas resumidas -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h2 class="h3 font-weight-bold text-dark mb-1">Dashboard de Línea Base</h2>
                    <p class="text-muted mb-0">Análisis del seguimiento a emprendedores</p>
                </div>
                <div class="text-right">
                    <small class="text-muted d-block">Última actualización</small>
                    <strong class="text-primary" id="lastUpdate"></strong>
                </div>
            </div>
        </div>
    </div>

    <!-- Cards de resumen -->
    <div class="row mb-4" id="summaryCards">
        <!-- Tarjeta de Emprendedores -->
        <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
            <div class="card border-left-primary shadow h-100 py-2 card-hover">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Emprendedores</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="totalEmprendedores">0</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-users fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tarjeta de Capacitación -->
        <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
            <div class="card border-left-success shadow h-100 py-2 card-hover">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Capacitación</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="totalCapacitacion">0</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-graduation-cap fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tarjeta de Créditos -->
        <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
            <div class="card border-left-info shadow h-100 py-2 card-hover">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Créditos</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="totalCreditos">0</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Gráficas principales -->
    <div class="row">
        <!-- Medio de Conocimiento -->
        <div class="col-xl-6 col-lg-12 mb-4">
            <div class="card shadow-lg border-0 chart-card">
                <div
                    class="card-header bg-gradient-primary text-white py-3 d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="m-0 font-weight-bold">
                            <i class="fas fa-bullhorn mr-2"></i>¿Cómo te enteraste de la Fundación?
                        </h6>
                        <small class="opacity-75">Pregunta 12 - Canales de difusión</small>
                    </div>
                    <div class="chart-type-toggle" data-chart="chartMedioConocimiento">
                        <button class="btn btn-sm btn-light" data-type="pie" title="Gráfico Circular">
                            <i class="fas fa-chart-pie"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-light" data-type="bar" title="Gráfico de Barras">
                            <i class="fas fa-chart-bar"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="chart-wrapper">
                        <canvas id="chartMedioConocimiento"></canvas>
                    </div>
                    <div class="chart-stats mt-3">
                        <div class="row text-center">
                            <div class="col-6">
                                <small class="text-muted">Más popular</small>
                                <div class="font-weight-bold" id="statMedioTop">-</div>
                            </div>
                            <div class="col-6">
                                <small class="text-muted">Total respuestas</small>
                                <div class="font-weight-bold" id="statMedioTotal">0</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-light">
                    <button class="btn btn-sm btn-outline-primary download-btn" data-chart="chartMedioConocimiento"
                        data-title="Medio_de_Conocimiento">
                        <i class="fas fa-download mr-1"></i>Exportar CSV
                    </button>
                    <button class="btn btn-sm btn-outline-secondary ml-2"
                        onclick="printChart('chartMedioConocimiento')">
                        <i class="fas fa-print mr-1"></i>Imprimir
                    </button>
                </div>
            </div>
        </div>

        <!-- Razón Recurre -->
        <div class="col-xl-6 col-lg-12 mb-4">
            <div class="card shadow-lg border-0 chart-card">
                <div
                    class="card-header bg-gradient-success text-white py-3 d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="m-0 font-weight-bold">
                            <i class="fas fa-question-circle mr-2"></i>Recurres a la Fundación para:
                        </h6>
                        <small class="opacity-75">Pregunta 13 - Motivación principal</small>
                    </div>
                    <div class="chart-type-toggle" data-chart="chartRazonRecurre">
                        <button class="btn btn-sm btn-outline-light" data-type="pie" title="Gráfico Circular">
                            <i class="fas fa-chart-pie"></i>
                        </button>
                        <button class="btn btn-sm btn-light" data-type="doughnut" title="Gráfico Dona">
                            <i class="fas fa-circle-notch"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="chart-wrapper">
                        <canvas id="chartRazonRecurre"></canvas>
                    </div>
                    <div class="chart-stats mt-3">
                        <div class="row text-center">
                            <div class="col-6">
                                <small class="text-muted">Más solicitado</small>
                                <div class="font-weight-bold" id="statRazonTop">-</div>
                            </div>
                            <div class="col-6">
                                <small class="text-muted">Total respuestas</small>
                                <div class="font-weight-bold" id="statRazonTotal">0</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-light">
                    <button class="btn btn-sm btn-outline-success download-btn" data-chart="chartRazonRecurre"
                        data-title="Razon_Recurre">
                        <i class="fas fa-download mr-1"></i>Exportar CSV
                    </button>
                    <button class="btn btn-sm btn-outline-secondary ml-2" onclick="printChart('chartRazonRecurre')">
                        <i class="fas fa-print mr-1"></i>Imprimir
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <!-- Solicita Crédito -->
        <div class="col-xl-6 col-lg-12 mb-4">
            <div class="card shadow-lg border-0 chart-card">
                <div
                    class="card-header bg-gradient-info text-white py-3 d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="m-0 font-weight-bold">
                            <i class="fas fa-hand-holding-usd mr-2"></i>El crédito lo solicitarías para:
                        </h6>
                        <small class="opacity-75">Pregunta 14 - Propósito del crédito</small>
                    </div>
                    <div class="chart-type-toggle" data-chart="chartSolicitaCredito">
                        <button class="btn btn-sm btn-light" data-type="bar" title="Gráfico de Barras">
                            <i class="fas fa-chart-bar"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-light" data-type="horizontalBar"
                            title="Barras Horizontales">
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="chart-wrapper">
                        <canvas id="chartSolicitaCredito"></canvas>
                    </div>
                    <div class="chart-stats mt-3">
                        <div class="row text-center">
                            <div class="col-6">
                                <small class="text-muted">Principal uso</small>
                                <div class="font-weight-bold" id="statSolicitaTop">-</div>
                            </div>
                            <div class="col-6">
                                <small class="text-muted">Total respuestas</small>
                                <div class="font-weight-bold" id="statSolicitaTotal">0</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-light">
                    <button class="btn btn-sm btn-outline-info download-btn" data-chart="chartSolicitaCredito"
                        data-title="Solicita_Credito">
                        <i class="fas fa-download mr-1"></i>Exportar CSV
                    </button>
                    <button class="btn btn-sm btn-outline-secondary ml-2" onclick="printChart('chartSolicitaCredito')">
                        <i class="fas fa-print mr-1"></i>Imprimir
                    </button>
                </div>
            </div>
        </div>

        <!-- Utiliza Crédito -->
        <div class="col-xl-6 col-lg-12 mb-4">
            <div class="card shadow-lg border-0 chart-card">
                <div
                    class="card-header bg-gradient-warning text-white py-3 d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="m-0 font-weight-bold">
                            <i class="fas fa-shopping-cart mr-2"></i>El crédito lo utilizarías para:
                        </h6>
                        <small class="opacity-75">Pregunta 15 - Destino de inversión</small>
                    </div>
                    <div class="chart-type-toggle" data-chart="chartUtilizaCredito">
                        <button class="btn btn-sm btn-light" data-type="bar" title="Gráfico de Barras">
                            <i class="fas fa-chart-bar"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-light" data-type="horizontalBar"
                            title="Barras Horizontales">
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="chart-wrapper">
                        <canvas id="chartUtilizaCredito"></canvas>
                    </div>
                    <div class="chart-stats mt-3">
                        <div class="row text-center">
                            <div class="col-6">
                                <small class="text-muted">Principal inversión</small>
                                <div class="font-weight-bold" id="statUtilizaTop">-</div>
                            </div>
                            <div class="col-6">
                                <small class="text-muted">Total respuestas</small>
                                <div class="font-weight-bold" id="statUtilizaTotal">0</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-light">
                    <button class="btn btn-sm btn-outline-warning download-btn" data-chart="chartUtilizaCredito"
                        data-title="Utiliza_Credito">
                        <i class="fas fa-download mr-1"></i>Exportar CSV
                    </button>
                    <button class="btn btn-sm btn-outline-secondary ml-2" onclick="printChart('chartUtilizaCredito')">
                        <i class="fas fa-print mr-1"></i>Imprimir
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .border-left-primary {
        border-left: 4px solid #4e73df !important;
    }

    .border-left-success {
        border-left: 4px solid #1cc88a !important;
    }

    .border-left-info {
        border-left: 4px solid #36b9cc !important;
    }

    .border-left-warning {
        border-left: 4px solid #f6c23e !important;
    }

    .bg-gradient-primary {
        background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
    }

    .bg-gradient-success {
        background: linear-gradient(135deg, #1cc88a 0%, #17a673 100%);
    }

    .bg-gradient-info {
        background: linear-gradient(135deg, #36b9cc 0%, #2c9faf 100%);
    }

    .bg-gradient-warning {
        background: linear-gradient(135deg, #f6c23e 0%, #dda20a 100%);
    }

    .card-hover {
        transition: all 0.3s ease;
    }

    .card-hover:hover {
        transform: translateY(-5px);
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    }

    .chart-card {
        transition: all 0.3s ease;
        border-radius: 0.5rem;
        overflow: hidden;
    }

    .chart-card:hover {
        transform: translateY(-3px);
    }

    .chart-wrapper {
        position: relative;
        height: 320px;
        padding: 10px;
    }

    .chart-stats {
        border-top: 1px solid #e3e6f0;
        padding-top: 15px;
    }

    .chart-type-toggle button {
        padding: 4px 8px;
        border-radius: 4px;
        transition: all 0.2s;
    }

    .chart-type-toggle button:hover {
        transform: scale(1.1);
    }

    .opacity-75 {
        opacity: 0.75;
    }

    .text-xs {
        font-size: 0.7rem;
    }

    .text-gray-800 {
        color: #5a5c69 !important;
    }

    .text-gray-300 {
        color: #dddfeb !important;
    }

    @media print {

        .card-footer,
        .chart-type-toggle {
            display: none !important;
        }
    }

    /* Animación de carga */
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .chart-card {
        animation: fadeIn 0.5s ease-out;
    }

    .card-hover {
        animation: fadeIn 0.3s ease-out;
    }
</style>