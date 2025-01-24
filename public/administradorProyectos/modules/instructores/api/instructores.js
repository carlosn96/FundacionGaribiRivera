
const urlAPI = "api/InstructorAPI.php";

function ready() {
    crearPeticion(urlAPI, {case: "recuperarInstructores"}, function (instructores) {
        $("#tablaInstructores tbody").empty();
        instructores.forEach(function (instructor) {
            const fila = `
        <tr>
            <td>
                <div class="d-flex align-items-center">
                    <div class="me-3">
                        <img src="data:image/jpeg;base64,${instructor.fotografia}" alt="Foto de ${instructor.nombreCompleto}" width="45" class="rounded-circle" />
                    </div>
                    <div>
                        <h6 class="mb-1">${instructor.nombreCompleto}</h6>
                    </div>
                </div>
            </td>
            <td>${instructor.correoElectronico}</td>
            <td>${instructor.telefono}</td>
            <td>
                <div class="dropdown dropstart">
                    <a href="javascript:void(0)" class="text-muted" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="ti ti-dots-vertical fs-5"></i>
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li>
                            <a class="dropdown-item d-flex align-items-center gap-3" href="../instructor/?id=${instructor.id}">
                                <i class="fs-4 ti ti-eye"></i>Detalles
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item d-flex align-items-center gap-3" href="javascript:void(0)">
                                <i class="fs-4 ti ti-trash"></i>Borrar
                            </a>
                        </li>
                    </ul>
                </div>
            </td>
        </tr>
    `;
            $("#tablaInstructores tbody").append(fila);
        });

        $('[data-bs-toggle="tooltip"]').tooltip();
        crearDataTable("#tablaInstructores");
    });

    $("#fotografiaInstructor").change(function () {
        const file = this.files[0]; // Accedemos al archivo seleccionado
        const tamMaximo = 2 * 1024 * 1024; // 2MB en bytes
        if (file) {
            // Comprobamos el tamaño del archivo
            if (file.size > tamMaximo) {
                mostrarMensajeAdvertencia("El tamaño del archivo es demasiado grande. El tamaño máximo permitido es 2MB.", false);
                $(this).val('');  // Limpiamos el input si el archivo es muy grande
            } else {
                const reader = new FileReader();
                reader.onload = function (e) {
                    // Establecer la imagen de vista previa
                    $("#previewImage").attr("src", e.target.result);
                    $("#previewImage").removeClass("d-none"); // Mostrar la imagen de vista previa si es válida
                };
                reader.readAsDataURL(file); // Leer el archivo como una URL
            }
        }
    });
    
    /*$("#instructorForm").submit() {
        
    }*/
    
    fijarSubmitFormulario("instructorForm", urlAPI ,"guardarInstructor");
    
}