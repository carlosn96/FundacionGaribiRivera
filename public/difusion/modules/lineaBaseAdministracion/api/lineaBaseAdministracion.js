const urlAPI = "api/LineaBaseAdministracionAPI.php";
let todasLasEtapas = [];
let tiposDeEtapa = [];

function ready() {
    crearPeticion(urlAPI, { case: "recuperarEmprendedores" }, function (data) {
        // Filter to get only valid stage objects
        if (data.etapas && Array.isArray(data.etapas)) {

            todasLasEtapas = data.etapas.filter(etapa =>
                typeof etapa === 'object' &&
                etapa !== null &&
                etapa.idEtapa &&
                typeof etapa.tipo === 'object' &&
                etapa.tipo !== null &&
                typeof etapa.tipo.val !== 'undefined'
            );
        } else {
            console.error("The stage data structure is not as expected.", data.etapas);
            todasLasEtapas = [];
        }

        inicializarFiltros(todasLasEtapas);
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

        let payload = {};
        // Always assume 'etapas' mode for this module
        const etapasSeleccionadas = [];
        $('#etapas-list .form-check-input:checked').each(function () {
            etapasSeleccionadas.push($(this).val());
        });
        payload.etapa = etapasSeleccionadas;

        crearPeticion(urlAPI, { case: "filtrarEmprendedores", data: $.param(payload) }, function (data) {
            construirTablaEmprendedores(data);
            $boton.prop('disabled', false).text(textoOriginal);
            $spinner.remove();
        });
    });

    $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        var activeTabPaneId = $(e.target).attr('href');
        var table = $(activeTabPaneId).find('table');
        if ($.fn.DataTable.isDataTable(table)) {
            table.DataTable().columns.adjust();
        }
    });
}

function inicializarFiltros(etapas) {
    crearBotonesTipoEtapa(etapas);
    actualizarDropdownEtapas(etapas);

    $('#fechaInicio, #fechaFin').on('change', aplicarFiltros);
    $('#tipoEtapa-buttons').on('click', '.btn', function () {
        $(this).addClass('active').siblings().removeClass('active');
        aplicarFiltros();
    });
    $('#esActualSwitch').on('change', aplicarFiltros);
    $('#etapasSearch').on('keyup', aplicarFiltros);
    $('#etapas-list').on('change', '.form-check-input', actualizarBotonDropdown);
    $('#guardarSeleccionEtapas').on('click', function () {
        var dropdown = new bootstrap.Dropdown($('#etapasDropdownMenu'));
        dropdown.hide();
    });
}

function crearBotonesTipoEtapa(etapas) {
    // Filter stages that do not have 'tipo' or 'tipo.val' defined
    tiposDeEtapa = [...new Set(etapas.filter(etapa => typeof etapa.tipo === 'object' && etapa.tipo !== null && typeof etapa.tipo.val !== 'undefined').map(etapa => etapa.tipo.val))];
    const $container = $('#tipoEtapa-buttons');
    $container.empty();
    $container.append('<button type="button" class="btn btn-outline-primary active">Todos</button>');
    tiposDeEtapa.forEach(tipo => {
        $container.append(`<button type="button" class="btn btn-outline-primary">${tipo}</button>`);
    });
}

function aplicarFiltros() {
    let etapasFiltradas = [...todasLasEtapas];

    const fechaInicio = $('#fechaInicio').val();
    const fechaFin = $('#fechaFin').val();
    if (fechaInicio) {
        etapasFiltradas = etapasFiltradas.filter(e => e.fechaInicio >= fechaInicio);
    }
    if (fechaFin) {
        etapasFiltradas = etapasFiltradas.filter(e => e.fechaFin <= fechaFin);
    }

    const tipoActivo = $('#tipoEtapa-buttons .btn.active').text();
    if (tipoActivo !== 'Todos') {
        // Ensure 'e.tipo' is an object and 'e.tipo.val' exists before comparing
        etapasFiltradas = etapasFiltradas.filter(e => typeof e.tipo === 'object' && e.tipo !== null && e.tipo.val === tipoActivo);
    }

    if ($('#esActualSwitch').is(':checked')) {
        etapasFiltradas = etapasFiltradas.filter(e => e.esActual);
    }

    const searchTerm = $('#etapasSearch').val().toLowerCase();
    if (searchTerm) {
        etapasFiltradas = etapasFiltradas.filter(e => e.nombre.toLowerCase().includes(searchTerm));
    }

    actualizarDropdownEtapas(etapasFiltradas);
}

function actualizarDropdownEtapas(etapas) {
    const $list = $('#etapas-list');
    $list.empty();
    if (etapas.length > 0) {
        etapas.forEach(etapa => {
            const checkbox = `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="${etapa.idEtapa}" id="etapa-${etapa.idEtapa}">
                    <label class="form-check-label" for="etapa-${etapa.idEtapa}">
                        ${etapa.nombre}
                    </label>
                </div>`;
            $list.append(checkbox);
        });
    } else {
        $list.append('<p class="text-center text-muted">No hay etapas que coincidan con los filtros.</p>');
    }
    actualizarBotonDropdown();
}

