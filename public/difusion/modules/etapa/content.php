<div class="card ">
  <div class="card-body">
    <h4 class="card-title fw-bold mb-4">Etapas de formación</h4>

    <!-- Tabs de navegación -->
    <ul class="nav nav-pills flex-column flex-sm-row mt-4" role="tablist">
      <li class="nav-item flex-sm-fill text-sm-center" role="presentation">
        <a class="nav-link border active d-flex align-items-center" data-bs-toggle="tab" href="#etapasDisponibles" role="tab" aria-selected="true">
          <i class="ti ti-calendar fs-5 me-2"></i>
          <span class="d-none d-md-inline">Etapas disponibles</span>
        </a>
      </li>
      <li class="nav-item flex-sm-fill text-sm-center" role="presentation">
        <a class="nav-link border d-flex align-items-center" data-bs-toggle="tab" href="#nuevaEtapa" role="tab" aria-selected="false">
          <i class="ti ti-playlist-add fs-5 me-2"></i>
          <span class="d-none d-md-inline">Nueva etapa</span>
        </a>
      </li>
    </ul>

    <!-- Contenido de pestañas -->
    <div class="tab-content  mt-2">
      
      <!-- Tab: Etapas disponibles -->
      <div class="tab-pane fade show active" id="etapasDisponibles" role="tabpanel">
        <div class="mb-4 d-flex flex-column flex-md-row align-items-start align-items-md-center gap-2">
          <label for="etapasFilter" class="form-label mb-0">Mostrar etapas por año:</label>
          <div class="input-group" id="selector">
            <!-- Select dinámico generado por JS -->
            <button type="button" class="btn btn-outline-danger" onclick="refresh()">Deshacer filtro</button>
          </div>
        </div>

        <div class="table-responsive" id="tablaEtapas">
          <!-- Tabla dinámica generada por JS -->
        </div>
      </div>

      <!-- Tab: Nueva etapa -->
      <div class="tab-pane fade" id="nuevaEtapa" role="tabpanel">
        <h5 class="fw-semibold mt-3 mb-4">Crear etapa</h5>
        <form id="etapaForm" class="needs-validation" novalidate>

          <!-- Nombre -->
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="nombre" name="nombre" maxlength="45" placeholder="Nombre de la etapa" required>
            <label for="nombre">
              <i class="ti ti-list me-2 text-warning"></i>
              Nombre de la etapa
            </label>
          </div>

          <!-- Tipo -->
          <div class="mb-3">
            <label class="form-label">Tipo de etapa</label>
            <div class="btn-group w-100" role="group" id="tipoEtapaGroup">
              <!-- Radios dinámicos por JS -->
            </div>
          </div>

          <!-- Fechas -->
          <div class="row g-3 mb-4">
            <div class="col-md-6">
              <div class="form-floating">
                <input type="date" class="form-control" id="fechaInicio" name="fechaInicio" required>
                <label for="fechaInicio">
                  <i class="ti ti-calendar me-2 text-warning"></i> Fecha de inicio
                </label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-floating">
                <input type="date" class="form-control" id="fechaFin" name="fechaFin" required>
                <label for="fechaFin">
                  <i class="ti ti-calendar me-2 text-warning"></i> Fecha de fin
                </label>
              </div>
            </div>
          </div>

          <!-- Botón de envío -->
          <div class="d-grid col-md-6 mx-auto">
            <button type="submit" class="btn btn-outline-primary d-flex justify-content-center align-items-center gap-2">
              <i class="ti ti-device-floppy"></i> Guardar etapa
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- Modal: Editar etapa -->
<div class="modal fade" id="modalDetallesEtapa" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalDetallesEtapaLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <form id="actualizarEtapaForm" class="needs-validation" novalidate>
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header bg-warning text-white">
          <h5 class="modal-title d-flex align-items-center" id="modalDetallesEtapaLabel">
            <i class="ti ti-edit me-2"></i> Editar Etapa
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <input type="hidden" id="idEtapa" name="idEtapa">

          <!-- Nombre -->
          <div class="mb-3">
            <label for="nombreEtapaModal" class="form-label">Nombre de la etapa</label>
            <input type="text" id="nombreEtapaModal" name="nombre" class="form-control" placeholder="Nombre de la etapa" required>
            <div class="invalid-feedback">Por favor, ingresa un nombre válido.</div>
          </div>

          <!-- Tipo -->
          <div class="mb-3" id="tipoEtapaModal">
            <!-- Radios dinámicos por JS -->
            <div class="invalid-feedback">Debes seleccionar un tipo de etapa.</div>
          </div>

          <!-- Fechas -->
          <div class="row g-3">
            <div class="col-md-6">
              <label for="fechaInicioModal" class="form-label">Fecha de inicio</label>
              <input type="date" id="fechaInicioModal" name="fechaInicio" class="form-control" required>
              <div class="invalid-feedback">La fecha de inicio es obligatoria.</div>
            </div>
            <div class="col-md-6">
              <label for="fechaFinModal" class="form-label">Fecha de fin</label>
              <input type="date" id="fechaFinModal" name="fechaFin" class="form-control" required>
              <div class="invalid-feedback">La fecha de fin es obligatoria.</div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button type="submit" class="btn btn-outline-primary d-flex align-items-center">
            <i class="ti ti-send me-2"></i> Guardar cambios
          </button>
          <button type="button" class="btn btn-warning" data-bs-dismiss="modal">
            <i class="ti ti-x me-2"></i> Cancelar
          </button>
        </div>
      </div>
    </form>
  </div>
</div>
