// Configuración global
const urlAPI = "api/MedicionImpactosAPI.php";

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

function crearPanelPreprocesamiento(preprocesamiento) {
    print(preprocesamiento);
    const preguntas = [
        { name: 'registraEntradaSalida', text: '¿Llevas registros de entradas y salidas de dinero?' },
        { name: 'asignaSueldo', text: '¿Tienes asignado un sueldo?' },
        { name: 'conocePuntoEquilibrio', text: '¿Conoces el punto de equilibro?' },
        { name: 'llevaAhorro', text: '¿Asignas ahorro mensual para mantenimiento de equipo o maquinaria?' },
        { name: 'separaGasto', text: '¿Separas los gastos del negocio de tus gastos personales?' },
        { name: 'elaboraPresupuesto', text: '¿Elaboras un presupuesto mensual para tu negocio?' }
    ];

    const cardPreprocesamiento = $("<div>", { class: "card border-0 shadow-sm mb-4" });
    const headerPreprocesamiento = $("<div>", { class: "card-header bg-transparent py-3 border-bottom-0" });
    headerPreprocesamiento.append(
        $("<h5>", { class: "mb-0 fw-bold text-primary d-flex align-items-center" }).append(
            $("<i>", { class: "ti ti-adjustments-horizontal me-2 fs-5" }),
            $("<span>", { text: "Preguntas Clave de Administración" })
        )
    );

    const bodyPreprocesamiento = $("<div>", { class: "card-body scrollbar-custom" }); // Added scrollbar-custom just in case
    const formPreprocesamiento = $("<form>", { id: "form-preprocesamiento", class: "needs-validation", novalidate: true });

    // Using a list group for a cleaner look instead of a table
    const listGroup = $("<div>", { class: "list-group list-group-flush" });

    // Header for the list (Select All)
    const headerItem = $("<div>", { class: "list-group-item d-flex justify-content-between align-items-center bg-light-subtle rounded-top p-3 border-0 mb-2" });
    
    const checkAllSwitch = $("<input>", {
        class: "form-check-input me-2",
        type: "checkbox",
        style: "transform: scale(1.2); cursor: pointer;",
        id: "preproc-select-all-switch",
        "aria-label": "Seleccionar todas las preguntas de preprocesamiento"
    });
    
    headerItem.append(
        $("<strong>", { class: "text-muted small text-uppercase", text: "Seleccionar Todo" }),
        $("<div>", { class: "form-check form-switch m-0" }).append(checkAllSwitch)
    );
    listGroup.append(headerItem);
    
    preguntas.forEach((pregunta, index) => {
        const switchId = `switch-pregunta-${index}`;
        const listItem = $("<div>", { class: "list-group-item d-flex justify-content-between align-items-center border-0 px-3 py-3" });

        listItem.append(
            $("<label>", { class: "form-check-label flex-grow-1 cursor-pointer", for: switchId, text: pregunta.text, style: "cursor: pointer;" }),
            $("<div>", { class: "form-check form-switch ms-3" }).append(
                $("<input>", {
                    class: "form-check-input",
                    type: "checkbox",
                    role: "switch",
                    id: switchId,
                    name: pregunta.name,
                    checked: preprocesamiento[pregunta.name] === "1",
                    "aria-label": pregunta.text,
                    style: "transform: scale(1.2); cursor: pointer;"
                })
            )
        );
        listGroup.append(listItem);
    });

    const allSwitches = listGroup.find('.form-check-input').not('#preproc-select-all-switch');

    function updateMasterSwitchState() {
        const totalSwitches = allSwitches.length;
        const checkedSwitches = allSwitches.filter(':checked').length;

        if (checkedSwitches === totalSwitches) {
            checkAllSwitch.prop('checked', true);
            checkAllSwitch.prop('indeterminate', false);
        } else if (checkedSwitches === 0) {
            checkAllSwitch.prop('checked', false);
            checkAllSwitch.prop('indeterminate', false);
        } else {
            checkAllSwitch.prop('indeterminate', true);
            checkAllSwitch.prop('checked', false);
        }
    }

    checkAllSwitch.on('change', function() {
        const isChecked = $(this).prop('checked');
        allSwitches.prop('checked', isChecked);
    });

    allSwitches.on('change', updateMasterSwitchState);

    const divBoton = $("<div>", { class: "mt-4 d-flex justify-content-end" });
    const botonSubmit = $("<button>", {
        type: "submit",
        class: "btn btn-primary px-4 rounded-pill shadow-sm"
    });
    botonSubmit.append($("<i>", { class: "ti ti-device-floppy me-2" }), $("<span>", { text: "Guardar Cambios" }));
    divBoton.append(botonSubmit);

    formPreprocesamiento.append(listGroup, divBoton);
    bodyPreprocesamiento.append(formPreprocesamiento);
    cardPreprocesamiento.append(headerPreprocesamiento, bodyPreprocesamiento);

    // Form submission handler
    formPreprocesamiento.on('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (this.checkValidity() === false) {
            $(this).addClass('was-validated');
            return;
        }

        const data = {};
        preguntas.forEach(pregunta => {
            const input = $(this).find(`input[name="${pregunta.name}"]`);
            data[pregunta.name] = input.is(':checked') ? 1 : 0;
        });

        crearPeticion(urlAPI, { case: "aplicarPreprocesamiento", data: $.param({ preprocesamiento: data }) });
    });

    updateMasterSwitchState(); // Set initial state

    return cardPreprocesamiento;
}

