const urlAPI = "api/LineaBaseVerAPI.php";

function ready() {
    crearPeticion(urlAPI, { case: 'recuperarInfoLineaBase' }, (res) => {
        $("#lb-loader").hide();
        $("#lb-main-container").fadeIn(400);

        const emprendedor = res.emprendedor;
        
        // Sidebar Init
        const badge = $("#lb-badge-tipo");
        badge.text(res.tipo.toUpperCase());
        badge.removeClass('inicial final').addClass(res.tipo.toLowerCase());
        
        $("#lb-profile-name").text(`${emprendedor.nombre} ${emprendedor.apellidos}`);
        $("#lb-profile-img").prop("src", "data:image/jpeg;base64," + emprendedor.fotografia);

        if (res.existeLineaBase) {
            const data = res.data;
            $("#lb-date-val").text(data.fechaCreacion);

            const sections = res.tipo === 'inicial' 
                ? prepararLineaBaseInicial(data) 
                : prepararLineaBaseFinal(data);

            renderizarSecciones(sections);
        } else {
            $("#lb-date-val").text("Sin registro");
            renderizarSecciones([
                {
                    title: "Sin información",
                    icon: "ti ti-alert-circle",
                    fields: [
                        { label: "Aviso", value: "Línea base no disponible.", icon: "ti ti-info-circle", colSpan: true }
                    ]
                }
            ]);
        }
    });
}

function prepararLineaBaseFinal(data) {
    const sections = [
        obtenerDatosPreliminarFinal(data.preliminar),
        obtenerDatosSocioeconomico(data.socioeconomico)
    ];
    if (data.negocio) {
        sections.push(
            obtenerDatosNegocio(data.negocio),
            obtenerDatosAnalisisNegocio(data.analisisNegocio),
            obtenerDatosAdministracionIngresos(data.administracionIngresos)
        );
    } else {
        sections.push(obtenerDatosNoNegocio());
    }
    return sections;
}

function prepararLineaBaseInicial(data) {
    const sections = [
        obtenerDatosPreliminarInicial(data.preliminar),
        obtenerDatosIdentificacion(data.identificacion),
        obtenerDatosDomicilio(data.domicilio),
        obtenerDatosSocioeconomico(data.socioeconomico)
    ];
    if (data.negocio) {
        sections.push(
            obtenerDatosNegocio(data.negocio),
            obtenerDatosAnalisisNegocio(data.analisisNegocio),
            obtenerDatosAdministracionIngresos(data.administracionIngresos)
        );
    } else {
        sections.push(obtenerDatosNoNegocio());
    }
    return sections;
}

