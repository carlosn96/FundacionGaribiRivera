const urlAPI = "api/InstructorAPI.php";
let allInstructores = []; // Store all instructor data
let instructorsDataTable = null;

function ready() {
    crearPeticion(urlAPI, {case: "recuperarInstructores"}, function (instructores) {
        allInstructores = instructores;
        print(instructores);
        construirCardsInstructores(allInstructores);
        construirTablaInstructores(allInstructores);
        
        // Initialize DataTable
        instructorsDataTable = crearDataTable($('#instructorsTable'));

        configurarEventosInstructores();
        configurarViewSwitcherInstructors();
        configurarBusquedaInstructores();
        
        // Initialize tooltips after all elements are rendered
        $('[data-bs-toggle="tooltip"]').tooltip();
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
    fijarSubmitFormulario("instructorForm", urlAPI, "guardarInstructor");
}

function configurarBusquedaInstructores() {
    $("#searchInstructor").on("input", function () {
        const query = $(this).val().toLowerCase();
        
        // Filter cards
        const filteredInstructores = allInstructores.filter(function (instructor) {
            const nombreCompleto = instructor.nombreCompleto.toLowerCase();
            const correo = instructor.correoElectronico.toLowerCase();
            const telefono = instructor.telefono.toLowerCase();
            return nombreCompleto.includes(query) || correo.includes(query) || telefono.includes(query);
        });
        construirCardsInstructores(filteredInstructores);

        // Filter table
        instructorsDataTable.search(query).draw();
    });
}

function configurarViewSwitcherInstructors() {
    $('#btn-grid-view-instructors').on('click', function() {
        $(this).addClass('active').siblings().removeClass('active');
        $('#cardsInstructores').show();
        $('#instructorsTableView').hide();
    });

    $('#btn-table-view-instructors').on('click', function() {
        $(this).addClass('active').siblings().removeClass('active');
        $('#cardsInstructores').hide();
        $('#instructorsTableView').show();
        // Adjust DataTables columns when switching to table view
        if (instructorsDataTable) {
            instructorsDataTable.columns.adjust().draw();
        }
    });
}

function construirCardsInstructores(instructores) {
    const $container = $("#cardsInstructores");
    $container.empty();

    if (instructores.length === 0) {
        $container.html('<div class="col-12"><p class="text-center">No se encontraron instructores.</p></div>');
        return;
    }

    instructores.forEach(function (i) {
        const dataInstructorStr = JSON.stringify(i).replace(/"/g, "'");
        const card = `
        <div class="col-md-4 mb-4">
            <div class="card hover-img h-100">
                <div class="card-body p-4 text-center border-bottom">
                    <img src="data:image/jpeg;base64,${i.fotografia}" alt="${i.nombre}" class="rounded-circle mb-3" width="80" height="80">
                    <h4 class="card-title mb-1">${i.nombreCompleto}</h4>
                    <span class="fs-2">Instructor</span>
                </div>
                <ul class="px-2 py-2 list-unstyled d-flex align-items-center justify-content-center mb-0">
                    <li class="position-relative">
                        <a class="text-primary d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold"
                           href="../instructor/?id=${i.id}" 
                           data-bs-toggle="tooltip" data-bs-placement="top" title="Detalles">
                            <i class="fs-4 ti ti-eye"></i>
                        </a>
                    </li>
                    <li class="position-relative">
                        <a class="text-danger d-flex align-items-center justify-content-center p-2 fs-5 rounded-circle fw-semibold" 
                           href="javascript:void(0)" 
                           onclick="eliminarInstructor(${i.id})"
                           data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar">
                           <i class="fs-4 ti ti-trash"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        `;
        $container.append(card);
    });
}

function construirTablaInstructores(instructores) {
    const $tableBody = $("#instructorsTableBody");
    $tableBody.empty();

    if (instructores.length === 0) {
        // DataTables will show its own message
        return;
    }

    instructores.forEach(function (instructor) {
        const dataInstructorStr = JSON.stringify(instructor).replace(/"/g, "'");
        const row = `
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="me-3">
                            <img src="data:image/jpeg;base64,${instructor.fotografia}" alt="Foto de ${instructor.nombreCompleto}" width="45" class="rounded-circle" />
                        </div>
                        <div>
                            <h6 class="mb-1">${instructor.nombreCompleto}</h6>
                            <span class="text-muted">${instructor.correoElectronico}</span>
                        </div>
                    </div>
                </td>
                <td>${instructor.telefono}</td>
                <td>
                    <div class="dropdown">
                        <a href="javascript:void(0)" class="btn btn-outline-primary shadow-none px-3" id="dropdownMenuButtonTable_${instructor.id}" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="ti ti-dots-vertical fs-5"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButtonTable_${instructor.id}">
                            <li>
                                <a class="dropdown-item d-flex align-items-center gap-3" href="../instructor/?id=${instructor.id}">
                                    <i class="fs-4 ti ti-eye"></i> Detalles
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item d-flex align-items-center gap-3" href="javascript:void(0)" onclick="eliminarInstructor(${instructor.id})">
                                    <i class="fs-4 ti ti-trash"></i> Eliminar
                                </a>
                            </li>
                        </ul>
                    </div>
                </td>
            </tr>
        `;
        $tableBody.append(row);
    });
}

function configurarEventosInstructores() {
    // Any specific event listeners for instructor page can go here
    // For example, if there are edit modals for instructors, their submit handlers
    // or other dynamic elements.
}

function eliminarInstructor(id) {
    alertaEliminar({
        mensajeAlerta: "Se eliminará el instructor",
        url: urlAPI,
        data: {"case": "eliminarInstructor", "data": `id=${id}`}
    });
}