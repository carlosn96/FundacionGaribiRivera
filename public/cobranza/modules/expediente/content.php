<div class="container-fluid px-3 px-md-4 py-4">
    <!-- ============ HEADER DASHBOARD ============ -->
    <div class="dashboard-header mb-4" id="dashboard-header">
        <!-- Fila 1: Navegación y etapa -->
        <div class="header-nav-row">
            <button class="btn btn-sm btn-back" id="btn-cancelar" type="button">
                <i class="fas fa-arrow-left me-1"></i> Volver
            </button>
            <span class="badge-etapa" id="badge-etapa">Sin etapa</span>
        </div>
        <!-- Fila 2: Avatar + datos -->
        <div class="header-identity-row">
            <div class="avatar-ring">
                <img src="" alt="" id="foto-emprendedor" class="d-none">
                <div class="avatar-placeholder" id="icono-usuario"><i class="fas fa-user"></i></div>
            </div>
            <div class="header-identity-info">
                <h3 class="mb-0 fw-bold" id="nombre-completo-header">— —</h3>
                <div class="header-meta-row">
                    <div class="header-meta-item">
                        <div class="meta-label">N° Referencia</div>
                        <div class="meta-value" id="referencia-header">—</div>
                    </div>
                    <div class="header-meta-item">
                        <div class="meta-label">N° Expediente</div>
                        <div class="meta-value" id="num-expediente-header">—</div>
                    </div>
                    <div class="header-meta-item">
                        <div class="meta-label">Teléfono</div>
                        <div class="meta-value" id="telefono-header">—</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fila 3: Zona de peligro (solo visible cuando hay expediente) -->
        <div class="header-danger-row d-none" id="header-danger-zone">
            <button type="button" class="btn btn-danger-ghost d-none" id="btn-eliminar-expediente">
                <i class="fas fa-trash-alt me-1"></i>Eliminar Expediente
            </button>
        </div>
    </div>

    <div class="row g-3 g-md-4">
        <!-- ============ MAIN CONTENT ============ -->
        <div class="col-12 col-lg-8">
            <!-- TABS NAV -->
            <ul class="nav nav-tabs-dashboard mb-3 mb-md-4" id="dashboardTabs" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-datos" type="button" role="tab">
                        <i class="fas fa-user"></i><span class="tab-label"> Información</span>
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-financiero" type="button" role="tab">
                        <i class="fas fa-coins"></i><span class="tab-label"> Financiero</span>
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-aval" type="button" role="tab">
                        <i class="fas fa-user-shield"></i><span class="tab-label"> Aval</span>
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-inmueble" type="button" role="tab">
                        <i class="fas fa-home"></i><span class="tab-label"> Inmueble</span>
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-resumen" type="button" role="tab">
                        <i class="fas fa-file-alt"></i><span class="tab-label"> Resumen</span>
                    </button>
                </li>
            </ul>

            <!-- TABS CONTENT -->
            <div class="tab-content">
                <!-- ======== TAB: DATOS PERSONALES + DOMICILIOS ======== -->
                <div class="tab-pane fade show active" id="tab-datos" role="tabpanel">
                    <!-- Domicilio Personal (readonly, de línea base) -->
                    <div class="card section-card mb-3">
                        <div class="card-header">
                            <h6><i class="fas fa-map-marker-alt me-2" style="color:var(--bs-primary)"></i>Domicilio Personal</h6>
                            <span class="section-badge">Solo lectura</span>
                        </div>
                        <div class="card-body">
                            <div class="info-grid">
                                <div class="info-field info-field--wide">
                                    <div class="field-label">Calle</div>
                                    <div class="field-value" id="dom-personal-calle">—</div>
                                </div>
                                <div class="info-field">
                                    <div class="field-label">No. Exterior</div>
                                    <div class="field-value" id="dom-personal-ext">—</div>
                                </div>
                                <div class="info-field">
                                    <div class="field-label">No. Interior</div>
                                    <div class="field-value" id="dom-personal-int">—</div>
                                </div>
                                <div class="info-field info-field--wide">
                                    <div class="field-label">Entre calles</div>
                                    <div class="field-value" id="dom-personal-cruces">—</div>
                                </div>
                                <div class="info-field">
                                    <div class="field-label">C.P.</div>
                                    <div class="field-value" id="dom-personal-cp">—</div>
                                </div>
                                <div class="info-field info-field--wide">
                                    <div class="field-label">Colonia</div>
                                    <div class="field-value" id="dom-personal-colonia">—</div>
                                </div>
                                <div class="info-field">
                                    <div class="field-label">Municipio</div>
                                    <div class="field-value" id="dom-personal-municipio">—</div>
                                </div>
                                <div class="info-field">
                                    <div class="field-label">Estado</div>
                                    <div class="field-value" id="dom-personal-estado">—</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Domicilio del Negocio (readonly, de línea base) -->
                    <div class="card section-card">
                        <div class="card-header">
                            <h6><i class="fas fa-store me-2" style="color:#16a34a"></i>Domicilio del Negocio</h6>
                            <span class="section-badge">Solo lectura</span>
                        </div>
                        <div class="card-body">
                            <div class="info-grid">
                                <div class="info-field info-field--wide">
                                    <div class="field-label">Nombre del Negocio</div>
                                    <div class="field-value" id="dom-negocio-nombre">—</div>
                                </div>
                                <div class="info-field">
                                    <div class="field-label">Teléfono</div>
                                    <div class="field-value" id="dom-negocio-tel">—</div>
                                </div>
                                <div class="info-field info-field--separator"></div>
                                <div class="info-field info-field--wide">
                                    <div class="field-label">Calle</div>
                                    <div class="field-value" id="dom-negocio-calle">—</div>
                                </div>
                                <div class="info-field">
                                    <div class="field-label">No. Exterior</div>
                                    <div class="field-value" id="dom-negocio-ext">—</div>
                                </div>
                                <div class="info-field">
                                    <div class="field-label">No. Interior</div>
                                    <div class="field-value" id="dom-negocio-int">—</div>
                                </div>
                                <div class="info-field info-field--wide">
                                    <div class="field-label">Entre calles</div>
                                    <div class="field-value" id="dom-negocio-cruces">—</div>
                                </div>
                                <div class="info-field">
                                    <div class="field-label">C.P.</div>
                                    <div class="field-value" id="dom-negocio-cp">—</div>
                                </div>
                                <div class="info-field info-field--wide">
                                    <div class="field-label">Colonia</div>
                                    <div class="field-value" id="dom-negocio-colonia">—</div>
                                </div>
                                <div class="info-field">
                                    <div class="field-label">Municipio</div>
                                    <div class="field-value" id="dom-negocio-municipio">—</div>
                                </div>
                                <div class="info-field">
                                    <div class="field-label">Estado</div>
                                    <div class="field-value" id="dom-negocio-estado">—</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ======== TAB: DATOS DEL AVAL ======== -->
                <div class="tab-pane fade" id="tab-aval" role="tabpanel">
                    <div class="card section-card">
                        <div class="card-header">
                            <h6><i class="fas fa-user-shield me-2" style="color:#6366f1"></i>Datos del Aval</h6>
                        </div>
                        <div class="card-body">
                            <form id="form-aval" novalidate>

                                <!-- Sección: Identificación -->
                                <div class="form-section">
                                    <div class="form-section-title">Identificación del Aval</div>
                                    <div class="row g-3">
                                        <div class="col-md-9">
                                            <label class="field-label">Nombre Completo <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" id="aval-nombre" name="nombreCompleto" required>
                                        </div>
                                        <div class="col-md-3">
                                            <label class="field-label">Edad <span class="text-danger">*</span></label>
                                            <input type="number" class="form-control" id="aval-edad" name="edad" min="1" max="120" required>
                                        </div>
                                        <div class="col-md-4">
                                            <label class="field-label">Parentesco <span class="text-danger">*</span></label>
                                            <select class="form-select" id="aval-parentesco" name="idParentesco" required>
                                                <option value="">Seleccionar...</option>
                                            </select>
                                        </div>
                                        
                                        <div class="col-md-4">
                                            <label class="field-label">Celular <span class="text-danger">*</span></label>
                                            <div class="input-group">
                                                <span class="input-group-text"><i class="fas fa-mobile-alt"></i></span>
                                                <input type="tel" maxlength="15" class="form-control" id="aval-celular" name="celular" required>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <label class="field-label">Tel. Fijo</label>
                                            <div class="input-group">
                                                <span class="input-group-text"><i class="fas fa-phone"></i></span>
                                                <input type="tel" maxlength="15" class="form-control" id="aval-telfijo" name="telFijo">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Sección: Domicilio -->
                                <div class="form-section">
                                    <div class="form-section-title">Domicilio del Aval</div>
                                    <div class="row g-3">
                                        <div class="col-md-6">
                                            <label class="field-label">Calle <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" id="aval-calle" name="calle" required>
                                        </div>
                                        <div class="col-md-3">
                                            <label class="field-label">No. Exterior <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" id="aval-ext" name="numeroExterior" required>
                                        </div>
                                        <div class="col-md-3">
                                            <label class="field-label">No. Interior</label>
                                            <input type="text" class="form-control" id="aval-int" name="numeroInterior">
                                        </div>
                                        <div class="col-12">
                                            <label class="field-label">Entre las calles <span class="text-danger">*</span></label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="aval-cruce1" name="calleCruce1" placeholder="Primera calle" required>
                                                <span class="input-group-text text-muted" style="font-size:0.7rem;">y</span>
                                                <input type="text" class="form-control" id="aval-cruce2" name="calleCruce2" placeholder="Segunda calle" required>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <label class="field-label">C.P. <span class="text-danger">*</span></label>
                                            <select class="form-select" id="aval-cp" name="idCodigoPostal" required>
                                                <option value="">Seleccionar...</option>
                                            </select>
                                        </div>
                                        <div class="col-md-4">
                                            <label class="field-label">Colonia <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" id="aval-colonia" name="colonia" required>
                                        </div>
                                        <div class="col-md-4">
                                            <label class="field-label">Municipio</label>
                                            <input type="text" class="form-control input-readonly" id="aval-municipio" readonly>
                                        </div>
                                        <div class="col-md-4">
                                            <label class="field-label">Estado</label>
                                            <input type="text" class="form-control input-readonly" id="aval-estado" readonly>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-footer">
                                    <button type="submit" class="btn btn-save" id="btn-guardar-aval">
                                        <i class="fas fa-save me-2"></i>Guardar Aval
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- ======== TAB: INMUEBLE EN GARANTÍA ======== -->
                <div class="tab-pane fade" id="tab-inmueble" role="tabpanel">
                    <div class="card section-card">
                        <div class="card-header">
                            <h6><i class="fas fa-home me-2" style="color:#d97706"></i>Domicilio del Inmueble en Garantía</h6>
                        </div>
                        <div class="card-body">
                            <form id="form-inmueble" novalidate>

                                <!-- Sección: Ubicación -->
                                <div class="form-section">
                                    <div class="form-section-title">Ubicación del Inmueble</div>
                                    <div class="row g-3">
                                        <div class="col-md-6">
                                            <label class="field-label">Calle <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" id="inmueble-calle" name="calle" required>
                                        </div>
                                        <div class="col-md-3">
                                            <label class="field-label">No. Exterior <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" id="inmueble-ext" name="numeroExterior" required>
                                        </div>
                                        <div class="col-md-3">
                                            <label class="field-label">No. Interior</label>
                                            <input type="text" class="form-control" id="inmueble-int" name="numeroInterior">
                                        </div>
                                        <div class="col-12">
                                            <label class="field-label">Entre las calles <span class="text-danger">*</span></label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="inmueble-cruce1" name="calleCruce1" placeholder="Primera calle" required>
                                                <span class="input-group-text text-muted" style="font-size:0.7rem;">y</span>
                                                <input type="text" class="form-control" id="inmueble-cruce2" name="calleCruce2" placeholder="Segunda calle" required>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <label class="field-label">C.P. <span class="text-danger">*</span></label>
                                            <select class="form-select" id="inmueble-cp" name="idCodigoPostal" required>
                                                <option value="">Seleccionar...</option>
                                            </select>
                                        </div>
                                        <div class="col-md-4">
                                            <label class="field-label">Colonia <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" id="inmueble-colonia" name="colonia" required>
                                        </div>
                                        <div class="col-md-4">
                                            <label class="field-label">Municipio</label>
                                            <input type="text" class="form-control input-readonly" id="inmueble-municipio" readonly>
                                        </div>
                                        <div class="col-md-4">
                                            <label class="field-label">Estado</label>
                                            <input type="text" class="form-control input-readonly" id="inmueble-estado" readonly>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-footer">
                                    <button type="submit" class="btn btn-save" id="btn-guardar-inmueble">
                                        <i class="fas fa-save me-2"></i>Guardar Inmueble
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- ======== TAB: RESUMEN EJECUTIVO ======== -->
                <div class="tab-pane fade" id="tab-resumen" role="tabpanel">
                    <div class="card section-card">
                        <div class="card-header">
                            <h6><i class="fas fa-file-alt me-2" style="color:#0891b2"></i>Resumen Ejecutivo del Préstamo</h6>
                        </div>
                        <div class="card-body">
                            <form id="form-resumen" novalidate>

                                <!-- ── BLOQUE 1: Identificación del Proyecto ── -->
                                <div class="form-section">
                                    <div class="form-section-title">
                                        <i class="fas fa-lightbulb" style="color:#f59e0b"></i>
                                        Identificación del Proyecto
                                    </div>
                                    <div class="row g-3">
                                        <div class="col-md-8">
                                            <label class="field-label">Nombre del Proyecto <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" id="resumen-nombre-proyecto" name="nombreProyecto" placeholder="Ej. Panadería Artesanal San Rafael" required>
                                        </div>
                                        <div class="col-md-4">
                                            <label class="field-label">Viabilidad <span class="text-danger">*</span></label>
                                            <select class="form-select" id="resumen-viabilidad" name="idViabilidad" required>
                                                <option value="">— Seleccione —</option>
                                            </select>
                                        </div>
                                        <div class="col-12">
                                            <label class="field-label">Descripción del Proyecto <span class="text-danger">*</span></label>
                                            <textarea class="form-control" id="resumen-proyecto" name="resumenProyecto" rows="3" placeholder="Describe brevemente el proyecto, su actividad y alcance..." required></textarea>
                                        </div>
                                    </div>
                                </div>

                                <!-- ── BLOQUE 2: Análisis Financiero ── -->
                                <div class="form-section">
                                    <div class="form-section-title">
                                        <i class="fas fa-chart-bar" style="color:#16a34a"></i>
                                        Análisis Financiero
                                    </div>

                                    <!-- Métricas monetarias como tarjetas destacadas -->
                                    <div class="presupuesto-grid mb-3">
                                        <div class="presupuesto-item">
                                            <div class="presupuesto-label">Importe Solicitado <span class="text-danger">*</span></div>
                                            <div class="input-group input-group-sm">
                                                <span class="input-group-text">$</span>
                                                <input type="number" class="form-control" id="resumen-importe-solicitado" name="importeSolicitado" step="0.01" placeholder="0.00" required>
                                            </div>
                                        </div>
                                        <div class="presupuesto-item">
                                            <div class="presupuesto-label">Inversión Emprendedor <span class="text-danger">*</span></div>
                                            <div class="input-group input-group-sm">
                                                <span class="input-group-text">$</span>
                                                <input type="number" class="form-control" id="resumen-inversion" name="inversionEmprendedor" step="0.01" placeholder="0.00" required>
                                            </div>
                                        </div>
                                        <div class="presupuesto-item">
                                            <div class="presupuesto-label">Sugerido por Coordinador <span class="text-danger">*</span></div>
                                            <div class="input-group input-group-sm">
                                                <span class="input-group-text">$</span>
                                                <input type="number" class="form-control" id="resumen-sugerido" name="importeSugeridoCoordinador" step="0.01" placeholder="0.00" required>
                                            </div>
                                        </div>
                                        <div class="presupuesto-item presupuesto-item--aprobado">
                                            <div class="presupuesto-label">Monto Aprobado</div>
                                            <div class="input-group input-group-sm">
                                                <span class="input-group-text">$</span>
                                                <input type="number" class="form-control input-readonly fw-bold" id="resumen-aprobado" readonly placeholder="—">
                                            </div>
                                            <div class="field-hint mt-1">Tomado del expediente financiero</div>
                                        </div>
                                    </div>
                                </div>

                                <!-- ── BLOQUE 3: Diagnóstico Social ── -->
                                <div class="form-section">
                                    <div class="form-section-title">
                                        <i class="fas fa-user-md" style="color:#6366f1"></i>
                                        Diagnóstico Social
                                    </div>

                                    <!-- Tarjeta de dictamen destacada -->
                                    <div class="diagnostico-card mb-3">
                                        <div class="row g-3 align-items-end">
                                            <div class="col-md-4">
                                                <label class="field-label">Resultado del Diagnóstico <span class="text-danger">*</span></label>
                                                <select class="form-select diagnostico-select" id="resumen-diagnostico" name="idDiagnosticoSocial" required>
                                                    <option value="">— Seleccione —</option>
                                                </select>
                                            </div>
                                            <div class="col-md-8">
                                                <label class="field-label">Nivel de Vulnerabilidad <span class="text-danger">*</span></label>
                                                <select class="form-select" id="resumen-vulnerabilidad" name="idVulnerabilidad" required>
                                                    <option value="">— Seleccione —</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row g-3 mb-3">
                                        <div class="col-12">
                                            <label class="field-label">Observaciones del Diagnóstico <span class="text-danger">*</span></label>
                                            <textarea class="form-control" id="resumen-observaciones" name="observaciones" rows="2" placeholder="Notas adicionales del diagnóstico social..." required></textarea>
                                        </div>
                                    </div>

                                    <!-- Responsables moved here -->
                                    <div class="row g-3">
                                        <div class="col-md-6">
                                            <label class="field-label">Quién otorga el diagnóstico <span class="text-danger">*</span></label>
                                            <div class="input-group">
                                                <span class="input-group-text text-muted"><i class="fas fa-user-md"></i></span>
                                                <input type="text" class="form-control" id="resumen-quien-diagnostico" name="quienOtorgaDiagnostico" placeholder="Nombre del trabajador social" required>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="field-label">Aprobado por Auxiliar de Dirección <span class="text-danger">*</span></label>
                                            <div class="input-group">
                                                <span class="input-group-text text-muted"><i class="fas fa-user-check"></i></span>
                                                <input type="text" class="form-control" id="resumen-aprobado-por" name="aprobadoPorAuxiliarDireccion" placeholder="Nombre del auxiliar" required>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-footer">
                                    <button type="submit" class="btn btn-save" id="btn-guardar-resumen">
                                        <i class="fas fa-save me-2"></i>Guardar Resumen
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- ======== TAB: FINANCIERO (expediente original) ======== -->
                <div class="tab-pane fade" id="tab-financiero" role="tabpanel">
                    <div class="card section-card">
                        <div class="card-header">
                            <h6><i class="fas fa-coins me-2" style="color:#16a34a"></i>Información Financiera del Apoyo</h6>
                        </div>
                        <div class="card-body">
                            <form id="form-expediente" novalidate>

                                <!-- Sección: Datos Generales -->
                                <div class="form-section">
                                    <div class="form-section-title">Datos Generales</div>
                                    <div class="row g-3">
                                        <div class="col-md-4">
                                            <label class="field-label">N° Expediente</label>
                                            <input type="text" class="form-control" id="numeroExpediente" name="numeroExpediente" placeholder="Ej. 001-2026" required>
                                        </div>
                                        <div class="col-md-4">
                                            <label class="field-label">Fecha Otorgamiento</label>
                                            <input type="date" class="form-control input-readonly" id="fechaEntrega" readonly disabled>
                                        </div>
                                        <div class="col-md-4">
                                            <label class="field-label">Monto Solicitado <span class="text-danger">*</span></label>
                                            <div class="input-group">
                                                <span class="input-group-text text-success"><i class="fas fa-dollar-sign"></i></span>
                                                <input type="number" class="form-control fw-bold" id="montoSolicitado" name="montoSolicitado" step="0.01" min="0" required>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Sección: Plazos y Vigencia -->
                                <div class="form-section">
                                    <div class="form-section-title">Plazos y Vigencia</div>
                                    <div class="row g-3">
                                        <div class="col-md-6">
                                            <label class="field-label">Fecha Inicio</label>
                                            <input type="date" class="form-control" id="fechaInicio" name="fechaInicio">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="field-label">Fecha Término</label>
                                            <input type="date" class="form-control" id="fechaTermino" name="fechaTermino">
                                        </div>
                                    </div>
                                </div>

                                <!-- Sección: Estructura de Pagos -->
                                <div class="form-section">
                                    <div class="form-section-title">Mensualidades</div>
                                    <div class="row g-3">
                                        <div class="col-md-4">
                                            <label class="field-label">Cant. Mensualidades <span class="text-danger">*</span></label>
                                            <input type="number" class="form-control" id="cantidadDocumentosElaborados" name="cantidadDocumentosElaborados" min="0" required>
                                        </div>
                                        <div class="col-md-4">
                                            <label class="field-label">Monto por Mensualidad</label>
                                            <div class="input-group">
                                                <span class="input-group-text">$</span>
                                                <input type="number" class="form-control" id="montoDocumento" name="montoDocumento" step="0.01" min="0">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <label class="field-label">Total Mensualidades</label>
                                            <div class="input-group">
                                                <span class="input-group-text text-muted"><i class="fas fa-calculator"></i></span>
                                                <input type="number" class="form-control input-readonly fw-bold" id="totalMensualidades" readonly placeholder="Calculado">
                                            </div>
                                            <div class="field-hint">Cant. × Monto mensualidad</div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Sección: Pagos Extra y Aportaciones -->
                                <div class="form-section">
                                    <div class="form-section-title">Extras y Aportaciones Solidarias</div>
                                    <div class="row g-3">
                                        <!-- Fila 1: Extras -->
                                        <div class="col-md-4">
                                            <label class="field-label">Cant. Extras</label>
                                            <input type="number" class="form-control" id="cantidadDocumentosExtraElaborados" name="cantidadDocumentosExtraElaborados" min="0">
                                        </div>
                                        <div class="col-md-4">
                                            <label class="field-label">Monto Extra</label>
                                            <div class="input-group">
                                                <span class="input-group-text">$</span>
                                                <input type="number" class="form-control" id="montoPorDocumentoExtra" name="montoPorDocumentoExtra" step="0.01" min="0">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <label class="field-label">Total Extras</label>
                                            <div class="input-group">
                                                <span class="input-group-text text-muted"><i class="fas fa-calculator"></i></span>
                                                <input type="number" class="form-control input-readonly fw-bold" id="totalExtras" readonly placeholder="Calculado">
                                            </div>
                                            <div class="field-hint">Cant. × Monto extra</div>
                                        </div>

                                        <!-- Fila 2: Aportaciones -->
                                        <div class="col-md-4">
                                            <label class="field-label">Aportaciones Pactadas</label>
                                            <input type="number" class="form-control" id="cantAportacionesSolidariasPactado" name="cantAportacionesSolidariasPactado" min="0">
                                        </div>
                                        <div class="col-md-4">
                                            <label class="field-label">Monto Aportación</label>
                                            <div class="input-group">
                                                <span class="input-group-text">$</span>
                                                <input type="number" class="form-control" id="montoAportacionSolidariaPactado" name="montoAportacionSolidariaPactado" step="0.01" min="0">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <label class="field-label">Total Aportaciones</label>
                                            <div class="input-group">
                                                <span class="input-group-text text-muted"><i class="fas fa-calculator"></i></span>
                                                <input type="number" class="form-control input-readonly fw-bold" id="totalAportaciones" readonly placeholder="Calculado">
                                            </div>
                                            <div class="field-hint">Cant. × Monto aportación</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-footer">
                                    <button type="submit" class="btn btn-save" id="btn-guardar">
                                        <i class="fas fa-save me-2"></i>Guardar Información Financiera
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div><!-- /.tab-content -->
        </div>

        <!-- ============ SIDEBAR ============ -->
        <div class="col-12 col-lg-4">
            <div class="sidebar-summary sticky-top" style="top:24px; z-index:1;">
                <div class="card-body p-4">
                    <h6 class="fw-bold text-muted text-uppercase mb-3" style="font-size:0.72rem; letter-spacing:0.08em;">Resumen del Crédito</h6>
                    <div class="summary-row">
                        <span class="text-muted small fw-semibold">Monto Solicitado</span>
                        <span class="fw-bold" id="resumen-monto">$0.00</span>
                    </div>
                    <div class="summary-row">
                        <span class="text-muted small fw-semibold">Mensualidades</span>
                        <span class="fw-bold" id="resumen-mensualidades">0</span>
                    </div>
                    <div class="summary-row">
                        <span class="text-muted small fw-semibold">Diagnóstico</span>
                        <span class="status-badge status-badge--secondary" id="resumen-diagnostico-badge">Sin dictamen</span>
                    </div>

                    <hr class="opacity-10 my-3">
                    <h6 class="fw-bold text-muted text-uppercase mb-3" style="font-size:0.72rem; letter-spacing:0.08em;">Accesos Rápidos</h6>

                    <div class="d-flex flex-column gap-2">
                        <a href="javascript:void(0);" class="quick-action d-none" id="link-pagos">
                            <i class="fas fa-wallet icon-box--pagos"></i> Administración de Pagos
                        </a>
                        <a href="javascript:void(0);" class="quick-action" id="link-pagare" style="opacity:0.5; pointer-events: none;">
                            <i class="fas fa-file-signature icon-box--pagare"></i>
                            Pagaré <span class="status-badge status-badge--secondary ms-auto" id="badge-pagare">Bloqueado</span>
                        </a>
                        <a href="javascript:void(0);" class="quick-action" id="link-contrato" style="opacity:0.5; pointer-events: none;">
                            <i class="fas fa-file-contract icon-box--contrato"></i>
                            Contrato <span class="status-badge status-badge--secondary ms-auto" id="badge-contrato">Bloqueado</span>
                        </a>
                        <a href="javascript:void(0);" class="quick-action" id="link-tarjeta" style="opacity:0.5; pointer-events: none;">
                            <i class="fas fa-file-invoice-dollar icon-box--tarjeta" style="color:var(--bs-teal); background-color:rgba(32, 201, 151, 0.1);"></i>
                            Tarjeta de Pagos <span class="status-badge status-badge--secondary ms-auto" id="badge-tarjeta">Bloqueado</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>

    </div><!-- /.row -->
</div>

<!-- Modal Actualizar Referencia -->
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
                        Se detecta que la información de <strong id="nombreEmprendedorRef"></strong> está incompleta. Es obligatorio completar la <strong>referencia</strong> y la <strong>fecha de otorgamiento</strong>.
                    </p>
                    <div class="mb-3">
                        <label for="numeroReferencia" class="field-label">Número de Referencia</label>
                        <input type="text" class="form-control form-control-sm" id="numeroReferencia" name="numeroReferencia" required>
                    </div>
                    <div class="mb-3">
                        <label for="fechaOtorgamiento" class="field-label">Fecha de Otorgamiento</label>
                        <input type="date" class="form-control form-control-sm" id="fechaOtorgamiento" name="fechaOtorgamiento" required>
                    </div>
                </div>
                <div class="modal-footer border-0 pt-0">
                    <button type="button" class="btn btn-light btn-sm" id="btn-cancelar-modal"><i class="fas fa-arrow-left me-2"></i>Regresar</button>
                    <button type="submit" class="btn btn-primary btn-sm px-4 fw-bold" id="btnGuardarReferencia"><i class="fas fa-check me-2"></i>Guardar e Iniciar</button>
                </div>
            </form>
        </div>
    </div>
</div>