// ==============================================
// RENDER ENGINE
// ==============================================
function renderizarSecciones(sections) {
    const contentArea = $("#lb-content-area");
    const navMenu = $("#lb-nav-menu");
    
    contentArea.empty();
    navMenu.empty();

    const tmplSection = document.getElementById('tmpl-section');
    const tmplDataItem = document.getElementById('tmpl-data-item');

    sections.forEach((sec, idx) => {
        const secId = `sec-${sec.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        
        // Agregar enlace de navegación
        navMenu.append(`
            <li class="nav-item">
                <a href="#${secId}" class="nav-link text-muted d-flex align-items-center gap-2 px-3 py-2 rounded-3" style="transition: all 0.2s;" onmouseover="this.classList.add('bg-light', 'text-dark')" onmouseout="this.classList.remove('bg-light', 'text-dark')">
                    <i class="${sec.icon} fs-5"></i> <span class="fw-medium">${sec.title}</span>
                </a>
            </li>
        `);

        // Clonar y rellenar sección
        const secNode = tmplSection.content.cloneNode(true);
        const sectionEl = secNode.querySelector('.lb-section');
        sectionEl.id = secId;
        sectionEl.style.animationDelay = `${idx * 0.1}s`;

        sectionEl.querySelector('.lb-section-icon i').className = sec.icon;
        sectionEl.querySelector('.lb-section-title').textContent = sec.title;
        
        const gridEl = sectionEl.querySelector('.lb-data-grid');

        // Llenar campos de datos de la sección
        if (sec.fields && sec.fields.length > 0) {
            sec.fields.forEach(field => {
                const itemNode = tmplDataItem.content.cloneNode(true);
                const itemEl = itemNode.querySelector('.lb-data-item');
                
                if (field.colSpan) {
                    itemEl.classList.remove('col-sm-6', 'col-xxl-4');
                    itemEl.classList.add('col-12');
                }

                itemEl.querySelector('.lb-data-label i').className = `text-${field.color || 'primary'} ${field.icon || 'ti ti-point'}`;
                itemEl.querySelector('.label-text').textContent = field.label;
                
                const valWrapper = itemEl.querySelector('.lb-data-value');
                if (typeof field.value === 'string' && field.value.includes('<li>')) {
                    // It's html list
                    valWrapper.innerHTML = `<ul>${field.value}</ul>`;
                } else {
                    valWrapper.innerHTML = field.value || 'N/A';
                }

                if (field.sub) {
                    const subEl = document.createElement('small');
                    subEl.className = 'lb-data-sub';
                    subEl.innerHTML = field.sub;
                    itemEl.querySelector('.lb-data-value-wrapper').appendChild(subEl);
                }

                gridEl.appendChild(itemNode);
            });
        }

        contentArea.append(secNode);
    });
}

// ==============================================
// ADAPTERS (Transformers from JSON to field arrays)
// ==============================================
function obtenerDatosIdentificacion(identificacion) {
    return {
        icon: 'ti ti-user',
        title: 'Identificación',
        fields: [
            { label: 'Género', value: identificacion.genero, icon: 'ti ti-a-b', color: 'primary' },
            { label: 'Edad', value: identificacion.edad, icon: 'ti ti-calendar', color: 'success' },
            { label: 'Estado Civil', value: identificacion.estadoCivil.descripcion, icon: 'ti ti-heart', color: 'warning' },
            { label: 'Escolaridad', value: identificacion.escolaridad.descripcion, icon: 'ti ti-book', color: 'info' },
            { label: '¿Presentas alguna discapacidad?', value: identificacion.discapacidad, icon: 'ti ti-disabled', color: 'danger' }
        ]
    };
}

function obtenerDatosPreliminarFinal(preliminar) {
    return {
        icon: 'ti ti-home-2',
        title: 'Preliminar',
        fields: [
            { 
                label: 'Beneficio personal tras formación', 
                value: preliminar.huboBeneficiosPersonal.res, 
                sub: preliminar.beneficios !== null ? preliminar.beneficios : '',
                icon: 'ti ti-bookmark-question', 
                color: 'success',
                colSpan: true
            }
        ]
    };
}

function obtenerDatosPreliminarInicial(preliminar) {
    const fields = [];
    const listaMedios = preliminar.listaMedioConoceFundacion.map(i => `<li>${i.descripcion}</li>`).join('');
    
    fields.push({
        label: '¿Cómo te enteraste de la Fundación?',
        value: listaMedios,
        icon: 'ti ti-eye-question',
        color: 'info',
        colSpan: true
    });

    if (preliminar.otroMedioConoceFundacion) {
        fields.push({ label: 'Otro Medio', value: preliminar.otroMedioConoceFundacion, icon: 'ti ti-share', color: 'secondary' });
    }

    fields.push({ label: 'Recurres a la Fundación para:', value: preliminar.razonRecurreFundacion.descripcion, icon: 'ti ti-bell-question', color: 'warning' });
    
    if (preliminar.otraRazonRecurreFundacion) {
        fields.push({ label: 'Otra Razón', value: preliminar.otraRazonRecurreFundacion, icon: 'ti ti-alert-circle', color: 'danger' });
    }

    if (preliminar.razonRecurreFundacion.descripcion.includes("Crédito")) {
        fields.push(
            { label: 'Solicita Crédito', value: preliminar.solicitaCredito.descripcion, icon: 'ti ti-credit-card', color: 'success' },
            { label: 'Utiliza Crédito', value: preliminar.utilizaCredito.descripcion, icon: 'ti ti-arrow-right-circle', color: 'primary' }
        );
    }

    fields.push({ label: 'Tiempo para formarse a la semana', value: preliminar.tiempoDedicaCapacitacion.descripcion, icon: 'ti ti-clock', color: 'success' });

    return {
        icon: 'ti ti-home-2',
        title: 'Preliminar',
        fields: fields
    };
}

function obtenerDatosDomicilio(domicilio) {
    return {
        icon: 'ti ti-map-pin',
        title: 'Domicilio',
        fields: [
            { 
                label: 'Dirección', 
                value: `${domicilio.calle}, ${domicilio.numeroExterior} (Int. ${domicilio.numeroInterior ? domicilio.numeroInterior : 'N/A'})`, 
                icon: 'ti ti-home', 
                color: 'primary',
                colSpan: true
            },
            { label: 'Entre Calle', value: domicilio.calleCruce1, icon: 'ti ti-arrow-right', color: 'warning' },
            { label: 'Y Calle', value: domicilio.calleCruce2, icon: 'ti ti-arrow-left-right', color: 'danger' },
            { label: 'Código Postal', value: `${domicilio.codigoPostal.codigo} (${domicilio.codigoPostal.colonia})`, icon: 'ti ti-location-pin', color: 'primary' },
            { label: 'Municipio', value: domicilio.municipio.nombre, icon: 'ti ti-home-bolt', color: 'secondary' },
            { label: 'Estado', value: domicilio.estado, icon: 'ti ti-map-pin', color: 'info' },
            { 
                label: 'Comunidad Parroquial', 
                value: domicilio.comunidadParroquial.nombre, 
                sub: `Decanato: "${domicilio.comunidadParroquial.decanato}", Vicaría: "${domicilio.comunidadParroquial.vicaria}"`,
                icon: 'ti ti-building-church', 
                color: 'success',
                colSpan: true
            }
        ]
    };
}

function obtenerDatosSocioeconomico(socioeconomico) {
    return {
        icon: 'ti ti-wallet',
        title: 'Socioeconómico',
        fields: [
            { label: 'Cantidad de Dependientes', value: socioeconomico.cantidadDependientes, icon: 'ti ti-users', color: 'primary' },
            { label: 'Ocupación Actual', value: socioeconomico.ocupacionActual.descripcion, icon: 'ti ti-briefcase', color: 'success' },
            { label: 'Ingreso Mensual', value: socioeconomico.ingresoMensual.descripcion, icon: 'ti ti-wallet', color: 'info' }
        ]
    };
}

function obtenerDatosNegocio(negocio) {
    return {
        icon: 'ti ti-home-dollar',
        title: 'Negocio',
        fields: [
            { label: 'Nombre del Negocio', value: negocio.nombre, icon: 'ti ti-credit-card', color: 'primary', colSpan: true },
            { label: 'Teléfono', value: negocio.telefono, icon: 'ti ti-phone', color: 'info' },
            { label: 'Antigüedad', value: negocio.antiguedad, icon: 'ti ti-calendar', color: 'success' },
            { label: 'Giro', value: negocio.giro.descripcion, icon: 'ti ti-devices-dollar', color: 'danger' },
            { label: 'Actividad', value: negocio.actividad.descripcion, icon: 'ti ti-devices-dollar', color: 'secondary' },
            { 
                label: 'Dirección del Negocio', 
                value: `Calle ${negocio.calle}, # ${negocio.numExterior} ${negocio.numInterior ? `(Int. ${negocio.numInterior})` : ''}, entre ${negocio.calleCruce1} y ${negocio.calleCruce2}`,
                sub: `CP: ${negocio.codigoPostal.codigo} (${negocio.codigoPostal.colonia}), ${negocio.municipio.nombre}, ${negocio.estado}`,
                icon: 'ti ti-location-pin', 
                color: 'primary',
                colSpan: true
            },
            { label: 'Cantidad de Empleados', value: negocio.cantEmpleados.descripcion, icon: 'ti ti-users', color: 'warning' }
        ]
    };
}

