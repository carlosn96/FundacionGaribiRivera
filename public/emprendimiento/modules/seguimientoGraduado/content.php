<div class="card" id="contenido">
    <div class="card-body wizard-content">
        <div class="d-flex justify-content-between align-items-center">
            <h4 class="card-title">Seguimiento de Graduados</h4>
            <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" id="seguimiento-toolbar" style="display: none;">
                <div class="btn-group" role="group" aria-label="First group">
                    <button id="btn-descargar-seguimiento" type="button" class="btn btn-primary" data-bs-toggle="tooltip" title="Descargar">
                        <i class="ti ti-download fs-4"></i>
                    </button>
                    <button id="btn-eliminar-seguimiento" type="button" class="btn btn-danger" data-bs-toggle="tooltip" title="Eliminar">
                        <i class="ti ti-trash fs-4"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="mb-3">
            <span class="badge bg-success-subtle text-success-emphasis fw-semibold" id="data-source-badge" ><i class="fas fa-check-circle me-1"></i>Se muestra información de </span>
        </div>
        <div class="d-flex align-items-center gap-4 flex-wrap">
            <img alt="emprendedor" class="rounded-circle" width="40" height="40" id="fotografiaEmprendedor">
            <h6 class="mb-0" id="nombreEmprendedor"></h6>
            <span class="fs-2 hstack gap-2" id="fecha">
                <span class="round-10 text-bg-light rounded-circle d-inline-block"></span> Fecha de actualización:
            </span>
        </div>

        <form class="validation-wizard-horizontal wizard-circle needs-validation" id="lineaBaseForm">
            <input id="idEmprendedor" name="idEmprendedor" hidden="">
            <h6 class="fw-bold text-dark mb-4 pb-2 border-bottom">Análisis del estado del negocio</h6>
            <section>
                <div id="seccionAnalisisNegocio">
                    <!-- Registros de entradas y salidas -->
                    <div class="mb-3">
                        <div class="bg-light p-3 rounded-3">
                            <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
                                <label class="form-label fw-semibold text-dark mb-0">¿Llevas registros de entradas y
                                    salidas de dinero?</label>
                                <div class="d-flex gap-3">
                                    <div class="form-check">
                                        <input type="radio" class="form-check-input" id="registrosSi"
                                            name="registraEntradaSalida" value="1" required>
                                        <label class="form-check-label" for="registrosSi">Sí</label>
                                    </div>
                                    <div class="form-check">
                                        <input type="radio" class="form-check-input" id="registrosNo"
                                            name="registraEntradaSalida" value="0" required>
                                        <label class="form-check-label" for="registrosNo">No</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sueldo mensual -->
                    <div class="mb-3">
                        <div class="bg-light p-3 rounded-3">
                            <div class="row g-3">
                                <div class="col-12 col-md-6">
                                    <label for="sueldoMensual" class="form-label fw-semibold text-dark">¿Cuál es tu
                                        <strong>sueldo mensual asignado</strong>?</label>
                                    <div class="input-group">
                                        <span class="input-group-text">$</span>
                                        <input type="number" class="form-control" id="sueldoMensual"
                                            name="sueldoMensual" min="0" value="0" required>
                                        <span class="input-group-text">.00</span>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <label for="utilidadesMensuales" class="form-label fw-semibold text-dark">¿Cuál es
                                        el monto de tus <strong>utilidades</strong> mensuales?</label>
                                    <div class="input-group">
                                        <span class="input-group-text">$</span>
                                        <input type="number" class="form-control" id="utilidadesMensuales"
                                            name="utilidadesMensuales" required value="0">
                                        <span class="input-group-text">.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Competencia -->
                    <div class="mb-3">
                        <div class="bg-light p-3 rounded-3">
                            <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                                <label class="form-label fw-semibold text-dark mb-0">¿Identificas quién es tu
                                    competencia?</label>
                                <div class="d-flex gap-3">
                                    <div class="form-check">
                                        <input type="radio" class="form-check-input" id="competenciaSi"
                                            name="identificaCompetencia" value="1" required>
                                        <label class="form-check-label" for="competenciaSi">Sí</label>
                                    </div>
                                    <div class="form-check">
                                        <input type="radio" class="form-check-input" id="competenciaNo"
                                            name="identificaCompetencia" value="0" required checked>
                                        <label class="form-check-label" for="competenciaNo">No</label>
                                    </div>
                                </div>
                            </div>
                            <div id="competenciaField" hidden>
                                <label class="form-label fw-semibold text-dark" for="quienCompetencia">¿Quién es tu
                                    competencia?</label>
                                <input type="text" class="form-control" id="quienCompetencia" name="quienCompetencia"
                                    required>
                            </div>
                        </div>
                    </div>

                    <!-- Estrategias de venta -->
                    <div class="mb-3">
                        <div class="bg-light p-3 rounded-3">
                            <label class="form-label fw-semibold text-dark mb-3">¿Qué estrategias utilizas para
                                incrementar tus ventas?</label>
                            <div id="estrategiasIncrementarVentas"></div>
                        </div>
                    </div>

                    <!-- Productos con mayor utilidad -->
                    <div class="mb-3">
                        <div class="bg-light p-3 rounded-3">
                            <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                                <label class="form-label fw-semibold text-dark mb-0">¿Conoces los productos o servicios
                                    que te generan mayor utilidad?</label>
                                <div class="d-flex gap-3">
                                    <div class="form-check">
                                        <input type="radio" class="form-check-input" id="conoceProductosMayorUtilidadSi"
                                            name="conoceProductosMayorUtilidad" value="1" required>
                                        <label class="form-check-label" for="conoceProductosMayorUtilidadSi">Sí</label>
                                    </div>
                                    <div class="form-check">
                                        <input type="radio" class="form-check-input" id="conoceProductosMayorUtilidadNo"
                                            name="conoceProductosMayorUtilidad" value="0" required checked>
                                        <label class="form-check-label" for="conoceProductosMayorUtilidadNo">No</label>
                                    </div>
                                </div>
                            </div>
                            <div id="utilidadProductosField" hidden>
                                <label class="form-label fw-semibold text-dark" for="porcentajeGanancias">¿Cuál es el
                                    porcentaje de ganancias de esos productos?</label>
                                <input type="number" class="form-control" id="porcentajeGanancias"
                                    name="porcentajeGanancias" required min="0" max="100">
                            </div>
                        </div>
                    </div>

                    <!-- Ahorro para mantenimiento -->
                    <div class="mb-3">
                        <div class="bg-light p-3 rounded-3">
                            <div class="row g-3">
                                <div class="col-12 col-lg-6">
                                    <label class="form-label fw-semibold text-dark mb-3">¿Asignas ahorro mensual para
                                        mantenimiento de equipo o maquinaria?</label>
                                    <div class="d-flex gap-3">
                                        <div class="form-check">
                                            <input type="radio" class="form-check-input" id="ahorroSi" name="ahorro"
                                                value="1" required>
                                            <label class="form-check-label" for="ahorroSi">Sí</label>
                                        </div>
                                        <div class="form-check">
                                            <input type="radio" class="form-check-input" id="ahorroNo" name="ahorro"
                                                value="0" required checked>
                                            <label class="form-check-label" for="ahorroNo">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-lg-6">
                                    <div id="cuantoAhorroField" hidden>
                                        <label class="form-label fw-semibold text-dark" for="cuantoAhorro">¿Cuánto
                                            ahorras?</label>
                                        <input type="number" class="form-control" id="cuantoAhorro" name="cuantoAhorro"
                                            required>
                                    </div>
                                    <div id="razonesNoAhorroField">
                                        <label class="form-label fw-semibold text-dark" for="razonesNoAhorro">Razones
                                            por las cuales no ahorras</label>
                                        <textarea class="form-control" id="razonesNoAhorro" name="razonesNoAhorro"
                                            rows="3" required></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Empleo de ganancias -->
                    <div class="mb-3">
                        <div class="bg-light p-3 rounded-3">
                            <label class="form-label fw-semibold text-dark mb-3">¿Cómo empleas las ganancias
                                generadas?</label>
                            <div id="comoEmpleaGanancias"></div>
                        </div>
                    </div>

                    <!-- Punto de equilibrio -->
                    <div class="mb-3">
                        <div class="bg-light p-3 rounded-3">
                            <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
                                <label class="form-label fw-semibold text-dark mb-0">¿Conoces el punto de equilibrio de
                                    tu negocio (cuánto tienes que vender para sacar tus gastos)?</label>
                                <div class="d-flex gap-3">
                                    <div class="form-check">
                                        <input type="radio" class="form-check-input" id="conocePuntoEquilibrioSi"
                                            name="conocePuntoEquilibrio" value="1" required>
                                        <label class="form-check-label" for="conocePuntoEquilibrioSi">Sí</label>
                                    </div>
                                    <div class="form-check">
                                        <input type="radio" class="form-check-input" id="conocePuntoEquilibrioNo"
                                            name="conocePuntoEquilibrio" value="0" required>
                                        <label class="form-check-label" for="conocePuntoEquilibrioNo">No</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Separación de gastos -->
                    <div class="mb-3">
                        <div class="bg-light p-3 rounded-3">
                            <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
                                <label class="form-label fw-semibold text-dark mb-0">¿Separas los gastos del negocio de
                                    tus gastos personales?</label>
                                <div class="d-flex gap-3">
                                    <div class="form-check">
                                        <input type="radio" class="form-check-input" id="separaGastosSi"
                                            name="separaGastos" value="1" required>
                                        <label class="form-check-label" for="separaGastosSi">Sí</label>
                                    </div>
                                    <div class="form-check">
                                        <input type="radio" class="form-check-input" id="separaGastosNo"
                                            name="separaGastos" value="0" required>
                                        <label class="form-check-label" for="separaGastosNo">No</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Elaboración de presupuesto -->
                    <div class="mb-3">
                        <div class="bg-light p-3 rounded-3">
                            <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
                                <label class="form-label fw-semibold text-dark mb-0">¿Elaboras un presupuesto mensual
                                    para tu negocio (estimado de lo que esperas vender, gastar y ganar)?</label>
                                <div class="d-flex gap-3">
                                    <div class="form-check">
                                        <input type="radio" class="form-check-input" id="elaboraPresupuestoSi"
                                            name="elaboraPresupuesto" value="1" required>
                                        <label class="form-check-label" for="elaboraPresupuestoSi">Sí</label>
                                    </div>
                                    <div class="form-check">
                                        <input type="radio" class="form-check-input" id="elaboraPresupuestoNo"
                                            name="elaboraPresupuesto" value="0" required>
                                        <label class="form-check-label" for="elaboraPresupuestoNo">No</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </form>
    </div>
</div>