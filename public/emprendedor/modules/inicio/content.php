<div class="container my-5">

    <div class="row mb-4">
        <div class="card shadow-sm border-top border-success rounded-3">
            <div class="card-body">
                <h5 class="card-title mb-3 fw-semibold">Accesos rápidos</h5>
                <div class="d-flex justify-content-start align-items-center"> <!-- Ajuste de alineación en flexbox -->
                    <!-- Dropdown -->
                    <div class="dropdown me-2">
                        <button class="btn btn-outline-success dropdown-toggle" type="button" id="dropdownLineaBase" data-bs-toggle="dropdown" aria-expanded="false">
                            Línea Base
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownLineaBase">
                            <li>
                                <a href="../lineaBase/" class="dropdown-item d-flex align-items-center">
                                    <i class="ti ti-start me-2"></i> Inicial
                                </a>
                            </li>
                            <li>
                                <a href="../lineaFinal" class="dropdown-item d-flex align-items-center">
                                    <i class="ti ti-end me-2"></i> Final
                                </a>
                            </li>
                        </ul>
                    </div>

                    <!-- Enlace "Mis talleres" -->
                    <a href="#" class="btn btn-outline-success m-2 d-flex align-items-center justify-content-center">
                        Mis Talleres
                    </a>
                </div>
            </div>
        </div>
    </div>


    <!-- Sección de Publicaciones -->
    <div class="mb-4 p-4 border rounded-3 shadow-sm bg-light">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h2 class="h4 mb-0">Publicaciones</h2>
            <div>
                <a href="https://fundaciongaribirivera.com/blog" target="_blank" class="btn btn-primary btn-sm">Ver todo</a>
            </div>
        </div>
        <p class="text-muted mb-3">Últimas publicaciones del blog. Explora más artículos interesantes.</p>

        <!-- Contenido de las publicaciones (Ejemplo con cards) -->
        <div class="row" id="publicaciones-container">
            <!-- Aquí se generarán dinámicamente las publicaciones -->
        </div>
    </div>

    <!-- Sección de Eventos -->
    <div class="p-4 border rounded-3 shadow-sm bg-light">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h2 class="h4 mb-0">Eventos</h2>
            <div>
                <a href="https://fundaciongaribirivera.com/eventos" target="_blank" class="btn btn-primary btn-sm">Ver todo</a>
            </div>
        </div>
        <p class="text-muted mb-3">Próximos eventos importantes. ¡No te los pierdas!</p>

        <!-- Contenido de los eventos (Ejemplo con cards) -->
        <div class="row" id="eventos-container">
            <!-- Aquí se generarán dinámicamente los eventos -->
        </div>
    </div>

</div>