function obtenerDatosAnalisisNegocio(anal) {
    return {
        icon: 'ti ti-chart-arrows',
        title: 'Análisis del Negocio',
        fields: [
            { label: 'Registra Entrada y Salida', value: anal.registraEntradaSalida.res, icon: 'ti ti-chart-area-line-filled', color: 'primary' },
            { label: 'Asigna Sueldo', value: anal.asignaSueldo.res, icon: 'ti ti-dollar-sign', color: 'info' },
            { label: 'Conoce Utilidades', value: anal.conoceUtilidades.res, icon: 'ti ti-money', color: 'success' },
            { label: 'Identifica Competencia', value: anal.competencia.identifica.res, icon: 'ti ti-flag', color: 'warning' },
            { label: 'Clientes del Negocio', value: anal.clientesNegocio, icon: 'ti ti-users', color: 'danger' },
            { label: 'Ventajas del Negocio', value: anal.ventajasNegocio, icon: 'ti ti-rocket', color: 'primary' },
            { label: 'Problemas del Negocio', value: anal.problemasNegocio, icon: 'ti ti-alert-circle', color: 'info', colSpan: true },
            { label: 'Conoce Productos con Mayor Utilidad', value: anal.conoceProductosMayorUtilidad.conoce.res, icon: 'ti ti-trending-up', color: 'success' },
            { label: 'Ahorro Mensual', value: anal.ahorro.asigna.res, icon: 'ti ti-piggy-bank', color: 'warning' },
            { label: 'Punto de Equilibrio', value: anal.conocePuntoEquilibrio.res, icon: 'ti ti-bar-chart', color: 'danger' },
            { label: 'Separa Gastos', value: anal.separaGastos.res, icon: 'ti ti-list', color: 'primary' },
            { label: 'Elabora Presupuesto', value: anal.elaboraPresupuesto.res, icon: 'ti ti-file', color: 'info' }
        ]
    };
}

