const urlAPI = "api/TallerAPI.php";
let allTalleres = []; // Store all workshops here
let talleresDataTable = null;

function ready() {
    crearPeticion(urlAPI, {"case": "recuperarTalleres"}, function (res) {
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
    $('#btn-grid-view').on('click', function() {
        $(this).addClass('active').siblings().removeClass('active');
        $('#talleresContent').show();
        $('#talleresTableView').hide();
    });

    $('#btn-table-view').on('click', function() {
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
        $container.html('<div class="col"><p class="text-center">No se encontraron talleres.</p></div>');
        return;
    }

    talleres.forEach(function (taller) {
        const dataTallerStr = JSON.stringify(taller).replace(/"/g, "'");
        const instructor = taller.instructor;
        const color = getRandomBoostrapColor();
        const card = `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card overflow-hidden border-start border-${color} h-100">
                <div class="card-body position-relative">
                    <div class="position-absolute top-0 end-0 m-2">
                        <div class="dropdown">
                            <a href="javascript:void(0)" class="btn btn-outline-primary shadow-none px-3" id="dropdownMenuButtonCard_${taller.id}" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="ti ti-dots-vertical fs-5"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButtonCard_${taller.id}">
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
                    </div>

                    <p class="fs-3 fw-normal mb-2 text-${color}">
                       Formación ${taller.tipoTaller.val}
                    </p>
                    <h6 class="fs-5 mb-4 pb-2">${taller.nombre}</h6>
                    <div class="d-block d-sm-flex align-items-center justify-content-between">
                        <div class="hstack gap-3">
                            <img src="data:image/jpeg;base64,${instructor.fotografia}" class="rounded-3" alt="${instructor.nombreCompleto}" width="50" />
                            <h6 class="mb-0">
                                <a href="../instructor/?id=${instructor.id}" class="text-decoration-none">${instructor.nombreCompleto}</a>
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
            crearPeticion(urlAPI, {case: "recuperarInstructor", data: $.param({id: val})}, (instructor) => {
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
    $("#tipoTaller").val(taller.tipoTaller.id);
    $("#evaluacionHabilitada").prop("checked", taller.evaluacionHabilitada);
    $("#idTaller").val(taller.id);
    $("#modalEditarTaller").modal("show");
}

function eliminarTaller(id) {
    alertaEliminar({
        mensajeAlerta: "Se eliminará el taller",
        url: urlAPI,
        data: {"case": "eliminarTaller", "data": `id=${id}`}
    });
}