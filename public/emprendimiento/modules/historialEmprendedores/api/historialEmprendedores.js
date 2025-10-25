
const urlAPI = "api/HistoricoEmprendedoresAPI.php";

let historialData = [];
let filteredData = [];
let sortConfig = {
    column: null,
    direction: 'asc'
};
let emprendedorActual = null; // Para guardar temporalmente el emprendedor en proceso

function ready() {
    cargarDatos();
    inicializarEventos();
}

function inicializarEventos() {
    // Búsqueda en tiempo real
    $('#search-input').on('keyup', function () {
        aplicarFiltros();
    });

    // Filtros
    $('#filter-graduado, #filter-referencia').on('change', function () {
        aplicarFiltros();
    });

    // Botón actualizar
    $('#btn-refresh').on('click', function () {
        cargarDatos();
    });

    // Botón exportar (placeholder)
    $('#btn-export').on('click', function () {
        exportarDatos();
    });

    // Al cambiar de pestaña, aplicar filtros correspondientes
    $('button[data-bs-toggle="pill"]').on('shown.bs.tab', function (e) {
        aplicarFiltros();
    });

    // Eventos de ordenamiento (delegación de eventos)
    $(document).on('click', '.sortable', function () {
        const column = $(this).data('column');
        ordenarPor(column);
    });

    // Evento para el switch de graduación
    $(document).on('change', '.switch-graduado', function () {
        const emprendedorId = $(this).data('id');
        const isGraduado = $(this).is(':checked');

        if (isGraduado) {
            // Si se está marcando como graduado, mostrar modal para fecha
            emprendedorActual = {
                id: emprendedorId,
                switch: $(this)
            };

            // Buscar el emprendedor en los datos
            const emprendedor = historialData.find(item => item.id_emprendedor == emprendedorId);
            if (emprendedor) {
                $('#nombreEmprendedor').text(`${emprendedor.nombre} ${emprendedor.apellidos}`);

                // Establecer fecha actual por defecto
                const today = new Date().toISOString().split('T')[0];
                $('#fechaGraduacion').val(today);

                // Mostrar modal
                const modal = new bootstrap.Modal(document.getElementById('modalFechaGraduacion'));
                modal.show();
            }
        } else {
            // Si se está desmarcando como graduado, confirmar acción
            confirmarDesgraduacion(emprendedorId, $(this));
        }
    });

    // Evento para guardar la graduación desde el modal
    $('#btnGuardarGraduacion').on('click', function () {
        const fecha = $('#fechaGraduacion').val();

        if (!fecha) {
            alert('Por favor, selecciona una fecha de graduación');
            return;
        }

        if (emprendedorActual) {
            actualizarGraduacion(emprendedorActual.id, true, fecha);

            // Cerrar modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalFechaGraduacion'));
            modal.hide();

            emprendedorActual = null;
        }
    });

    // Evento al cerrar el modal sin guardar
    $('#modalFechaGraduacion').on('hidden.bs.modal', function () {
        // Si se cierra el modal sin guardar, revertir el switch
        if (emprendedorActual) {
            emprendedorActual.switch.prop('checked', false);
            emprendedorActual = null;
        }
    });
}

