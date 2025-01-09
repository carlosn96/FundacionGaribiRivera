<div class="card">
    <div class="card-body">
        <h4 class="card-title">Seguimiento de caso</h4>
        <p class="card-subtitle mb-3">Listado de emprendedores con línea base completa</p>
        <div id="tablaEmprendedoresContenedor" class="table-responsive">
        </div>
        <!-- Contenedor para las alertas (fijas en la esquina superior derecha) -->
        <div id="contenedorDeAlertas" class="position-fixed top-0 end-0 p-3" style="z-index: 1050;">
        </div>
    </div>
</div>



<div class="modal fade" id="modalEmprendedor" tabindex="-1" aria-labelledby="modalEmprendedorLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content bg-warning-subtle">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" aria-controls="modalEmprendedor"></button>
            </div>
            <div class="modal-body p-4 text-center">
                <div class="mb-4">
                    <i class="ti ti-user-exclamation fs-5 text-warning" aria-hidden="true"></i>
                </div>
                <h4 class="mt-2" id="nombreEmprendedor" aria-live="polite"></h4>
                <p class="mt-3" id="cardModalEmprendedorContent"></p>

                <div class="d-flex justify-content-center gap-3 mt-4">
                    <!-- Botón para dar seguimiento -->
                    <a id="btnDarSeguimiento" href="#" class="btn btn-lg rounded-circle bg-warning-subtle" data-bs-toggle="tooltip" data-bs-placement="top" title="Dar seguimiento">
                        <i class="ti ti-file-text fs-4"></i>
                    </a>

                    <!-- Botón para eliminar seguimiento -->
                    <a id="btnEliminarSeguimiento" href="javascript:void(0)" class="btn btn-lg rounded-circle bg-danger-subtle" hidden data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar seguimiento">
                        <i class="ti ti-trash fs-5"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
