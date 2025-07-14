let datosVivienda = null;
// Iconos para cada tipo de espacio
const iconosEspacios = {
    'Recámara': 'ti-bed',
    'Sala': 'ti-tv',
    'Cocina': 'ti-cup',
    'Baño': 'ti-bath',
    'Comedor': 'ti-table',
    'Estudio': 'ti-book',
    'Garaje': 'ti-car-front',
    'Jardín': 'ti-tree',
    'Patio': 'ti-sun',
    'Terraza': 'ti-balcony',
    'Lavandería': 'ti-washing-machine',
    'Bodega': 'ti-box'
};

// Iconos para servicios
const iconosServicios = {
    'Agua': 'ti-droplet',
    'Luz': 'ti-lightning',
    'Drenaje': 'ti-bath',
    'Gas': 'ti-fire',
    'Internet': 'ti-wifi',
    'Teléfono': 'ti-telephone',
    'Cable': 'ti-tv'
};


// Función principal para crear la sección de vivienda
function renderVivienda(datos) {
    datosVivienda = datos;
    actualizarInformacionGeneral(datos);
    actualizarCaracteristicasConstruccion(datos);
    actualizarDistribucion(datos.distribucion);
    actualizarServicios(datos.servicios);
    actualizarContadores(datos);
}


// Función para actualizar información general
function actualizarInformacionGeneral(datos) {
    document.getElementById('tipoVivienda').textContent = datos.tipo?.value || 'Vivienda';
    document.getElementById('condicionVivienda').textContent = datos.condicion?.value || '-';
    document.getElementById('usoVivienda').textContent = datos.uso?.value || '-';
    document.getElementById('familiasVivienda').textContent = datos.familiasHabitantes?.value || '-';
}

// Función para actualizar características de construcción
function actualizarCaracteristicasConstruccion(datos) {
    // Paredes
    const paredesContainer = document.getElementById('paredesContainer');
    paredesContainer.innerHTML = '';
    if (datos.paredes && datos.paredes.length > 0) {
        datos.paredes.forEach(pared => {
            const badge = document.createElement('span');
            badge.className = 'badge bg-secondary me-1 mb-1';
            badge.textContent = pared.value;
            paredesContainer.appendChild(badge);
        });
    } else {
        paredesContainer.innerHTML = '<span class="text-muted">No especificado</span>';
    }

    // Techo
    const techoContainer = document.getElementById('techoContainer');
    techoContainer.innerHTML = '';
    if (datos.techo && datos.techo.length > 0) {
        datos.techo.forEach(techo => {
            const badge = document.createElement('span');
            badge.className = 'badge bg-secondary me-1 mb-1';
            badge.textContent = techo.value;
            techoContainer.appendChild(badge);
        });
    } else {
        techoContainer.innerHTML = '<span class="text-muted">No especificado</span>';
    }

    // Piso
    const pisoContainer = document.getElementById('pisoContainer');
    if (datos.piso) {
        pisoContainer.innerHTML = `<span class="badge bg-secondary">${datos.piso.value}</span>`;
    } else {
        pisoContainer.innerHTML = '<span class="text-muted">No especificado</span>';
    }
}

// Función para actualizar distribución
function actualizarDistribucion(distribucion) {
    const container = document.getElementById('distribucionContainer');
    container.innerHTML = '';

    if (!distribucion || distribucion.length === 0) {
        container.innerHTML = `
                    <div class="col-12 text-center py-4">
                        <i class="ti ti-house text-muted" style="font-size: 3rem;"></i>
                        <h6 class="text-muted mt-2">No hay espacios configurados</h6>
                    </div>
                `;
        return;
    }

    distribucion.forEach(espacio => {
        const icono = iconosEspacios[espacio.value] || 'ti-house';
        const espacioDiv = document.createElement('div');
        espacioDiv.className = 'col-md-6 col-lg-4';
        espacioDiv.innerHTML = `
                    <div class="card border-primary">
                        <div class="card-body text-center">
                            <i class="ti ${icono} text-primary" style="font-size: 2rem;"></i>
                            <h6 class="mt-2 mb-1">${espacio.value}</h6>
                            <div class="display-6 text-primary fw-bold">${espacio.cantidad}</div>
                            <small class="text-muted">${espacio.cantidad === 1 ? 'espacio' : 'espacios'}</small>
                        </div>
                    </div>
                `;
        container.appendChild(espacioDiv);
    });
}

// Función para actualizar servicios
function actualizarServicios(servicios) {
    const container = document.getElementById('serviciosContainer');
    container.innerHTML = '';

    if (!servicios || servicios.length === 0) {
        container.innerHTML = `
                    <div class="col-12 text-center py-4">
                        <i class="ti ti-gear text-muted" style="font-size: 3rem;"></i>
                        <h6 class="text-muted mt-2">No hay servicios registrados</h6>
                    </div>
                `;
        return;
    }

    servicios.forEach(servicio => {
        const icono = iconosServicios[servicio.value] || 'ti-gear';
        const servicioDiv = document.createElement('div');
        servicioDiv.className = 'col-md-6 col-lg-3';
        servicioDiv.innerHTML = `
                    <div class="card border-success">
                        <div class="card-body text-center">
                            <i class="ti ${icono} text-success" style="font-size: 2rem;"></i>
                            <h6 class="mt-2 mb-0">${servicio.value}</h6>
                            <small class="text-success">Disponible</small>
                        </div>
                    </div>
                `;
        container.appendChild(servicioDiv);
    });
}

