// ==================== TAB INMUEBLE ====================

function originarTabInmueble() {
    $('#form-inmueble').validate({
        rules: {
            calle: { required: true },
            numeroExterior: { required: true },
            idCodigoPostal: { required: true }
        },
        errorPlacement: function(error, element) {
            error.addClass('invalid-feedback');
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

            if (!window._idExpediente) { 
                mostrarMensajeError('Primero guarde el expediente financiero', false); 
                return; 
            }

            const data = {
                idExpediente: window._idExpediente,
                calle: $('#inmueble-calle').val(),
                numeroExterior: $('#inmueble-ext').val(),
                numeroInterior: $('#inmueble-int').val(),
                calleCruce1: $('#inmueble-cruce1').val(),
                calleCruce2: $('#inmueble-cruce2').val(),
                idCodigoPostal: $('#inmueble-cp').val(),
                colonia: $('#inmueble-colonia').val(),
            };

            loadingBtn($('#btn-guardar-inmueble'), true);
            ExpedienteAPI.saveInmuebleGarantia(data)
                .finally(() => {
                    loadingBtn($('#btn-guardar-inmueble'), false);
                });
        }
    });

    inicializarBuscadorCP('#inmueble-cp', '#inmueble-colonia', '#inmueble-municipio', '#inmueble-estado');
}

function llenarTabInmueble(inm) {
    if (!inm) return;

    $('#inmueble-calle').val(inm.calle);
    $('#inmueble-ext').val(inm.numeroExterior);
    $('#inmueble-int').val(inm.numeroInterior);
    $('#inmueble-cruce1').val(inm.calleCruce1);
    $('#inmueble-cruce2').val(inm.calleCruce2);
    $('#inmueble-colonia').val(inm.colonia);

    if (inm.codigoPostal) {
        agregarOpcionCP('#inmueble-cp', inm.codigoPostal.idCodigo, inm.codigoPostal.codigoPostal);
    }

    if (inm.municipio) {
        $('#inmueble-municipio').val(inm.municipio.nombre || inm.municipio);
    }
    if (inm.estado) {
        $('#inmueble-estado').val(inm.estado.nombre || inm.estado);
    }
}
