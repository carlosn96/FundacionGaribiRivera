// ==================== MAIN ====================

// ==================== Estado global ====================
window._idEmprendedor = null;
window._idExpediente = null;

// ==================== READY ====================
async function ready() {
    const urlParams = new URLSearchParams(window.location.search);
    window._idEmprendedor = urlParams.get('id');

    if (!window._idEmprendedor) {
        redireccionar('../inicio/');
        return;
    }

    originarEventosGenerales();

    // Inicializar tabs con dependencias encapsuladas
    originarTabFinanciero();
    originarTabAval();
    originarTabInmueble();
    originarTabResumen();

    const catalogsNames = ['parentesco', 'viabilidades', 'diagnostico-social', 'vulnerabilidades'];

    try {
        const [resPerfil, ...catalogResponses] = await Promise.all([
            ExpedienteAPI.getPerfilEmprendedor(window._idEmprendedor, r => r),
            ...catalogsNames.map(name => ExpedienteAPI.getCatalogo(name, r => r))
        ]);

        const perfil = resPerfil?.data || resPerfil;
        const [resParentescos, resViab, resDiag, resVuln] = catalogResponses;

        if (!perfil) throw new Error('No se pudo cargar el perfil del emprendedor');

        // Si no tiene referencia o fecha de crédito, pedir completar obligatoriamente
        if (!perfil.fechaCredito || !perfil.referencia) {
            const { nombre = '', apellidos = '' } = perfil.usuario || {};
            $('#nombreEmprendedorRef').text(`${nombre} ${apellidos}`);
            $('#numeroReferencia').val(perfil.referencia || '');
            $('#fechaOtorgamiento').val(perfil.fechaCredito || '');
            $('#modalActualizarReferencia').modal("show");
            return;
        }

        const expediente = perfil.expediente || null;
        if (expediente) {
            window._idExpediente = expediente.idExpediente;
        }

        // Llenar catálogos
        llenarCatalogosAval(resParentescos);
        llenarCatalogosResumen(resViab, resDiag, resVuln);

        llenarDashboardGeneral(perfil, expediente);
    } catch (error) {
        console.error('Error al inicializar expediente:', error);
        mostrarMensajeError('Error al cargar la información del expediente');
    }
}

// ==================== FUNCIONALIDADES GLOBALES ====================

function originarEventosGenerales() {
    // Volver
    $('#btn-cancelar').on('click', () => window.location.href = '../inicio/');

    // Modal Referencia Inicial
    $('#btn-cancelar-modal').on('click', () => window.location.href = '../inicio/');
    $('#form-actualizar-referencia').on('submit', function (e) {
        e.preventDefault();
        const data = {
            idEmprendedor: window._idEmprendedor,
            referencia: $('#numeroReferencia').val(),
            fechaOtorgamiento: $('#fechaOtorgamiento').val()
        };
        
        loadingBtn($('#btnGuardarReferencia'), true);
        ExpedienteAPI.actualizarReferencia(data)
            .finally(() => {
                loadingBtn($('#btnGuardarReferencia'), false);
            });
    });

    // Eventos de Pagaré y Contrato
    $('#link-pagare').on('click', function() {
        if ($(this).css('pointer-events') !== 'none') {
            window.location.href = `../pagare/?id=${window._idEmprendedor}`;
        }
    });

    $('#link-contrato').on('click', function() {
        if ($(this).css('pointer-events') !== 'none') {
            window.location.href = `../contrato/?id=${window._idEmprendedor}`;
        }
    });

    $('#link-tarjeta').on('click', function() {
        if ($(this).css('pointer-events') !== 'none') {
            const urlApi = `${window.location.protocol}//${window.location.host}${getBasePath()}/api`;
            window.open(`${urlApi}/cobranza/imprimir-tarjeta-pagos/${window._idEmprendedor}`, '_blank');
        }
    });
}

function llenarDashboardGeneral(perfil, expediente) {
    llenarHeader(perfil);
    llenarDomiciliosInfo(perfil);

    if (perfil.fechaCredito) {
        $('#fechaEntrega').val(perfil.fechaCredito).trigger('change');
    }

    if (expediente) {
        // Link de pagos
        $('#link-pagos').attr('href', `../pagos/?id=${window._idEmprendedor}`).removeClass('d-none');
        
        // Carga modular por tabs
        llenarTabFinanciero(expediente);
        
        if (expediente.aval) {
            llenarTabAval(expediente.aval);
        }
        if (expediente.inmuebleGarantia) {
            llenarTabInmueble(expediente.inmuebleGarantia);
        }
        if (expediente.resumenEjecutivo) {
            llenarTabResumen(expediente.resumenEjecutivo);
        }

        // Habilitación de Pagaré y Contrato (Si todo está completo)
        const isComplete = expediente && expediente.aval && expediente.inmuebleGarantia && expediente.resumenEjecutivo;
        const $badges = $('#badge-pagare, #badge-contrato, #badge-tarjeta');
        
        if (isComplete) {
            $('#link-pagare, #link-contrato, #link-tarjeta').css({ 
                'opacity': '1', 
                'pointer-events': 'auto',
                'cursor': 'pointer'
            });
            $badges.text('Disponible')
                .removeClass('status-badge--secondary')
                .addClass('status-badge--success');
        } else {
            $badges.text('Bloqueado')
                .removeClass('status-badge--success')
                .addClass('status-badge--secondary');
        }
    }
}

function llenarHeader(perfil) {
    const { usuario = {}, referencia = '—', etapa = {} } = perfil;
    const { nombre = '', apellidos = '', numeroCelular = '—', fotografiaBase64 } = usuario;

    $('#nombre-completo-header').text(`${nombre} ${apellidos}`);
    $('#referencia-header').text(referencia);
    $('#telefono-header').text(numeroCelular);

    if (etapa.nombre) {
        $('#badge-etapa').text(`Etapa ${etapa.nombre}`);
    }

    if (fotografiaBase64) {
        $('#foto-emprendedor').attr('src', `data:image/png;base64,${fotografiaBase64}`).removeClass('d-none');
        $('#icono-usuario').addClass('d-none');
    }
}

function llenarDomiciliosInfo(perfil) {
    const fill = (prefix, d) => {
        if (!d) return;
        $(`#dom-${prefix}-calle`).text(d.calle || '—');
        $(`#dom-${prefix}-ext`).text(d.numeroExterior || '—');
        $(`#dom-${prefix}-int`).text(d.numeroInterior || '—');
        $(`#dom-${prefix}-cruces`).text([d.calleCruce1, d.calleCruce2].filter(Boolean).join(' y ') || '—');
        $(`#dom-${prefix}-cp`).text(d.codigoPostal?.codigoPostal || '—');
        $(`#dom-${prefix}-colonia`).text(d.colonia || '—');
        $(`#dom-${prefix}-municipio`).text(d.municipio?.nombre || d.municipio || '—');
        $(`#dom-${prefix}-estado`).text(d.estado?.nombre || d.estado || '—');
    };

    fill('personal', perfil.domicilioPersonal);
    
    if (perfil.domicilioNegocio) {
        const n = perfil.domicilioNegocio;
        $('#dom-negocio-nombre').text(n.nombreNegocio || '—');
        $('#dom-negocio-tel').text(n.telefono || '—');
        fill('negocio', n);
    }
}