function cargarDatos() {
    mostrarCargando();

    crearPeticion(urlAPI, { case: "getHistorialEmprendedores" }, function (res) {
        console.log('Respuesta recibida:', res);

        historialData = res.historial || [];
        filteredData = [...historialData];

        if (historialData.length === 0) {
            mostrarMensajeVacio();
            return;
        }

        actualizarContadores();
        aplicarFiltros();
    }, function (xhr, status, error) {
        mostrarError();

        // Log detallado del error
        console.error('=== Error en la petición ===');
        console.error('Status:', status);
        console.error('Error:', error);
        console.error('Response Status:', xhr.status);
        console.error('Response Text:', xhr.responseText);
        console.error('Ready State:', xhr.readyState);

        // Intentar parsear la respuesta como JSON
        try {
            const errorResponse = JSON.parse(xhr.responseText);
            console.error('Error parseado:', errorResponse);
        } catch (e) {
            console.error('No se pudo parsear la respuesta como JSON');
        }
    });
}
function exportarDatos() {
    const activeTab = $('.nav-link.active').attr('id');
    let dataToExport = filteredData;
    let nombreArchivo = 'emprendedores_todos';
    if (activeTab === 'pills-capacitacion-tab') {
        dataToExport = filteredData.filter(item => !item.referencia || item.referencia === null || item.referencia === '');
        nombreArchivo = 'emprendedores_capacitacion';
    } else if (activeTab === 'pills-credito-tab') {
        dataToExport = filteredData.filter(item => item.referencia && item.referencia !== null && item.referencia !== '');
        nombreArchivo = 'emprendedores_credito';
    }
    if (dataToExport.length === 0) {
        mostrarNotificacion('No hay datos para exportar', 'warning');
        return;
    }
    let csv = 'ID Emprendedor,Nombre Completo,Correo Electrónico,Número Celular,Estado Graduación,Fecha Graduación,Referencia\n';
    function escapeCsvValue(value) {
        if (typeof value === 'string') {
            value = value.replace(/"/g, '""');
            if (value.indexOf(',') !== -1 || value.indexOf('\n') !== -1) {
                value = `"${value}"`;
            }
        }
        return value;
    }
    dataToExport.forEach(function (item) {
        const nombreCompleto = `${item.nombre} ${item.apellidos}`;
        const estadoGraduacion = item.graduado === '1' ? 'Graduado' : 'En Capacitación';
        const fechaGraduacion = item.fecha_graduacion || 'N/A';
        const referencia = item.referencia || 'Sin referencia';

        // Usamos la función para escapar los valores antes de agregarlos al CSV
        csv += `${escapeCsvValue(item.id_emprendedor)},${escapeCsvValue(nombreCompleto)},${escapeCsvValue(item.correo_electronico)},${escapeCsvValue(item.numero_celular)},${escapeCsvValue(estadoGraduacion)},${escapeCsvValue(fechaGraduacion)},${escapeCsvValue(referencia)}\n`;
    });
    const bom = "\uFEFF";
    const blob = new Blob([bom, csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${nombreArchivo}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    mostrarNotificacion(`Se exportaron ${dataToExport.length} registros correctamente`, 'success');
}

function mostrarCargando() {
    const spinnerHTML = `
        <div class="text-center py-5">
            <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="mt-3 text-muted">Cargando información...</p>
        </div>
    `;
    $('#tabla-all-container, #tabla-capacitacion-container, #tabla-credito-container').html(spinnerHTML);
}

function mostrarMensajeVacio() {
    const emptyHTML = `
        <div class="alert alert-info border-0 d-flex align-items-center" role="alert">
            <i class="fas fa-info-circle fa-2x me-3"></i>
            <div>
                <h5 class="alert-heading mb-1">No hay datos disponibles</h5>
                <p class="mb-0">No se encontraron registros de emprendedores.</p>
            </div>
        </div>
    `;
    $('#tabla-all-container, #tabla-capacitacion-container, #tabla-credito-container').html(emptyHTML);
}

function mostrarError() {
    const errorHTML = `
        <div class="alert alert-danger border-0 d-flex align-items-center" role="alert">
            <i class="fas fa-exclamation-triangle fa-2x me-3"></i>
            <div>
                <h5 class="alert-heading mb-1">Error al cargar datos</h5>
                <p class="mb-0">Ocurrió un error al obtener la información. Por favor, intenta nuevamente.</p>
            </div>
        </div>
    `;
    $('#tabla-all-container, #tabla-capacitacion-container, #tabla-credito-container').html(errorHTML);
}

function aplicarFiltros() {
    const searchTerm = $('#search-input').val().toLowerCase();
    const graduadoFilter = $('#filter-graduado').val();
    const referenciaFilter = $('#filter-referencia').val();

    filteredData = historialData.filter(item => {
        const matchSearch = !searchTerm ||
            item.nombre.toLowerCase().includes(searchTerm) ||
            item.apellidos.toLowerCase().includes(searchTerm) ||
            item.correo_electronico.toLowerCase().includes(searchTerm) ||
            item.numero_celular.includes(searchTerm) ||
            (item.referencia && item.referencia.toLowerCase().includes(searchTerm));

        const matchGraduado = !graduadoFilter || item.graduado === graduadoFilter;

        const matchReferencia = !referenciaFilter ||
            (referenciaFilter === 'con' && item.referencia && item.referencia !== null && item.referencia !== '') ||
            (referenciaFilter === 'sin' && (!item.referencia || item.referencia === null || item.referencia === ''));

        return matchSearch && matchGraduado && matchReferencia;
    });

    // Aplicar ordenamiento si existe
    if (sortConfig.column) {
        ordenarDatos();
    }

    renderizarTablas();
}

function ordenarPor(column) {
    if (sortConfig.column === column) {
        // Si es la misma columna, cambiar dirección
        sortConfig.direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    } else {
        // Nueva columna, ordenar ascendente
        sortConfig.column = column;
        sortConfig.direction = 'asc';
    }

    ordenarDatos();
    renderizarTablas();
}

function ordenarDatos() {
    filteredData.sort((a, b) => {
        let valueA, valueB;

        if (sortConfig.column === 'nombre') {
            valueA = `${a.nombre} ${a.apellidos}`.toLowerCase();
            valueB = `${b.nombre} ${b.apellidos}`.toLowerCase();
        } else if (sortConfig.column === 'referencia') {
            // Ordenar referencias: primero las que tienen valor, luego las que no
            valueA = a.referencia || '';
            valueB = b.referencia || '';

            // Si ambas están vacías, son iguales
            if (!valueA && !valueB) return 0;
            // Si A está vacía, va después
            if (!valueA) return 1;
            // Si B está vacía, va después
            if (!valueB) return -1;

            valueA = valueA.toLowerCase();
            valueB = valueB.toLowerCase();
        }

        if (valueA < valueB) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });
}

function actualizarContadores() {
    // Contador total
    $('#badge-all').text(historialData.length);

    // Contador capacitación (sin número de referencia)
    const enCapacitacion = historialData.filter(item => !item.referencia || item.referencia === null || item.referencia === '').length;
    $('#badge-capacitacion').text(enCapacitacion);

    // Contador crédito (con número de referencia)
    const conCredito = historialData.filter(item => item.referencia && item.referencia !== null && item.referencia !== '').length;
    $('#badge-credito').text(conCredito);
}

function renderizarTablas() {
    // Pestaña activa
    const activeTab = $('.nav-link.active').attr('id');

    let dataToShow = filteredData;

    // Filtrar según pestaña activa
    if (activeTab === 'pills-capacitacion-tab') {
        // Capacitación: sin número de referencia
        dataToShow = filteredData.filter(item => !item.referencia || item.referencia === null || item.referencia === '');
    } else if (activeTab === 'pills-credito-tab') {
        // Crédito: con número de referencia
        dataToShow = filteredData.filter(item => item.referencia && item.referencia !== null && item.referencia !== '');
    }

    // Generar tabla
    const tablaHTML = generarTabla(dataToShow);

    // Insertar en el contenedor correspondiente
    if (activeTab === 'pills-all-tab') {
        $('#tabla-all-container').html(tablaHTML);
    } else if (activeTab === 'pills-capacitacion-tab') {
        $('#tabla-capacitacion-container').html(tablaHTML);
    } else if (activeTab === 'pills-credito-tab') {
        $('#tabla-credito-container').html(tablaHTML);
    }
}

function generarTabla(data) {
    if (data.length === 0) {
        return `
            <div class="alert alert-warning border-0 d-flex align-items-center" role="alert">
                <i class="fas fa-search fa-2x me-3"></i>
                <div>
                    <h5 class="alert-heading mb-1">Sin resultados</h5>
                    <p class="mb-0">No se encontraron emprendedores con los filtros aplicados.</p>
                </div>
            </div>
        `;
    }

    let tabla = `
        <table class="table table-hover align-middle">
            <thead class="table-light">
                <tr>
                    <th scope="col" class="text-center sortable" data-column="referencia" style="width: 150px; cursor: pointer;">
                        <i class="fas fa-hashtag text-muted me-2"></i>Referencia
                        ${sortConfig.column === 'referencia' ? (sortConfig.direction === 'asc' ? '<i class="fas fa-sort-up"></i>' : '<i class="fas fa-sort-down"></i>') : '<i class="fas fa-sort text-muted"></i>'}
                    </th>
                    <th scope="col" class="sortable" data-column="nombre" style="cursor: pointer;">
                        <i class="fas fa-user me-2"></i>Emprendedor
                        ${sortConfig.column === 'nombre' ? (sortConfig.direction === 'asc' ? '<i class="fas fa-sort-up"></i>' : '<i class="fas fa-sort-down"></i>') : '<i class="fas fa-sort text-muted"></i>'}
                    </th>
                    <th scope="col">
                        <i class="fas fa-envelope me-2"></i>Contacto
                    </th>
                    <th scope="col" class="text-center">
                        <i class="fas fa-graduation-cap me-2"></i>Graduación
                    </th>
                    <th scope="col" class="text-center" style="width: 120px;">Seguimiento a graduados</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(function (item) {
        const referenciaDisplay = item.referencia && item.referencia !== null && item.referencia !== ''
            ? `<span class="badge bg-primary fs-6"><i class="fas fa-credit-card me-1"></i>${item.referencia}</span>`
            : '<span class="text-muted"><i class="fas fa-minus"></i></span>';

        // Switch para graduación
        const graduadoChecked = item.graduado === '1' ? 'checked' : '';
        const fechaGraduacion = item.graduado === '1' && item.fecha_graduacion
            ? `<small class="text-success d-block mt-1"><i class="fas fa-calendar-check me-1"></i>${item.fecha_graduacion}</small>`
            : '';

        const graduacionSwitch = `
            <div class="form-check form-switch d-flex justify-content-center align-items-center">
                <input class="form-check-input switch-graduado" type="checkbox" role="switch" 
                       id="switch-grad-${item.id_emprendedor}" data-id="${item.id_emprendedor}" ${graduadoChecked}>
                <label class="form-check-label ms-2" for="switch-grad-${item.id_emprendedor}">
                    ${item.graduado === '1' ? '<i class="fas fa-graduation-cap text-success"></i>' : '<i class="fas fa-hourglass-half text-warning"></i>'}
                </label>
            </div>
            ${fechaGraduacion}
        `;

        const botonesSeguimientoHabilitados = item.graduado === '1' ? '' : 'disabled';

        tabla += `
            <tr>
                <td class="text-center">${referenciaDisplay}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px;">
                            <i class="fas fa-user text-primary"></i>
                        </div>
                        <div>
                            <div class="fw-bold">${item.nombre} ${item.apellidos}</div>
                            <small class="text-muted">ID: ${item.id_emprendedor}</small>
                        </div>
                    </div>
                </td>
                <td>
                    <div>
                        <a href="mailto:${item.correo_electronico}" class="text-decoration-none d-block mb-1">
                            <i class="fas fa-envelope text-primary me-2"></i>${item.correo_electronico}
                        </a>
                        <a href="tel:${item.numero_celular}" class="text-decoration-none d-block">
                            <i class="fas fa-phone text-success me-2"></i>${item.numero_celular}
                        </a>
                    </div>
                </td>
                <td class="text-center">${graduacionSwitch}</td>
                <td class="text-center">
                    <div class="btn-group btn-group-sm" role="group">
                        <button onclick=realizarSeguimientoGraduacion(${item.id_emprendedor}) ${botonesSeguimientoHabilitados} type="button" class="btn btn-outline-secondary" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });

    tabla += `
            </tbody>
        </table>
        <div class="d-flex justify-content-between align-items-center mt-3">
            <p class="text-muted mb-0">
                <i class="fas fa-info-circle me-2"></i>
                Mostrando <strong>${data.length}</strong> registro${data.length !== 1 ? 's' : ''}
            </p>
        </div>
    `;

    return tabla;
}

function actualizarGraduacion(emprendedorId, isGraduado, fechaGraduacion = null) {

    crearPeticion(urlAPI, {
        case: "actualizarGraduacion",
        data: $.param({
            id: emprendedorId,
            graduado: isGraduado ? '1' : '0',
            fechaGraduacion: fechaGraduacion || null
        })
    }, function (res) {
        console.log('Respuesta:', res);

        if (res.success) {
            const index = historialData.findIndex(item => item.id_emprendedor == emprendedorId);
            if (index !== -1) {
                historialData[index].graduado = isGraduado ? '1' : '0';
                historialData[index].fecha_graduacion = fechaGraduacion || null;
            }
            aplicarFiltros();
            const mensaje = res.msg;
            mostrarNotificacion(mensaje, 'success');
        } else {
            mostrarNotificacion(res.msg || 'Error al actualizar el estado', 'danger');
            $('#switch-grad-' + emprendedorId).prop('checked', !isGraduado);
        }
    }, function (err) {
        console.error('Error:', err);
        mostrarNotificacion('Error al actualizar el estado', 'danger');
        $('#switch-grad-' + emprendedorId).prop('checked', !isGraduado);
    });
}

function confirmarDesgraduacion(emprendedorId, switchElement) {
    const emprendedor = historialData.find(item => item.id_emprendedor == emprendedorId);
    const nombre = emprendedor ? `${emprendedor.nombre} ${emprendedor.apellidos}` : 'este emprendedor';
    alertaEliminar({
        mensajeAlerta: `Se regresará a ${nombre} al estado de capacitación?\n\nEsta acción removerá la fecha de graduación.`,
        url: urlAPI,
        data: {
            case: "actualizarGraduacion",
            data: $.param({
                id: emprendedorId,
                graduado: '0',
                fechaGraduacion: null
            })
        },
        fnCancel: function () {
            switchElement.prop('checked', true);
        }
    });
}

// Función para mostrar notificaciones temporales
function mostrarNotificacion(mensaje, tipo = 'success') {
    var fn = mostrarMensajeInfo;
    if (tipo === 'danger') {
        fn = mostrarMensajeError;
    } else if (tipo === 'warning') {
        fn = mostrarMensajeAdvertencia;
    } else if (tipo === 'success') {
        fn = mostrarMensajeOk;
    }
    fn(mensaje, false);
}

function realizarSeguimientoGraduacion(emprendedorId) {
    const emprendedor = historialData.find(item => item.id_emprendedor == emprendedorId);
    print(emprendedor);
    if (emprendedor) {
        crearPeticion(urlAPI, {
            case: "realizarSeguimientoGraduado",
            data: $.param({ emprendedor: emprendedorId, usuario: emprendedor.id })
        }, function (res) {
            if (res.success) {
                redireccionar("../seguimientoGraduado/");
            }
        });
    } else {
        mostrarNotificacion('No se encontró el emprendedor', 'warning');
    }
}