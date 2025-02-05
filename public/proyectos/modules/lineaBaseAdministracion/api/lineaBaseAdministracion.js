const urlAPI = "api/LineaBaseAdministracionAPI.php";

function ready() {
    crearPeticion(urlAPI, {case: "recuperarEmprendedores"}, function (data) {
        construirSelectorEtapas(data.etapas);
        construirTablaEmprendedores(data);
        construirTablaEmprendedoresSinLineaBase(data.emprendedoresNoLineaBase);
    });

    $("#filterForm").submit(function (e) {
        e.preventDefault();
        const $boton = $("#botonAplicarFiltro");
        const textoOriginal = $boton.text();
        $boton.prop('disabled', true).text('Cargando...');
        const $spinner = $('<span class="spinner-grow spinner-grow-sm me-2" role="status"></span>');
        $boton.prepend($spinner);
        crearPeticion(urlAPI, {case: "filtrarEmprendedores", data: $(this).serialize()}, function (data) {
            construirTablaEmprendedores(data);
            $boton.prop('disabled', false).text(textoOriginal);
            $spinner.remove();
        });
    });
}

// Función genérica para construir tablas
function construirTablaGenerica(data, columnas, contenedor, idTabla) {
    const dataTabla = data.map(emprendedor => {
        let fila = {};
        columnas.forEach(columna => {
            fila[columna.nombre] = columna.generar(emprendedor);
        });
        return fila;
    });

    if (dataTabla.length !== 0) {
        // Si hay datos, construimos la tabla con DataTable
        construirTablaDataTable(dataTabla, "table-hover table-bordered", contenedor, idTabla, "");
    } else {
        // Si no hay datos, mostramos una tabla vacía
        const $tablaVacia = $('<table>', {class: "table table-bordered align-middle text-nowrap mb-1", id: idTabla});
        const $thead = $('<thead>').append($('<tr>'));
        columnas.forEach(columna => {
            $thead.append($('<th>', {text: columna.titulo}));
        });
        $tablaVacia.append($thead);
        $("#" + contenedor).empty().append($tablaVacia);
        crearDataTable("#" + idTabla);
    }
}

// Función específica para los emprendedores con línea base
function construirTablaEmprendedores(data) {
    const columnas = [
        {nombre: "Etapa", titulo: "Etapa", generar: (emprendedor) => generarListaEtapas(emprendedor.idEtapa, data.etapas, emprendedor.idLineaBase)},
        {nombre: "Nombre", titulo: "Nombre", generar: (emprendedor) => `<a href="#" class="text-info">${emprendedor.nombre} ${emprendedor.apellidos}</a>`},
        {nombre: "Correo electrónico", titulo: "Correo electrónico", generar: (emprendedor) => emprendedor.correo},
        {nombre: "Linea base", titulo: "Linea base", generar: (emprendedor) => crearBotonesLineaBase(emprendedor)}
    ];
    construirTablaGenerica(data.emprendedores, columnas, "tablaEmprendedoresContenedor", "tablaEmprendedores");
}

// Función específica para los emprendedores sin línea base
function construirTablaEmprendedoresSinLineaBase(data) {
    const columnas = [
        {nombre: "Etapa", titulo: "Etapa", generar: (emprendedor) => emprendedor.etapa},
        {nombre: "Nombre", titulo: "Nombre", generar: (emprendedor) => `<a href="#" class="text-info">${emprendedor.nombre} ${emprendedor.apellidos}</a>`},
        {nombre: "Correo electrónico", titulo: "Correo electrónico", generar: (emprendedor) => emprendedor.correo}
    ];
    construirTablaGenerica(data, columnas, "tablaEmprendedoresSinLineaBaseContenedor", "tablaEmprendedoresSinLineaBase");
}


function construirSelectorEtapas(etapas) {
    const $selector = crearSelector(null, "etapa", etapas);
    $("#selector").prepend($selector);
    $selector.val(etapas.estapaSeleccionada);
}

function crearBotonesLineaBase(emprendedor) {
    return $('<div>', {class: 'btn-group'}).append(
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

    $selector.change(function () {
        const data = $.param({
            etapa: $(this).val(),
            lineaBase: $(this).data("id-linea-base")
        });
        crearPeticion(urlAPI, {case: "actualizarEtapa", data: data}, (res) => {
            if (res.es_valor_error === false) {
                refresh();
            }
        });
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