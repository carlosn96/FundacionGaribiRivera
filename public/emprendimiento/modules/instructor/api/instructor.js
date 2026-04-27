
const urlAPI = "api/InstructorAPI.php";
const salir = () => {
    redireccionar("../instructores");
};
function ready() {
    const id = parseInt($("#instructor").val(), 10);
    if (isNaN(id)) {
        salir();
    } else {
        crearPeticion(urlAPI, { case: "recuperarInstructor", data: "id=" + id }, (res) => {
            construirCardInstructor(res.instructor);
            construirTablaTalleres(res.talleres);
        });
    }
}


function construirCardInstructor(instructor) {
    if ((typeof instructor === 'object' && instructor !== null && Object.keys(instructor).length > 0) ||
        (Array.isArray(instructor) && instructor.length > 0)) {
        $('#nombre').text(instructor.nombreCompleto);
        $('#profile').attr('src', 'data:image/jpeg;base64,' + instructor.fotografia);
        const details = [
            { label: "Teléfono Móvil", value: instructor.telefono || "No especificado", icon: "ti-phone" },
            { label: "Correo Electrónico", value: instructor.correoElectronico, icon: "ti-mail" }
        ];
        $('#instructor-details').empty();
        details.forEach(detail => {
            const listItem = $('<li>').addClass('list-group-item px-0 d-flex align-items-center py-3 border-bottom-0')
                .html(`
                        <div class="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 45px; height: 45px;">
                            <i class="ti ${detail.icon} fs-4"></i>
                        </div>
                        <div>
                            <p class="mb-0 text-muted small">${detail.label}</p>
                            <h6 class="mb-0 fw-bold text-dark mt-1">${detail.value}</h6>
                        </div>
                    `);
            $('#instructor-details').append(listItem);
        });
    } else {
        salir();
    }
}

function construirTablaTalleres(talleres) {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    $('#tablaTalleres tbody').empty();

    talleres.forEach(taller => {
        const fila = $('<tr>');

        // Columna 1: Nombre del Taller
        fila.append($('<td class="ps-4">').html(`<span class="fw-semibold text-dark">${taller.nombre}</span>`));

        // Columna 2: Modalidad (Badge)
        fila.append($('<td>').html(`<span class="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25 rounded-pill px-2 py-1">${taller.tipoTaller.val}</span>`));

        // Columna 3: Evaluaciones Habilitada (Icon Toggle)
        const evalIcon = taller.evaluacionHabilitada
            ? `<i class="ti ti-check text-success fs-5"></i>`
            : `<i class="ti ti-x text-danger fs-5"></i>`;
        fila.append($('<td class="text-center">').html(evalIcon));

        // Columna 4: Observaciones / URL
        if (urlRegex.test(taller.observaciones)) {
            fila.append($('<td class="pe-4">').html(`<a href="${taller.observaciones}" target="_blank" class="btn btn-sm btn-outline-primary rounded-pill"><i class="ti ti-external-link me-1"></i>Material</a>`));
        } else {
            // Si no es una URL, mostrar el texto de manera truncada
            const texto = taller.observaciones.length > 50 ?
                taller.observaciones.substring(0, 50) + '...' :
                taller.observaciones;
            fila.append($('<td class="pe-4 text-muted small">')
                .text(texto || "-")
                .attr('title', taller.observaciones)
                .css({
                    'max-width': '150px',
                    'white-space': 'nowrap',
                    'overflow': 'hidden',
                    'text-overflow': 'ellipsis'
                })
            );
        }
        $('#tablaTalleres tbody').append(fila);
    });

    // Actualizar el contador de la tarjeta
    $('#total-talleres').text(`${talleres.length} Registro${talleres.length !== 1 ? 's' : ''}`);
}
