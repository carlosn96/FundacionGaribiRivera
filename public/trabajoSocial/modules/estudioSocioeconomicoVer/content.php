<div id="content">
    <div class="card">
        <ul class="nav nav-pills user-profile-tab" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
                <button
                    class="nav-link position-relative rounded-0 active d-flex align-items-center justify-content-center bg-transparent fs-3 py-3"
                    id="pills-resumen-tab" data-bs-toggle="pill" data-bs-target="#pills-resumen" type="button"
                    role="tab" aria-controls="pills-resumen" aria-selected="true">
                    <i class="ti ti-user-circle me-2 fs-6"></i>
                    <span class="d-none d-md-block">Resumen</span>
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button
                    class="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-3"
                    id="pills-notifications-tab" data-bs-toggle="pill" data-bs-target="#pills-notifications"
                    type="button" role="tab" aria-controls="pills-notifications" aria-selected="false" tabindex="-1">
                    <i class="ti ti-briefcase me-2 fs-6"></i>
                    <span class="d-none d-md-block">Empleabilidad</span>
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button
                    class="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-3"
                    id="pills-bills-tab" data-bs-toggle="pill" data-bs-target="#pills-bills" type="button" role="tab"
                    aria-controls="pills-bills" aria-selected="false" tabindex="-1">
                    <i class="ti ti-friends me-2 fs-6"></i>
                    <span class="d-none d-md-block">Familiares</span>
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button
                    class="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-3"
                    id="pills-security-tab" data-bs-toggle="pill" data-bs-target="#pills-security" type="button"
                    role="tab" aria-controls="pills-security" aria-selected="false" tabindex="-1">
                    <i class="ti ti-coin me-2 fs-6"></i>
                    <span class="d-none d-md-block">Economia y vivienda</span>
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button
                    class="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-3"
                    id="pills-referencias-tab" data-bs-toggle="pill" data-bs-target="#pills-referencias" type="button"
                    role="tab" aria-controls="pills-referencias" aria-selected="false" tabindex="-1">
                    <i class="ti ti-users-group me-2 fs-6"></i>
                    <span class="d-none d-md-block">Referencias</span>
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button
                    class="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-3"
                    id="pills-vulnerabilidad-tab" data-bs-toggle="pill" data-bs-target="#pills-vulnerabilidad"
                    type="button" role="tab" aria-controls="pills-vulnerabilidad" aria-selected="false" tabindex="-1">
                    <i class="ti ti-info-triangle me-2 fs-6"></i>
                    <span class="d-none d-md-block">Vulnerabilidades</span>
                </button>
            </li>
        </ul>
        <div class="card-body">
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-resumen" role="tabpanel"
                    aria-labelledby="pills-resumen-tab" tabindex="0">
                    <div class="row justify-content-center">
                        <div class="col-12 col-md-10 col-lg-12">
                            <div class="card w-100 border shadow-sm position-relative overflow-hidden mb-4">
                                <div class="card-body p-3 p-md-4">
                                    <!-- Información del emprendedor -->
                                    <div class="d-flex flex-column flex-sm-row align-items-center gap-3 mb-4">
                                        <img src="" alt="Foto de perfil" class="rounded-circle shadow-sm" width="60"
                                            height="60" id="emprendedorProfilePicture">
                                        <div class="text-center text-sm-start">
                                            <h6 class="mb-0 fw-semibold" id="emprendedorNombre"></h6>
                                            <small class="text-muted">Emprendedor</small>
                                        </div>
                                    </div>

                                    <!-- Resultado de la visita -->
                                    <div class="mb-4">
                                        <div
                                            class="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
                                            <h5 class="mb-0 fw-semibold text-center text-md-start">Resultado de la
                                                visita</h5>
                                            <span class="badge bg-warning text-white fs-6 px-3 py-2"
                                                id="resultadoVisita"></span>
                                        </div>
                                    </div>

                                    <!-- Observaciones -->
                                    <div class="mb-4 position-relative">
                                        <label for="observaciones" class="form-label fw-semibold">Observaciones</label>
                                        <textarea class="form-control" rows="5" id="observaciones"
                                            placeholder="Aquí puedes agregar tus observaciones..."></textarea>

                                        <!-- Botones -->
                                        <div class="d-flex gap-2 position-absolute end-0 mt-2" style="bottom: -45px;">
                                            <button type="button" class="btn btn-outline-success btn-sm"
                                                id="btnActualizarObservaciones">
                                                <i class="ti ti-refresh me-1"></i>Actualizar
                                            </button>
                                            <button type="button" class="btn btn-outline-success btn-sm"
                                                id="btnMejorarObservaciones">
                                                <i class="ti ti-sparkles me-1"></i>Mejorar
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Actitudes de la persona -->
                                    <div class="mb-5">
                                        <h5 class="card-title mb-3 fw-semibold">
                                            <i class="ti ti-user-heart me-2"></i>Actitudes de la persona
                                        </h5>
                                        <ul class="list-group" id="actitudes"></ul>
                                    </div>

                                    <!-- Fotografías -->
                                    <div class="border-top pt-4 mt-4">
                                        <h5 class="mb-3 fw-semibold">
                                            <i class="ti ti-photo me-2"></i>Fotografías de la visita
                                        </h5>
                                        <div class="mb-3">
                                            <div id="controls" class="carousel slide carousel-dark"
                                                data-bs-ride="carousel">
                                                <div class="carousel-inner" id="items"></div>
                                                <a class="carousel-control-prev position-absolute start-0 top-50 translate-middle-y"
                                                    href="#controls" role="button" data-bs-slide="prev">
                                                    <span class="carousel-control-prev-icon bg-dark rounded-circle p-3"
                                                        aria-hidden="true"></span>
                                                    <span class="visually-hidden">Anterior</span>
                                                </a>
                                                <a class="carousel-control-next position-absolute end-0 top-50 translate-middle-y"
                                                    href="#controls" role="button" data-bs-slide="next">
                                                    <span class="carousel-control-next-icon bg-dark rounded-circle p-3"
                                                        aria-hidden="true"></span>
                                                    <span class="visually-hidden">Siguiente</span>
                                                </a>
                                            </div>
                                        </div>

                                        <!-- Selector de archivos múltiple -->
                                        <div class="d-flex flex-column align-items-center gap-2">
                                            <label for="inputAgregarFotos" class="form-label fw-semibold">Agregar nueva
                                                fotografía</label>
                                            <input type="file" id="inputAgregarFotos" class="form-control w-auto"
                                                accept=".jpg,.jpeg,.png" multiple>
                                        </div>

                                        <div id="previewFotos" class="row row-cols-2 row-cols-md-4 g-3 w-100 mt-2">
                                        </div>

                                        <button id="btnGuardarFotos" class="btn btn-outline-primary mt-2 w-100"
                                            disabled>
                                            <i class="ti ti-upload me-2"></i>Guardar fotografías seleccionadas
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab-pane fade" id="pills-notifications" role="tabpanel"
                    aria-labelledby="pills-notifications-tab" tabindex="0">
                    <div class="row justify-content-center">
                        <div id="empleabilidadContainer" class="container mt-5">
                        </div>
                    </div>
                </div>

                <div class="tab-pane fade" id="pills-bills" role="tabpanel" aria-labelledby="pills-bills-tab"
                    tabindex="0">
                    <div class="row justify-content-center">
                        <div class="col-lg-12">
                            <div class="card border shadow-none">
                                <div class="card-body p-4">
                                    <h4 class="card-title mb-3">Familiares</h4>
                                    <div style="max-height: 400px; overflow-y: auto;">
                                        <div id="familiaresContainer" class="row g-3">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="tab-pane fade" id="pills-security" role="tabpanel" aria-labelledby="pills-security-tab"
                    tabindex="0">
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="card border shadow-none">
                                <div class="card-body p-4">
                                    <h4 class="card-title mb-4">Economía</h4>
                                    <div class="mb-4">
                                        <div class="border p-2 rounded" id="ingresoMensual"></div>
                                    </div>
                                    <div class="mb-3">
                                        <p class="card-subtitle text-muted fw-semibold border-bottom pb-2">Relación de
                                            gastos por categoría</p>
                                    </div>
                                    <div class="row row-cols-1 row-cols-md-3 g-3" id="economia"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="card">
                                <div class="card-body p-4">
                                    <h4 class="card-title mb-0">Vivienda</h4>
                                    <p class="mb-3">Distribución de la vivienda</p>
                                    <div id="viviendaDistribucion" class="pt-2"></div>
                                </div>
                            </div>

                            <div class="card">
                                <div class="card-body p-4">
                                    <h4 class="card-title mb-0">Otros bienes</h4>
                                    <p class="mb-3">Información sobre posesión de vehículo</p>
                                    <div id="otrosBienesContainer"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="pills-referencias" role="tabpanel"
                    aria-labelledby="pills-referencias-tab" tabindex="0">
                    <div class="row justify-content-center">
                        <div id="referenciasContainer" class="container mt-5">
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="pills-vulnerabilidad" role="tabpanel"
                    aria-labelledby="pills-vulnerabilidad-tab" tabindex="0">
                    <div class="row justify-content-center">
                        <div id="vulnerabilidadesContainer" class="container mt-5 col-lg-9">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- Modal: Mejorar Observaciones -->
