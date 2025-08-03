const urlAPI = "api/MedicionImpactosAPI.php";
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

    // Crear las tabs principales dinámicamente según los datos
    const mainTabs = $("<ul>", {class: "nav nav-tabs", id: "mainTabs", role: "tablist"});
    const mainTabsContent = $("<div>", {class: "tab-content mt-3", id: "mainTabsContent"});

    // Tab MEDICION
    mainTabs.append(
        $("<li>", {class: "nav-item", role: "presentation"}).append(
            $("<button>", {
                class: "nav-link active", id: "impactos-tab", "data-bs-toggle": "tab",
                "data-bs-target": "#impactos", type: "button", role: "tab",
                "aria-controls": "impactos", "aria-selected": "true", text: "Medición"
            })
        )
    );

    // Tab CONFIGURACIÓN DE PARÁMETROS
    mainTabs.append(
        $("<li>", {class: "nav-item", role: "presentation"}).append(
            $("<button>", {
                class: "nav-link", id: "configuracion-tab", "data-bs-toggle": "tab",
                "data-bs-target": "#configuracion", type: "button", role: "tab",
                "aria-controls": "configuracion", "aria-selected": "false", text: "Configuración de parámetros"
           }))
    );
    
    // Tab VISTA GENERAL
    mainTabs.append(
        $("<li>", {class: "nav-item", role: "presentation"}).append(
            $("<button>", {
                class: "nav-link", id: "vista-general-tab", "data-bs-toggle": "tab",
                "data-bs-target": "#vista-general", type: "button", role: "tab",
                "aria-controls": "vista-general", "aria-selected": "false", text: "Vista general"
           }))
    );

    // Crear el contenido de IMPACTOS
    const impactosTabContent = $("<div>", {
        class: "tab-pane fade show active", id: "impactos", role: "tabpanel", "aria-labelledby": "impactos-tab"
    });

    // Crear subtabs para los impactos
    const impactoSubTabs = $("<ul>", {class: "nav nav-tabs", role: "tablist"});
    const impactoSubTabsContent = $("<div>", {class: "tab-content mt-3"});

    data.impactos.forEach((impacto, index) => {
        const subTabId = `impacto-${index}`;

        // Subtab navigation
        impactoSubTabs.append(
                $("<li>", {class: "nav-item", role: "presentation"}).append(
                $("<button>", {
                    class: `nav-link ${index === 0 ? "active" : ""}`,
                    id: `${subTabId}-tab`, "data-bs-toggle": "tab", "data-bs-target": `#${subTabId}`,
                    type: "button", role: "tab", "aria-controls": subTabId, "aria-selected": index === 0 ? "true" : "false",
                    text: impacto.nombre
                })
                )
                );

        // Subtab content
        const subTabContent = $("<div>", {
            class: `tab-pane fade ${index === 0 ? "show active" : ""}`,
            id: subTabId, role: "tabpanel", "aria-labelledby": `${subTabId}-tab`
        });

        // Crear tabla de ponderaciones
        const table = $("<table>", {class: "table table-bordered"}).append(
                $("<thead>").append(
                $("<tr>").append(
                $("<th>", {text: "Sección"}), $("<th>", {text: "Obtenido"}),
                $("<th>", {text: "Peso"}), $("<th>", {text: "Contribución al Impacto"})
                )
                )
                );

        // Añadir las filas a la tabla
        const tbody = $("<tbody>");
        let totalImpacto = 0;  // Variable para acumular la suma de la contribución al impacto
        impacto.data.forEach((seccion, i) => {
            const contribucionImpacto = seccion.contribucionImpacto;
            totalImpacto += parseFloat(contribucionImpacto);
            tbody.append($("<tr>").append(
                    $("<td>", {text: seccion.titulo}),
                    $("<td>", {text: `${seccion.obtenido}%`}),
                    $("<td>").append($("<span>", {text: `${seccion.peso}%`})),
                    $("<td>", {text: `${contribucionImpacto}%`})
                    ));
        });
        tbody.append($("<tr>").append(
                $("<td>", {text: "Total", colspan: 3}),
                $("<td>", {text: `${totalImpacto.toFixed(2)}%`})
                ));
        table.append(tbody);
        subTabContent.append($("<h5>", {text: "Cálculos ponderados para obtener el impacto."}), table);

        // Acordeón para la narrativa
        const accordion = $("<div>", {class: "accordion", id: `${subTabId}-accordion`});
        const accordionItem = $("<div>", {class: "accordion-item"});
        const accordionHeader = $("<h2>", {class: "accordion-header", id: `${subTabId}-heading`});
        const accordionButton = $("<button>", {
            class: "accordion-button collapsed", type: "button", "data-bs-toggle": "collapse",
            "data-bs-target": `#${subTabId}-collapse`, "aria-expanded": "false", "aria-controls": `${subTabId}-collapse`,
            text: "Narrativa"
        });
        const accordionCollapse = $("<div>", {
            id: `${subTabId}-collapse`, class: "accordion-collapse collapse", "aria-labelledby": `${subTabId}-heading`,
            "data-bs-parent": `#${subTabId}-accordion`
        });
        const accordionBody = $("<div>", {class: "accordion-body", html: impacto.narrativa});
        accordionItem.append(accordionHeader.append(accordionButton), accordionCollapse.append(accordionBody));
        accordion.append(accordionItem);
        subTabContent.append(accordion);

        // Acordeón de Variaciones y Cálculo de Impacto
        const accordionVariaciones = $("<div>", {class: "accordion accordion-flush", id: `${subTabId}-variaciones-accordion`});

        impacto.data.forEach((seccion) => {
            // Acordeón item para cada sección del cuestionario
            const accordionItemVariaciones = $("<div>", {class: "accordion-item"});
            const accordionHeaderVariaciones = $("<h2>", {class: "accordion-header", id: `${subTabId}-${seccion.titulo.replace(/\s+/g, '-').toLowerCase()}-heading`});
            const accordionButtonVariaciones = $("<button>", {
                class: "accordion-button collapsed", type: "button", "data-bs-toggle": "collapse",
                "data-bs-target": `#${subTabId}-${seccion.titulo.replace(/\s+/g, '-').toLowerCase()}-collapse`, "aria-expanded": "false",
                "aria-controls": `${subTabId}-${seccion.titulo.replace(/\s+/g, '-').toLowerCase()}-collapse`,
                text: seccion.titulo
            });

            const accordionCollapseVariaciones = $("<div>", {
                id: `${subTabId}-${seccion.titulo.replace(/\s+/g, '-').toLowerCase()}-collapse`, class: "accordion-collapse collapse",
                "aria-labelledby": `${subTabId}-${seccion.titulo.replace(/\s+/g, '-').toLowerCase()}-heading`,
                "data-bs-parent": `#${subTabId}-variaciones-accordion`
            });

            const accordionBodyVariaciones = $("<div>", {class: "accordion-body"});

            // Tabla de variaciones dentro del acordeón
            const table = $("<table>", {class: "table table-bordered"});
            const tableHead = $("<thead>").append(
                    $("<tr>").append(
                    $("<th>", {text: "Pregunta", class: "text-success fw-bold"}),
                    $("<th>", {text: "Inicial", class: "text-success fw-bold"}),
                    $("<th>", {text: "Final", class: "text-success fw-bold"}),
                    $("<th>", {text: "Variación Porcentual", class: "text-warning fw-bold"})
                    )
                    );


            const tbody = $("<tbody>");

            // Iterar sobre las preguntas en el cuestionario
            Object.entries(seccion.mediciones).forEach(([key, value]) => {
                const variacionPorcentual = value.variacionPorcentual.toFixed(2);
                tbody.append($("<tr>").append(
                        $("<td>", {text: key}),
                        $("<td>", {text: value.inicial}),
                        $("<td>", {text: value.final}),
                        $("<td>", {
                            text: `${variacionPorcentual} %`,
                            class: variacionPorcentual > 0 ? "text-success" : (variacionPorcentual < 0 ? "text-danger" : "text-primary")
                        })
                        ));
            });

            table.append(tableHead, tbody);
            accordionBodyVariaciones.append(table);
            // Agregar acordeón item
            accordionItemVariaciones.append(accordionHeaderVariaciones.append(accordionButtonVariaciones), accordionCollapseVariaciones.append(accordionBodyVariaciones));
            accordionVariaciones.append(accordionItemVariaciones);
        });

        // Agregar el acordeón de variaciones al subTabContent
        subTabContent.append(accordionVariaciones);
        impactoSubTabsContent.append(subTabContent);
    });
    impactosTabContent.append(impactoSubTabs, impactoSubTabsContent);
    mainTabsContent.append(impactosTabContent);

 // Crear el contenido de Configuración de Parámetros 
