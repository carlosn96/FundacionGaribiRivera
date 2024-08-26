const urlAPI = "api/SeguimientoCasoAPI.php";
function ready() {
    crearPeticion(urlAPI, {case: "recuperarEmprendedores"}, function (res) {
        if (res.length) {
            var dataTabla = [];
            $.each(res, (i, emprendedor) => {
                dataTabla.push({
                    "No.": emprendedor.idLineaBase,
                    "Etapa": emprendedor.etapa,
                    "Nombre": emprendedor.nombre,
                    "Apellidos": emprendedor.apellidos,
                    "Correo electrónico": emprendedor.correo
                });
            });
            print(dataTabla);
            var $tabla = construirTablaDataTable(dataTabla, "table-striped table-bordered display text-nowrap", "tablaEmprendedoresContenedor", "tablaEmprendedores");
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

                print(idLineaBase);
                crearPeticion(urlAPI, {case: "recuperarSeguimientoCaso", data: `idLineaBase=${idLineaBase}`}, (rs) => {
                    print(rs);
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
