// ==================== CONTRATO API / LOGIC ====================

function ready() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        mostrarMensajeError('ID de emprendedor no proporcionado');
        redireccionar('../inicio');
        return;
    }

    // Configuración botones toolbar
    $('#btn-volver-c').on('click', () => {
        window.location.href = `../expediente/?id=${id}`;
    });

    $('#btn-descargar-pdf-c').on('click', () => {
        const urlApi = `${window.location.protocol}//${window.location.host}${getBasePath()}/api`;
        const pdfUrl = `${urlApi}/cobranza/imprimir-contrato/${id}`;
        window.open(pdfUrl, '_blank');
    });

    cargarDatosContrato(id);
}

function cargarDatosContrato(id) {
    ExpedienteAPI.getPerfilEmprendedor(id, (response) => {
        if (!response.data) return;

        const data = response.data;
        const u = data.usuario || {};
        const exp = data.expediente || {};
        const res = exp.resumenEjecutivo || {};
        const aval = exp.aval || {};
        const inm = exp.inmuebleGarantia || {};
        const domN = data.domicilioNegocio || {};

        // 1. NOMBRES PRINCIPALES
        const nombreE = `${u.nombre || ''} ${u.apellidos || ''}`.trim();
        const nombreA = `${aval.nombreCompleto || ''}`.trim();
        
        $('#c-nombre-e, #sig-emprendedor').text(nombreE);
        $('#c-nombre-a, #sig-aval').text(nombreA || '— NO ASIGNADO —');

        // 2. DOMICILIO EMPRENDEDOR
        const domE = data.domicilioPersonal || {};
        $('#c-dom-e').text(`${domE.calle || ''} #${domE.numeroExterior || ''} ${domE.numeroInterior ? 'Int. ' + domE.numeroInterior : ''}`.trim());
        $('#c-cruces1-e').text(domE.calleCruce1 || '—');
        $('#c-cruces2-e').text(domE.calleCruce2 || '—');
        $('#c-colonia-e').text(domE.colonia || '—');
        $('#c-municipio-e').text(domE.municipio?.nombre || '—');
        $('#c-cp-e').text(domE.codigoPostal?.codigoPostal || '—');
        $('#c-tel-e').text(u.numeroCelular || '—');

        // 3. DOMICILIO AVAL
        $('#c-dom-a').text(`${aval.calle || ''} #${aval.numeroExterior || ''} ${aval.numeroInterior ? 'Int. ' + aval.numeroInterior : ''}`.trim());
        $('#c-cruces1-a').text(aval.calleCruce1 || '—');
        $('#c-cruces2-a').text(aval.calleCruce2 || '—');
        $('#c-colonia-a').text(aval.colonia || '—');
        $('#c-municipio-a').text(aval.municipio?.nombre || '—');
        $('#c-cp-a').text(aval.codigoPostal?.codigoPostal || '—');
        $('#c-tel-a').text(aval.celular || '—');

        // 4. DATOS INMUEBLE GARANTÍA
        $('#c-calle-i').text(inm.calle || '—');
        $('#c-num-i').text(inm.numeroExterior || '—');
        $('#c-cruces1-i').text(inm.calleCruce1 || '—');
        $('#c-cruces2-i').text(inm.calleCruce2 || '—');
        $('#c-col-i').text(inm.colonia || '—');
        $('#c-mun-i').text(inm.municipio?.nombre || '—');
        $('#c-cp-i').text(inm.codigoPostal?.codigoPostal || '—');
        $('#c-predial-i').text(inm.cuentaPredial || '—');

        // 5. DATOS NEGOCIO (CLAUSULA PRIMERA)
        $('#c-negocio-nombre').text(data.negocio?.nombre || '—');
        $('#c-negocio-dom').text(`${domN.calle || ''} #${domN.numeroExterior || ''} ${domN.numeroInterior ? 'Int. ' + domN.numeroInterior : ''}`.trim());
        $('#c-negocio-c1').text(domN.calleCruce1 || '—');
        $('#c-negocio-c2').text(domN.calleCruce2 || '—');
        $('#c-negocio-col').text(domN.colonia || '—');
        $('#c-negocio-mun').text(domN.municipio?.nombre || '—');
        $('#c-expediente-num').text(exp.numeroExpediente || '—');

        // 6. MONTOS (CLAUSULA CUARTA / QUINTA)
        const monto = parseFloat(exp.montoSolicitado || 0);
        const montoTxt = `(${numeroALetras(monto).toUpperCase()})`;
        
        $('#c-monto-num-txt, #c-monto-num-v2').text(formatearMoneda(monto));
        $('#c-monto-letras-txt, #c-monto-letras-v2').text(montoTxt.replace('(', '').replace(')', ''));

        // 7. PAGOS (PENDIENTE DEFINICION LOGICA CUOTAS)
        // Por ahora usamos datos del resumen si están, si no 12 por defecto
        const numPagos = parseInt(res.numeroPagos || 12);
        const montoMensual = monto > 0 ? (monto / numPagos) : 0;

        $('#c-num-pagos').text(numPagos);
        $('#c-monto-pago-num').text(formatearMoneda(montoMensual));
        $('#c-monto-pago-letras').text(numeroALetras(montoMensual).toUpperCase().replace('(', '').replace(')', ''));

        // 8. FECHA FOOTER
        // Extraer solo la parte YYYY-MM-DD para evitar NaN al concatenar 'T00:00:00' a un ISO completo
        const fechaRaw = data.fechaCredito || null;
        const fechaBase = fechaRaw ? fechaRaw.split('T')[0] : null;
        $('#c-fecha-footer').text(formatearFechaLarga(fechaBase).toUpperCase());

    });
}
