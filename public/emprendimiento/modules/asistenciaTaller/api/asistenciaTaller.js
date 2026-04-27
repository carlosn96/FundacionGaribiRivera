const urlAPI = 'api/AsistenciaTallerAPI.php';

let currentState = {
    etapas: [],
    talleres: [],
    emprendedores: [],
    originalAsistencias: {} // Snapshot para detectar cambios sin guardar
};

// ═══════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════
function ready() {
    initEvents();
    cargarEtapas();
}

function initEvents() {
    // Select2 para búsqueda de etapas
    $('#etapaSelect').select2({
        placeholder: '-- Selecciona una etapa --',
        width: '100%',
        language: 'es'
    }).on('change', function () {
        const idEtapa = $(this).val();
        if (idEtapa) {
            cargarTalleres(idEtapa);
            resetTable();
        }
    });

    // Carga automática de emprendedores al seleccionar taller
    $('#tallerSelect').on('change', function () {
        const idTaller = $(this).val();
        const idEtapa = $('#etapaSelect').val();
        if (idTaller && idEtapa) {
            cargarEmprendedores(idEtapa, idTaller);
        }
    });

    // Select All
    $('#selectAllCheckbox').on('change', function () {
        const isChecked = $(this).is(':checked');
        $('.asiste-switch:visible').prop('checked', isChecked).trigger('change');
    });

    // Delegated change listener para cada switch individual
    $(document).on('change', '.asiste-switch', function () {
        const badge = $(this).closest('td').find('.badge')[0];
        updateBadgeStatus(badge, $(this).is(':checked'));
        actualizarContadores();
        detectarCambiosPendientes();
    });

    // Guardar
    $('#guardarAsistencia').on('click', function () {
        guardarAsistencia();
    });

    // Búsqueda local en tiempo real
    $('#searchInput').on('input', function () {
        filtrarTabla();
    });

    // Filtro por estado
    $('#filterEstado').on('change', function () {
        filtrarTabla();
    });
}

// ═══════════════════════════════════════════════════════
// DATA LOADING
// ═══════════════════════════════════════════════════════
function cargarEtapas() {
    crearPeticion(urlAPI, { case: 'getEtapas' }, function (etapas) {
        let options = '<option value=""></option>';
        if (etapas && etapas.length > 0) {
            etapas.forEach(etapa => {
                options += `<option value="${etapa.id_etapa || etapa.idEtapa}">${etapa.nombre}</option>`;
            });
        }
        $('#etapaSelect').html(options).trigger('change.select2');
    });
}

function cargarTalleres(idEtapa) {
    $('#tallerSelect').prop('disabled', true);
    $('#tallerSpinner').removeClass('d-none');

    crearPeticion(urlAPI, { case: 'getTalleresPorEtapa', data: $.param({ id_etapa: idEtapa }) }, function (talleres) {
        let options = '<option selected disabled value="">-- Selecciona un taller --</option>';
        currentState.talleres = talleres || [];

        if (currentState.talleres.length > 0) {
            currentState.talleres.forEach(taller => {
                options += `<option value="${taller.id_taller}">${taller.nombre_taller} (${taller.fecha})</option>`;
            });
            $('#tallerSelect').prop('disabled', false);
        } else {
            options = '<option selected disabled value="">No hay talleres programados</option>';
        }

        $('#tallerSelect').html(options);
        $('#tallerSpinner').addClass('d-none');
    });
}

function cargarEmprendedores(idEtapa, idTaller) {
    $('#asistenciaTbody').html('<tr><td colspan="4" class="text-center py-4"><div class="spinner-border text-primary" role="status"></div><p class="mt-2 text-muted small">Cargando emprendedores...</p></td></tr>');
    mostrarInterfazCompleta();

    crearPeticion(urlAPI, {
        case: 'getEmprendedoresPorEtapaTaller',
        data: $.param({ id_etapa: idEtapa, id_taller: idTaller })
    }, function (emprendedores) {
        currentState.emprendedores = emprendedores || [];
        // Snapshot del estado original para detectar cambios
        currentState.originalAsistencias = {};
        currentState.emprendedores.forEach(emp => {
            currentState.originalAsistencias[emp.id] = emp.asiste == 1;
        });
        renderizarTabla();
    });
}

// ═══════════════════════════════════════════════════════
// UI STATE
// ═══════════════════════════════════════════════════════
function mostrarInterfazCompleta() {
    $('#kpiStrip, #toolbar, #tableFooter').slideDown(200);
    $('#tableHead').show();
    $('#searchInput').val('');
    $('#filterEstado').val('todos');
}

