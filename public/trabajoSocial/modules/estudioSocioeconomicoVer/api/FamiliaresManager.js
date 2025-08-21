let currentSortColumn = -1;
let currentSortDirection = 'asc';
var familyData = [];

// Función para calcular total de ingresos
function calculateTotal(fixed, variable) {
    const fixedAmount = typeof fixed === 'string' ? parseFloat(fixed.replace(/[^0-9.-]+/g, '')) : Number(fixed) || 0;
    const variableAmount = typeof variable === 'string' ? parseFloat(variable.replace(/[^0-9.-]+/g, '')) : Number(variable) || 0;
    return fixedAmount + variableAmount;
}

// Función para formatear moneda
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(amount);
}

// Función para obtener badge de parentesco
function getParentescoBadge(parentesco) {
    const badges = {
        'Esposa': 'bg-success',
        'Hijo': 'bg-primary',
        'Hija': 'bg-info'
    };
    return badges[parentesco] || 'bg-secondary';
}

// Función para generar la tabla
function generateFamilyTable(data) {
    const tbody = document.getElementById('familiaresTableBody');
    tbody.innerHTML = '';
    familyData = Array.isArray(data) ? data : [];

    data.forEach(familiar => {
        const total = calculateTotal(familiar.ingresoMensualFijo, familiar.ingresoMensualVariable);
        const row = document.createElement('tr');
        row.setAttribute('data-id', familiar.idFamiliar);

        row.innerHTML = `
            <td class="ps-4">
                <div>
                    <h6 class="mb-0 nombre">${familiar.nombre}</h6>
                    <small class="text-muted d-md-none edad">${familiar.edad} años</small>
                </div>
            </td>
            <td class="text-center">
                <span class="badge bg-light text-dark edad">${familiar.edad}</span>
            </td>
            <td>
                <span class="badge ${getParentescoBadge(familiar.parentesco)} parentesco">${familiar.parentesco}</span>
            </td>
            <td class="d-none d-md-table-cell">
                <small class="text-muted estado-civil">${familiar.estadoCivil.value}</small>
            </td>
            <td class="d-none d-lg-table-cell">
                <small class="text-muted escolaridad">${familiar.escolaridad.value}</small>
            </td>
            <td class="d-none d-lg-table-cell">
                <small class="text-muted ocupacion">${familiar.ocupacion.value}</small>
            </td>
            <td class="text-end">
                <div class="d-flex flex-column align-items-end">
                    <span class="fw-bold text-success ingreso-total">${formatCurrency(total)}</span>
                    <small class="text-muted d-none d-md-block ingreso-detalle">
                        F: ${formatCurrency(familiar.ingresoMensualFijo)} | V: ${formatCurrency(familiar.ingresoMensualVariable)}
                    </small>
                </div>
            </td>
            <td class="text-center pe-4">
                <div class="btn-group" role="group">
                    <button class="btn btn-sm btn-outline-secondary d-md-none" 
                            onclick="showMemberDetail(${familiar.idFamiliar})"
                            data-bs-toggle="tooltip" 
                            title="Ver detalles">
                        <i class="ti ti-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-primary" 
                            onclick="editMember(${familiar.idFamiliar})"
                            data-bs-toggle="tooltip" 
                            title="Editar">
                        <i class="ti ti-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" 
                            onclick="deleteMember(${familiar.idFamiliar})"
                            data-bs-toggle="tooltip" 
                            title="Eliminar">
                        <i class="ti ti-trash"></i>
                    </button>
                </div>
            </td>
        `;

        tbody.appendChild(row);
    });

    updateStats(data);
    initializeTooltips();
}

