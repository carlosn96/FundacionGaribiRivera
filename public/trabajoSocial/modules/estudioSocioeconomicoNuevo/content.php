<div class="card" id="contenido">
    <div class="card-body wizard-content">
        <h4 class="card-title">Estudio Socioeconómico</h4>
        <div class="d-flex align-items-center gap-4 flex-wrap">
            <img alt="emprendedor" class="rounded-circle" width="40" height="40" id="fotografiaEmprendedor">
            <h6 class="mb-0" id="nombreEmprendedor"></h6>
        </div>
        <form class="validation-wizard-horizontal wizard-circle needs-validation" id="estudioSocioeconomicoForm">
            <input id="idEmprendedor" name="idEmprendedor" hidden="">
            <h6>Empleabilidad y Seguridad Social</h6>
            <section>
                <div class="mb-4">
                    <h4 class="fw-bold">Empleo actual</h4>
                    <div class="row mb-3">
                        <label for="empresa" class="col-sm-2 col-form-label">Empresa</label>
                        <div class="col-sm-10">
                            <input maxlength="45" type="text" class="form-control" id="empresa" name="empresa" placeholder="Nombre de la empresa" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="puesto" class="col-sm-2 col-form-label">Puesto</label>
                        <div class="col-sm-10">
                            <input maxlength="45" type="text" class="form-control" id="puesto" name="puesto" placeholder="Puesto desempeñado" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="antiguedad" class="col-sm-2 col-form-label">Antigüedad</label>
                        <div class="col-sm-10 d-flex align-items-center">
                            <input type="number" class="form-control w-auto" id="antiguedad" name="antiguedad" placeholder="Años de antigüedad" min="0" required>
                            <span class="ms-2">años</span>
                        </div>
                    </div>
                </div>
                <hr class="my-4">
                <div class="mb-4">
                    <h4 class="fw-bold">Empleo anterior</h4>
                    <div class="row mb-3">
                        <label for="empresaAnterior" class="col-sm-2 col-form-label">Empresa</label>
                        <div class="col-sm-10">
                            <input maxlength="45" type="text" class="form-control" id="empresaAnterior" name="empresaAnterior" placeholder="Nombre de la empresa anterior" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="puestoAnterior" class="col-sm-2 col-form-label">Puesto</label>
                        <div class="col-sm-10">
                            <input maxlength="45" type="text" class="form-control" id="puestoAnterior" name="puestoAnterior" placeholder="Puesto desempeñado en la empresa anterior" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="antiguedadAnterior" class="col-sm-2 col-form-label">Antigüedad</label>
                        <div class="col-sm-10 d-flex align-items-center">
                            <input type="number" class="form-control w-auto" id="antiguedadAnterior" name="antiguedadAnterior" placeholder="Años de antigüedad" min="0" required>
                            <span class="ms-2">años</span>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="motivoRetiro" class="col-sm-2 col-form-label">Motivo del retiro</label>
                        <div class="col-sm-10">
                            <textarea maxlength="45" class="form-control" id="motivoRetiro" name="motivoRetiro" rows="3" placeholder="Motivo por el cual dejó el empleo anterior" required></textarea>
                        </div>
                    </div>
                </div>
                <hr class="my-4">
                <div class="mb-4">
                    <h4 class="fw-bold">Servicios de Seguridad Social</h4>
                    <div class="mb-3">
                        <label class="form-label">¿Cuenta con servicios de seguridad social (IMSS, ISSSTE)?</label>
                        <div class="d-flex">
                            <div class="form-check me-4">
                                <input class="form-check-input" type="radio" name="cuentaConSeguroSocial" id="seguroSi" value="1" required>
                                <label class="form-check-label" for="seguroSi">Sí</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="cuentaConSeguroSocial" id="seguroNo" value="0" required>
                                <label class="form-check-label" for="seguroNo">No</label>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <h6>Datos Familiares</h6>
            <section id="datosFamiliares" class="position-relative">
                <h5 class="fw-bold mb-4">Composición Familiar (Dependientes Económicos)</h5>
                <div class="card border-bottom border-success">
                    <div class="card-body">
                        <div class="d-flex align-items-center justify-content-between mb-4">
                            <div class="d-flex align-items-center">
                                <span class="text-success fs-10 me-3">
                                    <i class="ti ti-users"></i>
                                </span>
                                <div>
                                    <h4 class="fs-6 mb-0" id="totalFamiliares">0</h4>
                                    <h6 class="fw-medium text-success mb-0">Familiares agregados</h6>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-wrap">
                            <div class="col-12 col-md-3 mb-3 d-flex justify-content-between">
                                <div>
                                    <h5 class="fs-5 text-muted mb-1">Ingreso Mensual Fijo</h5>
                                    <div class="d-flex align-items-center">
                                        <span class="fs-4 text-success me-2">$</span>
                                        <span id="totalIngresoFijoValor" class="fs-5 fw-semibold">0</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-3 mb-3 d-flex justify-content-between">
                                <div>
                                    <h5 class="fs-5 text-muted mb-1">Ingreso Mensual Variable</h5>
                                    <div class="d-flex align-items-center">
                                        <span class="fs-4 text-success me-2">$</span>
                                        <span id="totalIngresoVariableValor" class="fs-5 fw-semibold">0</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-3 mb-3 d-flex justify-content-between">
                                <div>
                                    <h5 class="fs-5 text-muted mb-1">Total de Ingresos</h5>
                                    <div class="d-flex align-items-center">
                                        <span class="fs-4 text-success me-2">$</span>
                                        <span id="totalIngresos" class="fs-5 fw-semibold">0</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-3 mb-3 d-flex justify-content-between">
                                <div>
                                    <h5 class="fs-5 text-muted mb-1">Promedio de Ingresos por Integrante</h5>
                                    <div class="d-flex align-items-center">
                                        <span class="fs-4 text-success me-2">$</span>
                                        <span id="promedioIngreso" class="fs-5 fw-semibold">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mb-4">
                    <div class="col-12 d-flex justify-content-end">
                        <button type="button" class="btn mb-1 btn-outline-primary px-4 fs-4" data-bs-toggle="modal" data-bs-target="#modalDependienteFamiliar">
                            <i class="fas fa-plus"></i> Agregar Familiar
                        </button>
                    </div>
                </div>
                <div id="familiaresContainer" class="overflow-auto" style="max-height: 400px; overflow-y: auto;">
                </div>
            </section>

            <h6>Economía Familiar</h6>
            <section id="economiaFamiliarSection">
                <div class="row mb-4">
                    <div class="col">
                        <div class="mb-3">
                            <label for="ingresos" class="form-label">Ingresos</label>
                            <div id="ingresoMensualList">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mb-4">
                    <div class="col">
                        <div class="mb-3">
                            <label for="totalEgresos" class="form-label">Total de egresos</label>
                            <div class="input-group">
                                <span class="input-group-text">$</span>
                                <input type="number" class="form-control" id="totalEgresos" name="totalEgresos" value="0" readonly>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-12">
                        <h5>Detalles de Egresos</h5>
                    </div>

                    <div class="col-md-4 mb-3">
                        <label for="egresosAlimentacion" class="form-label"><i class="ti ti-shopping-cart text-success me-2"></i> Alimentación</label>
                        <div class="input-group">
                            <span class="input-group-text">$</span>
                            <input type="number" class="form-control egreso" id="egresosAlimentacion" name="egresos[alimentacion]" min="0" required>
                        </div>
                    </div>

                    <div class="col-md-4 mb-3">
                        <label for="egresosVivienda" class="form-label"><i class="ti ti-home text-primary me-2"></i> Vivienda</label>
                        <div class="input-group">
                            <span class="input-group-text">$</span>
                            <input type="number" class="form-control egreso" id="egresosVivienda" name="egresos[vivienda]" min="0" required>
                        </div>
                    </div>

                    <div class="col-md-4 mb-3">
                        <label for="egresosCelular" class="form-label"><i class="ti ti-phone text-danger me-2"></i> Celular</label>
                        <div class="input-group">
                            <span class="input-group-text">$</span>
                            <input type="number" class="form-control egreso" id="egresosCelular" name="egresos[celular]" min="0" required>
                        </div>
                    </div>

                    <div class="col-md-4 mb-3">
                        <label for="egresosColegiaturas" class="form-label"><i class="ti ti-book text-warning me-2"></i> Colegiaturas</label>
                        <div class="input-group">
                            <span class="input-group-text">$</span>
                            <input type="number" class="form-control egreso" id="egresosColegiaturas" name="egresos[colegiaturas]" min="0" required>
                        </div>
                    </div>

                    <div class="col-md-4 mb-3">
                        <label for="egresosLuz" class="form-label"><i class="ti ti-bolt text-warning me-2"></i> Luz</label>
                        <div class="input-group">
                            <span class="input-group-text">$</span>
                            <input type="number" class="form-control egreso" id="egresosLuz" name="egresos[luz]" min="0" required>
                        </div>
                    </div>

                    <div class="col-md-4 mb-3">
                        <label for="egresosCamiones" class="form-label"><i class="ti ti-bus text-success me-2"></i> Camiones</label>
                        <div class="input-group">
                            <span class="input-group-text">$</span>
                            <input type="number" class="form-control egreso" id="egresosCamiones" name="egresos[camiones]" min="0" required>
                        </div>
                    </div>

                    <div class="col-md-4 mb-3">
                        <label for="egresosTelefono" class="form-label"><i class="ti ti-phone-call text-primary me-2"></i> Teléfono</label>
                        <div class="input-group">
                            <span class="input-group-text">$</span>
                            <input type="number" class="form-control egreso" id="egresosTelefono" name="egresos[telefono]" min="0" required>
                        </div>
                    </div>

                    <div class="col-md-4 mb-3">
                        <label for="egresosGasolina" class="form-label"><i class="ti ti-gas-station text-danger me-2"></i> Gasolina</label>
                        <div class="input-group">
                            <span class="input-group-text">$</span>
                            <input type="number" class="form-control egreso" id="egresosGasolina" name="egresos[gasolina]" min="0" required>
                        </div>
                    </div>

                    <div class="col-md-4 mb-3">
                        <label for="egresosGas" class="form-label"><i class="ti ti-flame text-warning me-2"></i> Gas</label>
                        <div class="input-group">
                            <span class="input-group-text">$</span>
                            <input type="number" class="form-control egreso" id="egresosGas" name="egresos[gas]" min="0" required>
                        </div>
                    </div>

                    <div class="col-md-4 mb-3">
                        <label for="egresosMedico" class="form-label"><i class="ti ti-heartbeat text-danger me-2"></i> Médico</label>
                        <div class="input-group">
                            <span class="input-group-text">$</span>
                            <input type="number" class="form-control egreso" id="egresosMedico" name="egresos[medico]" min="0" required>
                        </div>
                    </div>

                    <div class="col-md-4 mb-3">
                        <label for="egresosAgua" class="form-label"><i class="ti ti-droplet text-primary me-2"></i> Agua</label>
                        <div class="input-group">
                            <span class="input-group-text">$</span>
                            <input type="number" class="form-control egreso" id="egresosAgua" name="egresos[agua]" min="0" required>
                        </div>
                    </div>

                    <div class="col-md-4 mb-3">
                        <label for="egresosDiversiones" class="form-label"><i class="ti ti-device-gamepad-2 text-success me-2"></i> Diversiones</label>
                        <div class="input-group">
                            <span class="input-group-text">$</span>
                            <input type="number" class="form-control egreso" id="egresosDiversiones" name="egresos[diversiones]" min="0" required>
                        </div>
                    </div>

                    <div class="col-md-4 mb-3">
                        <label for="egresosInternet" class="form-label"><i class="ti ti-wifi text-danger me-2"></i> Internet</label>
                        <div class="input-group">
                            <span class="input-group-text">$</span>
                            <input type="number" class="form-control egreso" id="egresosInternet" name="egresos[internet]" min="0" required>
                        </div>
                    </div>

                    <div class="col-md-4 mb-3">
                        <label for="egresosDeudas" class="form-label"><i class="ti ti-credit-card text-warning me-2"></i> Pago de deudas</label>
                        <div class="input-group">
                            <span class="input-group-text">$</span>
                            <input type="number" class="form-control egreso" id="egresosDeudas" name="egresos[deudas]" min="0" required>
                        </div>
                    </div>

                    <div class="col-md-4 mb-3">
                        <label for="egresosCable" class="form-label"><i class="ti ti-device-tv text-success me-2"></i> Cable</label>
                        <div class="input-group">
                            <span class="input-group-text">$</span>
                            <input type="number" class="form-control egreso" id="egresosCable" name="egresos[cable]" min="0" required>
                        </div>
                    </div>

                    <div class="col-md-4 mb-3">
                        <label for="egresosMedicinas" class="form-label"><i class="ti ti-pills text-danger me-2"></i> Medicinas</label>
                        <div class="input-group">
                            <span class="input-group-text">$</span>
                            <input type="number" class="form-control egreso" id="egresosMedicinas" name="egresos[medicinas]" min="0" required>
                        </div>
                    </div>

                    <div class="col-md-4 mb-3">
                        <label for="egresosOtros" class="form-label"><i class="ti ti-archive text-primary me-2"></i> Otros</label>
                        <div class="input-group">
                            <span class="input-group-text">$</span>
                            <input type="number" class="form-control egreso" id="egresosOtros" name="egresos[otros]" min="0" required>
                        </div>
                    </div>
                </div>
            </section>

            <h6>Vivienda</h6>
            <section>
                <div class="row mb-3 border p-3 rounded">
                    <div class="col-12 col-md-3 col-sm-6">
                        <div class="mb-3">
                            <label for="tipoViviendaList" class="form-label">Tipo</label>
                            <div id="tipoViviendaList"></div>
                        </div>
                    </div>

                    <div class="col-12 col-md-3 col-sm-6">
                        <div class="mb-3">
                            <label for="condicionViviendaList" class="form-label">Condición</label>
                            <div id="condicionViviendaList"></div>
                        </div>
                    </div>

                    <div class="col-12 col-md-3 col-sm-6">
                        <div class="mb-3">
                            <label for="familiasHabitantesViviendaList" class="form-label">Familias Habitantes</label>
                            <div id="familiasHabitantesViviendaList"></div>
                        </div>
                    </div>

                    <div class="col-12 col-md-3 col-sm-6">
                        <div class="mb-3">
                            <label for="usoViviendaList" class="form-label">Uso</label>
                            <div id="usoViviendaList"></div>
                        </div>
                    </div>
                </div>

                <div class="row mb-4 border p-3 rounded">
                    <div class="col-12 col-md-4">
                        <div class="mb-3">
                            <label for="piso" class="form-label">Piso</label>
                            <div id="piso">
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-md-4">
                        <div class="mb-3">
                            <label for="techo" class="form-label">Techo</label>
                            <div id="techo">
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-md-4">
                        <div class="mb-3">
                            <label for="pared" class="form-label">Paredes</label>
                            <div id="pared">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mb-4 border p-3 rounded">
                    <div class="col-12 col-md-6">
                        <div class="mb-3">
                            <label for="distribucion" class="form-label">Distribución de la Vivienda</label>
                            <div id="distribucion">
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-md-6">
                        <div class="mb-3">
                            <label for="servicios" class="form-label">Servicios de la Vivienda</label>
                            <div id="servicios">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <h6 class="mt-4">Otros Bienes</h6>
            <section>
                <div class="row mb-4">
                    <div class="col text-center">
                        <div class="form-group">
                            <label for="vehiculoPropio" class="form-label">¿Cuenta con vehículo propio?</label>
                            <div class="input-group justify-content-center">
                                <div class="form-check form-check-inline">
                                    <input type="radio" id="vehiculoPropioSi" name="vehiculoPropio" class="form-check-input" value="1" required checked>
                                    <label class="form-check-label" for="vehiculoPropioSi">Sí</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input type="radio" id="vehiculoPropioNo" name="vehiculoPropio" class="form-check-input" value="0" required>
                                    <label class="form-check-label" for="vehiculoPropioNo">No</label>
                                </div>
                            </div>
                        </div>
                    </div>                   
                </div>
                <div class="row g-3" id="infoVehiculo">
                    <div class="col-sm-12 col-md-4">
                        <div class="form-group">
                            <label for="tipoVehiculo" class="form-label">Tipo de vehículo</label>
                            <input maxlength="45" type="text" class="form-control" name="tipoVehiculo" id="tipoVehiculo" required placeholder="Ej. Sedan, SUV, etc.">
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-4">
                        <div class="form-group">
                            <label for="marcaVehiculo" class="form-label">Marca de vehículo</label>
                            <input maxlength="45" type="text" class="form-control" name="marcaVehiculo" id="marcaVehiculo" required placeholder="Ej. Toyota, Ford, etc.">
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-4">
                        <div class="form-group">
                            <label for="modeloVehiculo" class="form-label">Modelo de vehículo</label>
                            <input maxlength="45" type="text" class="form-control" name="modeloVehiculo" id="modeloVehiculo" required placeholder="Ej. 2025, 2024, etc.">
                        </div>
                    </div>
                </div>
            </section>
            <h6>Referencias</h6>
            <section id="referenciasSection">
                <div class="row mb-4">
                    <h5 class="mb-3">Referencia Comercial</h5>
                    <div class="col-12 col-md-4">
                        <div class="mb-3">
                            <label for="empresaComercial" class="form-label">Empresa</label>
                            <input maxlength="45" type="text" class="form-control" id="empresaComercial" name="referencias[comercial][empresa]" required>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="mb-3">
                            <label for="montoCredito" class="form-label">Monto de crédito</label>
                            <input type="number" class="form-control" id="montoCredito" name="referencias[comercial][montoCredito]" required>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="mb-3">
                            <label for="limiteCredito" class="form-label">Límite de crédito</label>
                            <input type="number" class="form-control" id="limiteCredito" name="referencias[comercial][limiteCredito]" required>
                        </div>
                    </div>
                </div>

                <div class="row mb-4">
                    <h5 class="mb-3">Referencia Familiar</h5>
                    <div class="col-12 col-md-4">
                        <div class="mb-3">
                            <label for="nombreReferenciaFamiliar" class="form-label">Nombre</label>
                            <input maxlength="60" type="text" class="form-control" id="nombreReferenciaFamiliar" name="referencias[familiar][nombre]" required>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="mb-3">
                            <label for="telefonoFamiliar" class="form-label">Teléfono</label>
                            <input type="tel" class="form-control" id="telefonoFamiliar" name="referencias[familiar][telefono]" required>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="mb-3">
                            <label for="parentescoReferenciaFamiliar" class="form-label">Parentesco</label>
                            <input maxlength="45" type="text" class="form-control" id="parentescoRefenciaFamiliar" name="referencias[familiar][parentesco]" required>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="opinionFamiliar" class="form-label">Opinión</label>
                            <textarea class="form-control" id="opinionFamiliar" name="referencias[familiar][opinion]" rows="3" placeholder="Escribe la opinión sobre la persona..." required></textarea>
                        </div>
                    </div>
                </div>

                <div class="row mb-4">
                    <h5 class="mb-3">Referencia Personal</h5>
                    <div class="col-12 col-md-4">
                        <div class="mb-3">
                            <label for="nombrePersonal" class="form-label">Nombre</label>
                            <input maxlength="60" type="text" class="form-control" id="nombrePersonal" name="referencias[personal][nombre]" required>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="mb-3">
                            <label for="telefonoPersonal" class="form-label">Teléfono</label>
                            <input type="tel" class="form-control" id="telefonoPersonal" name="referencias[personal][telefono]" required>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="mb-3">
                            <label for="tiempoConocerlo" class="form-label">Tiempo de conocerlo</label>
                            <input type="number" class="form-control" id="tiempoConocerlo" name="referencias[personal][tiempoConocerlo]" required>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="opinionPersonal" class="form-label">Opinión</label>
                            <textarea class="form-control" id="opinionPersonal" name="referencias[personal][opinion]" rows="3" placeholder="Escribe la opinión sobre la persona..." required></textarea>
                        </div>
                    </div>
                </div>
            </section>
            <h6>Vulnerabilidad</h6>
            <section>
                <div class="form-group text-center">
                    <label for="esVulnerable" class="form-label">¿Es vulnerable?</label>
                    <div class="d-flex justify-content-center gap-4 align-items-center">
                        <div class="d-flex flex-column align-items-center">
                            <input type="radio" class="btn-check" name="vulnerabilidad[esVulnerable]" value="1" id="esVulnerableSi" checked>
                            <label class="btn btn-outline-primary w-100" for="esVulnerableSi">SÍ</label>
                        </div>
                        <div class="d-flex flex-column align-items-center">
                            <input type="radio" class="btn-check" name="vulnerabilidad[esVulnerable]" value="0" id="esVulnerableNo" >
                            <label class="btn btn-outline-primary w-100" for="esVulnerableNo">NO</label>
                        </div>
                    </div>
                </div>
                <div id="vulnerabilidadOptions">
                    <h5 class="mt-3">Tipo de vulnerabilidad</h5>
                    <div class="form-group">
                        <label for="vulnerabilidadList" class="form-label">Seleccione el tipo de vulnerabilidad</label>
                        <div class="btn-group-vertical w-100" role="group" id="vulnerabilidadList">
                        </div>
                    </div>
                </div>
            </section>
            <h6 class="text-primary">Conclusiones</h6>
            <section class="my-4">
                <h5 class="mt-3">Actitudes de la persona</h5>

                <div class="row mb-4">
                    <div class="col-md-6 col-12 mb-3 mb-md-0">
                        <div class="border p-3 rounded shadow-sm">
                            <label for="actitudesPositivasList" class="form-label text-muted">Actitudes Positivas</label>
                            <div id="actitudesPositivasList" class="form-control" style="min-height: 150px; background-color: #f8f9fa;"></div>
                        </div>
                    </div>
                    <div class="col-md-6 col-12">
                        <div class="border p-3 rounded shadow-sm">
                            <label for="actitudesNegativasList" class="form-label text-muted">Actitudes Negativas</label>
                            <div id="actitudesNegativasList" class="form-control" style="min-height: 150px; background-color: #f8f9fa;"></div>
                        </div>
                    </div>
                </div>
                <div class="row mb-4 align-items-center">
                    <label for="observacionesGenerales" class="form-label col-sm-3 col-form-label text-muted">Observaciones generales</label>
                    <div class="col-sm-9">
                        <textarea class="form-control shadow-sm" id="observacionesGenerales" name="observacionesGenerales"
                                  rows="4" required placeholder="Escribe aquí tus observaciones..."></textarea>
                    </div>
                </div>
                <div class="row mb-4 align-items-center">
                    <label for="fotografiasEvidencia" class="form-label col-sm-3 col-form-label text-muted">Fotografías de evidencia</label>
                    <div class="col-sm-9">
                        <input required="" class="form-control" type="file" id="fotografiasEvidencia" name="fotografiasEvidencia" multiple
                               accept=".png, .jpg, .jpeg">
                    </div>
                </div>
            </section>
        </form>
    </div>
