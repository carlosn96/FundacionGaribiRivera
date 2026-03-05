const urlAPI = "api/TallerAPI.php";
let allTalleres = [];
let talleresDataTable = null;
let currentView = 'grid'; // 'grid' or 'table'

// ═══════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════
function ready() {
    crearPeticion(urlAPI, { "case": "recuperarTalleres" }, function (res) {
        allTalleres = res.talleres;
        crearSelector($("#selectorTipoTalleres"), "tipoTaller", res.tiposTaller);
        crearSelector($("#selectorTipoTallerCrear"), "tipoTallerCrear", res.tiposTaller);
        crearSelector($("#selectorInstructores"), "instructor", res.instructores);
        crearSelector($("#selectorInstructoresTallerCrear"), "instructorTallerCrear", res.instructores);

        renderContent(allTalleres);
        configurarEventos();
        configurarViewSwitcher();
        configurarBusqueda();
        actualizarKPIs();
    });
}

// ═══════════════════════════════════════════════════════
// SEARCH
// ═══════════════════════════════════════════════════════
function configurarBusqueda() {
    $("#searchTaller").on("input", function () {
        const query = $(this).val().toLowerCase().trim();

        const filtered = allTalleres.filter(function (taller) {
            return taller.nombre.toLowerCase().includes(query) ||
                taller.instructor.nombreCompleto.toLowerCase().includes(query) ||
                taller.tipoTaller.val.toLowerCase().includes(query);
        });

        renderContent(filtered);

        // Table search via DataTables
        if (talleresDataTable) {
            talleresDataTable.search(query).draw();
        }
    });
}

// ═══════════════════════════════════════════════════════
// VIEW SWITCHER
// ═══════════════════════════════════════════════════════
function configurarViewSwitcher() {
    $('#btn-grid-view').on('click', function () {
        currentView = 'grid';
        $(this).addClass('active').siblings().removeClass('active');
        $('#talleresContent').show();
        $('#talleresTableView').hide();
    });

    $('#btn-table-view').on('click', function () {
        currentView = 'table';
        $(this).addClass('active').siblings().removeClass('active');
        $('#talleresContent').hide();
        $('#talleresTableView').show();
        if (talleresDataTable) {
            talleresDataTable.columns.adjust().draw();
        }
    });
}

// ═══════════════════════════════════════════════════════
// RENDER
// ═══════════════════════════════════════════════════════
function renderContent(talleres) {
    $('#loadingState').hide();

    if (allTalleres.length === 0) {
        $('#emptyState').show();
        $('#noResultsState, #talleresContent, #talleresTableView').hide();
        return;
    }

    if (talleres.length === 0) {
        $('#noResultsState').show();
        $('#emptyState, #talleresContent, #talleresTableView').hide();
        return;
    }

    $('#emptyState, #noResultsState').hide();
    construirCardsTalleres(talleres);
    construirTablaTalleres(talleres);

    if (currentView === 'grid') {
        $('#talleresContent').show();
        $('#talleresTableView').hide();
    } else {
        $('#talleresContent').hide();
        $('#talleresTableView').show();
    }
}

// ═══════════════════════════════════════════════════════
// CARDS
// ═══════════════════════════════════════════════════════
const colorPalette = ['primary', 'success', 'info', 'warning', 'danger', 'secondary'];

function getColorForIndex(index) {
    return colorPalette[index % colorPalette.length];
}

function construirCardsTalleres(talleres) {
    const $container = $("#talleresContent");
    $container.empty();

    talleres.forEach(function (taller, index) {
        const dataTallerStr = JSON.stringify(taller).replace(/"/g, "'");
        const instructor = taller.instructor;
        const color = getColorForIndex(index);

        const card = `
        <div class="col-xl-4 col-lg-6">
            <div class="card border-0 h-100 shadow-sm rounded-3 overflow-hidden" style="border-left: 3px solid var(--bs-${color}) !important;">
                <div class="card-body p-3 d-flex flex-column">
                    <!-- Top row: Badge + Actions -->
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <span class="badge bg-${color} bg-opacity-10 text-${color} rounded-pill px-2 py-1" style="font-size:0.7rem;">
                            Módulo ${taller.tipoTaller.val}
                        </span>
                        <div class="dropdown">
                            <button class="btn btn-sm btn-light rounded-circle p-0 d-flex align-items-center justify-content-center"
                                style="width:28px;height:28px;" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="ti ti-dots-vertical text-muted" style="font-size:0.85rem;"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 p-1" style="min-width:140px;">
                                <li>
                                    <a class="dropdown-item py-1 px-2 d-flex align-items-center rounded-2 small" href="javascript:void(0)"
                                        onclick="abrirModalEditarTaller(${dataTallerStr})">
                                        <i class="ti ti-edit text-warning me-2"></i> Editar
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item py-1 px-2 d-flex align-items-center text-danger rounded-2 small" href="javascript:void(0)"
                                        onclick="eliminarTaller(${taller.id})">
                                        <i class="ti ti-trash me-2"></i> Eliminar
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Title -->
                    <h6 class="fw-bold mb-3 text-dark lh-base" style="min-height: 40px;">${taller.nombre}</h6>

                    <!-- Instructor -->
                    <div class="d-flex align-items-center mt-auto pt-2 border-top">
                        ${instructor.fotografia
                ? `<img src="data:image/jpeg;base64,${instructor.fotografia}" class="rounded-circle border border-2 border-white shadow-sm" alt="${instructor.nombreCompleto}" width="34" height="34" style="object-fit: cover;">`
                : `<div class="bg-secondary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style="width:34px;height:34px;"><i class="ti ti-user text-secondary"></i></div>`
            }
                        <div class="ms-2 min-width-0">
                            <div class="text-muted" style="font-size:0.6rem;text-transform:uppercase;letter-spacing:0.05em;">Instructor</div>
                            <a href="../instructor/?id=${instructor.id}" class="text-dark text-decoration-none fw-semibold small text-truncate d-block" style="max-width: 180px;">
                                ${instructor.nombreCompleto}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        $container.append(card);
    });
}