function generarImpactoHTML(data, emprendedores) {
    $("#impacto-container").empty();

    // === CONTENEDOR PRINCIPAL ===
    const contenedorPrincipal = $("<div>", { class: "container-xxl py-5" });

    // Header del Módulo
    const headerSection = $("<div>", { class: "text-center mb-5" });
    headerSection.append(
        $("<h2>", { class: "display-6 fw-bold text-dark mb-2", text: "Medición de Impactos (Crédito)" }),
        $("<p>", { class: "text-muted lead fs-5", text: `Período de Evaluación: ${data.fechas.inicioSelected} al ${data.fechas.finSelected}` })
    );
    contenedorPrincipal.append(headerSection);

    // === NAVEGACIÓN SUPERIOR (TABS) ===
    const navContainer = $("<div>", { class: "d-flex justify-content-center mb-5" });
    const listaNav = $("<ul>", { class: "nav nav-pills shadow-sm bg-body-tertiary rounded-pill p-2", role: "tablist", id: "navigationList" });

    const itemsNav = [
        { id: "nav-medicion", icon: "ti ti-chart-bar", texto: "Reporte de Medición", target: "section-medicion" },
        { id: "nav-vista-general", icon: "ti ti-table", texto: "Exportar Datos", target: "section-vista-general" },
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
    formFechas.append(rowInputs, $("<div>", { class: "mt-4 text-end" }).append($("<button>", { type: "submit", class: "btn btn-primary rounded-pill px-4" }).append($("<i>", { class: "ti ti-refresh me-2" }), "Actualizar")));
    bodyTemporal.append(formFechas);
    cardTemporal.append(bodyTemporal);

    // Append Card Preprocesamiento (created by separate function)
    const cardPreprocesamiento = crearPanelPreprocesamiento(data.preprocesamiento);
    // Add margin if not present
    cardPreprocesamiento.addClass("mb-4");

    // Card Emprendedores (Hidden logic maintained)
    const cardEmprendedores = $("<div>"); // Placeholder to keep logic if uncommented in future or if logic relies on it existing
    // The previous implementation had it empty largely, but created filtering vars.
    // I will recreate the hidden dom elements needed for the filtering scripts ("#tablaEmprendedores", etc) if they are referenced by ID later.
    // Check lines 825+ "actualizarContadorSeleccionados". It uses ".emprendedor-checkbox".
    // If the card is empty, no checkboxes exist. So the logic runs but finds nothing.
    // I will uphold the "commented out" state of the previous file, effectively showing nothing.

    colConfig.append(cardTemporal, cardPreprocesamiento, cardEmprendedores);
    rowConfig.append(colConfig);
    seccionConfig.append(rowConfig);

    // === SECCIÓN 3: VISTA GENERAL (EXPORT) ===
    const seccionVista = $("<section>", {
        id: "section-vista-general",
        class: "content-section d-none animate__animated animate__fadeIn",
        role: "tabpanel",
        "aria-labelledby": "nav-vista-general"
    });
    
    const rowVista = $("<div>", { class: "row justify-content-center" });
    const colVista = $("<div>", { class: "col-lg-8" });

    const cardExport = $("<div>", { class: "card border-0 shadow-sm text-center py-5 px-4" });
    cardExport.append(
        $("<div>", { class: "mb-4 text-primary" }).append($("<i>", { class: "ti ti-cloud-download display-1" })),
        $("<h3>", { class: "fw-bold", text: "Descarga de Datos" }),
        $("<p>", { class: "text-muted mb-5", text: "Obtenga los datos completos de línea base inicial y seguimiento en formato Excel para su posterior análisis." }),
        $("<div>", { class: "d-flex justify-content-center gap-3 flex-wrap" }).append(
             $("<button>", { type: "button", class: "btn btn-outline-primary btn-lg rounded-pill px-5", id: "btnInicial", "data-tipo": "inicial" }).append($("<i>", { class: "ti ti-file-spreadsheet me-2" }), "Base Inicial"),
             $("<button>", { type: "button", class: "btn btn-outline-success btn-lg rounded-pill px-5", id: "btnFinal", "data-tipo": "final" }).append($("<i>", { class: "ti ti-file-spreadsheet me-2" }), "Base Seguimiento")
        )
    );
    colVista.append(cardExport);
    rowVista.append(colVista);
    seccionVista.append(rowVista);

    // Assembly
    contenidoPrincipal.append(seccionMedicion, seccionConfig, seccionVista);
    contenedorPrincipal.append(contenidoPrincipal);
    $("#impacto-container").append(contenedorPrincipal);

    // --- LOGIC RESTORATION ---
    // Make icons decorative
    contenedorPrincipal.find('i').attr('aria-hidden', 'true');
    
    // Logic for filters (checkboxes etc) needs to be event-bound even if elements aren't there, 
    // to match original function scope.
    
    $("#select-all").on("change", function () {
        const isChecked = $(this).prop("checked");
        // table logic...
         if($.fn.DataTable.isDataTable('#tablaEmprendedores')) {
             $('#tablaEmprendedores').DataTable().rows().every(function () {
                $(this.node()).find('.emprendedor-checkbox').prop('checked', isChecked);
            });
         }
        $("#etapaSelector").val("");
        actualizarContadorSeleccionados();
    });
    
    // ... (Filter logic listeners - adapted) ...

    function actualizarContadorSeleccionados() {
        const seleccionados = $('.emprendedor-checkbox:checked').length;
        const total = emprendedores.length;
        $("#seleccionados-info").text(`${seleccionados} de ${total} emprendedores seleccionados`);
        $("#emprendedores-count").text(`${seleccionados}/${total} seleccionados`);
    }

    $("#select-all-btn").on("click", function () {
        $('.emprendedor-checkbox').prop('checked', true);
        $("#select-all").prop('checked', true);
        $("#etapaSelector").val("");
        actualizarContadorSeleccionados();
    });

    $("#deselect-all-btn").on("click", function () {
        $('.emprendedor-checkbox').prop('checked', false);
        $("#select-all").prop('checked', false);
        actualizarContadorSeleccionados();
    });

    $(document).on('change', '.emprendedor-checkbox', function () {
        actualizarContadorSeleccionados();
        const totalCheckboxes = $('.emprendedor-checkbox').length;
        const checkedCheckboxes = $('.emprendedor-checkbox:checked').length;
        if (checkedCheckboxes === totalCheckboxes) {
            $("#select-all").prop('checked', true).prop('indeterminate', false);
        } else if (checkedCheckboxes === 0) {
            $("#select-all").prop('checked', false).prop('indeterminate', false);
        } else {
            $("#select-all").prop('indeterminate', true);
        }
    });

    $("#apply-filter").on("click", aplicarFiltro);
    $("#btnInicial").on("click", recuperarVistaImpacto);
    $("#btnFinal").on("click", recuperarVistaImpacto);

    actualizarContadorSeleccionados();

    $(document).on('shown.bs.tab shown.bs.collapse', function (e) {
        // DataTable adjust
         if($.fn.DataTable.isDataTable('#tablaEmprendedores')) {
             $('#tablaEmprendedores').DataTable().columns.adjust().draw();
         }
    });

    // Nav config click to init table if exists
    $(document).on('click', '#nav-configuracion', function () {
        // Logic primarily for when the table is present
        setTimeout(() => {
             // Only if table exists in DOM
             if ($("#tablaEmprendedores").length) {
                 if (!$.fn.DataTable.isDataTable('#tablaEmprendedores')) {
                     crearDataTable("#tablaEmprendedores");
                 } else {
                     $('#tablaEmprendedores').DataTable().columns.adjust().draw();
                 }
             }
        }, 100);
    });
}

function aplicarFiltro() {
    const seleccionados = [];
    const table = $('#tablaEmprendedores').DataTable();

    const btnAplicar = $("#apply-filter");
    const btnText = btnAplicar.html();
    btnAplicar.prop('disabled', true).html(
        '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Aplicando...'
    );

    table.rows().every(function () {
        let checkbox = $(this.node()).find('.emprendedor-checkbox');
        if (checkbox.prop('checked')) {
            seleccionados.push(parseInt(checkbox.val()));
        }
    });

    crearPeticion(urlAPI, {
        case: "actualizarFiltroEmprendedores",
        data: $.param({ seleccionados: seleccionados })
    }, (res) => {
        if (!res.es_valor_error) {
            const alertSuccess = $('<div class="alert alert-success alert-dismissible fade show" role="alert">');
            alertSuccess.append(
                '<i class="ti ti-check me-2"></i>',
                '<strong>¡Éxito!</strong> La configuración se ha aplicado correctamente.',
                '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>'
            );

            $("#section-configuracion").prepend(alertSuccess);

            setTimeout(() => {
                alertSuccess.alert('close');
            }, 5000);

            refresh();
        } else {
            const alertError = $('<div class="alert alert-danger alert-dismissible fade show" role="alert">');
            alertError.append(
                '<i class="ti ti-x me-2"></i>',
                '<strong>Error:</strong> No se pudo aplicar la configuración. Intente nuevamente.',
                '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>'
            );

            $("#section-configuracion").prepend(alertError);

            setTimeout(() => {
                alertError.alert('close');
            }, 5000);
        }

        btnAplicar.prop('disabled', false).html(btnText);
    });
}

function filtrarEmprendedores(etapaSeleccionada) {
    const table = $('#tablaEmprendedores').DataTable();

    if (etapaSeleccionada === "") {
        table.search('').draw();
        return;
    }

    table.rows({ search: 'applied' }).every(function () {
        const rowNode = $(this.node());
        const checkbox = rowNode.find('.emprendedor-checkbox');
        const etapaCell = rowNode.find('td:nth-child(4) .badge');
        const etapaText = etapaCell.text().trim();

        checkbox.prop('checked', etapaText === etapaSeleccionada);
    });

    table.column(3).search(etapaSeleccionada).draw();

    $("#select-all").prop("checked", false).prop('indeterminate', false);
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
    const button = $(this);
    const tipo = button.data("tipo");
    const originalContent = button.html();

    button.prop("disabled", true).html(
        '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>' +
        `Exportando ${tipo}...`
    );

    crearPeticion(urlAPI, {
        case: 'recuperarVistaGeneral',
        data: $.param({ tipo: tipo })
    }, async (registros) => {

        if (Array.isArray(registros) && registros.length > 0) {
            // Crear contenedor temporal para la tabla
            const tempContainer = $('<div>').css({ position: 'fixed', top: '-9999px', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' });
            const tempTable = $('<table class="table">').appendTo(tempContainer);
            tempContainer.appendTo('body');

            let dataTable = null;
            try {
                // Inicializar DataTable con los datos
                dataTable = tempTable.DataTable({
                    data: registros,
                    columns: Object.keys(registros[0]).map(key => ({
                        title: key,
                        data: key
                    })),
                    dom: 'Bfrtip',
                    buttons: [{ extend: 'excel', filename: `Medición de impactos - ${tipo}` }],
                    searching: false,
                    paging: false,
                    info: false
                });

                // Esperar a que el botón esté disponible y exportar
                await new Promise((resolve, reject) => {
                    let attempts = 0;
                    function tryExport() {
                        const excelButton = tempContainer.find('.buttons-excel');
                        if (excelButton.length > 0) {
                            excelButton.one('click', function() {
                                setTimeout(resolve, 500); // Espera a que termine la exportación
                            });
                            excelButton.click();
                        } else if (++attempts < 10) {
                            setTimeout(tryExport, 100);
                        } else {
                            reject(new Error('No se encontró el botón de exportación.'));
                        }
                    }
                    tryExport();
                });

                // Limpiar DataTable y contenedor
                dataTable.destroy();
                tempContainer.remove();

                const alertSuccess = $('<div class="alert alert-success alert-dismissible fade show" role="alert">');
                alertSuccess.append(
                    '<i class="ti ti-check me-2"></i>',
                    `<strong>¡Descarga completada!</strong> Los datos de la línea base ${tipo} han sido descargados.`,
                    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>'
                );
                $("#section-vista-general").prepend(alertSuccess);
                setTimeout(() => {
                    alertSuccess.alert('close');
                }, 5000);
            } catch (e) {
                if (dataTable) {
                    dataTable.destroy();
                }
                tempContainer.remove();
                console.error('Error al exportar:', e);
                const alertError = $('<div class="alert alert-danger alert-dismissible fade show" role="alert">');
                alertError.append(
                    '<i class="ti ti-x me-2"></i>',
                    '<strong>Error:</strong> Ocurrió un error al exportar los datos.',
                    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>'
                );
                $("#section-vista-general").prepend(alertError);
                setTimeout(() => {
                    alertError.alert('close');
                }, 5000);
            } finally {
                button.prop("disabled", false).html(originalContent);
            }
        } else {
            const alertInfo = $('<div class="alert alert-info alert-dismissible fade show" role="alert">');
            alertInfo.append(
                '<i class="ti ti-info-circle me-2"></i>',
                '<strong>Sin datos:</strong> No hay información disponible para exportar en este momento.',
                '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>'
            );
            $("#section-vista-general").prepend(alertInfo);
            setTimeout(() => {
                alertInfo.alert('close');
            }, 5000);
            button.prop("disabled", false).html(originalContent);
        }
    });
}