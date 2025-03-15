
<div id="emprendedor"></div>
<div class="card shadow-sm rounded-3">
    <div class="px-4 py-3 border-bottom">
        <h4 class="card-title mb-">Seguimiento de Caso</h4>
    </div>
    <div class="card-body">
        <form id="seguimientoCasoForm">
            <input type="text" name="idLineaBase" id="idLineaBase" hidden="">
            <input type="text" name="idSeguimientoCaso" id="idSeguimientoCaso" hidden="">
            <div class="mb-4 row align-items-center">
                <label for="observacionesGenerales" class="form-label col-sm-3 col-form-label">Observaciones Generales</label>
                <div class="col-sm-9">
                    <textarea class="form-control" id="observacionesGenerales" name="observacionesGenerales" rows="3" required=""></textarea>
                </div>
            </div>
        </form>

        <div class="mb-4 row align-items-center" id="fotografiasAgregadas">
            <label class="form-label col-sm-3 col-form-label">Fotografías Agregadas</label>
            <div class="col-sm-9">
                <div id="controls" class="carousel slide carousel-dark" data-bs-ride="carousel">
                    <div class="carousel-inner" id="items">
                    </div>

                    <!-- Flechas de Navegación del Carousel -->
                    <a class="carousel-control-prev position-absolute start-0 top-50 translate-middle-y" href="#controls" role="button" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
                        <span class="visually-hidden">Anterior</span>
                    </a>
                    <a class="carousel-control-next position-absolute end-0 top-50 translate-middle-y" href="#controls" role="button" data-bs-slide="next">
                        <span class="carousel-control-next-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
                        <span class="visually-hidden">Siguiente</span>
                    </a>
                </div>
                <!-- Botón de eliminación de la imagen con ícono -->
                <div class="d-flex justify-content-center mt-3">
                    <button type="button" class="btn btn-sm btn-outline-danger" onclick="eliminarImagen()">
                        <i class="fa fa-trash-alt me-2"></i> Eliminar Imagen
                    </button>
                </div>
            </div>
        </div>


        <!-- Agregar Fotografía -->
        <div class="mb-4 row align-items-center">
            <label for="fotografiasCaso" class="form-label col-sm-3 col-form-label">Agregar Fotografías</label>
            <div class="col-sm-9">
                <form action="#" id="fotografiasCasoForm" class="dropzone">
                    <div class="fallback">
                        <input id="fotografiasCaso" name="fotografiasCaso" type="file" multiple required="">
                    </div>
                </form>
            </div>
        </div>

        <!-- Botones para Guardar y Regresar al Listado en la misma línea -->
        <div class="d-flex justify-content-end gap-3">
            <!-- Botón para Guardar -->
            <button class="btn btn-warning px-4" type="button" id="guardarSeguimientoCasoBtn">
                Guardar Seguimiento de Caso
            </button>

            <!-- Botón para Regresar al Listado -->
            <a href="../lineaBaseAdministracion/" class="btn btn-outline-primary px-4" type="button" id="regresarListadoBtn">
                Regresar al Listado
            </a>
        </div>


    </div>
</div>
