const urlAPI = "api/EstudioSocioeconomicoNuevoAPI.php";

let familiarCount = 0;

function ready() {
    const idEmprendedor = extraerParametrosURL(window.location).id;
    if (idEmprendedor) {
        crearPeticion(urlAPI, {case: "recuperarCamposInformacion", data: $.param({id: idEmprendedor})}, (rs) => {
            print(rs);
            if (rs.existeLineaBase) {
                if (rs.existeEstudioSocioeconomico) {
                    redireccionar("../estudioSocioeconomicoVer");
                } else {
                    completarCamposFormulario(rs.campos);
                    completarInfoEmprendedor(rs.emprendedor);
                    ajustarEventos();
                }
            }
        });
    } else {
        redireccionar("../estudioSocioeconomico");
    }
}

function completarInfoEmprendedor(emprendedor) {
    $("#idEmprendedor").val(emprendedor.id);
    $("#fotografiaEmprendedor").prop("src", "data:image/jpeg;base64," + emprendedor.fotografia);
    $("#nombreEmprendedor").text(emprendedor.nombre + " " + emprendedor.apellidos);
}

function completarCamposFormulario(campos) {
    $.each(campos.selector.modal, (idx, elementos) => {
        crearSelector($("#" + idx + "Modal"), idx, elementos, "form-select border border-warning");
        crearSelector($("#" + idx + "ModalEditar"), idx + "Editar", elementos, "form-select border border-warning");
    });
    $.each(campos.selector.secciones, (idx, elementos) => {
        crearSelector($("#" + idx + "List"), idx, elementos);
    });
    $.each(campos.seleccionMultiple.actitudes, (idx, elementos) => {
        crearGroupCheckbox($("#" + idx + "List"), elementos, idx);
    });
    $.each(campos.seleccionMultiple.vivienda, (idx, elementos) => {
        crearGroupCheckbox($("#" + idx), elementos, idx);
    });
    $.each(campos.radio, (idx, elementos) => {
        crearGroupRadio($("#" + idx + "List"), elementos, idx);
    });

    $.each(campos.seleccionMultiple.vulnerabilidad, (idx, elemento) => {
        var checkboxId = 'vulnerabilidad_' + elemento.id_vulnerabilidad;
        var checkboxHtml = `
        <div class="btn-group w-100" role="group">
            <input type="checkbox" class="btn-check" id="${checkboxId}" name="vulnerabilidad[vulnerabilidades][]" value="${elemento.id_vulnerabilidad}">
            <label class="btn btn-outline-primary w-100 text-start text-dark" for="${checkboxId}">${elemento.descripcion}</label>
        </div>`;
        $('#vulnerabilidadList').append(checkboxHtml);
    });
}

async function enviarForm() {
    const esVulnerable = $("#esVulnerableSi").is(":checked");
    if (esVulnerable) {
        const vulnerabilidades = $("input[name='vulnerabilidad[vulnerabilidades][]']:checked").map(function () {
            return $(this).val();
        }).get();
        if (vulnerabilidades.length === 0) {
            mostrarMensajeAdvertencia("Se ha indicado que la persona es vulnerable, sin embargo, ninguna vulnerabilidad fue seleccionada", false);
            return;
        }
    }
    const evaluacionConfirmada = await evaluarVisita();
    if (evaluacionConfirmada) {
        const resultadoVisita = $("input[name='resultadoVisita']:checked").val();
        if (!resultadoVisita) {
            mostrarMensajeAdvertencia("Debe seleccionar un resultado de la visita antes de continuar.", false);
            return;
        }
        const formData = new FormData();
        formData.append("case", "guardar");
        formData.append("data", $("#estudioSocioeconomicoForm").serialize() + "&resultadoVisita=" + resultadoVisita);
        const archivos = $("#fotografiasEvidencia")[0].files;
        for (let i = 0; i < archivos.length; i++) {
            formData.append("fotografiasEvidencia[]", archivos[i]);
        }
        crearPeticion(urlAPI, formData);
    }
}

