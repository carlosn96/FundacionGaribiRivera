<div class="container-fluid px-3 px-md-4 py-4">
    <!-- Header/Navigation -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-1">
                    <li class="breadcrumb-item"><a href="../inicio/" class="text-decoration-none text-muted fw-medium">Cobranza</a></li>
                    <li class="breadcrumb-item active fw-bold text-dark" aria-current="page">Expediente</li>
                </ol>
            </nav>
            <h1 class="fw-bold h2 mb-0 d-flex align-items-center text-dark" style="letter-spacing: -0.02em;">
                <i class="fas fa-folder-open text-primary me-3 opacity-75"></i>
                Expediente del Emprendedor
            </h1>
        </div>
        <div class="d-flex gap-2">
            <button class="btn btn-light btn-sm d-flex align-items-center border" id="btn-cancelar" type="button">
                <i class="fas fa-arrow-left me-2 text-muted"></i> Volver al Listado
            </button>
        </div>
    </div>

    <form id="form-expediente">
        <div class="row g-4">
            <!-- Sidebar / Resumen -->
            <div class="col-12 col-lg-4 order-lg-2">
                <div class="card border-0 shadow-sm sticky-top" style="top: 24px; z-index: 1;">
                    <div class="card-body p-4 text-center">
                        <div class="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3 overflow-hidden" style="width: 80px; height: 80px;">
                            <img src="" alt="Foto" id="foto-emprendedor" class="w-100 h-100 object-fit-cover d-none">
                            <i class="fas fa-user-tie fa-3x text-primary" id="icono-usuario"></i>
                        </div>
                        <h5 class="fw-bold mb-1" id="nombre-completo-sidebar">--- ---</h5>
                        <p class="text-muted small mb-4" id="referencia-sidebar">Sin Expediente</p>
                        <hr class="opacity-25 my-4">
                        <div class="text-start">
                            <div class="d-flex justify-content-between mb-3">
                                <span class="text-muted small text-uppercase fw-semibold">Monto Solicitado</span>
                                <span class="fw-bold text-dark" id="resumen-monto">$0.00</span>
                            </div>
                            <div class="d-flex justify-content-between mb-3">
                                <span class="text-muted small text-uppercase fw-semibold">Mensualidades</span>
                                <span class="fw-bold text-dark" id="resumen-mensualidades">0</span>
                            </div>
                            <div class="d-flex justify-content-between">
                                <span class="text-muted small text-uppercase fw-semibold">Estatus</span>
                                <span class="badge bg-warning bg-opacity-10 text-warning px-3 rounded-pill">Revision</span>
                            </div>
                            <!-- Acceso a Pagos (Se muestra por JS si existe expediente) -->
                            <div class="mt-4 pt-3 border-top border-opacity-25 d-none" id="panel-acceso-pagos">
                                <a href="#" id="link-pagos" class="btn btn-outline-success w-100 fw-bold rounded-pill text-uppercase tracking-widest small">
                                    <i class="fas fa-wallet me-2"></i> Gestión de Pagos
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Principal / Campos -->
            <div class="col-12 col-lg-8 order-lg-1">
                <!-- Sección 1: Datos Personales -->
                <div class="card border-0 shadow-sm mb-4">
                    <div class="card-header bg-transparent border-0 pt-4 px-4 pb-0">
                        <h5 class="fw-bold text-dark d-flex align-items-center">
                            <i class="fas fa-user text-primary me-2 fs-6"></i>
                            Información del Emprendedor
                        </h5>
                        <p class="text-muted small mb-0">Información básica recuperada del perfil.</p>
                    </div>
                    <div class="card-body p-4">
                        <div class="row g-3">
                            <div class="col-12 col-md-6">
                                <label for="nombre" class="form-label fw-semibold small text-muted text-uppercase mb-1">Nombre</label>
                                <div class="input-group input-group-sm">
                                    <span class="input-group-text bg-light border-end-0"><i class="fas fa-tag text-muted"></i></span>
                                    <input type="text" class="form-control bg-light" id="nombre" name="nombre" readonly>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="apellidos" class="form-label fw-semibold small text-muted text-uppercase mb-1">Apellidos</label>
                                <div class="input-group input-group-sm">
                                    <span class="input-group-text bg-light border-end-0"><i class="fas fa-tag text-muted"></i></span>
                                    <input type="text" class="form-control bg-light" id="apellidos" name="apellidos" readonly>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="referencia" class="form-label fw-semibold small text-muted text-uppercase mb-1">No. expediente</label>
                                <div class="input-group input-group-sm">
                                    <span class="input-group-text bg-light border-end-0"><i class="fas fa-hashtag text-muted"></i></span>
                                    <input type="text" class="form-control bg-light" id="referencia" name="referencia" readonly>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="telefono" class="form-label fw-semibold small text-muted text-uppercase mb-1">Teléfono</label>
                                <div class="input-group input-group-sm">
                                    <span class="input-group-text bg-light border-end-0"><i class="fas fa-phone text-muted"></i></span>
                                    <input type="text" class="form-control bg-light" id="telefono" name="telefono" readonly>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="fechaEntrega" class="form-label fw-semibold small text-muted text-uppercase mb-1">Fecha Otorgamiento</label>
                                <div class="input-group input-group-sm">
                                    <span class="input-group-text bg-light border-end-0"><i class="fas fa-calendar-alt text-muted"></i></span>
                                    <input type="date" class="form-control bg-light" id="fechaEntrega" name="fechaEntrega" readonly disabled>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sección 2: Datos del Expediente -->
                <div class="card border-0 shadow-sm">
                    <div class="card-header bg-transparent border-0 pt-4 px-4 pb-0">
                        <h5 class="fw-bold text-dark d-flex align-items-center">
                            <i class="fas fa-file-invoice-dollar text-primary me-2 fs-6"></i>
                            Información Financiera del Apoyo
                        </h5>
                        <p class="text-muted small mb-0">Detalles del crédito o apoyo solicitado.</p>
                    </div>
                    <div class="card-body p-4">
                        <div class="row g-4">
                            <!-- Fila 1: Monto y Entrega -->
                            <div class="col-12 col-md-12">
                                <label for="montoSolicitado" class="form-label fw-semibold small text-muted text-uppercase mb-1">Monto solicitado <span class="text-danger">*</span></label>
                                <div class="input-group input-group-sm">
                                    <span class="input-group-text"><i class="fas fa-dollar-sign text-success"></i></span>
                                    <input type="number" class="form-control fw-bold" id="montoSolicitado" name="montoSolicitado" step="0.01" min="0" required>
                                </div>
                            </div>

                            <!-- Fila 2: Inicio y Término -->
                            <div class="col-12 col-md-6">
                                <label for="fechaInicio" class="form-label fw-semibold small text-muted text-uppercase mb-1">Fecha inicio</label>
                                <div class="input-group input-group-sm">
                                    <span class="input-group-text"><i class="fas fa-calendar-check text-info"></i></span>
                                    <input type="date" class="form-control" id="fechaInicio" name="fechaInicio">
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="fechaTermino" class="form-label fw-semibold small text-muted text-uppercase mb-1">Fecha término</label>
                                <div class="input-group input-group-sm">
                                    <span class="input-group-text"><i class="fas fa-calendar-times text-danger"></i></span>
                                    <input type="date" class="form-control" id="fechaTermino" name="fechaTermino">
                                </div>
                            </div>

                            <hr class="opacity-10 my-1">

                            <!-- Fila 3: Cantidad Mensualidades y Extras -->
                            <div class="col-12 col-md-6">
                                <label for="cantidadDocumentosElaborados" class="form-label fw-semibold small text-muted text-uppercase mb-1">Cant. mensualidades <span class="text-danger">*</span></label>
                                <div class="input-group input-group-sm">
                                    <span class="input-group-text"><i class="fas fa-list-ol"></i></span>
                                    <input type="number" class="form-control" id="cantidadDocumentosElaborados" name="cantidadDocumentosElaborados" required>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="cantidadDocumentosExtraElaborados" class="form-label fw-semibold small text-muted text-uppercase mb-1">Cant. extras</label>
                                <div class="input-group input-group-sm">
                                    <span class="input-group-text"><i class="fas fa-plus"></i></span>
                                    <input type="number" class="form-control" id="cantidadDocumentosExtraElaborados" name="cantidadDocumentosExtraElaborados">
                                </div>
                            </div>

                            <!-- Fila 4: Montos Mensualidad y Extras -->
                            <div class="col-12 col-md-6">
                                <label for="montoDocumento" class="form-label fw-semibold small text-muted text-uppercase mb-1">Monto mensualidad</label>
                                <div class="input-group input-group-sm">
                                    <span class="input-group-text"><i class="fas fa-hand-holding-usd text-success"></i></span>
                                    <input type="number" class="form-control" id="montoDocumento" name="montoDocumento" step="0.01">
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="montoPorDocumentoExtra" class="form-label fw-semibold small text-muted text-uppercase mb-1">Monto extra</label>
                                <div class="input-group input-group-sm">
                                    <span class="input-group-text"><i class="fas fa-gift text-warning"></i></span>
                                    <input type="number" class="form-control" id="montoPorDocumentoExtra" name="montoPorDocumentoExtra" step="0.01">
                                </div>
                            </div>

                            <hr class="opacity-10 my-1">

                            <!-- Fila 5: Aportaciones Solidarias -->
                            <div class="col-12 col-md-6">
                                <label for="cantAportacionesSolidariasPactado" class="form-label fw-semibold small text-muted text-uppercase mb-1">Aportaciones pactadas</label>
                                <div class="input-group input-group-sm">
                                    <span class="input-group-text"><i class="fas fa-people-carry"></i></span>
                                    <input type="number" class="form-control" id="cantAportacionesSolidariasPactado" name="cantAportacionesSolidariasPactado">
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="montoAportacionSolidariaPactado" class="form-label fw-semibold small text-muted text-uppercase mb-1">Monto aportación</label>
                                <div class="input-group input-group-sm">
                                    <span class="input-group-text"><i class="fas fa-coins text-warning"></i></span>
                                    <input type="number" class="form-control" id="montoAportacionSolidariaPactado" name="montoAportacionSolidariaPactado" step="0.01">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Submit forms Footer -->
                    <div class="card-footer bg-transparent border-top p-4 d-flex justify-content-end">
                        <button type="submit" class="btn btn-dark px-4 py-2 fw-bold d-flex align-items-center shadow-sm" id="btn-guardar">
                            <i class="fas fa-save me-2 text-white-50"></i> Guardar Expediente
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>
<!-- Modal Actualizar Referencia (Se muestra si no hay fecha de crédito) -->
<div class="modal fade" id="modalActualizarReferencia" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow">
            <form id="form-actualizar-referencia">
                <div class="modal-header border-0 pb-0">
                    <h5 class="modal-title fw-semibold">
                        <i class="fas fa-edit text-primary me-2"></i>Completar Información de Crédito
                    </h5>
                </div>
                <div class="modal-body pt-2">
                    <p class="text-muted small">
                        Se detecta que la información de crédito del emprendedor <strong id="nombreEmprendedorRef"></strong> está incompleta (falta asignar la <strong>referencia</strong> o la <strong>fecha de otorgamiento</strong>). Es obligatorio completar ambos datos para gestionar su expediente.
                    </p>
                    <div class="mb-3">
                        <label for="numeroReferencia" class="form-label fw-bold small text-uppercase text-muted mb-1">
                            Número de Referencia
                        </label>
                        <div class="input-group input-group-sm">
                            <span class="input-group-text"><i class="fas fa-hashtag text-primary"></i></span>
                            <input type="text" class="form-control" id="numeroReferencia" name="numeroReferencia" placeholder="Ej. 123456" required>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="fechaOtorgamiento" class="form-label fw-bold small text-uppercase text-muted mb-1">
                            Fecha de Otorgamiento
                        </label>
                        <div class="input-group input-group-sm">
                            <span class="input-group-text"><i class="fas fa-calendar-alt text-primary"></i></span>
                            <input type="date" class="form-control" id="fechaOtorgamiento" name="fechaOtorgamiento" required>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0 pt-0">
                    <button type="button" class="btn btn-light btn-sm" id="btn-cancelar-modal">
                        <i class="fas fa-arrow-left me-2"></i>Regresar
                    </button>
                    <button type="submit" class="btn btn-primary btn-sm px-4 fw-bold" id="btnGuardarReferencia">
                        <i class="fas fa-check me-2"></i>Guardar e Iniciar Expediente
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

