<div class="container-fluid px-3 px-md-4 py-4 pagos-module">
    <!-- Encabezado y Regreso -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-1">
                    <li class="breadcrumb-item"><a href="../inicio/" class="text-decoration-none text-muted fw-medium">Cobranza</a></li>
                    <li class="breadcrumb-item active fw-bold text-dark" aria-current="page">Panel de Pagos</li>
                </ol>
            </nav>
            <h1 class="dashboard-title h2 mb-0 d-flex align-items-center">
                <i class="fas fa-wallet text-success me-3 opacity-75"></i>
                Gestión Financiera
            </h1>
        </div>
        <div>
            <button class="btn btn-light-util btn-sm d-flex align-items-center" id="btn-cancelar">
                <i class="fas fa-arrow-left me-2"></i> Volver al Listado
            </button>
        </div>
    </div>

    <!-- Estado Incompleto (Expediente no creado) -->
    <div id="estado-incompleto" class="d-none w-100 mt-5">
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-lg-6 text-center">
                <div class="metric-card p-5 border-warning border border-2">
                    <div class="mb-4">
                        <div class="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                            <i class="fas fa-folder-open fa-2x text-warning"></i>
                        </div>
                    </div>
                    <h3 class="fw-bold text-dark mb-3">Expediente Incompleto</h3>
                    <p class="text-muted mb-4 fs-6">
                        No se pueden registrar ni visualizar pagos porque el emprendedor <strong id="nombre-emprendedor-incompleto" class="text-dark"></strong> aún no cuenta con un expediente financiero o un plan de cobro asignado.
                    </p>
                    <a href="#" id="cta-expediente" class="btn btn-warning fw-bold text-dark px-4 py-2 rounded-pill shadow-sm">
                        <i class="fas fa-arrow-right me-2"></i> Crear Expediente Financiero
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div id="panel-pagos" class="row g-4 d-none">
        <!-- Columna Izquierda: Panorama General -->
        <div class="col-12 col-xl-4">
            <!-- Tarjeta Principal: Emprendedor -->
            <div class="metric-card p-4 mb-4">
                <div class="d-flex align-items-start gap-4 mb-4">
                    <div class="rounded-circle overflow-hidden bg-light d-flex align-items-center justify-content-center" style="width: 72px; height: 72px;">
                        <img id="foto-emprendedor-pagos" src="" alt="Avatar" class="w-100 h-100 object-fit-cover d-none" />
                        <i id="icono-default" class="fas fa-user-circle fa-3x text-secondary"></i>
                    </div>
                    <div>
                        <h4 class="fw-bold mb-1 text-dark" id="nombre-completo">Cargando...</h4>
                        <span class="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25 px-2 py-1" id="referencia">REF-000</span>
                    </div>
                </div>

                <div class="bg-light rounded-3 p-4">
                    <p class="text-uppercase fw-bold text-muted small mb-2 tracking-widest">Saldo Restante</p>
                    <h2 class="accent-number text-dark mb-3" id="saldo-restante">$0.00</h2>
                    
                    <div class="d-flex justify-content-between align-items-end mb-2">
                        <span class="small fw-semibold text-muted">Progreso de Pago</span>
                        <span class="small fw-bold text-success" id="progreso-lbl">0.0% Pagado</span>
                    </div>
                    <div class="progress-slim w-100">
                        <div class="progress-bar bg-primary" id="barra-progreso" role="progressbar" style="width: 0%"></div>
                    </div>
                </div>
            </div>

            <!-- Detalles del Crédito -->
            <div class="metric-card p-4">
                <h6 class="fw-bold text-dark text-uppercase small mb-4 tracking-widest border-bottom pb-2">Plan de Financiamiento</h6>
                
                <div class="d-flex justify-content-between py-2 border-bottom">
                    <span class="text-muted fw-medium">Monto del Apoyo</span>
                    <span class="fw-bold text-dark" id="monto-apoyo">$0.00</span>
                </div>
                <div class="d-flex justify-content-between py-2 border-bottom">
                    <span class="text-muted fw-medium">Cuota Base</span>
                    <span class="fw-bold text-dark" id="monto-doc">$0.00</span>
                </div>
                <div class="d-flex justify-content-between py-2 mb-3">
                    <span class="text-muted fw-medium">Total Mensualidades</span>
                    <span class="fw-bold text-dark badge bg-light text-dark" id="total-mensualidades">0</span>
                </div>

                <div class="d-grid gap-2 mt-4">
                    <button class="btn btn-dark-util shadow-sm py-2 d-flex align-items-center justify-content-center gap-2" id="btn-agregar-pago">
                        <i class="fas fa-plus-circle"></i> Registrar Pago Formal
                    </button>
                    <button class="btn btn-light-util shadow-sm py-2 d-flex align-items-center justify-content-center gap-2" id="btn-agregar-parcial">
                        <i class="fas fa-coins text-warning"></i> Recibir Abono Parcial
                    </button>
                </div>
            </div>
        </div>

        <!-- Columna Derecha: Tablas de Histórico -->
        <div class="col-12 col-xl-8">
            <!-- Pagos Formales (Mensuales/Extras) -->
            <div class="metric-card p-4 mb-4">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h5 class="fw-bold text-dark mb-0 d-flex align-items-center">
                        <i class="fas fa-calendar-check text-primary me-2"></i> Histórico de Mensualidades
                    </h5>
                </div>
                <div class="table-responsive">
                    <table class="table table-borderless table-minimalist w-100 align-middle">
                        <thead>
                            <tr>
                                <th>Recibo</th>
                                <th>Clase</th>
                                <th>Monto</th>
                                <th>Aplicación</th>
                                <th>Recepción</th>
                                <th>Registro</th>
                                <th class="text-end">Acción</th>
                            </tr>
                        </thead>
                        <tbody id="tbody-mensuales">
                            <!-- JS fill -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Abonos Parciales -->
            <div class="metric-card p-4">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h5 class="fw-bold text-dark mb-0 d-flex align-items-center">
                        <i class="fas fa-chart-pie text-warning me-2"></i> Abonos Parciales Libres
                    </h5>
                </div>
                <div class="table-responsive">
                    <table class="table table-borderless table-minimalist w-100 align-middle">
                        <thead>
                            <tr>
                                <th>Abono</th>
                                <th>Fecha Efectiva</th>
                                <th>Capturado el</th>
                                <th class="text-end">Acción</th>
                            </tr>
                        </thead>
                        <tbody id="tbody-parciales">
                            <!-- JS fill -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal: Pago Formal -->
