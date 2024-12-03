
<div class="card" id="contenido">
    <div class="card-body wizard-content">
        <h4 class="card-title">Ficha de inscripción (Linea Base final)</h4>
        <div class="mb-4 row align-items-center">
            <label for="etapaFormacion" class="form-label col-sm-3 col-form-label">Etapa en la que participas</label>
            <div class="col-sm-9">
                <input class="form-control" name="etapaFormacion" id="etapaFormacion" readonly="">
            </div>
        </div>

        <form class="validation-wizard-horizontal wizard-circle needs-validation" id="lineaBaseForm">
            <h6>Información de Negocio </h6>
            <section> 
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="mb-3 d-flex flex-column align-items-center">
                            <label class="form-label"><strong>¿Actualmente tienes un negocio?<span class="text-danger">*</span></strong></label>
                            <div class="d-flex flex-wrap gap-6">

                                <input type="radio" class="btn-check" id="tieneNegocioSi" name="tieneNegocio" autocomplete="off" value="1">
                                <label class="btn btn-outline-warning" for="tieneNegocioSi">Si</label>

                                <input type="radio" class="btn-check" id="tieneNegocioNo" name="tieneNegocio" autocomplete="off" value="0" checked="">
                                <label class="btn btn-outline-warning" for="tieneNegocioNo">No</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="mensajeNoTieneNegocio">
                    <div class="alert customize-alert alert-dismissible border-warning text-warning fade show remove-close-icon" role="alert">
                        <div class="d-flex align-items-center  me-3 me-md-0">
                            <i class="ti ti-info-circle fs-5 me-2 text-warning"></i>
                            Se ha indicado que actualmente no existe un negocio
                        </div>
                    </div>
                </div>
                <!-- Campos adicionales para "Sí tiene negocio" -->
                <div  hidden="" id="camposTieneNegocio">
                    <div class="row">
                        <!-- Cantidad de empleados -->
                        <div class="col">
                            <div class="mb-3">
                                <label class="form-label" for="empleadosNegocio">Cantidad de empleados que trabajan en tu negocio</label>
                                <input type="number" class="form-control" id="cantEmpleadosNegocio" name="cantEmpleadosNegocio" min="0" required="" value="0">
                            </div>
                        </div>
                    </div>

                    <div class="row mb-4">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">¿Llevas registros de entradas y salidas de dinero?</label>
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" id="registrosSi" name="registraEntradaSalida" value="1" required>
                                    <label class="form-check-label" for="registrosSi">Sí</label>
                                </div>
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" id="registrosNo" name="registraEntradaSalida" value="0" required>
                                    <label class="form-check-label" for="registrosNo">No</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">¿Tienes asignado un sueldo?</label>
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" id="sueldoSi" name="asignaSueldo" value="1" required>
                                    <label class="form-check-label" for="sueldoSi">Sí</label>
                                </div>
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" id="sueldoNo" name="asignaSueldo" value="0" required>
                                    <label class="form-check-label" for="sueldoNo">No</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">¿Conoces cuál es la utilidad que te deja tu negocio?</label>
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" id="utilidadSi" name="conoceUtilidades" value="1" required>
                                    <label class="form-check-label" for="utilidadSi">Sí</label>
                                </div>
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" id="utilidadNo" name="conoceUtilidades" value="0" required>
                                    <label class="form-check-label" for="utilidadNo">No</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">¿Identiﬁcas quién es tu competencia?</label>
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" id="competenciaSi" name="identificaCompetencia" value="1" required>
                                    <label class="form-check-label" for="competenciaSi">Sí</label>
                                </div>
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" id="competenciaNo" name="identificaCompetencia" value="0" required checked>
                                    <label class="form-check-label" for="competenciaNo">No</label>
                                </div>
                            </div>
                            <div class="mb-4" id="competenciaField" hidden>
                                <label class="form-label" for="quienCompetencia">¿Quién es tu competencia?</label>
                                <input type="text" class="form-control" id="quienCompetencia" name="quienCompetencia" required>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-4">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">¿Qué estrategias utilizas para incrementar tus ventas?</label>
                                <div id="estrategiasIncrementarVentas"></div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">¿Conoces los productos o servicios que te generan mayor utilidad?</label>
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" id="conoceProductosMayorUtilidadSi" name="conoceProductosMayorUtilidad" value="1" required>
                                    <label class="form-check-label" for="conoceProductosMayorUtilidadSi">Sí</label>
                                </div>
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" id="conoceProductosMayorUtilidadNo" name="conoceProductosMayorUtilidad" value="0" required checked>
                                    <label class="form-check-label" for="conoceProductosMayorUtilidadNo">No</label>
                                </div>
                            </div>
                            <div class="mb-3" id="utilidadProductosField" hidden>
                                <label class="form-label" for="porcentajeGanancias">¿Cuál es el porcentaje de ganancias de esos productos?</label>
                                <input type="number" class="form-control" id="porcentajeGanancias" name="porcentajeGanancias" required min="0" max="100">
                            </div>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">¿Asignas ahorro mensual para mantenimiento de equipo o maquinaria?</label>
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" id="ahorroSi" name="ahorro" value="1" required>
                                    <label class="form-check-label" for="ahorroSi">Sí</label>
                                </div>
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" id="ahorroNo" name="ahorro" value="0" required checked>
                                    <label class="form-check-label" for="ahorroNo">No</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3" id="cuantoAhorroField" hidden>
                                <label class="form-label" for="cuantoAhorro">¿Cuánto ahorras?</label>
                                <input type="number" class="form-control" id="cuantoAhorro" name="cuantoAhorro" required>
                            </div>
                            <div class="mb-3" id="razonesNoAhorroField">
                                <label class="form-label" for="razonesNoAhorro">Razones por las cuales no ahorras</label>
                                <textarea class="form-control" id="razonesNoAhorro" name="razonesNoAhorro" required></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">¿Cómo empleas las ganancias generadas?</label>
                                <div id="comoEmpleaGanancias"></div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">¿Conoces el punto de equilibro de tu negocio (cuánto tienes que vender para sacar tus gastos)?</label>
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" id="conocePuntoEquilibrioSi" name="conocePuntoEquilibrio" value="1" required>
                                    <label class="form-check-label" for="conocePuntoEquilibrioSi">Sí</label>
                                </div>
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" id="conocePuntoEquilibrioNo" name="conocePuntoEquilibrio" value="0" required>
                                    <label class="form-check-label" for="conocePuntoEquilibrioNo">No</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            
            
            <h6>Mejoras en los ingresos del negocio</h6>
            <section>
                <div class="row gy-3">
                    <div class="col-md">
                        <label class="form-label">Ingreso mensual</label>
                        <div id="ingresoMensual"></div>
                    </div>
                </div>
            </section>
        </form>
    </div>
</div>