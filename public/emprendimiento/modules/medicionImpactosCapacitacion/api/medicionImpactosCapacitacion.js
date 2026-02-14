// Configuración global
const urlAPI = "api/MedicionImpactosCapacitacionAPI.php";

function ready() {
    crearPeticion(urlAPI, { case: "consultarMedicionImpactos" }, (res) => {
        const impactos = res.impactos;
        print(impactos);
        if (impactos.fechas.fin) {
            generarImpactoHTML(impactos, res.emprendedores);
            completarParametrosConfiguracion();
        } else {
            mostrarMensajeNoHayInformacion();
        }
    });
}

function mostrarMensajeNoHayInformacion() {
    $("#msgImpacto").prop("hidden", false).attr('role','status').attr('aria-live','polite');
}

function generarImpactoHTML(data, emprendedores) {
    $("#impacto-container").empty();

    // === CONTENEDOR PRINCIPAL ===
    const contenedorPrincipal = $("<div>", { class: "container-xxl py-5" });

    // Header del Módulo
    const headerSection = $("<div>", { class: "text-center mb-5" });
    headerSection.append(
        $("<h2>", { class: "display-6 fw-bold text-dark mb-2", text: "Medición de Impactos (Capacitación)" }),
        $("<p>", { class: "text-muted lead fs-5", text: `Período de Evaluación: ${data.fechas.inicioSelected} al ${data.fechas.finSelected}` })
    );
    contenedorPrincipal.append(headerSection);

    // === NAVEGACIÓN SUPERIOR (TABS) ===
    const navContainer = $("<div>", { class: "d-flex justify-content-center mb-5" });
    const listaNav = $("<ul>", { class: "nav nav-pills shadow-sm bg-body-tertiary rounded-pill p-2", role: "tablist", id: "navigationList" });

    const itemsNav = [
        { id: "nav-medicion", icon: "ti ti-chart-bar", texto: "Reporte de Medición", target: "section-medicion" },
        { id: "nav-vista-general", icon: "ti ti-table", texto: "Datos y Exportación", target: "section-vista-general" },
        { id: "nav-configuracion", icon: "ti ti-settings", texto: "Configuración", target: "section-configuracion" }
    ];

    itemsNav.forEach((item, idx) => {
        const navItem = $("<li>", { class: "nav-item", role: "presentation" });
        const navLink = $("<button>", {
            type: "button",
            class: `nav-link rounded-pill px-4 ${idx === 0 ? 'active' : ''} d-flex align-items-center gap-2`,
            id: item.id,
            "data-target": item.target,
            role: "tab",
            "aria-controls": item.target,
            "aria-selected": idx === 0 ? "true" : "false",
            tabindex: idx === 0 ? '0' : '-1'
        });

        navLink.append(
            $("<i>", { class: item.icon }),
            $("<span>", { class: "fw-semibold", text: item.texto })
        );

        navLink.on("click", function () {
            // Update visual state
            listaNav.find(".nav-link").removeClass("active").attr({ "aria-selected": "false", tabindex: '-1' });
            $(this).addClass("active").attr({ "aria-selected": "true", tabindex: '0' });

            // Switch content with slight fade
            $("#main-content .content-section").addClass("d-none").removeClass("animate__animated animate__fadeIn");
            $(`#${item.target}`).removeClass("d-none").addClass("animate__animated animate__fadeIn");
        });

        navItem.append(navLink);
        listaNav.append(navItem);
    });

    navContainer.append(listaNav);
    contenedorPrincipal.append(navContainer);

    // === CONTENIDO ===
    const contenidoPrincipal = $("<div>", { id: "main-content" });

    // === SECCIÓN 1: MEDICIÓN ===
    const seccionMedicion = $("<section>", {
        id: "section-medicion",
        class: "content-section animate__animated animate__fadeIn",
        role: "tabpanel",
        "aria-labelledby": "nav-medicion"
    });

    // Accordion de impactos
    const accordionImpactos = $("<div>", { class: "accordion accordion-flush bg-transparent", id: "impactosAccordion" });
    const impactosVisibles = data.impactos.filter(p => p.nombre === 'Estabilidad económica');

    impactosVisibles.forEach((impacto, idx) => {
        const itemAccordion = $("<div>", { class: "accordion-item border-0 bg-transparent mb-4" });

        const headerAccordion = $("<div>", { class: "accordion-header", id: `heading-${idx}` });
        const botonAccordion = $("<button>", {
            class: `accordion-button shadow-sm rounded-4 ${idx === 0 ? '' : 'collapsed'} fs-5 fw-medium bg-white`,
            type: "button",
            "data-bs-toggle": "collapse",
            "data-bs-target": `#collapse-${idx}`,
            "aria-expanded": idx === 0 ? "true" : "false",
            "aria-controls": `collapse-${idx}`
        });

        botonAccordion.append(
            $("<div>", { class: "d-flex align-items-center w-100" }).append(
                $("<span>", { class: "badge bg-primary-subtle text-primary border border-primary-subtle me-3 px-3 rounded-pill", text: idx + 1 }),
                $("<span>", { text: impacto.nombre })
            )
        );
        headerAccordion.append(botonAccordion);

        const collapseAccordion = $("<div>", {
            id: `collapse-${idx}`,
            class: `accordion-collapse collapse ${idx === 0 ? 'show' : ''}`,
            "aria-labelledby": `heading-${idx}`,
            "data-bs-parent": "#impactosAccordion"
        });

        const bodyAccordion = $("<div>", { class: "accordion-body bg-white rounded-bottom-4 shadow-sm p-4 mt-2" });

        // Cálculo Impacto Total
        let impactoTotal = 0;
        impacto.data.forEach(seccion => {
            impactoTotal += parseFloat(seccion.contribucionImpacto);
        });

        // Stats Row
        const rowStats = $("<div>", { class: "row mb-5 align-items-center g-4" });
        const colGauge = $("<div>", { class: "col-md-5 text-center" });

        const alertClass = impactoTotal >= 70 ? 'text-success' : impactoTotal >= 40 ? 'text-warning' : 'text-danger';
        const bgAlertClass = impactoTotal >= 70 ? 'bg-success-subtle' : impactoTotal >= 40 ? 'bg-warning-subtle' : 'bg-danger-subtle';
        const iconClass = impactoTotal >= 70 ? 'ti-check' : impactoTotal >= 40 ? 'ti-alert-triangle' : 'ti-x';

        const statsCard = $("<div>", { class: `p-4 rounded-4 ${bgAlertClass} d-inline-block w-100` });
        statsCard.append(
            $("<div>", { class: "display-3 fw-bold " + alertClass, text: `${impactoTotal.toFixed(1)}%` }),
            $("<div>", { class: "text-uppercase tracking-wider small fw-bold opacity-75 " + alertClass, text: "Nivel de Impacto Global" }),
            $("<div>", { class: "mt-3 d-flex justify-content-center" }).append(
                $("<span>", { class: `badge rounded-pill ${alertClass} bg-white px-3 py-2 bg-opacity-75 shadow-sm` }).append(
                    $("<i>", { class: `ti ${iconClass} me-2` }),
                    $("<span>", { text: impactoTotal >= 70 ? "Positivo" : impactoTotal >= 40 ? "Moderado" : "Bajo" })
                )
            )
        );
        colGauge.append(statsCard);

        const colNarrativa = $("<div>", { class: "col-md-7" });
        colNarrativa.append(
            $("<h5>", { class: "mb-3 d-flex align-items-center" }).append(
                $("<i>", { class: "ti ti-file-description text-primary me-2" }),
                $("<span>", { text: "Resumen Ejecutivo" })
            ),
            $("<div>", { class: "text-muted border-start border-4 ps-3 border-light", html: impacto.narrativa })
        );

        rowStats.append(colGauge, colNarrativa);
        bodyAccordion.append(rowStats);

        // Tabla de Desglose
        const labelTable = $("<h5>", { class: "mb-3 d-flex align-items-center" });
        labelTable.append($("<i>", { class: "ti ti-table text-primary me-2" }), $("<span>", { text: "Detalle de Contribución por Sección" }));
        bodyAccordion.append(labelTable);

        const divTabla = $("<div>", { class: "table-responsive mb-5 rounded-3 border" });
        const tabla = $("<table>", { class: "table table-hover align-middle mb-0" });
        const thead = $("<thead>", { class: "table-light" });

        thead.append(
            $("<tr>").append(
                $("<th>", { scope: "col", text: "Dimensión", class: "ps-3 py-3" }),
                $("<th>", { scope: "col", class: "text-center py-3", text: "Puntaje Obtenido" }),
                $("<th>", { scope: "col", class: "text-center py-3", text: "Ponderación" }),
                $("<th>", { scope: "col", class: "text-center py-3", text: "Contribución Total" })
            )
        );

        const tbody = $("<tbody>");
        impacto.data.forEach(seccion => {
            const fila = $("<tr>");
            const contribucion = parseFloat(seccion.contribucionImpacto);
            const badgeClass = contribucion >= 15 ? 'bg-success-subtle text-success' : contribucion >= 10 ? 'bg-warning-subtle text-warning' : 'bg-danger-subtle text-danger';

            fila.append(
                $("<td>", { class: "ps-3 fw-medium" }).append(seccion.titulo),
                $("<td>", { class: "text-center" }).append($("<span>", { class: "badge bg-white text-dark border", text: `${seccion.obtenido}%` })),
                $("<td>", { class: "text-center" }).append($("<span>", { class: "badge bg-light text-muted border", text: `${seccion.peso}%` })),
                $("<td>", { class: "text-center h5 mb-0" }).append($("<span>", { class: `badge ${badgeClass} border border-0`, text: `${seccion.contribucionImpacto}%` }))
            );
            tbody.append(fila);
        });
        divTabla.append(tabla.append(thead, tbody));
        bodyAccordion.append(divTabla);

        // Sub-accordions for details
        const detailsHeader = $("<div>", { class: "d-flex align-items-center justify-content-between mb-3" });
        detailsHeader.append(
            $("<h5>", { class: "mb-0" }).append(
                $("<i>", { class: "ti ti-zoom-in text-primary me-2" }),
                $("<span>", { text: "Análisis de Variaciones" })
            )
        );
        bodyAccordion.append(detailsHeader);

        const accordionDetalles = $("<div>", { class: "accordion accordion-flush", id: `variaciones-${idx}` });
        impacto.data.forEach((seccion, secIdx) => {
            const itemDetalle = $("<div>", { class: "accordion-item border rounded-3 mb-2" });
            const headerDetalle = $("<h4>", { class: "accordion-header", id: `var-heading-${idx}-${secIdx}` });
            
            const botonDetalle = $("<button>", {
                class: "accordion-button collapsed rounded-3 p-3",
                type: "button",
                "data-bs-toggle": "collapse",
                "data-bs-target": `#var-collapse-${idx}-${secIdx}`,
                "aria-expanded": "false",
                "aria-controls": `var-collapse-${idx}-${secIdx}`,
                text: `${seccion.titulo}`
            });
            headerDetalle.append(botonDetalle);
            
            const collapseDetalle = $("<div>", { 
                id: `var-collapse-${idx}-${secIdx}`, 
                class: "accordion-collapse collapse", 
                "aria-labelledby": `var-heading-${idx}-${secIdx}`,
                "data-bs-parent": `#variaciones-${idx}` 
            });
            const bodyDetalle = $("<div>", { class: "accordion-body p-0" });
            
            // Tabla detalles
            const tableDetalle = $("<table>", { class: "table table-striped mb-0 table-sm" });
            const theadDetalle = $("<thead>");
            theadDetalle.append($("<tr>").append(
                $("<th>", {text: "Pregunta", class: "ps-4 py-2"}), 
                $("<th>", {text: "Inicio", class: "text-center py-2"}), 
                $("<th>", {text: "Fin", class: "text-center py-2"}), 
                $("<th>", {text: "Var.", class: "text-center py-2"})
            ));
            
            const tbodyDetalle = $("<tbody>");
            Object.entries(seccion.mediciones).forEach(([pregunta, medicion]) => {
                 const variacion = medicion.variacionPorcentual.toFixed(2);
                 const badgeVar = parseFloat(variacion) > 0 ? 'text-success' : parseFloat(variacion) < 0 ? 'text-danger' : 'text-muted';
                 tbodyDetalle.append(
                     $("<tr>").append(
                         $("<td>", { class: "ps-4 py-2 small text-muted", text: pregunta }),
                         $("<td>", { class: "text-center small", text: medicion.inicial }),
                         $("<td>", { class: "text-center small", text: medicion.final }),
                         $("<td>", { class: `text-center fw-bold small ${badgeVar}`, text: `${variacion}%` })
                     )
                 );
            });
            
            tableDetalle.append(theadDetalle, tbodyDetalle);
            bodyDetalle.append(tableDetalle);
            
            collapseDetalle.append(bodyDetalle);
            itemDetalle.append(headerDetalle, collapseDetalle);
            accordionDetalles.append(itemDetalle);
        });

        bodyAccordion.append(accordionDetalles);
        collapseAccordion.append(bodyAccordion);
        itemAccordion.append(headerAccordion, collapseAccordion);
        accordionImpactos.append(itemAccordion);
    });
    seccionMedicion.append(accordionImpactos);


    // === SECCIÓN 2: CONFIGURACIÓN ===
    const seccionConfig = $("<section>", {
        id: "section-configuracion",
        class: "content-section d-none animate__animated animate__fadeIn",
        role: "tabpanel",
        "aria-labelledby": "nav-configuracion"
    });

    const rowConfig = $("<div>", { class: "row justify-content-center" });
    const colConfig = $("<div>", { class: "col-lg-8" });

    // Header Config
    colConfig.append(
        $("<div>", { class: "d-flex align-items-center mb-4" }).append(
            $("<div>", { class: "bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center me-3", style: "width: 48px; height: 48px;" }).append(
                $("<i>", { class: "ti ti-adjustments fs-4" })
            ),
            $("<div>").append(
                $("<h3>", { class: "h5 mb-0 fw-bold", text: "Parámetros del Reporte" }),
                $("<p>", { class: "text-muted mb-0 small", text: "Ajuste las fechas y filtros aplicables" })
            )
        )
    );

    // Card Temporal
    const cardTemporal = $("<div>", { class: "card border-0 shadow-sm mb-4" });
    const bodyTemporal = $("<div>", { class: "card-body p-4" });
    
    bodyTemporal.append($("<h6>", { class: "fw-bold text-uppercase text-muted smaller mb-3", text: "Rango de Fechas" }));
    
    const formFechas = $("<form>", { id: "form-fechas", class: "needs-validation", novalidate: true });
    // ... duplicate logic for inputs but cleaner ...
    const rowInputs = $("<div>", { class: "row g-3" });
    const colIn = $("<div>", { class: "col-md-6" });
    colIn.append($("<label>", { class: "form-label small fw-bold", text: "Fecha Inicial" }), $("<input>", { type: "date", id: "fechaInicio", class: "form-control", value: data.fechas.inicioSelected, min: data.fechas.inicio, max: data.fechas.fin, required: true }));
    const colFn = $("<div>", { class: "col-md-6" });
    colFn.append($("<label>", { class: "form-label small fw-bold", text: "Fecha Final" }), $("<input>", { type: "date", id: "fechaFinal", class: "form-control", value: data.fechas.finSelected, min: data.fechas.inicio, max: data.fechas.fin, required: true }));
    
    rowInputs.append(colIn, colFn);
    formFechas.append(rowInputs, $("<div>", { class: "mt-4 text-end" }).append(
        $("<button>", { type: "submit", class: "btn btn-primary rounded-pill px-4 me-2" }).append($("<i>", { class: "ti ti-refresh me-2" }), "Actualizar")
    ));
    bodyTemporal.append(formFechas);
    cardTemporal.append(bodyTemporal);

    // Acción visible dentro de la pestaña de configuración (jerarquía global dentro de la pestaña)
    const configActions = $("<div>", { class: "d-flex justify-content-end mb-3" });
    const btnConfigReset = $("<button>", {
        type: "button",
        id: "btnRestablecerConfig",
        class: "btn btn-outline-danger rounded-pill px-3",
        title: "Restablecer configuración (elimina la configuración guardada)",
        "aria-label": "Restablecer configuración"
    }).append($("<i>", { class: "ti ti-trash me-2" }), "Restablecer configuración");
    configActions.append(btnConfigReset);
    colConfig.append(configActions, cardTemporal);
    rowConfig.append(colConfig);
    seccionConfig.append(rowConfig);

    // === SECCIÓN 3: VISTA GENERAL (DATOS + EXPORTACIÓN) ===
    const seccionVista = $("<section>", {
        id: "section-vista-general",
        class: "content-section d-none animate__animated animate__fadeIn",
        role: "tabpanel",
        "aria-labelledby": "nav-vista-general"
    });
    
    // Contenedor completo sin restricciones de ancho
    const containerFull = $("<div>", { class: "container-fluid px-2 px-md-3" });

    const cardExport = $("<div>", { class: "card border-0 shadow-sm" });
    const cardHeader = $("<div>", { class: "card-body text-center py-3 border-bottom" });
    cardHeader.append(
        $("<div>", { class: "mb-2 text-primary" }).append($("<i>", { class: "ti ti-cloud-download fs-1" })),
        $("<h3>", { class: "h5 fw-bold mb-2", text: "Datos y Exportación" }),
        $("<p>", { class: "text-muted small mb-3", text: "Consulte la información y use los botones de DataTable para exportar en distintos formatos." }),
        $("<div>", { class: "d-flex justify-content-center gap-2 flex-wrap" }).append(
            $("<button>", { type: "button", class: "btn btn-outline-primary rounded-pill px-4", id: "btnFinal", "data-tipo": "final" }).append($("<i>", { class: "ti ti-database-export me-2" }), "Cargar Seguimientos capturados")
        )
    );
    
    const cardBody = $("<div>", { class: "card-body" });
    
    // Contenedor para botones de DataTable (fijo en la parte superior)
    const botonesContainer = $("<div>", { 
        id: "datatable-buttons-container",
        class: "mb-3"
    });
    
    // Contenedor para la tabla con DataTable
    const tableContainer = $("<div>", { class: "datatable-container" });
    tableContainer.append(
        $("<table>", { 
            id: "tablaVistaGeneralImpacto", 
            class: "table table-striped table-hover table-sm w-100"
        })
    );
    
    cardBody.append(botonesContainer, tableContainer);
    cardExport.append(cardHeader, cardBody);
    containerFull.append(cardExport);
    seccionVista.append(containerFull);


    // Assembly
    contenidoPrincipal.append(seccionMedicion, seccionConfig, seccionVista);
    contenedorPrincipal.append(contenidoPrincipal);
    $("#impacto-container").append(contenedorPrincipal);
    
    // Use global project styles for DataTables instead of injecting inline CSS here.
    // The project-wide stylesheet provides the necessary styles for
    // `.datatable-container`, `.dataTables_wrapper`, pagination and buttons.
    // Ensure the main stylesheet is loaded on the page so the table renders correctly.

    // --- LOGIC RESTORATION ---
    // Make icons decorative
    contenedorPrincipal.find('i').attr('aria-hidden', 'true');
    cargarVistaGeneralEnTabla('final');
    $("#btnFinal").off("click").on("click", function () {
        cargarVistaGeneralEnTabla('final');
    });

    // Restablecer configuración: usar la alerta del proyecto y delegar la petición al backend
    $("#btnRestablecerConfig").off('click').on('click', function () {
        alertaEliminar({
            mensajeAlerta: 'Esta acción eliminará la configuración guardada para su usuario. ¿Desea continuar?',
            url: urlAPI,
            data: { case: 'restablecerConfiguracion' },
            fnSuccess: function (res) {
                if (!res || res.es_valor_error) {
                    const alertError = $('<div class="alert alert-danger alert-dismissible fade show" role="alert">');
                    alertError.append(
                        '<i class="ti ti-x me-2"></i>',
                        '<strong>Error:</strong> No se pudo restablecer la configuración.',
                        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>'
                    );
                    $("#section-configuracion").prepend(alertError);
                    setTimeout(() => { alertError.alert('close'); }, 5000);
                    return;
                }

                const alertSuccess = $('<div class="alert alert-success alert-dismissible fade show" role="alert">');
                alertSuccess.append(
                    '<i class="ti ti-check me-2"></i>',
                    '<strong>¡Listo!</strong> La configuración ha sido restablecida. La página se recargará para aplicar cambios.',
                    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>'
                );
                $("#section-configuracion").prepend(alertSuccess);
                setTimeout(() => { refresh(); }, 1200);
            }
        });
    });
    
    // In Credito, there is filter logic attached to hidden elements. I will include it to match structure if I'm being very strict.
    // Or I can omit it because it does nothing.
    // But let's omit it for cleanliness in Capacitacion unless demanded.
    // The previous Credito file has filter logic.
    // I already wrote the file content UP TO "Assembly".
    // I should probably clean up unused logic.
    // But since I have to REPLACE the whole file content, I need to match the previous file content's string exactly in `oldString`.
    // My `oldString` below is the EXACT content I read from `read_file`.
    // My `newString` is the new structure.
    
}

