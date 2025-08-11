const urlAPI = "api/LineaBaseVerAPI.php";

function ready() {
    crearPeticion(urlAPI, {case: 'recuperarInfoLineaBase'}, (res) => {
        const emprendedor = res.emprendedor;
        $("#tipoLineaBase").text(res.tipo);
        if (res.existeLineaBase) {
            const data = res.data;
            $("#content").append(res.tipo === 'inicial' ? crearLineaBaseInicial(data) : crearLineaBaseFinal(data));
            $("#fechaCreacion").html("<strong>Información actualizada a la fecha: </strong> <span>"+data.fechaCreacion+"</span>");
        } else {
            $("#content").append(renderizarSecciones([construirSeccionNoLineaBase()]));
        }

        $("#nombreEmprendedor").text(emprendedor.nombre + " " + emprendedor.apellidos);
        $("#perfilEmprendedor").prop("src", "data:image/jpeg;base64," + emprendedor.fotografia);
    });
}

function crearLineaBaseFinal(data) {
    const sections = [
        construirSeccionPreliminarFinal(data.preliminar),
        construirSeccionSocioeconomico(data.socioeconomico)
    ];
    if (data.negocio) {
        sections.push(construirSeccionNegocio(data.negocio),
                construirSeccionAnalisisNegocio(data.analisisNegocio),
                construirSeccionAdministracionIngresos(data.administracionIngresos));
    } else {
        sections.push(construirSeccionNoInfoNegocio());
    }
    return renderizarSecciones(sections);
}

function crearLineaBaseInicial(data) {
    const sections = [
        construirSeccionPreliminarInicial(data.preliminar),
        construirSeccionIdentificacion(data.identificacion),
        construirSeccionDomicilio(data.domicilio),
        construirSeccionSocioeconomico(data.socioeconomico)
    ];
    if (data.negocio) {
        sections.push(construirSeccionNegocio(data.negocio),
                construirSeccionAnalisisNegocio(data.analisisNegocio),
                construirSeccionAdministracionIngresos(data.administracionIngresos));
    } else {
        sections.push(construirSeccionNoInfoNegocio());
    }

    return renderizarSecciones(sections);
}

function renderizarSecciones(sections) {
    let html = `
    <div id="content">
        <div class="position-relative overflow-hidden">
            <div class="position-relative overflow-hidden rounded-3">
                <img src="../../../assets/images/backgrounds/profilebg.jpg" alt="spike-img" class="w-100">
            </div>
            <div class="card mx-9 mt-n5">
                <div class="card-body pb-0">
                    <div class="d-md-flex align-items-center justify-content-between text-center text-md-start">
                        <div class="d-md-flex align-items-center">
                            <div class="rounded-circle position-relative mb-9 mb-md-0 d-inline-block">
                                <img id="perfilEmprendedor" class="img-fluid rounded-circle" width="100" height="100">
                            </div>
                            <div class="ms-0 ms-md-3 mb-9 mb-md-0">
                                <div class="d-flex align-items-center justify-content-center justify-content-md-start mb-1">
                                    <h4 class="me-7 mb-0 fs-7" id="nombreEmprendedor"></h4>
                                </div>
                                <p class="fs-4 mb-1">Emprendedor</p>
                                <p id="fechaCreacion"></p>
                            </div>
                        </div>
                        <button type="button" class="btn btn-outline-warning px-3 shadow-none" onclick="descargarLineaBase()">
                            <i class="ti ti-download fs-4 me-2"></i>Descargar línea base
                        </button>
                    </div>
                    <!-- Navegación de tabs -->
                    <ul class="nav nav-pills user-profile-tab mt-4 justify-content-center justify-content-md-start" id="pills-tab" role="tablist">
    `;

    // Crear los tabs (nav-pills) para cada sección
    sections.forEach((section, index) => {
        html += `
            <li class="nav-item me-2 me-md-3" role="presentation">
                <button class="nav-link position-relative rounded-0 ${index === 0 ? 'active' : ''} d-flex align-items-center justify-content-center bg-transparent py-6" id="pills-${section.title.toLowerCase().replace(/\s/g, '-')}-tab" data-bs-toggle="pill" data-bs-target="#pills-${section.title.toLowerCase().replace(/\s/g, '-')}" type="button" role="tab" aria-controls="pills-${section.title.toLowerCase().replace(/\s/g, '-')}" aria-selected="${index === 0 ? 'true' : 'false'}">
                    <i class="${section.icon} me-0 me-md-6 fs-6"></i>
                    <span class="d-none d-md-block">${section.title}</span>
                </button>
            </li>
        `;
    });

    html += `</ul></div></div></div>`;

    // Crear contenido de las pestañas (tab-content)
    html += `<div class="tab-content mx-10" id="pills-tabContent">`;

    sections.forEach((section, index) => {
        html += `
        <div class="tab-pane fade ${index === 0 ? 'show active' : ''}" id="pills-${section.title.toLowerCase().replace(/\s/g, '-')}" role="tabpanel" aria-labelledby="pills-${section.title.toLowerCase().replace(/\s/g, '-')}-tab" tabindex="0">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${section.title}</h5>
                    <div class="card-text">${section.content}</div>
                </div>
            </div>
        </div>
        `;
    });

    html += `</div></div>`;

    return html;
}