<div class="modal fade" id="modalMejorarObservaciones" tabindex="-1" aria-labelledby="mejorarObservacionesLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">

      <!-- Header -->
      <div class="modal-header">
        <h5 class="modal-title" id="mejorarObservacionesLabel">
          <i class="ti ti-sparkles me-2"></i>Mejorar Observaciones
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>

      <!-- Body -->
      <div class="modal-body">

        <!-- Texto Original -->
        <div class="mb-4">
          <label for="observacionesOriginal" class="form-label fw-semibold">Texto original</label>
          <textarea class="form-control" id="observacionesOriginal" rows="6" readonly></textarea>
        </div>

        <!-- Selector de modelo + botón de mejorar -->
        <div class="mb-3 row align-items-center">
          <div class="col-md-6">
            <label for="modeloIA" class="form-label fw-semibold">Seleccionar modelo de mejora:</label>
            <select class="form-select" id="modeloIA">
              <option value="gpt-4" selected>GPT-4 (alta calidad)</option>
              <option value="gpt-3.5">GPT-3.5 (más rápido)</option>
              <option value="claude">Claude (alternativa)</option>
            </select>
          </div>
          <div class="col-md-6 mt-3 mt-md-4 text-md-end">
            <button type="button" class="btn btn-outline-success" id="btnMejorarTextoIA">
              <i class="ti ti-sparkles me-1"></i>Mejorar texto
            </button>
          </div>
        </div>

        <!-- Texto Mejorado -->
        <div>
          <label for="observacionesMejoradas" class="form-label fw-semibold">Texto mejorado</label>
          <textarea class="form-control bg-light" id="observacionesMejoradas" rows="6" readonly></textarea>
        </div>

      </div>

      <!-- Footer -->
      <div class="modal-footer d-flex justify-content-between flex-column flex-md-row">
        <div class="text-muted small">El texto mejorado es generado automáticamente por IA. Verifica antes de usar.</div>
        <div class="d-flex gap-2">
          <button type="button" class="btn btn-outline-primary" id="btnUsarTextoMejorado">
            <i class="ti ti-check me-1"></i>Usar texto mejorado
          </button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
        </div>
      </div>

    </div>
  </div>
</div>
