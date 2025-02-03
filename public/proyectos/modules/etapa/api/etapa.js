const urlAPI = "api/EtapaAPI.php";

function ready() {
    configurarEventos();
    crearPeticion(urlAPI, {"case": "recuperarCampos"}, function (res) {
        construirSelectorAnios(res.aniosEtapas);
        construirTablaEtapas(res.etapas);
        crearSelector($("#tipoEtapa"), "tipo", res.tiposEtapa);
        crearSelector($("#tipoEtapaModal"), "tipoModal", res.tiposEtapa);
    });
}

function cambiarEtapaActual(event) {
    var input = $(event.target);
    crearPeticion(urlAPI, {case: "actualizarEtapaActual", data: "id=" + input.val()}, print);
}

function configurarEventos() {
    $('input:radio[name=tamClave]').change(function () {
        var claveAcceso = $("#claveAcceso");
        var tamCadena = $('input:radio[name=tamClave]:checked').val();
        claveAcceso.attr("maxlength", tamCadena);
        claveAcceso.val(claveAcceso.val().substring(0, tamCadena));
    });

    $('.clave').on('input', function () {
        $(this).val($(this).val().replace(/\s+/g, ''));
    });

    fijarSubmitFormulario("#actualizarEtapaForm", urlAPI, "actualizarEtapa");
    fijarSubmitFormulario("#etapaForm", urlAPI, "agregarEtapa");

    $("#filterForm").submit(function (e) {
        e.preventDefault();
        const $boton = $("#botonAplicarFiltro");
        const textoOriginal = $boton.text();
        $boton.prop('disabled', true).text('Cargando...');
        const $spinner = $('<span class="spinner-grow spinner-grow-sm me-2" role="status"></span>');
        $boton.prepend($spinner);
        crearPeticion(urlAPI, {case: "filtrarEtapasPorAnio", data: $(this).serialize()}, function (etapas) {
            construirTablaEtapas(etapas);
            $boton.prop('disabled', false).text(textoOriginal);
            $spinner.remove();
        });
    });
}

function crearBotonEditar(idEtapa) {
    return crearBoton(
            "",
            "btn btn-sm btn-outline-primary",
            "ti ti-edit",
            idEtapa, "btnEditar" + idEtapa, "mostrarModalEditar(" + idEtapa + ")");
}

function mostrarModalEditar(etapa) {
    $("#nombreEtapaModal").val(etapa.nombre);
    $("#fechaInicioModal").val(etapa.fechaInicio);
    $("#fechaFinModal").val(etapa.fechaFin);
    $("#claveAccesoModal").val(etapa.claveAcceso);
    $("#tipoModal").val(etapa.tipo.id);
    $("#idEtapa").val(etapa.idEtapa);
    $("#modalDetallesEtapa").modal("show");
}

function generarClaveAccesoAleatoria() {
    var claveAcceso = $("#claveAcceso");
    const MAX_DIGITOS = claveAcceso.attr("maxlength");
    const abc = "abcdefghijklmnopqrstuvwxyz";
    const ABC = abc.toUpperCase();
    const num = "0123456789";
    const esp = "%$&";
    var diccionario = [abc, ABC, num, esp];
    var key = "";
    var alfabetoRand;
    for (var i = 0; i < MAX_DIGITOS; i++) {
        alfabetoRand = diccionario[Math.floor(Math.random() * diccionario.length)];
        key += alfabetoRand.charAt(Math.floor(Math.random() * alfabetoRand.length));
    }
    claveAcceso.val(key);
}

function construirSelectorAnios(listaAnios) {
    const $selector = $("<select>", {class: "form-select", name: "anio", required: true});
    crearOpcionSelector($selector, "", "Selecciona año");
    listaAnios.forEach((anio) => {
        crearOpcionSelector($selector, anio, anio);
    });
    $("#selector").prepend($selector);
}

function construirTablaEtapas(etapas) {
    const numEtapas = etapas.length;
    const opcionesBtnEliminar = {
        url: urlAPI,
        data: {case: "eliminar"},
        mensajeAlerta: "La etapa ya no estará disponible"
    };
    const dataTabla = etapas.map(({ idEtapa, nombre, fechaInicio, fechaFin, esActual, tipo, claveAcceso }) => {
        opcionesBtnEliminar.idRegistro = idEtapa;
        opcionesBtnEliminar.data.data = `id=${idEtapa}`;
        // Creamos un grupo de botones para las acciones
        const btns = `
            <div class="btn-group" role="group" aria-label="Acciones">
                ${crearBotonEditar(JSON.stringify({idEtapa, nombre, fechaInicio, fechaFin, esActual, tipo, claveAcceso}))}
                ${numEtapas > 1 ? crearBotonEliminar(opcionesBtnEliminar) : ""}
            </div>`;
        return {
            "Es etapa actual": construirInputRadio(`esActual${idEtapa}`, idEtapa,
                    "esEtapaActual", "", false, esActual, cambiarEtapaActual),
            "Nombre": nombre,
            "Fecha de inicio": getFormatDate(fechaInicio),
            "Fecha de fin": getFormatDate(fechaFin),
            "Acciones": btns
        };
    });
    construirTablaDataTable(dataTabla, "table table-hover", "tablaEtapas", "etapasTable", "");
}