function evaluarVisita() {
    return new Promise((resolve, reject) => {
        const modalResultadoVisita = $("#resultadoVisitaModal");
        modalResultadoVisita.modal("show");
        const verificarSeleccion = () => {
            const seleccion = $("input[name='resultadoVisita']:checked").val();
            if (!seleccion) {
                mostrarMensajeAdvertencia("Por favor, seleccione una opción para continuar.", false);
                return false;
            }
            return true;
        };
        $("#confirmarEvaluacion").on("click", function () {
            if (verificarSeleccion()) {
                modalResultadoVisita.modal("hide");
                resolve(true);
            }
        });
        modalResultadoVisita.on("hidden.bs.modal", function () {
            reject(false);
        });
    });
}

function ajustarEventos() {
    $('#modalDependienteFamiliar').on('hidden.bs.modal', function () {
        $('#formFamiliar')[0].reset();
    });

    $('#formFamiliar').submit(function (e) {
        e.preventDefault();
        const nombre = $('#nombreFamiliar').val();
        const edad = $('#edadFamiliar').val();
        const estadoCivilSelected = $('#estadoCivilFamiliar option:selected');
        const parentesco = $('#parentescoFamiliar').val();
        const escolaridadSelected = $('#escolaridadFamiliar option:selected');
        const ocupacionSelected = $('#ocupacionFamiliar option:selected');
        const ingresoMensualFijo = $('#ingresoMensualFijoFamiliar').val();
        const ingresoMensualVariable = $('#ingresoMensualVariableFamiliar').val();
        crearNuevoFamiliar(nombre, edad, estadoCivilSelected, parentesco,
                escolaridadSelected, ocupacionSelected, ingresoMensualFijo,
                ingresoMensualVariable);
        $('#formFamiliar')[0].reset();
        $('#modalDependienteFamiliar').modal('hide');
        actualizarTotalFamiliares(true);
    });

    $("#formEditarFamiliar").submit(function (e) {
        e.preventDefault();
        const familiarId = $('#btnEditarFamiliar').data('id');
        const familiarCard = $('#familiar-' + familiarId);
        const nombre = $('#nombreFamiliarEditar').val();
        const edad = $('#edadFamiliarEditar').val();
        const parentesco = $('#parentescoFamiliarEditar').val(); // Añadido para el parentesco
        const estadoCivilText = $('#estadoCivilFamiliarEditar option:selected').text();
        const estadoCivilValue = $('#estadoCivilFamiliarEditar option:selected').val();
        const escolaridadText = $('#escolaridadFamiliarEditar option:selected').text();
        const escolaridadValue = $('#escolaridadFamiliarEditar option:selected').val();
        const ocupacionText = $('#ocupacionFamiliarEditar option:selected').text();
        const ocupacionValue = $('#ocupacionFamiliarEditar option:selected').val();
        const ingresoMensualFijo = $('#ingresoMensualFijoFamiliarEditar').val();
        const ingresoMensualVariable = $('#ingresoMensualVariableFamiliarEditar').val();
        familiarCard.find('.card-title').text(nombre);
        familiarCard.find('small').text(edad + ' años | ' + parentesco);
        familiarCard.find('#estadoCivilFamiliar-' + familiarId).val(estadoCivilText);
        familiarCard.find('#escolaridadFamiliar-' + familiarId).val(escolaridadText);
        familiarCard.find('#ocupacionFamiliar-' + familiarId).val(ocupacionText);
        familiarCard.find('input[name="familiares[' + familiarId + '][nombre]"]').val(nombre);
        familiarCard.find('input[name="familiares[' + familiarId + '][edad]"]').val(edad);
        familiarCard.find('input[name="familiares[' + familiarId + '][estadoCivil]"]').val(estadoCivilValue);
        familiarCard.find('input[name="familiares[' + familiarId + '][escolaridad]"]').val(escolaridadValue);
        familiarCard.find('input[name="familiares[' + familiarId + '][ocupacion]"]').val(ocupacionValue);
        familiarCard.find('input[name="familiares[' + familiarId + '][parentesco]"]').val(parentesco);
        familiarCard.find('input[name="familiares[' + familiarId + '][ingresoMensualFijo]"]').val(ingresoMensualFijo);
        familiarCard.find('input[name="familiares[' + familiarId + '][ingresoMensualVariable]"]').val(ingresoMensualVariable);
        actualizarIngresos(Number($("#totalFamiliares").text()) || 0);
        $('#modalEditarFamiliar').modal('hide');
    });

    $(".egreso").change(function () {
        var totalEgresos = 0;
        $(".egreso").each(function () {
            totalEgresos += parseFloat(this.value) || 0;
        });
        $("#totalEgresos").val(totalEgresos.toFixed(2));
    });

    $("input[name='vehiculoPropio']").change(function () {
        $("#infoVehiculo input").prop("disabled", $(this).val() === '0');
    });

    $("input[name='vulnerabilidad[esVulnerable]']").change(function () {
        if ($(this).val() === "0") {
            $("#vulnerabilidadOptions").addClass("d-none");
            $("input[name='vulnerabilidad[vulnerabilidades][]']").prop("checked", false);
        } else {
            $("#vulnerabilidadOptions").removeClass("d-none");
        }
    });
}

