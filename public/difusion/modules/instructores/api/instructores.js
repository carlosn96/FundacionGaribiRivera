const urlAPI = "api/InstructorAPI.php";
let allInstructores = []; // Store all instructor data
let instructorsDataTable = null;

function ready() {
    crearPeticion(urlAPI, { case: "recuperarInstructores" }, function (instructores) {
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
    $('#btn-grid-view-instructors').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('#cardsInstructores').show();
        $('#instructorsTableView').hide();
    });

    $('#btn-table-view-instructors').on('click', function () {
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
        $container.html('<div class="col-12"><p class="text-center text-muted mt-4">No se encontraron instructores.</p></div>');
        return;
    }

    instructores.forEach(function (i) {
        const dataInstructorStr = JSON.stringify(i).replace(/"/g, "'");
        const card = `
        <div class="col-xl-3 col-lg-4 col-md-6 mb-2">
            <div class="card instructor-card h-100">
                <div class="instructor-banner"></div>
                <div class="card-body p-4 text-center d-flex flex-column align-items-center">
                    <img src="data:image/jpeg;base64,${i.fotografia}" alt="${i.nombreCompleto}" class="instructor-avatar bg-white">
                    <h5 class="fw-bold mt-3 mb-1 text-dark">${i.nombreCompleto}</h5>
                    <span class="badge bg-success-subtle text-success rounded-pill px-3 py-1 mb-3">Instructor</span>
                    
                    <div class="mt-auto w-100 instructor-actions rounded-4 px-2 py-3 d-flex justify-content-center gap-3">
                        <a href="../instructor/?id=${i.id}" class="btn btn-primary rounded-circle shadow-sm" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;" data-bs-toggle="tooltip" data-bs-placement="top" title="Ver Detalles">
                            <i class="fs-5 ti ti-eye"></i>
                        </a>
                        <a href="javascript:void(0)" onclick="eliminarInstructor(${i.id})" class="btn btn-outline-danger rounded-circle shadow-sm" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar">
                            <i class="fs-5 ti ti-trash"></i>
                        </a>
                    </div>
                </div>
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
        return;
    }

    instructores.forEach(function (instructor) {
        const dataInstructorStr = JSON.stringify(instructor).replace(/"/g, "'");
        const row = `
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="me-3">
                            <img src="data:image/jpeg;base64,${instructor.fotografia}" alt="Foto de ${instructor.nombreCompleto}" width="48" height="48" class="rounded-circle shadow-sm border border-2 border-white" style="object-fit: cover;" />
                        </div>
                        <div>
                            <h6 class="mb-0 fw-semibold text-dark">
                                <a href="../instructor/?id=${instructor.id}" class="text-dark text-decoration-none premium-link">${instructor.nombreCompleto}</a>
                            </h6>
                            <span class="text-muted small">${instructor.correoElectronico}</span>
                        </div>
                    </div>
                </td>
                <td class="text-muted fw-medium">${instructor.telefono}</td>
                <td class="text-end">
                    <div class="dropdown">
                        <a href="javascript:void(0)" class="btn btn-light rounded-circle shadow-sm text-muted dropdown-toggle-hide d-flex align-items-center justify-content-center ms-auto" id="dropdownMenuButtonTable_${instructor.id}" data-bs-toggle="dropdown" aria-expanded="false" style="width: 36px; height: 36px;">
                            <i class="ti ti-dots-vertical fs-5"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 mt-2 p-2" aria-labelledby="dropdownMenuButtonTable_${instructor.id}">
                            <li>
                                <a class="dropdown-item d-flex align-items-center py-2 px-3 rounded-2 mb-1 text-primary" href="../instructor/?id=${instructor.id}">
                                    <i class="fs-4 ti ti-eye me-3"></i> Detalles
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item d-flex align-items-center py-2 px-3 text-danger rounded-2" href="javascript:void(0)" onclick="eliminarInstructor(${instructor.id})">
                                    <i class="fs-4 ti ti-trash me-3"></i> Eliminar
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
        data: { "case": "eliminarInstructor", "data": `id=${id}` }
    });
}