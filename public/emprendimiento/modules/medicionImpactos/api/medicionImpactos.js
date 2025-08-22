// Mostrar mensaje de error
const urlAPI = "api/MedicionImpactosAPI.php";
const alertError = $('<div class="alert alert-danger border-danger border-2 alert-dismissible fade show" role="alert">');

function ready() {
    crearPeticion(urlAPI, {case: "consultarMedicionImpactos"}, (res) => {
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

function generarImpactoHTML(data, emprendedores) {
    // Limpia el contenedor principal antes de generar las nuevas tarjetas.
    $("#impacto-container").empty();

    // Contenedor principal con diseño de columnas responsivo
    const mainContainer = $("<div>", {class: "container-fluid"});
    const row = $("<div>", {class: "row g-4"});

    // === SIDEBAR DE NAVEGACIÓN ===
    const sidebarCol = $("<div>", {class: "col-lg-3 col-md-4"});
    const sidebarCard = $("<div>", {class: "card sticky-top", style: "top: 1rem;"});
    const sidebarHeader = $("<div>", {class: "card-header"});
    sidebarHeader.append($("<h5>", {class: "card-title mb-0", text: "Navegación"}));
    
    const sidebarBody = $("<div>", {class: "card-body p-0"});
    const navList = $("<div>", {class: "list-group list-group-flush", id: "navigationList"});

    // Botones de navegación principal
    const navItems = [
        {id: "nav-medicion", icon: "ti ti-chart-bar", text: "Medición de Impactos", target: "section-medicion"},
        {id: "nav-configuracion", icon: "ti ti-settings", text: "Configuración", target: "section-configuracion"},
        {id: "nav-vista-general", icon: "ti ti-file-analytics", text: "Vista General", target: "section-vista-general"}
    ];

    navItems.forEach((item, index) => {
        const navItem = $("<button>", {
            type: "button",
            class: `list-group-item list-group-item-action d-flex align-items-center ${index === 0 ? 'active bg-light text-dark' : ''}`,
            id: item.id,
            "data-target": item.target,
            "aria-controls": item.target,
            "aria-selected": index === 0 ? "true" : "false"
        });
        
        navItem.append(
            $("<i>", {class: `${item.icon} me-3`}),
            $("<span>", {text: item.text})
        );
        
        navItem.on("click", function() {
            // Actualizar estado activo
            navList.find(".list-group-item").removeClass("active bg-light text-dark").attr("aria-selected", "false");
            $(this).addClass("active bg-light text-dark").attr("aria-selected", "true");
            
            // Mostrar sección correspondiente
            $("#main-content").find(".content-section").addClass("d-none");
            $(`#${item.target}`).removeClass("d-none");
            
            // Scroll suave a la sección
            $(`#${item.target}`)[0].scrollIntoView({behavior: 'smooth', block: 'start'});
        });
        
        navList.append(navItem);
    });

    sidebarBody.append(navList);
    sidebarCard.append(sidebarHeader, sidebarBody);
    sidebarCol.append(sidebarCard);

    // === CONTENIDO PRINCIPAL ===
    const contentCol = $("<div>", {class: "col-lg-9 col-md-8"});
    const mainContent = $("<div>", {id: "main-content"});

    // === SECCIÓN 1: MEDICIÓN DE IMPACTOS ===
    const seccionMedicion = $("<div>", {
        id: "section-medicion",
        class: "content-section"
    });

    const medicionHeader = $("<div>", {class: "d-flex justify-content-between align-items-center mb-4 p-3 bg-light rounded-3 border-start border-5 border-primary"});
    medicionHeader.append(
        $("<h2>", {class: "h3 mb-0"}).append(
            $("<i>", {class: "ti ti-chart-bar me-2"}),
            $("<span>", {text: "Medición de Impactos"})
        ),
        $("<div>", {class: "text-muted small"}).append(
            $("<span>", {text: `Período: ${data.fechas.inicioSelected} - ${data.fechas.finSelected}`})
        )
    );

    seccionMedicion.append(medicionHeader);

    // Accordion para cada tipo de impacto
    const impactosAccordion = $("<div>", {class: "accordion", id: "impactosAccordion"});

    // --- INICIO: Ocultar temporalmente el indicador de Calidad de Vida ---
    // Se filtra el array de impactos para mostrar únicamente "Estabilidad económica".
    // Para volver a mostrar el indicador de "Calidad de Vida" (si el backend lo proporciona),
    // simplemente elimine la siguiente línea de filtro y use "data.impactos" directamente en el forEach.
    const impactosVisibles = data.impactos.filter(p => p.nombre === 'Estabilidad económica');
    // --- FIN: Ocultar temporalmente el indicador de Calidad de Vida ---

    impactosVisibles.forEach((impacto, index) => {
        const accordionItem = $("<div>", {class: "accordion-item border-0 shadow-sm mb-3 border-start border-5 border-info"});
        
        // Header del accordion
        const accordionHeader = $("<h2>", {class: "accordion-header", id: `heading-${index}`});
        const accordionButton = $("<button>", {
            class: `accordion-button ${index === 0 ? '' : 'collapsed'}`,
            type: "button",
            "data-bs-toggle": "collapse",
            "data-bs-target": `#collapse-${index}`,
            "aria-expanded": index === 0 ? "true" : "false",
            "aria-controls": `collapse-${index}`
        });
        
        accordionButton.append(
            $("<div>", {class: "d-flex align-items-center w-100"}).append(
                $("<div>", {class: "me-3"}).append(
                    $("<span>", {class: "badge bg-info text-white fs-6", text: index + 1})
                ),
                $("<div>", {class: "flex-grow-1"}).append(
                    $("<h5>", {class: "mb-1", text: impacto.nombre}),
                    $("<small>", {class: "text-muted", text: "Ver detalles y cálculos"})
                )
            )
        );
        
        accordionHeader.append(accordionButton);

        // Contenido del accordion
        const accordionCollapse = $("<div>", {
            id: `collapse-${index}`,
            class: `accordion-collapse collapse ${index === 0 ? 'show' : ''}`,
            "aria-labelledby": `heading-${index}`,
            "data-bs-parent": "#impactosAccordion"
        });

        const accordionBody = $("<div>", {class: "accordion-body p-4"});

        // Resumen del impacto en cards
        const impactSummary = $("<div>", {class: "row mb-4"});
        let totalImpacto = 0;
        impacto.data.forEach(seccion => {
            totalImpacto += parseFloat(seccion.contribucionImpacto);
        });

        const summaryCard = $("<div>", {class: "col-12 mb-3"});
        const summaryAlert = $("<div>", {
            class: `alert ${totalImpacto >= 70 ? 'alert-success border-success' : totalImpacto >= 40 ? 'alert-warning border-warning' : 'alert-danger border-danger'} border-start border-5`,
            role: "alert"
        });
        
        summaryAlert.append(
            $("<div>", {class: "d-flex align-items-center"}).append(
                $("<div>", {class: "me-3"}).append(
                    $("<i>", {class: `ti ${totalImpacto >= 70 ? 'ti-check text-success' : totalImpacto >= 40 ? 'ti-alert-triangle text-warning' : 'ti-x text-danger'} fs-2`})
                ),
                $("<div>").append(
                    $("<h5>", {class: "alert-heading mb-1", text: "Impacto Total"}),
                    $("<h3>", {class: "mb-0", text: `${totalImpacto.toFixed(2)}%`})
                )
            )
        );
        
        summaryCard.append(summaryAlert);
        impactSummary.append(summaryCard);

        // Tabla de cálculos ponderados
        const tableContainer = $("<div>", {class: "table-responsive mb-4"});
        const table = $("<table>", {class: "table table-hover"});
        
        const tableHeader = $("<thead>", {class: "table-light"});
        tableHeader.append(
            $("<tr>").append(
                $("<th>", {scope: "col", text: "Sección"}),
                $("<th>", {scope: "col", text: "Obtenido", class: "text-center"}),
                $("<th>", {scope: "col", text: "Peso", class: "text-center"}),
                $("<th>", {scope: "col", text: "Contribución", class: "text-center"})
            )
        );

        const tableBody = $("<tbody>");
        impacto.data.forEach(seccion => {
            const row = $("<tr>");
            row.append(
                $("<td>").append(
                    $("<div>", {class: "d-flex align-items-center"}).append(
                        $("<i>", {class: "ti ti-clipboard-data me-2"}),
                        $("<span>", {text: seccion.titulo})
                    )
                ),
                $("<td>", {class: "text-center"}).append(
                    $("<span>", {class: "badge bg-secondary", text: `${seccion.obtenido}%`})
                ),
                $("<td>", {class: "text-center"}).append(
                    $("<span>", {class: "badge bg-dark", text: `${seccion.peso}%`})
                ),
                $("<td>", {class: "text-center"}).append(
                    $("<span>", {
                        class: `badge ${parseFloat(seccion.contribucionImpacto) >= 15 ? 'bg-success' : parseFloat(seccion.contribucionImpacto) >= 10 ? 'bg-warning text-dark' : 'bg-danger'}`,
                        text: `${seccion.contribucionImpacto}%`
                    })
                )
            );
            tableBody.append(row);
        });

        // Fila de total
        const totalRow = $("<tr>", {class: "table-active fw-bold"});
        totalRow.append(
            $("<td>", {text: "Total", colspan: 3}),
            $("<td>", {class: "text-center"}).append(
                $("<span>", {class: "badge bg-primary fs-6", text: `${totalImpacto.toFixed(2)}%`})
            )
        );
        tableBody.append(totalRow);

        table.append(tableHeader, tableBody);
        tableContainer.append(table);

        // Narrativa en card separada
        const narrativaCard = $("<div>", {class: "card border-0 bg-light shadow-sm mb-4"});
        const narrativaHeader = $("<div>", {class: "card-header bg-transparent border-0 border-bottom border-2 border-info"});
        narrativaHeader.append(
            $("<h6>", {class: "card-title mb-0"}).append(
                $("<i>", {class: "ti ti-file-text me-2"}),
                $("<span>", {text: "Narrativa"})
            )
        );
        
        const narrativaBody = $("<div>", {class: "card-body"});
        narrativaBody.append($("<div>", {class: "text-muted", html: impacto.narrativa}));
        narrativaCard.append(narrativaHeader, narrativaBody);

        // Accordion anidado para variaciones por sección
        const variacionesAccordion = $("<div>", {class: "accordion accordion-flush", id: `variaciones-${index}`});
        
        impacto.data.forEach((seccion, secIndex) => {
            const varItem = $("<div>", {class: "accordion-item"});
            const varHeader = $("<h2>", {class: "accordion-header", id: `var-heading-${index}-${secIndex}`});
            const varButton = $("<button>", {
                class: "accordion-button collapsed",
                type: "button",
                "data-bs-toggle": "collapse",
                "data-bs-target": `#var-collapse-${index}-${secIndex}`,
                "aria-expanded": "false",
                "aria-controls": `var-collapse-${index}-${secIndex}`,
                text: `Detalles: ${seccion.titulo}`
            });

            const varCollapse = $("<div>", {
                id: `var-collapse-${index}-${secIndex}`,
                class: "accordion-collapse collapse",
                "aria-labelledby": `var-heading-${index}-${secIndex}`,
                "data-bs-parent": `#variaciones-${index}`
            });

            const varBody = $("<div>", {class: "accordion-body"});
            const varTable = $("<div>", {class: "table-responsive"});
            const detailTable = $("<table>", {class: "table table-sm"});
            
            const detailHeader = $("<thead>", {class: "table-light"});
            detailHeader.append(
                $("<tr>").append(
                    $("<th>", {text: "Pregunta"}),
                    $("<th>", {text: "Inicial", class: "text-center"}),
                    $("<th>", {text: "Final", class: "text-center"}),
                    $("<th>", {text: "Variación", class: "text-center"})
                )
            );

            const detailBody = $("<tbody>");
            Object.entries(seccion.mediciones).forEach(([pregunta, medicion]) => {
                const variacion = medicion.variacionPorcentual.toFixed(2);
                const row = $("<tr>");
                row.append(
                    $("<td>", {text: pregunta}),
                    $("<td>", {class: "text-center", text: medicion.inicial}),
                    $("<td>", {class: "text-center", text: medicion.final}),
                    $("<td>", {class: "text-center"}).append(
                        $("<span>", {
                            class: `badge ${parseFloat(variacion) > 0 ? 'bg-success' : parseFloat(variacion) < 0 ? 'bg-danger' : 'bg-secondary'}`,
                            text: `${variacion}%`
                        })
                    )
                );
                detailBody.append(row);
            });

            detailTable.append(detailHeader, detailBody);
            varTable.append(detailTable);
            varBody.append(varTable);
            varHeader.append(varButton);
            varItem.append(varHeader, varCollapse.append(varBody));
            variacionesAccordion.append(varItem);
        });

        accordionBody.append(impactSummary, tableContainer, narrativaCard, variacionesAccordion);
        accordionCollapse.append(accordionBody);
        accordionItem.append(accordionHeader, accordionCollapse);
        impactosAccordion.append(accordionItem);
    });

    seccionMedicion.append(impactosAccordion);

    // === SECCIÓN 2: CONFIGURACIÓN ===
    const seccionConfiguracion = $("<div>", {
        id: "section-configuracion",
        class: "content-section d-none"
    });

    const configHeader = $("<div>", {class: "d-flex justify-content-between align-items-center mb-4 p-3 bg-light rounded-3 border-start border-5 border-info"});
    configHeader.append(
        $("<h2>", {class: "h3 mb-0"}).append(
            $("<i>", {class: "ti ti-settings me-2"}),
            $("<span>", {text: "Configuración de Parámetros"})
        )
    );
    seccionConfiguracion.append(configHeader);

    // Card de configuración temporal
    const configCard = $("<div>", {class: "card shadow-sm mb-4"});
    const configCardHeader = $("<div>", {class: "card-header bg-light border-bottom border-2 border-info"});
    configCardHeader.append(
        $("<h5>", {class: "card-title mb-0"}).append(
            $("<i>", {class: "ti ti-calendar me-2"}),
            $("<span>", {text: "Configuración Temporal"})
        )
    );

    const configCardBody = $("<div>", {class: "card-body"});
    const configRow = $("<div>", {class: "row g-3"});

    // Año de inicio
    const inicioCol = $("<div>", {class: "col-md-6"});
    inicioCol.append(
        $("<label>", {for: "añoInicio", class: "form-label fw-semibold", text: "Año de Inicio"}),
        $("<select>", {class: "form-select", id: "añoInicio", "aria-describedby": "inicioHelp"}).append(
            ...Array(data.fechas.fin - data.fechas.inicio + 1).keys().map(yearOffset => {
                const yearValue = data.fechas.inicio + yearOffset;
                return $("<option>", {value: yearValue, text: yearValue});
            })
        ),
        $("<div>", {id: "inicioHelp", class: "form-text", text: "Seleccione el año de inicio del análisis"})
    );

    // Año final
    const finalCol = $("<div>", {class: "col-md-6"});
    finalCol.append(
        $("<label>", {for: "añoFinal", class: "form-label fw-semibold", text: "Año Final"}),
        $("<select>", {class: "form-select", id: "añoFinal", "aria-describedby": "finalHelp"}).append(
            ...Array(data.fechas.fin - data.fechas.inicio + 1).keys().map(yearOffset => {
                const yearValue = data.fechas.inicio + yearOffset;
                return $("<option>", {value: yearValue, text: yearValue});
            })
        ),
        $("<div>", {id: "finalHelp", class: "form-text", text: "Seleccione el año final del análisis"})
    );

    configRow.append(inicioCol, finalCol);
    configCardBody.append(configRow);
    configCard.append(configCardHeader, configCardBody);

    // Card de gestión de emprendedores
    const emprendedoresCard = $("<div>", {class: "card shadow-sm"});
    const emprendedoresHeader = $("<div>", {class: "card-header bg-light border-bottom border-2 border-primary d-flex justify-content-between align-items-center"});
    emprendedoresHeader.append(
        $("<h5>", {class: "card-title mb-0"}).append(
            $("<i>", {class: "ti ti-users me-2"}),
            $("<span>", {text: "Gestión de Emprendedores"})
        ),
        $("<span>", {class: "badge bg-dark text-white", id: "emprendedores-count", text: `${emprendedores.length} total`})
    );

    const emprendedoresBody = $("<div>", {class: "card-body"});

    // Filtros
    const filtrosRow = $("<div>", {class: "row g-3 mb-3"});
    const etapaCol = $("<div>", {class: "col-md-6"});
    
    etapaCol.append(
        $("<label>", {for: "etapaSelector", class: "form-label fw-semibold", text: "Filtrar por etapa"}),
        $("<select>", {
            class: "form-select",
            id: "etapaSelector",
            "aria-describedby": "etapaHelp",
            change: function() {
                const selectedEtapa = $(this).val();
                filtrarEmprendedores(selectedEtapa, emprendedores);
                actualizarContadorSeleccionados();
            }
        }).append(
            $("<option>", {value: "", text: "Todas las etapas"}),
            [...new Set(emprendedores.map(emp => emp.etapa))].map(etapa => 
                $("<option>", {value: etapa, text: etapa})
            )
        ),
        $("<div>", {id: "etapaHelp", class: "form-text", text: "Filtre emprendedores por su etapa actual"})
    );

    const accionesCol = $("<div>", {class: "col-md-6 d-flex align-items-end"});
    const btnGroup = $("<div>", {class: "btn-group w-100", role: "group"});
    btnGroup.append(
        $("<button>", {
            class: "btn btn-outline-primary",
            type: "button",
            id: "select-all-btn",
            text: "Seleccionar Todos"
        }),
        $("<button>", {
            class: "btn btn-outline-secondary",
            type: "button",
            id: "deselect-all-btn",
            text: "Deseleccionar Todos"
        })
    );
    accionesCol.append(btnGroup);

    filtrosRow.append(etapaCol, accionesCol);

    // Tabla de emprendedores
    const tablaContainer = $("<div>", {class: "table-responsive"});
    const tabla = $("<table>", {class: "table table-hover", id: "tablaEmprendedores"});
    
    const tablaHead = $("<thead>", {class: "table-light"});
    tablaHead.append(
        $("<tr>").append(
            $("<th>", {scope: "col", class: "text-center"}).append(
                $("<div>", {class: "form-check"}).append(
                    $("<input>", {
                        class: "form-check-input",
                        type: "checkbox",
                        id: "select-all",
                        "aria-label": "Seleccionar todos los emprendedores"
                    })
                )
            ),
            $("<th>", {scope: "col", text: "Nombre Completo"}),
            $("<th>", {scope: "col", text: "Correo Electrónico"}),
            $("<th>", {scope: "col", text: "Etapa", class: "text-center"})
        )
    );

    const tablaBody = $("<tbody>");
    emprendedores.forEach(emprendedor => {
        const row = $("<tr>");
        row.append(
            $("<td>", {class: "text-center"}).append(
                $("<div>", {class: "form-check"}).append(
                    $("<input>", {
                        checked: emprendedor.enLineaBase,
                        class: "form-check-input emprendedor-checkbox",
                        type: "checkbox",
                        value: emprendedor.idLineaBase,
                        id: `checkbox-${emprendedor.idUsuario}`,
                        "aria-label": `Seleccionar ${emprendedor.nombre} ${emprendedor.apellidos}`
                    })
                )
            ),
            $("<td>").append(
                $("<div>", {class: "d-flex align-items-center"}).append(
                    $("<div>", {class: "me-3"}).append(
                        $("<div>", {
                            class: "bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center border border-2 border-light",
                            style: "width: 40px; height: 40px; font-weight: bold;",
                            text: emprendedor.nombre.charAt(0) + emprendedor.apellidos.charAt(0)
                        })
                    ),
                    $("<div>").append(
                        $("<div>", {class: "fw-semibold", text: `${emprendedor.nombre} ${emprendedor.apellidos}`})
                    )
                )
            ),
            $("<td>", {text: emprendedor.correo}),
            $("<td>", {class: "text-center"}).append(
                $("<span>", {
                    class: "badge bg-light text-dark border border-secondary",
                    text: emprendedor.etapa
                })
            )
        );
        tablaBody.append(row);
    });

    tabla.append(tablaHead, tablaBody);
    tablaContainer.append(tabla);

    // Botón de aplicar filtro
    const aplicarContainer = $("<div>", {class: "d-flex justify-content-between align-items-center mt-3"});
    aplicarContainer.append(
        $("<div>").append(
            $("<span>", {class: "text-muted", id: "seleccionados-info", text: "0 emprendedores seleccionados"})
        ),
        $("<button>", {
            class: "btn btn-primary",
            type: "button",
            id: "apply-filter",
            click: aplicarFiltro
        }).append(
            $("<i>", {class: "ti ti-check me-2"}),
            $("<span>", {text: "Aplicar Configuración"})
        )
    );

    emprendedoresBody.append(filtrosRow, tablaContainer, aplicarContainer);
    emprendedoresCard.append(emprendedoresHeader, emprendedoresBody);
    
    seccionConfiguracion.append(configCard, emprendedoresCard);

    // === SECCIÓN 3: VISTA GENERAL ===
    const seccionVistaGeneral = $("<div>", {
        id: "section-vista-general",
        class: "content-section d-none"
    });

    const vistaHeader = $("<div>", {class: "d-flex justify-content-between align-items-center mb-4 p-3 bg-light rounded-3 border-start border-5 border-success"});
    vistaHeader.append(
        $("<h2>", {class: "h3 mb-0"}).append(
            $("<i>", {class: "ti ti-file-analytics me-2"}),
            $("<span>", {text: "Vista General"})
        )
    );
    seccionVistaGeneral.append(vistaHeader);

    const vistaCard = $("<div>", {class: "card shadow-sm"});
    const vistaCardHeader = $("<div>", {class: "card-header bg-light border-bottom border-2 border-success"});
    vistaCardHeader.append(
        $("<h5>", {class: "card-title mb-0"}).append(
            $("<i>", {class: "ti ti-download me-2"}),
            $("<span>", {text: "Exportación de Datos"})
        )
    );

    const vistaCardBody = $("<div>", {class: "card-body text-center"});
    
    const exportDescription = $("<p>", {
        class: "text-muted mb-4",
        text: "Exporte los datos de la línea base en formato Excel para análisis externos."
    });

    const btnGroupExport = $("<div>", {class: "btn-group", role: "group", "aria-label": "Opciones de exportación"});
    btnGroupExport.append(
        $("<button>", {
            type: "button",
            class: "btn btn-outline-info btn-lg",
            id: "btnInicial",
            "data-tipo": "inicial",
            click: recuperarVistaImpacto
        }).append(
            $("<i>", {class: "ti ti-download me-2"}),
            $("<span>", {text: "Exportar Línea Base Inicial"})
        ),
        $("<button>", {
            type: "button",
            class: "btn btn-outline-success btn-lg",
            id: "btnFinal",
            "data-tipo": "final",
            click: recuperarVistaImpacto
        }).append(
            $("<i>", {class: "ti ti-upload me-2"}),
            $("<span>", {text: "Exportar Línea Base Final"})
        )
    );

    // Spinner de carga
    const loadingContainer = $("<div>", {
        id: "loadingSpinnerContainer",
        class: "mt-4",
        style: "display: none;"
    });
    
    const loadingAlert = $("<div>", {class: "alert alert-info border-info border-2 d-flex align-items-center", role: "alert"});
    loadingAlert.append(
        $("<div>", {
            class: "spinner-border spinner-border-sm me-3",
            role: "status",
            "aria-hidden": "true"
        }),
        $("<div>", {text: "Preparando exportación..."})
    );
    
    loadingContainer.append(loadingAlert);

    vistaCardBody.append(exportDescription, btnGroupExport, loadingContainer);
    vistaCard.append(vistaCardHeader, vistaCardBody);
    seccionVistaGeneral.append(vistaCard);

    // === ENSAMBLADO FINAL ===
    mainContent.append(seccionMedicion, seccionConfiguracion, seccionVistaGeneral);
    contentCol.append(mainContent);
    row.append(sidebarCol, contentCol);
    mainContainer.append(row);
    $("#impacto-container").append(mainContainer);

    // Configurar valores iniciales
    $('#añoInicio').val(data.fechas.inicioSelected);
    $('#añoFinal').val(data.fechas.finSelected);

    // === EVENTOS Y FUNCIONALIDAD ===
    
    // Función para actualizar contador de seleccionados
    function actualizarContadorSeleccionados() {
        const seleccionados = $('.emprendedor-checkbox:checked').length;
        const total = emprendedores.length;
        $("#seleccionados-info").text(`${seleccionados} de ${total} emprendedores seleccionados`);
        $("#emprendedores-count").text(`${seleccionados}/${total} seleccionados`);
    }

    // Eventos de selección
    $("#select-all").on("change", function() {
        const isChecked = $(this).prop("checked");
        const table = $('#tablaEmprendedores').DataTable();
        table.rows().every(function() {
            $(this.node()).find('.emprendedor-checkbox').prop('checked', isChecked);
        });
        $("#etapaSelector").val("");
        actualizarContadorSeleccionados();
    });

    $("#select-all-btn").on("click", function() {
        $('.emprendedor-checkbox').prop('checked', true);
        $("#select-all").prop('checked', true);
        $("#etapaSelector").val("");
        actualizarContadorSeleccionados();
    });

    $("#deselect-all-btn").on("click", function() {
        $('.emprendedor-checkbox').prop('checked', false);
        $("#select-all").prop('checked', false);
        actualizarContadorSeleccionados();
    });

    // Event listener para checkboxes individuales
    $(document).on('change', '.emprendedor-checkbox', function() {
        actualizarContadorSeleccionados();
        
        // Actualizar estado del checkbox "seleccionar todos"
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

    // Inicializar contador
    actualizarContadorSeleccionados();
    
    // Inicializar DataTable después de que la sección esté visible
    // Para resolver el bug de renderización cuando el elemento no está visible
    $(document).on('shown.bs.tab shown.bs.collapse', function (e) {
        const table = $('#tablaEmprendedores');
        if (table.length && $.fn.DataTable.isDataTable(table)) {
            table.DataTable().columns.adjust().draw();
        }
    });
    
    // Inicializar DataTable cuando se hace clic en la sección de configuración
    $(document).on('click', '#nav-configuracion', function() {
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
    
    // Mostrar loading en el botón
    const btnAplicar = $("#apply-filter");
    const btnText = btnAplicar.html();
    btnAplicar.prop('disabled', true).html(
        '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Aplicando...'
    );
    
    table.rows().every(function() {
        let checkbox = $(this.node()).find('.emprendedor-checkbox');
        if (checkbox.prop('checked')) {
            seleccionados.push(parseInt(checkbox.val()));
        }
    });
    
    crearPeticion(urlAPI, {
        case: "actualizarFiltroEmprendedores", 
        data: $.param({seleccionados: seleccionados})
    }, (res) => {
        if (!res.es_valor_error) {
            // Mostrar mensaje de éxito
            const alertSuccess = $('<div class="alert alert-success border-success border-2 alert-dismissible fade show" role="alert">');
            alertSuccess.append(
                '<i class="ti ti-check text-success me-2"></i>',
                '<strong>¡Éxito!</strong> La configuración se ha aplicado correctamente.',
                '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
            );
            
            $("#section-configuracion").prepend(alertSuccess);
            
            // Auto-hide después de 5 segundos
            setTimeout(() => {
                alertSuccess.alert('close');
            }, 5000);
            
            refresh();
        } else {
            // Mostrar mensaje de error
            const alertError = $('<div class="alert alert-danger border-danger border-2 alert-dismissible fade show" role="alert">');
            alertError.append(
                '<i class="ti ti-x text-danger me-2"></i>',
                '<strong>Error:</strong> No se pudo aplicar la configuración. Intente nuevamente.',
                '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
            );
            
            $("#section-configuracion").prepend(alertError);
            
            setTimeout(() => {
                alertError.alert('close');
            }, 5000);
        }
        
        // Restaurar botón
        btnAplicar.prop('disabled', false).html(btnText);
    });
}

function filtrarEmprendedores(etapaSeleccionada) {
    const table = $('#tablaEmprendedores').DataTable();
    
    if (etapaSeleccionada === "") {
        // Si no hay etapa seleccionada, mostrar todos
        table.search('').draw();
        return;
    }
    
    table.rows({ search: 'applied' }).every(function() { 
        const rowNode = $(this.node());
        const checkbox = rowNode.find('.emprendedor-checkbox');
        const etapaCell = rowNode.find('td:nth-child(4) .badge');
        const etapaText = etapaCell.text().trim();
        
        checkbox.prop('checked', etapaText === etapaSeleccionada);
    });
    
    // Filtrar la tabla por la etapa seleccionada
    table.column(3).search(etapaSeleccionada).draw();
    
    $("#select-all").prop("checked", false).prop('indeterminate', false);
}

function completarParametrosConfiguracion() {
    // Validar que el año final no sea menor que el año de inicio
    $('#añoInicio, #añoFinal').change(function() {
        let añoInicio = parseInt($('#añoInicio').val());
        let añoFinal = parseInt($('#añoFinal').val());
        
        if (añoInicio > añoFinal) {
            // Mostrar mensaje de advertencia con mejor UX
            const alertWarning = $('<div class="alert alert-warning border-warning border-2 alert-dismissible fade show" role="alert">');
            alertWarning.append(
                '<i class="ti ti-alert-triangle text-warning me-2"></i>',
                '<strong>Advertencia:</strong> El año de inicio no puede ser mayor que el año final.',
                '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
            );
            
            $("#section-configuracion").prepend(alertWarning);
            
            // Corregir automáticamente
            if ($(this).attr('id') === 'añoInicio') {
                $('#añoInicio').val(añoFinal);
            } else {
                $('#añoFinal').val(añoInicio);
            }
            
            setTimeout(() => {
                alertWarning.alert('close');
            }, 5000);
            
            return;
        }
        
        // Mostrar loading visual
        const configCard = $("#section-configuracion .card:first");
        const overlay = $('<div class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-light bg-opacity-75" style="z-index: 10;">');
        overlay.append(
            '<div class="spinner-border text-primary" role="status">',
            '<span class="visually-hidden">Actualizando configuración...</span>',
            '</div>'
        );
        
        configCard.addClass('position-relative').append(overlay);
        
        let data = {anioInicio: añoInicio, anioFin: añoFinal};
        crearPeticion(urlAPI, {
            case: "actualizarConfiguracionAnios", 
            data: $.param(data)
        }, (res) => {
            overlay.remove();
            configCard.removeClass('position-relative');
            
            if (!res.es_valor_error) {
                // Mostrar mensaje de éxito
                const alertSuccess = $('<div class="alert alert-success border-success border-2 alert-dismissible fade show" role="alert">');
                alertSuccess.append(
                    '<i class="ti ti-check text-success me-2"></i>',
                    '<strong>¡Actualizado!</strong> La configuración temporal se ha guardado correctamente.',
                    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
                );
                
                $("#section-configuracion").prepend(alertSuccess);
                
                setTimeout(() => {
                    alertSuccess.alert('close');
                }, 3000);
                
                refresh();
            } else {
                // Mostrar mensaje de error
                const alertError = $('<div class="alert alert-danger border-danger border-2 alert-dismissible fade show" role="alert">');
                alertError.append(
                    '<i class="ti ti-x text-danger me-2"></i>',
                    '<strong>Error:</strong> No se pudo actualizar la configuración.',
                    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
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
    
    // Deshabilitar botón y mostrar loading
    button.prop("disabled", true).html(
        '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>' +
        `Exportando ${tipo}...`
    );
    
    // Mostrar spinner global
    $("#loadingSpinnerContainer").show();
    
    crearPeticion(urlAPI, {
        case: 'recuperarVistaGeneral',
        data: $.param({tipo: tipo})
    }, (registros) => {
        // Ocultar spinner
        $("#loadingSpinnerContainer").hide();
        
        if (registros.length !== 0) {
            // Crear tabla temporal para DataTables
            const tempTable = $('<table>').DataTable({
                data: registros,
                columns: Object.keys(registros[0]).map(key => ({
                    title: key,
                    data: key
                })),
                dom: 'Bfrtip',
                buttons: ['excel']
            });
            
            // Trigger download
            tempTable.button('.buttons-excel').trigger();
            
            // Destroy tabla temporal
            tempTable.destroy();
            
            // Mostrar mensaje de éxito
            const alertSuccess = $('<div class="alert alert-success border-success border-2 alert-dismissible fade show" role="alert">');
            alertSuccess.append(
                '<i class="ti ti-download text-success me-2"></i>',
                `<strong>¡Descarga iniciada!</strong> Los datos de la línea base ${tipo} se están descargando.`,
                '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
            );
            
            $("#section-vista-general").prepend(alertSuccess);
            
            setTimeout(() => {
                alertSuccess.alert('close');
            }, 5000);
            
        } else {
            // Mostrar mensaje informativo
            const alertInfo = $('<div class="alert alert-info border-info border-2 alert-dismissible fade show" role="alert">');
            alertInfo.append(
                '<i class="ti ti-info-circle me-2"></i>',
                '<strong>Sin datos:</strong> No hay información disponible para exportar en este momento.',
                '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
            );
            
            $("#section-vista-general").prepend(alertInfo);
            
            setTimeout(() => {
                alertInfo.alert('close');
            }, 5000);
        }
        
        // Restaurar botón
        button.prop("disabled", false).html(originalContent);
    });
}