
<div class="card">
    <div class="card-header">
        <div class="d-flex mb-4 justify-content-between align-items-center">
            <h4 class="card-title mb-0">Visita de Seguimiento</h4>
        </div>
    </div>
    <div class="card-body">
        <div class="row mb-3">
            <div class="col-md-6">
                <div class="mb-3">
                    <label for="fechaRealizacion" class="form-label">Fecha y hora de realización</label>
                    <input type="datetime-local" name="fechaRealizacion" id="fechaRealizacion" class="form-control" required>
                </div>
            </div>
            <div class="col-md-6">
                <div class="mb-3">
                    <label for="numeroExpediente" class="form-label">Número de Expediente</label>
                    <input type="text" name="numeroExpediente" id="numeroExpediente" class="form-control" required>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-md-6">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="visitaNoRealizada" id="visitaNoRealizada">
                    <label class="form-check-label" for="visitaNoRealizada"><b>No se realizó el seguimiento</b></label>
                </div>
            </div>
            <div class="col-md-6" id="resultadoVisitaSeguimientoList">
            </div>
        </div>
    </div>
</div>


<div class="card">
    <div class="card-body">
         <div class="row mb-3">
            <div class="col-md-12 mb-3">
                <label class="form-label">¿Las utilidades actuales de tu negocio permiten cubrir tus necesidades básicas personales (alimento, vestido, vivienda, educación, salud, recreación)?</label>
            </div>
            <div class="col-md-6 mb-3">
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="utilidadesPermitenCubrirNecesidadesSi" name="utilidadesPermitenCubrirNecesidades" value="Sí" required>
                    <label class="form-check-label" for="utilidadesPermitenCubrirNecesidadesSi">Sí</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="utilidadesPermitenCubrirNecesidadesNoUnicaFuente" name="utilidadesPermitenCubrirNecesidades" value="No, es única fuente de ingresos" required>
                    <label class="form-check-label" for="utilidadesPermitenCubrirNecesidadesNoUnicaFuente">No, es única fuente de ingresos</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="utilidadesPermitenCubrirNecesidadesNoActComplementaria" name="utilidadesPermitenCubrirNecesidades" value="No, es una actividad complementaria" required>
                    <label class="form-check-label" for="utilidadesPermitenCubrirNecesidadesNoActComplementaria">No, es una actividad complementaria</label>
                </div>
            </div>
            <div id="actividadComplementariaList" class="col-md-6 mb-3">
                <!-- Contenido del div -->
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-md-12">
                <label class="form-label">¿Cuáles consideras que son los problemas actuales de tu negocio?</label>
                <div id="problemasActuales">
                </div>
            </div>
        </div>
    </div>
</div>
