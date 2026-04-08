// ==================== TAB RESUMEN ====================
let _valoresPendientesResumen = null;

function originarTabResumen() {
    const aplicarColorDiagnostico = () => {
        const $sel = $('#resumen-diagnostico');
        const $option = $sel.find('option:selected');
        const ref = $option.data('ref'); 
        const desc = $option.text();
        
        $sel.removeClass('estado-positivo estado-negativo estado-condicionado');
        const map = { POSITIVO: 'estado-positivo', NEGATIVO: 'estado-negativo', CONDICIONADO: 'estado-condicionado' };
        if (map[ref]) $sel.addClass(map[ref]);

        // Sincronización con badge del sidebar
        const $badge = $('#resumen-diagnostico-badge');
        $badge.removeClass('status-badge--success status-badge--danger status-badge--warning status-badge--secondary');
        
        if (ref === 'POSITIVO') {
            $badge.addClass('status-badge--success').text(desc);
        } else if (ref === 'NEGATIVO') {
            $badge.addClass('status-badge--danger').text(desc);
        } else if (ref === 'CONDICIONADO') {
            $badge.addClass('status-badge--warning').text(desc);
        } else {
            $badge.addClass('status-badge--secondary').text('Sin dictamen');
        }
    };

    $('#resumen-diagnostico').on('change', aplicarColorDiagnostico);

    $('#form-resumen').validate({
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
                mostrarMensajeAdvertencia('Primero guarde el expediente financiero', false); 
                return; 
            }

            const data = {
                idExpediente: window._idExpediente,
                nombreProyecto: $('#resumen-nombre-proyecto').val(),
                resumenProyecto: $('#resumen-proyecto').val(),
                idViabilidad: $('#resumen-viabilidad').val(),
                idDiagnosticoSocial: $('#resumen-diagnostico').val(),
                quienOtorgaDiagnostico: $('#resumen-quien-diagnostico').val(),
                observaciones: $('#resumen-observaciones').val(),
                idVulnerabilidad: $('#resumen-vulnerabilidad').val(),
                importeSolicitado: $('#resumen-importe-solicitado').val(),
                inversionEmprendedor: $('#resumen-inversion').val(),
                importeSugeridoCoordinador: $('#resumen-sugerido').val(),
                aprobadoPorAuxiliarDireccion: $('#resumen-aprobado-por').val(),
            };

            loadingBtn($('#btn-guardar-resumen'), true);
            ExpedienteAPI.saveResumenEjecutivo(data)
                .finally(() => {
                    loadingBtn($('#btn-guardar-resumen'), false);
                });
        }
    });
}

function llenarCatalogosResumen(viabilidades, diagnosticos, vulnerabilidades) {
    const listViabilidades = (viabilidades?.data || viabilidades || []);
    const listDiagnosticos = (diagnosticos?.data || diagnosticos || []);
    const listVulnerabilidades = (vulnerabilidades?.data || vulnerabilidades || []);

    const $selViab = $('#resumen-viabilidad');
    $selViab.find('option:not(:first)').remove();
    listViabilidades.forEach(item => $selViab.append(`<option value="${item.id}">${item.descripcion}</option>`));

    const $selDiag = $('#resumen-diagnostico');
    $selDiag.find('option:not(:first)').remove();
    listDiagnosticos.forEach(item => {
        $selDiag.append(`<option value="${item.id}" data-ref="${item.valor_referencia}">${item.descripcion}</option>`);
    });

    const $selVuln = $('#resumen-vulnerabilidad');
    $selVuln.find('option:not(:first)').remove();
    listVulnerabilidades.forEach(item => $selVuln.append(`<option value="${item.id}">${item.descripcion}</option>`));

    // Si ya teníamos valores cargados del expediente, los aplicamos
    if (_valoresPendientesResumen) {
        $selViab.val(_valoresPendientesResumen.idViabilidad);
        $selDiag.val(_valoresPendientesResumen.idDiagnosticoSocial).trigger('change');
        $selVuln.val(_valoresPendientesResumen.idVulnerabilidad);
    }
}

function llenarTabResumen(r) {
    if (!r) return;
    _valoresPendientesResumen = r; // Guardamos para cuando carguen los catálogos

    $('#resumen-nombre-proyecto').val(r.nombreProyecto);
    $('#resumen-proyecto').val(r.resumenProyecto);
    
    // Intentar asignar de inmediato (por si el catálogo ya cargó)
    $('#resumen-viabilidad').val(r.idViabilidad);
    $('#resumen-diagnostico').val(r.idDiagnosticoSocial).trigger('change');
    $('#resumen-vulnerabilidad').val(r.idVulnerabilidad);

    $('#resumen-quien-diagnostico').val(r.quienOtorgaDiagnostico);
    $('#resumen-observaciones').val(r.observaciones);
    $('#resumen-importe-solicitado').val(r.importeSolicitado);
    $('#resumen-inversion').val(r.inversionEmprendedor);
    $('#resumen-sugerido').val(r.importeSugeridoCoordinador);
    $('#resumen-aprobado-por').val(r.aprobadoPorAuxiliarDireccion);
}
