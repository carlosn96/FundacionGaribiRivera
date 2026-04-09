<div class="container-fluid px-3 px-md-4 py-4">

    <!-- ============ HEADER ============ -->
    <div class="dashboard-header mb-4">
        <div class="header-identity-row" style="gap: 1rem;">
            <div class="avatar-ring cfg-header-avatar">
                <div class="avatar-placeholder"><i class="fas fa-file-signature"></i></div>
            </div>
            <div class="header-identity-info">
                <h3 class="mb-0 fw-bold">Configuración del Contrato</h3>
                <p class="text-muted small mb-0">Datos de la institución que se imprimen en el contrato y documentos oficiales.</p>
            </div>
        </div>
    </div>

    <form id="form-configuracion" onsubmit="guardarConfiguracionContrato(event)" novalidate>
        <div class="row g-4">

            <!-- ============ COLUMNA PRINCIPAL ============ -->
            <div class="col-12 col-lg-8">

                <!-- SECCIÓN: Identidad Legal -->
                <div class="card section-card mb-4">
                    <div class="card-header">
                        <h6><i class="fas fa-landmark me-2 icon-primary"></i>Identidad Legal</h6>
                    </div>
                    <div class="card-body">
                        <div class="form-section">
                            <div class="form-section-title">Datos institucionales que aparecen en el encabezado del contrato</div>
                            <div class="row g-3">
                                <div class="col-12">
                                    <label class="field-label">Nombre Legal de la Fundación <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="nombre_fundacion" name="nombre_fundacion"
                                        placeholder="Ej. Fundación Cardenal Garibi Rivera, A.C." required>
                                </div>
                                <div class="col-12">
                                    <label class="field-label">Representante Legal <span class="text-danger">*</span></label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-user-tie"></i></span>
                                        <input type="text" class="form-control" id="representante_legal" name="representante_legal"
                                            placeholder="Nombre completo del Representante Legal" required>
                                    </div>
                                    <div class="field-hint">Este nombre aparecerá en la firma y en las declaraciones del contrato.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- SECCIÓN: Domicilio de la Fundación -->
                <div class="card section-card mb-4">
                    <div class="card-header">
                        <h6><i class="fas fa-map-marker-alt me-2 icon-amber"></i>Domicilio Físico de la Fundación</h6>
                    </div>
                    <div class="card-body">

                        <div class="form-section">
                            <div class="form-section-title">Calle y número</div>
                            <div class="row g-3">
                                <div class="col-md-8">
                                    <label class="field-label">Calle <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="domicilio_calle" name="domicilio[calle]"
                                        placeholder="Nombre de la calle" required>
                                </div>
                                <div class="col-md-2">
                                    <label class="field-label">No. Exterior <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="domicilio_numero_exterior" name="domicilio[numero_exterior]"
                                        placeholder="4235" required>
                                </div>
                                <div class="col-md-2">
                                    <label class="field-label">No. Interior</label>
                                    <input type="text" class="form-control" id="domicilio_numero_interior" name="domicilio[numero_interior]"
                                        placeholder="A">
                                </div>
                            </div>
                        </div>

                        <div class="form-section">
                            <div class="form-section-title">Ubicación</div>
                            <div class="row g-3">
                                <div class="col-md-4">
                                    <label class="field-label">Colonia <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="domicilio_colonia" name="domicilio[colonia]"
                                        placeholder="Colonia" required>
                                </div>
                                <div class="col-md-2">
                                    <label class="field-label">C.P. <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="domicilio_codigo_postal" name="domicilio[codigo_postal]"
                                        placeholder="45580" required>
                                </div>
                                <div class="col-md-3">
                                    <label class="field-label">Municipio <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="domicilio_municipio" name="domicilio[municipio]"
                                        placeholder="Tlaquepaque" required>
                                </div>
                                <div class="col-md-3">
                                    <label class="field-label">Estado <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="domicilio_estado" name="domicilio[estado]"
                                        placeholder="Jalisco" required>
                                </div>
                            </div>
                        </div>

                        <div class="form-section">
                            <div class="form-section-title">Referencias adicionales</div>
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="field-label">Entre calles</label>
                                    <input type="text" class="form-control" id="domicilio_entre_calles" name="domicilio[entre_calles]"
                                        placeholder="Calle A y Calle B (opcional)">
                                </div>
                                <div class="col-md-6">
                                    <label class="field-label">Referencias</label>
                                    <input type="text" class="form-control" id="domicilio_referencias" name="domicilio[referencias]"
                                        placeholder="Puntos de referencia (opcional)">
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- SECCIÓN: Testigos -->
                <div class="card section-card mb-4">
                    <div class="card-header cfg-section-header">
                        <h6 class="mb-0"><i class="fas fa-users me-2 icon-indigo"></i>Testigos del Contrato</h6>
                        <button type="button" class="btn btn-sm btn-outline-primary" id="btnAgregarTestigo">
                            <i class="fas fa-plus me-1"></i>Agregar testigo
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="form-section">
                            <div class="form-section-title">Máximo 2 testigos. Opcionales — si no se configuran, no aparecerán en el contrato.</div>
                            <div id="contenedor-testigos"></div>
                        </div>
                    </div>
                </div>

            </div><!-- /col-lg-8 -->

            <!-- ============ SIDEBAR ============ -->
            <div class="col-12 col-lg-4">
                <div class="sidebar-summary sticky-top cfg-sidebar">
                    <div class="card-body p-4">
                        <h6 class="fw-bold text-muted text-uppercase mb-3 cfg-sidebar-title">
                            Previsualización
                        </h6>
                        <p class="text-muted small">
                            Los campos configurados aquí se utilizan directamente al generar el contrato.
                        </p>

                        <hr class="opacity-10 my-3">

                        <h6 class="fw-bold text-muted text-uppercase mb-3 cfg-sidebar-title">
                            Afecta en el contrato
                        </h6>
                        <div class="d-flex flex-column gap-2">
                            <div class="quick-action cfg-quick-info">
                                <i class="fas fa-landmark icon-box--pagos"></i>
                                Declaración I — Datos institucionales
                            </div>
                            <div class="quick-action cfg-quick-info">
                                <i class="fas fa-map-marker-alt icon-box--pagare"></i>
                                Domicilio y notificaciones
                            </div>
                            <div class="quick-action cfg-quick-info">
                                <i class="fas fa-signature icon-box--contrato"></i>
                                Sección de firmas
                            </div>
                        </div>

                        <hr class="opacity-10 my-3">

                        <button type="submit" class="btn btn-save w-100" id="btnGuardarConfiguracion">
                            <i class="fas fa-save me-2"></i>Guardar Configuración
                        </button>
                    </div>
                </div>
            </div><!-- /col-lg-4 -->

        </div><!-- /row -->
    </form>

</div>
