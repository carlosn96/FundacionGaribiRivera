class ExpedienteController {
    static prefix = 'cobranza/expediente';

    static async getPerfilEmprendedor(id) {
        return await apiRequest('emprendedor/perfil/' + id, 'GET');
    }
    
    static async saveExpediente(data) {
        return await apiRequest(this.prefix, 'POST', data);
    }
}


async function ready() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (!id) {
        mostrarMensajeError('ID de emprendedor no especificado');
        return;
    }

    inicializarEventos();
    
    try {
        const responsePerfil = await ExpedienteController.getPerfilEmprendedor(id);
        // Los recursos de la API (Resources) devuelven un objeto envuelto en la propiedad 'data'
        const perfil = (responsePerfil && responsePerfil.data) ? responsePerfil.data : responsePerfil;
        
        llenarInformacion(perfil, perfil.expediente);
    } catch (error) {
        console.error(error);
        mostrarMensajeError('Error al cargar la información del expediente');
    }
}

function inicializarEventos() {
    $('#btn-cancelar').on('click', () => {
        window.location.href = '../inicio/';
    });

    // Inicializar jQuery Validation formalmente
    $('#form-expediente').validate({
        submitHandler: function(form, event) {
            event.preventDefault(); // Bloquear el evento nativo del navegador

            // Lógica asíncrona encapsulada
            (async () => {
                const urlParams = new URLSearchParams(window.location.search);
                const id = urlParams.get('id');
                
                // Recolectar datos del formulario
                const formData = {
                    id_emprendedor: id,
                    montoSolicitado: $('#montoSolicitado').val(),
                    fechaEntrega: $('#fechaEntrega').val(),
                    fechaInicio: $('#fechaInicio').val(),
                    fechaTermino: $('#fechaTermino').val(),
                    cantidadDocumentosElaborados: $('#cantidadDocumentosElaborados').val(),
                    cantidadDocumentosExtraElaborados: $('#cantidadDocumentosExtraElaborados').val() || 0,
                    montoDocumento: $('#montoDocumento').val() || 0,
                    montoPorDocumentoExtra: $('#montoPorDocumentoExtra').val() || 0,
                    cantAportacionesSolidariasPactado: $('#cantAportacionesSolidariasPactado').val() || 0,
                    montoAportacionSolidariaPactado: $('#montoAportacionSolidariaPactado').val() || 0
                };

                try {
                    loadingBtn($('#btn-guardar'), true);
                    const response = await ExpedienteController.saveExpediente(formData);
                    
                    if (response && (response.status === 200 || response.status === 201)) {
                        mostrarMensajeOk(response.message || 'Expediente guardado correctamente');
                    } else {
                        mostrarMensajeError(response.message || 'Error al guardar el expediente');
                    }
                } catch (error) {
                    console.error(error);
                    mostrarMensajeError('Ocurrió un error al procesar la solicitud');
                } finally {
                    loadingBtn($('#btn-guardar'), false);
                }
            })();
        }
    });

    // Actualizar resumen en tiempo real
    $('#montoSolicitado').on('input', function() {
        const val = parseFloat($(this).val()) || 0;
        $('#resumen-monto').text(toMoneda(val));
        calcularMensualidades();
    });

    $('#cantidadDocumentosElaborados').on('input', function() {
        const val = $(this).val() || 0;
        $('#resumen-mensualidades').text(val);
        calcularMensualidades(true); // true = recalculate montoDocumento
    });

    $('#montoDocumento').on('input', function() {
        calcularMensualidades(false); // false = keep existing montoDocumento, only calc residual
    });

    $('#fechaEntrega').on('change', function() {
        calcularFechas();
    });
}

function calcularMensualidades(recalcularMonto = true) {
    const total = parseFloat($('#montoSolicitado').val()) || 0;
    const cant = parseInt($('#cantidadDocumentosElaborados').val()) || 0;

    if (cant > 0) {
        let montoMensual = parseFloat($('#montoDocumento').val()) || 0;
        
        if (recalcularMonto) {
            // Sugerimos un monto mensual base (piso)
            montoMensual = Math.floor(total / cant);
            $('#montoDocumento').val(montoMensual);
        }

        const subtotal = montoMensual * cant;
        const residuo = parseFloat((total - subtotal).toFixed(2));

        if (residuo > 0) {
            $('#cantidadDocumentosExtraElaborados').val(1);
            $('#montoPorDocumentoExtra').val(residuo);
        } else if (residuo < 0) {
            // Si el subtotal excede el total, indicamos el error o ajustamos
            // Por ahora, ajustamos el monto extra a 0 (aunque la suma no cuadre, el usuario debe ajustar)
            $('#cantidadDocumentosExtraElaborados').val(0);
            $('#montoPorDocumentoExtra').val(0);
        } else {
            $('#cantidadDocumentosExtraElaborados').val(0);
            $('#montoPorDocumentoExtra').val(0);
        }
    } else {
        if (recalcularMonto) $('#montoDocumento').val(0);
        $('#cantidadDocumentosExtraElaborados').val(0);
        $('#montoPorDocumentoExtra').val(0);
    }

    calcularFechas();
}

function calcularFechas() {
    const dEntregaStr = $('#fechaEntrega').val();
    if (!dEntregaStr) return;

    // Crear fecha forzando la hora local al mediodía para evitar saltos de día por huso horario
    const dInicio = new Date(dEntregaStr + 'T12:00:00');
    
    // Fecha inicio = entregar + 1 mes
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

function formatearFechaIso(dateObj) {
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}



function llenarInformacion(perfil, expediente) {
    if (perfil) {
        $('#nombre').val(perfil.nombre);
        $('#apellidos').val(perfil.apellidos);
        $('#referencia').val(perfil.referencia || 'N/A');
        $('#telefono').val(perfil.telefono);
        
        $('#nombre-completo-sidebar').text(`${perfil.nombre} ${perfil.apellidos}`);
        $('#referencia-sidebar').text(perfil.referencia || 'Sin Expediente');
        
        if (perfil.usuario.fotografia_base64) {
            $('#foto-emprendedor').attr('src', 'data:image/png;base64,' + perfil.usuario.fotografia_base64).removeClass('d-none');
            $('#icono-usuario').addClass('d-none');
        }
    }

    if (expediente) {
        $('#montoSolicitado').val(expediente.montoSolicitado).trigger('input');
        $('#fechaEntrega').val(expediente.fechaEntrega);
        $('#fechaInicio').val(expediente.fechaInicio);
        $('#fechaTermino').val(expediente.fechaTermino);
        $('#cantidadDocumentosElaborados').val(expediente.cantidadDocumentosElaborados).trigger('input');
        $('#cantidadDocumentosExtraElaborados').val(expediente.cantidadDocumentosExtraElaborados);
        $('#montoDocumento').val(expediente.montoDocumento);
        $('#montoPorDocumentoExtra').val(expediente.montoPorDocumentoExtra);
        $('#cantAportacionesSolidariasPactado').val(expediente.cantAportacionesSolidariasPactado);
        $('#montoAportacionSolidariaPactado').val(expediente.montoAportacionSolidariaPactado);

        // Habilitar acceso directo de pagos al existir el expediente
        const urlParams = new URLSearchParams(window.location.search);
        $('#link-pagos').attr('href', `../pagos/?id=${urlParams.get('id')}`);
        $('#panel-acceso-pagos').removeClass('d-none');
    }
}