function crearNuevoFamiliar(nombre, edad, estadoCivilSelected, parentesco, escolaridadSelected, ocupacionSelected, ingresoMensualFijo, ingresoMensualVariable) {
    familiarCount++;
    const color = getRandomBoostrapColor();
    const estadoCivilText = estadoCivilSelected.text();
    const estadoCivilValue = estadoCivilSelected.val();
    const escolaridadText = escolaridadSelected.text();
    const escolaridadValue = escolaridadSelected.val();
    const ocupacionText = ocupacionSelected.text();
    const ocupacionValue = ocupacionSelected.val();
    const nuevoFamiliar = `
        <div class="card-familiar card rounded-3 card-hover border border-${color} mb-2" id="familiar-${familiarCount}">
            <div class="card-body p-3">
                <div class="d-flex justify-content-end">
                    <div class="dropdown">
                        <a class="text-muted fw-semibold d-flex align-items-center p-1" href="javascript:void(0)" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="ti ti-dots-vertical text-${color}"></i>
                        </a>
                        <ul class="dropdown-menu overflow-hidden">
                            <li>
                                <a class="dropdown-item" href="javascript:void(0)" onclick="editarFamiliar(${familiarCount})">Editar</a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="javascript:void(0)" onclick="borrarFamiliar(${familiarCount})">Borrar</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <span class="flex-shrink-0">
                        <i class="ti ti-user text-${color} display-6"></i>
                    </span>
                    <div class="ms-4">
                        <h5 class="card-title text-dark mb-1">${nombre}</h5>
                        <small class="text-muted">${edad} años | ${parentesco}</small>
                    </div>
                </div>
                <div class="row g-1">
                    <div class="col-4">
                        <div class="form-floating mb-1">
                            <input type="text" class="form-control form-control-sm border-0" id="estadoCivilFamiliar-${familiarCount}" value="${estadoCivilText}" readonly />
                            <label>
                                <i class="ti ti-heart me-2 fs-4 text-${color}"></i>
                                <span class="border-start border-${color} ps-3">Estado Civil</span>
                            </label>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="form-floating mb-1">
                            <input type="text" class="form-control form-control-sm border-0" id="escolaridadFamiliar-${familiarCount}" value="${escolaridadText}" readonly />
                            <label>
                                <i class="ti ti-book me-2 fs-4 text-${color}"></i>
                                <span class="border-start border-${color} ps-3">Escolaridad</span>
                            </label>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="form-floating mb-1">
                            <input type="text" class="form-control form-control-sm border-0" id="ocupacionFamiliar-${familiarCount}" value="${ocupacionText}" readonly />
                            <label>
                                <i class="ti ti-briefcase me-2 fs-4 text-${color}"></i>
                                <span class="border-start border-${color} ps-3">Ocupación</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row g-1">
                    <div class="col-12">
                        <div class="form-floating mb-1">
                            <input type="text" name="familiares[${familiarCount}][ingresoMensualFijo]" class="form-control form-control-sm border-0" value="${ingresoMensualFijo}" readonly />
                            <label>
                                <i class="ti ti-currency-dollar me-2 fs-4 text-${color}"></i>
                                <span class="border-start border-${color} ps-3">Ingreso Fijo</span>
                            </label>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-floating mb-1">
                            <input type="text" name="familiares[${familiarCount}][ingresoMensualVariable]" class="form-control form-control-sm border-0" value="${ingresoMensualVariable}" readonly />
                            <label>
                                <i class="ti ti-currency-dollar me-2 fs-4 text-${color}"></i>
                                <span class="border-start border-${color} ps-3">Ingreso Variable</span>
                            </label>
                        </div>
                    </div>
                </div>
                <input type="hidden" name="familiares[${familiarCount}][nombre]" value="${nombre}">
                <input type="hidden" name="familiares[${familiarCount}][edad]" value="${edad}">
                <input type="hidden" name="familiares[${familiarCount}][parentesco]" value="${parentesco}">
                <input type="hidden" name="familiares[${familiarCount}][estadoCivil]" value="${estadoCivilValue}">
                <input type="hidden" name="familiares[${familiarCount}][escolaridad]" value="${escolaridadValue}">
                <input type="hidden" name="familiares[${familiarCount}][ocupacion]" value="${ocupacionValue}">
            </div>
        </div>
    `;
    $("#familiaresContainer").prepend(nuevoFamiliar);
}

