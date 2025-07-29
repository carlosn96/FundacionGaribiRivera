<div id="content">
    <!-- Encabezado de la Página -->
    <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-4">
            <div class="row align-items-center">
                <div class="col-12">
                    <div class="d-flex align-items-center mb-3">
                        <div class="bg-primary bg-opacity-10 rounded-3 p-3 me-3">
                            <i class="ti ti-settings fs-4 text-primary"></i>
                        </div>
                        <div>
                            <h4 class="fw-bold mb-1">Configuración de Parámetros CONEVAL</h4>
                            <p class="text-muted mb-0">Gestión de umbrales de pobreza y vulnerabilidad social</p>
                        </div>
                    </div>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <a class="text-decoration-none text-muted" href="#">
                                    <i class="ti ti-home fs-5 me-1"></i>Trabajo Social
                                </a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Configuración CONEVAL</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </div>

    <!-- Área de Contenido Principal -->
    <div class="container-fluid">
        <!-- Panel de Control Superior -->
        <div class="card border-0 shadow-sm mb-4">
            <div class="card-body p-4">
                <div class="row align-items-center">
                    <div class="col-md-8">
                        <h5 class="fw-semibold mb-2 text-dark">
                            <i class="ti ti-history me-2 text-primary"></i>
                            Historial de Configuraciones
                        </h5>
                        <p class="text-muted mb-0">Administra los parámetros de medición de pobreza según CONEVAL</p>
                    </div>
                    <div class="col-md-4 text-md-end mt-3 mt-md-0">
                        <button type="button" class="btn btn-primary btn-lg" id="btnNuevaConfiguracion" data-bs-toggle="modal" data-bs-target="#modalConfiguracion">
                            <i class="ti ti-plus me-2"></i>
                            <span class="d-none d-sm-inline">Nueva </span>Configuración
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Contenedor para las tarjetas de configuración -->
        <div id="configuracionesContainer" class="row g-4">
            <!-- Las tarjetas se cargarán aquí dinámicamente -->
        </div>
        
        <!-- Estado Vacío (cuando no hay datos) -->
        <div id="emptyState" class="text-center py-5 my-5" style="display: none;">
            <div class="card border-0 shadow-sm">
                <div class="card-body p-5">
                    <div class="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style="width: 120px; height: 120px;">
                        <i class="ti ti-database-off display-3 text-muted"></i>
                    </div>
                    <h4 class="fw-bold mb-3">No hay configuraciones registradas</h4>
                    <p class="text-muted mb-4 mx-auto" style="max-width: 400px;">
                        Aún no se han registrado parámetros del CONEVAL. Crea tu primera configuración para comenzar a gestionar los umbrales de pobreza.
                    </p>
                    <button type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#modalConfiguracion">
                        <i class="ti ti-plus me-2"></i>Crear Primera Configuración
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal para Añadir/Editar Configuración -->
    <div class="modal fade" id="modalConfiguracion" tabindex="-1" aria-labelledby="modalConfiguracionLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content border-0 shadow">
                <div class="modal-header bg-primary bg-opacity-10 border-0 pb-3">
                    <div class="d-flex align-items-center">
                        <div class="bg-primary rounded-circle p-2 me-3">
                            <i class="ti ti-settings text-white fs-5"></i>
                        </div>
                        <div>
                            <h5 class="modal-title fw-bold mb-0" id="modalConfiguracionLabel">Nueva Configuración CONEVAL</h5>
                            <p class="text-muted mb-0 small">Establece los parámetros de medición</p>
                        </div>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body p-4">
                    <form id="formConfiguracion" novalidate>
                        <input type="hidden" id="idConeval" name="idConeval">
                        
                        <!-- Fecha de Referencia -->
                        <div class="row mb-4">
                            <div class="col-12">
                                <div class="card border border-success border-opacity-25">
                                    <div class="card-body p-3">
                                        <label for="fechaMuestra" class="form-label fw-semibold d-flex align-items-center mb-3">
                                            <i class="ti ti-calendar-event me-2 text-primary"></i>
                                            Fecha de Referencia
                                        </label>
                                        <input type="date" class="form-control form-control-lg" id="fechaMuestra" name="fechaMuestra" required>
                                        <div class="form-text mt-2">
                                            <i class="ti ti-info-circle me-1"></i>
                                            Fecha según información oficial del CONEVAL
                                        </div>
                                        <div class="invalid-feedback">Por favor, selecciona una fecha válida.</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Parámetros Monetarios -->
                        <div class="row g-4">
                            <!-- Pobreza por Ingresos -->
                            <div class="col-md-6">
                                <div class="card border border-warning border-opacity-25 h-100">
                                    <div class="card-body p-3">
                                        <div class="d-flex align-items-center mb-3">
                                            <div class="bg-warning bg-opacity-10 rounded-circle p-2 me-3">
                                                <i class="ti ti-shield-half-filled text-warning fs-5"></i>
                                            </div>
                                            <div>
                                                <label for="montoVulnerable" class="form-label fw-semibold mb-0">
                                                    Pobreza por Ingresos
                                                </label>
                                                <p class="text-muted mb-0 small">Umbral de vulnerabilidad</p>
                                            </div>
                                        </div>
                                        <div class="input-group input-group-lg">
                                            <span class="input-group-text bg-warning bg-opacity-10 border-warning border-opacity-25">
                                                <i class="ti ti-currency-dollar text-warning"></i>
                                            </span>
                                            <input type="number" class="form-control border-warning border-opacity-25" 
                                                   id="montoVulnerable" name="montoVulnerableIngreso" 
                                                   placeholder="4,250.50" step="0.01" min="0" required>
                                        </div>
                                        <div class="form-text mt-2">
                                            <i class="ti ti-info-circle me-1"></i>
                                            Monto mensual en pesos mexicanos
                                        </div>
                                        <div class="invalid-feedback">Ingresa un monto válido mayor a 0.</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Pobreza Extrema -->
                            <div class="col-md-6">
                                <div class="card border border-danger border-opacity-25 h-100">
                                    <div class="card-body p-3">
                                        <div class="d-flex align-items-center mb-3">
                                            <div class="bg-danger bg-opacity-10 rounded-circle p-2 me-3">
                                                <i class="ti ti-shield-x text-danger fs-5"></i>
                                            </div>
                                            <div>
                                                <label for="montoPobrezaExtrema" class="form-label fw-semibold mb-0">
                                                    Pobreza Extrema
                                                </label>
                                                <p class="text-muted mb-0 small">Umbral crítico</p>
                                            </div>
                                        </div>
                                        <div class="input-group input-group-lg">
                                            <span class="input-group-text bg-danger bg-opacity-10 border-danger border-opacity-25">
                                                <i class="ti ti-currency-dollar text-danger"></i>
                                            </span>
                                            <input type="number" class="form-control border-danger border-opacity-25" 
                                                   id="montoPobrezaExtrema" name="montoPobrezaExtrema" 
                                                   placeholder="2,150.75" step="0.01" min="0" required>
                                        </div>
                                        <div class="form-text mt-2">
                                            <i class="ti ti-info-circle me-1"></i>
                                            Monto mensual en pesos mexicanos
                                        </div>
                                        <div class="invalid-feedback">Ingresa un monto válido mayor a 0.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" form="formConfiguracion" class="btn btn-success">
                        <i class="ti ti-device-floppy me-1"></i>Guardar
                    </button>
                </div>

            </div>
        </div>
    </div>
</div>
