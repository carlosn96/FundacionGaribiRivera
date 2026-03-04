const urlAPI = "api/TallerAPI.php";
let allTalleres = []; // Store all workshops here
let talleresDataTable = null;

function ready() {
    crearPeticion(urlAPI, { "case": "recuperarTalleres" }, function (res) {
        allTalleres = res.talleres;
        crearSelector($("#selectorTipoTalleres"), "tipoTaller", res.tiposTaller);
        crearSelector($("#selectorTipoTallerCrear"), "tipoTallerCrear", res.tiposTaller);
        crearSelector($("#selectorInstructores"), "instructor", res.instructores);
        crearSelector($("#selectorInstructoresTallerCrear"), "instructorTallerCrear", res.instructores);

        construirCardsTalleres(allTalleres);
        construirTablaTalleres(allTalleres);

        // Initialize DataTable
        talleresDataTable = crearDataTable($('#talleresTable'));

        configurarEventos();
        configurarViewSwitcher();
        configurarBusqueda();
    });
}

function configurarBusqueda() {
    $("#searchTaller").on("input", function () {
        const query = $(this).val().toLowerCase();

        // Filter cards
        const filteredTalleres = allTalleres.filter(function (taller) {
            const nombreTaller = taller.nombre.toLowerCase();
            const nombreInstructor = taller.instructor.nombreCompleto.toLowerCase();
            const tipoTaller = taller.tipoTaller.val.toLowerCase();
            return nombreTaller.includes(query) || nombreInstructor.includes(query) || tipoTaller.includes(query);
        });
        construirCardsTalleres(filteredTalleres);

        // Filter table
        talleresDataTable.search(query).draw();
    });
}

function configurarViewSwitcher() {
    $('#btn-grid-view').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('#talleresContent').show();
        $('#talleresTableView').hide();
    });

    $('#btn-table-view').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('#talleresContent').hide();
        $('#talleresTableView').show();
        // Add the DataTables adjust call here
        if (talleresDataTable) {
            talleresDataTable.columns.adjust().draw();
        }
    });
}

