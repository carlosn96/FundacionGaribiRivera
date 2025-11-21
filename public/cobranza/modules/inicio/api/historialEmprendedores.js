const urlAPI = "api/HistoricoEmprendedoresAPI.php";

let historialData = [];
let filteredData = [];
let sortConfig = {
    column: null,
    direction: 'asc'
};
let emprendedorActual = null;

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
    $('#filter-referencia').on('change', function () {
        aplicarFiltros();
    });

    // Botón actualizar
    $('#btn-refresh').on('click', function () {
        $(this).find('i').addClass('fa-spin');
        cargarDatos();
        setTimeout(() => {
            $(this).find('i').removeClass('fa-spin');
        }, 1000);
    });

    // Botón exportar
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

    // Evento para abrir el modal de edición de referencia
    $(document).on('click', '.btn-editar-referencia', function () {
        const emprendedorId = $(this).data('id');
        emprendedorActual = historialData.find(item => item.id_emprendedor == emprendedorId);

        if (emprendedorActual) {
            $('#nombreEmprendedorRef').text(`${emprendedorActual.nombre} ${emprendedorActual.apellidos}`);
            $('#numeroReferencia').val(emprendedorActual.referencia || '');
            
            // Formatear la fecha para el input type="date" (YYYY-MM-DD)
            const fechaCredito = emprendedorActual.fecha_credito ? emprendedorActual.fecha_credito.split(' ')[0] : '';
            $('#fechaOtorgamiento').val(fechaCredito);

            const modal = new bootstrap.Modal(document.getElementById('modalActualizarReferencia'));
            modal.show();
        }
    });

    // Evento para guardar los cambios de referencia desde el modal
    $('#form-actualizar-referencia').on('submit', function (e) {
        e.preventDefault(); // Prevenir el envío tradicional del formulario

        const numeroReferencia = $('#numeroReferencia').val();
        const fechaOtorgamiento = $('#fechaOtorgamiento').val();

        if (emprendedorActual) {
            actualizarReferencia(emprendedorActual.id_emprendedor, numeroReferencia, fechaOtorgamiento);

            const modal = bootstrap.Modal.getInstance(document.getElementById('modalActualizarReferencia'));
            modal.hide();

            emprendedorActual = null;
        }
    });
}

