const urlAPI = "api/SeguimientoCasoAPI.php";
function ready() {
    crearPeticion(urlAPI, {case: "recuperarEmprendedores"}, function (res) {
        if (res.emprendedores.length) {
            var dataTabla = [];
            $.each(res.emprendedores, (i, emprendedor) => {
                dataTabla.push({
                    "No.": emprendedor.idLineaBase,
                    "Etapa": generarListaEtapas(emprendedor.idEtapa, res.etapas, emprendedor.idLineaBase),
                    "Nombre": emprendedor.nombre,
                    "Apellidos": emprendedor.apellidos,
                    "Correo electrónico": emprendedor.correo
                });
            });

            //print(dataTabla);
            var $tabla = construirTablaDataTable(dataTabla, "table-bordered text-nowrap", "tablaEmprendedoresContenedor", "tablaEmprendedores", "");
            $("#tablaEmprendedores tbody").on("click", "select", function (event) {
                event.stopPropagation();
            });
            $("#tablaEmprendedores tbody").on("change", "select", function () {
                const $select = $(this); // El selector que disparó el evento
                const selectedValue = $select.val(); // Obtener el valor seleccionado
                const id = $select.attr("data-id-linea-base");
                crearPeticion(urlAPI, {case: "actualizarEtapa", data: $.param({id: id, val: selectedValue})}, (res) => {
                    let mensaje = res.es_valor_error ? "Error: No se pudo actualizar la etapa." : "Etapa actualizada correctamente.";
                    const $alert = $(`
        <div class="alert ${res.es_valor_error ? 'alert-danger' : 'alert-info'} alert-dismissible fade show" role="alert">
            <strong>${res.es_valor_error ? 'Error -' : 'Info -'}</strong> ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `);
                    $('#contenedorDeAlertas').append($alert);
                    setTimeout(() => {
                        $alert.alert('close');
                    }, 5000); // 5 segundos
                });
            });
            $("#tablaEmprendedores tbody").on("click", "tr", function () {
                var $areaTabla = $("#tablaEmprendedores");
                $areaTabla.block({
                    message: '<i class="ti ti-refresh text-warning fs-5"></i>',
                    overlayCSS: {
                        backgroundColor: "#000",
                        opacity: 0.5,
                        cursor: "wait"
                    },
                    css: {
                        border: 0,
                        padding: 0,
                        backgroundColor: "transparent"
                    }
                });
                const data = $tabla.row(this).data();
                const [idLineaBase, titulo, nombre, apellido, email] = data;

                //print(idLineaBase);
                crearPeticion(urlAPI, {case: "recuperarSeguimientoCaso", data: `idLineaBase=${idLineaBase}`}, (rs) => {
                    //print(rs);
                    const emprendedor = encodeURIComponent(JSON.stringify(data));
                    const $btnSeguimiento = $("#btnDarSeguimiento");
                    const $btnEliminarSeguimiento = $("#btnEliminarSeguimiento");
                    const seguimientoExistente = Array.isArray(rs.seguimientoCaso);
                    const textBtn = seguimientoExistente ? "Hacer" : "Ver";
                    const icon = seguimientoExistente ? "ti-plus" : "ti-file-export";
                    const rsEncoded = seguimientoExistente ? '' : encodeURIComponent(JSON.stringify(rs));
                    const urlBtn = seguimientoExistente
                            ? `../seguimientoCasoNuevo/?emprendedor=${emprendedor}`
                            : `../seguimientoCasoVista/?sc=12&emprendedor=${emprendedor}`;
                    //
                    $btnSeguimiento.attr("data-bs-original-title", `${textBtn} seguimiento de caso`);
                    $btnSeguimiento.attr("href", urlBtn);
                    $btnSeguimiento.html(`<span class="ti ${icon}"></span>`);
                    $btnEliminarSeguimiento.prop("hidden", seguimientoExistente);
                    $btnEliminarSeguimiento.attr("href", `javascript:eliminarSeguimientoCaso(${rs.seguimientoCaso.idSeguimientoCaso})`);
                    $('#cardModalEmprendedorContent').html(`<p class="card-text">${email}</p>`);
                    $("#nombreEmprendedor").text(`${nombre} ${apellido}`);
                    $("#modalEmprendedor").modal('show');
                    $areaTabla.unblock();
                });
            });
        }
    });
}


function eliminarSeguimientoCaso(id) {
    alertaEliminar({
        mensajeAlerta: "Se elimininará el seguimiento de caso",
        url: urlAPI,
        data: {"case": "eliminarSeguimientoCaso", "data": "id=" + id}
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
            value: val.idEtapa, // Asignar idEtapa como valor
            text: val.nombre     // Mostrar el nombre como texto
        });
        if (val.idEtapa === etapa) {
            $option.prop('selected', true);
        }
        $selector.append($option);
    });

    return $selector;
}
