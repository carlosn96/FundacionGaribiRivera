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
    $("#msgImpacto").prop("hidden", false);
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

    const cardPreprocesamiento = $("<div>", { class: "card shadow-sm mb-4" });
    const headerPreprocesamiento = $("<div>", { class: "card-header bg-white border-bottom" });
    headerPreprocesamiento.append(
        $("<h5>", { class: "mb-0 d-flex align-items-center" }).append(
            $("<i>", { class: "ti ti-adjustments me-2" }),
            $("<span>", { text: "Preprocesamiento de Preguntas Clave" })
        )
    );

    const bodyPreprocesamiento = $("<div>", { class: "card-body" });
    const formPreprocesamiento = $("<form>", { id: "form-preprocesamiento", class: "needs-validation", novalidate: true });

    const tabla = $("<table>", { class: "table table-hover" });
    const thead = $("<thead>", { class: "table-light" });

    const checkAllSwitch = $("<input>", {
        class: "form-check-input",
        type: "checkbox",
        role: "switch",
        id: "preproc-select-all-switch",
    });
    const headerSwitchContainer = $("<div>", { class: "form-check form-switch d-flex justify-content-center" });
    headerSwitchContainer.append(checkAllSwitch);

    thead.append(
        $("<tr>").append(
            $("<th>", { scope: "col", text: "Pregunta de Administración" }),
            $("<th>", { scope: "col", class: "text-center" }).append(headerSwitchContainer)
        )
    );

    const tbody = $("<tbody>");
    preguntas.forEach((pregunta, index) => {
        const switchId = `switch-pregunta-${index}`;
        const fila = $("<tr>");

        fila.append(
            $("<td>").append(
                $("<label>", { class: "form-check-label", for: switchId, text: pregunta.text })
            ),
            $("<td>", { class: "text-center" }).append(
                $("<div>", { class: "form-check form-switch d-flex justify-content-center" }).append(
                    $("<input>", {
                        class: "form-check-input",
                        type: "checkbox",
                        role: "switch",
                        id: switchId,
                        name: pregunta.name,
                        checked: preprocesamiento[pregunta.name] === "1",
                    })
                )
            )
        );
        tbody.append(fila);
    });

    tabla.append(thead, tbody);

    const allSwitches = tbody.find('.form-check-input');

    function updateMasterSwitchState() {
        const totalSwitches = allSwitches.length;
        const checkedSwitches = tbody.find('.form-check-input:checked').length;

        if (checkedSwitches === totalSwitches) {
            checkAllSwitch.prop('checked', true);
            checkAllSwitch.prop('indeterminate', false);
        } else if (checkedSwitches === 0) {
            checkAllSwitch.prop('checked', false);
            checkAllSwitch.prop('indeterminate', false);
        } else {
            checkAllSwitch.prop('indeterminate', true);
            checkAllSwitch.prop('checked', false); // When indeterminate, it should not be checked
        }
    }

    checkAllSwitch.on('change', function() {
        const isChecked = $(this).prop('checked');
        allSwitches.prop('checked', isChecked);
    });

    allSwitches.on('change', updateMasterSwitchState);

    const divBoton = $("<div>", { class: "mt-3 text-end" });
    const botonSubmit = $("<button>", {
        type: "submit",
        class: "btn btn-outline-primary"
    });
    botonSubmit.append($("<i>", { class: "ti ti-settings me-2" }), $("<span>", { text: "Aplicar configuración de Preprocesamiento" }));
    divBoton.append(botonSubmit);

    formPreprocesamiento.append(tabla, divBoton);
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

    // Contenedor principal
    const contenedorPrincipal = $("<div>", { class: "container-fluid py-4" });
    const fila = $("<div>", { class: "row g-4" });

    // === SIDEBAR DE NAVEGACIÓN ===
    const columnaSidebar = $("<div>", { class: "col-lg-3 col-md-4" });
    const navCard = $("<div>", { class: "card shadow-sm position-sticky", style: "top: 1rem;" });

    const navHeader = $("<div>", { class: "card-header bg-white border-bottom" });
    navHeader.append($("<h5>", { class: "mb-0 fw-semibold", text: "Navegación" }));

    const navBody = $("<div>", { class: "card-body p-0" });
    const listaNav = $("<ul>", { class: "nav nav-pills flex-column", role: "tablist", id: "navigationList" });

    const itemsNav = [
        { id: "nav-medicion", icon: "ti ti-chart-bar", texto: "Medición de Impactos", target: "section-medicion" },
        { id: "nav-configuracion", icon: "ti ti-settings", texto: "Configuración", target: "section-configuracion" },
        { id: "nav-vista-general", icon: "ti ti-file-analytics", texto: "Vista General", target: "section-vista-general" }
    ];

    itemsNav.forEach((item, idx) => {
        const navItem = $("<li>", { class: "nav-item" });
        const navLink = $("<button>", {
            type: "button",
            class: `nav-link ${idx === 0 ? 'active' : ''} d-flex align-items-center w-100 text-start`,
            id: item.id,
            "data-target": item.target,
            role: "tab",
            "aria-controls": item.target,
            "aria-selected": idx === 0 ? "true" : "false"
        });

        navLink.append(
            $("<i>", { class: `${item.icon} me-2` }),
            $("<span>", { text: item.texto })
        );

        navLink.on("click", function () {
            listaNav.find(".nav-link").removeClass("active").attr("aria-selected", "false");
            $(this).addClass("active").attr("aria-selected", "true");

            $("#main-content").find(".content-section").addClass("d-none");
            $(`#${item.target}`).removeClass("d-none");

            $(`#${item.target}`)[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        navItem.append(navLink);
        listaNav.append(navItem);
    });

    navBody.append(listaNav);
    navCard.append(navHeader, navBody);
    columnaSidebar.append(navCard);

    // === CONTENIDO PRINCIPAL ===
    const columnaContenido = $("<div>", { class: "col-lg-9 col-md-8" });
    const contenidoPrincipal = $("<div>", { id: "main-content" });

    // === SECCIÓN 1: MEDICIÓN DE IMPACTOS ===
    const seccionMedicion = $("<section>", {
        id: "section-medicion",
        class: "content-section",
        role: "tabpanel",
        "aria-labelledby": "nav-medicion"
    });

    const headerMedicion = $("<div>", { class: "mb-4" });
    const cardHeader = $("<div>", { class: "card shadow-sm border-start border-4 border-primary" });
    const cardHeaderBody = $("<div>", { class: "card-body" });

    const rowHeader = $("<div>", { class: "row align-items-center" });
    rowHeader.append(
        $("<div>", { class: "col" }).append(
            $("<h2>", { class: "h4 mb-1 d-flex align-items-center" }).append(
                $("<i>", { class: "ti ti-chart-bar me-2" }),
                $("<span>", { text: "Medición de Impactos (Crédito)" })
            ),
            $("<p>", { class: "text-muted mb-0 small", text: `Período: ${data.fechas.inicioSelected} - ${data.fechas.finSelected}` })
        )
    );

    cardHeaderBody.append(rowHeader);
    cardHeader.append(cardHeaderBody);
    headerMedicion.append(cardHeader);
    seccionMedicion.append(headerMedicion);

    // Accordion de impactos
    const accordionImpactos = $("<div>", { class: "accordion", id: "impactosAccordion" });

    const impactosVisibles = data.impactos.filter(p => p.nombre === 'Estabilidad económica');

    impactosVisibles.forEach((impacto, idx) => {
        const itemAccordion = $("<div>", { class: "accordion-item shadow-sm mb-3" });

        const headerAccordion = $("<h3>", { class: "accordion-header", id: `heading-${idx}` });
        const botonAccordion = $("<button>", {
            class: `accordion-button ${idx === 0 ? '' : 'collapsed'}`,
            type: "button",
            "data-bs-toggle": "collapse",
            "data-bs-target": `#collapse-${idx}`,
            "aria-expanded": idx === 0 ? "true" : "false",
            "aria-controls": `collapse-${idx}`
        });

        botonAccordion.append(
            $("<div>", { class: "d-flex align-items-center w-100" }).append(
                $("<span>", { class: "badge bg-primary me-3 fs-6", text: idx + 1 }),
                $("<div>").append(
                    $("<strong>", { text: impacto.nombre }),
                    $("<div>", { class: "text-muted small", text: "Ver análisis detallado" })
                )
            )
        );

        headerAccordion.append(botonAccordion);

        const collapseAccordion = $("<div>", {
            id: `collapse-${idx}`,
            class: `accordion-collapse collapse ${idx === 0 ? 'show' : ''}`,
            "aria-labelledby": `heading-${idx}`,
            "data-bs-parent": "#impactosAccordion"
        });

        const bodyAccordion = $("<div>", { class: "accordion-body" });

        // Calcular impacto total
        let impactoTotal = 0;
        impacto.data.forEach(seccion => {
            impactoTotal += parseFloat(seccion.contribucionImpacto);
        });

        // Card de resumen
        const cardResumen = $("<div>", { class: "card mb-4 border-0" });
        const alertClass = impactoTotal >= 70 ? 'alert-success' : impactoTotal >= 40 ? 'alert-warning' : 'alert-danger';
        const iconClass = impactoTotal >= 70 ? 'ti-check' : impactoTotal >= 40 ? 'ti-alert-triangle' : 'ti-x';

        const alertResumen = $("<div>", {
            class: `alert ${alertClass} d-flex align-items-center mb-0`,
            role: "alert"
        });

        alertResumen.append(
            $("<i>", { class: `ti ${iconClass} fs-2 me-3` }),
            $("<div>").append(
                $("<h5>", { class: "alert-heading mb-1", text: "Impacto Total" }),
                $("<p>", { class: "h3 mb-0", text: `${impactoTotal.toFixed(2)}%` })
            )
        );

        cardResumen.append(alertResumen);

        // Tabla de cálculos
        const divTabla = $("<div>", { class: "table-responsive mb-4" });
        const tabla = $("<table>", { class: "table table-hover align-middle" });

        const thead = $("<thead>", { class: "table-light" });
        thead.append(
            $("<tr>").append(
                $("<th>", { scope: "col", text: "Sección" }),
                $("<th>", { scope: "col", class: "text-center", text: "Obtenido" }),
                $("<th>", { scope: "col", class: "text-center", text: "Peso" }),
                $("<th>", { scope: "col", class: "text-center", text: "Contribución" })
            )
        );

        const tbody = $("<tbody>");
        impacto.data.forEach(seccion => {
            const fila = $("<tr>");
            const contribucion = parseFloat(seccion.contribucionImpacto);
            const badgeClass = contribucion >= 15 ? 'bg-success' : contribucion >= 10 ? 'bg-warning text-dark' : 'bg-danger';

            fila.append(
                $("<td>").append(
                    $("<i>", { class: "ti ti-clipboard-data me-2" }),
                    $("<span>", { text: seccion.titulo })
                ),
                $("<td>", { class: "text-center" }).append(
                    $("<span>", { class: "badge bg-secondary", text: `${seccion.obtenido}%` })
                ),
                $("<td>", { class: "text-center" }).append(
                    $("<span>", { class: "badge bg-dark", text: `${seccion.peso}%` })
                ),
                $("<td>", { class: "text-center" }).append(
                    $("<span>", { class: `badge ${badgeClass}`, text: `${seccion.contribucionImpacto}%` })
                )
            );
            tbody.append(fila);
        });

        const filaTotal = $("<tr>", { class: "table-active fw-bold" });
        filaTotal.append(
            $("<td>", { text: "Total", colspan: 3 }),
            $("<td>", { class: "text-center" }).append(
                $("<span>", { class: "badge bg-primary fs-6", text: `${impactoTotal.toFixed(2)}%` })
            )
        );
        tbody.append(filaTotal);

        tabla.append(thead, tbody);
        divTabla.append(tabla);

        // Card de narrativa
        const cardNarrativa = $("<div>", { class: "card mb-4 bg-light border-0 shadow-sm" });
        const headerNarrativa = $("<div>", { class: "card-header bg-transparent border-bottom" });
        headerNarrativa.append(
            $("<h6>", { class: "mb-0" }).append(
                $("<i>", { class: "ti ti-file-text me-2" }),
                $("<span>", { text: "Narrativa" })
            )
        );

        const bodyNarrativa = $("<div>", { class: "card-body" });
        bodyNarrativa.append($("<div>", { class: "text-muted", html: impacto.narrativa }));
        cardNarrativa.append(headerNarrativa, bodyNarrativa);

        // Accordion anidado para detalles
        const accordionDetalles = $("<div>", { class: "accordion accordion-flush", id: `variaciones-${idx}` });

        impacto.data.forEach((seccion, secIdx) => {
            const itemDetalle = $("<div>", { class: "accordion-item" });
            const headerDetalle = $("<h4>", { class: "accordion-header", id: `var-heading-${idx}-${secIdx}` });
            const botonDetalle = $("<button>", {
                class: "accordion-button collapsed",
                type: "button",
                "data-bs-toggle": "collapse",
                "data-bs-target": `#var-collapse-${idx}-${secIdx}`,
                "aria-expanded": "false",
                "aria-controls": `var-collapse-${idx}-${secIdx}`,
                text: `Detalles: ${seccion.titulo}`
            });

            const collapseDetalle = $("<div>", {
                id: `var-collapse-${idx}-${secIdx}`,
                class: "accordion-collapse collapse",
                "aria-labelledby": `var-heading-${idx}-${secIdx}`,
                "data-bs-parent": `#variaciones-${idx}`
            });

            const bodyDetalle = $("<div>", { class: "accordion-body" });
            const tablaDetalle = $("<div>", { class: "table-responsive" });
            const tableDetalle = $("<table>", { class: "table table-sm table-striped" });

            const theadDetalle = $("<thead>");
            theadDetalle.append(
                $("<tr>").append(
                    $("<th>", { text: "Pregunta" }),
                    $("<th>", { class: "text-center", text: "Inicial" }),
                    $("<th>", { class: "text-center", text: "Final" }),
                    $("<th>", { class: "text-center", text: "Variación" })
                )
            );

            const tbodyDetalle = $("<tbody>");
            Object.entries(seccion.mediciones).forEach(([pregunta, medicion]) => {
                const variacion = medicion.variacionPorcentual.toFixed(2);
                const badgeVar = parseFloat(variacion) > 0 ? 'bg-success' : parseFloat(variacion) < 0 ? 'bg-danger' : 'bg-secondary';

                const filaDetalle = $("<tr>");
                filaDetalle.append(
                    $("<td>", { text: pregunta }),
                    $("<td>", { class: "text-center", text: medicion.inicial }),
                    $("<td>", { class: "text-center", text: medicion.final }),
                    $("<td>", { class: "text-center" }).append(
                        $("<span>", { class: `badge ${badgeVar}`, text: `${variacion}%` })
                    )
                );
                tbodyDetalle.append(filaDetalle);
            });

            tableDetalle.append(theadDetalle, tbodyDetalle);
            tablaDetalle.append(tableDetalle);
            bodyDetalle.append(tablaDetalle);
            headerDetalle.append(botonDetalle);
            collapseDetalle.append(bodyDetalle);
            itemDetalle.append(headerDetalle, collapseDetalle);
            accordionDetalles.append(itemDetalle);
        });

        bodyAccordion.append(cardResumen, divTabla, cardNarrativa, accordionDetalles);
        collapseAccordion.append(bodyAccordion);
        itemAccordion.append(headerAccordion, collapseAccordion);
        accordionImpactos.append(itemAccordion);
    });

    seccionMedicion.append(accordionImpactos);

    // === SECCIÓN 2: CONFIGURACIÓN ===
    const seccionConfig = $("<section>", {
        id: "section-configuracion",
        class: "content-section d-none",
        role: "tabpanel",
        "aria-labelledby": "nav-configuracion"
    });

    const headerConfig = $("<div>", { class: "mb-4" });
    const cardHeaderConfig = $("<div>", { class: "card shadow-sm border-start border-4 border-info" });
    const cardHeaderBodyConfig = $("<div>", { class: "card-body" });
    cardHeaderBodyConfig.append(
        $("<h2>", { class: "h4 mb-0 d-flex align-items-center" }).append(
            $("<i>", { class: "ti ti-settings me-2" }),
            $("<span>", { text: "Configuración de Parámetros" })
        )
    );
    cardHeaderConfig.append(cardHeaderBodyConfig);
    headerConfig.append(cardHeaderConfig);
    seccionConfig.append(headerConfig);

    // Card temporal
    const cardTemporal = $("<div>", { class: "card shadow-sm mb-4" });
    const headerTemporal = $("<div>", { class: "card-header bg-white border-bottom" });
    headerTemporal.append(
        $("<h5>", { class: "mb-0 d-flex align-items-center" }).append(
            $("<i>", { class: "ti ti-calendar me-2" }),
            $("<span>", { text: "Configuración Temporal" })
        )
    );

    const bodyTemporal = $("<div>", { class: "card-body" });
    const formFechas = $("<form>", { id: "form-fechas", class: "needs-validation", novalidate: true });
    const rowTemporal = $("<div>", { class: "row g-3" });

    const colInicio = $("<div>", { class: "col-md-6" });
    const labelInicio = $("<label>", { for: "fechaInicio", class: "form-label", text: "Fecha de Inicio" });
    const inputInicio = $("<input>", {
        type: "date",
        class: "form-control",
        id: "fechaInicio",
        name: "fechaInicio",
        min: `${data.fechas.inicio}`,
        max: `${data.fechas.fin}`,
        value: `${data.fechas.inicioSelected}`,
        required: true
    });
    colInicio.append(labelInicio, inputInicio);

    const colFinal = $("<div>", { class: "col-md-6" });
    const labelFinal = $("<label>", { for: "fechaFinal", class: "form-label", text: "Fecha Final" });
    const inputFinal = $("<input>", {
        type: "date",
        class: "form-control",
        id: "fechaFinal",
        name: "fechaFinal",
        min: `${data.fechas.inicio}`,
        max: `${data.fechas.fin}`,
        value: `${data.fechas.finSelected}`,
        required: true
    });
    colFinal.append(labelFinal, inputFinal);

    rowTemporal.append(colInicio, colFinal);

    const divBoton = $("<div>", { class: "mt-3 text-end" });
    const botonSubmit = $("<button>", {
        type: "submit",
        class: "btn btn-outline-primary"
    });
    botonSubmit.append($("<i>", { class: "ti ti-device-floppy me-2" }), $("<span>", { text: "Actualizar Período" }));
    divBoton.append(botonSubmit);

    formFechas.append(rowTemporal, divBoton);
    bodyTemporal.append(formFechas);
    cardTemporal.append(headerTemporal, bodyTemporal);

    // Card emprendedores
    const cardEmprendedores = $("<div>", { class: "card shadow-sm" });
    const headerEmprendedores = $("<div>", { class: "card-header bg-white border-bottom d-flex justify-content-between align-items-center" });
    headerEmprendedores.append(
        $("<h5>", { class: "mb-0 d-flex align-items-center" }).append(
            $("<i>", { class: "ti ti-users me-2" }),
            $("<span>", { text: "Gestión de Emprendedores" })
        ),
        $("<span>", { class: "badge bg-dark", id: "emprendedores-count", text: `${emprendedores.length} total` })
    );

    const bodyEmprendedores = $("<div>", { class: "card-body" });

    // Filtros
    const rowFiltros = $("<div>", { class: "row g-3 mb-3" });
    const colEtapa = $("<div>", { class: "col-md-6" });

    const labelEtapa = $("<label>", { for: "etapaSelector", class: "form-label", text: "Filtrar por etapa" });
    const selectEtapa = $("<select>", { class: "form-select", id: "etapaSelector", "aria-describedby": "etapaHelp" });
    selectEtapa.append($("<option>", { value: "", text: "Todas las etapas" }));

    const etapasUnicas = [...new Set(emprendedores.map(emp => emp.etapa))];
    etapasUnicas.forEach(etapa => {
        selectEtapa.append($("<option>", { value: etapa, text: etapa }));
    });

    selectEtapa.on('change', function () {
        const etapaSelec = $(this).val();
        filtrarEmprendedores(etapaSelec, emprendedores);
        actualizarContadorSeleccionados();
    });

    const helpEtapa = $("<div>", { id: "etapaHelp", class: "form-text", text: "Filtre emprendedores por su etapa actual" });
    colEtapa.append(labelEtapa, selectEtapa, helpEtapa);

    const colAcciones = $("<div>", { class: "col-md-6 d-flex align-items-end gap-2" });
    const btnSelTodos = $("<button>", {
        type: "button",
        class: "btn btn-outline-primary flex-fill",
        id: "select-all-btn",
        text: "Seleccionar Todos"
    });
    const btnDeselTodos = $("<button>", {
        type: "button",
        class: "btn btn-outline-secondary flex-fill",
        id: "deselect-all-btn",
        text: "Deseleccionar Todos"
    });
    colAcciones.append(btnSelTodos, btnDeselTodos);

    rowFiltros.append(colEtapa, colAcciones);

    // Tabla emprendedores
    const divTablaEmp = $("<div>", { class: "table-responsive" });
    const tablaEmp = $("<table>", { class: "table table-hover align-middle", id: "tablaEmprendedores" });

    const theadEmp = $("<thead>", { class: "table-light" });
    const checkAll = $("<input>", {
        class: "form-check-input",
        type: "checkbox",
        id: "select-all",
        "aria-label": "Seleccionar todos"
    });

    theadEmp.append(
        $("<tr>").append(
            $("<th>", { scope: "col", class: "text-center" }).append(
                $("<div>", { class: "form-check d-flex justify-content-center" }).append(checkAll)
            ),
            $("<th>", { scope: "col", text: "Nombre Completo" }),
            $("<th>", { scope: "col", text: "Correo Electrónico" }),
            $("<th>", { scope: "col", class: "text-center", text: "Etapa" })
        )
    );

    const tbodyEmp = $("<tbody>");
    emprendedores.forEach(emp => {
        const iniciales = emp.nombre.charAt(0) + emp.apellidos.charAt(0);
        const checkEmp = $("<input>", {
            checked: emp.enLineaBase,
            class: "form-check-input emprendedor-checkbox",
            type: "checkbox",
            value: emp.idLineaBase,
            id: `checkbox-${emp.idUsuario}`,
            "aria-label": `Seleccionar ${emp.nombre} ${emp.apellidos}`
        });

        const fila = $("<tr>");
        fila.append(
            $("<td>", { class: "text-center" }).append(
                $("<div>", { class: "form-check d-flex justify-content-center" }).append(checkEmp)
            ),
            $("<td>").append(
                $("<div>", { class: "d-flex align-items-center" }).append(
                    $("<div>", {
                        class: "bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center me-3",
                        style: "width: 40px; height: 40px; font-weight: 600;",
                        text: iniciales
                    }),
                    $("<div>").append(
                        $("<div>", { class: "fw-semibold", text: `${emp.nombre} ${emp.apellidos}` })
                    )
                )
            ),
            $("<td>", { text: emp.correo }),
            $("<td>", { class: "text-center" }).append(
                $("<span>", { class: "badge bg-light text-dark border", text: emp.etapa })
            )
        );
        tbodyEmp.append(fila);
    });

    tablaEmp.append(theadEmp, tbodyEmp);
    divTablaEmp.append(tablaEmp);

    // Footer con contador y botón
    const divFooterEmp = $("<div>", { class: "d-flex justify-content-between align-items-center mt-3" });
    divFooterEmp.append(
        $("<span>", { class: "text-muted", id: "seleccionados-info", text: "0 emprendedores seleccionados" }),
        $("<button>", {
            type: "button",
            class: "btn btn-primary",
            id: "apply-filter"
        }).append(
            $("<i>", { class: "ti ti-check me-2" }),
            $("<span>", { text: "Aplicar Configuración" })
        )
    );

    /*bodyEmprendedores.append(rowFiltros, divTablaEmp, divFooterEmp); // descomentar para mejorar el filtro de emprendedores
    cardEmprendedores.append(headerEmprendedores, bodyEmprendedores);*/

    const cardPreprocesamiento = crearPanelPreprocesamiento(data.preprocesamiento);
    seccionConfig.append(cardTemporal, cardPreprocesamiento, cardEmprendedores);

    // === SECCIÓN 3: VISTA GENERAL ===
    const seccionVista = $("<section>", {
        id: "section-vista-general",
        class: "content-section d-none",
        role: "tabpanel",
        "aria-labelledby": "nav-vista-general"
    });

    const headerVista = $("<div>", { class: "mb-4" });
    const cardHeaderVista = $("<div>", { class: "card shadow-sm border-start border-4 border-success" });
    const cardHeaderBodyVista = $("<div>", { class: "card-body" });
    cardHeaderBodyVista.append(
        $("<h2>", { class: "h4 mb-0 d-flex align-items-center" }).append(
            $("<i>", { class: "ti ti-file-analytics me-2" }),
            $("<span>", { text: "Vista General" })
        )
    );
    cardHeaderVista.append(cardHeaderBodyVista);
    headerVista.append(cardHeaderVista);
    seccionVista.append(headerVista);

    const cardExport = $("<div>", { class: "card shadow-sm" });
    const headerExport = $("<div>", { class: "card-header bg-white border-bottom" });
    headerExport.append(
        $("<h5>", { class: "mb-0 d-flex align-items-center" }).append(
            $("<i>", { class: "ti ti-download me-2" }),
            $("<span>", { text: "Exportación de Datos" })
        )
    );

    const bodyExport = $("<div>", { class: "card-body text-center py-5" });

    bodyExport.append(
        $("<p>", { class: "text-muted mb-4", text: "Exporte los datos de la línea base en formato Excel para análisis externos." }),
        $("<div>", { class: "d-grid gap-3 d-md-flex justify-content-md-center" }).append(
            $("<button>", {
                type: "button",
                class: "btn btn-outline-info btn-lg",
                id: "btnInicial",
                "data-tipo": "inicial"
            }).append(
                $("<i>", { class: "ti ti-download me-2" }),
                $("<span>", { text: "Exportar Línea Base Inicial" })
            ),
            $("<button>", {
                type: "button",
                class: "btn btn-outline-success btn-lg",
                id: "btnFinal",
                "data-tipo": "final"
            }).append(
                $("<i>", { class: "ti ti-upload me-2" }),
                $("<span>", { text: "Exportar Línea Base Final" })
            )
        ),
        $("<div>", { id: "loadingSpinnerContainer", class: "mt-4 d-none" }).append(
            $("<div>", { class: "alert alert-info d-flex align-items-center justify-content-center", role: "alert" }).append(
                $("<div>", { class: "spinner-border spinner-border-sm me-3", role: "status" }).append(
                    $("<span>", { class: "visually-hidden", text: "Cargando..." })
                ),
                $("<span>", { text: "Preparando exportación..." })
            )
        )
    );

    cardExport.append(headerExport, bodyExport);
    seccionVista.append(cardExport);

    // === ENSAMBLADO ===
    contenidoPrincipal.append(seccionMedicion, seccionConfig, seccionVista);
    columnaContenido.append(contenidoPrincipal);
    fila.append(columnaSidebar, columnaContenido);
    contenedorPrincipal.append(fila);
    $("#impacto-container").append(contenedorPrincipal);

    // === EVENTOS ===

    function actualizarContadorSeleccionados() {
        const seleccionados = $('.emprendedor-checkbox:checked').length;
        const total = emprendedores.length;
        $("#seleccionados-info").text(`${seleccionados} de ${total} emprendedores seleccionados`);
        $("#emprendedores-count").text(`${seleccionados}/${total} seleccionados`);
    }

    $("#select-all").on("change", function () {
        const isChecked = $(this).prop("checked");
        const table = $('#tablaEmprendedores').DataTable();
        table.rows().every(function () {
            $(this.node()).find('.emprendedor-checkbox').prop('checked', isChecked);
        });
        $("#etapaSelector").val("");
        actualizarContadorSeleccionados();
    });

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
        const table = $('#tablaEmprendedores');
        if (table.length && $.fn.DataTable.isDataTable(table)) {
            table.DataTable().columns.adjust().draw();
        }
    });

    $(document).on('click', '#nav-configuracion', function () {
        setTimeout(() => {
            if (!$.fn.DataTable.isDataTable('#tablaEmprendedores')) {
                crearDataTable("#tablaEmprendedores");
            } else {
                $('#tablaEmprendedores').DataTable().columns.adjust().draw();
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

    $("#loadingSpinnerContainer").removeClass("d-none");

    crearPeticion(urlAPI, {
        case: 'recuperarVistaGeneral',
        data: $.param({ tipo: tipo })
    }, (registros) => {
        $("#loadingSpinnerContainer").addClass("d-none");

        if (registros.length !== 0) {
            const tempTable = $('<table>').DataTable({
                data: registros,
                columns: Object.keys(registros[0]).map(key => ({
                    title: key,
                    data: key
                })),
                dom: 'Bfrtip',
                buttons: ['excel']
            });

            tempTable.button('.buttons-excel').trigger();
            tempTable.destroy();

            const alertSuccess = $('<div class="alert alert-success alert-dismissible fade show" role="alert">');
            alertSuccess.append(
                '<i class="ti ti-download me-2"></i>',
                `<strong>¡Descarga iniciada!</strong> Los datos de la línea base ${tipo} se están descargando.`,
                '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>'
            );

            $("#section-vista-general").prepend(alertSuccess);

            setTimeout(() => {
                alertSuccess.alert('close');
            }, 5000);

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
        }

        button.prop("disabled", false).html(originalContent);
    });
}