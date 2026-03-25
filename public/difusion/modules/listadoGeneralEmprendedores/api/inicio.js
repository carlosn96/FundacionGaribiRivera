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
            "Etapa": generarListaEtapas(emprendedor.id_etapa, todasLasEtapas, emprendedor.id_linea_base, emprendedor.id),
            "Nombre": $("<a>", {
                href: `../verEmprendedor?id=${emprendedor.id_emprendedor}`,
                class: "text-primary text-decoration-none fw-semibold"
            }).text(`${emprendedor.nombre} ${emprendedor.apellidos}`).prop('outerHTML'),
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
        const $thead = $('<thead>').append($('<tr>').append($('<th>', {text: "Etapa"})).append($('<th>', {text: "Nombre"})).append($('<th>', {text: "Telefono"})).append($('<th>', {text: "Correo"})));
        $tablaVacia.append($thead);
        $("#container").empty().append($tablaVacia);
        crearDataTable("#tablaEmprendedores");
    }
}

function crearBotonesAccion(id) {
    const botonEliminar = crearBotonEliminar({
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

    const botonEditar = $("<a>", {
        href: "./../actualizarEmprendedores?id=" + id,
        role: "button",
        class: "btn btn-outline-warning btn-raised btn-sm btn-rounded position-relative"
    }).attr({
        "data-bs-toggle": "tooltip",
        "data-bs-placement": "top",
        "data-bs-title": "Editar"
    }).append(
        $("<span>", { class: "btn-label" }).append($("<i>", { class: "far fa-edit" }))
    ).append(" Editar");

    const group = $("<div>", {
        class: "btn-group",
        role: "group"
    }).append(botonEditar).append(botonEliminar);

    return group.prop("outerHTML");
}

function generarListaEtapas(etapa, listaEtapas, idLineaBase, idUsuario) {
    let nombreEtapa = "Sin etapa";
    const etapaObj = listaEtapas.find(e => e.idEtapa == etapa);
    if (etapaObj) {
        nombreEtapa = etapaObj.nombre;
    }

    const $container = $('<div>', { class: 'd-flex align-items-center gap-2' });
    const $texto = $('<span>', { text: nombreEtapa, class: 'badge bg-light text-dark border' });
    
    // Solo mostrar el boton si el emprendedor tiene una linea base, porque si no no se puede actualizar la etapa
    if (idLineaBase) {
        const $btnModificar = $('<button>', {
            type: 'button',
            class: 'btn btn-sm btn-link text-secondary p-0 mb-0 border-0 text-decoration-none',
            title: 'Cambiar etapa',
            html: '<i class="ti ti-pencil fs-5"></i>'
        });

        $btnModificar.click(function() {
            abrirModalModificarEtapa(etapa, listaEtapas, idLineaBase, idUsuario);
        });
        $container.append($texto, $btnModificar);
    } else {
        $container.append($texto);    
    }

    return $container[0];
}

function abrirModalModificarEtapa(etapaActualId, listaEtapas, idLineaBase, idUsuario) {
    let $modal = $('#modalModificarEtapa');
    if ($modal.length === 0) {
        const modalHtml = `
        <div class="modal fade" id="modalModificarEtapa" tabindex="-1" aria-labelledby="modalModificarEtapaLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-light border-bottom">
                        <h5 class="modal-title" id="modalModificarEtapaLabel">
                            <i class="ti ti-pencil me-2 text-primary"></i>Gestionar etapa de línea base
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <section class="mb-4 pb-3 border-bottom">
                            <h6 class="fw-semibold mb-2">Cambiar etapa actual</h6>
                            <p class="text-muted mb-3">Seleccione la nueva etapa para este emprendedor y guarde el cambio.</p>
                            <label for="selectModificarEtapa" class="form-label fw-bold">Nueva etapa</label>
                            <div class="mb-3 d-flex gap-2">
                                <select class="form-select" id="selectModificarEtapa"></select>
                                <button type="button" class="btn btn-primary text-nowrap" id="btnGuardarEtapa">
                                    <i class="ti ti-device-floppy me-1"></i> Guardar
                                </button>
                            </div>
                        </section>
                        <section>
                            <h6 class="fw-semibold mb-2">Avanzar a fortalecimiento</h6>
                            <p class="text-muted mb-3">Elija una etapa de fortalecimiento a la que desea avanzar al emprendedor.</p>
                            <label for="selectFortalecimiento" class="form-label fw-bold">Etapa de fortalecimiento</label>
                            <div class="mb-3 d-flex gap-2">
                                <select class="form-select" id="selectFortalecimiento"></select>
                                <button type="button" class="btn btn-warning text-nowrap" id="btnAvanzarFortalecimiento">
                                    <i class="ti ti-arrow-right me-1"></i> Avanzar
                                </button>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer justify-content-end">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            <i class="ti ti-x me-2"></i>Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
        $('body').append(modalHtml);
        $modal = $('#modalModificarEtapa');
    }

    const $select = $('#selectModificarEtapa');
    $select.empty();
    listaEtapas.forEach(val => {
        const $option = $('<option>', {
            value: val.idEtapa,
            text: val.nombre
        });
        if (val.idEtapa === etapaActualId) {
            $option.prop('selected', true);
        }
        $select.append($option);
    });

    const $selectFortalecimiento = $('#selectFortalecimiento');
    $selectFortalecimiento.empty();
    const etapasFortalecimiento = listaEtapas.filter(e => typeof e.tipo === 'object' && e.tipo !== null && typeof e.tipo.val !== 'undefined' && e.tipo.val.toLowerCase().includes('fortalecimiento'));
    etapasFortalecimiento.forEach(val => {
        const $option = $('<option>', {
            value: val.idEtapa,
            text: val.nombre
        });
        $selectFortalecimiento.append($option);
    });

    if (etapasFortalecimiento.length === 0) {
        $selectFortalecimiento.append($('<option>', { text: 'No hay etapas de fortalecimiento', disabled: true, selected: true }));
        $('#btnAvanzarFortalecimiento').prop('disabled', true);
    } else {
        $('#btnAvanzarFortalecimiento').prop('disabled', false);
    }

    $('#btnGuardarEtapa').off('click').on('click', function() {
        const nuevaEtapa = $select.val();
        if (nuevaEtapa == etapaActualId) {
            const bsModal = bootstrap.Modal.getInstance($modal[0]);
            bsModal.hide();
            return;
        }

        const data = $.param({
            etapa: nuevaEtapa,
            lineaBase: idLineaBase
        });
        crearPeticion(urlAPI, { case: "actualizarEtapa", data: data }, (res) => {
            if (res.es_valor_error === false) {
                const bsModal = bootstrap.Modal.getInstance($modal[0]);
                bsModal.hide();
                location.reload();
            } else {
                mostrarMensajeError("Error al actualizar la etapa: " + res.mensaje);
            }
        });
    });

    $('#btnAvanzarFortalecimiento').off('click').on('click', function() {
        const etapaFortalecimiento = $selectFortalecimiento.val();
        if (!etapaFortalecimiento) return;

        const data = $.param({
            etapa: etapaFortalecimiento,
            usuario: idUsuario
        });

        crearPeticion(urlAPI, { case: "avanzarFortalecimiento", data: data }, (res) => {
            if (res.es_valor_error === false) {
                const bsModal = bootstrap.Modal.getInstance($modal[0]);
                bsModal.hide();
                mostrarMensajeOk("Emprendedor avanzado a fortalecimiento correctamente.");
            } else {
                mostrarMensajeError("Error: " + res.mensaje, false);
            }
        });
    });

    const bsModal = new bootstrap.Modal($modal[0]);
    bsModal.show();
}



