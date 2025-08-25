function ready() {
    // Mock data for testing
    const mockData = {
        etapas: [
            { id_etapa: 1, nombre: 'Etapa Básica' },
            { id_etapa: 2, nombre: 'Etapa de Fortalecimiento' }
        ],
        talleres: {
            1: [
                { id_taller: 101, nombre_taller: 'Finanzas para Principiantes' },
                { id_taller: 102, nombre_taller: 'Marketing Digital 101' }
            ],
            2: [
                { id_taller: 201, nombre_taller: 'Contabilidad Avanzada' },
                { id_taller: 202, nombre_taller: 'Estrategias de SEO' }
            ]
        },
        emprendedores: {
            101: [
                { id: 1, nombre: 'Juan Perez', email: 'juan.perez@example.com', telefono: '555-1234' },
                { id: 2, nombre: 'Maria Garcia', email: 'maria.garcia@example.com', telefono: '555-5678' }
            ],
            102: [
                { id: 3, nombre: 'Pedro Rodriguez', email: 'pedro.rodriguez@example.com', telefono: '555-9012' }
            ],
            201: [
                { id: 4, nombre: 'Ana Martinez', email: 'ana.martinez@example.com', telefono: '555-3456' }
            ],
            202: [
                { id: 5, nombre: 'Carlos Sanchez', email: 'carlos.sanchez@example.com', telefono: '555-7890' }
            ]
        }
    };

    // Element references
    const etapaSelect = $('#etapaSelect');
    const tallerSelect = $('#tallerSelect');
    const tallerSpinner = $('#tallerSpinner');
    const asistenciaTbody = $('#asistenciaTbody');
    const selectAllCheckbox = $('#selectAllCheckbox');
    const guardarBtn = $('#guardarAsistencia');

    // --- Functions ---

    function populateEtapas() {
        mockData.etapas.forEach(etapa => {
            const option = new Option(etapa.nombre, etapa.id_etapa);
            etapaSelect.append(option);
        });
    }

    function populateTalleres(etapaId) {
        tallerSelect.html('<option selected disabled>-- Selecciona un taller --</option>'); // Reset
        const talleres = mockData.talleres[etapaId] || [];
        talleres.forEach(taller => {
            const option = new Option(taller.nombre_taller, taller.id_taller);
            tallerSelect.append(option);
        });
        tallerSelect.prop('disabled', false);
        tallerSpinner.addClass('d-none');
    }

    function renderEmprendedores(tallerId) {
        asistenciaTbody.html(''); // Clear existing rows
        const emprendedores = mockData.emprendedores[tallerId] || [];

        if (emprendedores.length === 0) {
            asistenciaTbody.html(`<tr><td colspan="4" class="text-center text-muted py-5"><i class="fas fa-info-circle fa-2x mb-3"></i><p>No hay emprendedores para este taller.</p></td></tr>`);
            return;
        }

        emprendedores.forEach(emp => {
            const row = `
                <tr>
                    <td>${emp.nombre}</td>
                    <td>${emp.email}</td>
                    <td>${emp.telefono}</td>
                    <td class="text-center">
                        <div class="form-check form-switch d-flex justify-content-center">
                            <input class="form-check-input" type="checkbox" role="switch" value="${emp.id}">
                        </div>
                    </td>
                </tr>
            `;
            asistenciaTbody.append(row);
        });
    }

    // --- Event Listeners ---

    etapaSelect.on('change', function () {
        const etapaId = $(this).val();
        tallerSelect.prop('disabled', true);
        tallerSpinner.removeClass('d-none');
        asistenciaTbody.html(`<tr><td colspan="4" class="text-center text-muted py-5"><i class="fas fa-spinner fa-spin fa-2x mb-3"></i><p>Cargando...</p></td></tr>`);

        setTimeout(() => {
            populateTalleres(etapaId);
            renderEmprendedores(null);
        }, 500);
    });

    tallerSelect.on('change', function () {
        const tallerId = $(this).val();
        renderEmprendedores(tallerId);
    });

    selectAllCheckbox.on('change', function () {
        asistenciaTbody.find('input[type="checkbox"]').prop('checked', $(this).prop('checked'));
    });

    guardarBtn.on('click', function () {

        const tallerId = tallerSelect.val();

        if (!tallerId) {
            alert('Por favor, seleccione una etapa y un taller.');
            return;
        }

        const asistencias = [];
        asistenciaTbody.find('input[type="checkbox"]:checked').each(function () {
            asistencias.push($(this).val());
        });

        console.log({
            tallerId: tallerId,
            asistencias: asistencias
        });

        alert(`Asistencia guardada (simulado):\n- Taller ID: ${tallerId}\n- Emprendedores Presentes: ${asistencias.length}`);
    });

    // --- Initial Load ---
    function init() {
        populateEtapas();
        asistenciaTbody.html(`<tr><td colspan="4" class="text-center text-muted py-5"><i class="fas fa-info-circle fa-2x mb-3"></i><p>Seleccione una etapa y un taller para cargar la lista.</p></td></tr>`);
        guardarBtn.prop('disabled', false); // Ensure the button is always enabled
    }

    init();
}



document.addEventListener('DOMContentLoaded', function () {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Advanced filters toggle
    document.getElementById('advanced').addEventListener('change', function () {
        if (this.checked) {
            bootstrap.Collapse.getOrCreateInstance(document.getElementById('advancedFilters')).show();
        }
    });

    document.getElementById('basic').addEventListener('change', function () {
        if (this.checked) {
            bootstrap.Collapse.getOrCreateInstance(document.getElementById('advancedFilters')).hide();
        }
    });

    // Help button in navbar
    document.querySelector('[title="Ayuda"]').addEventListener('click', function () {
        new bootstrap.Offcanvas(document.getElementById('helpOffcanvas')).show();
    });

    // Quick search clear
    document.getElementById('clearSearch').addEventListener('click', function () {
        document.getElementById('searchEmprendedor').value = '';
    });

    // Call the existing ready function if it exists
    if (typeof ready === 'function') {
        ready();
    }
});
