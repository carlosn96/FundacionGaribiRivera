<div class="container-fluid">
    <div class="row d-flex align-items-stretch g-3">
        <input hidden="" id="instructor" value="<?php echo $_GET["id"] ?? null ?>">

        <!-- Card de instructor -->
        <div class="col-lg-4">
            <div class="card h-100 shadow-sm rounded-3">
                <div class="card-body">
                    <div class="text-center">
                        <img width="110" class="rounded-circle mb-3 border border-3 border-light" alt="" id="profile">
                        <h5 class="mb-1 text-primary" id="nombre"></h5>
                        <span class="badge bg-primary-subtle text-primary fw-light rounded-pill">Instructor</span>
                    </div>
                    <div class="mt-5">
                        <div class="pb-1 mb-2 border-bottom">
                            <h6 class="text-muted">Detalles</h6>
                        </div>
                        <ul id="instructor-details" class="list-unstyled">
                            <!-- Detalles del instructor aquí -->
                        </ul>
                        <div class="row mt-4">
                            <div class="col-sm-6">
                                <button type="button" class="btn btn-warning w-100 justify-content-center me-2 d-flex align-items-center mb-3 mb-sm-0">
                                    <i class="ti ti-edit fs-5 me-2"></i>
                                    Editar
                                </button>
                            </div>
                            <div class="col-sm-6">
                                <button type="button" class="btn btn-danger w-100 justify-content-center d-flex align-items-center">
                                    <i class="ti ti-trash fs-5 me-2"></i>
                                    Borrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Card de talleres -->
        <div class="col-lg-8">
            <div class="card h-100 shadow-sm rounded-3">
                <div class="card-body">
                    <div class="mb-4 border-bottom pb-3">
                        <h4 class="card-title mb-0 text-primary">Talleres que imparte</h4>
                    </div>
                    <div class="table-responsive overflow-x-auto">
                        <table class="table table-striped table-bordered table-hover align-middle text-nowrap" id="tablaTalleres">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Tipo de taller</th>
                                    <th scope="col">Evaluación habilitada</th>
                                    <th scope="col">Observaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Espaciado entre las filas -->
    <div class="row g-3 mt-4">
        <div class="col">
            <div class="card shadow-sm rounded-3">
                <div class="card-body">
                    <h4 class="card-title text-primary">Evaluaciones</h4>
                    <div id="chart-line-real-time" class="mx-n3"></div>
                </div>
            </div>
        </div>
    </div>
</div>
