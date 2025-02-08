const urlAPI = "api/LineaBaseAdministracionAPI.php";

function ready() {
    crearPeticion(urlAPI, {case: "recuperarEmprendedores"}, function (data) {
        construirSelectorEtapas(data.etapas);
        construirTablaEmprendedores(data);
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

function construirTablaEmprendedores(data) {
    const dataTabla = data.emprendedores.map(emprendedor => ({
            "Etapa": emprendedor.etapa,
            "Nombre": `<a href="#" class="text-primary text-decoration-none hover-underline">${emprendedor.nombre} ${emprendedor.apellidos}</a>`,
            "Seguimiento": crearMenuSeguimiento(emprendedor)
        }));
    if (dataTabla.length > 0) {
        construirTablaDataTable(dataTabla, "table-hover table-bordered", "tablaEmprendedoresContenedor", "tablaEmprendedores", "");
    } else {
        construirTablaVacia();
    }
}

function construirTablaVacia() {
    const $tablaVacia = $('<table>', {
        class: "table table-bordered align-middle text-nowrap mb-1",
        id: "tablaEmprendedores"
    });
    const $thead = $('<thead>').append(
        $('<tr>').append(
            $('<th>', { text: "Etapa" }),
            $('<th>', { text: "Nombre" }),
            $('<th>', { text: "Seguimiento" })
        )
    );
    $tablaVacia.append($thead);
    $("#tablaEmprendedoresContenedor").empty().append($tablaVacia);
    crearDataTable("#tablaEmprendedores");
}


function construirSelectorEtapas(etapas) {
    const $selector = crearSelector(null, "etapa", etapas);
    $("#selector").prepend($selector);
    $selector.val(etapas.estapaSeleccionada);
}

function crearMenuSeguimiento(emprendedor) {
    return $('<div>', {
        class: 'dropdown dropstart',
        role: 'group',
        'aria-label': 'Botones Linea Base'
    }).append(
        $('<a>', {
            href: 'javascript:void(0)',
            class: 'text-muted',
            id: 'dropdownMenuButton',
            'data-bs-toggle': 'dropdown',
            'aria-expanded': 'false'
        }).append(
            $('<i>', { class: 'ti ti-dots-vertical fs-5' })
        ),
        $('<ul>', { class: 'dropdown-menu', 'aria-labelledby': 'dropdownMenuButton' }).append(
            $('<li>').append(
                $('<a>', {
                    class: 'dropdown-item d-flex align-items-center gap-3',
                    href: 'javascript:void(0)',
                    click: function (e) {
                        e.preventDefault();
                        lineaBaseAction('Ver', emprendedor.idUsuario);
                    }
                }).append(
                    $('<i>', { class: 'fs-4 ti ti-file-search' }),
                    'Ver'
                )
            ),
            $('<li>').append(
                $('<a>', {
                    class: 'dropdown-item d-flex align-items-center gap-3',
                    href: 'javascript:void(0)',
                    click: function (e) {
                        e.preventDefault();
                        lineaBaseAction('Modificar', emprendedor.idUsuario);
                    }
                }).append(
                    $('<i>', { class: 'fs-4 ti ti-plus' }),
                    'Realizar seguimiento'
                )
            )
        )
    );
}


function lineaBaseAction(action, id) {
    crearPeticion(urlAPI, {case: 'lineaBaseAction', data: $.param({
            idUsuario: id
        })}, (rs) => {
        if (rs.success) {
            redireccionar("../lineaBase" + action);
        } else {
            mostrarMensajeError("Intenta más tarde: " + rs.msg);
        }
    });
}