function construirSeccionIdentificacion(identificacion) {
    return {
        icon: 'ti ti-user',
        title: 'Identificación',
        content: `
            <div class="d-flex align-items-center mb-9">
                <div class="bg-primary-subtle text-primary fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-a-b"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Género</h6>
                    <p class="mb-0">${identificacion.genero}</p>
                </div>
            </div>
            <div class="d-flex align-items-center mb-9">
                <div class="bg-success-subtle text-success fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-calendar"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Edad</h6>
                    <p class="mb-0">${identificacion.edad}</p>
                </div>
            </div>
            <div class="d-flex align-items-center mb-9">
                <div class="bg-warning-subtle text-warning fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-heart"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Estado Civil</h6>
                    <p class="mb-0">${identificacion.estadoCivil.descripcion}</p>
                </div>
            </div>
            <div class="d-flex align-items-center mb-9">
                <div class="bg-info-subtle text-info fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-book"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Escolaridad</h6>
                    <p class="mb-0">${identificacion.escolaridad.descripcion}</p>
                </div>
            </div>
            <div class="d-flex align-items-center mb-9">
                <div class="bg-danger-subtle text-danger fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-disabled"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">¿Presentas alguna dispacidad?</h6>
                    <p class="mb-0">${identificacion.discapacidad}</p>
                </div>
            </div>
        `
    };
}

function construirSeccionPreliminarFinal(preliminar) {
    return {
        icon: 'ti ti-home-2',
        title: 'Preliminar',
        content: `
            <div class="d-flex align-items-center mb-9">
                <div class="bg-success-subtle text-success fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-bookmark-question"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">¿Consideras que hubo algún beneficio a nivel personal después de la formación o acompañamiento?</h6>
                    <p class="mb-0">${preliminar.huboBeneficiosPersonal.res}</p>
                    <p class="mb-0">${preliminar.beneficios !== null ? preliminar.beneficios : ''}</p>
                </div>
            </div>
        `
    };
}

