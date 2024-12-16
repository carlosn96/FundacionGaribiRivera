const urlAPI = "api/EstabilidadEconomicaAPI.php";
function ready() {
    crearPeticion(urlAPI, {case: "recuperarSecciones"}, (res) => {
        generarImpactoHTML(res);
        
    });
}

function generarImpactoHTML(data) {
    // Limpia el contenedor principal antes de generar las nuevas tarjetas.
    $("#impacto-container").empty();

    // Crear las tabs principales: "Impacto" y "Parámetros de Configuración"
    const tabs = $("<ul>", {class: "nav nav-tabs", id: "mainTabs", role: "tablist"}).append(
        $("<li>", {class: "nav-item", role: "presentation"}).append(
            $("<button>", {
                class: "nav-link active",
                id: "impacto-tab",
                "data-bs-toggle": "tab",
                "data-bs-target": "#impacto",
                type: "button",
                role: "tab",
                "aria-controls": "impacto",
                "aria-selected": "true",
                text: "IMPACTO"
            })
        ),
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
                text: "PARÁMETROS DE CONFIGURACIÓN"
            })
        )
    );

    // Crear el contenido de las tabs
    const tabsContent = $("<div>", {class: "tab-content mt-3", id: "mainTabsContent"}).append(
        // Tab "Impacto"
        $("<div>", {
            class: "tab-pane fade show active",
            id: "impacto",
            role: "tabpanel",
            "aria-labelledby": "impacto-tab"
        }).append(
            $("<ul>", {class: "nav nav-tabs", id: "impactTabs", role: "tablist"}).append(
                // Tab "Calidad de vida"
                $("<li>", {class: "nav-item", role: "presentation"}).append(
                    $("<button>", {
                        class: "nav-link active",
                        id: "calidadVida-tab",
                        "data-bs-toggle": "tab",
                        "data-bs-target": "#calidadVida",
                        type: "button",
                        role: "tab",
                        "aria-controls": "calidadVida",
                        "aria-selected": "true",
                        text: "Calidad de vida"
                    })
                ),
                // Tab "Estabilidad económica"
                $("<li>", {class: "nav-item", role: "presentation"}).append(
                    $("<button>", {
                        class: "nav-link",
                        id: "estabilidadEconomica-tab",
                        "data-bs-toggle": "tab",
                        "data-bs-target": "#estabilidadEconomica",
                        type: "button",
                        role: "tab",
                        "aria-controls": "estabilidadEconomica",
                        "aria-selected": "false",
                        text: "Estabilidad económica"
                    })
                )
            ),
            $("<div>", {class: "tab-content mt-3", id: "impactTabsContent"}).append(
                // Contenido de "Calidad de vida"
                $("<div>", {
                    class: "tab-pane fade show active",
                    id: "calidadVida",
                    role: "tabpanel",
                    "aria-labelledby": "calidadVida-tab"
                }).append(
                    $("<h5>", {text: "Cálculos ponderados para obtener el impacto de Calidad de vida."}),
                    $("<table>", {class: "table table-bordered"}).append(
                        $("<thead>").append(
                            $("<tr>").append(
                                $("<th>", {text: "Sección"}),
                                $("<th>", {text: "Obtenido"}),
                                $("<th>", {text: "Peso"}),
                                $("<th>", {text: "Contribución al Impacto"})
                            )
                        ),
                        $("<tbody>").append(
                            data[1].data.map((seccion, i) => $("<tr>").append(
                                $("<td>", {text: seccion.titulo}),
                                $("<td>", {text: seccion.obtenido}),
                                $("<td>").append(
                                    $("<span>", {text: `${seccion.peso}%`}),
                                    $("<input>", {
                                        type: "range",
                                        id: `peso-calidad-${i}`,
                                        min: "0",
                                        max: "100",
                                        value: seccion.peso,
                                        class: "form-range",
                                        onchange: `updateImpacto('calidad', ${i})`
                                    })
                                ),
                                $("<td>", {text: seccion.obtenido * (seccion.peso / 100)})
                            ))
                        )
                    ),
                    // Narrativa de Calidad de vida
                    $("<div>", {
                        class: "narrativa",
                        id: "narrativa-calidadVida"
                    }).append(
                        $("<h6>", {text: "Narrativa de Calidad de vida:"}),
                        $("<p>", {text: data[1].narrativa}),
                        $("<small>", {class: "text-muted", text: data[1].narrativaNotas})
                    )
                ),
                // Contenido de "Estabilidad económica"
                $("<div>", {
                    class: "tab-pane fade",
                    id: "estabilidadEconomica",
                    role: "tabpanel",
                    "aria-labelledby": "estabilidadEconomica-tab"
                }).append(
                    $("<h5>", {text: "Cálculos ponderados para obtener el impacto de Estabilidad económica."}),
                    $("<table>", {class: "table table-bordered"}).append(
                        $("<thead>").append(
                            $("<tr>").append(
                                $("<th>", {text: "Sección"}),
                                $("<th>", {text: "Obtenido"}),
                                $("<th>", {text: "Peso"}),
                                $("<th>", {text: "Contribución al Impacto"})
                            )
                        ),
                        $("<tbody>").append(
                            data[0].data.map((seccion, i) => $("<tr>").append(
                                $("<td>", {text: seccion.titulo}),
                                $("<td>", {text: seccion.obtenido}),
                                $("<td>").append(
                                    $("<span>", {text: `${seccion.peso}%`}),
                                    $("<input>", {
                                        type: "range",
                                        id: `peso-estabilidad-${i}`,
                                        min: "0",
                                        max: "100",
                                        value: seccion.peso,
                                        class: "form-range",
                                        onchange: `updateImpacto('estabilidad', ${i})`
                                    })
                                ),
                                $("<td>", {text: seccion.obtenido * (seccion.peso / 100)})
                            ))
                        )
                    ),
                    // Narrativa de Estabilidad económica
                    $("<div>", {
                        class: "narrativa",
                        id: "narrativa-estabilidadEconomica"
                    }).append(
                        $("<h6>", {text: "Narrativa de Estabilidad económica:"}),
                        $("<p>", {text: data[0].narrativa}),
                        $("<small>", {class: "text-muted", text: data[0].narrativaNotas})
                    )
                )
            )
        ),
        // Tab "Parámetros de Configuración"
        $("<div>", {
            class: "tab-pane fade",
            id: "configuracion",
            role: "tabpanel",
            "aria-labelledby": "configuracion-tab"
        }).append(
            $("<p>", {text: "Ajuste los parámetros de configuración según sea necesario para calcular el impacto."}),
            $("<div>", {class: "mb-3"}).append(
                $("<label>", {for : "añoInicio", class: "form-label", text: "Año de Inicio"}),
                $("<input>", {type: "date", class: "form-control", id: "añoInicio"})
            ),
            $("<div>", {class: "mb-3"}).append(
                $("<label>", {for : "añoFinal", class: "form-label", text: "Año Final"}),
                $("<input>", {type: "date", class: "form-control", id: "añoFinal"})
            )
        )
    );

    // Añadir las tabs y su contenido al contenedor
    $("#impacto-container").append(tabs, tabsContent);
    completarParametrosConfiguracion();
}

