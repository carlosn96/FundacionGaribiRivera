const urlAPI = "api/EtapaAPI.php";

function ready() {
    configurarEventos();
    crearPeticion(urlAPI, { "case": "recuperarCampos" }, function (res) {
        construirSelectorAnios(res.aniosEtapas);
        construirTablaEtapas(res.etapas);
        construirButtonGroupTipoEtapa($("#tipoEtapaGroup"), "tipoEtapa", res.tiposEtapa);
        construirButtonGroupTipoEtapa($("#tipoEtapaModal"), "tipoModal", res.tiposEtapa);
    });
}

function construirButtonGroupTipoEtapa($container, name, tiposEtapa) {
    $container.empty();
    $container.append(`
        <label class="form-label mb-2">Tipo de etapa</label>
        <div class="btn-group w-100" role="group" aria-label="Selector de tipo de etapa" id="btnGroup_${name}">
            ${tiposEtapa.map((tipo, idx) => `
                <input type="radio" class="btn-check" name="${name}" id="${name}_${tipo.id_tipo}" value="${tipo.id_tipo}" autocomplete="off" ${idx === 0 ? 'checked' : ''} required>
                <label class="btn btn-outline-primary" for="${name}_${tipo.id_tipo}">${tipo.descripcion}</label>
            `).join('')}
        </div>
    `);
}

function cambiarEtapaActual(event) {
    var input = $(event.target);
    crearPeticion(urlAPI, { case: "actualizarEtapaActual", data: "id=" + input.val() }, print);
}

function configurarEventos() {

    fijarSubmitFormulario("#actualizarEtapaForm", urlAPI, "actualizarEtapa");
    fijarSubmitFormulario("#etapaForm", urlAPI, "agregarEtapa");

    $("#filterForm").submit(function (e) {
        e.preventDefault();
        const $boton = $("#botonAplicarFiltro");
        const textoOriginal = $boton.text();
        $boton.prop('disabled', true).text('Cargando...');
        const $spinner = $('<span class="spinner-grow spinner-grow-sm me-2" role="status"></span>');
        $boton.prepend($spinner);
        crearPeticion(urlAPI, { case: "filtrarEtapasPorAnio", data: $(this).serialize() }, function (etapas) {
            construirTablaEtapas(etapas);
            $boton.prop('disabled', false).text(textoOriginal);
            $spinner.remove();
        });
    });
}

function mostrarModalEditar(etapastr) {
    const etapa = JSON.parse(decodeURIComponent(etapastr));
    $("#nombreEtapaModal").val(etapa.nombre);
    $("#fechaInicioModal").val(etapa.fechaInicio);
    $("#fechaFinModal").val(etapa.fechaFin);
    $(`input[name="tipoModal"][value="${etapa.tipo.id}"]`).prop("checked", true);
    $("#idEtapa").val(etapa.idEtapa);
    $("#modalDetallesEtapa").modal("show");
}

function construirSelectorAnios(listaAnios) {
    const $selector = $("<select>", { class: "form-select", name: "anio", required: true, id: "selectorAnios" });
    crearOpcionSelector($selector, "", "Selecciona año");
    listaAnios.forEach((anio) => {
        crearOpcionSelector($selector, anio, anio);
    });
    $("#selector").find("select").remove();
    $("#selector").prepend($selector);
    $selector.on("change", function () {
        const anioSeleccionado = $(this).val();
        if (anioSeleccionado) {
            $selector.prop('disabled', true);
            crearPeticion(urlAPI, { case: "filtrarEtapasPorAnio", data: "anio=" + anioSeleccionado }, function (etapas) {
                construirTablaEtapas(etapas);
                $selector.prop('disabled', false);
                
            });
        }
    });
}

function construirTablaEtapas(etapas) {
    const numEtapas = etapas.length;
    const opcionesBtnEliminar = {
        url: urlAPI,
        data: { case: "eliminar" },
        mensajeAlerta: "La etapa ya no estará disponible"
    };
    const dataTabla = etapas.map(({ idEtapa, nombre, fechaInicio, fechaFin, esActual, tipo, claveAcceso }) => {
        opcionesBtnEliminar.idRegistro = idEtapa;
        opcionesBtnEliminar.data.data = `id=${idEtapa}`;

        const btns = `
    <div class="dropdown">
        <button class="btn btn-sm btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Acciones
        </button>
        <ul class="dropdown-menu">
            <li>
                <a class="dropdown-item text-success" href="#" onclick="mostrarModalEditar('${encodeURIComponent(JSON.stringify({ idEtapa, nombre, fechaInicio, fechaFin, esActual, tipo, claveAcceso }))}')">
                    <i class="ti ti-edit me-2"></i>Editar
                </a>
            </li>
            ${numEtapas > 1 ? `
            <li>
                <a class="dropdown-item text-danger" href="#" onclick='alertaEliminar(JSON.parse(decodeURIComponent("${encodeURIComponent(JSON.stringify(opcionesBtnEliminar))}")))'>
                    <i class="ti ti-trash me-2"></i>Eliminar
                </a>
            </li>
            ` : ""}
        </ul>
    </div>
`;
        return {
            "Etapa actual": construirInputRadio(`esActual${idEtapa}`, idEtapa,
                "esEtapaActual", "", false, esActual, cambiarEtapaActual),
            "Nombre": nombre,
            "Tipo": tipo.val,
            "Periodo": `${fechaInicio} a ${fechaFin}`,
            "Acciones": btns
        };
    });
    construirTablaDataTable(dataTabla, "table table-hover", "tablaEtapas", "etapasTable", "");
}