function cargarDatos() {
    mostrarCargando();

    crearPeticion(urlAPI, { case: "getHistorialEmprendedores" }, function (res) {
        //console.log('Respuesta recibida:', res);

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

    let csv = 'ID Emprendedor,Nombre Completo,Correo Electrónico,Número Celular,Referencia,Fecha Crédito\n';

    function escapeCsvValue(value) {
        if (value === null || value === undefined) {
            return '';
        }
        value = String(value);
        if (value.includes('"') || value.includes(',') || value.includes('\n')) {
            value = '"' + value.replace(/"/g, '""') + '"';
        }
        return value;
    }

    dataToExport.forEach(function (item) {
        const nombreCompleto = `${item.nombre} ${item.apellidos}`;
        const referencia = item.referencia || 'Sin referencia';
        const fechaCredito = item.fecha_credito || 'N/A';

        csv += `${escapeCsvValue(item.id_emprendedor)},${escapeCsvValue(nombreCompleto)},${escapeCsvValue(item.correo_electronico)},${escapeCsvValue(item.numero_celular)},${escapeCsvValue(referencia)},${escapeCsvValue(fechaCredito)}\n`;
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
            <div class="spinner-border text-primary" role="status" style="width: 2.5rem; height: 2.5rem;">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="mt-3 text-muted mb-0">Cargando información...</p>
        </div>
    `;
    $('#tabla-all-container, #tabla-capacitacion-container, #tabla-credito-container').html(spinnerHTML);
}

function mostrarMensajeVacio() {
    const emptyHTML = `
        <div class="text-center py-5">
            <div class="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 64px; height: 64px;">
                <i class="fas fa-inbox fa-2x text-muted"></i>
            </div>
            <h5 class="text-muted mb-2">No hay datos disponibles</h5>
            <p class="text-muted small mb-0">No se encontraron registros de emprendedores.</p>
        </div>
    `;
    $('#tabla-all-container, #tabla-capacitacion-container, #tabla-credito-container').html(emptyHTML);
}

function mostrarError() {
    const errorHTML = `
        <div class="alert alert-danger border-0 d-flex align-items-start" role="alert">
            <i class="fas fa-exclamation-circle fa-lg me-3 mt-1"></i>
            <div>
                <h6 class="alert-heading mb-1">Error al cargar datos</h6>
                <p class="mb-0 small">Ocurrió un error al obtener la información. Por favor, intenta nuevamente.</p>
            </div>
        </div>
    `;
    $('#tabla-all-container, #tabla-capacitacion-container, #tabla-credito-container').html(errorHTML);
}

function aplicarFiltros() {
    const searchTerm = $('#search-input').val().toLowerCase();
    const referenciaFilter = $('#filter-referencia').val();

    filteredData = historialData.filter(item => {
        const matchSearch = !searchTerm ||
            item.nombre.toLowerCase().includes(searchTerm) ||
            item.apellidos.toLowerCase().includes(searchTerm) ||
            item.correo_electronico.toLowerCase().includes(searchTerm) ||
            item.numero_celular.includes(searchTerm) ||
            (item.referencia && item.referencia.toLowerCase().includes(searchTerm));

        const matchReferencia = !referenciaFilter ||
            (referenciaFilter === 'con' && item.referencia && item.referencia !== null && item.referencia !== '') ||
            (referenciaFilter === 'sin' && (!item.referencia || item.referencia === null || item.referencia === ''));

        return matchSearch && matchReferencia;
    });

    if (sortConfig.column) {
        ordenarDatos();
    }

    renderizarTablas();
}

function ordenarPor(column) {
    if (sortConfig.column === column) {
        sortConfig.direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    } else {
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
            valueA = a.referencia || '';
            valueB = b.referencia || '';

            if (!valueA && !valueB) return 0;
            if (!valueA) return 1;
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
    $('#badge-all').text(historialData.length);

    const enCapacitacion = historialData.filter(item => !item.referencia || item.referencia === null || item.referencia === '').length;
    $('#badge-capacitacion').text(enCapacitacion);

    const conCredito = historialData.filter(item => item.referencia && item.referencia !== null && item.referencia !== '').length;
    $('#badge-credito').text(conCredito);
}

function renderizarTablas() {
    const activeTab = $('.nav-link.active').attr('id');
    let dataToShow = filteredData;

    if (activeTab === 'pills-capacitacion-tab') {
        dataToShow = filteredData.filter(item => !item.referencia || item.referencia === null || item.referencia === '');
    } else if (activeTab === 'pills-credito-tab') {
        dataToShow = filteredData.filter(item => item.referencia && item.referencia !== null && item.referencia !== '');
    }

    const tablaHTML = generarTabla(dataToShow);

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
            <div class="text-center py-5">
                <div class="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 64px; height: 64px;">
                    <i class="fas fa-search fa-2x text-muted"></i>
                </div>
                <h5 class="text-muted mb-2">Sin resultados</h5>
                <p class="text-muted small mb-0">No se encontraron emprendedores con los filtros aplicados.</p>
            </div>
        `;
    }

    let tabla = `
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="bg-light">
                    <tr>
                        <th scope="col" class="border-0 text-center sortable" data-column="referencia" style="width: 140px; cursor: pointer;">
                            <div class="d-flex align-items-center justify-content-center gap-2">
                                <span class="text-muted small">Referencia</span>
                                ${sortConfig.column === 'referencia' ? (sortConfig.direction === 'asc' ? '<i class="fas fa-sort-up text-primary"></i>' : '<i class="fas fa-sort-down text-primary"></i>') : '<i class="fas fa-sort text-muted opacity-50"></i>'}
                            </div>
                        </th>
                        <th scope="col" class="border-0 sortable" data-column="nombre" style="cursor: pointer;">
                            <div class="d-flex align-items-center gap-2">
                                <span class="text-muted small">Emprendedor</span>
                                ${sortConfig.column === 'nombre' ? (sortConfig.direction === 'asc' ? '<i class="fas fa-sort-up text-primary"></i>' : '<i class="fas fa-sort-down text-primary"></i>') : '<i class="fas fa-sort text-muted opacity-50"></i>'}
                            </div>
                        </th>
                        <th scope="col" class="border-0">
                            <span class="text-muted small">Contacto</span>
                        </th>
                        <th scope="col" class="border-0 text-center" style="width: 120px;">
                            <span class="text-muted small">Acciones</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
    `;

    data.forEach(function (item) {
        const referenciaDisplay = item.referencia && item.referencia !== null && item.referencia !== ''
            ? `<span class="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-3 py-2">
                   <i class="fas fa-credit-card me-1"></i>${item.referencia}
               </span>`
            : '<span class="text-muted"><i class="fas fa-minus"></i></span>';
        
        const fechaCredito = item.fecha_credito
            ? `<small class="text-success d-block mt-1">
                   <i class="fas fa-calendar-check me-1"></i>${formatearFecha(item.fecha_credito)}
               </small>`
            : '';

        const fotografiaDisplay = item.fotografia
            ? `<img src="data:image/jpeg;base64,${item.fotografia}" alt="Fotografía" class="rounded-circle me-3" style="width: 44px; height: 44px; min-width: 44px; object-fit: cover;">`
            : `<div class="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style="min-width: 44px; width: 44px; height: 44px;">
                   <i class="fas fa-user text-primary"></i>
               </div>`;
        tabla += `
            <tr>
                <td class="text-center">
                    ${referenciaDisplay}
                    ${fechaCredito}
                </td>
                <td>
                    <div class="d-flex align-items-center">
                        ${fotografiaDisplay}
                        <div>
                           <a href="./../../../difusion/modules/actualizarEmprendedores?id=${item.id}" class="fw-semibold">
                            ${item.nombre} ${item.apellidos}
                           </a>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="small">
                        <a href="mailto:${item.correo_electronico}" class="text-decoration-none text-dark d-flex align-items-center mb-1">
                            <i class="fas fa-envelope text-primary me-2"></i>
                            <span class="text-truncate" style="max-width: 200px;">${item.correo_electronico}</span>
                        </a>
                        <a href="tel:${item.numero_celular}" class="text-decoration-none text-dark d-flex align-items-center">
                            <i class="fas fa-phone text-success me-2"></i>${item.numero_celular}
                        </a>
                    </div>
                </td>
                <td class="text-center">
                    <button type="button" class="btn btn-sm btn-outline-primary btn-editar-referencia" 
                            title="Editar Referencia"
                            data-id="${item.id_emprendedor}">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    tabla += `
                </tbody>
            </table>
        </div>
        <div class="d-flex justify-content-between align-items-center mt-3 px-2">
            <p class="text-muted small mb-0">
                <i class="fas fa-info-circle me-1"></i>
                Mostrando <strong>${data.length}</strong> registro${data.length !== 1 ? 's' : ''}
            </p>
        </div>
    `;

    return tabla;
}

function formatearFecha(fecha) {
    if (!fecha) return '';

    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const partes = fecha.split('-');

    if (partes.length === 3) {
        const año = partes[0];
        const mes = meses[parseInt(partes[1]) - 1];
        const dia = parseInt(partes[2]);
        return `${dia} ${mes} ${año}`;
    }

    return fecha;
}

function actualizarReferencia(emprendedorId, referencia, fechaOtorgamiento) {
    crearPeticion(urlAPI, {
        case: "actualizarReferencia",
        data: $.param({
            id: emprendedorId,
            referencia: referencia,
            fechaOtorgamiento: fechaOtorgamiento
        })
    }, function (res) {
        //console.log('Respuesta:', res);

        if (res.success) {
            const index = historialData.findIndex(item => item.id_emprendedor == emprendedorId);
            if (index !== -1) {
                historialData[index].referencia = referencia;
                historialData[index].fecha_credito = fechaOtorgamiento;
            }
            aplicarFiltros();
            mostrarNotificacion(res.msg || 'Referencia actualizada correctamente', 'success');
        } else {
            mostrarNotificacion(res.msg || 'Error al actualizar la referencia', 'danger');
        }
    }, function (err) {
        console.error('Error:', err);
        mostrarNotificacion('Error de conexión al actualizar la referencia', 'danger');
    });
}

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