function completarParametrosConfiguracion() {
    let currentYear = new Date().getFullYear();
    let startYear = 2020;
    let endYear = currentYear;
    $('#anioInicioNarrativa').text(startYear);
    $('#anioFinalNarrativa').text(endYear);
    // Llenar los select con los años
    for (let year = startYear; year <= endYear; year++) {
        $('#añoInicio').append(new Option(year, year));
        $('#añoFinal').append(new Option(year, year));
    }
    $('#añoInicio').val(startYear);
    $('#añoFinal').val(endYear);
    // Validar que el año final no sea menor que el año de inicio
    $('#añoInicio, #añoFinal').change(function () {
        let añoInicio = parseInt($('#añoInicio').val());
        let añoFinal = parseInt($('#añoFinal').val());
        // Verificar si el año de inicio es mayor que el año final
        if (añoInicio > añoFinal) {
            alert('El año de inicio no puede ser mayor que el año final.');

            // Restaurar el valor del campo que se modificó
            if ($('#añoInicio').val() !== añoInicio) {
                $('#añoInicio').val(añoFinal);
            } else {
                $('#añoFinal').val(añoInicio);
            }
        }
        // Actualizar los valores en la narrativa
        $('#anioInicioNarrativa').text(añoInicio);
        $('#anioFinalNarrativa').text(añoFinal);
    });
}

