const urlAPI = "api/ConfiguracionConevalAPI.php";

// Variables globales para instancias de componentes Bootstrap
let modalConfiguracion = null;
function ready() {
    // Inicializar instancias de componentes Bootstrap para un mejor rendimiento
    modalConfiguracion = new bootstrap.Modal(document.getElementById('modalConfiguracion'));

    // Cargar las configuraciones existentes al iniciar la página
    cargarConfiguraciones();

    // Configurar todos los listeners de eventos
    inicializarEventos();
}

/**
 * Carga todas las configuraciones desde la API y las muestra en la interfaz.
 */
function cargarConfiguraciones() {
    crearPeticion(urlAPI, { case: "getAll" }, function (respuesta) {
        const container = $('#configuracionesContainer');
        const emptyState = $('#emptyState');
        container.empty();

        if (respuesta.success && respuesta.data.length > 0) {
            emptyState.hide();
            respuesta.data.forEach(config => {
                const cardHTML = crearTarjetaConfiguracion(config);
                container.append(cardHTML);
            });
        } else {
            emptyState.show();
            if (!respuesta.success) {
                mostrarNotificacion(respuesta.message || 'No se pudieron cargar los datos.', 'error');
            }
        }
    });
}

/**
 * Genera el HTML de una tarjeta para una configuración específica.
 * @param {object} config - El objeto de configuración con los datos.
 * @returns {string} - El string HTML de la tarjeta.
 */
function crearTarjetaConfiguracion(config) {
    const fecha = new Date(config.fecha_muestra + 'T00:00:00'); // Evita problemas de zona horaria
    const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = fecha.toLocaleDateString('es-MX', opcionesFecha);
    const formatoMoneda = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

    return `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100 shadow-sm card-hover">
                <div class="card-header bg-light d-flex justify-content-between align-items-center">
                    <h6 class="mb-0 fw-semibold">
                        <i class="ti ti-calendar-event me-2 text-primary"></i>
                        ${fechaFormateada}
                    </h6>
                </div>
                <div class="card-body">
                    <div class="d-flex align-items-start mb-3">
                        <i class="ti ti-shield-half-filled fs-5 text-warning me-3"></i>
                        <div>
                            <p class="mb-0 text-muted">Monto de vulnerabilidad por Ingresos</p>
                            <h5 class="fw-bold">${formatoMoneda.format(config.monto_vulnerable_ingreso)}</h5>
                        </div>
                    </div>
                    <div class="d-flex align-items-start">
                        <i class="ti ti-shield-x fs-5 text-danger me-3"></i>
                        <div>
                            <p class="mb-0 text-muted">Monto de vulnerabilidad por Pobreza Extrema</p>
                            <h5 class="fw-bold">${formatoMoneda.format(config.monto_pobreza_extrema)}</h5>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-white border-top-0 text-end">
                    <button class="btn btn-sm btn-outline-primary btn-editar" 
                            data-id="${config.id_coneval}"
                            data-fecha="${config.fecha_muestra}"
                            data-vulnerable="${config.monto_vulnerable_ingreso}"
                            data-extrema="${config.monto_pobreza_extrema}">
                        <i class="ti ti-pencil me-1"></i> Editar
                    </button>
                    <button class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${config.id_coneval}">
                        <i class="ti ti-trash me-1"></i> Eliminar
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Configura todos los manejadores de eventos para los botones y formularios.
 */
function inicializarEventos() {
    const form = document.getElementById('formConfiguracion');

    $('#btnNuevaConfiguracion').on('click', function () {
        form.reset();
        form.classList.remove('was-validated');
        $('#modalConfiguracionLabel').text('Nueva Configuración CONEVAL');
        $('#idConeval').val('');
    });

    $(form).off('submit').on('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }
        const id = $('#idConeval').val();
        const action = id ? 'update' : 'create';
        crearPeticion(urlAPI, { case: action, data: $(this).serialize() });
    });

    $('#configuracionesContainer').on('click', '.btn-editar', function () {
        const data = $(this).data();
        form.reset();
        form.classList.remove('was-validated');
        $('#modalConfiguracionLabel').text('Editar Configuración CONEVAL');
        $('#idConeval').val(data.id);
        $('#fechaMuestra').val(data.fecha);
        $('#montoVulnerable').val(data.vulnerable);
        $('#montoPobrezaExtrema').val(data.extrema);
        modalConfiguracion.show();
    });

    $('#configuracionesContainer').on('click', '.btn-eliminar', function () {
        alertaEliminar({
            mensajeAlerta: "Esta acción no se puede deshacer.",
            url: urlAPI,
            data: { case: "delete", data: $.param({ id: $(this).data('id') }) }
        });
    });
}

/**
 * Muestra una notificación toast con un mensaje y estilo personalizados.
 * @param {string} mensaje - El cuerpo del mensaje.
 * @param {'success'|'error'} tipo - El tipo de notificación.
 */
function mostrarNotificacion(mensaje, tipo) {
    const fn = {
        success: mostrarMensajeOk,
        error: mostrarMensajeError,
        warning: mostrarMensajeAdvertencia,
        info: mostrarMensajeInfo
    }[tipo] || mostrarMensajeInfo;
    fn(mensaje, false);
}
