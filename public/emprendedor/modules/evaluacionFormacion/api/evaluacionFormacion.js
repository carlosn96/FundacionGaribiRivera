const urlAPI = "api/EvaluacionFormacionAPI.php";
function ready() {
    crearPeticion(urlAPI, {case: "recuperarEvaluacion"}, (res) => {
        let hayEvaluacion = res.evaluacion.length !== 0;
        if (res.existeLineaBase) {
            if (hayEvaluacion) { // Hay evaluacion, redirigir a la vista
                redireccionar("../evaluacionFormacionVista/");
            } else { // No hay evaluacion todavia, realizar evaluacion
                recuperarCamposFormulario(res.camposFormulario);
                configurarEventos();
                $("#main-content").removeAttr("hidden");
            }
        } else {
            mostrarMensajeInfo("Sin información disponible de la Linea Base. Debes realizarla antes de evaluar la formación recibida.", false, () => {
                redireccionar("../lineaBase");
            });
        }
    });
}

function configurarEventos() {
    $('#ventasMensuales, #gastosMensuales').on('input', () => {
        var ventas = parseFloat($('#ventasMensuales').val()) || 0;
        var gastos = parseFloat($('#gastosMensuales').val()) || 0;
        var utilidades = ventas - gastos;
        $('#utilidadesMensuales').val(utilidades);
    });

    $('input[name="huboBeneficioPersonal"]').change(function () {
        $('#beneficiosObtenidos').prop('disabled', !($(this).val() === '1'));
    });

    $('input[name="cuentaConSistemaAhorro"]').change(function () {
        var isEnabled = $(this).val() === '1';
        $('#detallesSistemaAhorro, input[name="objetivosAhorro[]"], #ahorroMensual').prop('disabled', !isEnabled);
    });
}

function enviarForm() {
    crearPeticion(urlAPI, {
        case: "guardarEvaluacion",
        data: $("#evaluacionForm").serialize()
    });
}

function recuperarCamposFormulario(camposFormulario) {
    print(camposFormulario);
    $.each(camposFormulario, (group, opciones) => {
        crearGroupCheckbox($("#" + group), opciones, group);
    });
}
