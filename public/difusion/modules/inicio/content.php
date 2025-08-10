<div class="card shadow-sm border-0">
  <div class="card-body p-4">
    <div class="d-flex align-items-center mb-4">
      <div class="bg-success bg-opacity-10 rounded-circle p-2 me-3">
        <i class="ti ti-bolt text-success"></i>
      </div>
      <h5 class="card-title mb-0 fw-bold text-dark">Accesos rápidos</h5>
    </div>

    <div class="row g-3">
      <!-- Botón Etapas -->
      <div class="col-lg-4 col-md-6 col-12">
        <a href="../etapa/" class="btn btn-outline-success w-100 py-2 border-2 text-decoration-none d-flex justify-content-center align-items-center" aria-label="Ir a Etapas">
          <i class="ti ti-calendar me-2"></i>
          <span class="fw-medium">Etapas</span>
        </a>
      </div>

      <!-- Dropdown Talleres -->
      <div class="col-lg-4 col-md-6 col-12">
        <div class="dropdown w-100">
          <button class="btn btn-outline-success dropdown-toggle w-100 py-2 border-2 d-flex justify-content-center align-items-center" type="button" id="dropdownMenuTalleres" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="ti ti-chalkboard me-2"></i>
            <span class="fw-medium">Talleres</span>
          </button>
          <ul class="dropdown-menu shadow border-0 mt-1" aria-labelledby="dropdownMenuTalleres">
            <li>
              <a class="dropdown-item py-2 px-3" href="../taller">
                <i class="ti ti-chalkboard me-2 text-success"></i> Talleres
              </a>
            </li>
            <li>
              <a class="dropdown-item py-2 px-3" href="../instructores">
                <i class="ti ti-user-shield me-2 text-success"></i> Instructores
              </a>
            </li>
            <li>
              <a class="dropdown-item py-2 px-3" href="../asistenciaTaller">
                <i class="ti ti-check me-2 text-success"></i> Asistencia
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Dropdown Emprendedores -->
      <div class="col-lg-4 col-md-6 col-12">
        <div class="dropdown w-100">
          <button class="btn btn-outline-success dropdown-toggle w-100 py-2 border-2 d-flex justify-content-center align-items-center" type="button" id="dropdownMenuEmprendedores" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="ti ti-users me-2"></i>
            <span class="fw-medium">Emprendedores</span>
          </button>
          <ul class="dropdown-menu shadow border-0 mt-1" aria-labelledby="dropdownMenuEmprendedores">
            <li>
              <a class="dropdown-item py-2 px-3" href="../altaEmprendedores">
                <i class="ti ti-user-plus me-2 text-success"></i> Nuevo
              </a>
            </li>
            <li>
              <a class="dropdown-item py-2 px-3" href="../listadoGeneralEmprendedores">
                <i class="ti ti-clock me-2 text-success"></i> Historial de registros
              </a>
            </li>
            <li>
              <a class="dropdown-item py-2 px-3" href="../lineaBaseAdministracion">
                <i class="ti ti-clipboard-list me-2 text-success"></i> Línea base
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>


 <!--
<div class="row">
    <div class="col-12">
        <div class="card shadow-sm">
            <div class="card-body p-4">
                <h4 class="card-title mb-4">Actividad reciente</h4>

                <div class="position-relative">
                    
                    <div class="d-flex align-items-center justify-content-between mb-4">
                        <div class="d-flex">
                            <div class="p-3 bg-primary-subtle rounded-circle d-flex align-items-center justify-content-center me-4">
                                <img src="../../../assets/images/svgs/icon-map-pin.svg" alt="spike-img" class="img-fluid" width="24" height="24">
                            </div>
                            <div>
                                <h6 class="mb-1 fs-5 fw-semibold">Trip to Singapore</h6>
                                <p class="fs-6 mb-0 text-muted">working on</p>
                            </div>
                        </div>
                        <h6 class="mb-0 text-muted">5 mins</h6>
                    </div>

                    
                    <div class="d-flex align-items-center justify-content-between mb-4">
                        <div class="d-flex">
                            <div class="p-3 bg-info-subtle rounded-circle d-flex align-items-center justify-content-center me-4">
                                <img src="../../../assets/images/svgs/icon-database.svg" alt="spike-img" class="img-fluid" width="24" height="24">
                            </div>
                            <div>
                                <h6 class="mb-1 fs-5 fw-semibold">Archived Data</h6>
                                <p class="fs-6 mb-0 text-muted">working on</p>
                            </div>
                        </div>
                        <h6 class="mb-0 text-muted">10 mins</h6>
                    </div>

                    
                    <div class="d-flex align-items-center justify-content-between mb-4">
                        <div class="d-flex">
                            <div class="p-3 bg-warning-subtle rounded-circle d-flex align-items-center justify-content-center me-4">
                                <img src="../../../assets/images/svgs/icon-phone.svg" alt="spike-img" class="img-fluid" width="24" height="24">
                            </div>
                            <div>
                                <h6 class="mb-1 fs-5 fw-semibold">Meeting with client</h6>
                                <p class="fs-6 mb-0 text-muted">pending</p>
                            </div>
                        </div>
                        <h6 class="mb-0 text-muted">10 mins</h6>
                    </div>

                    
                    <div class="d-flex align-items-center justify-content-between mb-4">
                        <div class="d-flex">
                            <div class="p-3 bg-danger-subtle rounded-circle d-flex align-items-center justify-content-center me-4">
                                <img src="../../../assets/images/svgs/icon-screen-share.svg" alt="spike-img" class="img-fluid" width="24" height="24">
                            </div>
                            <div>
                                <h6 class="mb-1 fs-5 fw-semibold">Screening Task Team</h6>
                                <p class="fs-6 mb-0 text-muted">working on</p>
                            </div>
                        </div>
                        <h6 class="mb-0 text-muted">20 mins</h6>
                    </div>

                    
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex flex-shrink-0">
                            <div class="p-3 bg-success-subtle rounded-circle d-flex align-items-center justify-content-center me-4">
                                <img src="../../../assets/images/svgs/icon-mail.svg" alt="spike-img" class="img-fluid" width="24" height="24">
                            </div>
                            <div>
                                <h6 class="mb-1 fs-5 fw-semibold">Send envelope to John</h6>
                                <p class="fs-6 mb-0 text-muted">done</p>
                            </div>
                        </div>
                        <h6 class="mb-0 text-muted flex-shrink-0">20 mins</h6>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</div>
-->
