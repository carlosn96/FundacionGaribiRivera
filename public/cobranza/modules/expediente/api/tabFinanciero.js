// ==================== TAB FINANCIERO ====================

function originarTabFinanciero() {
    $('#montoSolicitado').on('input', function () {
        const val = parseFloat($(this).val()) || 0;
        $('#resumen-monto').text(toMoneda(val));
        $('#resumen-aprobado').val(val);
        calcularMensualidades();
    });
    $('#cantidadDocumentosElaborados').on('input', function () {
        $('#resumen-mensualidades').text($(this).val() || 0);
        calcularMensualidades(true);
    });
    $('#montoDocumento').on('input', () => calcularMensualidades(false));
    $('#fechaEntrega').on('change', () => calcularFechas());

    // Listeners para secciones secundarias
    $('#cantidadDocumentosExtraElaborados, #montoPorDocumentoExtra').on('input', () => actualizarTotalesSecundarios());
    $('#cantAportacionesSolidariasPactado, #montoAportacionSolidariaPactado').on('input', () => actualizarTotalesSecundarios());

    // Botón Eliminar Expediente
    $('#btn-eliminar-expediente').on('click', function() {
        mostrarMensajeThen(
            "¿Eliminar expediente completo?",
            "warning",
            "Esta acción borrará la información financiera, el aval, el inmueble y el resumen ejecutivo. Esta acción no se puede deshacer.",
            () => {
                loadingBtn($(this), true);
                ExpedienteAPI.deleteExpediente(window._idEmprendedor).finally(() => {
                    loadingBtn($(this), false);
                });
            },
            {
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar todo",
                cancelButtonText: "Cancelar",
                confirmButtonColor: "#d33"
            }
        );
    });

    // Configurar validación personalizada para la suma de montos
    $.validator.addMethod("montoTotalValido", function(value, element) {
        const solicitado = parseFloat($('#montoSolicitado').val()) || 0;
        const totalMensualidades = parseFloat($('#totalMensualidades').val()) || 0;
        const totalExtras = parseFloat($('#totalExtras').val()) || 0;
        
        // Usamos una tolerancia pequeña para errores de punto flotante
        return Math.abs(solicitado - (totalMensualidades + totalExtras)) < 0.01;
    }, "La suma de mensualidades y extras debe ser igual al monto solicitado.");

    $('#form-expediente').validate({
        rules: {
            montoSolicitado: { required: true, min: 0.01 },
            cantidadDocumentosElaborados: { required: true, min: 1 },
            // Aplicamos la validación custom a uno de los campos que afecta la suma
            montoDocumento: { montoTotalValido: true }
        },
        messages: {
            montoSolicitado: "Ingrese un monto válido",
            cantidadDocumentosElaborados: "Debe haber al menos 1 mensualidad",
            montoDocumento: "La suma de pagos no coincide con el monto solicitado"
        },
        errorPlacement: function(error, element) {
            error.addClass('invalid-feedback');
            // Insertamos el error después del elemento actual
            error.insertAfter(element);
        },
        highlight: function(element) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function(element) {
            $(element).removeClass('is-invalid');
        },
        submitHandler: function (form, e) {
            e.preventDefault();
            e.stopPropagation();

            const formData = {
                idEmprendedor: window._idEmprendedor,
                numeroExpediente: $('#numeroExpediente').val(),
                montoSolicitado: $('#montoSolicitado').val(),
                fechaInicio: $('#fechaInicio').val(),
                fechaTermino: $('#fechaTermino').val(),
                cantidadDocumentosElaborados: $('#cantidadDocumentosElaborados').val(),
                cantidadDocumentosExtraElaborados: $('#cantidadDocumentosExtraElaborados').val() || 0,
                montoDocumento: $('#montoDocumento').val() || 0,
                montoPorDocumentoExtra: $('#montoPorDocumentoExtra').val() || 0,
                cantAportacionesSolidariasPactado: $('#cantAportacionesSolidariasPactado').val() || 0,
                montoAportacionSolidariaPactado: $('#montoAportacionSolidariaPactado').val() || 0
            };

            loadingBtn($('#btn-guardar'), true);
            ExpedienteAPI.saveExpediente(formData, (res) => {
                mostrarResultadoApi(res);
                if (res && (res.status === 'success' || res.status === 200 || res.status === 201)) {
                    if (res.data && res.data.expediente) {
                        window._idExpediente = res.data.expediente.idExpediente;
                        $('#num-expediente-header').text($('#numeroExpediente').val() || '—');
                        $('#btn-eliminar-expediente').removeClass('d-none');
                        $('#header-danger-zone').removeClass('d-none');
                    }
                }
            }).finally(() => {
                loadingBtn($('#btn-guardar'), false);
            });
        }
    });
}