function construirSeccionPreliminarInicial(preliminar) {
    const listaMedios = preliminar.listaMedioConoceFundacion.map(i => `
        <li>
            <i class="${i.icon} text-info"></i> ${i.descripcion}
        </li>
    `).join('');
    var credito = '';
    if (preliminar.razonRecurreFundacion.descripcion.includes("Crédito")) {
        credito = `
            <div class="d-flex align-items-center mb-9">
                <div class="bg-success-subtle text-success fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-credit-card"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">${preliminar.solicitaCredito.descripcion}</h6>
                </div>
            </div>
            <div class="d-flex align-items-center mb-9">
                <div class="bg-primary-subtle text-primary fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-arrow-right-circle"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">${preliminar.utilizaCredito.descripcion}</h6>
                </div>
            </div>
        `;
    }
    return {
        icon: 'ti ti-home-2',
        title: 'Preliminar',
        content: `
            <div class="d-flex align-items-center mb-9">
                <div class="bg-info-subtle text-info fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-eye-question"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">¿Cómo te enteraste de la Fundación?</h6>
                    <ul>${listaMedios}</ul>
                </div>
            </div>
            ${preliminar.otroMedioConoceFundacion ? `
            <div class="d-flex align-items-center mb-9">
                <div class="bg-secondary-subtle text-secondary fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-share"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Otro Medio:</h6>
                    <p class="mb-0">${preliminar.otroMedioConoceFundacion}</p>
                </div>
            </div>
            ` : ''}
            <div class="d-flex align-items-center mb-9">
                <div class="bg-warning-subtle text-warning fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-bell-question"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Recurres a la Fundación para:</h6>
                    <p class="mb-0">${preliminar.razonRecurreFundacion.descripcion}</p>
                </div>
            </div>
            ${preliminar.otraRazonRecurreFundacion ? `
            <div class="d-flex align-items-center mb-9">
                <div class="bg-danger-subtle text-danger fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-alert-circle"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Otra Razón:</h6>
                    <p class="mb-0">${preliminar.otraRazonRecurreFundacion}</p>
                </div>
            </div>
            ` : ''}
            ${credito}
            <div class="d-flex align-items-center mb-9">
                <div class="bg-success-subtle text-success fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-clock"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">¿Cuánto tiempo a la semana puedes dedicar para formarte/capacitarte de manera permanente?</h6>
                    <p class="mb-0">${preliminar.tiempoDedicaCapacitacion.descripcion}</p>
                </div>
            </div>
        `
    };
}