mainTabsContent.append(
    $("<div>", {
        class: "tab-pane fade", id: "configuracion", role: "tabpanel", "aria-labelledby": "configuracion-tab"
    }).append(
        // Card para los inputs de configuración
        $("<div>", {class: "card mb-4"}).append(
            $("<div>", {class: "card-header"}).append(
                $("<h5>", {text: "Ajuste de Parámetros"})
            ),
            $("<div>", {class: "card-body"}).append(
                // Año de Inicio
                $("<div>", {class: "mb-3"}).append(
                    $("<label>", {for: "añoInicio", class: "form-label", text: "Año de Inicio"}),
                    $("<select>", {class: "form-select", id: "añoInicio"}).append(
                        ...Array(data.fechas.fin - data.fechas.inicio + 1).keys().map(yearOffset => {
                            const yearValue = data.fechas.inicio + yearOffset;
                            return $("<option>", {value: yearValue, text: yearValue});
                        })
                    )
                ),
                // Año Final
                $("<div>", {class: "mb-3"}).append(
                    $("<label>", {for: "añoFinal", class: "form-label", text: "Año Final"}),
                    $("<select>", {class: "form-select", id: "añoFinal"}).append(
                        ...Array(data.fechas.fin - data.fechas.inicio + 1).keys().map(yearOffset => {
                            const yearValue = data.fechas.inicio + yearOffset;
                            return $("<option>", {value: yearValue, text: yearValue});
                        })
                    )
                )
            )
        ),

        // Card para la tabla de emprendedores 
        $("<div>", {class: "card"}).append(
            $("<div>", {class: "card-header"}).append(
                $("<h5>", {text: "Emprendedores filtrados"})
            ),
            $("<div>", {class: "card-body"}).append(
                // Filtro por Etapas
                $("<div>", {class: "mb-3"}).append(
                    $("<label>", {for: "etapaSelector", class: "form-label", text: "Filtrar por etapa"}),
                    $("<select>", {
                        class: "form-select", 
                        id: "etapaSelector", 
                        change: function() {
                            const selectedEtapa = $(this).val();
                            filtrarEmprendedores(selectedEtapa, emprendedores);
                        }
                    }).append(
                        $("<option>", {val:"", text: "Elige una opcion"}),
                        [...new Set(emprendedores.map(emprendedor => emprendedor.etapa))] // Genera opciones de etapas únicas
                            .map(etapa => $("<option>", {value: etapa, text: etapa}))
                    )
                ),
                // Contenedor div con clase "table-responsive"
                $("<div>", {class: "table-responsive"}).append(
                    $("<table>", {class: "table table-striped", id:"tablaEmprendedores"}).append(
                        $("<thead>").append(
                            $("<tr>").append(
                                $("<th>").append(
                                    $("<div>", {class: "form-check"}).append(
                                        $("<input>", {
                                            class: "form-check-input", 
                                            type: "checkbox", 
                                            id: "select-all"
                                        })
                                    )
                                ),
                                $("<th>", {text: "Nombre"}),
                                $("<th>", {text: "Correo electrónico"}),
                                $("<th>", {text: "Etapa"}),
                            )
                        ),
                        $("<tbody>").append(
                            emprendedores.map(emprendedor => 
                                $("<tr>").append(
                                    $("<td>").append(
                                        $("<div>", {class: "form-check"}).append(
                                            $("<input>", {
                                                checked: emprendedor.enLineaBase,
                                                class: "form-check-input emprendedor-checkbox", 
                                                type: "checkbox", 
                                                value: emprendedor.idLineaBase,
                                                id: `checkbox-${emprendedor.idUsuario}`
                                            })
                                        )
                                    ),
                                    $("<td>", {text: emprendedor.nombre + " " + emprendedor.apellidos}),
                                    $("<td>", {text: emprendedor.correo}),
                                    $("<td>", {text: emprendedor.etapa})
                                )
                            )
                        )
                    )
                ),
                $("<div>", {class: "mt-3 text-end"}).append($("<div>", {class: "btn-group", role: "group"}).append(
                        $("<button>", {
                            class: "btn btn-outline-primary",
                            type: "button",
                            id: "apply-filter",
                            text: "Aplicar filtro",
                            click: aplicarFiltro
                        })
                    )
                )
            )
        )
    )
);