function llenarTabFinanciero(expediente) {
    if (expediente) {
        $('#btn-eliminar-expediente').removeClass('d-none');
        $('#header-danger-zone').removeClass('d-none');
    } else {
        $('#btn-eliminar-expediente').addClass('d-none');
        $('#header-danger-zone').addClass('d-none');
    }

    $('#numeroExpediente').val(expediente?.numeroExpediente || '');
    $('#num-expediente-header').text(expediente?.numeroExpediente || '—');
    $('#montoSolicitado').val(expediente?.montoSolicitado).trigger('input');
    $('#fechaInicio').val(expediente?.fechaInicio);
    $('#fechaTermino').val(expediente?.fechaTermino);
    $('#cantidadDocumentosElaborados').val(expediente?.cantidadDocumentosElaborados).trigger('input');
    $('#cantidadDocumentosExtraElaborados').val(expediente?.cantidadDocumentosExtraElaborados);
    $('#montoDocumento').val(expediente?.montoDocumento);
    $('#montoPorDocumentoExtra').val(expediente?.montoPorDocumentoExtra);
    $('#cantAportacionesSolidariasPactado').val(expediente?.cantAportacionesSolidariasPactado);
    $('#montoAportacionSolidariaPactado').val(expediente?.montoAportacionSolidariaPactado);
    $('#resumen-aprobado').val(expediente?.montoSolicitado);
    actualizarTotalesSecundarios();
}

function calcularMensualidades(recalcularMonto = true) {
    const total = parseFloat($('#montoSolicitado').val()) || 0;
    const cant = parseInt($('#cantidadDocumentosElaborados').val()) || 0;
    if (cant > 0) {
        let montoMensual = parseFloat($('#montoDocumento').val()) || 0;
        if (recalcularMonto) {
            montoMensual = Math.floor(total / cant);
            $('#montoDocumento').val(montoMensual);
        }
        const subtotal = montoMensual * cant;
        $('#totalMensualidades').val(subtotal.toFixed(2));
        const residuo = parseFloat((total - subtotal).toFixed(2));
        if (residuo > 0) {
            $('#cantidadDocumentosExtraElaborados').val(1);
            $('#montoPorDocumentoExtra').val(residuo);
        } else {
            $('#cantidadDocumentosExtraElaborados').val(0);
            $('#montoPorDocumentoExtra').val(0);
        }
    } else {
        if (recalcularMonto) $('#montoDocumento').val(0);
        $('#totalMensualidades').val('0.00');
        $('#cantidadDocumentosExtraElaborados').val(0);
        $('#montoPorDocumentoExtra').val(0);
    }
    calcularFechas();
    actualizarTotalesSecundarios();
}

/**
 * Calcula los subtotales de las secciones de extras y aportaciones
 */
function actualizarTotalesSecundarios() {
    // Cálculo de Extras
    const valCantExtras = $('#cantidadDocumentosExtraElaborados').val();
    const valMontoExtra = $('#montoPorDocumentoExtra').val();
    
    if (valCantExtras !== '' && valMontoExtra !== '') {
        const cantExtras = parseInt(valCantExtras) || 0;
        const montoExtra = parseFloat(valMontoExtra) || 0;
        $('#totalExtras').val((cantExtras * montoExtra).toFixed(2));
    } else {
        $('#totalExtras').val('0.00');
    }

    // Cálculo de Aportaciones
    const valCantApor = $('#cantAportacionesSolidariasPactado').val();
    const valMontoApor = $('#montoAportacionSolidariaPactado').val();

    if (valCantApor !== '' && valMontoApor !== '') {
        const cantApor = parseInt(valCantApor) || 0;
        const montoApor = parseFloat(valMontoApor) || 0;
        $('#totalAportaciones').val((cantApor * montoApor).toFixed(2));
    } else {
        $('#totalAportaciones').val('0.00');
    }
}

function calcularFechas() {
    const dEntregaStr = $('#fechaEntrega').val();
    if (!dEntregaStr) return;
    const dInicio = new Date(dEntregaStr + 'T12:00:00');
    dInicio.setMonth(dInicio.getMonth() + 1);
    const cantNormales = parseInt($('#cantidadDocumentosElaborados').val()) || 0;
    const cantExtras = parseInt($('#cantidadDocumentosExtraElaborados').val()) || 0;
    const totalPagos = cantNormales + cantExtras;
    if (totalPagos > 0) {
        const dTermino = new Date(dInicio.getTime());
        dTermino.setMonth(dTermino.getMonth() + (totalPagos - 1));
        $('#fechaInicio').val(formatearFechaIso(dInicio));
        $('#fechaTermino').val(formatearFechaIso(dTermino));
    } else {
        $('#fechaInicio').val(formatearFechaIso(dInicio));
        $('#fechaTermino').val('');
    }
}
