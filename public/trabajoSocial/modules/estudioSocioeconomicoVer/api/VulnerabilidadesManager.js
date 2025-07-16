let vulnerabilidadesGlobal = [];
let idEstudioSocioeconomico = 0;

function renderSeccionVulnerabilidades(vulnerabilidades, idEstudio) {
    vulnerabilidadesGlobal = vulnerabilidades;
    idEstudioSocioeconomico = idEstudio;
    const container = $('#vulnerabilidadesContainer');
    let contenidoHTML = '';

    if (vulnerabilidades.length === 0) {
        contenidoHTML = `
            <div class="d-flex flex-column align-items-center justify-content-center py-5 my-5">
                <div class="text-center">
                    <div class="mb-4">
                        <div class="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center" style="width: 100px; height: 100px;">
                            <i class="ti ti-heart-handshake text-success" style="font-size: 48px;"></i>
                        </div>
                    </div>
                    <h3 class="text-success fw-semibold mb-3">Situación Socioeconómica Estable</h3>
                    <p class="text-muted mb-0 fs-6">No hay vulnerabilidades socioeconómicas que apliquen para incluir en el reporte de evaluación</p>
                </div>
            </div>
        `;
    } else {
        const vulnerabilidadesAplicables = vulnerabilidadesGlobal.filter(v => v.aplica);
        const vulnerabilidadesNoAplicables = vulnerabilidadesGlobal.filter(v => !v.aplica);

        contenidoHTML = `
            <div class="row mb-4">
                <div class="col-12 col-md-6 col-lg-8 d-flex align-items-center">
                    <div class="d-flex gap-3">
                        <span class="badge bg-danger bg-opacity-10 text-danger">
                            <i class="ti ti-alert-triangle me-1"></i>
                            ${vulnerabilidadesAplicables.length} Aplicables
                        </span>
                        <span class="badge bg-secondary bg-opacity-10 text-secondary">
                            <i class="ti ti-check me-1"></i>
                            ${vulnerabilidadesNoAplicables.length} No Aplicables
                        </span>
                    </div>
                </div>
            </div>

            <div class="row g-4">
                <!-- Vulnerabilidades Aplicables -->
                <div class="col-lg-6 col-md-6 col-sm-12 mb-4">
                    <div class="card border-danger border-opacity-25 shadow-sm w-100">
                        <div class="card-header bg-danger bg-opacity-10 border-0 py-4">
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1">
                                    <h5 class="card-title text-danger mb-1 fw-semibold">Vulnerabilidades Aplicables</h5>
                                    <p class="text-muted mb-0 small">
                                        <span class="badge bg-danger bg-opacity-10 text-danger">${vulnerabilidadesAplicables.length}</span>
                                        Condiciones que requieren atención prioritaria
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="card-body p-0" style="max-height: 400px; overflow-y: auto;">
                            ${vulnerabilidadesAplicables.length === 0 ? `
                                <div class="d-flex align-items-center justify-content-center py-5">
                                    <div class="text-center">
                                        <i class="ti ti-heart-handshake text-muted mb-3 opacity-50" style="font-size: 48px;"></i>
                                        <p class="mb-0 text-muted">No hay vulnerabilidades aplicables</p>
                                    </div>
                                </div>
                            ` : `
                                <div class="list-group list-group-flush">
                                    ${vulnerabilidadesAplicables.map(v => `
                                        <div class="list-group-item list-group-item-action border-0 py-3 px-4">
                                            <div class="d-flex align-items-center">
                                                <div class="flex-grow-1 pe-3">
                                                    <div class="d-flex align-items-start">
                                                        <i class="ti ti-alert-triangle text-danger me-3 mt-1 fs-5"></i>
                                                        <div>
                                                            <p class="mb-1 fw-medium text-dark">${v.descripcion}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button class="btn btn-outline-secondary btn-sm rounded-circle p-2" 
                                                        onclick="cambiarEstadoVulnerabilidad(${v.id}, 0, this)"
                                                        title="Mover a No Aplicables"
                                                        data-bs-toggle="tooltip">
                                                    <i class="ti ti-arrow-right fs-6"></i>
                                                </button>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            `}
                        </div>
                    </div>
                </div>

                <!-- Vulnerabilidades No Aplicables -->
                <div class="col-lg-6 col-md-6 col-sm-12 mb-4">
                    <div class="card border-secondary border-opacity-25 shadow-sm w-100">
                        <div class="card-header bg-secondary bg-opacity-10 border-0 py-4">
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1">
                                    <h5 class="card-title text-secondary mb-1 fw-semibold">Vulnerabilidades No Aplicables</h5>
                                    <p class="text-muted mb-0 small">
                                        <span class="badge bg-secondary bg-opacity-10 text-secondary">${vulnerabilidadesNoAplicables.length}</span>
                                        Condiciones que no se presentan en el caso evaluado
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="card-body p-0" style="max-height: 400px; overflow-y: auto;">
                            ${vulnerabilidadesNoAplicables.length === 0 ? `
                                <div class="d-flex align-items-center justify-content-center py-5">
                                    <div class="text-center">
                                        <i class="ti ti-shield-check text-muted mb-3 opacity-50" style="font-size: 48px;"></i>
                                        <p class="mb-0 text-muted">No hay vulnerabilidades no aplicables</p>
                                    </div>
                                </div>
                            ` : `
                                <div class="list-group list-group-flush">
                                    ${vulnerabilidadesNoAplicables.map(v => `
                                        <div class="list-group-item list-group-item-action border-0 py-3 px-4">
                                            <div class="d-flex align-items-center">
                                                <button class="btn btn-outline-danger btn-sm rounded-circle p-2 me-3" 
                                                        onclick="cambiarEstadoVulnerabilidad(${v.id}, 1, this)"
                                                        title="Mover a Aplicables"
                                                        data-bs-toggle="tooltip">
                                                    <i class="ti ti-arrow-left fs-6"></i>
                                                </button>
                                                <div class="flex-grow-1">
                                                    <div class="d-flex align-items-start">
                                                        <div>
                                                            <p class="mb-1 fw-medium text-secondary">${v.descripcion}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    container.html(`
            <div class="row justify-content-center">
                <div class="col-12">
                    <div class="mb-4 mb-lg-5">
                        <div class="d-flex align-items-center mb-3">
                            <div class="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                                <i class="ti ti-user-search text-primary fs-4"></i>
                            </div>
                            <h2 class="mb-0 fw-semibold text-dark">Evaluación Socioeconómica</h2>
                        </div>
                        <div class="alert alert-info border-0 bg-info bg-opacity-10" role="alert">
                            <div class="d-flex align-items-start">
                                <i class="ti ti-info-circle text-info me-3 mt-1 fs-5"></i>
                                <div>
                                    <p class="mb-1 fw-medium text-info">Gestión de Vulnerabilidades Socioeconómicas</p>
                                    <p class="mb-0 text-muted small">
                                        Utiliza las flechas para actualizar las vulnerabilidades aplicables.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Sección de tarjetas -->
                    ${contenidoHTML}
                </div>
            </div>
        
    `);
}

function cambiarEstadoVulnerabilidad(id, nuevoEstado, botonElement) {
    const boton = $(botonElement);
    const iconoOriginal = boton.find('i').attr('class');

    boton.prop('disabled', true);
    boton.find('i').attr('class', 'spinner-border spinner-border-sm');

    const vulnerabilidad = vulnerabilidadesGlobal.find(v => v.id === id);

    if (!vulnerabilidad) {
        mostrarMensajeAdvertencia('No se encontró la vulnerabilidad.', false);
        boton.prop('disabled', false);
        boton.find('i').attr('class', iconoOriginal);
        return;
    }

    const data = {
        case: 'cambiarEstadoVulnerabilidad',
        data: $.param({
            id: vulnerabilidad.id,
            idEstudioSocioeconomico: idEstudioSocioeconomico,
            aplica: nuevoEstado
        })
    };

    print(data);

    crearPeticion(urlAPI, data, function (response) {
        const esError = response?.es_valor_error === true;
        print(response);
        if (esError) {
            mostrarMensajeAdvertencia('Error al actualizar la vulnerabilidad.', false);
        } else {
            vulnerabilidad.aplica = nuevoEstado === 1;
            renderSeccionVulnerabilidades(vulnerabilidadesGlobal, idEstudioSocioeconomico);
        }
        boton.prop('disabled', false);
        boton.find('i').attr('class', iconoOriginal);
    });
}