mainTabsContent.append(
    $("<div>", {
        class: "tab-pane fade",
        id: "vista-general",
        role: "tabpanel",
        "aria-labelledby": "vista-general-tab"
    }).append(
        
            $("<div>", { class: "card-body" }).append(
               
                $("<div>", { class: "mb-3" }).append(
                    // Aseguramos que el label ocupe su propia línea
                    $("<label>", {
                        for: "lineaBaseSelector",
                        class: "form-label d-block"  // Asegura que el label esté en su propia línea
                    }).text("Consultar información de la línea base"),

                    // Grupo de botones "Inicial" y "Final" en un contenedor con márgenes
                    $("<div>", {
                        class: "btn-group",
                        role: "group",
                        "aria-label": "Selector de línea base"
                    }).append(
                        $("<button>", {
                            type: "button",
                            class: "btn btn-outline-primary",
                            id: "btnInicial",
                            "data-tipo": "inicial",
                            click: recuperarVistaImpacto
                        }).text("Inicial").prepend($("<i>", {class: "ti ti-download fs-4 me-2"})),
                        $("<button>", {
                            type: "button",
                            class: "btn btn-outline-primary",
                            id: "btnFinal",
                            "data-tipo": "final",
                            click: recuperarVistaImpacto
                        }).text("Final").prepend($("<i>", {class: "ti ti-download fs-4 me-2"}))
                    )
                ),
                // Añadir un contenedor para el spinner
                $("<div>", { 
                    id: "loadingSpinnerContainer",
                    class: "text-center",  // Centrado de todo el contenido
                    style: "display: none;"
                }).append(
                    $("<div>", { 
                        id: "loadingSpinner",
                        class: "spinner-border text-warning",
                        role: "status",
                        style: "display: inline-block;"
                    })
                )
            )
        
    )
);


    // Agregar las tabs principales y su contenido al contenedor
    $("#impacto-container").append(mainTabs, mainTabsContent);
    $('#añoInicio').val(data.fechas.inicioSelected);
    $('#añoFinal').val(data.fechas.finSelected);
    // Función para seleccionar o deseleccionar todos los registros
    $("#select-all").on("change", function () {
        const isChecked = $(this).prop("checked");
        const table = $('#tablaEmprendedores').DataTable();
        table.rows().every(function () {
            $(this.node()).find('.emprendedor-checkbox').prop('checked', isChecked);
        });
        $("#etapaSelector").val("");
    });
    crearDataTable("#tablaEmprendedores");
}