<div class="modal fade" id="modalAgregarPago" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content modal-modern">
      <div class="modal-header">
        <h5 class="modal-title fw-bold"><i class="fas fa-cash-register me-2 text-primary"></i> Registrar Pago</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form id="form-pago">
          <div class="modal-body p-4 bg-white">
            
            <div class="row g-3">
                <div class="col-md-6">
                    <label class="form-label small fw-bold text-muted">Tipo de Cuota <span class="text-danger">*</span></label>
                    <select class="form-select bg-light border-0" id="tipoPago" required>
                        <option value="Mensual" selected>Mensual Ordinario</option>
                        <option value="Extra">Extra o Residual</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label small fw-bold text-muted">Fecha Aplicación <span class="text-danger">*</span></label>
                    <select class="form-select bg-light border-0 fw-semibold" id="fechaAplicacion" required>
                        <!-- Rellenado con las fechas pendientes JS -->
                    </select>
                </div>
                
                <div class="col-12 mt-4">
                    <label class="form-label small fw-bold text-muted">Monto Directo <span class="text-danger">*</span></label>
                    <div class="input-group">
                        <span class="input-group-text bg-white text-muted fw-bold">$</span>
                        <input type="number" step="0.01" class="form-control form-control-lg fw-bold" id="montoMensualidad" required placeholder="0.00">
                    </div>
                </div>

                <div class="col-md-6 mt-3">
                    <label class="form-label small fw-bold text-muted">Fondo Solidario</label>
                    <div class="input-group input-group-sm">
                        <span class="input-group-text bg-white"><i class="fas fa-hands-helping"></i></span>
                        <input type="number" step="0.01" class="form-control" id="aportacionSolidaria" placeholder="0.00">
                    </div>
                </div>
                <div class="col-md-6 mt-3">
                    <label class="form-label small fw-bold text-muted">Donativo Libre</label>
                    <div class="input-group input-group-sm">
                        <span class="input-group-text bg-white"><i class="fas fa-gift"></i></span>
                        <input type="number" step="0.01" class="form-control" id="donativo" placeholder="0.00">
                    </div>
                </div>

                <div class="col-12 mt-3">
                    <label class="form-label small fw-bold text-muted">Acuñación del Recibo (Recepción) <span class="text-danger">*</span></label>
                    <input type="date" class="form-control bg-light border-0" id="fechaRecepcion" required>
                </div>
            </div>
          </div>
          <div class="modal-footer border-0 px-4 pb-4">
            <button type="button" class="btn btn-light-util px-4" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-dark-util px-4" id="btn-guardar-pago">Completar Transacción</button>
          </div>
      </form>
    </div>
  </div>
</div>

<!-- Modal: Abono Parcial -->
<div class="modal fade" id="modalPagoParcial" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
  <div class="modal-dialog modal-dialog-centered modal-sm">
    <div class="modal-content modal-modern border-warning border border-2">
      <div class="modal-header bg-warning bg-opacity-10 border-0">
        <h5 class="modal-title fw-bold text-dark"><i class="fas fa-coins me-2 text-warning"></i> Abono Parcial</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form id="form-parcial">
          <div class="modal-body p-4 bg-white">
            <div class="alert alert-warning small border-0 bg-warning bg-opacity-10 text-dark fw-medium px-3 py-2">
                Use esto solo para montos inexactos que no cobren una mensualidad de la tabla de amortización aún.
            </div>
            <div class="mb-3">
                <label class="form-label small fw-bold text-muted">Cantidad Excedente <span class="text-danger">*</span></label>
                <div class="input-group">
                    <span class="input-group-text bg-white fw-bold">$</span>
                    <input type="number" step="0.01" class="form-control form-control-lg fw-bold text-dark" id="montoParcial" required placeholder="0.00">
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label small fw-bold text-muted">Fecha del Depósito <span class="text-danger">*</span></label>
                <input type="date" class="form-control bg-light border-0" id="fechaAbono" required>
            </div>
          </div>
          <div class="modal-footer border-0 px-4 pb-4">
            <button type="button" class="btn btn-light text-muted px-4" data-bs-dismiss="modal">Cerrar</button>
            <button type="submit" class="btn btn-warning fw-bold text-dark px-4" id="btn-guardar-parcial">Sumar Saldo</button>
          </div>
      </form>
    </div>
  </div>
</div>
