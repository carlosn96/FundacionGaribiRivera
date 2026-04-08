// ==================== TAB AVAL ====================

function originarTabAval() {
    $('#form-aval').validate({
        rules: {
            nombreCompleto: { required: true },
            idParentesco: { required: true },
            edad: { required: true, min: 1, max: 120 },
            celular: { required: true, minlength: 10 },
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
                nombreCompleto: $('#aval-nombre').val(),
                edad: $('#aval-edad').val(),
                idParentesco: $('#aval-parentesco').val(),
                celular: $('#aval-celular').val(),
                telFijo: $('#aval-telfijo').val(),
                calle: $('#aval-calle').val(),
                numeroExterior: $('#aval-ext').val(),
                numeroInterior: $('#aval-int').val(),
                calleCruce1: $('#aval-cruce1').val(),
                calleCruce2: $('#aval-cruce2').val(),
                idCodigoPostal: $('#aval-cp').val(),
                colonia: $('#aval-colonia').val(),
            };

            loadingBtn($('#btn-guardar-aval'), true);
            ExpedienteAPI.saveAval(data, (res) => {
                mostrarResultadoApi(res);
            }).finally(() => {
                loadingBtn($('#btn-guardar-aval'), false);
            });
        }
    });

    inicializarMascarasTelefono('#aval-celular, #aval-telfijo');
    inicializarBuscadorCP('#aval-cp', '#aval-colonia', '#aval-municipio', '#aval-estado');
}

function llenarCatalogosAval(items) {
    const selectorItems = (items && items.data) ? items.data : items;
    const $temp = crearSelector(null, null, selectorItems || []);
    $('#aval-parentesco').html($temp.html());
}

function llenarTabAval(aval) {
    if (!aval) return;

    $('#aval-nombre').val(aval.nombreCompleto);
    $('#aval-edad').val(aval.edad);
    $('#aval-parentesco').val(aval.idParentesco);
    $('#aval-celular').val(aval.celular);
    $('#aval-telfijo').val(aval.telFijo);
    $('#aval-calle').val(aval.calle);
    $('#aval-ext').val(aval.numeroExterior);
    $('#aval-int').val(aval.numeroInterior);
    $('#aval-cruce1').val(aval.calleCruce1);
    $('#aval-cruce2').val(aval.calleCruce2);
    $('#aval-colonia').val(aval.colonia);

    if (aval.codigoPostal) {
        agregarOpcionCP('#aval-cp', aval.codigoPostal.idCodigo, aval.codigoPostal.codigoPostal);
    }

    if (aval.municipio) {
        $('#aval-municipio').val(aval.municipio.nombre || aval.municipio);
    }
    if (aval.estado) {
        $('#aval-estado').val(aval.estado.nombre || aval.estado);
    }
}