</div>

<div class="modal fade" id="modalDependienteFamiliar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalDependienteFamiliarLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
        <div class="modal-content">
            <div class="modal-header d-flex align-items-center">
                <h5 class="modal-title" id="modalDependienteFamiliarLabel">Agregar familiar</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formFamiliar">
                    <div class="row g-3">
                        <!-- Nombre -->
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="nombreFamiliar">
                                    <i class="ti ti-user me-2 fs-4 text-warning"></i>
                                    Nombre
                                </label>
                                <input maxlength="45" type="text" class="form-control border border-warning" id="nombreFamiliar" name="nombreFamiliar" required>
                            </div>
                        </div>

                        <!-- Parentesco -->
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="parentescoFamiliar">
                                    <i class="ti ti-users me-2 fs-4 text-warning"></i>
                                    Parentesco
                                </label>
                                <input maxlength="20" type="text" class="form-control border border-warning" id="parentescoFamiliar" name="parentescoFamiliar" required>
                            </div>
                        </div>

                        <!-- Edad -->
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="edadFamiliar">
                                    <i class="ti ti-calendar me-2 fs-4 text-warning"></i>
                                    Edad
                                </label>
                                <input type="number" class="form-control border border-warning" id="edadFamiliar" name="edadFamiliar" min="0" required>
                            </div>
                        </div>

                        <!-- Estado Civil -->
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="estadoCivilFamiliar">
                                    <i class="ti ti-heart me-2 fs-4 text-warning"></i>
                                    Estado Civil
                                </label>
                                <div id="estadoCivilFamiliarModal"></div>
                            </div>
                        </div>

                        <!-- Escolaridad -->
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="escolaridadFamiliar">
                                    <i class="ti ti-book me-2 fs-4 text-warning"></i>
                                    Escolaridad
                                </label>
                                <div id="escolaridadFamiliarModal"></div>
                            </div>
                        </div>

                        <!-- Ocupación -->
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="ocupacionFamiliarModal">
                                    <i class="ti ti-briefcase me-2 fs-4 text-warning"></i>
                                    Ocupación
                                </label>
                                <div id="ocupacionFamiliarModal"></div>
                            </div>
                        </div>

                        <!-- Ingreso Mensual Fijo -->
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="ingresoMensualFijoFamiliar">
                                    <i class="ti ti-currency-dollar me-2 fs-4 text-warning"></i>
                                    Ingreso Mensual Fijo
                                </label>
                                <input type="number" class="form-control border border-warning" id="ingresoMensualFijoFamiliar" name="ingresoMensualFijoFamiliar" required>
                            </div>
                        </div>

                        <!-- Ingreso Mensual Variable -->
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="ingresoMensualVariableFamiliar">
                                    <i class="ti ti-currency-dollar me-2 fs-4 text-warning"></i>
                                    Ingreso Mensual Variable
                                </label>
                                <input type="number" class="form-control border border-warning" id="ingresoMensualVariableFamiliar" name="ingresoMensualVariableFamiliar" required>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="reset" class="btn btn-outline-danger" data-bs-dismiss="modal">
                    Cancelar
                </button>
                <button type="submit" class="btn btn-outline-primary" form="formFamiliar">
                    Guardar
                </button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalEditarFamiliar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalEditarFamiliarLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
        <div class="modal-content">
            <div class="modal-header d-flex align-items-center">
                <h5 class="modal-title" id="modalEditarFamiliarLabel">Editar Familiar</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formEditarFamiliar">
                    <div class="row g-3">
                        <!-- Nombre -->
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="nombreFamiliarEditar">
                                    <i class="ti ti-user me-2 fs-4 text-warning"></i>
                                    Nombre
                                </label>
                                <input type="text" class="form-control border border-warning" id="nombreFamiliarEditar" name="nombreFamiliarEditar" required>
                            </div>
                        </div>

                        <!-- Parentesco -->
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="parentescoFamiliarEditar">
                                    <i class="ti ti-users me-2 fs-4 text-warning"></i>
                                    Parentesco
                                </label>
                                <input type="text" class="form-control border border-warning" id="parentescoFamiliarEditar" name="parentescoFamiliarEditar" required>
                            </div>
                        </div>

                        <!-- Edad -->
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="edadFamiliarEditar">
                                    <i class="ti ti-calendar me-2 fs-4 text-warning"></i>
                                    Edad
                                </label>
                                <input type="number" class="form-control border border-warning" id="edadFamiliarEditar" name="edadFamiliarEditar" min="0" required>
                            </div>
                        </div>

                        <!-- Estado Civil -->
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="estadoCivilFamiliarEditar">
                                    <i class="ti ti-heart me-2 fs-4 text-warning"></i>
                                    Estado Civil
                                </label>
                                <div id="estadoCivilFamiliarModalEditar"></div>
                            </div>
                        </div>

                        <!-- Escolaridad -->
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="escolaridadFamiliarEditar">
                                    <i class="ti ti-book me-2 fs-4 text-warning"></i>
                                    Escolaridad
                                </label>
                                <div id="escolaridadFamiliarModalEditar"></div>
                            </div>
                        </div>

                        <!-- Ocupación -->
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="ocupacionFamiliarModalEditar">
                                    <i class="ti ti-briefcase me-2 fs-4 text-warning"></i>
                                    Ocupación
                                </label>
                                <div id="ocupacionFamiliarModalEditar"></div>
                            </div>
                        </div>

                        <!-- Ingreso Mensual Fijo -->
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="ingresoMensualFijoFamiliarEditar">
                                    <i class="ti ti-currency-dollar me-2 fs-4 text-warning"></i>
                                    Ingreso Mensual Fijo
                                </label>
                                <input type="number" class="form-control border border-warning" id="ingresoMensualFijoFamiliarEditar" name="ingresoMensualFijoFamiliarEditar" required>
                            </div>
                        </div>

                        <!-- Ingreso Mensual Variable -->
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="ingresoMensualVariableFamiliarEditar">
                                    <i class="ti ti-currency-dollar me-2 fs-4 text-warning"></i>
                                    Ingreso Mensual Variable
                                </label>
                                <input type="number" class="form-control border border-warning" id="ingresoMensualVariableFamiliarEditar" name="ingresoMensualVariableFamiliarEditar" required>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div class="modal-footer">
                <button type="reset" class="btn btn-outline-danger" data-bs-dismiss="modal">
                    Cancelar
                </button>
                <button id="btnEditarFamiliar" type="submit" class="btn btn-outline-primary" form="formEditarFamiliar">
                    Actualizar
                </button>
            </div>
        </div>
    </div>
</div>
<!-- Modal de resultado de visita -->
<div class="modal fade" id="resultadoVisitaModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-md">
        <div class="modal-content rounded-4 shadow-lg">
            <div class="modal-header border-0 pb-0">
                <h5 class="modal-title fw-bold fs-5">Resultado de la Visita</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center">
                <div class="mb-4">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="resultadoVisita" id="favorable" value="Favorable" required>
                        <label class="form-check-label" for="favorable">Favorable</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="resultadoVisita" id="noFavorable" value="No favorable" required>
                        <label class="form-check-label" for="noFavorable">No favorable</label>
                    </div>
                </div>

                <div class="btn-group w-100 mt-4" role="group" aria-label="Acciones">
                    <button type="button" class="btn btn-outline-primary w-50" id="confirmarEvaluacion">
                        Confirmar Evaluación
                    </button>
                    <button type="button" class="btn btn-outline-warning w-50" data-bs-dismiss="modal">
                        Regresar
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
