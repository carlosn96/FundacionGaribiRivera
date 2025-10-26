
const urlAPI = "api/SeguimientoGraduadoAPI.php";

function ready() {
    bloquearSeccion($("#contenido"));
    crearPeticion(urlAPI, { case: "recuperarCamposInformacion" }, (rs) => {
        //print(rs);
        if (rs.lineaBase.existeLineaBase) {
            completarInfoEmprendedor(rs.emprendedor);
            completarCamposFormulario(rs);
        } else {
            mostrarMensajeInfo("Sin información disponible de la Linea Base", false, () => {
                redireccionar("../historialEmprendedores");
            });
        }
    });
}

function completarInfoEmprendedor(emprendedor) {
    $("#idEmprendedor").val(emprendedor.idEmprendedor);
    $("#fotografiaEmprendedor").prop("src", "data:image/jpeg;base64," + emprendedor.fotografia);
    $("#nombreEmprendedor").text(emprendedor.nombre + " " + emprendedor.apellidos);
}

function completarCamposFormulario(rs) {
    const esSeguimiento = rs.seguimientoGraduado.existeSeguimientoGraduado;
    let data = esSeguimiento ? rs.seguimientoGraduado.data : rs.lineaBase.data;
    $('#data-source-badge').append(esSeguimiento ? 'Seguimiento de Graduado' : 'Línea Base');
    $("#btn-descargar-seguimiento").click(descargarSeguimiento);
    $("#btn-eliminar-seguimiento").click(eliminarSeguimiento);
    if (esSeguimiento) {
        $('#seguimiento-toolbar').show();
    }

    $("#fecha").append(" " + data.fechaCreacion);
    $.each(rs.checkbox, (idx, elementos) => {
        crearGroupCheckbox($("#" + idx), elementos, idx);
    });
    $.each(rs.radio, (idx, elementos) => {
        crearGroupRadio($("#" + idx), elementos, idx);
    });
    $("#objetivosAhorro").attr("required", false);
    configurarSeccionAnalisisNegocio(data);
    desbloquearSeccion($("#contenido"));
}

function enviarForm() {
    const formData = crearFormData($("#lineaBaseForm"));
    formData.append("case", "guardar");
    crearPeticion(urlAPI, formData);
}

function configurarSeccionAnalisisNegocio(lineaBase) {
    let administracionIngresos = lineaBase.administracionIngresos;
    let analisisNegocio = lineaBase.analisisNegocio;

    if (analisisNegocio !== undefined) {
        // Registro de entradas y salidas
        $(`#registros${analisisNegocio.registraEntradaSalida.val === 1 ? 'Si' : 'No'}`).prop('checked', true);
        // Sueldo mensual
        $("#sueldoMensual").val(administracionIngresos.sueldoMensual);
        // Utilidades mensuales
        $("#utilidadesMensuales").val(administracionIngresos.montoMensualUtilidades);
        // Identificación de la competencia
        if (analisisNegocio.competencia.identifica.val === 1) {
            $(`#competenciaSi`).prop('checked', true);
            $("#competenciaField").prop("hidden", false);
            $("#quienCompetencia").val(analisisNegocio.competencia.quien);
        }
        $('input[name="identificaCompetencia"]').change(function () {
            let deshabilitar = $(this).val() !== "1";
            $("#competenciaField").prop("hidden", deshabilitar);
            $("#quienCompetencia").attr("disabled", deshabilitar);
        });
        // Estrategias para incrementar ventas
        if (analisisNegocio.listaEstrategiaVentas.length !== 0) {
            analisisNegocio.listaEstrategiaVentas.forEach(item => {
                $(`#estrategiasIncrementarVentas${item.idEstrategia}`).prop('checked', true);
            });
        } else {
            $(`#noSeComoResponderEstrategias`).prop('checked', true);
        }

        analisisNegocio.listaEmpleoGanancias.forEach(item => {
            $('#comoEmpleaGanancias' + item.idEmpleoGanancia).prop('checked', true);
        });

        // Conocimiento de productos de mayor utilidad
        if (analisisNegocio.conoceProductosMayorUtilidad.conoce.val === 1) {
            $(`#conoceProductosMayorUtilidadSi`).prop('checked', true);
            $("#utilidadProductosField").prop("hidden", false);
            $("#porcentajeGanancias").val(analisisNegocio.conoceProductosMayorUtilidad.porcentaje);
        }
        $('input[name="conoceProductosMayorUtilidad"]').change(function () {
            let deshabilitar = $(this).val() !== "1";
            $("#utilidadProductosField").prop("hidden", deshabilitar);
            $("#porcentajeGanancias").attr("disabled", deshabilitar);
        });
        // Asigna ahorro
        if (analisisNegocio.ahorro.asigna.val === 1) {
            $(`#ahorroSi`).prop('checked', true);
            $("#cuantoAhorroField").prop("hidden", false);
            $("#cuantoAhorro").val(analisisNegocio.ahorro.detalles);
            $("#razonesNoAhorroField").prop("hidden", true);
        } else {
            $("#razonesNoAhorro").val(analisisNegocio.ahorro.detalles);
        }
        $('input[name="ahorro"]').change(function () {
            let tieneAhorro = $(this).val() !== "0";
            $("#cuantoAhorroField").prop("hidden", !tieneAhorro);
            $("#cuantoAhorro").attr("disabled", !tieneAhorro);
            $("#razonesNoAhorroField").prop("hidden", tieneAhorro);
            $("#razonesNoAhorro").attr("disabled", tieneAhorro);
        });

        // Conoce punto de equilibrio
        $(`#conocePuntoEquilibrio${analisisNegocio.conoceUtilidades.val === 1 ? 'Si' : 'No'}`).prop('checked', true);
        // Separas los gastos del negocio de tus gastos personales
        $(`#separaGastos${analisisNegocio.separaGastos.val === 1 ? 'Si' : 'No'}`).prop('checked', true);
        // Elabora presupuesto
        $(`#elaboraPresupuesto${analisisNegocio.elaboraPresupuesto.val === 1 ? 'Si' : 'No'}`).prop('checked', true);
    }
}

function descargarSeguimiento() {
    redireccionar("../seguimientoGraduadoDescargar");
}

function eliminarSeguimiento() {
    alertaEliminar({
        mensajeAlerta: "Se tendrá que registrar un nuevo seguimiento",
        url: urlAPI,
        data: {
            case: "eliminarSeguimiento",
            data: $.param({ emprendedor: $("#idEmprendedor").val() })
        }
    });
}