function construirSeccionDomicilio(domicilio) {
    const fields = [
        {
            label: 'Dirección',
            value: `${domicilio.calle}, ${domicilio.numeroExterior} (Int. ${domicilio.numeroInterior ? domicilio.numeroInterior : 'N/A'})`,
            icon: 'ti ti-home',
            bgColor: 'primary'
        },
        {label: 'Entre Calle', value: domicilio.calleCruce1, icon: 'ti ti-arrow-right', bgColor: 'warning'},
        {label: 'Y Calle', value: domicilio.calleCruce2, icon: 'ti ti-arrow-left-right', bgColor: 'danger'},
        {label: 'Código Postal', value: `${domicilio.codigoPostal.codigo} (${domicilio.codigoPostal.colonia})`, icon: 'ti ti-location-pin', bgColor: 'primary'},
        {label: 'Municipio', value: domicilio.municipio.nombre, icon: 'ti ti-home-bolt', bgColor: 'secondary'},
        {label: 'Estado', value: domicilio.estado, icon: 'ti ti-map-pin', bgColor: 'info'},
        {label: 'Comunidad Parroquial', value: domicilio.comunidadParroquial.nombre, icon: 'ti ti-building-church', bgColor: 'success', extraInfo: `Decanato: "${domicilio.comunidadParroquial.decanato}", Vicaría: "${domicilio.comunidadParroquial.vicaria}"`}
    ];

    const content = `
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            ${fields.map(field => {
        return `
                    <div class="col">
                        <div class="card shadow-sm border-0 rounded-3">
                            <div class="card-body d-flex align-items-center">
                                <div class="bg-${field.bgColor}-subtle text-${field.bgColor} fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                                    <i class="${field.icon}"></i>
                                </div>
                                <div class="ms-4">
                                    <h6 class="mb-1">${field.label}</h6>
                                    <p class="mb-0">${field.value}</p>
                                    ${field.extraInfo ? `<p class="mb-0">${field.extraInfo}</p>` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
    }).join('')}
        </div>
    `;

    return {
        icon: 'ti ti-map-pin',
        title: 'Domicilio',
        content: content
    };
}



function construirSeccionSocioeconomico(socioeconomico) {
    return {
        icon: 'ti ti-wallet',
        title: 'Socioeconómico',
        content: `
            <div class="d-flex align-items-center mb-9">
                <div class="bg-primary-subtle text-primary fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-users"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Cantidad de Dependientes</h6>
                    <p class="mb-0">${socioeconomico.cantidadDependientes}</p>
                </div>
            </div>
            <div class="d-flex align-items-center mb-9">
                <div class="bg-success-subtle text-success fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-briefcase"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Ocupación Actual</h6>
                    <p class="mb-0">${socioeconomico.ocupacionActual.descripcion}</p>
                </div>
            </div>
            <div class="d-flex align-items-center mb-9">
                <div class="bg-info-subtle text-info fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-wallet"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Ingreso Mensual</h6>
                    <p class="mb-0">${socioeconomico.ingresoMensual.descripcion}</p>
                </div>
            </div>
        `
    };
}

function construirSeccionNegocio(negocio) {
    const content = `
    <!-- Otras tarjetas del negocio -->
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <div class="col">
                <div class="card border-light shadow-sm rounded-3">
                    <div class="card-body d-flex align-items-center p-3">
                        <div class="bg-primary-subtle text-primary rounded-circle p-3">
                            <i class="ti ti-credit-card fs-16"></i>
                        </div>
                        <div class="ms-4">
                            <h6 class="mb-1">Nombre del Negocio</h6>
                            <p class="mb-0 text-truncate" style="max-width: 200px;">${negocio.nombre}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="card border-light shadow-sm rounded-3">
                    <div class="card-body d-flex align-items-center p-3">
                        <div class="bg-info-subtle text-info rounded-circle p-3">
                            <i class="ti ti-phone fs-16"></i>
                        </div>
                        <div class="ms-4">
                            <h6 class="mb-1">Teléfono</h6>
                            <p class="mb-0 text-truncate" style="max-width: 200px;">${negocio.telefono}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="card border-light shadow-sm rounded-3">
                    <div class="card-body d-flex align-items-center p-3">
                        <div class="bg-success-subtle text-success rounded-circle p-3">
                            <i class="ti ti-calendar fs-16"></i>
                        </div>
                        <div class="ms-4">
                            <h6 class="mb-1">Antigüedad</h6>
                            <p class="mb-0 text-truncate" style="max-width: 200px;">${negocio.antiguedad}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="card border-light shadow-sm rounded-3">
                    <div class="card-body d-flex align-items-center p-3">
                        <div class="bg-danger-subtle text-danger rounded-circle p-3">
                            <i class="ti ti-devices-dollar fs-16"></i>
                        </div>
                        <div class="ms-4">
                            <h6 class="mb-1">Giro</h6>
                            <p class="mb-0 text-truncate" style="max-width: 200px;">${negocio.giro.descripcion}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="card border-light shadow-sm rounded-3">
                    <div class="card-body d-flex align-items-center p-3">
                        <div class="bg-secondary-subtle text-secondary rounded-circle p-3">
                            <i class="ti ti-devices-dollar fs-16"></i>
                        </div>
                        <div class="ms-4">
                            <h6 class="mb-1">Actividad</h6>
                            <p class="mb-0 text-truncate" style="max-width: 200px;">${negocio.actividad.descripcion}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tarjeta de la Dirección -->
        <div class="card border-light mb-4 rounded-3 shadow-sm">
            <div class="card-body p-4">
                <h5 class="text-dark mb-3">Dirección</h5>
                <div class="d-flex flex-wrap mb-3">
                    <div class="d-flex align-items-center mb-2 me-4">
                        <div class="bg-primary-subtle text-primary rounded-circle p-3">
                            <i class="ti ti-location-pin fs-16"></i>
                        </div>
                        <div class="ms-3">
                            <p class="mb-0">Calle ${negocio.calle}, # ${negocio.numExterior} ${negocio.numInterior ? `(Int. ${negocio.numInterior})` : ''}, entre ${negocio.calleCruce1} y ${negocio.calleCruce2}</p>
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-wrap mb-3">
                    <div class="d-flex align-items-center mb-2 me-4">
                        <div class="bg-primary-subtle text-primary rounded-circle p-3">
                            <i class="ti ti-location-pin fs-16"></i>
                        </div>
                        <div class="ms-3">
                            <p class="mb-0"><strong>Código Postal:</strong> ${negocio.codigoPostal.codigo} (${negocio.codigoPostal.colonia})</p>
                        </div>
                    </div>
                    <div class="d-flex align-items-center mb-2 me-4">
                        <div class="bg-info-subtle text-info rounded-circle p-3">
                            <i class="ti ti-map fs-16"></i>
                        </div>
                        <div class="ms-3">
                            <p class="mb-0"><strong>Municipio:</strong> ${negocio.municipio.nombre}</p>
                        </div>
                    </div>
                    <div class="d-flex align-items-center mb-2">
                        <div class="bg-warning-subtle text-warning rounded-circle p-3">
                            <i class="ti ti-map-pin fs-16"></i>
                        </div>
                        <div class="ms-3">
                            <p class="mb-0"><strong>Estado:</strong> ${negocio.estado}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tarjeta de Cantidad de Empleados (Destacada) -->
        <div class="card border-warning mb-4 rounded-3 shadow-lg">
            <div class="card-body p-4">
                <h5 class="text-warning mb-3"><strong>Cantidad de Empleados</strong></h5>
                <div class="d-flex align-items-center">
                    <div class="bg-warning-subtle text-warning rounded-circle p-3">
                        <i class="ti ti-users fs-16"></i>
                    </div>
                    <div class="ms-3">
                        <p class="mb-0">${negocio.cantEmpleados.descripcion}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    return {
        icon: 'ti ti-home-dollar',
        title: 'Negocio',
        content: content
    };
}