function aplicarFiltro() {
    const seleccionados = [];
    const table = $('#tablaEmprendedores').DataTable();
    table.rows().every(function () {
        let checkbox = $(this.node()).find('.emprendedor-checkbox');
        if (checkbox.prop('checked')) {
            seleccionados.push(parseInt(checkbox.val()));
        }
    });   
    crearPeticion(urlAPI, {case: "actualizarFiltroEmprendedores", data: $.param({seleccionados: seleccionados})}, (res)=>{
           if(!res.es_valor_error) {
               refresh();
           }
    });
}

function filtrarEmprendedores(etapaSeleccionada) {
    const table = $('#tablaEmprendedores').DataTable();
    table.rows({ search: 'applied' }).every(function () { 
        const rowNode = $(this.node());
        const checkbox = rowNode.find('.emprendedor-checkbox');
        const columna3Text = rowNode.find('td:nth-child(3)').text().trim();
        checkbox.prop('checked', columna3Text === etapaSeleccionada);
    });
    $("#select-all").prop("checked", false);
}

function completarParametrosConfiguracion() {
    // Validar que el año final no sea menor que el año de inicio
    $('#añoInicio, #añoFinal').change(function () {
        let añoInicio = parseInt($('#añoInicio').val());
        let añoFinal = parseInt($('#añoFinal').val());
        if (añoInicio > añoFinal) {
            mostrarMensajeAdvertencia('El año de inicio no puede ser mayor que el año final.', false);
            if ($('#añoInicio').val() !== añoInicio) {
                $('#añoInicio').val(añoFinal);
            } else {
                $('#añoFinal').val(añoInicio);
            }
        } else {
            let data = {anioInicio: añoInicio, anioFin: añoFinal};
            crearPeticion(urlAPI, {case: "actualizarConfiguracionAnios", data: $.param(data)}, (res) => {
                if (!res.es_valor_error) {
                    refresh();
                }
            });
        }
    });
}

function recuperarVistaImpacto() {
    $(this).prop("disabled", true);
    $("#loadingSpinnerContainer").show();
    crearPeticion(urlAPI, {
        case: 'recuperarVistaGeneral',
        data: $.param({tipo: $(this).data("tipo")})
    }, (registros) => {
        $("#loadingSpinnerContainer").hide();
        if (registros.length !== 0) {
            var table = $('<table>').DataTable({
                data: registros,
                columns: Object.keys(registros[0]).map(key => ({
                        title: key,
                        data: key
                    })),
                dom: 'Bfrtip'
            });
            table.button('.buttons-excel').trigger();
        } else {
            mostrarMensajeInfo("No hay información para exportar", false);
        }
        $(this).prop("disabled", false);
    });
}