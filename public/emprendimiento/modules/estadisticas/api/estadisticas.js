// Dashboard de estadísticas mejorado con ApexCharts y jQuery
// CDN Requerido: https://cdn.jsdelivr.net/npm/apexcharts

const urlAPI = "api/EstadisticasAPI.php";

// Almacenar instancias de gráficas y datos
let chartInstances = {};
let chartData = {};
let currentModalChart = '';
let animationTimers = {};
let fullDetalleList = [];

// Paleta de colores moderna y vibrante
const chartColors = {
    primary: ['#4e73df', '#3758d6', '#2e4db5', '#224abe', '#1a3a9e'],
    success: ['#1cc88a', '#17b378', '#13a066', '#0f8c57', '#0c7848'],
    info: ['#36b9cc', '#2da5b8', '#2592a4', '#1d7f90', '#166b7c'],
    warning: ['#f6c23e', '#f4b925', '#e5a916', '#d69a0c', '#c78b08'],
    danger: ['#e74a3b', '#e02d1e', '#c91f10', '#b11a0c', '#9a1608'],
    mixed: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796', '#5a5c69', '#6610f2', '#e83e8c', '#fd7e14']
};

function getEmptyEstadisticas() {
    return {
        categorias: {
            mediosConocimiento: [],
            razonRecurre: [],
            solicitaCredito: [],
            utilizaCredito: []
        },
        detalle: []
    };
}

function ready() {
    loadApexCharts(function () {
        initializeDashboard();
    });
    configurarEventosFiltros();
    configurarEventosModales();
    setViewDetailsSummaryHandlers();
}

// Verificar si ApexCharts está cargado
function isApexChartsLoaded() {
    return typeof ApexCharts !== 'undefined';
}


function loadApexCharts(callback) {
    if (isApexChartsLoaded()) {
        callback();
        return;
    }
    const script = document.createElement('script');
    script.src = '../../../assets/libs/apexcharts/dist/apexcharts.min.js';
    script.onload = callback;
    document.head.appendChild(script);
}

