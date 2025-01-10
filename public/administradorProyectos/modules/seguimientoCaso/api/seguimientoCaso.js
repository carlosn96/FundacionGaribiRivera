const urlAPI = "api/SeguimientoCasoAPI.php";

// Función que se ejecuta cuando la página está lista
function ready() {
    crearPeticion(urlAPI, {case: "recuperarEmprendedores"}, function (res) {
        if (res.emprendedores.length) {
            const dataTabla = res.emprendedores.map(emprendedor => ({
                    "Etapa": generarListaEtapas(emprendedor.idEtapa, res.etapas, emprendedor.idLineaBase),
                    "Nombre": `${emprendedor.nombre} ${emprendedor.apellidos}`,
                    "Correo electrónico": emprendedor.correo,
                    "Linea base": crearBotonesLineaBase(emprendedor),
                    "Seguimiento de caso": crearBotonSeguimiento(emprendedor)
                }));
            construirTablaDataTable(dataTabla, "table-hover table-bordered", "tablaEmprendedoresContenedor", "tablaEmprendedores", "");
        }
    });
}

function crearBotonesLineaBase(emprendedor) {
    return $('<div>', {class: 'btn-group', role: 'group', 'aria-label': 'Botones Linea Base'}).append(
            // Botón para "Inicial"
            $('<div>', {class: 'btn-group'}).append(
            $('<button>', {
                type: 'button',
                class: 'btn btn-sm btn-outline-success dropdown-toggle',
                'data-bs-toggle': 'dropdown',
                'aria-expanded': 'false',
                text: 'Inicial'
            }),
            $('<ul>', {class: 'dropdown-menu'}).append(
            $('<li>').append(
            $('<a>', {
                class: 'dropdown-item',
                href: '#',
                click: function (e) {
                    e.preventDefault();
                    lineaBaseAction('inicial', 'Ver', emprendedor.idUsuario);
                }
            }).append(
            $('<i>', {class: 'ti ti-file-search me-2', title: 'Ver'}),
            'Ver'
            )
            ),
            $('<li>').append(
            $('<a>', {
                class: 'dropdown-item',
                href: '#',
                click: function (e) {
                    e.preventDefault();
                    lineaBaseAction('inicial', 'Modificar', emprendedor.idUsuario);
                }
            }).append(
            $('<i>', {class: 'ti ti-edit me-2', title: 'Modificar'}),
            'Modificar'
            )
            ),
            $('<li>').append(
            $('<a>', {
                class: 'dropdown-item',
                href: '#',
                click: function (e) {
                    e.preventDefault();
                    eliminarlineaBase('inicial', emprendedor.idUsuario);
                }
            }).append(
            $('<i>', {class: 'ti ti-trash me-2', title: 'Eliminar'}),
            'Eliminar'
            )
            )
            )
            ),
            // Botón para "Final"
            $('<div>', {class: 'btn-group'}).append(
            $('<button>', {
                type: 'button',
                class: 'btn btn-sm btn-outline-success dropdown-toggle',
                'data-bs-toggle': 'dropdown',
                'aria-expanded': 'false',
                text: 'Final'
            }),
            $('<ul>', {class: 'dropdown-menu'}).append(
            $('<li>').append(
            $('<a>', {
                class: 'dropdown-item',
                href: '#',
                click: function (e) {
                    e.preventDefault();
                    lineaBaseAction('final', 'Ver', emprendedor.idUsuario);
                }
            }).append(
            $('<i>', {class: 'ti ti-file-search me-2', title: 'Ver'}),
            'Ver'
            )
            ),
            $('<li>').append(
            $('<a>', {
                class: 'dropdown-item',
                href: '#',
                click: function (e) {
                    e.preventDefault();
                    lineaBaseAction('final', 'Modificar', emprendedor.idUsuario);
                }
            }).append(
            $('<i>', {class: 'ti ti-edit me-2', title: 'Modificar'}),
            'Modificar'
            )
            ),
            $('<li>').append(
            $('<a>', {
                class: 'dropdown-item',
                href: '#',
                click: function (e) {
                    e.preventDefault();
                    eliminarlineaBase('final', emprendedor.idUsuario);
                }
            }).append(
            $('<i>', {class: 'ti ti-trash me-2', title: 'Eliminar'}),
            'Eliminar'
            )
            )
            )
            )
            );
}