function editarFamiliar(familiarId) {
    const familiar = $('#familiar-' + familiarId);
    const nombre = familiar.find('.card-title').text();
    const edad = familiar.find('input[name="familiares[' + familiarId + '][edad]"]').val();
    const estadoCivil = familiar.find('input[name="familiares[' + familiarId + '][estadoCivil]"]').val();
    const parentesco = familiar.find('input[name="familiares[' + familiarId + '][parentesco]"]').val();
    const escolaridad = familiar.find('input[name="familiares[' + familiarId + '][escolaridad]"]').val();
    const ocupacion = familiar.find('input[name="familiares[' + familiarId + '][ocupacion]"]').val();
    const ingresoMensualFijo = familiar.find('input[name="familiares[' + familiarId + '][ingresoMensualFijo]"]').val();
    const ingresoMensualVariable = familiar.find('input[name="familiares[' + familiarId + '][ingresoMensualVariable]"]').val();
    $('#nombreFamiliarEditar').val(nombre);
    $('#edadFamiliarEditar').val(edad);
    $('#parentescoFamiliarEditar').val(parentesco);
    $('#ingresoMensualFijoFamiliarEditar').val(ingresoMensualFijo);
    $('#ingresoMensualVariableFamiliarEditar').val(ingresoMensualVariable);
    $('#estadoCivilFamiliarEditar').val(estadoCivil);
    $('#escolaridadFamiliarEditar').val(escolaridad);
    $('#ocupacionFamiliarEditar').val(ocupacion);
    $('#btnEditarFamiliar').data('id', familiarId);
    $('#modalEditarFamiliar').modal('show');
}

function borrarFamiliar(id) {
    const familiar = document.getElementById('familiar-' + id);
    familiar.remove();
    actualizarTotalFamiliares(false);
}

function actualizarTotalFamiliares(agregar) {
    const totalFamiliares = Number($("#totalFamiliares").text()) || 0;
    const nuevoTotal = agregar ? totalFamiliares + 1 : (totalFamiliares > 0 ? totalFamiliares - 1 : 0);
    $("#totalFamiliares").text(nuevoTotal);
    actualizarIngresos(nuevoTotal);
}

function actualizarIngresos(integrantesTotal) {
    let ingresoFijoTotal = 0;
    let ingresoVariableTotal = 0;
    $(".card-familiar").each(function () {
        ingresoFijoTotal += Number($(this).find('input[name*="ingresoMensualFijo"]').val()) || 0;
        ingresoVariableTotal += Number($(this).find('input[name*="ingresoMensualVariable"]').val()) || 0;
    });
    const totalIngresos = ingresoFijoTotal + ingresoVariableTotal;
    const promedioIngreso = integrantesTotal > 0 ? (totalIngresos / integrantesTotal) : 0;
    $("#totalIngresoFijoValor").text(ingresoFijoTotal.toFixed(2));
    $("#totalIngresoVariableValor").text(ingresoVariableTotal.toFixed(2));
    $("#totalIngresos").text(totalIngresos.toFixed(2));
    $("#promedioIngreso").text(promedioIngreso.toFixed(2));
}