function initializeDashboard() {
    // Inicializar fecha actual
    const lastUpdateEl = document.getElementById('lastUpdate');
    if (lastUpdateEl) {
        lastUpdateEl.textContent = new Date().toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Agregar loaders
    showLoaders();

    // Cargar datos
    crearPeticion(urlAPI, { case: 'init' }, function (respuesta) {
        //print(respuesta);
        const estadistica = respuesta.estadistica;
        const etapas = respuesta.listaEtapas;
        if (respuesta) {
            fullDetalleList = estadistica.detalle;
            hideLoaders();
            procesarDatosDashboard(estadistica.categorias, estadistica.detalle);
            cargarEtapas(etapas);
            setupSummaryCardButtons();
        } else {
            hideLoaders();
            mostrarMensajeAdvertencia('Error al cargar las estadísticas', false);
        }
    });

    // Configurar manejadores de eventos
    setDownloadHandlers();
    setChartTypeToggles();
    setPrintHandlers();
    setViewDetailsHandlers();
}

function cargarEtapas(etapas) {
    $selector = $("#etapa");
    etapas.forEach(function (it) {
        crearOpcionSelector($selector, it.idEtapa, it.nombre);
    });
}

// Mostrar indicadores de carga
function showLoaders() {
    const chartIds = [
        'chartMedioConocimiento',
        'chartRazonRecurre',
        'chartSolicitaCredito',
        'chartUtilizaCredito'
    ];

    chartIds.forEach(chartId => {
        const container = document.getElementById(chartId);
        if (container) {
            container.innerHTML = `
                <div class="text-center py-5">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Cargando...</span>
                    </div>
                    <p class="mt-3 text-muted">Cargando datos...</p>
                </div>
            `;
        }
    });
}

// Ocultar indicadores de carga y restaurar contenedores de gráficas
function hideLoaders() {
    // Mapeo directo de los IDs de las gráficas
    const chartIds = [
        'chartMedioConocimiento',
        'chartRazonRecurre',
        'chartSolicitaCredito',
        'chartUtilizaCredito'
    ];

    chartIds.forEach(chartId => {
        const container = document.getElementById(chartId);
        if (container && container.parentElement) {
            // Limpiar el contenedor padre (chart-wrapper) y restaurar el div con el ID correcto
            const wrapper = container.parentElement;
            wrapper.innerHTML = `<div id="${chartId}"></div>`;
        }
    });
}

// Procesar datos y renderizar dashboard
function procesarDatosDashboard(data, detalle) {
    if (!isApexChartsLoaded()) {
        console.error('ApexCharts no está disponible');
        return;
    }

    // Guardar datos para descarga
    chartData.chartMedioConocimiento = data.mediosConocimiento;
    chartData.chartRazonRecurre = data.razonRecurre;
    chartData.chartSolicitaCredito = data.solicitaCredito;
    chartData.chartUtilizaCredito = data.utilizaCredito;

    // Calcular estadísticas resumidas
    calcularEstadisticasResumen(detalle);

    // Renderizar gráficas con animación escalonada
    setTimeout(() => {
        renderApexChart('chartMedioConocimiento', 'pie', data.mediosConocimiento, '# de Emprendedores', chartColors.primary);
        updateChartStats('Medio', data.mediosConocimiento);
    }, 200);

    setTimeout(() => {
        renderApexChart('chartRazonRecurre', 'donut', data.razonRecurre, '# de Emprendedores', chartColors.success);
        updateChartStats('Razon', data.razonRecurre);
    }, 400);

    setTimeout(() => {
        renderApexChart('chartSolicitaCredito', 'bar', data.solicitaCredito, '# de Emprendedores', chartColors.info);
        updateChartStats('Solicita', data.solicitaCredito);
    }, 600);

    setTimeout(() => {
        renderApexChart('chartUtilizaCredito', 'bar', data.utilizaCredito, '# de Emprendedores', chartColors.warning);
        updateChartStats('Utiliza', data.utilizaCredito);
    }, 800);
}

// Calcular y mostrar estadísticas resumidas
function calcularEstadisticasResumen(detalle) {
    const totalEmprendedores = detalle.length;
    const totalCapacitacion = detalle.filter(item => item.referencia === null).length;
    const totalCreditos = detalle.filter(item => item.referencia !== null).length;

    // Animar contadores
    animateValue('totalEmprendedores', totalEmprendedores, 1500);
    animateValue('totalCapacitacion', totalCapacitacion, 1500);
    animateValue('totalCreditos', totalCreditos, 1500);
}

// Animar valores numéricos
function animateValue(id, end, duration, suffix = '') {
    const obj = document.getElementById(id);
    if (!obj) return;

    if (animationTimers[id]) {
        clearInterval(animationTimers[id]);
    }

    const start = parseInt(obj.textContent.replace(suffix, '')) || 0;

    const range = end - start;
    if (range === 0) {
        obj.textContent = end + suffix;
        return;
    }

    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
            delete animationTimers[id];
        }
        obj.textContent = Math.round(current) + suffix;
    }, 16);

    animationTimers[id] = timer;
}

// Actualizar estadísticas de cada gráfica
function updateChartStats(prefix, data) {
    const total = data.reduce((sum, item) => sum + parseInt(item.total), 0);
    const topItem = data.length > 0 ? data.reduce((max, item) => parseInt(item.total) > parseInt(max.total) ? item : max, data[0]) : null;

    const totalEl = document.getElementById(`stat${prefix}Total`);
    const topEl = document.getElementById(`stat${prefix}Top`);

    if (totalEl) totalEl.textContent = total;
    if (topEl) {
        if (topItem) {
            const shortDesc = topItem.descripcion.substring(0, 20) + (topItem.descripcion.length > 20 ? '...' : '');
            topEl.textContent = shortDesc;
            topEl.title = topItem.descripcion; // Tooltip con descripción completa
        } else {
            topEl.textContent = 'No disponible';
            topEl.title = 'No hay datos';
        }
    }
}

// Crear y renderizar gráfica con ApexCharts
function renderApexChart(chartId, chartType, data, label, colors) {
    const labels = data.map(item => item.descripcion);
    const seriesData = data.map(item => parseInt(item.total));

    createApexChart(chartId, chartType, labels, seriesData, label, colors);
}

