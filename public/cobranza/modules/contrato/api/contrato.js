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
    apiGetRequest(`cobranza/contrato-html/${id}`, (response) => {
        if (response && response.data && response.data.html) {
            $('.print-wrapper').html(response.data.html);
        } else {
            mostrarMensajeError('No se pudo obtener el contrato');
        }
    });
}