function ocultarInterfazCompleta() {
    $('#kpiStrip, #toolbar, #tableFooter').hide();
    $('#tableHead').hide();
    $('#unsavedBadge').addClass('d-none');
}

// ═══════════════════════════════════════════════════════
// RENDERING
// ═══════════════════════════════════════════════════════
function renderizarTabla() {
    const tbody = $('#asistenciaTbody');
    tbody.empty();

    if (currentState.emprendedores.length === 0) {
        tbody.html(`
            <tr>
                <td colspan="4" class="text-center py-5 border-0">
                    <div class="d-flex flex-column align-items-center">
                        <div class="bg-warning bg-opacity-10 rounded-circle p-3 mb-3">
                            <i class="ti ti-users-minus text-warning" style="font-size: 2rem;"></i>
                        </div>
                        <h6 class="text-muted mb-1">Sin emprendedores</h6>
                        <p class="text-muted small mb-0">No hay emprendedores inscritos en este taller.</p>
                    </div>
                </td>
            </tr>
        `);
        $('#guardarAsistencia').prop('disabled', true);
        actualizarContadores();
        return;
    }

    const template = document.getElementById('emprendedorRowTemplate');

    currentState.emprendedores.forEach((emp, index) => {
        const clone = template.content.cloneNode(true);
        const tr = clone.querySelector('tr');

        // Number
        tr.querySelector('.emprendedor-num').textContent = index + 1;

        // Name (+ data attribute for search)
        const fullName = `${emp.nombre} ${emp.apellidos}`;
        tr.querySelector('.emprendedor-nombre').textContent = fullName;
        tr.setAttribute('data-nombre', fullName.toLowerCase());

        // Contact
        const email = emp.correo_electronico || '—';
        const telefono = emp.numero_celular || '—';
        tr.querySelector('.emprendedor-email').textContent = email;
        tr.querySelector('.emprendedor-email-sm').textContent = email;
        tr.querySelector('.emprendedor-telefono').textContent = telefono;

        // Photo
        const imgEl = tr.querySelector('.emprendedor-foto');
        const fallbackEl = tr.querySelector('.emprendedor-avatar-fallback');
        if (emp.fotografia) {
            imgEl.src = emp.fotografia.startsWith('data:') ? emp.fotografia : 'data:image/jpeg;base64,' + emp.fotografia;
            imgEl.classList.remove('d-none');
            fallbackEl.classList.add('d-none');
        } else {
            imgEl.classList.add('d-none');
            fallbackEl.classList.remove('d-none');
        }

        // Attendance switch
        const checkbox = tr.querySelector('.form-check-input');
        checkbox.classList.add('asiste-switch');
        checkbox.dataset.id = emp.id;
        checkbox.checked = emp.asiste == 1;

        const badge = tr.querySelector('.badge');
        updateBadgeStatus(badge, checkbox.checked);

        tbody.append(tr);
    });

    $('#guardarAsistencia').prop('disabled', false);
    $('#selectAllCheckbox').prop('checked', false);
    actualizarContadores();
    detectarCambiosPendientes();
}

// ═══════════════════════════════════════════════════════
// SEARCH & FILTER
// ═══════════════════════════════════════════════════════
function filtrarTabla() {
    const search = $('#searchInput').val().toLowerCase().trim();
    const estado = $('#filterEstado').val();
    let visible = 0;

    $('#asistenciaTbody .emprendedor-row').each(function () {
        const nombre = $(this).attr('data-nombre') || '';
        const isChecked = $(this).find('.asiste-switch').is(':checked');

        let matchSearch = !search || nombre.includes(search);
        let matchEstado = estado === 'todos' ||
            (estado === 'asistentes' && isChecked) ||
            (estado === 'ausentes' && !isChecked);

        if (matchSearch && matchEstado) {
            $(this).show();
            visible++;
        } else {
            $(this).hide();
        }
    });

    // Show/hide "no results" hint
    if (visible === 0 && currentState.emprendedores.length > 0) {
        $('#footerNoResults').removeClass('d-none');
    } else {
        $('#footerNoResults').addClass('d-none');
    }
}

// ═══════════════════════════════════════════════════════
// BADGE & COUNTERS
// ═══════════════════════════════════════════════════════
function updateBadgeStatus(el, isChecked) {
    if (isChecked) {
        el.className = 'badge bg-success bg-opacity-10 text-success rounded-pill';
        el.textContent = 'Asistió';
    } else {
        el.className = 'badge bg-danger bg-opacity-10 text-danger rounded-pill';
        el.textContent = 'Falta';
    }
}