// Crear instancia de ApexCharts
function createApexChart(chartId, chartType, labels, data, label, colors) {
    const container = document.getElementById(chartId);
    if (!container) {
        console.error(`Contenedor con id ${chartId} no encontrado`);
        return;
    }

    if (!isApexChartsLoaded()) {
        console.error('ApexCharts no está cargado');
        return;
    }

    // Destruir gráfica existente si hay
    if (chartInstances[chartId]) {
        chartInstances[chartId].destroy();
    }
    // Forzar la limpieza del contenedor para evitar problemas al cambiar de tipo de gráfica
    container.innerHTML = '';

    if (data.length === 0) {
        container.innerHTML = '<div class="text-center py-5"><p class="text-muted">No hay datos disponibles.</p></div>';
        return;
    }

    // Introducir un pequeño retraso para evitar condiciones de carrera en la renderización
    setTimeout(() => {
        const isHorizontal = chartType === 'horizontalBar';
        const actualType = isHorizontal ? 'bar' : chartType;

        let options = {
            series: (actualType === 'pie' || actualType === 'donut') ? data : [{ name: label, data: data }],
            chart: {
                type: actualType,
                height: 350,
                toolbar: {
                    show: false
                },
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800,
                    animateGradually: {
                        enabled: true,
                        delay: 150
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 350
                    }
                }
            },
            labels: labels,
            colors: colors,
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            dataLabels: {
                enabled: (actualType === 'pie' || actualType === 'donut'),
            },
            legend: {
                position: 'bottom',
                formatter: function (seriesName, opts) {
                    if (actualType === 'pie' || actualType === 'donut') {
                        const total = opts.w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                        const percentage = ((opts.w.globals.series[opts.seriesIndex] / total) * 100).toFixed(1);
                        return `${labels[opts.seriesIndex]}: ${opts.w.globals.series[opts.seriesIndex]} (${percentage}%)`;
                    }
                    return seriesName;
                }
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + " " + (label.split(' ').slice(2).join(' ') || '');
                    }
                }
            }
        };

        // Opciones específicas para gráficos de barras y cartesianos
        if (actualType === 'bar') {
            options.plotOptions = {
                bar: {
                    horizontal: isHorizontal,
                    borderRadius: 6,
                    dataLabels: {
                        position: 'top'
                    }
                }
            };
            options.xaxis = {
                categories: !isHorizontal ? labels : [],
                labels: {
                    formatter: function (value) {
                        if (typeof value === 'string' && value.length > 15) {
                            return value.substring(0, 15) + '...';
                        }
                        return value;
                    }
                }
            };
            options.yaxis = {
                labels: {
                    formatter: function (value) {
                        if (typeof value === 'string' && value.length > 15) {
                            return value.substring(0, 15) + '...';
                        }
                        return value;
                    }
                }
            };
            if (isHorizontal) {
                options.yaxis.categories = labels;
            }
        }

        try {
            const chart = new ApexCharts(container, options);
            chart.render();
            chartInstances[chartId] = chart;
            //console.log(`Gráfica ${chartId} creada exitosamente con ApexCharts`);
        } catch (error) {
            console.error(`Error al crear gráfica ${chartId} con ApexCharts:`, error);
        }
    }, 50);
}

// Configurar toggles de tipo de gráfica
function setChartTypeToggles() {
    $(document).on('click', '.btn-group[data-chart] button', function () {
        const $btn = $(this);
        const chartId = $btn.closest('.btn-group').data('chart');
        const newType = $btn.data('type');

        // Actualizar botones activos
        $btn.siblings().removeClass('btn-light').addClass('btn-outline-light');
        $btn.removeClass('btn-outline-light').addClass('btn-light');

        // Obtener datos originales
        const data = chartData[chartId];
        if (!data) {
            console.error(`No hay datos para ${chartId}`);
            return;
        }

        // Determinar colores según el chartId
        let colors;
        if (chartId.includes('Medio')) colors = chartColors.primary;
        else if (chartId.includes('Razon')) colors = chartColors.success;
        else if (chartId.includes('Solicita')) colors = chartColors.info;
        else colors = chartColors.warning;

        // Re-renderizar con nuevo tipo
        renderApexChart(chartId, newType, data, '# de Emprendedores', colors);
    });
}

// Configurar descarga de CSV
function setDownloadHandlers() {
    $(document).on('click', '.download-btn', function () {
        const chartId = $(this).data('chart');
        const title = $(this).data('title');
        const data = chartData[chartId];

        if (data && data.length > 0) {
            const csv = convertToCSV(data);
            downloadCSV(csv, `${title}_${new Date().toISOString().split('T')[0]}.csv`);

            // Feedback visual
            const $btn = $(this);
            const originalHtml = $btn.html();
            $btn.html('<i class="fas fa-check-circle me-1"></i>Descargado').prop('disabled', true);
            setTimeout(() => {
                $btn.html(originalHtml).prop('disabled', false);
            }, 2000);
        } else {
            alert("No hay datos disponibles para descargar.");
        }
    });
}

