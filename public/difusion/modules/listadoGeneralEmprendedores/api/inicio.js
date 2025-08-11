const urlAPI = "api/InicioAdminProyectosAPI.php";
let todasLasEtapas = [];
let tiposDeEtapa = [];

function ready() {
    crearPeticion(urlAPI, { case: "recuperarEmprendedores" }, function (res) {
        if (res.etapas && Array.isArray(res.etapas.lista)) {
            todasLasEtapas = res.etapas.lista.filter(etapa => typeof etapa === 'object' && etapa !== null && etapa.idEtapa);
        } else {
            console.error("La estructura de datos de etapas no es la esperada.", res.etapas);
            todasLasEtapas = [];
        }

        inicializarFiltros(todasLasEtapas);
        construirTablaEmprendedores(res.emprendedores);

        $('#modoFiltro input[name="filtro_principal"]').on('change', function() {
            const modo = $(this).val();
            if (modo === 'etapas') {
                $('#filtros-avanzados').slideDown();
            } else {
                $('#filtros-avanzados').slideUp();
            }
        });

        $("#filterForm").submit(function (e) {
            e.preventDefault();
            const $boton = $("#botonAplicarFiltro");
            const textoOriginal = $boton.text();
            $boton.prop('disabled', true).text('Cargando...');
            const $spinner = $('<span class="spinner-grow spinner-grow-sm me-2" role="status"></span>');
            $boton.prepend($spinner);

            let payload = {};
            const modoFiltro = $('input[name="filtro_principal"]:checked').val();

            if (modoFiltro === 'etapas') {
                const etapasSeleccionadas = [];
                $('#etapas-list .form-check-input:checked').each(function () {
                    etapasSeleccionadas.push($(this).val());
                });
                payload.etapa = etapasSeleccionadas;
            } else {
                payload.etapa = modoFiltro;
            }

            crearPeticion(urlAPI, { case: "filtrarEmprendedores", data: $.param(payload) }, function (response) {
                construirTablaEmprendedores(response);
                $boton.prop('disabled', false).text(textoOriginal);
                $spinner.remove();
            });
        });
    });
}

function inicializarFiltros(etapas) {
    crearBotonesTipoEtapa(etapas);
    actualizarDropdownEtapas(etapas);

    $('#fechaInicio, #fechaFin').on('change', aplicarFiltros);
    $('#tipoEtapa-buttons').on('click', '.btn', function() {
        $(this).addClass('active').siblings().removeClass('active');
        aplicarFiltros();
    });
    $('#esActualSwitch').on('change', aplicarFiltros);
    $('#etapasSearch').on('keyup', aplicarFiltros);
    $('#etapas-list').on('change', '.form-check-input', actualizarBotonDropdown);
    $('#guardarSeleccionEtapas').on('click', function() {
        var dropdown = new bootstrap.Dropdown($('#etapasDropdownMenu'));
        dropdown.hide();
    });
}

function crearBotonesTipoEtapa(etapas) {
    tiposDeEtapa = [...new Set(etapas.map(etapa => etapa.tipo && etapa.tipo.val).filter(Boolean))];
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
        etapasFiltradas = etapasFiltradas.filter(e => e.tipo && e.tipo.val === tipoActivo);
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


function construirTablaEmprendedores(emprendedores) {
    var data = [];
    const claseTabla = "table table-hover align-middle text-nowrap mb-1";
    $.each(emprendedores, (i, emprendedor) => {
        data.push({
            "Nombre": emprendedor.nombre + " " + emprendedor.apellidos,
            "Teléfono": $("<a>", {
                href: "https://wa.me/" + emprendedor.numero_celular.replace(/[\s\(\)-]/g, '').trim(),
                target: "_blank"
            }).append($("<i>", {class: "ti ti-brand-whatsapp fs-4 pe-2 text-success"}))
                    .append(emprendedor.numero_celular),
            "Correo": $("<a>", {
                href: "mailto:" + emprendedor.correo_electronico
            }).append($("<i>", {class: "ti ti-mail fs-4 pe-2 text-info"})).append(emprendedor.correo_electronico),
            "Acciones": crearBotonesAccion(emprendedor.id)
        });
    });

    if (data.length !== 0) {
        construirTablaDataTable(data, claseTabla, "container", "tablaEmprendedores");
    } else {
        const $tablaVacia = $('<table>', {class: claseTabla, id: "tablaEmprendedores"});
        const $thead = $('<thead>').append($('<tr>').append($('<th>', {text: "Nombre"})).append($('<th>', {text: "Telefono"})).append($('<th>', {text: "Correo"})));
        $tablaVacia.append($thead);
        $("#container").empty().append($tablaVacia);
        crearDataTable("#tablaEmprendedores");
    }
}

function crearBotonesAccion(id) {
    return crearBotonEliminar({
        idRegistro: id,
        url: urlAPI,
        tituloBoton: "Eliminar",
        data: {
            case: "eliminarEmprendedor",
            data: $.param({
                id: id
            })
        }
    });
}