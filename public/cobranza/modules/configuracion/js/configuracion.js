const MAX_TESTIGOS = 2;

function ready() {
    inicializarEventosTestigos();

    apiGetRequest('cobranza/configuracion-contrato', (response) => {
        if (response && response.data) {
            const data = response.data;
            $('#representante_legal').val(data.representante_legal || '');
            $('#nombre_fundacion').val(data.nombre_fundacion || '');

            const domicilio = data.domicilio || {};
            $('#domicilio_calle').val(domicilio.calle || '');
            $('#domicilio_numero_exterior').val(domicilio.numero_exterior || '');
            $('#domicilio_numero_interior').val(domicilio.numero_interior || '');
            $('#domicilio_colonia').val(domicilio.colonia || '');
            $('#domicilio_codigo_postal').val(domicilio.codigo_postal || '');
            $('#domicilio_municipio').val(domicilio.municipio || '');
            $('#domicilio_estado').val(domicilio.estado || '');
            $('#domicilio_entre_calles').val(domicilio.entre_calles || '');
            $('#domicilio_referencias').val(domicilio.referencias || '');

            const testigos = Array.isArray(data.testigos)
                ? data.testigos
                : [data.testigo_1, data.testigo_2].filter((nombre) => (nombre || '').trim() !== '');

            renderTestigos(testigos);
        }
    });
}

function inicializarEventosTestigos() {
    $('#btnAgregarTestigo').on('click', function () {
        agregarTestigo();
    });

    $('#contenedor-testigos').on('click', '.btn-eliminar-testigo', function () {
        $(this).closest('.testigo-item').remove();
        actualizarEstadoBotonAgregar();
        actualizarEtiquetasTestigos();
    });
}

function agregarTestigo(nombre = '') {
    const total = contarTestigos();
    if (total >= MAX_TESTIGOS) {
        mostrarMensajeAdvertencia('Solo se permiten máximo 2 testigos.');
        return;
    }

    const index = total + 1;
    const itemHtml = `
        <div class="testigo-item mb-3">
            <div class="d-flex justify-content-between align-items-center mb-1">
                <label class="field-label mb-0">Testigo ${index}</label>
                <button type="button" class="btn btn-danger-ghost btn-sm btn-eliminar-testigo">
                    <i class="fas fa-trash-alt me-1"></i>Eliminar
                </button>
            </div>
            <div class="input-group">
                <span class="input-group-text"><i class="fas fa-user"></i></span>
                <input type="text" class="form-control input-testigo" name="testigos[]" maxlength="255"
                    placeholder="Nombre completo del testigo" value="${escapeHtml(nombre)}">
            </div>
        </div>
    `;

    $('#contenedor-testigos').append(itemHtml);
    actualizarEstadoBotonAgregar();
    actualizarEtiquetasTestigos();
}

function renderTestigos(testigos = []) {
    $('#contenedor-testigos').empty();

    testigos.slice(0, MAX_TESTIGOS).forEach((nombre) => {
        agregarTestigo(nombre || '');
    });

    actualizarEstadoBotonAgregar();
}

function contarTestigos() {
    return $('#contenedor-testigos .testigo-item').length;
}

function actualizarEstadoBotonAgregar() {
    const habilitar = contarTestigos() < MAX_TESTIGOS;
    $('#btnAgregarTestigo').prop('disabled', !habilitar);
}

function actualizarEtiquetasTestigos() {
    $('#contenedor-testigos .testigo-item').each((idx, el) => {
        $(el).find('label').text(`Testigo ${idx + 1}`);
    });
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function normalizarTestigosFormData(formData) {
    const testigosLimpios = [];

    formData.getAll('testigos[]').forEach((testigo) => {
        const nombre = (testigo || '').trim();
        if (nombre !== '') {
            testigosLimpios.push(nombre);
        }
    });

    if (testigosLimpios.length > MAX_TESTIGOS) {
        return { ok: false, message: 'Solo se permiten máximo 2 testigos.' };
    }

    formData.delete('testigos[]');
    testigosLimpios.forEach((nombre) => formData.append('testigos[]', nombre));

    return { ok: true };
}

function guardarConfiguracionContrato(event) {
    event.preventDefault();

    const btn = $('#btnGuardarConfiguracion');
    loadingBtn(btn, true);

    const formData = new FormData(document.getElementById('form-configuracion'));
    const resultadoNormalizacion = normalizarTestigosFormData(formData);
    if (!resultadoNormalizacion.ok) {
        loadingBtn(btn, false);
        mostrarMensajeAdvertencia(resultadoNormalizacion.message);
        return;
    }

    apiPostRequest('cobranza/configuracion-contrato', formData,
        (response) => {
            mostrarMensajeOk(response?.message || 'Configuración guardada correctamente.');
            loadingBtn(btn, false);
        },
        () => {
            loadingBtn(btn, false);
            mostrarMensajeError('Error al guardar la configuración.');
        }
    );
}