function construirCardsTalleres(talleres) {
    const $container = $("#talleresContent");
    $container.empty();

    if (talleres.length === 0) {
        $container.html('<div class="col"><p class="text-center text-muted mt-5">No se encontraron talleres.</p></div>');
        return;
    }

    talleres.forEach(function (taller) {
        const dataTallerStr = JSON.stringify(taller).replace(/"/g, "'");
        const instructor = taller.instructor;
        const color = getRandomBoostrapColor();
        const card = `
        <div class="col-lg-4 col-md-6">
            <div class="card premium-card border-0 h-100 shadow-sm border-start border-4 border-${color} rounded-4">
                <div class="card-body position-relative p-4 d-flex flex-column">
                    <div class="position-absolute top-0 end-0 m-3">
                        <div class="dropdown">
                            <a href="javascript:void(0)" class="btn btn-light rounded-circle shadow-sm text-muted dropdown-toggle-hide d-flex align-items-center justify-content-center" id="dropdownMenuButtonCard_${taller.id}" data-bs-toggle="dropdown" aria-expanded="false" style="width: 36px; height: 36px;">
                                <i class="ti ti-dots-vertical fs-5"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 mt-2 p-2" aria-labelledby="dropdownMenuButtonCard_${taller.id}">
                                <li>
                                    <a class="dropdown-item d-flex align-items-center py-2 px-3 rounded-2 mb-1" href="javascript:void(0)" onclick="abrirModalEditarTaller(${dataTallerStr})">
                                        <i class="fs-4 ti ti-edit me-3 text-warning"></i> Editar taller
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item d-flex align-items-center py-2 px-3 text-danger rounded-2" href="javascript:void(0)" onclick="eliminarTaller(${taller.id})">
                                        <i class="fs-4 ti ti-trash me-3"></i> Eliminar taller
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="mb-3">
                        <span class="badge bg-${color}-subtle text-${color} rounded-pill px-3 py-2 fw-medium letter-spacing-wide">
                            Módulo ${taller.tipoTaller.val}
                        </span>
                    </div>
                    <h5 class="fw-bold mb-4 pe-4 lh-base text-dark" style="min-height: 48px;">${taller.nombre}</h5>
                    
                    <div class="d-flex align-items-center mt-auto pt-3 border-top">
                        <img src="data:image/jpeg;base64,${instructor.fotografia}" class="rounded-circle shadow-sm border border-2 border-white" alt="${instructor.nombreCompleto}" width="42" height="42" style="object-fit: cover;" />
                        <div class="ms-3">
                            <p class="mb-0 fs-2 text-muted text-uppercase tracking-wide" style="letter-spacing: 0.05em; font-size: 0.70rem;">Instructor</p>
                            <h6 class="mb-0 fw-semibold">
                                <a href="../instructor/?id=${instructor.id}" class="text-dark text-decoration-none premium-link">${instructor.nombreCompleto}</a>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        $container.append(card);
    });
}

function construirTablaTalleres(talleres) {
    const $tableBody = $("#talleresTableBody");
    $tableBody.empty();

    if (talleres.length === 0) {
        // DataTables will show its own message
        return;
    }

    talleres.forEach(function (taller) {
        const dataTallerStr = JSON.stringify(taller).replace(/"/g, "'");
        const instructor = taller.instructor;
        const row = `
            <tr>
                <td>${taller.nombre}</td>
                <td>Formación ${taller.tipoTaller.val}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <img src="data:image/jpeg;base64,${instructor.fotografia}" class="rounded-3" alt="${instructor.nombreCompleto}" width="30" />
                        <a href="../instructor/?id=${instructor.id}" class="text-decoration-none ms-2">${instructor.nombreCompleto}</a>
                    </div>
                </td>
                <td>
                    <div class="dropdown">
                        <a href="javascript:void(0)" class="btn btn-outline-primary shadow-none px-3" id="dropdownMenuButtonTable_${taller.id}" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="ti ti-dots-vertical fs-5"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButtonTable_${taller.id}">
                            <li>
                                <a class="dropdown-item d-flex align-items-center gap-3" href="javascript:void(0)" onclick="abrirModalEditarTaller(${dataTallerStr})">
                                    <i class="fs-4 fas fa-edit"></i> Editar
                                </a>
                                </li>
                                <li>
                                    <a class="dropdown-item d-flex align-items-center gap-3" href="javascript:void(0)" onclick="eliminarTaller(${taller.id})">
                                        <i class="fs-4 fas fa-trash"></i> Eliminar
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

function configurarEventos() {
    $("#instructor").change(function () {
        const val = $(this).val();
        if (val) {
            const $spinner = $("#spinnerImagenInstructor");
            $spinner.prop('hidden', false);
            crearPeticion(urlAPI, { case: "recuperarInstructor", data: $.param({ id: val }) }, (instructor) => {
                $("#imagenInstructor").attr("src", `data:image/jpeg;base64,${instructor.fotografia}`);
                $spinner.prop('hidden', true);
            });
        }
    });
    $("#evaluacionHabilitada").change(function () {
        const $this = $(this);
        $this.val($this.prop("checked") ? 1 : 0);
    });
    fijarSubmitFormulario("#editarTallerForm", urlAPI, "actualizarTaller");
    fijarSubmitFormulario("#editarCrearTallerForm", urlAPI, "crearTaller");
}

function abrirModalEditarTaller(taller) {
    $("#imagenInstructor").attr("src", `data:image/jpeg;base64,${taller.instructor.fotografia}`);
    $("#observaciones").text(taller.observaciones);
    $("#instructor").val(taller.instructor.id);
    $("#nombreTaller").val(taller.nombre);
    $("#numeroTaller").val(taller.numeroTaller);
    $("#tipoTaller").val(taller.tipoTaller.id);
    $("#evaluacionHabilitada").prop("checked", taller.evaluacionHabilitada);
    $("#idTaller").val(taller.id);
    $("#modalEditarTaller").modal("show");
}

function eliminarTaller(id) {
    alertaEliminar({
        mensajeAlerta: "Se eliminará el taller",
        url: urlAPI,
        data: { "case": "eliminarTaller", "data": `id=${id}` }
    });
}