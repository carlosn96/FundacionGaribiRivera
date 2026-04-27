<!-- UI for reportes -->
<div class="container-fluid py-4">
    <h1 class="display-6 fw-semibold text-primary">Reportes de Difusión</h1>
    <p class="text-muted mb-4">Visualización de datos y métricas clave del área de difusión.</p>

    <!-- Reporte de Personas Capacitadas -->
    <div class="card shadow-sm border-0 mb-4">
        <div class="card-header bg-primary bg-gradient text-white">
            <h5 class="card-title mb-0"><i class="fas fa-chart-bar me-2"></i>Personas Capacitadas por Período</h5>
        </div>
        <div class="card-body">
            <div class="row align-items-end g-3 mb-3">
                <div class="col-md-4">
                    <label for="reporteAnio" class="form-label">Seleccionar Año:</label>
                    <select id="reporteAnio" class="form-select form-select-lg">
                        <!-- Opciones de año cargadas por JS -->
                    </select>
                </div>
                <div class="col-md-4">
                     <button id="generarReporteBtn" class="btn btn-lg btn-primary">Generar Reporte</button>
                </div>
            </div>
            <div id="resultadoReporte" class="mt-4"></div>
        </div>
    </div>

     <!-- Reporte de Asistencia Incompleta -->
    <div class="card shadow-sm border-0">
        <div class="card-header bg-secondary bg-gradient text-white">
            <h5 class="card-title mb-0"><i class="fas fa-user-check me-2"></i>Emprendedores con Asistencia Incompleta (N-1)</h5>
        </div>
        <div class="card-body">
             <div id="reporteAsistenciaIncompleta" class="mt-3"></div>
        </div>
    </div>

</div>

<script src="api/reportes.js"></script>
