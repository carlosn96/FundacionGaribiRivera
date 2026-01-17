// ================================
// DASHBOARD ESTADÍSTICAS - JAVASCRIPT MEJORADO
// Interacciones y microanimaciones optimizadas
// ================================

document.addEventListener('DOMContentLoaded', function() {
    initDashboard();
});

function initDashboard() {
    // Inicializar componentes
    initChartTypeButtons();
    initActiveFilters();
    initTableFeatures();
    initModalEnhancements();
    initCountUpAnimations();
    initFilterToggle();
    initTooltips();
    initExportActions();
    
    // Actualizar timestamp
    updateLastUpdate();
    setInterval(updateLastUpdate, 60000); // Actualizar cada minuto
}

// === CHART TYPE BUTTONS ===
function initChartTypeButtons() {
    document.querySelectorAll('.chart-type-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const group = btn.closest('[data-chart]') || btn.parentElement;
            
            // Deactivar hermanos
            group.querySelectorAll('.chart-type-btn').forEach(function(sibling) {
                sibling.classList.remove('active');
                sibling.setAttribute('aria-pressed', 'false');
            });
            
            // Activar botón actual
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            
            // Animar cambio de gráfico
            const chartName = group.getAttribute('data-chart');
            if (chartName) {
                animateChartChange(chartName);
                document.dispatchEvent(new CustomEvent('chart:type:change', {
                    detail: { chart: chartName, type: btn.dataset.type }
                }));
            }
        });
    });
}

function animateChartChange(chartName) {
    const chartElement = document.getElementById(chartName);
    if (chartElement) {
        chartElement.style.opacity = '0';
        chartElement.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            chartElement.style.transition = 'all 0.3s ease';
            chartElement.style.opacity = '1';
            chartElement.style.transform = 'scale(1)';
        }, 150);
    }
}

// === ACTIVE FILTERS ===
function initActiveFilters() {
    const form = document.getElementById('filtrosEstadisticasForm');
    const activeFilters = document.getElementById('activeFilters');
    
    if (!form || !activeFilters) return;
    
    function getFiltersFromForm() {
        const fd = new FormData(form);
        const obj = {};
        for (const [key, value] of fd.entries()) {
            if (value !== null && value !== '') {
                obj[key] = value;
            }
        }
        return obj;
    }
    
    function renderActiveFilters(filters) {
        const keys = Object.keys(filters);
        
        if (keys.length === 0) {
            activeFilters.innerHTML = `
                <div class="text-muted small d-flex align-items-center gap-2">
                    <i class="fas fa-info-circle"></i>
                    <span>No hay filtros activos. Mostrando todos los datos disponibles.</span>
                </div>
            `;
            activeFilters.classList.add('d-none');
            return;
        }
        
        activeFilters.classList.remove('d-none');
        let html = `
            <div class="d-flex flex-wrap align-items-center gap-2">
                <strong class="text-muted me-2">
                    <i class="fas fa-filter me-1"></i>Filtros aplicados:
                </strong>
        `;
        
        keys.forEach((key, index) => {
            const value = filters[key];
            const displayName = getFilterDisplayName(key);
            html += `
                <span class="filter-chip" data-filter="${key}" style="animation-delay: ${index * 0.1}s">
                    <strong>${displayName}:</strong> ${value}
                    <span class="remove" role="button" tabindex="0" aria-label="Eliminar filtro ${displayName}">
                        &times;
                    </span>
                </span>
            `;
        });
        
        html += `
            <button type="button" class="btn btn-sm btn-outline-danger ms-2" id="clearAllFilters">
                <i class="fas fa-times-circle me-1"></i>Limpiar todos
            </button>
        </div>
        `;
        
        activeFilters.innerHTML = html;
        
        // Attach remove handlers
        activeFilters.querySelectorAll('.filter-chip .remove').forEach(btn => {
            btn.addEventListener('click', handleRemoveFilter);
            btn.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleRemoveFilter(e);
                }
            });
        });
        
        // Clear all button
        const clearAllBtn = activeFilters.querySelector('#clearAllFilters');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => {
                form.reset();
                renderActiveFilters({});
                document.dispatchEvent(new CustomEvent('filters:cleared'));
                showToast('Filtros limpiados', 'Todos los filtros han sido removidos', 'info');
            });
        }
    }
    
    function handleRemoveFilter(e) {
        const chip = e.target.closest('.filter-chip');
        const key = chip.dataset.filter;
        const field = form.querySelector(`[name="${key}"]`);
        
        if (field) {
            field.value = '';
        }
        
        // Animate removal
        chip.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            const newFilters = getFiltersFromForm();
            renderActiveFilters(newFilters);
            document.dispatchEvent(new CustomEvent('filters:changed', { detail: newFilters }));
            showToast('Filtro removido', `Se eliminó el filtro: ${getFilterDisplayName(key)}`, 'info');
        }, 300);
    }
    
    function getFilterDisplayName(key) {
        const names = {
            'fechaInicio': 'Fecha Inicio',
            'fechaFin': 'Fecha Fin',
            'etapa': 'Etapa',
            'campo': 'Campo'
        };
        return names[key] || key;
    }
    
    // Handle form submit
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const filters = getFiltersFromForm();
        renderActiveFilters(filters);
        document.dispatchEvent(new CustomEvent('filters:applied', { detail: filters }));
        showToast('Filtros aplicados', 'Los datos se han actualizado', 'success');
    });
    
    // Initial render
    renderActiveFilters(getFiltersFromForm());
}