// Función para actualizar estadísticas
function updateStats(data) {
    let totalFixed = 0;
    let totalVariable = 0;

    data.forEach(familiar => {
        const fijo = typeof familiar.ingresoMensualFijo === 'string'
            ? parseFloat(familiar.ingresoMensualFijo.replace(/[^0-9.-]+/g, '')) || 0
            : Number(familiar.ingresoMensualFijo) || 0;

        const variable = typeof familiar.ingresoMensualVariable === 'string'
            ? parseFloat(familiar.ingresoMensualVariable.replace(/[^0-9.-]+/g, '')) || 0
            : Number(familiar.ingresoMensualVariable) || 0;

        totalFixed += fijo;
        totalVariable += variable;
    });

    const total = totalFixed + totalVariable;
    const count = data.length;
    const average = count > 0 ? total / count : 0;

    // Mostrar valores
    $('#totalCount').text(count);
    $('#totalIncome').text(formatCurrency(total));
    $('#totalFixedIncome').text(formatCurrency(totalFixed));
    $('#totalVariableIncome').text(formatCurrency(totalVariable));
    $('#averageIncomePerMember').text(formatCurrency(average));

    // Obtener valores de referencia CONEVAL desde el DOM
    const montoVulnerable = parseFloat($('#montoVulnerableIngreso').val()) || 0;
    const montoExtrema = parseFloat($('#montoPobrezaExtrema').val()) || 0;

    // Evaluar vulnerabilidad
    if (average > 0) {
        if (average < montoExtrema) {
            $('#esPobrezaExtrema')
                .removeClass().addClass('badge bg-danger')
                .text('Sí');
        } else {
            $('#esPobrezaExtrema')
                .removeClass().addClass('badge bg-success')
                .text('No');
        }

        if (average < montoVulnerable) {
            $('#esVulnerable')
                .removeClass().addClass('badge bg-warning text-dark')
                .text('Sí');
        } else {
            $('#esVulnerable')
                .removeClass().addClass('badge bg-success')
                .text('No');
        }
    } else {
            // Si no hay datos válidos
            $('#esVulnerable, #esPobrezaExtrema')
                .removeClass().addClass('badge bg-secondary')
                .text('Sin datos');
        }
    }
    updateIncomeExpenseDifference();
}


