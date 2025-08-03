<div class="container-fluid">
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Registro de Nuevos Emprendedores</h3>
        </div>
        <div class="card-body">
            <!-- Pestañas de Navegación -->
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="pills-individual-tab" data-bs-toggle="pill" data-bs-target="#pills-individual" type="button" role="tab" aria-controls="pills-individual" aria-selected="true">
                        <i class="ti ti-user-plus me-2"></i>Registro Individual
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-masivo-tab" data-bs-toggle="pill" data-bs-target="#pills-masivo" type="button" role="tab" aria-controls="pills-masivo" aria-selected="false">
                        <i class="ti ti-upload me-2"></i>Carga Masiva (CSV)
                    </button>
                </li>
            </ul>

            <!-- Contenido de las Pestañas -->
            <div class="tab-content" id="pills-tabContent">
                <!-- Pestaña 1: Registro Individual -->
                <div class="tab-pane fade show active" id="pills-individual" role="tabpanel" aria-labelledby="pills-individual-tab">
                    <form id="form-registro-individual">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="nombre" class="form-label">Nombre(s)</label>
                                <input type="text" class="form-control" id="nombre" name="nombre" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="apellidos" class="form-label">Apellidos</label>
                                <input type="text" class="form-control" id="apellidos" name="apellidos" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="correo" class="form-label">Correo Electrónico</label>
                                <input type="email" class="form-control" id="correo" name="correo" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="telefono" class="form-label">Número de Celular</label>
                                <input type="tel" class="form-control" id="telefono" name="celular">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 mb-3">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" role="switch" id="generar_contrasena_auto" name="generar_contrasena_auto" checked>
                                    <label class="form-check-label" for="generar_contrasena_auto">
                                        Generar contraseña automáticamente
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row" id="campo-contrasena-manual" style="display: none;">
                            <div class="col-md-6 mb-3">
                                <label for="contrasena" class="form-label">Contraseña Manual</label>
                                <input type="password" class="form-control" id="contrasena" name="contrasena">
                            </div>
                        </div>
                        <button type="submit" class="btn btn-outline-primary">
                            <span class="spinner-border spinner-border-sm me-2 d-none" role="status" aria-hidden="true"></span>
                            <i class="ti ti-user-plus me-2"></i>
                            Crear Emprendedor
                        </button>
                    </form>
                    
                    

                </div>

                <!-- Pestaña 2: Carga Masiva -->
                <div class="tab-pane fade" id="pills-masivo" role="tabpanel" aria-labelledby="pills-masivo-tab">
                    <div class="alert alert-info">
                        <p>El archivo CSV debe contener las siguientes columnas en este orden: <strong>nombre, apellidos, correo, celular</strong>
                         —opcionalmente la contraseña (contrasena) para cada emprendedor —. La primera fila debe ser el encabezado.</p>
                        <a href="#" id="descargar-plantilla-csv">Descargar plantilla de ejemplo</a>
                    </div>
                    <div class="mb-3">
                        <label for="archivo-csv" class="form-label">Selecciona un archivo CSV</label>
                        <input class="form-control" type="file" id="archivo-csv" accept=".csv">
                    </div>
                    <div id="vista-previa-masiva" class="mt-4" style="display: none;">
                        <h5 class="mb-2">Vista Previa de Registros a Cargar</h5>
                        <p class="mb-3">Se encontraron <strong id="num-registros">0</strong> registros. Por favor, verifica que los datos sean correctos.</p>
                        <div class="table-responsive" style="max-height: 350px; overflow-y: auto;">
                            <table id="tabla-vista-previa" class="table table-sm table-bordered align-middle">
                                <thead class="table-light">
                                    <!-- Se genera con JS -->
                                </thead>
                                <tbody>
                                    <!-- Se genera con JS -->
                                </tbody>
                            </table>
                        </div>
                        <button id="btn-crear-masivo" class="btn btn-primary w-100 mt-3" disabled>
                            <span class="spinner-border spinner-border-sm me-2 d-none" role="status" aria-hidden="true"></span>
                            <i class="ti ti-user-plus me-2"></i>
                            Cargar Emprendedores
                        </button>

                        <button id="btn-ver-errores-masivos" class="btn btn-outline-danger w-100 mt-2" type="button" hidden>
                            <i class="ti ti-alert-circle me-2"></i> Ver registros con error
                        </button>
                    </div>
                    <!-- Logger de errores, oculto por defecto -->
                    <div id="logger-errores-masivos" class="card border-danger mt-3" hidden>
                        <div class="card-header bg-danger text-white">
                            <i class="ti ti-alert-circle me-2"></i> Registros con error
                        </div>
                        <div class="card-body">
                            <ul id="lista-errores-masivos" class="mb-0"></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Sección de Resultados (Inicialmente Oculta) -->
    <div id="seccion-resultados" class="card mt-4" style="display: none;">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h4 class="card-title">Resultados de la Creación</h4>
                    <p class="card-subtitle mb-3">Los siguientes emprendedores han sido creados exitosamente.</p>
                </div>
                <button id="btn-descargar-passwords" class="btn btn-success">
                    <i class="ti ti-download me-2"></i>Descargar Contraseñas
                </button>
            </div>
            <div class="table-responsive mt-3">
                <table id="tabla-resultados" class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Correo Electrónico</th>
                            <th>Número de Celular</th>
                            <th>Contraseña Generada</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Filas generadas por JavaScript -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
