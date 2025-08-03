const urlAPI = "api/AltaEmprendedoresAPI.php";

function ready() {
    let registrosPrecargados = [];
    let registrosCreados = [];

    // --- Registro Individual ---
    $('#form-registro-individual').on('submit', function (e) {
        e.preventDefault();
        const $btn = $(this).find('button[type="submit"]');
        toggleSpinner($btn, true);
        crearPeticion(urlAPI, { case: 'crearIndividual', data: $(this).serialize() }, (respuesta) => {
            if (respuesta.es_valor_error) {
                mostrarNotificacion(respuesta.mensaje, 'danger');
            } else {
                mostrarNotificacion(respuesta.mensaje);
                registrosCreados.push(respuesta.emprendedor);
                mostrarResultados(registrosCreados);
                $('#form-registro-individual')[0].reset();
            }
            toggleSpinner($btn, false);
        });
    });

    // --- Carga Masiva ---
    $('#archivo-csv').on('change', function () {
        const archivo = this.files[0];
        if (!archivo) {
            mostrarNotificacion('Atención', 'Por favor, selecciona un archivo CSV.', 'warning');
            return;
        }

        Papa.parse(archivo, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                if (results.errors.length > 0) {
                    console.error("Errores en CSV:", results.errors);
                    mostrarNotificacion('Error de Formato', 'El archivo CSV tiene errores. Revisa la consola para más detalles.', 'danger');
                    return;
                }

                const headers = results.meta.fields;
                const requiredHeaders = ['nombre', 'apellidos', 'correo', 'celular', 'contrasena'];
                const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));

                if (missingHeaders.length > 0) {
                    mostrarNotificacion(`Faltan las siguientes columnas en el CSV: ${missingHeaders.join(', ')}`, 'danger');
                    return;
                }

                registrosPrecargados = results.data;
                mostrarVistaPrevia(headers, registrosPrecargados);
            }
        });
    });


    $('#btn-crear-masivo').on('click', function () {
        if (registrosPrecargados.length === 0) {
            mostrarNotificacion('Atención', 'No hay registros para cargar.', 'warning');
            return;
        }

        const $btn = $(this);
        toggleSpinner($btn, true);

        crearPeticion(urlAPI, { case: "crearMasivo", data: $.param({ emprendedores: registrosPrecargados }) }, (respuesta) => {
            if (respuesta.es_valor_error === true) {
                mostrarNotificacion(respuesta.mensaje, 'danger');
            } else {
                mostrarNotificacion(`${respuesta.creados.length} de ${registrosPrecargados.length} emprendedores fueron creados.`);
                registrosCreados = respuesta.creados;
                mostrarResultados(registrosCreados);
                // Limpiar vista previa
                $('#vista-previa-masiva').hide();
                $('#archivo-csv').val('');
                registrosPrecargados = [];
            }

            if (respuesta.errores.length > 0) {
                $('#btn-ver-errores-masivos').removeAttr("hidden");
                $('#btn-ver-errores-masivos').off('click').on('click', function () {
                    const $logger = $('#logger-errores-masivos');
                    const $lista = $('#lista-errores-masivos');
                    $lista.empty();
                    respuesta.errores.forEach(function (error) {
                        $lista.append(`<li>${error}</li>`);
                    });
                    $logger.removeAttr("hidden");
                    $logger[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
                });
            } else {
                $('#logger-errores-masivos').hide();
            }
            toggleSpinner($btn, false);
        });
    });

    $('#btn-descargar-passwords').on('click', function () {
        if (registrosCreados.length === 0) {
            mostrarNotificacion('Atención', 'No hay contraseñas para descargar.', 'warning');
            return;
        }

        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Nombre,Apellidos,Correo,Celular,Contrasena\n";

        registrosCreados.forEach(reg => {
            const row = [reg.nombre, reg.apellidos, reg.correo, reg.celular, reg.contrasenia].join(",");
            csvContent += row + "\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
        link.setAttribute("download", `contraseñas_emprendedores_${timestamp}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // --- Descarga de Plantilla CSV ---
    $('#descargar-plantilla-csv').on('click', function (e) {
        e.preventDefault();
        const csvContent = "data:text/csv;charset=utf-8,nombre,apellidos,correo,celular,contrasena\nMaria,Gomez,maria.gomez@email.com,3398765432, password123";
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "plantilla_emprendedores.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // --- Gestión de Contraseña ---
    $('#generar_contrasena_auto').on('change', function () {
        const campoManual = $('#campo-contrasena-manual');
        const inputManual = $('#contrasena');

        if ($(this).is(':checked')) {
            // Auto-generar: ocultar campo manual, limpiarlo, hacerlo no requerido y deshabilitar
            campoManual.slideUp();
            inputManual.val('').prop('required', false).prop('disabled', true);
        } else {
            // Ingreso manual: mostrar campo, hacerlo requerido y habilitar
            campoManual.slideDown();
            inputManual.prop('required', true).prop('disabled', false).focus();
        }
    }).trigger('change'); // Ejecutar al cargar para establecer el estado
}

function mostrarVistaPrevia(headers, data) {
    const $vistaPrevia = $('#vista-previa-masiva');
    const $tablaHead = $('#tabla-vista-previa thead');
    const $tablaBody = $('#tabla-vista-previa tbody');

    $tablaHead.empty();
    $tablaBody.empty();

    // Crear encabezado
    let headerRow = '<tr>';
    headers.forEach(h => headerRow += `<th>${h}</th>`);
    headerRow += '</tr>';
    $tablaHead.append(headerRow);

    // Crear filas de datos con celdas editables
    data.forEach((row, rowIndex) => {
        let dataRow = '<tr>';
        headers.forEach(h => {
            dataRow += `<td contenteditable="true" data-row="${rowIndex}" data-field="${h}">${row[h] || ''}</td>`;
        });
        dataRow += '</tr>';
        $tablaBody.append(dataRow);
    });

    // Actualizar el array de datos cuando se edite una celda
    $tablaBody.off('input').on('input', 'td[contenteditable="true"]', function () {
        const rowIdx = $(this).data('row');
        const field = $(this).data('field');
        data[rowIdx][field] = $(this).text();
    });

    $('#num-registros').text(data.length);
    $vistaPrevia.show();
    $('#btn-crear-masivo').prop('disabled', data.length === 0);
}

// --- Sección de Resultados y Descarga ---
function mostrarResultados(registros) {
    const $seccionResultados = $('#seccion-resultados');
    const $tablaBody = $('#tabla-resultados tbody');
    $tablaBody.empty();

    if (!registros || registros.length === 0) {
        $seccionResultados.hide();
        return;
    }

    registros.forEach(reg => {
        print(reg);
        const fila = `
                <tr>
                    <td>${reg.nombre}</td>
                    <td>${reg.apellidos}</td>
                    <td>${reg.correo}</td>
                    <td>${reg.celular}</td>
                    <td><span class="badge bg-light-primary text-primary fw-bold">${reg.contrasena}</span></td>
                </tr>
            `;
        $tablaBody.append(fila);
    });

    $seccionResultados.show();
}


/**
 * Función para crear peticiones AJAX al backend.
 * Asumo que esta función ya existe en tu archivo `util.js` y está disponible globalmente.
 * Si no, deberás implementarla o incluirla.
 * 
 * @param {string} modulo - El módulo del backend a llamar (ej. 'emprendedor').
 * @param {string} accion - La acción a ejecutar en el módulo (ej. 'crearIndividual').
 * @param {object|string} datos - Los datos a enviar.
 * @returns {Promise} Una promesa que se resuelve con la respuesta del servidor.
 */
/*
function crearPeticion(modulo, accion, datos) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "../../../../controller/API.php", // Ajusta esta ruta si es necesario
            data: {
                modulo: modulo,
                accion: accion,
                datos: datos
            },
            dataType: 'json',
            success: function(respuesta) {
                resolve(respuesta);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error en AJAX:", textStatus, errorThrown);
                reject(errorThrown);
            }
        });
    });
}
*/

// --- Utilidades ---
function mostrarNotificacion(mensaje, tipo = 'success') {
    const fn = {
        success: mostrarMensajeOk,
        error: mostrarMensajeError,
        warning: mostrarMensajeAdvertencia,
        info: mostrarMensajeInfo
    }[tipo] || mostrarMensajeInfo;

    fn(mensaje, false);
}

function toggleSpinner(btn, show) {
    const spinner = btn.find('.spinner-border');
    if (show) {
        btn.prop('disabled', true);
        spinner.removeClass('d-none');
    } else {
        btn.prop('disabled', false);
        spinner.addClass('d-none');
    }
}