// Función para ordenar tabla
function sortTable(columnIndex) {
    const isNewColumn = currentSortColumn !== columnIndex;
    currentSortDirection = isNewColumn ? 'asc' : (currentSortDirection === 'asc' ? 'desc' : 'asc');
    currentSortColumn = columnIndex;

    familyData.sort((a, b) => {
        let aValue, bValue;

        switch (columnIndex) {
            case 0: // Nombre
                aValue = a.nombre.toLowerCase();
                bValue = b.nombre.toLowerCase();
                break;
            case 1: // Edad
                aValue = a.edad;
                bValue = b.edad;
                break;
            case 2: // Parentesco
                aValue = a.parentesco.toLowerCase();
                bValue = b.parentesco.toLowerCase();
                break;
            case 6: // Ingresos
                aValue = calculateTotal(a.ingresoMensualFijo, a.ingresoMensualVariable);
                bValue = calculateTotal(b.ingresoMensualFijo, b.ingresoMensualVariable);
                break;
            default:
                return 0;
        }

        if (typeof aValue === 'string') {
            return currentSortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else {
            return currentSortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }
    });

    generateFamilyTable(familyData);
}

// Función para mostrar detalles del familiar en móvil
function showMemberDetail(id) {
    const familiar = familyData.find(f => f.idFamiliar === id);
    if (!familiar) return;

    const total = calculateTotal(familiar.ingresoMensualFijo, familiar.ingresoMensualVariable);
    const modalContent = document.getElementById('memberDetailContent');

    modalContent.innerHTML = `
        <div class="row g-3">
            <div class="col-12 text-center mb-3">
                <h5 class="mt-2 mb-0">${familiar.nombre}</h5>
                <small class="text-muted">${familiar.edad} años • ${familiar.parentesco}</small>
            </div>

            <div class="col-6">
                <div class="d-flex align-items-center mb-2">
                    <i class="ti ti-heart text-danger me-2"></i>
                    <small class="text-muted">Estado Civil</small>
                </div>
                <p class="mb-0 fw-medium">${familiar.estadoCivil.value}</p>
            </div>

            <div class="col-6">
                <div class="d-flex align-items-center mb-2">
                    <i class="ti ti-book text-info me-2"></i>
                    <small class="text-muted">Escolaridad</small>
                </div>
                <p class="mb-0 fw-medium">${familiar.escolaridad.value}</p>
            </div>

            <div class="col-12">
                <div class="d-flex align-items-center mb-2">
                    <i class="ti ti-briefcase text-warning me-2"></i>
                    <small class="text-muted">Ocupación</small>
                </div>
                <p class="mb-0 fw-medium">${familiar.ocupacion.value}</p>
            </div>

            <div class="col-12">
                <hr class="my-3">
                <div class="d-flex align-items-center mb-2">
                    <i class="ti ti-currency-dollar text-success me-2"></i>
                    <small class="text-muted">Ingresos Mensuales</small>
                </div>
                <div class="row">
                    <div class="col-6">
                        <small class="text-muted">Fijo:</small>
                        <p class="mb-0 fw-medium">${formatCurrency(familiar.ingresoMensualFijo)}</p>
                    </div>
                    <div class="col-6">
                        <small class="text-muted">Variable:</small>
                        <p class="mb-0 fw-medium">${formatCurrency(familiar.ingresoMensualVariable)}</p>
                    </div>
                </div>
                <div class="mt-2 pt-2 border-top">
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="fw-bold text-success">Total Mensual:</span>
                        <span class="fw-bold text-success fs-5">${formatCurrency(total)}</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    modalContent.dataset.memberId = id;

    const modal = new bootstrap.Modal(document.getElementById('memberDetailModal'));
    modal.show();
}

// Función para inicializar tooltips
function initializeTooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));
}

// Funciones de acción
function editMember(id) {
    mostrarMensajeInfo("En este momento solo se puede eliminar un familiar de los agregados previamente, la edición de informacion sigue en desarrollo.", false);
    /* const familiar = familyData.find(f => f.idFamiliar === id);
     if (!familiar) return;
 
     // Rellenar campos del formulario
     $('#editIdFamiliar').val(familiar.idFamiliar);
     $('#editNombre').val(familiar.nombre || '');
     $('#editParentesco').val(familiar.parentesco || '');
     $('#editEdad').val(familiar.edad || '');
     $('#editIngresoFijo').val(familiar.ingresoMensualFijo || 0);
     $('#editIngresoVariable').val(familiar.ingresoMensualVariable || 0);
 
     // Mostrar modal
     const modal = new bootstrap.Modal(document.getElementById('modalEditarFamiliar'));
     modal.show();*/
}

$('#guardarCambiosFamiliar').on('click', function () {
    const id = parseInt($('#editIdFamiliar').val());
    const familiar = familyData.find(f => f.idFamiliar === id);
    if (!familiar) return;

    // Actualizar datos
    familiar.nombre = $('#editNombre').val();
    familiar.parentesco = $('#editParentesco').val();
    familiar.edad = parseInt($('#editEdad').val()) || 0;
    familiar.ingresoMensualFijo = parseFloat($('#editIngresoFijo').val()) || 0;
    familiar.ingresoMensualVariable = parseFloat($('#editIngresoVariable').val()) || 0;

    // Aquí puedes refrescar la tabla o interfaz según tu estructura
    updateStats(familyData); // Recalcular ingresos por ejemplo

    // Cerrar el modal
    const modalEl = document.getElementById('modalEditarFamiliar');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
});



function editMemberFromModal() {
    const modalContent = document.getElementById('memberDetailContent');
    const memberId = modalContent.dataset.memberId;
    if (memberId) {
        bootstrap.Modal.getInstance(document.getElementById('memberDetailModal')).hide();
        editMember(parseInt(memberId));
    }
}

function deleteMember(id) {
    print(id);
    alertaEliminar({
        mensajeAlerta: 'La informacion del familiar se eliminará permanentemente.',
        url: urlAPI,
        data: {
            case: 'eliminarFamiliar',
            data: $.param({ idFamiliar: id })
        },
        fnSuccess: function (response) {
            if (response.es_valor_error === false) {
                mostrarMensajeOk(response.mensaje, false);
                const index = familyData.findIndex(f => f.idFamiliar === id);
                if (index > -1) {
                    familyData.splice(index, 1);
                    generateFamilyTable(familyData);
                }
            } else {
                mostrarMensajeError(response.mensaje, false);
            }
        }
    });
}

function addNewMember() {
    alert('Esta función abriría un modal de Bootstrap para agregar un nuevo familiar.');
}

function switchView(view) {
    if (view === 'table') {
        document.getElementById('tableView').classList.add('active');
        document.getElementById('cardsView').classList.remove('active');
        alert('Vista de tabla activada');
    } else {
        document.getElementById('cardsView').classList.add('active');
        document.getElementById('tableView').classList.remove('active');
        alert('Cambiar a vista de tarjetas (implementar navegación)');
    }
}