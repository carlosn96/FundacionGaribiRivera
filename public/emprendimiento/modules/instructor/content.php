<div class="container-fluid py-4">
    <input hidden="" id="instructor" value="<?php echo $_GET["id"] ?? null ?>">

    <div class="row g-4">
        <!-- Columna Izquierda: Perfil de Instructor -->
        <div class="col-lg-4">
            <div class="card shadow-sm border-0 h-100 rounded-3">
                <div class="card-body p-4 text-center">
                    <!-- Avatar centrado estándar -->
                    <img src="../../../assets/images/profile/user-1.jpg" alt="Perfil del Instructor" 
                         class="rounded-circle mb-3 border border-3 border-light shadow-sm" 
                         id="profile" width="120" height="120" style="object-fit: cover;">
                    
                    <!-- Información Básica -->
                    <h4 class="fw-bold text-dark mb-1" id="nombre">Cargando...</h4>
                    <span class="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-10 rounded-pill px-3 py-1 mb-4">
                        Instructor Oficial
                    </span>
                    
                    <!-- Detalles de Contacto -->
                    <div class="text-start mt-4">
                        <h6 class="fw-semibold text-muted mb-3 text-uppercase fs-2" style="letter-spacing: 1px;">Información de Contacto</h6>
                        <ul id="instructor-details" class="list-group list-group-flush">
                            <!-- JS inyecta lista de contacto aquí -->
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Columna Derecha: Tabla de Talleres -->
        <div class="col-lg-8">
            <div class="card shadow-sm border-0 h-100 rounded-3">
                <div class="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
                    <h5 class="fw-bold text-dark mb-0 d-flex align-items-center">
                        <i class="ti ti-books text-primary fs-5 me-2"></i> Talleres Impartidos
                    </h5>
                    <span class="badge bg-light text-dark border px-2 py-1" id="total-talleres">0 Registros</span>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0" id="tablaTalleres">
                            <thead class="table-light">
                                <tr>
                                    <th scope="col" class="ps-4 fw-semibold text-muted border-0">Nombre del Taller</th>
                                    <th scope="col" class="fw-semibold text-muted border-0">Modalidad</th>
                                    <th scope="col" class="text-center fw-semibold text-muted border-0">Evaluación</th>
                                    <th scope="col" class="pe-4 text-end fw-semibold text-muted border-0">Recursos</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- JS inyecta filas aquí -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>