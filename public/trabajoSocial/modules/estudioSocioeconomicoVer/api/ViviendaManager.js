let datosVivienda = null;
let distribucion = [];
// Iconos para cada tipo de espacio
const iconosEspacios = {
    'Recámara': 'ti-bed',
    'Sala': 'ti-device-tv',
    'Cocina': 'ti-cup',
    'Baño': 'ti-bath',
    'Comedor': 'ti-table',
    'Estudio': 'ti-book',
    'Cochera': 'ti-car-garage',
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
    //print(datos);
    datosVivienda = datos;
    distribucion = datos.distribucion || [];
    actualizarInformacionGeneral(datos);
    actualizarCaracteristicasConstruccion(datos);
    actualizarDistribucion();
    actualizarServicios(datos.servicios);
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
    pisoContainer.innerHTML = '';
    if (datos.piso && datos.piso.length > 0) {
        datos.piso.forEach(piso => {
            const badge = document.createElement('span');
            badge.className = 'badge bg-secondary me-1 mb-1';
            badge.textContent = piso.value;
            pisoContainer.appendChild(badge);
        });
    } else {
        pisoContainer.innerHTML = '<span class="text-muted">No especificado</span>';
    }
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
// Función para bloquear contenedor
function bloquearContenedor() {
    const container = document.getElementById('distribucionContainer');
    container.style.position = 'relative';

    // Crear overlay de bloqueo
    const overlay = document.createElement('div');
    overlay.id = 'loadingOverlay';
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(2px);
    `;

    overlay.innerHTML = `
        <div class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <div class="mt-2 text-muted">Procesando...</div>
        </div>
    `;

    container.appendChild(overlay);

    // Deshabilitar todos los botones
    const botones = container.querySelectorAll('button');
    botones.forEach(btn => btn.disabled = true);
}

// Función para desbloquear contenedor
function desbloquearContenedor() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.remove();
    }

    // Rehabilitar botones (se hará automáticamente al re-renderizar)
    const container = document.getElementById('distribucionContainer');
    const botones = container.querySelectorAll('button');
    botones.forEach(btn => btn.disabled = false);
}
async function modificarCantidad(id, accion) {
    bloquearContenedor();

    try {
        const index = distribucion.findIndex(item => item.id === id);
        if (index === -1) {
            desbloquearContenedor();
            return;
        }

        let cantidadActual = distribucion[index].cantidad;
        let cantidadNueva = cantidadActual;

        if (accion === 'aumentar') {
            cantidadNueva++;
        } else if (accion === 'disminuir') {
            if (cantidadActual <= 1) {
                desbloquearContenedor();
                return;
            }
            cantidadNueva--;
        } else {
            desbloquearContenedor();
            return;
        }

        crearPeticion(
            urlAPI,
            {
                case: "modificarCantidadEspaciosVivienda",
                data: $.param({
                    idVivienda: datosVivienda.id,
                    idEspacio: id,
                    cantidad: cantidadNueva,
                    accion: accion
                })
            },
            function (response) {
                if (!response.es_valor_error) {
                    distribucion[index].cantidad = cantidadNueva;
                    actualizarDistribucion();
                } else {
                    mostrarMensajeError('Error al modificar la cantidad. Inténtalo de nuevo.', false);
                }
                desbloquearContenedor(); // <- Solo aquí
            }
        );

    } catch (error) {
        mostrarMensajeError('Error al modificar la cantidad. Inténtalo de nuevo.', false);
        desbloquearContenedor(); // <- Solo si hay excepción
    }
}


function eliminarEspacio(id) {
    bloquearContenedor();

    const index = distribucion.findIndex(item => item.id === id);
    if (index === -1) {
        desbloquearContenedor();
        return;
    }
    crearPeticion(
        urlAPI,
        {
            case: "eliminarEspacioVivienda",
            data: $.param({ idVivienda: datosVivienda.id, idEspacio: id })
        },
        function (response) {
            print(response);
            desbloquearContenedor();
            if (!response || response.es_valor_error === true) {
                mostrarMensajeError('Error al eliminar el espacio. Inténtalo de nuevo.', false);
                return;
            }
            distribucion.splice(index, 1);
            actualizarDistribucion();
        }
    );
}


// Función para actualizar distribución mejorada
function actualizarDistribucion() {
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
        espacioDiv.className = 'col-md-6 col-lg-4 col-xl-3 mb-3';

        espacioDiv.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body p-3 d-flex flex-column text-center">
                    <!-- Parte superior: Tipo e ícono -->
                    <div class="mb-3">
                        <i class="ti ${icono} text-primary" style="font-size: 2.5rem;"></i>
                        <h6 class="mt-2 mb-0 fw-semibold">${espacio.value}</h6>
                    </div>
                    
                    <!-- Centro: Cantidad -->
                    <div class="flex-grow-1 d-flex align-items-center justify-content-center">
                        <div>
                            <div class="display-4 text-primary fw-bold mb-1">${espacio.cantidad}</div>
                            <small class="text-muted">${espacio.cantidad === 1 ? 'espacio' : 'espacios'}</small>
                        </div>
                    </div>
                    
                    <!-- Parte inferior: Botones -->
                    <div class="mt-3">
                        <div class="btn-group btn-group-sm w-100" role="group">
                            <button class="btn btn-outline-secondary" 
                                    onclick="modificarCantidad(${espacio.id}, 'disminuir')"
                                    ${espacio.cantidad <= 1 ? 'disabled' : ''}
                                    title="Disminuir cantidad">
                                <i class="ti ti-minus"></i>
                            </button>
                            <button class="btn btn-outline-secondary" 
                                    onclick="modificarCantidad(${espacio.id}, 'aumentar')"
                                    title="Aumentar cantidad">
                                <i class="ti ti-plus"></i>
                            </button>
                            <button class="btn btn-outline-danger" 
                                    onclick="eliminarEspacio(${espacio.id})" 
                                    title="Eliminar espacio">
                                <i class="ti ti-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(espacioDiv);
    });
}