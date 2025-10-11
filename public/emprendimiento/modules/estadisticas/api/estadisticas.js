//CONTENIDO DE estadisticas.js
// Descripción: Dashboard de estadísticas mejorado con Chart.js y jQuery
// CDN Requerido: https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js

const urlAPI = "api/EstadisticasAPI.php";

// Almacenar instancias de gráficas y datos
let chartInstances = {};
let chartData = {};
let rawData = {};

// Paleta de colores moderna y vibrante
const chartColors = {
    primary: ['#4e73df', '#3758d6', '#2e4db5', '#224abe', '#1a3a9e'],
    success: ['#1cc88a', '#17b378', '#13a066', '#0f8c57', '#0c7848'],
    info: ['#36b9cc', '#2da5b8', '#2592a4', '#1d7f90', '#166b7c'],
    warning: ['#f6c23e', '#f4b925', '#e5a916', '#d69a0c', '#c78b08'],
    danger: ['#e74a3b', '#e02d1e', '#c91f10', '#b11a0c', '#9a1608'],
    mixed: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796', '#5a5c69', '#6610f2', '#e83e8c', '#fd7e14']
};

// Verificar si Chart.js está cargado
function isChartJsLoaded() {
    return typeof Chart !== 'undefined';
}

// Cargar Chart.js dinámicamente si no está disponible
function loadChartJs(callback) {
    if (isChartJsLoaded()) {
        initializeChartDefaults();
        callback();
        return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js';
    script.onload = function() {
        console.log('Chart.js cargado exitosamente');
        initializeChartDefaults();
        callback();
    };
    script.onerror = function() {
        console.error('Error al cargar Chart.js');
        alert('Error al cargar la librería de gráficas. Por favor, recarga la página.');
    };
    document.head.appendChild(script);
}

// Inicializar configuración global de Chart.js
function initializeChartDefaults() {
    if (!isChartJsLoaded()) return;
    
    Chart.defaults.font.family = "'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
    Chart.defaults.plugins.legend.labels.padding = 15;
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    
    detectDarkMode();
}

function ready() {
    // Esperar a que el DOM esté completamente cargado
    $(document).ready(function() {
        // Verificar que los canvas existen antes de continuar
        const canvasIds = ['chartMedioConocimiento', 'chartRazonRecurre', 'chartSolicitaCredito', 'chartUtilizaCredito'];
        const allCanvasExist = canvasIds.every(id => document.getElementById(id) !== null);
        
        if (!allCanvasExist) {
            console.error('Algunos canvas no están disponibles en el DOM');
            // Reintentar después de un breve delay
            setTimeout(function() {
                initializeApp();
            }, 500);
        } else {
            initializeApp();
        }
    });
}

function initializeApp() {
    // Cargar Chart.js y luego inicializar el dashboard
    loadChartJs(function() {
        initializeDashboard();
    });
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
    crearPeticion(urlAPI, { case: 'obtenerEstadisticasLineaBase' }, function (respuesta) {
        print(respuesta);
        if (respuesta) {
            rawData = respuesta;
            procesarDatosDashboard(respuesta);
            hideLoaders();
        } else {
            hideLoaders();
            mostrarMensajeAdvertencia('Error al cargar las estadísticas', false);
        }
    });

    // Configurar manejadores de eventos
    setDownloadHandlers();
    setChartTypeToggles();
}

// Mostrar indicadores de carga
function showLoaders() {
    $('.chart-wrapper').each(function() {
        const canvasId = $(this).find('canvas').attr('id');
        if (canvasId) {
            $(this).html(`
                <div class="text-center py-5">
                    <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Cargando...</span>
                    </div>
                    <p class="mt-2 text-muted">Cargando datos...</p>
                </div>
            `);
        }
    });
}

// Ocultar indicadores de carga y restaurar canvas
function hideLoaders() {
    $('.chart-wrapper').each(function() {
        const $wrapper = $(this);
        const cardBody = $wrapper.closest('.card-body');
        const chartId = cardBody.closest('.card').find('.download-btn').data('chart');
        
        if (chartId) {
            $wrapper.html(`<canvas id="${chartId}"></canvas>`);
        }
    });
}

// Procesar datos y renderizar dashboard
function procesarDatosDashboard(data) {
    if (!isChartJsLoaded()) {
        console.error('Chart.js no está disponible');
        return;
    }

    // Guardar datos para descarga
    chartData.chartMedioConocimiento = data.mediosConocimiento;
    chartData.chartRazonRecurre = data.razonRecurre;
    chartData.chartSolicitaCredito = data.solicitaCredito;
    chartData.chartUtilizaCredito = data.utilizaCredito;

    // Calcular estadísticas resumidas
    calcularEstadisticasResumen(data);

    // Renderizar gráficas con animación escalonada
    setTimeout(() => {
        renderChart('chartMedioConocimiento', 'pie', data.mediosConocimiento, '# de Emprendedores', chartColors.primary);
        updateChartStats('Medio', data.mediosConocimiento);
    }, 200);

    setTimeout(() => {
        renderChart('chartRazonRecurre', 'doughnut', data.razonRecurre, '# de Emprendedores', chartColors.success);
        updateChartStats('Razon', data.razonRecurre);
    }, 400);

    setTimeout(() => {
        renderChart('chartSolicitaCredito', 'bar', data.solicitaCredito, '# de Emprendedores', chartColors.info);
        updateChartStats('Solicita', data.solicitaCredito);
    }, 600);

    setTimeout(() => {
        renderChart('chartUtilizaCredito', 'bar', data.utilizaCredito, '# de Emprendedores', chartColors.warning);
        updateChartStats('Utiliza', data.utilizaCredito);
    }, 800);
}

// Calcular y mostrar estadísticas resumidas
function calcularEstadisticasResumen(data) {
    const totalMedios = data.mediosConocimiento.reduce((sum, item) => sum + parseInt(item.total), 0);
    const totalCapacitacion = data.razonRecurre
        .filter(item => item.descripcion.toLowerCase().includes('capacitación'))
        .reduce((sum, item) => sum + parseInt(item.total), 0);
    const totalCreditos = data.solicitaCredito.reduce((sum, item) => sum + parseInt(item.total), 0);

    // Animar contadores
    animateValue('totalEmprendedores', 0, totalMedios, 1500);
    animateValue('totalCapacitacion', 0, totalCapacitacion, 1500);
    animateValue('totalCreditos', 0, totalCreditos, 1500);
}

// Animar valores numéricos
function animateValue(id, start, end, duration, suffix = '') {
    const obj = document.getElementById(id);
    if (!obj) return;
    
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        obj.textContent = Math.round(current) + suffix;
    }, 16);
}