// Función para actualizar contadores
function actualizarContadores(datos) {
    const totalEspacios = datos.distribucion ? datos.distribucion.reduce((sum, espacio) => sum + espacio.cantidad, 0) : 0;
    const totalServicios = datos.servicios ? datos.servicios.length : 0;

    document.getElementById('totalEspacios').textContent = totalEspacios;
    document.getElementById('totalServicios').textContent = totalServicios;
}

// Función para cargar espacios editables en el modal
function cargarEspaciosEditables() {
    const container = document.getElementById('espaciosEditables');
    container.innerHTML = '';

    if (!datosVivienda || !datosVivienda.distribucion) {
        container.innerHTML = '<div class="col-12 text-center text-muted">No hay datos de distribución</div>';
        return;
    }

    // Agregar ID de vivienda al formulario
    document.getElementById('viviendaId').value = datosVivienda.id;

    datosVivienda.distribucion.forEach((espacio, index) => {
        const icono = iconosEspacios[espacio.value] || 'ti-house';
        const espacioDiv = document.createElement('div');
        espacioDiv.className = 'col-md-6 mb-3';
        espacioDiv.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-3">
                                <i class="ti ${icono} text-primary" style="font-size: 1.5rem;"></i>
                                <h6 class="ms-2 mb-0">${espacio.value}</h6>
                            </div>
                            <div class="row align-items-center">
                                <div class="col-4">
                                    <label class="form-label">Cantidad:</label>
                                </div>
                                <div class="col-8">
                                    <input type="hidden" name="espacios[${index}][id]" value="${espacio.id}">
                                    <input type="hidden" name="espacios[${index}][value]" value="${espacio.value}">
                                    <div class="input-group">
                                        <button class="btn btn-outline-secondary" type="button" onclick="cambiarCantidad(${index}, -1)">
                                            <i class="ti ti-minus"></i>
                                        </button>
                                        <input type="number" 
                                               class="form-control text-center" 
                                               name="espacios[${index}][cantidad]" 
                                               value="${espacio.cantidad}" 
                                               min="0" 
                                               max="20"
                                               id="cantidad_${index}">
                                        <button class="btn btn-outline-secondary" type="button" onclick="cambiarCantidad(${index}, 1)">
                                            <i class="ti ti-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
        container.appendChild(espacioDiv);
    });
}

// Función para cambiar cantidad con botones
function cambiarCantidad(index, cambio) {
    const input = document.getElementById(`cantidad_${index}`);
    const valorActual = parseInt(input.value) || 0;
    const nuevoValor = Math.max(0, Math.min(20, valorActual + cambio));
    input.value = nuevoValor;
}
// Función para mostrar toast
function mostrarToast(titulo, mensaje, tipo = 'success') {
    const toastElement = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');
    const toastTitle = document.getElementById('toastTitle');
    const toastBody = document.getElementById('toastBody');

    // Configurar icono y clase según el tipo
    if (tipo === 'success') {
        toastIcon.className = 'ti ti-check-circle text-success';
    } else if (tipo === 'error') {
        toastIcon.className = 'ti ti-exclamation-triangle text-danger';
    } else if (tipo === 'info') {
        toastIcon.className = 'ti ti-info-circle text-primary';
    }

    toastTitle.textContent = titulo;
    toastBody.textContent = mensaje;

    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}

// Función para guardar distribución (AJAX)
async function guardarDistribucion() {
    const form = document.getElementById('formEditarDistribucion');
    const formData = new FormData(form);
    const submitBtn = document.getElementById('guardarDistribucion');
    const spinner = submitBtn.querySelector('.spinner-border');

    // Mostrar loading
    spinner.classList.remove('d-none');
    submitBtn.disabled = true;

    try {
        // Preparar datos para envío
        const datosEnvio = {
            viviendaId: formData.get('viviendaId'),
            distribucion: []
        };

        // Extraer datos de espacios
        const espaciosData = {};
        for (let [key, value] of formData.entries()) {
            if (key.startsWith('espacios[')) {
                const match = key.match(/espacios\[(\d+)\]\[(\w+)\]/);
                if (match) {
                    const index = match[1];
                    const campo = match[2];
                    if (!espaciosData[index]) espaciosData[index] = {};
                    espaciosData[index][campo] = value;
                }
            }
        }

        // Convertir a array
        Object.values(espaciosData).forEach(espacio => {
            datosEnvio.distribucion.push({
                id: parseInt(espacio.id),
                value: espacio.value,
                cantidad: parseInt(espacio.cantidad)
            });
        });

        // Simulación de llamada AJAX
        const response = await fetch('/api/vivienda/distribucion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            },
            body: JSON.stringify(datosEnvio)
        });

        if (response.ok) {
            const resultado = await response.json();

            // Actualizar datos locales
            datosVivienda.distribucion = datosEnvio.distribucion;

            // Actualizar interfaz
            actualizarDistribucion(datosVivienda.distribucion);
            actualizarContadores(datosVivienda);

            // Cerrar modal
            bootstrap.Modal.getInstance(document.getElementById('modalEditarDistribucion')).hide();

            // Mostrar éxito
            mostrarMensajeOK('Éxito', 'Distribución actualizada correctamente', false);
        } else {
            throw new Error('Error en la respuesta del servidor');
        }

    } catch (error) {
        console.error('Error al guardar distribución:', error);
        mostrarMensajeError('No se pudo guardar la distribución. Intenta nuevamente.', false);
    } finally {
        // Ocultar loading
        spinner.classList.add('d-none');
        submitBtn.disabled = false;
    }
}