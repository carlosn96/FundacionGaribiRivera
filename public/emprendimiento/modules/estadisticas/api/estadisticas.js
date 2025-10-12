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
        print(respuesta);
        const estadistica = respuesta.estadistica;
        const etapas = respuesta.listaEtapas;
        const campos = respuesta.campos;
        if (respuesta) {
            fullDetalleList = estadistica.detalle;
            hideLoaders();
            procesarDatosDashboard(estadistica.categorias, estadistica.detalle);
            cargarEtapas(etapas);
            construirCamposFiltro(campos);
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

function construirCamposFiltro(campos) {
    const contenedor = $("#campoSelectorContainer");
    contenedor.empty();

    // Crear contenedor principal
    const wrapper = $("<div class=\"px-2 px-md-3 py-2\"></div>");

    // Título y descripción
    const header = $(
        `<div class=\"mb-3\">
            <h6 class=\"fw-semibold mb-1\">Seleccionar Campos</h6>
            <p class=\"text-muted small mb-0\">Elige los campos que deseas visualizar en los resultados</p>
        </div>`
    );
    wrapper.append(header);

    // Contenedor de checkboxes con grid responsivo
    const gridContainer = $("<div class=\"row g-2 g-md-3\"></div>");

    $.each(campos, function(key, campo) {
        // Columna responsiva: 1 en móvil, 2 en tablet, 3 en desktop
        const col = $("<div class=\"col-12 col-sm-6 col-lg-4\"></div>");

        // Card para cada checkbox
        const card = $("<div class=\"card h-100 border\"></div>").css({
            'transition': 'all 0.2s ease',
            'cursor': campo.obligatorio ? 'not-allowed' : 'pointer'
        });

        // Agregar efecto hover si no es obligatorio
        if (!campo.obligatorio) {
            card.hover(
                function() { $(this).addClass('shadow-sm border-primary'); },
                function() { $(this).removeClass('shadow-sm border-primary'); }
            );
        } else {
            card.addClass('bg-light');
        }

        const cardBody = $("<div class=\"card-body p-2 p-md-3\"></div>");
        const formCheck = $("<div class=\"form-check m-0\"></div>");

        // Checkbox
        const checkbox = $("<input type=\"checkbox\" class=\"form-check-input\">")
            .attr('id', 'campo_' + key)
            .attr('name', 'campos[]')
            .attr('value', key)
            .prop('checked', true)
            .css('cursor', campo.obligatorio ? 'not-allowed' : 'pointer');

        // Si es obligatorio, agregar atributos para que no se pueda desmarcar
        if (campo.obligatorio) {
            checkbox.prop('disabled', true);
            
            // Crear campo oculto para enviar el valor al servidor
            const hiddenInput = $("<input type=\"hidden\">")
                .attr('name', 'campos[]')
                .attr('value', key);
            formCheck.append(hiddenInput);
        }

        // Label
        const label = $("<label class=\"form-check-label w-100 d-flex align-items-center justify-content-between\"></label>")
            .attr('for', 'campo_' + key)
            .css('cursor', campo.obligatorio ? 'not-allowed' : 'pointer');

        // Texto del campo
        const labelText = $("<span class=\"fw-medium small\"></span>").text(campo.campo);
        label.append(labelText);

        // Badge si es obligatorio
        if (campo.obligatorio) {
            const badge = $("<span class=\"badge bg-secondary ms-2\"></span>")
                .css('font-size', '0.65rem')
            label.append(badge);
        }

        // Click en la card para toggle checkbox (si no es obligatorio)
        if (!campo.obligatorio) {
            card.on('click', function(e) {
                if (!$(e.target).is('input[type="checkbox"]')) {
                    checkbox.prop('checked', !checkbox.prop('checked'));
                    checkbox.trigger('change');
                }
            });
        }

        formCheck.append(checkbox);
        formCheck.append(label);
        cardBody.append(formCheck);
        card.append(cardBody);
        col.append(card);
        gridContainer.append(col);
    });

    wrapper.append(gridContainer);

    // Botones de acción
    const actionsDiv = $("<div class=\"d-flex flex-wrap gap-2 mt-3 pt-3 border-top\"></div>");

    const btnSelectAll = $("<button type=\"button\" class=\"btn btn-sm btn-outline-primary\"></button>")
        .html('<i class="fas fa-check me-1"></i> Todos')
        .on('click', function() {
            contenedor.find('input[type="checkbox"]:not(:disabled)').prop('checked', true);
        });

    const btnDeselectAll = $("<button type=\"button\" class=\"btn btn-sm btn-outline-secondary\"></button>")
        .html('<i class="fas fa-times-circle me-1"></i> Ninguno')
        .on('click', function() {
            contenedor.find('input[type="checkbox"]:not(:disabled)').prop('checked', false);
        });

    actionsDiv.append(btnSelectAll);
    actionsDiv.append(btnDeselectAll);
    wrapper.append(actionsDiv);

    contenedor.append(wrapper);
}

// Mostrar indicadores de carga para el cuerpo y pie de página de la tarjeta
function showLoaders() {
    const chartIds = [
        'chartMedioConocimiento',
        'chartRazonRecurre',
        'chartSolicitaCredito',
        'chartUtilizaCredito'
    ];

    chartIds.forEach(chartId => {
        // Cargador para el cuerpo del gráfico
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
        // Cargador para el pie de página de acciones del gráfico
        toggleChartCardActionsLoader(chartId, true);
    });
}

// Ocultar indicadores de carga y restaurar contenedores de gráficos
function hideLoaders() {
    const chartIds = [
        'chartMedioConocimiento',
        'chartRazonRecurre',
        'chartSolicitaCredito',
        'chartUtilizaCredito'
    ];

    chartIds.forEach(chartId => {
        // Restaurar el contenedor del cuerpo del gráfico
        const container = document.getElementById(chartId);
        if (container && container.parentElement) {
            const wrapper = container.parentElement;
            wrapper.innerHTML = `<div id="${chartId}"></div>`;
        }
        // Restaurar el pie de página de acciones del gráfico
        toggleChartCardActionsLoader(chartId, false);
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
    const safeParseInt = (val) => {
        const parsed = parseInt(val);
        return isNaN(parsed) ? 0 : parsed;
    };

    const total = data.reduce((sum, item) => sum + safeParseInt(item.total), 0);
    const topItem = data.length > 0 ? data.reduce((max, item) => safeParseInt(item.total) > safeParseInt(max.total) ? item : max, data[0]) : null;

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
    const seriesData = data.map(item => {
        const value = parseInt(item.total);
        return isNaN(value) ? 0 : value;
    });

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

/**
 * Muestra u oculta un spinner en un botón y gestiona su estado de deshabilitado.
 * @param {jQuery} $btn - El botón jQuery.
 * @param {boolean} show - True para mostrar el spinner, false para ocultarlo.
 */
function toggleButtonLoader($btn, show) {
    if (show) {
        $btn.prop('disabled', true);
        // Añadir un spinner al principio del botón
        $btn.prepend('<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>');
    } else {
        $btn.prop('disabled', false);
        // Eliminar el spinner
        $btn.find('.spinner-border').remove();
    }
}

/**
 * Muestra u oculta un loader centralizado para las acciones de una tarjeta de gráfica.
 * @param {string} chartId - El ID de la gráfica (ej. 'chartMedioConocimiento').
 * @param {boolean} show - True para mostrar el loader, false para ocultarlo.
 */
function toggleChartCardActionsLoader(chartId, show) {
    const $card = $(`#${chartId}`).closest('.card');
    const $actions = $card.find('.card-footer');
    let $loader = $card.find('.actions-loader');

    if (show) {
        $actions.addClass('d-none'); // Ocultar acciones
        if ($loader.length === 0) {
            // Crear el loader si no existe
            $loader = $(`
                <div class="actions-loader text-center py-2">
                    <div class="spinner-border spinner-border-sm text-primary" role="status">
                        <span class="visually-hidden">Cargando...</span>
                    </div>
                </div>
            `);
            $actions.after($loader);
        }
        $loader.removeClass('d-none');
    } else {
        $actions.removeClass('d-none'); // Mostrar acciones
        if ($loader.length > 0) {
            $loader.addClass('d-none'); // Ocultar loader
        }
    }
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
        const $btn = $(this);
        const chartId = $btn.data('chart');
        const title = $btn.data('title');
        const data = chartData[chartId];

        if (data && data.length > 0) {
            toggleChartCardActionsLoader(chartId, true);

            // Simular una pequeña demora para que el loader sea visible
            setTimeout(() => {
                try {
                    const csv = convertToCSV(data);
                    downloadCSV(csv, `${title}_${new Date().toISOString().split('T')[0]}.csv`);
                } catch (e) {
                    console.error("Error al generar el CSV:", e);
                    alert("Hubo un error al generar el archivo CSV.");
                } finally {
                    toggleChartCardActionsLoader(chartId, false);
                }
            }, 300);
        } else {
            alert("No hay datos disponibles para descargar.");
        }
    });
}

// Configurar manejadores de impresión
function setPrintHandlers() {
    $(document).on('click', '.print-chart-btn', async function () {
        const $btn = $(this);
        const chartId = $btn.data('chart');

        if (!chartInstances[chartId]) {
            alert(`Gráfica ${chartId} no disponible para imprimir.`);
            return;
        }

        toggleChartCardActionsLoader(chartId, true);

        try {
            await printChart(chartId);
        } catch (e) {
            console.error("Error al imprimir la gráfica:", e);
            alert("Hubo un error al preparar la gráfica para imprimir.");
        } finally {
            // Dar tiempo a que se abra la ventana de impresión antes de ocultar el loader
            setTimeout(() => {
                toggleChartCardActionsLoader(chartId, false);
            }, 1000);
        }
    });
}


// Configurar manejadores de ver detalles
function setViewDetailsHandlers() {
    $(document).on('click', '.view-details-btn', function () {
        const $btn = $(this);
        const chartId = $btn.data('chart');
        const title = $btn.data('title');

        toggleChartCardActionsLoader(chartId, true);

        // Simular una pequeña demora
        setTimeout(() => {
            try {
                showChartDetails(chartId, title);
            } catch (e) {
                console.error("Error al mostrar los detalles:", e);
                alert("Hubo un error al mostrar los detalles.");
            } finally {
                toggleChartCardActionsLoader(chartId, false);
            }
        }, 300);
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
        const $btn = $(this);
        const categoria = $btn.data('categoria');
        const originalHtml = $btn.html();

        $btn.html('Cargando...');
        toggleButtonLoader($btn, true);

        // Simular una pequeña demora para que el loader sea visible
        setTimeout(() => {
            try {
                mostrarDetalles(categoria, fullDetalleList);
            } catch (e) {
                console.error("Error al mostrar detalles de resumen:", e);
                alert("Hubo un error al mostrar los detalles.");
            } finally {
                toggleButtonLoader($btn, false);
                $btn.html(originalHtml);
            }
        }, 300);
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

    // 1. Get selected fields and their labels from the checkboxes
    const selectedFields = Array.from(document.querySelectorAll('#campoSelectorContainer input[type="checkbox"]:checked'))
        .map(cb => ({
            key: cb.value,
            label: document.querySelector(`label[for="${cb.id}"]`).innerText
        }));

    // 2. Generate header HTML dynamically
    const headerHtml = '<tr>' + selectedFields.map(field => `<th>${field.label}</th>`).join('') + '</tr>';

    // 3. Generate body HTML dynamically
    const bodyHtml = filteredData.map(item => {
        const rowCells = selectedFields.map(field => {
            let cellValue = item[field.key];
            // Usar N/A para valores nulos o indefinidos
            return `<td>${cellValue !== undefined && cellValue !== null && cellValue !== '' ? cellValue : 'N/A'}</td>`;
        }).join('');
        return `<tr>${rowCells}</tr>`;
    }).join('');


    let container = document.getElementById('detalles-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'detalles-container';
        const summaryRow = document.getElementById('totalEmprendedores').closest('.row');
        if (summaryRow && summaryRow.parentElement) {
            summaryRow.parentElement.insertBefore(container, summaryRow.nextSibling);
        }
    }

    // 4. Update container's innerHTML with the dynamic table
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
                            ${headerHtml}
                        </thead>
                        <tbody>
                            ${bodyHtml}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    // 5. Destroy and re-initialize DataTable
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
        ],
        columnDefs: [
            {
                targets: selectedFields.findIndex(f => f.key === 'mediosConocimiento'),
                render: function (data, type, row, meta) {
                    // Solo para mostrar, no para exportar
                    if (type === 'display' || type === 'filter') {
                        return data;
                    }
                    // Para exportar, quitar etiquetas HTML
                    const div = document.createElement('div');
                    div.innerHTML = data;
                    return div.textContent || div.innerText || '';
                },
                orderable: false
            }
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
        const $btn = $(this);
        if (currentModalChart && chartData[currentModalChart]) {
            const data = chartData[currentModalChart];
            const title = $('#chartDetailsModalLabel').text().replace(/\s+/g, '_');
            const originalHtml = $btn.html(); // Guardar html original

            $btn.html('Descargando...');
            toggleButtonLoader($btn, true); // Mostrar spinner y deshabilitar

            setTimeout(() => {
                try {
                    const csv = convertToCSV(data);
                    downloadCSV(csv, `${title}_${new Date().toISOString().split('T')[0]}.csv`);
                    
                    $btn.html('<i class="fas fa-check-circle me-1"></i> Descargado'); // Mostrar mensaje de éxito

                    setTimeout(() => {
                        $btn.html(originalHtml); // Restaurar html original
                        toggleButtonLoader($btn, false); // Habilitar botón
                    }, 2000);

                } catch (e) {
                    console.error("Error al descargar desde modal:", e);
                    $btn.html(originalHtml); // Restaurar en caso de error
                    toggleButtonLoader($btn, false);
                }
            }, 300);
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
    const $submitButton = $form.find('button[type="submit"]');
    const originalSubmitHtml = $submitButton.html();

    if ($form.length) {
        $form.on('submit', function (e) {
            e.preventDefault();

            const detallesContainer = document.getElementById('detalles-container');
            if (detallesContainer) {
                detallesContainer.style.display = 'none';
            }

            // Activar todos los loaders
            $submitButton.html('Aplicando...');
            toggleButtonLoader($submitButton, true);
            showLoaders(); // Ahora también maneja los footers

            crearPeticion(urlAPI, { case: "filtrarEstadisticas", data: $form.serialize() }, function (respuesta) {
                // Desactivar todos los loaders
                hideLoaders(); // Ahora también maneja los footers
                toggleButtonLoader($submitButton, false);
                $submitButton.html(originalSubmitHtml);

                if (respuesta.categorias && respuesta.detalle.length > 0) {
                    fullDetalleList = respuesta.detalle;
                    procesarDatosDashboard(respuesta.categorias, respuesta.detalle);
                } else {
                    fullDetalleList = [];
                    const emptyData = getEmptyEstadisticas();
                    procesarDatosDashboard(emptyData.categorias, emptyData.detalle);
                    mostrarMensajeAdvertencia('El filtro aplicado no arrojó resultados', false);
                }
            });
        });
    }
}