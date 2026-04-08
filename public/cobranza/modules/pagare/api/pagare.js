// ==================== PAGARÉ API / LOGIC ====================

function ready() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        mostrarMensajeError('ID de emprendedor no proporcionado');
        return;
    }

    // Configuración botón volver
    $('#btn-volver-p').on('click', () => {
        window.location.href = `../expediente/?id=${id}`;
    });

    // Configuración botón imprimir
    $('#btn-imprimir-p').on('click', () => {
        window.print();
    });

    cargarDatosPagare(id);
};

function cargarDatosPagare(id) {
    ExpedienteAPI.getPerfilEmprendedor(id, (response) => {
        const perfil = response.data || response;
        const u = perfil.usuario || {};
        const exp = perfil.expediente || {};
        const res = exp.resumenEjecutivo || {};
        const aval = exp.aval || {};

        // 1. FRONT SIDE - PAGARÉ
        $('#pagare-expediente').text(exp.numeroExpediente || '—');
        const importeVale = parseFloat(exp.montoSolicitado || 0);
        $('#pagare-importe, #pagare-monto-num').text(formatearMoneda(importeVale));
        $('#pagare-monto-letras').text(`(${numeroALetras(importeVale).toUpperCase()})`);

        // Datos del Proyecto / Crédito
        if (perfil.fechaCredito) {
            $('#pagare-fecha-otorgamiento').text(formatearFechaLarga(perfil.fechaCredito));
        }
        
        if (exp.fechaTermino) {
            $('#pagare-vencimiento').text(formatearFechaSimple(exp.fechaTermino));
        } else {
            $('#pagare-vencimiento').text(' — — — ');
        }

        $('#pagare-interes').text(res.interesMensual || '0'); // Si hay campo de interés
        
        // Datos del Emprendedor (Otorgante)
        $('#pagare-otorgante').text(`${u.nombre || ''} ${u.apellidos || ''}`.trim());
        
        const domPersonal = perfil.domicilioPersonal || {};
        $('#pagare-domicilio').text(`${domPersonal.calle || ''} #${domPersonal.numeroExterior || ''} ${domPersonal.numeroInterior ? 'Int. ' + domPersonal.numeroInterior : ''}`.trim().replace(/^#$/, '—'));
        $('#pagare-colonia').text(domPersonal.colonia || '—');
        $('#pagare-tel').text(u.numeroCelular || '—');
        $('#pagare-localidad').text(`${domPersonal.municipio?.nombre || ''}, ${domPersonal.estado || ''}`.trim().replace(/^,\s*/, '').replace(/,\s*$/, '') || '—');

        // 2. BACK SIDE - AVAL
        if (aval.idAval) {
            $('#aval-nombre').text(aval.nombreCompleto || '—');
            $('#aval-parentesco').text((aval.parentesco ? aval.parentesco : (aval.relacionParentesco || '—')));
            $('#aval-edad').text(`${aval.edad || '—'} años`);
            $('#aval-celular').text(aval.celular || '—');
            $('#aval-telfijo').text(aval.telFijo || '—');
            
            const calleFull = `${aval.calle || ''} #${aval.numeroExterior || ''} ${aval.numeroInterior ? 'Int. ' + aval.numeroInterior : ''}`;
            $('#aval-domicilio').text(calleFull.trim().replace(/^#$/, '—'));
            const cruces = [aval.calleCruce1, aval.calleCruce2].filter(Boolean).join(' y ') || '—';
            $('#aval-cruces').text(cruces);
            $('#aval-colonia').text(aval.colonia || '—');
            $('#aval-municipio').text(aval.municipio?.nombre || '—');
            $('#aval-cp').text(aval.codigoPostal?.codigoPostal || '—');
            $('#aval-estado').text(aval.estado || '—');
        } else {
            $('#pagare-back').parent().addClass('d-none'); // Ocultar si no hay aval
        }

    });
}

