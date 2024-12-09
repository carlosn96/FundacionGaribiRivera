<div class="card" hidden="" id="main-content">
    <div class="card-body wizard-content">
        <h4 class="card-title">Evaluacion de la formación</h4>
        <p class="card-subtitle mb-3"> Para ser respondido una vez que se concluyó la formación </p>
        <form id="evaluacionForm" class="validation-wizard-horizontal wizard-circle needs-validation" >
            <h6>Beneficios de la formación</h6>
            <section>
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
                    <label for="beneficiosObtenidos" class="form-label">¿Cuáles fueron los beneficios obtenidos?</label>
                    <textarea maxlength="100" class="form-control" id="beneficiosObtenidos" name="beneficiosObtenidos" rows="2" disabled required></textarea>
                </div>
            </section>
            <h6>Administración del negocio</h6>
            <section>
                <div class="mb-4">
                    <label for="sueldoMensual" class="form-label">¿Cuál es tu <strong>sueldo mensual</strong>?</label>
                    <div class="input-group">
                        <span class="input-group-text">$</span>
                        <input type="number" class="form-control" id="sueldoMensual" name="sueldoMensual" min="0" value="0" required>
                        <span class="input-group-text">.00</span>
                    </div>
                </div>
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
                <div class="mb-4">
                    <label for="utilidadesMensuales" class="form-label">¿Cuál es el monto de tus <strong>utilidades</strong> mensuales?</label>
                    <div class="input-group">
                        <span class="input-group-text">$</span>
                        <input type="number" class="form-control" id="utilidadesMensuales" name="utilidadesMensuales" readonly required value="0">
                        <span class="input-group-text">.00</span>
                    </div>
                </div>

                <div class="row mb-4">
                    <div class="col-md-6 col-12 mb-3 mb-md-0">
                        <label class="form-label">¿Es tu negocio la principal fuente de ingresos para ti, <strong>a nivel personal</strong>?</label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="esIngresoPrincipalPersonal" id="ingresoPrincipalSi" value="1" required>
                            <label class="form-check-label" for="ingresoPrincipalSi">Sí</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="esIngresoPrincipalPersonal" id="ingresoPrincipalNo" value="0" required>
                            <label class="form-check-label" for="ingresoPrincipalNo">No</label>
                        </div>
                    </div>
                    <div class="col-md-6 col-12">
                        <label class="form-label">¿Es tu negocio la principal fuente de ingresos <strong>para tu familia</strong>?</label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="esIngresoPrincipalFamiliar" id="esIngresoPrincipalFamiliarSi" value="1" required>
                            <label class="form-check-label" for="esIngresoPrincipalFamiliarSi">Sí</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="esIngresoPrincipalFamiliar" id="esIngresoPrincipalFamiliarNo" value="0" required>
                            <label class="form-check-label" for="esIngresoPrincipalFamiliarNo">No</label>
                        </div>
                    </div>
                </div>

            </section>
            <h6>Gestión y optimización del ahorro</h6>
            <section>
                <div class="row mb-3">
                    <div class="col-md-6 col-12 mb-3 mb-md-0">
                        <label class="form-label">¿Tienes el hábito de ahorrar de manera constante y a largo plazo?</label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="tieneHabitoAhorro" id="habitoAhorroSi" value="1" required>
                            <label class="form-check-label" for="habitoAhorroSi">Sí</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="tieneHabitoAhorro" id="habitoAhorroNo" value="0" required>
                            <label class="form-check-label" for="habitoAhorroNo">No</label>
                        </div>
                    </div>
                    <div class="col-md-6 col-12">
                        <label class="form-label">¿Cuentas con algún sistema de ahorro?</label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="cuentaConSistemaAhorro" id="sistemaAhorroSi" value="1" required>
                            <label class="form-check-label" for="sistemaAhorroSi">Sí</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="cuentaConSistemaAhorro" id="sistemaAhorroNo" value="0" required>
                            <label class="form-check-label" for="sistemaAhorroNo">No</label>
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="detallesSistemaAhorro" class="form-label">¿Con qué sistema de ahorro cuentas?</label>
                    <input type="text" class="form-control" id="detallesSistemaAhorro" name="detallesSistemaAhorro" required>
                </div>
                <div class="mb-3">
                    <label for="objetivoAhorro" class="form-label">¿Cuál es el objetivo principal de tus ahorros?</label>
                    <div id="objetivosAhorro">
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