function obtenerBotonesExportacion(nombreArchivo) {
    const ext = ($.fn.dataTable && $.fn.dataTable.ext && $.fn.dataTable.ext.buttons) ? $.fn.dataTable.ext.buttons : {};
    const candidatos = ['copy', 'csv', 'excel', 'pdf', 'print', 'colvis'];
    const disponibles = candidatos.filter(btn => !!ext[btn]);

    return disponibles.map(btn => {
        if (btn === 'colvis') {
            return { extend: 'colvis', text: 'Columnas' };
        }
        const conf = { extend: btn, exportOptions: { columns: ':visible' } };
        if (btn !== 'print') {
            conf.filename = nombreArchivo;
        }
        return conf;
    });
}

function cargarVistaGeneralEnTabla(tipo = 'final') {
    const tabla = $('#tablaVistaGeneralImpacto');

    crearPeticion(urlAPI, {
        case: 'recuperarVistaGeneral',
        data: $.param({ tipo: tipo })
    }, (registros) => {
        if (!Array.isArray(registros) || registros.length === 0) {
            if ($.fn.DataTable.isDataTable('#tablaVistaGeneralImpacto')) {
                $('#tablaVistaGeneralImpacto').DataTable().clear().destroy();
            }
            tabla.empty().append(
                $('<tbody>').append(
                    $('<tr>').append(
                        $('<td>', { class: 'text-center text-muted p-4', text: 'No hay información disponible para mostrar.' })
                    )
                )
            );
            return;
        }

        const keys = Object.keys(registros[0]);
        const thead = $('<thead>').append(
            $('<tr>').append(keys.map(k => $('<th>', { text: k })))
        );

        const tbody = $('<tbody>');
        registros.forEach(row => {
            const tr = $('<tr>');
            keys.forEach(k => tr.append($('<td>', { text: row[k] ?? '' })));
            tbody.append(tr);
        });

        tabla.empty().append(thead, tbody);

        const botones = obtenerBotonesExportacion(`Medicion_Impactos_Capacitacion_${tipo}`);
        
        // Use project helper to initialize DataTable with project defaults and custom buttons
        crearDataTableFlexible('#tablaVistaGeneralImpacto', botones, {
            buttons: botones,
            // keep responsive off for wide tables
            responsive: false
        });
    });
}

