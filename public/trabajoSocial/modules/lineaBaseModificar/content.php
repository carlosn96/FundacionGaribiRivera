
<div class="card" id="contenido">
    <div class="card-body wizard-content">
        <h4 class="card-title">Línea Base de Seguimiento (al cierre de la formación)</h4>
        <div class="d-flex align-items-center gap-4 flex-wrap">
            <img alt="emprendedor" class="rounded-circle" width="40" height="40" id="fotografiaEmprendedor">
            <h6 class="mb-0" id="nombreEmprendedor"></h6>
            <span class="fs-2 hstack gap-2" id="fechaLineaBase">
                <span class="round-10 text-bg-light rounded-circle d-inline-block"></span> Fecha de registro: 
            </span>
        </div>

        <form class="validation-wizard-horizontal wizard-circle needs-validation" id="lineaBaseForm">
            <input id="idEmprendedor" name="idEmprendedor" hidden="">
            <!-- Información Preliminar -->
            <h6>Información Preliminar</h6>
            <section>
                <input class="form-control" name="idLineaBaseInicial" id="idLineaBaseInicial" hidden="">
                <div class="mb-4">
                    <label for="etapaFormacion" class="form-label">Etapa en la que participa</label>
                    <input class="form-control" name="etapaFormacion" id="etapaFormacion" readonly="">
                </div>
                <div class="mb-3">
                    <label class="form-label">¿Consideras que hubo algún beneficio a nivel personal después de la formación o acompañamiento?</label>
                    <div class="row">
                        <div class="col-12">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="huboBeneficioPersonal" id="beneficioSi" value="1" required>
                                <label class="form-check-label" for="beneficioSi">Sí</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="huboBeneficioPersonal" id="beneficioNo" value="0" checked required>
                                <label class="form-check-label" for="beneficioNo">No</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="beneficiosObtenidos" class="form-label">¿Cuáles fueron los beneficios obtenidos después de la formación?</label>
                    <textarea maxlength="100" class="form-control" id="beneficiosObtenidos" name="beneficiosObtenidos" rows="2" disabled required></textarea>
                </div>
            </section>

            <!-- Socioeconómico -->
            <h6>Socioeconómico</h6>
            <section> <!-- Quitar hidden -->
                <div class="row gy-3">
                    <div class="col-12 col-md-6">
                        <label class="form-label">Ocupación actual</label>
                        <div id="ocupacionActualList"></div>
                    </div>
                    <div class="col-12 col-md-6">
                        <label class="form-label">Ingreso mensual</label>
                        <div id="ingresoMensualList"></div>
                    </div>
                </div>
            </section>

            <!-- Información general de negocio -->
            <h6>Información general de negocio</h6>
            <section> 
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="mb-3 d-flex flex-column align-items-center">
                            <label class="form-label"><strong>¿Actualmente tienes un negocio?<span class="text-danger">*</span></strong></label>
                            <div class="d-flex flex-wrap gap-6">
                                <input type="radio" class="btn-check" id="tieneNegocioSi" name="tieneNegocio" autocomplete="off" value="1">
                                <label class="btn btn-outline-warning" for="tieneNegocioSi">Sí</label>
                                <input type="radio" class="btn-check" id="tieneNegocioNo" name="tieneNegocio" autocomplete="off" value="0" checked="">
                                <label class="btn btn-outline-warning" for="tieneNegocioNo">No</label>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Campos adicionales para "Sí tiene negocio" -->
                <div  id="camposTieneNegocio" hidden="">
                    <div class="row">
                        <!-- Nombre del negocio -->
                        <div class="col-md-6">
                            <div class="mb-4">
                                <label class="form-label" for="nombreNegocio">Nombre (¿Cómo se le conoce a tu negocio?)</label>
                                <input type="text" class="form-control" id="nombreNegocio" name="nombreNegocio" required="">
                            </div>
                        </div>
                        <!-- Teléfono -->
                        <div class="col-md-3">
                            <div class="mb-3">
                                <label class="form-label" for="telefonoNegocio">Teléfono</label>
                                <input type="tel" class="form-control" id="telefonoNegocio" name="telefonoNegocio" required="">
                            </div>
                        </div>
                        <!-- Antigüedad -->
                        <div class="col-md-3">
                            <div class="mb-4">
                                <label class="form-label" for="antiguedadNegocio">Antigüedad</label>
                                <select class="form-select" id="antiguedadNegocio" name="antiguedadNegocio">
                                    <option value="0-2 años">0-2 años</option>
                                    <option value="3-5 años">3-5 años</option>
                                    <option value="6 en adelante">6 en adelante</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6" id="codigoPostalView">
                            <label class="form-label" for="codigoPostalVal">Código postal:</label>
                            <div class="input-group">
                                <input class="form-control" readonly id="codigoPostalVal">
                                <button class="btn btn-outline-warning" type="button" id="btnEditarCodigoPostal">
                                    <i class="ti ti-edit"></i>
                                </button>
                            </div>
                        </div>
                        <div class="col-md-6" hidden="" id="selectorCodigoPostal">
                            <input name="idCodigoPostalNegocio" id="idCodigoPostalNegocio" hidden="">
                            <label class="form-label" for="codigoPostalNegocio">Código postal:</label>
                            <div class="input-group">
                                <div class="flex-grow-1">
                                    <select class="select2-data-ajax form-control" id="codigoPostalNegocio" name="codigoPostalNegocio" required=""></select>
                                </div>
                                <button class="btn btn-outline-danger" type="button" id="btnCancelarEditarCodigoPostal">
                                    <i class="ti ti-x"></i>
                                </button>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="mb-4">
                                <label class="form-label" for="estadoNegocio">Estado:</label>
                                <input class="form-control" readonly id="estadoNegocio" name="estadoNegocio" placeholder="Estado" required="">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="mb-4">
                                <label class="form-label" for="municipioNegocio">Municipio:</label>
                                <input class="form-control" readonly id="municipioNegocio" name="municipioNegocio" placeholder="Municipio" required="">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="mb-4">
                                <label class="form-label" for="coloniaNegocio">Colonia:</label>
                                <input type="text" class="form-control" id="coloniaNegocio" name="coloniaNegocio" required="">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="mb-4">
                                <label class="form-label" for="calleNegocio">Calle:</label>
                                <input type="text" class="form-control" id="calleNegocio" name="calleNegocio" required="">
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="mb-4">
                                <label class="form-label" for="numExteriorNegocio">No. exterior:</label>
                                <input type="text" class="form-control" id="numExteriorNegocio" name="numExteriorNegocio" required="">
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="mb-4">
                                <label class="form-label" for="numInteriorNegocio">No. interior:</label>
                                <input type="text" class="form-control" id="numInteriorNegocio" name="numInteriorNegocio">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-4">
                                <label class="form-label" for="calleCruce1Negocio">Entre calle:</label>
                                <input type="text" class="form-control" id="calleCruce1Negocio" name="calleCruce1Negocio" required="">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-4">
                                <label class="form-label" for="calleCruce2Negocio">Y calle:</label>
                                <input type="text" class="form-control" id="calleCruce2Negocio" name="calleCruce2Negocio" required="">
                            </div>
                        </div>
                    </div>

                    <div class="row mb-4">
                        <!-- Giro del negocio -->
                        <div class="col-12 col-md">
                            <div class="mb-4">
                                <label class="form-label" for="giroNegocio">Giro de tu negocio</label>
                                <div id="giroNegocioList"></div>
                            </div>
                        </div>
                        <!-- Actividad de tu negocio -->
                        <div class="col-12 col-md">
                            <div class="mb-4">
                                <label class="form-label" for="actividadNegocio">Actividad de tu negocio</label>
                                <div id="actividadNegocioList"></div>
                            </div>
                        </div>
                        <!-- Otra actividad -->
                        <div class="col-12 col-md" id="otraActividadDiv" hidden="">
                            <div class="mb-4">
                                <label class="form-label" for="otraActividadNegocio">Se ha elegido "Otra actividad". Descríbela</label>
                                <input type="text" class="form-control" id="otraActividadNegocio" name="otraActividadNegocio" required="">
                            </div>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <!-- Cantidad de empleados -->
                        <div class="col">
                            <div class="mb-3">
                                <label class="form-label" for="empleadosNegocio">Cantidad de empleados que trabajan en tu negocio</label>
                                <input type="number" class="form-control" id="cantEmpleadosNegocio" name="cantEmpleadosNegocio" min="0" required="" value="0">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Análisis del estado del negocio -->
            <h6>Análisis del estado del negocio</h6>
            <section>
                <div id="mensajeNoTieneNegocio1">
                    <div class="alert customize-alert alert-dismissible border-warning text-warning fade show remove-close-icon" role="alert">
                        <div class="d-flex align-items-center  me-3 me-md-0">
                            <i class="ti ti-info-circle fs-5 me-2 text-warning"></i>
                            Se ha indicado que actualmente no existe un negocio
                        </div>
                    </div>
                </div>
                <div id="seccionAnalisisNegocio" hidden="" >
                    <div class="mb-4">
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
                    <div class="mb-4">
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
                    <div class="mb-4">
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
                    <div class="mb-4">
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
                    <div class="mb-4">
                        <label class="form-label" for="clientesNegocio">¿A quién le vendes? ¿Quiénes son tus clientes?</label>
                        <textarea class="form-control" id="clientesNegocio" name="clientesNegocio" required></textarea>
                    </div>
                    <div class="mb-4">
                        <label class="form-label" for="ventajasNegocio">¿Cuáles consideras que son las ventajas de tu negocio sobre tu competencia? (Lo que te hace mejor y diferente: diferenciadores)</label>
                        <textarea class="form-control" id="ventajasNegocio" name="ventajasNegocio" required></textarea>
                    </div>
                    <div class="mb-4">
                        <label class="form-label" for="problemasNegocio">¿Cuáles consideras que son los principales problemas de tu negocio?</label>
                        <textarea class="form-control" id="problemasNegocio" name="problemasNegocio" required></textarea>
                    </div>
                    <div class="mb-4">
                        <label class="form-label">¿Qué estrategias utilizas para incrementar tus ventas?</label>
                        <!-- Contenedor para las otras opciones de checkbox dinámico -->
                        <div id="estrategiasIncrementarVentas" class="mt-3"></div> 
                    </div>
                    <div class="mb-4">
                        <label class="form-label">¿Cómo empleas las ganancias generadas?</label>
                        <div id="comoEmpleaGanancias"></div><!-- Este div es un grupo de checkbox dinamico-->
                    </div>
                    <div class="mb-4">
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
                    <div class="row mb-4">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">¿Separas los gastos del negocio de tus gastos personales?</label>
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" id="separaGastosSi" name="separaGastos" value="1" required>
                                    <label class="form-check-label" for="separaGastosSi">Sí</label>
                                </div>
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" id="separaGastosNo" name="separaGastos" value="0" required>
                                    <label class="form-check-label" for="separaGastosNo">No</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">¿Elaboras un presupuesto mensual para tu negocio (estimado de lo que esperas vender, gastar y ganar)?</label>
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" id="elaboraPresupuestoSi" name="elaboraPresupuesto" value="1" required>
                                    <label class="form-check-label" for="elaboraPresupuestoSi">Sí</label>
                                </div>
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" id="elaboraPresupuestoNo" name="elaboraPresupuesto" value="0" required>
                                    <label class="form-check-label" for="elaboraPresupuestoNo">No</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <h6>Administración de ingresos de tu negocio</h6>
            <section>
                <div id="mensajeNoTieneNegocio2">
                    <div class="alert customize-alert alert-dismissible border-warning text-warning fade show remove-close-icon" role="alert">
                        <div class="d-flex align-items-center  me-3 me-md-0">
                            <i class="ti ti-info-circle fs-5 me-2 text-warning"></i>
                            Se ha indicado que actualmente no existe un negocio
                        </div>
                    </div>
                </div>
                <div id="seccionAdministracionIngresosNegocio" hidden="" >
                    <div class="row mb-4">
                        <div class="col-md-6 col-12 mb-3 mb-md-0">
                            <label for="ventasMensuales" class="form-label">¿Cuál es el monto mensual de tus <strong>ventas</strong>?</label>
                            <div class="input-group">
                                <span class="input-group-text">$</span>
                                <input type="number" class="form-control" id="ventasMensuales" name="ventasMensuales" min="0" value="0" required>
                                <span class="input-group-text">.00</span>
                            </div>
                        </div>
                        <div class="col-md-6 col-12 mb-3 mb-md-0">
                            <label for="gastosMensuales" class="form-label">¿Cuál es el monto mensual de tus<strong> gastos/egresos</strong>?</label>
                            <div class="input-group">
                                <span class="input-group-text">$</span>
                                <input type="number" class="form-control" id="gastosMensuales" name="gastosMensuales" min="0" value="0" required>
                                <span class="input-group-text">.00</span>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col-md-6 col-12 mb-3">
                            <label for="utilidadesMensuales" class="form-label">¿Cuál es el monto de tus <strong>utilidades</strong> mensuales?</label>
                            <div class="input-group">
                                <span class="input-group-text">$</span>
                                <input type="number" class="form-control" id="utilidadesMensuales" name="utilidadesMensuales" required value="0">
                                <span class="input-group-text">.00</span>
                            </div>
                        </div>
                        <div class="col-md-6 col-12 mb-3">
                            <label for="sueldoMensual" class="form-label">¿Cuál es tu <strong>sueldo mensual</strong>?</label>
                            <div class="input-group">
                                <span class="input-group-text">$</span>
                                <input type="number" class="form-control" id="sueldoMensual" name="sueldoMensual" min="0" value="0" required>
                                <span class="input-group-text">.00</span>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col-md-4 col-12 mb-3">
                            <label class="form-label">¿Es tu negocio la principal fuente de ingresos <strong>a nivel personal</strong>?</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="esIngresoPrincipalPersonal" id="ingresoPrincipalSi" value="1" required >
                                <label class="form-check-label" for="ingresoPrincipalSi">Sí</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="esIngresoPrincipalPersonal" id="ingresoPrincipalNo" value="0" required>
                                <label class="form-check-label" for="ingresoPrincipalNo">No</label>
                            </div>
                        </div>
                        <div class="col-md-4 col-12 mb-3">
                            <label class="form-label">¿Es tu negocio la principal fuente de ingresos <strong>para tu familia</strong>?</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="esIngresoPrincipalFamiliar" id="esIngresoPrincipalFamiliarSi" value="1" required >
                                <label class="form-check-label" for="esIngresoPrincipalFamiliarSi">Sí</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="esIngresoPrincipalFamiliar" id="esIngresoPrincipalFamiliarNo" value="0" required>
                                <label class="form-check-label" for="esIngresoPrincipalFamiliarNo">No</label>
                            </div>
                        </div>
                        <div class="col-md-4 col-12 mb-3">
                            <label class="form-label">¿Tienes el hábito de ahorrar de manera constante y a largo plazo?</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="tieneHabitoAhorro" id="habitoAhorroSi" value="1" required >
                                <label class="form-check-label" for="habitoAhorroSi">Sí</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="tieneHabitoAhorro" id="habitoAhorroNo" value="0" required>
                                <label class="form-check-label" for="habitoAhorroNo">No</label>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12">
                            <label class="form-label">¿Cuentas con algún sistema de ahorro?</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="cuentaConSistemaAhorro" id="sistemaAhorroSi" value="1" required checked="">
                                <label class="form-check-label" for="sistemaAhorroSi">Sí</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="cuentaConSistemaAhorro" id="sistemaAhorroNo" value="0" required>
                                <label class="form-check-label" for="sistemaAhorroNo">No</label>
                            </div>
                        </div>
                        <div class="col-12" id="seccionDetallesSistemaAhorro">
                            <label for="detallesSistemaAhorro" class="form-label">¿Con qué sistema de ahorro cuentas?</label>
                            <input type="text" class="form-control" id="detallesSistemaAhorro" name="detallesSistemaAhorro" required>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="objetivoAhorro" class="form-label">¿Cuál es el objetivo principal de tus ahorros?</label>
                        <div id="objetivosAhorro">
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="ahorroMensual" class="form-label">¿Cuál es el monto aproximado de tus ahorros mensuales?</label>
                        <div class="input-group">
                            <span class="input-group-text">$</span>
                            <input type="number" class="form-control" id="ahorroMensual" name="ahorroMensual" min="0" value="0" required>
                            <span class="input-group-text">.00</span>
                        </div>
                    </div>
                </div>
            </section>
        </form>
    </div>
</div>