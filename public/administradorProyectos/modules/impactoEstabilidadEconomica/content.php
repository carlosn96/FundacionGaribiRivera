<div class="card">
    <div class="card-body wizard-content">
        <h4 class="card-title">Medición de impacto</h4>
        <p class="card-subtitle mb-3 text-muted">CAMBIO PORCENTUAL EN LA ESTABILIDAD ECONÓMICA</p>

        <ul class="nav nav-tabs" id="impactTabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="impacto-tab" data-bs-toggle="tab" data-bs-target="#impacto" type="button" role="tab" aria-controls="impacto" aria-selected="true">CÁLCULO DE IMPACTO</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="verificacion-tab" data-bs-toggle="tab" data-bs-target="#verificacion" type="button" role="tab" aria-controls="verificacion" aria-selected="false">VERIFICACIÓN</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="narrativa-tab" data-bs-toggle="tab" data-bs-target="#narrativa" type="button" role="tab" aria-controls="narrativa" aria-selected="false">NARRATIVA</button>
            </li>
        </ul>

        <div class="tab-content mt-3" id="impactTabsContent">
            <!-- CÁLCULOS PONDERADOS PARA OBTENER EL IMPACTO -->
            <div class="tab-pane fade show active" id="impacto" role="tabpanel" aria-labelledby="impacto-tab">
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
                            <td>
                                <a href="#" data-bs-toggle="collapse" data-bs-target="#section1-info" aria-expanded="false" aria-controls="section1-info">
                                    Sección 1
                                </a>
                            </td>
                            <td id="obtenido1">23.56%</td>
                            <td>
                                <span id="peso1-text">60%</span>
                                <input type="range" id="peso1" min="0" max="100" value="60" class="form-range" onchange="updateImpacto(1)">
                            </td>
                            <td id="impacto1">14.13%</td>
                        </tr>
                        <tr>
                            <td>
                                <a href="#" data-bs-toggle="collapse" data-bs-target="#section2-info" aria-expanded="false" aria-controls="section2-info">
                                    Sección 2
                                </a>
                            </td>
                            <td id="obtenido2">35.79%</td>
                            <td>
                                <span id="peso2-text">30%</span>
                                <input type="range" id="peso2" min="0" max="100" value="30" class="form-range" onchange="updateImpacto(2)">
                            </td>
                            <td id="impacto2">10.74%</td>
                        </tr>
                        <tr>
                            <td>
                                <a href="#" data-bs-toggle="collapse" data-bs-target="#section3-info" aria-expanded="false" aria-controls="section3-info">
                                    Sección 3
                                </a>
                            </td>
                            <td id="obtenido3">32.14%</td>
                            <td>
                                <span id="peso3-text">10%</span>
                                <input type="range" id="peso3" min="0" max="100" value="10" class="form-range" onchange="updateImpacto(3)">
                            </td>
                            <td id="impacto3">3.21%</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- CÁLCULOS PONDERADOS PARA OBTENER EL IMPACTO (verificación) -->
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
            <div class="tab-pane fade" id="narrativa" role="tabpanel" aria-labelledby="narrativa-tab">
                <p>
                    Contribuimos a mejorar la calidad de vida de 6 familias catalogadas como poblaciones vulnerables con un cambio porcentual del 
                    <span class="text-success fw-bold">↑ 13.64%</span> cobertura ZMG entre el año 2021 y 2022 a través de favorecer las oportunidades en el entorno* y estabilizar su economía** desde nuestros proyectos de intervención social.
                </p>
                <small class="text-muted">
                    * Generación de oportunidades en el entorno.<br>
                    ** Estabilización económica de las familias.<br>
                    *** ZMG: Zona Metropolitana de Guadalajara.
                </small>
            </div>

        </div>
    </div>
</div>