function lineaBaseAction(tipo, action, id) {
    const data = {
        idUsuario: id,
        tipo: tipo
    };
    crearPeticion(urlAPI, {case: 'lineaBaseAction', data: $.param(data)}, (rs) => {
        if (rs.success) {
            redireccionar("../lineaBase" + action);
        } else {
            mostrarMensajeError("Intenta más tarde: " + rs.msg);
        }
    });
}

function crearBotonSeguimiento(emprendedor) {
    var $boton = $('<button>', {
        class: 'btn btn-sm btn-outline-primary',
        'data-bs-toggle': 'modal',
        'data-bs-target': '#modalEmprendedor',
        click: function () {
            cargarSeguimientoCaso(emprendedor.idLineaBase, emprendedor.nombre, emprendedor.correo);
        }
    }).text('Seguimiento');

    return $boton;
}

function cargarSeguimientoCaso(idLineaBase, nombre, correo) {
    crearPeticion(urlAPI, {case: "recuperarSeguimientoCaso", data: `idLineaBase=${idLineaBase}`}, (rs) => {
        const emprendedor = encodeURIComponent(JSON.stringify([idLineaBase, nombre, correo]));
        const $btnSeguimiento = $("#btnDarSeguimiento");
        const $btnEliminarSeguimiento = $("#btnEliminarSeguimiento");
        const seguimientoExistente = Array.isArray(rs.seguimientoCaso);
        const textBtn = seguimientoExistente ? "Hacer" : "Ver";
        const icon = seguimientoExistente ? "ti-plus" : "ti-file-export";
        const rsEncoded = seguimientoExistente ? '' : encodeURIComponent(JSON.stringify(rs));
        const urlBtn = seguimientoExistente
                ? `../seguimientoCasoNuevo/?emprendedor=${emprendedor}`
                : `../seguimientoCasoVista/?sc=12&emprendedor=${emprendedor}`;
        $btnSeguimiento.attr("data-bs-original-title", `${textBtn} seguimiento de caso`);
        $btnSeguimiento.attr("href", urlBtn);
        $btnSeguimiento.html(`<span class="ti ${icon}"></span>`);
        $btnEliminarSeguimiento.prop("hidden", seguimientoExistente);
        $btnEliminarSeguimiento.attr("href", `javascript:eliminarSeguimientoCaso(${rs.seguimientoCaso.idSeguimientoCaso})`);
        $('#cardModalEmprendedorContent').html(`<p class="card-text">${correo}</p>`);
        $("#nombreEmprendedor").text(nombre);
        $("#modalEmprendedor").modal('show');
    });
}

function eliminarSeguimientoCaso(id) {
    alertaEliminar({
        mensajeAlerta: "Se eliminará el seguimiento de caso",
        url: urlAPI,
        data: {"case": "eliminarSeguimientoCaso", "data": `id=${id}`}
    });
}

function generarListaEtapas(etapa, listaEtapas, idLineaBase) {
    const $selector = $('<select>', {
        class: 'form-select form-select-sm',
        name: 'etapas',
        'data-id-linea-base': idLineaBase
    });
    listaEtapas.forEach(val => {
        const $option = $('<option>', {
            value: val.idEtapa,
            text: val.nombre
        });
        if (val.idEtapa === etapa)
            $option.prop('selected', true);
        $selector.append($option);
    });
    return $selector;
}


function eliminarlineaBase(tipo, idUsuario) {
    alertaEliminar({
        mensajeAlerta: "La información de la linea base " + tipo + " ya no estará disponible",
        url: urlAPI,
        data: {case: "eliminarLineaBase", data: $.param({tipo: tipo, usuario: idUsuario})}
    });
}