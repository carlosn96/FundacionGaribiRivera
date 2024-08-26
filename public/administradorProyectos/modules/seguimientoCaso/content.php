<div class="card">
    <div class="card-body wizard-content">
        <h4 class="card-title">Segumiento de caso</h4>
        <p class="card-subtitle mb-3"> Listado de emprendedores con linea base completa</p>
        <p class="card-subtitle mb-3"> Haz clic en el registro deseado para ver las opciones </p>
        <div id="tablaEmprendedoresContenedor" class="table-responsive"></div>
    </div>
</div>


<div class="modal fade" id="modalEmprendedor">
    <div class="modal-dialog modal-sm">
        <div class="modal-content modal-filled bg-warning-subtle">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
                <div class="text-center text-warning">
                    <i class="ti ti-user-exclamation fs-7"></i>
                    <h4 class="mt-2" id="nombreEmprendedor"> </h4>
                    <p class="mt-3" id="cardModalEmprendedorContent">
                    </p>
                    <a data-bs-toggle="tooltip" data-bs-placement="top" 
                       class="btn bg-warning-subtle justify-content-center rounded-circle btn-lg round-48"
                       id="btnDarSeguimiento" href="#">
                        <i class="ti ti-file-text fs-4"></i>
                    </a>
                    <a id="btnEliminarSeguimiento" hidden="" data-bs-toggle="tooltip" data-bs-placement="top" 
                            data-bs-original-title="Eliminar seguimiento"
                            class="btn bg-danger-subtle rounded-circle btn-lg round-48">
                        <i class="fs-5 ti ti-trash"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>