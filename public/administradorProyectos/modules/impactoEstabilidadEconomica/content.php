<div class="card">
    <div class="card-body wizard-content">
        <h4 class="card-title">Medición de impacto</h4>
        <p class="card-subtitle mb-3 text-muted">CAMBIO PORCENTUAL EN LA ESTABILIDAD ECONÓMICA</p>

        <!-- Tabs principales -->
        <ul class="nav nav-tabs" id="mainTabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="impacto-tab" data-bs-toggle="tab" data-bs-target="#impacto" type="button" role="tab" aria-controls="impacto" aria-selected="true">CÁLCULO DE IMPACTO</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="configuracion-tab" data-bs-toggle="tab" data-bs-target="#configuracion" type="button" role="tab" aria-controls="configuracion" aria-selected="false">PARÁMETROS DE CONFIGURACIÓN</button>
            </li>
        </ul>

        <!-- Contenido de los Tabs principales -->
        <div class="tab-content mt-3" id="mainTabsContent">
            <!-- Cálculo de Impacto (Tab principal con tabs anidados) -->
            <div class="tab-pane fade show active" id="impacto" role="tabpanel" aria-labelledby="impacto-tab">
                <ul class="nav nav-tabs" id="impactTabs" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="impacto-main-tab" data-bs-toggle="tab" data-bs-target="#impacto-content" type="button" role="tab" aria-controls="impacto-content" aria-selected="true">PONDERACIONES</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="verificacion-tab" data-bs-toggle="tab" data-bs-target="#verificacion" type="button" role="tab" aria-controls="verificacion" aria-selected="false">VERIFICACIÓN</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="narrativa-tab" data-bs-toggle="tab" data-bs-target="#narrativa" type="button" role="tab" aria-controls="narrativa" aria-selected="false">NARRATIVA</button>
                    </li>
                </ul>

                <div class="tab-content mt-3" id="impactTabsContent">
                    <!-- Cálculo de Impacto (sub-tab) -->
                    <div class="tab-pane fade show active" id="impacto-content" role="tabpanel" aria-labelledby="impacto-main-tab">
                        <h5>CÁLCULOS PONDERADOS PARA OBTENER EL IMPACTO</h5>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Sección</th>
                                    <th>Obtenido</th>
                                    <th>Peso</th>
                                    <th>Contribución al Impacto</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Sección 1</td>
                                    <td>23.56%</td>
                                    <td>
                                        <span>60%</span>
                                        <input type="range" id="peso1" min="0" max="100" value="60" class="form-range" onchange="updateImpacto(1)">
                                    </td>
                                    <td>14.13%</td>
                                </tr>
                                <tr>
                                    <td>Sección 2</td>
                                    <td>35.79%</td>
                                    <td>
                                        <span>30%</span>
                                        <input type="range" id="peso2" min="0" max="100" value="30" class="form-range" onchange="updateImpacto(2)">
                                    </td>
                                    <td>10.74%</td>
                                </tr>
                                <tr>
                                    <td>Sección 3</td>
                                    <td>32.14%</td>
                                    <td>
                                        <span>10%</span>
                                        <input type="range" id="peso3" min="0" max="100" value="10" class="form-range" onchange="updateImpacto(3)">
                                    </td>
                                    <td>3.21%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Verificación -->
                    <div class="tab-pane fade" id="verificacion" role="tabpanel" aria-labelledby="verificacion-tab">
                        <h5>CÁLCULOS PONDERADOS PARA OBTENER EL IMPACTO (verificación)</h5>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Descripción</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Suma de los atributos por su peso</td>
                                    <td>28.08%</td>
                                </tr>
                                <tr>
                                    <td>Suma de pesos</td>
                                    <td>100%</td>
                                </tr>
                                <tr>
                                    <td>Evaluación ponderada</td>
                                    <td>28.08%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Narrativa -->
                    <div class="tab-pane fade" id="narrativa" role="tabpanel" aria-labelledby="narrativa-tab">
                        <p id="narrativaText">
                            Contribuimos a mejorar la calidad de vida de 6 familias catalogadas como poblaciones vulnerables con un cambio porcentual del 
                            <span class="text-success fw-bold" id="cambioPorcentual">↑ 28.08%</span> cobertura ZMG entre el año <span id="anioInicioNarrativa"></span> y <span id="anioFinalNarrativa"></span> a través de favorecer las oportunidades en el entorno* y estabilizar su economía** desde nuestros proyectos de intervención social.
                        </p>
                        <small class="text-muted">
                            * Generación de oportunidades en el entorno.<br>
                            ** Estabilización económica de las familias.<br>
                        </small>
                    </div>
                </div>
            </div>

            <!-- Parámetros de Configuración (Tab principal con inputs y otros elementos) -->
            <div class="tab-pane fade" id="configuracion" role="tabpanel" aria-labelledby="configuracion-tab">
                <p>Ajuste los parámetros de configuración según sea necesario para calcular el impacto correctamente.</p>
                <div class="mb-3">
                    <label for="añoInicio" class="form-label">Año de Inicio</label>
                    <select class="form-select" id="añoInicio" aria-label="Selecciona el año de inicio">
                        <!-- Opciones dinámicas de años -->
                    </select>
                </div>

                <!-- Año Final -->
                <div class="mb-3">
                    <label for="añoFinal" class="form-label">Año Final</label>
                    <select class="form-select" id="añoFinal" aria-label="Selecciona el año final">
                        <!-- Opciones dinámicas de años -->
                    </select>
                </div>
            </div>
        </div>
    </div>
</div>
