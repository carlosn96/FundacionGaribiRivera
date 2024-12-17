const urlAPI = "api/EstabilidadEconomicaAPI.php";
function ready() {
    crearPeticion(urlAPI, {case: "recuperarSecciones"}, (res) => {
        print(res);
        generarImpactoHTML(res);
        completarParametrosConfiguracion();
    });
}

function generarImpactoHTML(data) {
    // Limpia el contenedor principal antes de generar las nuevas tarjetas.
    $("#impacto-container").empty();

    // Crear las tabs principales dinámicamente según los datos
    const mainTabs = $("<ul>", {class: "nav nav-tabs", id: "mainTabs", role: "tablist"});
    const mainTabsContent = $("<div>", {class: "tab-content mt-3", id: "mainTabsContent"});

    // Tab IMPACTOS
    mainTabs.append(
            $("<li>", {class: "nav-item", role: "presentation"}).append(
            $("<button>", {
                class: "nav-link active",
                id: "impactos-tab",
                "data-bs-toggle": "tab",
                "data-bs-target": "#impactos",
                type: "button",
                role: "tab",
                "aria-controls": "impactos",
                "aria-selected": "true",
                text: "Impactos"
            })
            )
            );

    // Tab PARÁMETROS DE CONFIGURACIÓN
    mainTabs.append(
            $("<li>", {class: "nav-item", role: "presentation"}).append(
            $("<button>", {
                class: "nav-link",
                id: "configuracion-tab",
                "data-bs-toggle": "tab",
                "data-bs-target": "#configuracion",
                type: "button",
                role: "tab",
                "aria-controls": "configuracion",
                "aria-selected": "false",
                text: "Parámetros de Configuración"
            })
            )
            );

    // Crear el contenido de IMPACTOS
    const impactosTabContent = $("<div>", {
        class: "tab-pane fade show active",
        id: "impactos",
        role: "tabpanel",
        "aria-labelledby": "impactos-tab"
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
                    id: `${subTabId}-tab`,
                    "data-bs-toggle": "tab",
                    "data-bs-target": `#${subTabId}`,
                    type: "button",
                    role: "tab",
                    "aria-controls": subTabId,
                    "aria-selected": index === 0 ? "true" : "false",
                    text: impacto.nombre
                })
                )
                );

        // Subtab content
        const subTabContent = $("<div>", {
            class: `tab-pane fade ${index === 0 ? "show active" : ""}`,
            id: subTabId,
            role: "tabpanel",
            "aria-labelledby": `${subTabId}-tab`
        });

        // Crear tabla de ponderaciones
        const table = $("<table>", {class: "table table-bordered"}).append(
                $("<thead>").append(
                $("<tr>").append(
                $("<th>", {text: "Sección"}),
                $("<th>", {text: "Obtenido"}),
                $("<th>", {text: "Peso"}),
                $("<th>", {text: "Contribución al Impacto"})
                )
                )
                );

        // Añadir las filas a la tabla
        const tbody = $("<tbody>");
        impacto.data.forEach((seccion, i) => {
            tbody.append(
                    $("<tr>").append(
                    $("<td>", {text: seccion.titulo}),
                    $("<td>", {text: seccion.obtenido}),
                    $("<td>").append(
                    $("<span>", {text: `${seccion.peso}%`})
                    ),
                    $("<td>", {text: (seccion.obtenido * (seccion.peso / 100)).toFixed(2)})
                    )
                    );
        });

        table.append(tbody);
        subTabContent.append(
                $("<h5>", {text: "Cálculos ponderados para obtener el impacto."}),
                table
                );

        // Agregar la narrativa abajo de la tabla
        subTabContent.append(
                $("<h6>", {text: "Narrativa:"}),
                $("<p>", {text: impacto.narrativa}),
                $("<small>", {class: "text-muted", text: impacto.narrativaNotas})
                );

        impactoSubTabsContent.append(subTabContent);
    });

    // Agregar los subtabs de impactos al tab IMPACTOS
    impactosTabContent.append(impactoSubTabs, impactoSubTabsContent);
    mainTabsContent.append(impactosTabContent);
    print(data.fechas.inicio);
    // Crear el contenido de Parámetros de Configuración
    // Crear el contenido de Parámetros de Configuración
// Crear el contenido de Parámetros de Configuración
mainTabsContent.append(
    $("<div>", {
        class: "tab-pane fade",
        id: "configuracion",
        role: "tabpanel",
        "aria-labelledby": "configuracion-tab"
    }).append(
        $("<p>", { text: "Ajuste los parámetros de configuración según sea necesario para calcular el impacto." }),
        
        // Año de Inicio
        $("<div>", { class: "mb-3" }).append(
            $("<label>", { for: "añoInicio", class: "form-label", text: "Año de Inicio" }),
            $("<select>", {
                class: "form-select",
                id: "añoInicio"
            }).append(
                // Llenar opciones de años basados en el rango de años en data.fechas
                ...Array(data.fechas.fin - data.fechas.inicio + 1).keys().map(yearOffset => {
                    const yearValue = data.fechas.inicio + yearOffset;
                    return $("<option>", {
                        value: yearValue,
                        text: yearValue,
                        selected: data.fechas.inicioSelected
                    });
                })
            )
        ),

        // Año Final
        $("<div>", { class: "mb-3" }).append(
            $("<label>", { for: "añoFinal", class: "form-label", text: "Año Final" }),
            $("<select>", {
                class: "form-select",
                id: "añoFinal"
            }).append(
                // Llenar opciones de años basados en el rango de años en data.fechas
                ...Array(data.fechas.fin - data.fechas.inicio + 1).keys().map(yearOffset => {
                    const yearValue = data.fechas.inicio + yearOffset;
                    return $("<option>", {
                        value: yearValue,
                        text: yearValue,
                        selected: data.fechas.finSelected
                    });
                })
            )
        )
    )
);



    // Agregar las tabs principales y su contenido al contenedor
    $("#impacto-container").append(mainTabs, mainTabsContent);
    
}


function completarParametrosConfiguracion() {
    // Validar que el año final no sea menor que el año de inicio
    $('#añoInicio, #añoFinal').change(function () {
        let añoInicio = parseInt($('#añoInicio').val());
        let añoFinal = parseInt($('#añoFinal').val());
        if (añoInicio > añoFinal) {
            alert('El año de inicio no puede ser mayor que el año final.');
            if ($('#añoInicio').val() !== añoInicio) {
                $('#añoInicio').val(añoFinal);
            } else {
                $('#añoFinal').val(añoInicio);
            }
        }

        /*/ Actualizar los valores en la narrativa después de la validación
        $('#anioInicioNarrativa').text($('#añoInicio').val());
        $('#anioFinalNarrativa').text($('#añoFinal').val());*/
    });
}
