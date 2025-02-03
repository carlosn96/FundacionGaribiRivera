
<div class="card">
    <div class="px-4 py-3 border-bottom">
        <h4 class="card-title mb-0" id="tituloCard">Seguimiento de caso: </h4>
    </div>
    <div class="card-body">
        <p class="card-subtitle mb-3">Generalidades u observaciones del caso</p>
        <form id="nuevoCasoForm">
            <input type="text" name="idLineaBase" id="idLineaBase" hidden="">
            <div class="mb-4 row align-items-center">
                <label for="numeroCaso" class="form-label col-sm-3 col-form-label">Número de caso</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="numeroCaso" name="numeroCaso" required="">
                </div>
            </div>
            <div class="mb-4 row align-items-center">
                <label class="form-label col-sm-3 col-form-label">Etapas de formación cursadas</label>
                <div class="col-sm-9" id="etapasFormacionCursadas">
                    <!-- Aquí puedes agregar dinámicamente las etapas de formación cursadas -->
                </div>
            </div>
            <div class="mb-4 row align-items-center">
                <label for="observacionesGenerales" class="form-label col-sm-3 col-form-label">Observaciones generales</label>
                <div class="col-sm-9">
                    <textarea class="form-control" id="observacionesGenerales" name="observacionesGenerales" rows="3" required=""></textarea>
                </div>
            </div>
        </form>

        <div class="mb-4 row align-items-center">
            <label for="fotografiasCaso" class="form-label col-sm-3 col-form-label">Fotografías del caso</label>
            <div class="col-sm-9">
                <form action="#" id="fotografiasCasoForm" class="dropzone">
                    <div class="fallback">
                        <input id="fotografiasCaso" name="fotografiasCaso" type="file" multiple required="">
                    </div>
                </form>
            </div>
        </div>
        <div class="text-end">
            <div class="d-grid col-6 ms-auto">
                <button class="btn btn-warning" type="button" id="guardarSeguimientoCasoBtn">Guardar seguimiento de caso</button>
                <div id="spinner" class="spinner-border d-none" role="status">
                    <span class="visually-hidden"></span>
                </div>
            </div>
        </div>

    </div>

</div>