// Actualizar estadísticas de cada gráfica
function updateChartStats(prefix, data) {
    const total = data.reduce((sum, item) => sum + parseInt(item.total), 0);
    const topItem = data.reduce((max, item) => parseInt(item.total) > parseInt(max.total) ? item : max, data[0]);
    
    const totalEl = document.getElementById(`stat${prefix}Total`);
    const topEl = document.getElementById(`stat${prefix}Top`);
    
    if (totalEl) totalEl.textContent = total;
    if (topEl) {
        const shortDesc = topItem.descripcion.substring(0, 20) + (topItem.descripcion.length > 20 ? '...' : '');
        topEl.textContent = shortDesc;
        topEl.title = topItem.descripcion; // Tooltip con descripción completa
    }
}

// Crear y renderizar gráfica
function renderChart(chartId, chartType, data, label, colors) {
    const labels = data.map(item => item.descripcion);
    const dataValues = data.map(item => parseInt(item.total));
    
    createChart(chartId, chartType, labels, dataValues, label, colors);
}

// Crear instancia de Chart.js
function createChart(chartId, chartType, labels, data, label, colors) {
    // Verificar que el canvas existe en el DOM
    const ctx = document.getElementById(chartId);
    if (!ctx) {
        console.error(`Canvas con id ${chartId} no encontrado`);
        return;
    }

    if (!isChartJsLoaded()) {
        console.error('Chart.js no está cargado');
        return;
    }

    // Destruir gráfica existente si hay
    if (chartInstances[chartId]) {
        chartInstances[chartId].destroy();
    }

    const isHorizontal = chartType === 'horizontalBar';
    const actualType = isHorizontal ? 'bar' : chartType;

    const config = {
        type: actualType,
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: colors,
                borderColor: '#ffffff',
                borderWidth: 2,
                borderRadius: chartType === 'bar' || isHorizontal ? 6 : 0,
                hoverOffset: chartType === 'pie' || chartType === 'doughnut' ? 15 : 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: isHorizontal ? 'y' : 'x',
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: {
                    display: chartType === 'pie' || chartType === 'doughnut',
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 11
                        },
                        generateLabels: function(chart) {
                            const data = chart.data;
                            if (data.labels.length && data.datasets.length) {
                                return data.labels.map((label, i) => {
                                    const value = data.datasets[0].data[i];
                                    const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                                    const percentage = ((value / total) * 100).toFixed(1);
                                    // Acortar etiquetas largas
                                    const shortLabel = label.length > 25 ? label.substring(0, 25) + '...' : label;
                                    return {
                                        text: `${shortLabel}: ${value} (${percentage}%)`,
                                        fillStyle: data.datasets[0].backgroundColor[i],
                                        hidden: false,
                                        index: i
                                    };
                                });
                            }
                            return [];
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed.y || context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return ` ${context.dataset.label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            scales: (chartType === 'bar' || isHorizontal) ? {
                [isHorizontal ? 'x' : 'y']: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0,
                        font: {
                            size: 11
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                [isHorizontal ? 'y' : 'x']: {
                    ticks: {
                        font: {
                            size: 10
                        },
                        callback: function(value) {
                            // Acortar etiquetas del eje
                            const label = this.getLabelForValue(value);
                            return label.length > 15 ? label.substring(0, 15) + '...' : label;
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            } : {}
        }
    };

    try {
        chartInstances[chartId] = new Chart(ctx, config);
        console.log(`Gráfica ${chartId} creada exitosamente`);
    } catch (error) {
        console.error(`Error al crear gráfica ${chartId}:`, error);
    }
}

// Configurar toggles de tipo de gráfica
function setChartTypeToggles() {
    $(document).on('click', '.chart-type-toggle button', function() {
        const $btn = $(this);
        const chartId = $btn.closest('.chart-type-toggle').data('chart');
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
        renderChart(chartId, newType, data, '# de Emprendedores', colors);
    });
}

// Configurar descarga de CSV
function setDownloadHandlers() {
    $(document).on('click', '.download-btn', function() {
        const chartId = $(this).data('chart');
        const title = $(this).data('title');
        const data = chartData[chartId];

        if (data && data.length > 0) {
            const csv = convertToCSV(data);
            downloadCSV(csv, `${title}_${new Date().toISOString().split('T')[0]}.csv`);
            
            // Feedback visual
            const $btn = $(this);
            const originalHtml = $btn.html();
            $btn.html('<i class="fas fa-check mr-1"></i>Descargado').prop('disabled', true);
            setTimeout(() => {
                $btn.html(originalHtml).prop('disabled', false);
            }, 2000);
        } else {
            alert("No hay datos disponibles para descargar.");
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
function printChart(chartId) {
    if (!chartInstances[chartId]) {
        console.error(`Gráfica ${chartId} no disponible`);
        return;
    }
    
    const chart = chartInstances[chartId];
    const canvas = chart.canvas;
    const win = window.open('', '_blank');
    const chartTitle = $(`#${chartId}`).closest('.card').find('.card-header h6').text();
    
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
            <img src="${canvas.toDataURL('image/png')}" />
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
    if (!isChartJsLoaded()) return;
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        Chart.defaults.color = '#fff';
        Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
    }
}

// Responsive: Ajustar gráficas en resize
$(window).on('resize', debounce(function() {
    Object.keys(chartInstances).forEach(chartId => {
        if (chartInstances[chartId]) {
            chartInstances[chartId].resize();
        }
    });
}, 250));

// Función debounce
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