// Función para "Análisis del Negocio"
function construirSeccionAnalisisNegocio(analisisNegocio) {
    return {
        icon: 'ti ti-chart-arrows',
        title: 'Análisis del Negocio',
        content: `
            <div class="d-flex align-items-center mb-9">
                <div class="bg-primary-subtle text-primary fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-chart-area-line-filled"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Registra Entrada y Salida</h6>
                    <p class="mb-0">${analisisNegocio.registraEntradaSalida.res}</p>
                </div>
            </div>
            <div class="d-flex align-items-center mb-9">
                <div class="bg-info-subtle text-info fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-dollar-sign"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Asigna Sueldo</h6>
                    <p class="mb-0">${analisisNegocio.asignaSueldo.res}</p>
                </div>
            </div>
            <div class="d-flex align-items-center mb-9">
                <div class="bg-success-subtle text-success fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-money"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Conoce Utilidades</h6>
                    <p class="mb-0">${analisisNegocio.conoceUtilidades.res}</p>
                </div>
            </div>
            <div class="d-flex align-items-center mb-9">
                <div class="bg-warning-subtle text-warning fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-flag"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Identifica Competencia</h6>
                    <p class="mb-0">${analisisNegocio.competencia.identifica.res}</p>
                </div>
            </div>
            <div class="d-flex align-items-center mb-9">
                <div class="bg-danger-subtle text-danger fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-users"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Clientes del Negocio</h6>
                    <p class="mb-0">${analisisNegocio.clientesNegocio}</p>
                </div>
            </div>
            <div class="d-flex align-items-center mb-9">
                <div class="bg-primary-subtle text-primary fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-rocket"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Ventajas del Negocio</h6>
                    <p class="mb-0">${analisisNegocio.ventajasNegocio}</p>
                </div>
            </div>
            <div class="d-flex align-items-center mb-9">
                <div class="bg-info-subtle text-info fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-alert-circle"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Problemas del Negocio</h6>
                    <p class="mb-0">${analisisNegocio.problemasNegocio}</p>
                </div>
            </div>
            <div class="d-flex align-items-center mb-9">
                <div class="bg-success-subtle text-success fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-trending-up"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Conoce Productos con Mayor Utilidad</h6>
                    <p class="mb-0">${analisisNegocio.conoceProductosMayorUtilidad.conoce.res}</p>
                </div>
            </div>
            <div class="d-flex align-items-center mb-9">
                <div class="bg-warning-subtle text-warning fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-piggy-bank"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Ahorro Mensual</h6>
                    <p class="mb-0">${analisisNegocio.ahorro.asigna.res}</p>
                </div>
            </div>
            <div class="d-flex align-items-center mb-9">
                <div class="bg-danger-subtle text-danger fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-bar-chart"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Punto de Equilibrio</h6>
                    <p class="mb-0">${analisisNegocio.conocePuntoEquilibrio.res}</p>
                </div>
            </div>
            <div class="d-flex align-items-center mb-9">
                <div class="bg-primary-subtle text-primary fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-list"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Separa Gastos</h6>
                    <p class="mb-0">${analisisNegocio.separaGastos.res}</p>
                </div>
            </div>
            <div class="d-flex align-items-center mb-9">
                <div class="bg-info-subtle text-info fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-file"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Elabora Presupuesto</h6>
                    <p class="mb-0">${analisisNegocio.elaboraPresupuesto.res}</p>
                </div>
            </div>
        `
    };
}

