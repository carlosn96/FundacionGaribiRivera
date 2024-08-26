const urlAPI = "api/EtapaAPI.php";

function ready() {
    configurarEventos();
    crearPeticion(urlAPI, {"case": "recuperarCampos"}, function (res) {
        const numEtapas = res.etapas.length;
        const opcionesBtnEliminar = {
            url: urlAPI,
            data: {case: "eliminar"},
            mensajeAlerta: "La etapa ya no estará disponible"
        };
        const dataTabla = res.etapas.map(({ idEtapa, nombre, fechaInicio, fechaFin, esActual, tipo, claveAcceso }) => {
            opcionesBtnEliminar.idRegistro = idEtapa;
            opcionesBtnEliminar.data.data = `id=${idEtapa}`;
            return {
                "Es etapa actual": construirInputRadio(`esActual${idEtapa}`, idEtapa,
                        "esEtapaActual",  "",  false, esActual, cambiarEtapaActual),
                "Nombre": nombre,
                "Fecha de inicio": fechaInicio,
                "Fecha de fin": fechaFin,
                "Acciones": crearBotonEditar(JSON.stringify({idEtapa, nombre, fechaInicio, fechaFin, esActual, tipo, claveAcceso})) +
                        (numEtapas > 1 ? crearBotonEliminar(opcionesBtnEliminar) : "")
            };
        });
        construirTabla(dataTabla, "table table-hover", "tablaEtapas", "etapasTable");
        crearGroupCheckbox($("#grupoTalleres"), res.talleres, "talleres");
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
    $("#etapaForm").submit(function (e) {
        e.preventDefault();
        const talleres = $("input[type=checkbox]:checked").map(function () {
            return this.value;
        }).get();
        if (talleres.length) {
            crearPeticion(urlAPI, {
                case: "agregarEtapa",
                data: $(this).serialize()
            });
        } else {
            mostrarMensajeAdvertencia("Agrega al menos un taller", false);
        }
    });
    fijarSubmitFormulario("#actualizarEtapaForm", urlAPI, "actualizarEtapa");
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
    var diccionario = [abc, ABC, num];
    var key = "";
    var alfabetoRand;
    for (var i = 0; i < MAX_DIGITOS; i++) {
        alfabetoRand = diccionario[Math.floor(Math.random() * diccionario.length)];
        key += alfabetoRand.charAt(Math.floor(Math.random() * alfabetoRand.length));
    }
    claveAcceso.val(key);
}