function completarParametrosConfiguracion() {
    $('#form-fechas').on('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        const form = $(this);
        const fechaInicioInput = $('#fechaInicio');
        const fechaFinalInput = $('#fechaFinal');

        // --- Reset Validation State ---
        form.find('.is-invalid').removeClass('is-invalid');
        form.find('.invalid-feedback').remove();

        const fechaInicio = fechaInicioInput.val();
        const fechaFinal = fechaFinalInput.val();
        const minDate = fechaInicioInput.attr('min');
        const maxDate = fechaFinalInput.attr('max');

        let isValid = true;

        const showError = (input, message) => {
            if (isValid) isValid = false; // Only set to false, never back to true
            input.addClass('is-invalid');
            const feedback = $('<div>', { class: 'invalid-feedback', text: message });
            // Prevent adding duplicate messages
            if (input.parent().find('.invalid-feedback').length === 0) {
                input.after(feedback);
            }
        };

        // --- Validation ---
        if (!fechaInicio) {
            showError(fechaInicioInput, 'La fecha de inicio es obligatoria.');
        } else if (isNaN(new Date(fechaInicio).getTime())) {
            showError(fechaInicioInput, 'El formato de la fecha de inicio no es válido.');
        }

        if (!fechaFinal) {
            showError(fechaFinalInput, 'La fecha final es obligatoria.');
        } else if (isNaN(new Date(fechaFinal).getTime())) {
            showError(fechaFinalInput, 'El formato de la fecha final no es válido.');
        }

        // Proceed with date-based checks only if formats are valid and fields are not empty
        if (isValid) {
            const minDateObj = new Date(minDate + 'T00:00:00');
            const maxDateObj = new Date(maxDate + 'T00:00:00');
            const fechaInicioDate = new Date(fechaInicio + 'T00:00:00');
            const fechaFinalDate = new Date(fechaFinal + 'T00:00:00');

            if (fechaInicioDate < minDateObj) {
                showError(fechaInicioInput, `La fecha no puede ser anterior a ${minDate}.`);
            }
            if (fechaInicioDate > maxDateObj) {
                showError(fechaInicioInput, `La fecha no puede ser posterior a ${maxDate}.`);
            }
            if (fechaFinalDate < minDateObj) {
                showError(fechaFinalInput, `La fecha no puede ser anterior a ${minDate}.`);
            }
            if (fechaFinalDate > maxDateObj) {
                showError(fechaFinalInput, `La fecha no puede ser posterior a ${maxDate}.`);
            }

            if (fechaInicioDate > fechaFinalDate) {
                showError(fechaFinalInput, 'La fecha final no puede ser anterior a la fecha de inicio.');
            }
        }

        if (!isValid) {
            return;
        }

        // --- AJAX CALL ---
        const submitButton = form.find('button[type="submit"]');
        const originalButtonContent = submitButton.html();
        submitButton.prop('disabled', true).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Actualizando...');

        const configCard = form.closest('.card');
        const overlay = $('<div class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75" style="z-index: 10;">');
        overlay.append(
            $('<div class="spinner-border text-primary" role="status">').append(
                '<span class="visually-hidden">Actualizando configuración...</span>'
            )
        );
        configCard.addClass('position-relative').append(overlay);

        let data = { fechaInicio: fechaInicio, fechaFin: fechaFinal };
        crearPeticion(urlAPI, {
            case: "actualizarConfiguracionFechas",
            data: $.param(data)
        }, (res) => {
            overlay.remove();
            configCard.removeClass('position-relative');
            submitButton.prop('disabled', false).html(originalButtonContent);

            if (!res.es_valor_error) {
                const alertSuccess = $('<div class="alert alert-success alert-dismissible fade show" role="alert">');
                alertSuccess.append(
                    '<i class="ti ti-check me-2"></i>',
                    '<strong>¡Actualizado!</strong> El período se ha guardado. La página se recargará para aplicar los cambios.',
                    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>'
                );
                $("#section-configuracion").prepend(alertSuccess);
                setTimeout(() => {
                    refresh();
                }, 3000);
            } else {
                const alertError = $('<div class="alert alert-danger alert-dismissible fade show" role="alert">');
                alertError.append(
                    '<i class="ti ti-x me-2"></i>',
                    '<strong>Error:</strong> No se pudo actualizar el período.',
                    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>'
                );
                $("#section-configuracion").prepend(alertError);
                setTimeout(() => {
                    alertError.alert('close');
                }, 5000);
            }
        });
    });
}

function recuperarVistaImpacto() {
    const tipo = $(this).data("tipo") || 'final';
    cargarVistaGeneralEnTabla(tipo);
}
