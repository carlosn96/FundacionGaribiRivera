const urlAPI = "api/TallerAPI.php";

function ready() {
    crearPeticion(urlAPI, {"case": "recuperarTalleres"}, function (res) {
        crearSelector($("#selectorTipoTalleres"), "tipoTaller", res.tiposTaller);
        crearSelector($("#selectorTipoTallerCrear"), "tipoTallerCrear", res.tiposTaller);
        crearSelector($("#selectorInstructores"), "instructor", res.instructores);
        crearSelector($("#selectorInstructoresTallerCrear"), "instructorTallerCrear", res.instructores);
        construirCardsTalleres(res.talleres);
        configurarEventos();
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

function construirCardsTalleres(talleres) {
    const displayTalleres = (filteredTalleres) => {
        $("#talleresContent").empty(); // Limpiar contenido actual

        filteredTalleres.forEach(function (taller) {
            const dataTallerStr = JSON.stringify(taller).replace(/"/g, "'");
            const instructor = taller.instructor;
            const color = getRandomBoostrapColor();
            const card = `
            <div class="col-lg-4 col-md-6">
                <div class="card overflow-hidden border-start border-${color}">
                    <div class="card-body position-relative">
                        <div class="position-absolute top-0 end-0 m-2">
                            <div class="dropdown">
                                <a href="javascript:void(0)" class="btn border-${color}-subtle shadow-none px-3" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="ti ti-dots-vertical fs-5"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
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
            $("#talleresContent").append(card);
        });
    };

    // Mostrar todos los talleres inicialmente
    displayTalleres(talleres);

    // Filtrar los talleres cuando el usuario escribe en el buscador
    $("#searchTaller").on("input", function () {
        const query = $(this).val().toLowerCase(); // Obtener el texto ingresado en el buscador
        const filteredTalleres = talleres.filter(function (taller) {
            const nombreTaller = taller.nombre.toLowerCase();
            const nombreInstructor = taller.instructor.nombreCompleto.toLowerCase();
            const tipoTaller = taller.tipoTaller.val.toLowerCase();
            return nombreTaller.includes(query) || nombreInstructor.includes(query) || tipoTaller.includes(query);
        });

        displayTalleres(filteredTalleres); // Mostrar los talleres filtrados
    });
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