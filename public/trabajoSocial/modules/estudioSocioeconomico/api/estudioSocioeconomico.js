const urlAPI = "api/EstudioSocioeconomicoAPI.php";

function ready() {
    crearPeticion(urlAPI, {case: "recuperarEmprendedores"}, function (data) {
        construirSelectorEtapas(data.etapas);
        construirTablaEmprendedores(data);
        $("input[name='filtroEstudio']").on('change', function () {
            const filtro = $(this).val();
            crearPeticion(urlAPI, {case: "getEmprendedoresPorTipo", data: $.param({tipo: filtro})}, function (data) {  
                construirTablaEmprendedores(data);
            });
        });
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

function construirSelectorEtapas(etapas) {
    const $selector = crearSelector(null, "etapa", etapas);
    $("#selector").prepend($selector);
    $selector.val(etapas.estapaSeleccionada);
}

function construirTablaEmprendedores(data) {
    const dataTabla = data.emprendedores.map(emprendedor => {
        const nombreLink = $('<a>', {
            href: `../../../difusion/modules/actualizarEmprendedores?id=${emprendedor.idUsuario}`,
            class: 'text-primary ms-2',
            text: `${emprendedor.nombre} ${emprendedor.apellidos}`
        });

        let opciones;

        if (emprendedor.tieneES) {
            opciones = $('<div>', { class: 'dropdown w-100 d-flex justify-content-center' }).append(
                $('<button>', {
                    class: 'btn btn-outline-primary btn-sm d-flex justify-content-center w-100',
                    type: 'button',
                    'data-bs-toggle': 'dropdown',
                    'aria-expanded': 'false'
                }).append(
                    $('<i>', { class: 'ti ti-dots-vertical fs-4' })
                ),
                $('<ul>', { class: 'dropdown-menu' }).append(
                    $('<li>').append(
                        $('<a>', {
                            class: 'dropdown-item d-flex align-items-center',
                            href: `./ver/?id=${emprendedor.idUsuario}`
                        }).append(
                            $('<i>', { class: 'ti ti-eye me-2' }),
                            'Visualizar'
                        )
                    ),
                    $('<li>').append(
                        $('<a>', {
                            class: 'dropdown-item d-flex align-items-center',
                            href: `./descargar/?id=${emprendedor.idUsuario}`,
                            target: '_blank'
                        }).append(
                            $('<i>', { class: 'ti ti-download me-2' }),
                            'Descargar'
                        )
                    ),
                    $('<li>').append(
                        $('<a>', {
                            class: 'dropdown-item d-flex align-items-center',
                            href: 'javascript:void(0)'
                        }).append(
                            $('<i>', { class: 'ti ti-trash me-2' }),
                            'Eliminar'
                        ).on('click', function () {
                            eliminarEstudioSocioeconomico(emprendedor.idUsuario);
                        })
                    )
                )
            );
        } else {
            // Botón uniforme para crear
            opciones = $('<button>', {
                type: 'button',
                class: 'btn btn-outline-primary btn-sm w-100 d-flex align-items-center justify-content-center',
                "aria-label": 'Crear estudio socioeconómico',
                click: e => {
                    e.preventDefault();
                    redireccionar(`../estudioSocioeconomicoNuevo/?id=${emprendedor.idUsuario}`);
                }
            }).append(
                $('<i>', { class: 'ti ti-plus me-2' }),
                'Crear'
            );
        }

        return {
            "Etapa": emprendedor.etapa,
            "Nombre": nombreLink,
            "Opciones": opciones
        };
    });

    dataTabla.length
        ? construirTablaDataTable(dataTabla, "table-hover table-bordered", "tablaEmprendedoresContenedor", "tablaEmprendedores", "")
        : construirTablaVacia();
}


function construirTablaVacia() {
    const $tablaVacia = $('<table>', {
        class: "table table-bordered align-middle text-nowrap mb-1",
        id: "tablaEmprendedores"
    });
    const $thead = $('<thead>').append($('<tr>').append($('<th>', {text: "Etapa"}),$('<th>', {text: "Nombre"})));
    $tablaVacia.append($thead);
    $("#tablaEmprendedoresContenedor").empty().append($tablaVacia);
    crearDataTable("#tablaEmprendedores");
}

function eliminarEstudioSocioeconomico(id) {
    alertaEliminar({
        mensajeAlerta: "La información del Estudio Socioeconómico se eliminará",
        url: urlAPI,
        data: {
            case: "eliminar",
            data: $.param({id: id})
        }
    });
}