// Función para "Administración de Ingresos"
function construirSeccionAdministracionIngresos(administracionIngresos) {
    return {
        icon: 'ti ti-archive',
        title: 'Administración de Ingresos',
        content: `
            <div class="d-flex align-items-center mb-9">
                <div class="bg-primary-subtle text-primary fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-clipboard"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Sueldo Mensual</h6>
                    <p class="mb-0">${administracionIngresos.sueldoMensual}</p>
                </div>
            </div>
            <div class="d-flex align-items-center mb-9">
                <div class="bg-info-subtle text-info fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-currency-dollar"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Monto Mensual Ventas</h6>
                    <p class="mb-0">${administracionIngresos.montoMensualVentas}</p>
                </div>
            </div>
            <div class="d-flex align-items-center mb-9">
                <div class="bg-success-subtle text-success fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-credit-card"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Monto Mensual Egresos</h6>
                    <p class="mb-0">${administracionIngresos.montoMensualEgresos}</p>
                </div>
            </div>
            <div class="d-flex align-items-center mb-9">
                <div class="bg-warning-subtle text-warning fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-currency-yen"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Monto Mensual Utilidades</h6>
                    <p class="mb-0">${administracionIngresos.montoMensualUtilidades}</p>
                </div>
            </div>
            <div class="d-flex align-items-center mb-9">
                <div class="bg-danger-subtle text-danger fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-building"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Negocio como Fuente de Ingresos Personal</h6>
                    <p class="mb-0">${administracionIngresos.esNegocioPrincipalFuentePersonal.res}</p>
                </div>
            </div>
            <div class="d-flex align-items-center mb-9">
                <div class="bg-primary-subtle text-primary fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-home"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Negocio como Fuente de Ingresos Familiar</h6>
                    <p class="mb-0">${administracionIngresos.esNegocioPrincipalFuenteFamiliar.res}</p>
                </div>
            </div>
            <div class="d-flex align-items-center mb-9">
                <div class="bg-info-subtle text-info fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-save"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Hábito de Ahorro</h6>
                    <p class="mb-0">${administracionIngresos.habitoAhorro.res}</p>
                </div>
            </div>
            <div class="d-flex align-items-center mb-9">
                <div class="bg-success-subtle text-success fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-bank"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Sistema de Ahorro</h6>
                    <p class="mb-0">${administracionIngresos.sistemaAhorro.cuenta.res}</p>
                </div>
            </div>
            <div class="d-flex align-items-center mb-9">
                <div class="bg-warning-subtle text-warning fs-14 round-40 rounded-circle d-flex align-items-center justify-content-center">
                    <i class="ti ti-cash"></i>
                </div>
                <div class="ms-6">
                    <h6 class="mb-1">Monto de Ahorro Mensual</h6>
                    <p class="mb-0">${administracionIngresos.montoAhorroMensual}</p>
                </div>
            </div>
        `
    };
}


function construirSeccionNoInfoNegocio() {
    return construirSeccionNoInfo("Negocio", "Información del negocio no disponible", "Se ha indicado que no cuenta con un negocio.");
}

function construirSeccionNoLineaBase() {
    return construirSeccionNoInfo("Sin información", "Línea base no disponible", "");
}

function construirSeccionNoInfo(titulo, mensaje, subtitulo) {
    const content = `
        <div class="alert alert-warning text-primary role="alert">
            <h5 class="text-dark mb-3"><strong>${mensaje}</strong></h5>
            <p class="text-muted">${subtitulo}</p>
        </div>
    `;
    return {
        icon: 'ti ti-alert-circle',
        title: titulo,
        content: content
    };
}

function descargarLineaBase() {
    redireccionar("../lineaBaseDescargar/");
}