function actualizarContadores() {
    const total = currentState.emprendedores.length;
    if (total === 0) {
        $('#totalEmprendedores, #totalAsistentes, #totalAusentes, #saveButtonCount').text('0');
        $('#porcentajeAsistencia, #footerPorcentaje').text('0%');
        $('#progressBar').css('width', '0%');
        return;
    }

    const asistentes = $('.asiste-switch:checked').length;
    const ausentes = total - asistentes;
    const porcentaje = Math.round((asistentes / total) * 100);

    $('#totalEmprendedores').text(total);
    $('#totalAsistentes').text(asistentes);
    $('#totalAusentes').text(ausentes);
    $('#saveButtonCount').text(asistentes);
    $('#porcentajeAsistencia').text(`${porcentaje}%`);
    $('#footerPorcentaje').text(`${porcentaje}%`);
    $('#progressBar').css('width', `${porcentaje}%`);
}

// ═══════════════════════════════════════════════════════
// UNSAVED CHANGES DETECTION
// ═══════════════════════════════════════════════════════
function detectarCambiosPendientes() {
    let hayCambios = false;
    $('.asiste-switch').each(function () {
        const id = $(this).data('id');
        const actual = $(this).is(':checked');
        const original = currentState.originalAsistencias[id];
        if (actual !== original) {
            hayCambios = true;
            return false; // break
        }
    });

    if (hayCambios) {
        $('#unsavedBadge').removeClass('d-none');
    } else {
        $('#unsavedBadge').addClass('d-none');
    }
}

// ═══════════════════════════════════════════════════════
// SAVE
// ═══════════════════════════════════════════════════════
function guardarAsistencia() {
    const btn = $('#guardarAsistencia');
    const originalText = btn.html();
    btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2" role="status"></span>Guardando...');

    const asistencias = [];
    $('.asiste-switch').each(function () {
        asistencias.push({
            id_emprendedor: $(this).data('id'),
            asiste: $(this).is(':checked') ? 1 : 0,
            observacion: ''
        });
    });

    crearPeticion(urlAPI, {
        case: 'registrarAsistencia',
        data: $.param({
            id_taller: $('#tallerSelect').val(),
            id_etapa: $('#etapaSelect').val(),
            asistencias: asistencias
        })
    }, function () {
        btn.prop('disabled', false).html(originalText);

        // Actualizar snapshot para que ya no marque "sin guardar"
        $('.asiste-switch').each(function () {
            currentState.originalAsistencias[$(this).data('id')] = $(this).is(':checked');
        });
        detectarCambiosPendientes();

        mostrarAlerta('success', '¡Asistencia guardada!', 'Registros actualizados correctamente.');
    }, function () {
        btn.prop('disabled', false).html(originalText);
        mostrarAlerta('danger', 'Error', 'No se pudieron guardar los registros.');
    });
}

// ═══════════════════════════════════════════════════════
// RESET & ALERTS
// ═══════════════════════════════════════════════════════
function resetTable() {
    $('#asistenciaTbody').html(`
    <tr id="emptyState">
        <td colspan="4" class="text-center py-5 border-0">
            <div class="d-flex flex-column align-items-center">
                <div class="bg-primary bg-opacity-10 rounded-circle p-4 mb-3">
                    <i class="ti ti-clipboard-list text-primary" style="font-size: 2.5rem;"></i>
                </div>
                <h6 class="text-muted mb-1">Selecciona un taller</h6>
                <p class="text-muted small mb-0">La lista aparecerá cuando elijas el taller</p>
            </div>
        </td>
    </tr>
    `);
    currentState.emprendedores = [];
    currentState.originalAsistencias = {};
    $('#guardarAsistencia').prop('disabled', true);
    ocultarInterfazCompleta();
    actualizarContadores();
}

function mostrarAlerta(tipo, titulo, mensaje) {
    const icon = tipo === 'success' ? 'ti-check' : 'ti-alert-circle';
    const alertHtml = `
    <div class="alert alert-${tipo} alert-dismissible fade show shadow-sm border-0 position-fixed top-0 end-0 m-4" role="alert" style="z-index: 1060; min-width: 300px; max-width: 420px;">
        <div class="d-flex align-items-center">
            <div class="bg-${tipo} bg-opacity-25 rounded-circle p-2 me-3">
                <i class="ti ${icon} text-${tipo} fs-4"></i>
            </div>
            <div>
                <h6 class="alert-heading mb-0 fw-bold small">${titulo}</h6>
                <p class="mb-0 small text-muted">${mensaje}</p>
            </div>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>
    `;
    $('body').append(alertHtml);
    setTimeout(() => { $('.alert').alert('close'); }, 4000);
}