// Configurar manejadores de impresión
function setPrintHandlers() {
    $(document).on('click', '.print-chart-btn', function () {
        const chartId = $(this).data('chart');
        printChart(chartId);
    });
}

// Configurar manejadores de ver detalles
function setViewDetailsHandlers() {
    $(document).on('click', '.view-details-btn', function () {
        const chartId = $(this).data('chart');
        const title = $(this).data('title');
        showChartDetails(chartId, title);
    });
}

function setupSummaryCardButtons() {
   /* const cards = {
        'totalEmprendedores': 'emprendedores',
        'totalCapacitacion': 'capacitacion',
        'totalCreditos': 'creditos'
    };

    for (const id in cards) {
        const el = document.getElementById(id);
        if (el) {
            const cardBody = el.closest('.card-body');
            if (cardBody) {
                let footer = cardBody.querySelector('.card-footer-custom');
                if (!footer) {
                    footer = document.createElement('div');
                    footer.className = 'card-footer-custom text-end p-3';
                    cardBody.appendChild(footer);
                }
                // Avoid adding button if it already exists
                if (!footer.querySelector('.view-details-summary-btn')) {
                    const button = document.createElement('button');
                    button.className = 'btn btn-sm btn-outline-primary view-details-summary-btn';
                    button.dataset.categoria = cards[id];
                    button.innerHTML = '<i class="fas fa-eye me-1"></i> Ver detalles';
                    footer.appendChild(button);
                }
            }
        }
    }*/
}

function setViewDetailsSummaryHandlers() {
    $(document).on('click', '.view-details-summary-btn', function () {
        const categoria = $(this).data('categoria');
        mostrarDetalles(categoria, fullDetalleList);
    });
}