// === TABLE FEATURES ===
function initTableFeatures() {
    const table = document.getElementById('chartDetailsTable');
    if (!table) return;
    
    const tbody = table.querySelector('tbody');
    const pagination = document.getElementById('chartDetailsPagination');
    
    let tableData = [];
    let pageSize = 10;
    let currentPage = 1;
    let sortKey = null;
    let sortDir = 1;
    
    function setTableData(data) {
        tableData = Array.isArray(data) ? data : [];
        currentPage = 1;
        renderTablePage(currentPage);
    }
    
    function renderTablePage(page) {
        if (!tbody) return;
        
        let display = [...tableData];
        
        if (sortKey) {
            display.sort((a, b) => {
                const va = a[sortKey] !== undefined ? a[sortKey] : '';
                const vb = b[sortKey] !== undefined ? b[sortKey] : '';
                if (typeof va === 'number' && typeof vb === 'number') {
                    return sortDir * (va - vb);
                }
                return sortDir * va.toString().localeCompare(vb.toString());
            });
        }
        
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const pageData = display.slice(start, end);
        
        tbody.innerHTML = '';
        
        if (pageData.length === 0) {
            tbody.innerHTML = `
                <tr><td colspan="4" class="text-center text-muted py-4">No hay datos disponibles</td></tr>
            `;
            return;
        }
        
        pageData.forEach((row, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <th scope="row">${start + i + 1}</th>
                <td>${row.descripcion || ''}</td>
                <td class="text-end">${row.total || 0}</td>
                <td class="text-end">${row.porcentaje || '0%'}</td>
            `;
            tbody.appendChild(tr);
        });
        
        renderPagination(Math.ceil(tableData.length / pageSize), page);
    }
    
    function renderPagination(totalPages, page) {
        if (!pagination) return;
        
        const ul = pagination.querySelector('ul');
        
        if (totalPages <= 1) {
            pagination.classList.add('d-none');
            return;
        }
        
        pagination.classList.remove('d-none');
        ul.innerHTML = '';
        
        // Previous button
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${page === 1 ? 'disabled' : ''}`;
        prevLi.innerHTML = `<a class="page-link" href="#"><i class="fas fa-chevron-left"></i></a>`;
        if (page > 1) {
            prevLi.querySelector('a').addEventListener('click', e => {
                e.preventDefault();
                renderTablePage(page - 1);
                currentPage = page - 1;
            });
        }
        ul.appendChild(prevLi);
        
        // Page numbers
        for (let p = 1; p <= totalPages; p++) {
            if (p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1)) {
                const li = document.createElement('li');
                li.className = `page-item ${p === page ? 'active' : ''}`;
                li.innerHTML = `<a class="page-link" href="#">${p}</a>`;
                li.querySelector('a').addEventListener('click', e => {
                    e.preventDefault();
                    renderTablePage(p);
                    currentPage = p;
                });
                ul.appendChild(li);
            } else if (p === page - 2 || p === page + 2) {
                const li = document.createElement('li');
                li.className = 'page-item disabled';
                li.innerHTML = '<span class="page-link">...</span>';
                ul.appendChild(li);
            }
        }
        
        // Next button
        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${page === totalPages ? 'disabled' : ''}`;
        nextLi.innerHTML = `<a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a>`;
        if (page < totalPages) {
            nextLi.querySelector('a').addEventListener('click', e => {
                e.preventDefault();
                renderTablePage(page + 1);
                currentPage = page + 1;
            });
        }
        ul.appendChild(nextLi);
    }
    
    // Sorting by clicking headers
    table.querySelectorAll('th').forEach(th => {
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => {
            const headers = ['index', 'descripcion', 'total', 'porcentaje'];
            const idx = Array.from(th.parentElement.children).indexOf(th);
            const newKey = headers[idx];
            
            if (sortKey === newKey) {
                sortDir *= -1;
            } else {
                sortKey = newKey;
                sortDir = 1;
            }
            
            // Update header icons
            table.querySelectorAll('th i').forEach(icon => icon.remove());
            const icon = document.createElement('i');
            icon.className = `fas fa-sort-${sortDir === 1 ? 'up' : 'down'} ms-1`;
            th.appendChild(icon);
            
            renderTablePage(currentPage);
        });
    });
    
    // Listen for external event to populate table
    document.addEventListener('chart:details:set', e => setTableData(e.detail || []));
    
    // CSV export
    const downloadBtn = document.getElementById('downloadModalData');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            if (tableData.length === 0) {
                showToast('Sin datos', 'No hay datos para exportar', 'warning');
                return;
            }
            
            let csv = 'Descripción,Total,Porcentaje\n';
            tableData.forEach(row => {
                csv += `"${row.descripcion || ''}",${row.total || 0},${row.porcentaje || '0%'}\n`;
            });
            
            const timestamp = new Date().toISOString().split('T')[0];
            const filename = `detalles_${currentModalChart}_${timestamp}.csv`;
            downloadCSV(csv, filename);
            showToast('Descarga exitosa', 'Los datos se exportaron correctamente', 'success');
        });
    }
}

// === MODAL ENHANCEMENTS ===
function initModalEnhancements() {
    const modal = document.getElementById('chartDetailsModal');
    if (modal) {
        modal.addEventListener('show.bs.modal', function() {
            // Animación de entrada
            this.querySelector('.modal-dialog').style.animation = 'fadeInUp 0.3s ease-out';
        });
    }
}

// === COUNT UP ANIMATIONS ===
function initCountUpAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target || 0);
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        el.textContent = target.toLocaleString('es-MX');
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.floor(current).toLocaleString('es-MX');
                    }
                }, 16);
                
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.count-up').forEach(el => observer.observe(el));
}

// === FILTER TOGGLE ===
function initFilterToggle() {
    const toggleBtn = document.getElementById('toggleFilters');
    const filterContent = document.getElementById('filterContent');
    
    if (!toggleBtn || !filterContent) return;
    
    toggleBtn.addEventListener('click', function() {
        const bsCollapse = bootstrap.Collapse.getInstance(filterContent) || new bootstrap.Collapse(filterContent, { toggle: false });
        const isExpanded = filterContent.classList.contains('show');
        
        if (isExpanded) {
            bsCollapse.hide();
            toggleBtn.setAttribute('aria-expanded', 'false');
            toggleBtn.innerHTML = '<i class="fas fa-chevron-down me-1"></i><span class="d-none d-sm-inline">Expandir</span>';
        } else {
            bsCollapse.show();
            toggleBtn.setAttribute('aria-expanded', 'true');
            toggleBtn.innerHTML = '<i class="fas fa-chevron-up me-1"></i><span class="d-none d-sm-inline">Contraer</span>';
        }
    });
}

// === TOOLTIPS ===
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

// === EXPORT ACTIONS ===
function initExportActions() {
    // Botones principales (desktop)
    const exportFullReport = document.getElementById('exportFullReport');
    const exportAllCSV = document.getElementById('exportAllCSV');
    const printDashboard = document.getElementById('printDashboard');
    
    // Botones móviles
    const exportFullReportMobile = document.getElementById('exportFullReportMobile');
    const exportAllCSVMobile = document.getElementById('exportAllCSVMobile');
    const printDashboardMobile = document.getElementById('printDashboardMobile');
    
    // Función para exportar PDF
    const handleExportPDF = (e) => {
        e.preventDefault();
        showToast('Exportando...', 'Generando reporte PDF', 'info');
        // Implementar lógica de exportación PDF
    };
    
    // Función para exportar CSV
    const handleExportCSV = (e) => {
        e.preventDefault();
        showToast('Exportando...', 'Descargando datos en CSV', 'info');
        // Implementar lógica de exportación CSV completa
    };
    
    // Función para imprimir
    const handlePrint = (e) => {
        e.preventDefault();
        window.print();
    };
    
    // Asignar eventos a botones desktop
    if (exportFullReport) exportFullReport.addEventListener('click', handleExportPDF);
    if (exportAllCSV) exportAllCSV.addEventListener('click', handleExportCSV);
    if (printDashboard) printDashboard.addEventListener('click', handlePrint);
    
    // Asignar eventos a botones mobile
    if (exportFullReportMobile) exportFullReportMobile.addEventListener('click', handleExportPDF);
    if (exportAllCSVMobile) exportAllCSVMobile.addEventListener('click', handleExportCSV);
    if (printDashboardMobile) printDashboardMobile.addEventListener('click', handlePrint);
}

// === UTILITY FUNCTIONS ===
function updateLastUpdate() {
    const lastUpdate = document.getElementById('lastUpdate');
    if (lastUpdate) {
        const now = new Date();
        lastUpdate.innerHTML = `<i class="fas fa-sync-alt me-1"></i>${now.toLocaleString('es-MX', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}`;
    }
}

function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
}

function showToast(title, message, type = 'info') {
    // Implementar sistema de notificaciones toast
    console.log(`[${type.toUpperCase()}] ${title}: ${message}`);
    
    // Opción: usar alertas nativas de Bootstrap si están disponibles
    // o implementar un sistema toast personalizado
}