function actualizarBotonDropdown() {
    const count = $('#etapas-list .form-check-input:checked').length;
    const $button = $('#etapasDropdownMenu');
    if (count === 0) {
        $button.text("Seleccionar etapas");
    } else if (count === 1) {
        $button.text("1 etapa seleccionada");
    } else {
        $button.text(`${count} etapas seleccionadas`);
    }
}

function construirTablaGenerica(data, columnas, contenedor, idTabla) {
    const claseTabla = "table table-hover align-middle text-nowrap mb-1";
    const dataTabla = data.map(emprendedor => {
        let fila = {};
        columnas.forEach(columna => {
            fila[columna.nombre] = columna.generar(emprendedor);
        });
        return fila;
    });

    if (dataTabla.length !== 0) {
        construirTablaDataTable(dataTabla, claseTabla, contenedor, idTabla, "");
    } else {
        const $tablaVacia = $('<table>', { class: claseTabla, id: idTabla });
        const $thead = $('<thead>').append($('<tr>'));
        const $tfoot = $('<tfoot>').append($('<tr>'));

        columnas.forEach(columna => {
            $thead.find('tr').append($('<th>', { text: columna.titulo }));
            $tfoot.find('tr').append($('<th>', { text: columna.titulo }));
        });

        $tablaVacia.append($thead);
        $tablaVacia.append('<tbody></tbody>');
        $tablaVacia.append($tfoot);

        $("#" + contenedor).empty().append($tablaVacia);
        crearDataTable("#" + idTabla, []);
    }
}

// Specific function for entrepreneurs with baseline
function construirTablaEmprendedores(data) {
    const columnas = [
        { nombre: "Etapa", titulo: "Etapa", generar: (emprendedor) => generarListaEtapas(emprendedor.idEtapa, todasLasEtapas, emprendedor.idLineaBase) },
        { nombre: "Nombre", titulo: "Nombre", generar: (emprendedor) => `<a href="#" class="text-info">${emprendedor.nombre} ${emprendedor.apellidos}</a>` },
        { nombre: "Correo electrónico", titulo: "Correo electrónico", generar: (emprendedor) => emprendedor.correo },
        { nombre: "Linea base", titulo: "Linea base", generar: (emprendedor) => crearBotonesLineaBase(emprendedor) }
    ];
    construirTablaGenerica(data.emprendedores, columnas, "tablaEmprendedoresContenedor", "tablaEmprendedores");
}

// Specific function for entrepreneurs without baseline
function construirTablaEmprendedoresSinLineaBase(data) {
    const columnas = [
        { nombre: "Etapa", titulo: "Etapa", generar: (emprendedor) => emprendedor.etapa },
        { nombre: "Nombre", titulo: "Nombre", generar: (emprendedor) => `<a href="#" class="text-info">${emprendedor.nombre} ${emprendedor.apellidos}</a>` },
        { nombre: "Correo electrónico", titulo: "Correo electrónico", generar: (emprendedor) => emprendedor.correo }/*,
        {
            nombre: "Seleccionar", titulo: "Seleccionar", generar: (emprendedor) =>
                `<input type="checkbox" class="form-check-input" name="seleccionar_emprendedor" value="${emprendedor.idUsuario}" />`
        } // Checkbox to select entrepreneur*/
    ];
    construirTablaGenerica(data, columnas, "tablaEmprendedoresSinLineaBaseContenedor", "tablaEmprendedoresSinLineaBase");
}


function crearBotonesLineaBase(emprendedor) {
    return $('<div>', { class: 'btn-group' }).append(
        $('<button>', {
            type: 'button',
            class: 'btn btn-sm btn-outline-success dropdown-toggle',
            'data-bs-toggle': 'dropdown',
            'aria-expanded': 'false',
            text: 'Inicial'
        }),
        $('<ul>', { class: 'dropdown-menu' }).append(
            $('<li>').append(
                $('<a>', {
                    class: 'dropdown-item',
                    href: '#',
                    click: function (e) {
                        e.preventDefault();
                        lineaBaseAction('inicial', 'Ver', emprendedor.idUsuario);
                    }
                }).append(
                    $('<i>', { class: 'ti ti-file-search me-2', title: 'Ver' }),
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
                    $('<i>', { class: 'ti ti-edit me-2', title: 'Modificar' }),
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
                    $('<i>', { class: 'ti ti-trash me-2', title: 'Eliminar' }),
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
    crearPeticion(urlAPI, { case: 'lineaBaseAction', data: $.param(data) }, (rs) => {
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
        data: { "case": "eliminarSeguimientoCaso", "data": `id=${id}` }
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
        crearPeticion(urlAPI, { case: "actualizarEtapa", data: data }, (res) => {
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
        data: { case: "eliminarLineaBase", data: $.param({ tipo: tipo, usuario: idUsuario }) }
    });
}

function eliminarSeleccionados() {
    const idsSeleccionados = [];
    $("input[name='seleccionar_emprendedor']:checked").each(function () {
        idsSeleccionados.push($(this).val());
    });

    if (idsSeleccionados.length === 0) {
        mostrarMensajeError("No se han seleccionado emprendedores.", false);
        return;
    }

    alertaEliminar({
        mensajeAlerta: "Los emprendedores seleccionados serán eliminados permanentemente.",
        url: urlAPI,
        data: { case: "eliminarEmprendedoresSeleccionados", data: $.param({ ids: idsSeleccionados }) }
    });
}