function obtenerDatosAdministracionIngresos(admin) {
    return {
        icon: 'ti ti-archive',
        title: 'Administración de Ingresos',
        fields: [
            { label: 'Sueldo Mensual', value: admin.sueldoMensual, icon: 'ti ti-clipboard', color: 'primary' },
            { label: 'Monto Mensual Ventas', value: admin.montoMensualVentas, icon: 'ti ti-currency-dollar', color: 'info' },
            { label: 'Monto Mensual Egresos', value: admin.montoMensualEgresos, icon: 'ti ti-credit-card', color: 'success' },
            { label: 'Monto Mensual Utilidades', value: admin.montoMensualUtilidades, icon: 'ti ti-currency-yen', color: 'warning' },
            { label: 'Negocio como Fuente de Ingresos Personal', value: admin.esNegocioPrincipalFuentePersonal.res, icon: 'ti ti-building', color: 'danger' },
            { label: 'Negocio como Fuente de Ingresos Familiar', value: admin.esNegocioPrincipalFuenteFamiliar.res, icon: 'ti ti-home', color: 'primary' },
            { label: 'Hábito de Ahorro', value: admin.habitoAhorro.res, icon: 'ti ti-save', color: 'info' },
            { label: 'Sistema de Ahorro', value: admin.sistemaAhorro.cuenta.res, icon: 'ti ti-bank', color: 'success' },
            { label: 'Monto de Ahorro Mensual', value: admin.montoAhorroMensual, icon: 'ti ti-cash', color: 'warning' }
        ]
    };
}

function obtenerDatosNoNegocio() {
    return {
        icon: 'ti ti-alert-circle',
        title: 'Negocio',
        fields: [
            { label: 'Sin negocio', value: 'Se ha indicado que no cuenta con un negocio.', icon: 'ti ti-info-circle', colSpan: true, color: 'secondary' }
        ]
    };
}

function descargarLineaBase() {
    redireccionar("../lineaBaseDescargar/");
}