function mostrarDetalles(categoria, detalleList) {
    let filteredData = [];
    let title = '';

    switch (categoria) {
        case 'emprendedores':
            filteredData = detalleList;
            title = 'Detalle de Emprendedores';
            break;
        case 'capacitacion':
            filteredData = detalleList.filter(item => item.referencia === null);
            title = 'Detalle de Emprendedores en Capacitación';
            break;
        case 'creditos':
            filteredData = detalleList.filter(item => item.referencia !== null);
            title = 'Detalle de Emprendedores con Crédito';
            break;
    }

    let container = document.getElementById('detalles-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'detalles-container';
        const summaryRow = document.getElementById('totalEmprendedores').closest('.row');
        if (summaryRow && summaryRow.parentElement) {
            summaryRow.parentElement.insertBefore(container, summaryRow.nextSibling);
        }
    }

    container.innerHTML = `
        <div class="card mt-4">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="card-title mb-0">${title}</h5>
                <button type="button" class="btn-close" aria-label="Close" onclick="document.getElementById('detalles-container').style.display = 'none';"></button>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table id="detalles-table" class="table table-striped table-bordered" style="width:100%">
                        <thead>
                            <tr>
                                <th>Referencia</th>
                                <th>Emprendedor</th>
                                <th>Correo</th>
                                <th>Teléfono</th>
                                <th>Etapa</th>
                                <th>Razón Recurre</th>
                                <th>Solicita Crédito</th>
                                <th>Utiliza Crédito</th>
                                <th>Medios Conocimiento</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    const tableBody = container.querySelector('#detalles-table tbody');
    let rows = '';
    filteredData.forEach(item => {
        const medios = item.medios_conocimiento ? item.medios_conocimiento.split('^').join('<br>') : 'N/A';
        rows += `
            <tr>
                <td>${item.referencia || 'N/A'}</td>
                <td>${item.emprendedor}</td>
                <td>${item.correo}</td>
                <td>${item.tel}</td>
                <td>${item.etapaNombre}</td>
                <td>${item.razonRecurreDescripcion || 'N/A'}</td>
                <td>${item.solicitaCreditoDescripcion || 'N/A'}</td>
                <td>${item.utilizaCreditoDescripcion || 'N/A'}</td>
                <td>${medios}</td>
            </tr>
        `;
    });
    tableBody.innerHTML = rows;

    if ($.fn.DataTable.isDataTable('#detalles-table')) {
        $('#detalles-table').DataTable().destroy();
    }
    $('#detalles-table').DataTable({
        responsive: true,
        language: {
            url: '../../../assets/libs/datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js',
        },
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });

    container.style.display = 'block';
    $('html, body').animate({
        scrollTop: $(container).offset().top
    }, 500);
}

// Mostrar detalles de la gráfica en modal
function showChartDetails(chartId, title) {
    const data = chartData[chartId];
    if (!data || data.length === 0) {
        alert('No hay datos disponibles para mostrar.');
        return;
    }

    // Guardar el chartId actual para descarga desde el modal
    currentModalChart = chartId;

    // Actualizar título del modal
    $('#chartDetailsModalLabel').html(`<i class="fas fa-chart-line me-2"></i>${title}`);

    // Calcular total para porcentajes
    const total = data.reduce((sum, item) => sum + parseInt(item.total), 0);

    // Generar filas de la tabla
    const tbody = $('#chartDetailsTable tbody');
    tbody.empty();

    data.forEach((item, index) => {
        const percentage = ((parseInt(item.total) / total) * 100).toFixed(2);
        const row = `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${item.descripcion}</td>
                <td class="text-end fw-bold">${item.total}</td>
                <td class="text-end">
                    <span class="badge bg-primary">${percentage}%</span>
                </td>
            </tr>
        `;
        tbody.append(row);
    });

    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('chartDetailsModal'));
    modal.show();
}

// Configurar eventos de modales
function configurarEventosModales() {
    // Descargar datos desde el modal
    $(document).on('click', '#downloadModalData', function () {
        if (currentModalChart && chartData[currentModalChart]) {
            const data = chartData[currentModalChart];
            const title = $('#chartDetailsModalLabel').text().replace(/\s+/g, '_');
            const csv = convertToCSV(data);
            downloadCSV(csv, `${title}_${new Date().toISOString().split('T')[0]}.csv`);

            // Feedback visual
            const $btn = $(this);
            const originalHtml = $btn.html();
            $btn.html('<i class="fas fa-check-circle me-1"></i>Descargado').prop('disabled', true);
            setTimeout(() => {
                $btn.html(originalHtml).prop('disabled', false);
            }, 2000);
        }
    });
}

// Convertir a CSV con BOM UTF-8
function convertToCSV(data) {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(row =>
        Object.values(row).map(val => `"${val}"`).join(',')
    );
    return '\uFEFF' + [header, ...rows].join('\n');
}

// Descargar archivo CSV
function downloadCSV(csvContent, fileName) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Función para imprimir gráfica individual
async function printChart(chartId) {
    if (!chartInstances[chartId]) {
        console.error(`Gráfica ${chartId} no disponible`);
        return;
    }

    const chart = chartInstances[chartId];
    const chartTitle = $(`#${chartId}`).closest('.card').find('.card-header h6').text();

    const dataUrl = await chart.dataURI();

    const win = window.open('', '_blank');
    win.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Gráfica - ${chartId}</title>
            <style>
                body {
                    margin: 0;
                    padding: 20px;
                    font-family: Arial, sans-serif;
                    text-align: center;
                }
                img {
                    max-width: 100%;
                    height: auto;
                }
                h2 {
                    color: #333;
                    margin-bottom: 20px;
                }
                .footer {
                    margin-top: 30px;
                    font-size: 12px;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <h2>Dashboard de Línea Base</h2>
            <h3>${chartTitle}</h3>
            <img src="${dataUrl.imgURI}" />
            <div class="footer">
                <p>Generado el: ${new Date().toLocaleString('es-MX')}</p>
            </div>
        </body>
        </html>
    `);
    win.document.close();

    setTimeout(() => {
        win.print();
    }, 500);
}

// Detectar theme oscuro
function detectDarkMode() {
    if (!isApexChartsLoaded()) return;

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        Apex.tooltip.theme = 'dark';
    }
}

// Función debounce (si es necesaria para otras cosas)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function configurarEventosFiltros() {
    $('#limpiarFiltros').click(refresh);
    const $form = $('#filtrosEstadisticasForm');

    if ($form) {
        $form.on('submit', function (e) {
            e.preventDefault();
            showLoaders();
            crearPeticion(urlAPI, { case: "filtrarEstadisticas", data: $form.serialize() }, function (respuesta) {
                //print(respuesta);
                if (respuesta.categorias && respuesta.detalle.length > 0) {
                    fullDetalleList = respuesta.detalle;
                    procesarDatosDashboard(respuesta.categorias, respuesta.detalle);
                } else {
                    fullDetalleList = [];
                    const emptyData = getEmptyEstadisticas();
                    procesarDatosDashboard(emptyData.categorias, emptyData.detalle);
                    mostrarMensajeAdvertencia('El filtro aplicado no arrojó resultados', false);
                }
                hideLoaders();
            });
        });
    }
}