// ═══════════════════════════════════════════════════════
// TABLE
// ═══════════════════════════════════════════════════════
function construirTablaTalleres(talleres) {
    const $tableBody = $("#talleresTableBody");
    $tableBody.empty();

    talleres.forEach(function (taller, index) {
        const dataTallerStr = JSON.stringify(taller).replace(/"/g, "'");
        const instructor = taller.instructor;

        const row = `
            <tr style="transition: background-color 0.15s ease;">
                <td class="border-0 ps-3 text-muted small">${index + 1}</td>
                <td class="border-0">
                    <div class="fw-semibold text-dark small">${taller.nombre}</div>
                </td>
                <td class="border-0 d-none d-md-table-cell">
                    <span class="badge bg-primary bg-opacity-10 text-primary rounded-pill" style="font-size:0.7rem;">
                        ${taller.tipoTaller.val}
                    </span>
                </td>
                <td class="border-0">
                    <div class="d-flex align-items-center">
                        ${instructor.fotografia
                ? `<img src="data:image/jpeg;base64,${instructor.fotografia}" class="rounded-circle" alt="${instructor.nombreCompleto}" width="28" height="28" style="object-fit:cover;">`
                : `<div class="bg-secondary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style="width:28px;height:28px;"><i class="ti ti-user text-secondary" style="font-size:0.8rem;"></i></div>`
            }
                        <a href="../instructor/?id=${instructor.id}" class="text-decoration-none text-dark small ms-2 text-truncate" style="max-width: 150px;">
                            ${instructor.nombreCompleto}
                        </a>
                    </div>
                </td>
                <td class="border-0 text-end pe-3">
                    <div class="dropdown">
                        <button class="btn btn-sm btn-light rounded-circle p-0 d-flex align-items-center justify-content-center"
                            style="width:28px;height:28px;" data-bs-toggle="dropdown">
                            <i class="ti ti-dots-vertical text-muted" style="font-size:0.85rem;"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 p-1" style="min-width:130px;">
                            <li>
                                <a class="dropdown-item py-1 px-2 d-flex align-items-center rounded-2 small"
                                    href="javascript:void(0)" onclick="abrirModalEditarTaller(${dataTallerStr})">
                                    <i class="ti ti-edit text-warning me-2"></i> Editar
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item py-1 px-2 d-flex align-items-center text-danger rounded-2 small"
                                    href="javascript:void(0)" onclick="eliminarTaller(${taller.id})">
                                    <i class="ti ti-trash me-2"></i> Eliminar
                                </a>
                            </li>
                        </ul>
                    </div>
                </td>
            </tr>`;
        $tableBody.append(row);
    });

    // Initialize or refresh DataTable
    if (talleresDataTable) {
        talleresDataTable.destroy();
    }
    talleresDataTable = crearDataTable($('#talleresTable'));
}

// ═══════════════════════════════════════════════════════
// KPIs
// ═══════════════════════════════════════════════════════
function actualizarKPIs() {
    const total = allTalleres.length;
    const instructoresUnicos = [...new Set(allTalleres.map(t => t.instructor.id))].length;
    const modulosUnicos = [...new Set(allTalleres.map(t => t.tipoTaller.val))].length;
    const conEvaluacion = allTalleres.filter(t => t.evaluacionHabilitada == 1 || t.evaluacionHabilitada === true).length;

    $('#totalTalleresCount').text(total);
    $('#kpiTotal').text(total);
    $('#kpiInstructores').text(instructoresUnicos);
    $('#kpiModulos').text(modulosUnicos);
    $('#kpiConEvaluacion').text(conEvaluacion);
    $('#footerText').text(`${total} talleres registrados · ${instructoresUnicos} instructores`);
}

// ═══════════════════════════════════════════════════════
// EVENTS & CRUD
// ═══════════════════════════════════════════════════════
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
        $(this).val($(this).prop("checked") ? 1 : 0);
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