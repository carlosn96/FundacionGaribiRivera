<!-- Registro de Asistencia a Talleres — Panel Único -->
<div class="container-fluid py-4">
    <div class="row">
        <div class="col-12">
            <div class="card border-0 shadow-sm">

                <!-- ═══════════ HEADER + FILTROS ═══════════ -->
                <div class="card-header bg-white border-bottom py-3">
                    <div class="row align-items-end g-3">
                        <!-- Título -->
                        <div class="col-12">
                            <div class="d-flex align-items-center mb-3">
                                <div class="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                                    <i class="ti ti-clipboard-check fs-4 text-primary"></i>
                                </div>
                                <div>
                                    <h4 class="mb-0 fw-bold">Registro de Asistencia</h4>
                                    <small class="text-muted">Selecciona una etapa y un taller para comenzar</small>
                                </div>
                                <!-- Indicador de cambios sin guardar -->
                                <span class="badge bg-warning text-dark ms-auto d-none" id="unsavedBadge">
                                    <i class="ti ti-alert-triangle me-1"></i>Sin guardar
                                </span>
                            </div>
                        </div>

                        <!-- Step 1: Etapa -->
                        <div class="col-lg-5">
                            <label class="form-label small fw-semibold text-uppercase text-muted mb-1"
                                style="letter-spacing:0.05em;">
                                <span class="badge bg-primary rounded-circle me-1"
                                    style="width:20px;height:20px;font-size:0.65rem;line-height:14px;">1</span>
                                Etapa Formativa
                            </label>
                            <select class="form-select" id="etapaSelect" style="width: 100%;"
                                data-placeholder="-- Selecciona una etapa --">
                                <option value=""></option>
                            </select>
                        </div>

                        <!-- Step 2: Taller -->
                        <div class="col-lg-5">
                            <label class="form-label small fw-semibold text-uppercase text-muted mb-1"
                                style="letter-spacing:0.05em;">
                                <span class="badge bg-primary rounded-circle me-1"
                                    style="width:20px;height:20px;font-size:0.65rem;line-height:14px;">2</span>
                                Taller
                            </label>
                            <div class="input-group">
                                <select class="form-select" id="tallerSelect" disabled>
                                    <option selected disabled>-- Esperando etapa --</option>
                                </select>
                                <span class="input-group-text d-none bg-white border-start-0" id="tallerSpinner">
                                    <div class="spinner-border spinner-border-sm text-primary" role="status">
                                        <span class="visually-hidden">Cargando...</span>
                                    </div>
                                </span>
                            </div>
                        </div>

                        <!-- Step 3 indicator -->
                        <div class="col-lg-2 d-none d-lg-flex align-items-end">
                            <div class="text-center w-100 pb-2">
                                <span class="badge bg-primary rounded-circle mb-1"
                                    style="width:20px;height:20px;font-size:0.65rem;line-height:14px;">3</span>
                                <div class="small text-muted fw-semibold">Registrar</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ═══════════ KPI STRIP ═══════════ -->
                <div class="bg-light border-bottom px-4 py-2" id="kpiStrip" style="display:none;">
                    <div class="row g-2 align-items-center">
                        <div class="col-6 col-md-3">
                            <div class="d-flex align-items-center gap-2">
                                <div class="bg-primary bg-opacity-10 rounded p-1 d-flex align-items-center justify-content-center"
                                    style="width:32px;height:32px;">
                                    <i class="ti ti-users text-primary"></i>
                                </div>
                                <div>
                                    <div class="fw-bold text-dark" id="totalEmprendedores">0</div>
                                    <div class="text-muted" style="font-size:0.7rem;">Total</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="d-flex align-items-center gap-2">
                                <div class="bg-success bg-opacity-10 rounded p-1 d-flex align-items-center justify-content-center"
                                    style="width:32px;height:32px;">
                                    <i class="ti ti-user-check text-success"></i>
                                </div>
                                <div>
                                    <div class="fw-bold text-success" id="totalAsistentes">0</div>
                                    <div class="text-muted" style="font-size:0.7rem;">Asistentes</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="d-flex align-items-center gap-2">
                                <div class="bg-danger bg-opacity-10 rounded p-1 d-flex align-items-center justify-content-center"
                                    style="width:32px;height:32px;">
                                    <i class="ti ti-user-minus text-danger"></i>
                                </div>
                                <div>
                                    <div class="fw-bold text-danger" id="totalAusentes">0</div>
                                    <div class="text-muted" style="font-size:0.7rem;">Ausentes</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="d-flex align-items-center gap-2 flex-grow-1">
                                <div class="w-100">
                                    <div class="d-flex justify-content-between align-items-center mb-1">
                                        <span class="text-muted" style="font-size:0.7rem;">Asistencia</span>
                                        <span class="fw-bold text-primary small" id="porcentajeAsistencia">0%</span>
                                    </div>
                                    <div class="progress" style="height: 6px;">
                                        <div class="progress-bar bg-primary" role="progressbar"
                                            style="width: 0%; transition: width 0.4s ease;" id="progressBar"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ═══════════ TOOLBAR: BUSCAR + FILTRAR ═══════════ -->
                <div class="px-4 py-2 border-bottom bg-white" id="toolbar" style="display:none;">
                    <div class="row g-2 align-items-center">
                        <div class="col-md-6 col-lg-5">
                            <div class="input-group input-group-sm">
                                <span class="input-group-text bg-white border-end-0">
                                    <i class="ti ti-search text-muted"></i>
                                </span>
                                <input type="text" class="form-control border-start-0 ps-0" id="searchInput"
                                    placeholder="Buscar por nombre..." aria-label="Buscar emprendedor">
                            </div>
                        </div>
                        <div class="col-md-3 col-lg-3">
                            <select class="form-select form-select-sm" id="filterEstado"
                                aria-label="Filtrar por estado">
                                <option value="todos">Todos</option>
                                <option value="asistentes">Solo Asistentes</option>
                                <option value="ausentes">Solo Ausentes</option>
                            </select>
                        </div>
                        <div class="col-md-3 col-lg-4 text-end">
                            <div class="form-check form-switch d-inline-flex align-items-center gap-2 m-0">
                                <input class="form-check-input" type="checkbox" role="switch" id="selectAllCheckbox"
                                    aria-label="Seleccionar todos">
                                <label class="form-check-label small text-muted" for="selectAllCheckbox">Seleccionar
                                    todos</label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ═══════════ TABLE ═══════════ -->
                <div class="table-responsive" style="max-height: 450px; overflow-y: auto;">
                    <table class="table table-hover align-middle mb-0" role="grid" aria-label="Lista de asistencia">
                        <thead>
                            <tr class="text-uppercase small text-muted" style="letter-spacing: 0.05em; display:none;"
                                id="tableHead">
                                <th class="border-0 ps-4 fw-semibold" style="width: 45px;">#</th>
                                <th class="border-0 fw-semibold">Emprendedor</th>
                                <th class="border-0 fw-semibold d-none d-lg-table-cell">Contacto</th>
                                <th class="border-0 text-center fw-semibold" style="width: 150px;">Asistencia</th>
                            </tr>
                        </thead>
                        <tbody id="asistenciaTbody">
                            <!-- Empty state on load -->
                            <tr id="emptyState">
                                <td colspan="4" class="text-center py-5 border-0">
                                    <div class="d-flex flex-column align-items-center">
                                        <div class="bg-primary bg-opacity-10 rounded-circle p-4 mb-3">
                                            <i class="ti ti-clipboard-list text-primary" style="font-size: 2.5rem;"></i>
                                        </div>
                                        <h6 class="text-muted mb-1">Selecciona una etapa y un taller</h6>
                                        <p class="text-muted small mb-3">La lista de emprendedores aparecerá aquí</p>
                                        <div class="d-flex gap-2">
                                            <span class="badge bg-light text-muted border">
                                                <span class="badge bg-primary rounded-circle me-1"
                                                    style="width:16px;height:16px;font-size:0.55rem;line-height:10px;">1</span>
                                                Etapa
                                            </span>
                                            <i class="ti ti-arrow-right text-muted small align-self-center"></i>
                                            <span class="badge bg-light text-muted border">
                                                <span class="badge bg-primary rounded-circle me-1"
                                                    style="width:16px;height:16px;font-size:0.55rem;line-height:10px;">2</span>
                                                Taller
                                            </span>
                                            <i class="ti ti-arrow-right text-muted small align-self-center"></i>
                                            <span class="badge bg-light text-muted border">
                                                <span class="badge bg-primary rounded-circle me-1"
                                                    style="width:16px;height:16px;font-size:0.55rem;line-height:10px;">3</span>
                                                Registrar
                                            </span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Row Template (outside tbody) -->
                <template id="emprendedorRowTemplate">
                    <tr class="emprendedor-row" style="transition: background-color 0.15s ease;" data-nombre="">
                        <td class="border-0 ps-4 text-muted small emprendedor-num"></td>
                        <td class="border-0">
                            <div class="d-flex align-items-center py-1">
                                <div class="flex-shrink-0 me-3 position-relative">
                                    <div class="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center emprendedor-avatar-fallback"
                                        style="width: 40px; height: 40px;">
                                        <i class="ti ti-user text-primary"></i>
                                    </div>
                                    <img src="" class="rounded-circle object-fit-cover emprendedor-foto d-none"
                                        style="width: 40px; height: 40px; border: 2px solid var(--bs-primary-bg-subtle);"
                                        alt="Foto" loading="lazy">
                                </div>
                                <div class="min-width-0">
                                    <div class="fw-semibold text-dark text-truncate emprendedor-nombre"
                                        style="max-width: 250px;"></div>
                                    <div class="small text-muted d-lg-none emprendedor-contacto-mobile">
                                        <span class="d-inline-flex align-items-center gap-1">
                                            <i class="ti ti-mail" style="font-size: 0.7rem;"></i>
                                            <span class="emprendedor-email-sm text-truncate"
                                                style="max-width: 150px;"></span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="border-0 d-none d-lg-table-cell">
                            <div class="d-flex flex-column gap-0">
                                <span class="small text-muted d-inline-flex align-items-center gap-1">
                                    <i class="ti ti-mail" style="font-size: 0.75rem;"></i>
                                    <span class="emprendedor-email text-truncate" style="max-width: 200px;"></span>
                                </span>
                                <span class="small text-muted d-inline-flex align-items-center gap-1">
                                    <i class="ti ti-phone" style="font-size: 0.75rem;"></i>
                                    <span class="emprendedor-telefono"></span>
                                </span>
                            </div>
                        </td>
                        <td class="border-0 text-center">
                            <div class="d-flex align-items-center justify-content-center gap-2">
                                <div class="form-check form-switch m-0">
                                    <input class="form-check-input" type="checkbox" role="switch"
                                        aria-label="Marcar asistencia">
                                </div>
                                <span class="badge rounded-pill" style="min-width: 65px; font-size: 0.7rem;">—</span>
                            </div>
                        </td>
                    </tr>
                </template>

                <!-- ═══════════ FOOTER ═══════════ -->
                <div class="card-footer bg-white border-top py-3" id="tableFooter" style="display:none;">
                    <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
                        <div class="d-flex align-items-center gap-3">
                            <div class="d-flex align-items-center bg-light rounded-pill px-3 py-1">
                                <i class="ti ti-percentage text-primary me-1 small"></i>
                                <span class="small fw-semibold" id="footerPorcentaje">0%</span>
                                <span class="small text-muted ms-1">asistencia</span>
                            </div>
                            <small class="text-muted d-none" id="footerNoResults">
                                <i class="ti ti-filter-off me-1"></i>Sin resultados para el filtro actual
                            </small>
                        </div>
                        <button type="button" class="btn btn-success px-4" id="guardarAsistencia" disabled>
                            <i class="ti ti-device-floppy me-2"></i>
                            Guardar
                            <span class="badge bg-white text-success ms-2 rounded-pill" id="saveButtonCount">0</span>
                        </button>
                    </div>
                </div>

            </div><!-- /.card -->
        </div>
    </div>
</div>