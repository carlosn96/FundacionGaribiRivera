
const urlAPI = "api/LineaBaseAPI.php";

function ready() {

    bloquearSeccion($("#contenido"));

    crearPeticion(urlAPI, {case: "recuperarCamposInformacion"}, (rs) => {
        print(rs);
        if (rs.existeLineaBase) {
            redireccionar("../lineaBaseVista/");
        } else {
            let etapa = rs.etapaFormacion;
            $("#etapaFormacion").val(etapa.nombre);
            $("#idEtapa").val(etapa.idEtapa);
            $.each(rs.checkbox, (idx, elementos) => {
                crearGroupCheckbox($("#" + idx), elementos, idx);
            });
            $.each(rs.radio, (idx, elementos) => {
                crearGroupRadio($("#" + idx), elementos, idx);
            });
            $.each(rs.selector, (idx, elementos) => {
                crearSelector($("#" + idx + "List"), idx, elementos);
            });
            configurarSeccionPreliminar();
            configurarSeccionIdentificacion();
            configurarSeccionDomicilio();
            configurarSeccionInformacionNegocio();
            configurarSeccionAnalisisNegocio();
            desbloquearSeccion($("#contenido"));
        }
    });
}

function enviarForm() {
    //seccion Información preliminar
    /*if (isArrayEmpty(recuperarListadoInputsValue("input[name='medioConocimiento[]']:checked")) && 
     isArrayEmpty(recuperarListadoInputsValue("input[name='otroMedioConocimiento[]']:checked"))) {
     mostrarMensajeAdvertencia("Selecciona al menos un elemento de la pregunta '¿Cómo te enteresaste de la Fundación?'", false);
     } else {
     crearPeticion(urlAPI, {case: "guardar", data: $("#lineaBaseForm").serialize()}, print, ()=>{}, "text");
     }*/
    crearPeticion(urlAPI, {case: "guardar", data: $("#lineaBaseForm").serialize()});
}


function configurarSeccionAnalisisNegocio() {
    $('input[name="identificaCompetencia"]').change(function () {
        let deshabilitar = $(this).val() !== "1";
        $("#competenciaField").prop("hidden", deshabilitar);
        $("#quienCompetencia").attr("disabled", deshabilitar);
    });
    $('input[name="conoceProductosMayorUtilidad"]').change(function () {
        let deshabilitar = $(this).val() !== "1";
        $("#utilidadProductosField").prop("hidden", deshabilitar);
        $("#porcentajeGanancias").attr("disabled", deshabilitar);

    });
    $('input[name="ahorro"]').change(function () {
        let tieneAhorro = $(this).val() !== "0";
        $("#cuantoAhorroField").prop("hidden", !tieneAhorro);
        $("#cuantoAhorro").attr("disabled", !tieneAhorro);
        $("#razonesNoAhorroField").prop("hidden", tieneAhorro);
        $("#razonesNoAhorro").attr("disabled", tieneAhorro);

    });
}


function configurarSeccionInformacionNegocio() {
    const TEXTO_OTRO_GIRO = "Otro";
    let $giroNegocio = $("#giroNegocio");
    if ($giroNegocio.length > 0) {
        crearOpcionSelector($giroNegocio, null, TEXTO_OTRO_GIRO);
        $giroNegocio.change(() => {
            $("#otroGiroDiv").prop("hidden", $('#giroNegocio option:selected').text() !== TEXTO_OTRO_GIRO);
        });
    }
    $("input[name='tieneNegocio']").change(function () {
        let tieneNegocio = $(this).val() === "1";
        $("#camposTieneNegocio").prop("hidden", !tieneNegocio);
        $("#mensajeNoTieneNegocio").prop("hidden", tieneNegocio);
        $("#seccionAnalisisNegocio").prop("hidden", !tieneNegocio);
    });

    configurarCampoCodigoPostal($("#codigoPostalNegocio"), function (idCodigoPostal, estado, municipio, colonia) {
        $("#idCodigoPostalNegocio").val(idCodigoPostal);
        $("#estadoNegocio").val(estado);
        $("#municipioNegocio").val(municipio);
        $("#coloniaNegocio").val(colonia);
    });
}

function configurarSeccionPreliminar() {
    $('#otroMedioCheckbox').change(function () {
        let habilitar = !this.checked;
        let $otroMedioConocimiento = $('#otroMedioConocimiento');
        $otroMedioConocimiento.attr("hidden", habilitar);
        $otroMedioConocimiento.prop("disabled", habilitar);
    });
    $('input[name="razonRecurre"]').change(function () {
        var $this = $(this);
        const toggleOtraRazon = function () {
            let habilitar = $this.val().length > 0;
            let $otroMedioConocimiento = $('#otraRazonRecurre');
            $otroMedioConocimiento.attr("hidden", habilitar);
            $otroMedioConocimiento.prop("disabled", habilitar);
        };
        const toggleSolicitaUsaCredito = function () {
            let ocultarUtilizaSolicita = !$('label[for="' + $this.attr("id") + '"]').text().includes("Crédito");
            let $solicitaUtiliza = $('#utilizaCredito, #solicitaCredito');
            $solicitaUtiliza.prop("hidden", ocultarUtilizaSolicita);
            $solicitaUtiliza.find('*').prop("disabled", ocultarUtilizaSolicita);
        };
        toggleOtraRazon();
        toggleSolicitaUsaCredito();
    });
}

function configurarSeccionIdentificacion() {
    $('input[name="presentaDiscapacidad"]').change(function () {
        let presentaDiscapacidad = $(this).val() === "1";
        let $cualDispacidad = $('#discapacidad');
        $cualDispacidad.attr("hidden", !presentaDiscapacidad);
        $cualDispacidad.prop("disabled", !presentaDiscapacidad);
    });
}

function configurarSeccionDomicilio() {
    configurarCampoCodigoPostal($("#codigoPostal"), function (idCodigoPostal, estado, municipio, colonia) {
        $("#idCodigoPostal").val(idCodigoPostal);
        $("#estado").val(estado);
        $("#municipio").val(municipio);
        $("#colonia").val(colonia);
    });
    $("#vicaria").change(async function () {
        try {
            const idVicaria = $(this).val();
            const listaDecanatos = await cargarDecanatos(idVicaria);
            const $decanatoList = $("#decanatoList");
            $decanatoList.empty();
            crearSelector($decanatoList, "decanato", listaDecanatos);
            $("#decanato").off("change").on("change", async function () {
                const idDecanato = $(this).val();
                const listaComunidadesParroquiales = await cargarComunidadesParroquiales(idDecanato);
                const $comunidad = $("#comunidadParroquialList");
                $comunidad.empty();
                crearSelector($comunidad, "comunidadParroquial", listaComunidadesParroquiales);
            });
        } catch (error) {
            console.error("Error al cargar datos:", error);
        }
    });
}

function cargarDecanatos(idVicaria) {
    return new Promise((resolve, reject) => {
        crearPeticion(urlAPI, {case: "recuperarListaDecanatos", data: "idVicaria=" + idVicaria}, (lista) => {
            resolve(lista);
        });
    });
}

function cargarComunidadesParroquiales(idDecanato) {
    return new Promise((resolve, reject) => {
        crearPeticion(urlAPI, {case: "recuperarListaComunidadParroquial", data: "idDecanato=" + idDecanato}, (lista) => {
            resolve(lista);
        });
    });
}

function configurarCampoCodigoPostal($campoCodigo, fnLlenadoCampos) {
    $campoCodigo.select2({
        placeholder: "Cargando CP",
        language: {
            inputTooShort: function (args) {
                var remainingChars = args.minimum - args.input.length;
                return 'Por favor ingresa ' + remainingChars + ' o más caracteres';
            },
            searching: function () {
                return 'Buscando...';
            },
            noResults: function () {
                return 'No se encontraron resultados';
            }
        },
        ajax: {
            url: urlAPI,
            dataType: "json",
            delay: 250,
            type: 'POST',
            data: function (params) {
                return {
                    case: "buscarCodigoPostal",
                    data: "codigoPostal=" + params.term
                };
            },
            processResults: function (data) {
                return {
                    results: data.map(function (item) {
                        return {
                            id: item.id_codigo,
                            text: "<strong>" + item.codigo_postal + "</strong> - " + item.colonia + ', ' + item.nombre_municipio + ', ' + item.nombre_estado,
                            codigoPostal: item.codigo_postal,
                            item: item // Adjuntamos el objeto completo para usarlo después
                        };
                    })
                };
            },
            cache: true
        },
        escapeMarkup: function (markup) {
            return markup;
        },
        minimumInputLength: 4,
        templateSelection: function (cp) {
            if (cp.item) {
                fnLlenadoCampos(cp.id, cp.item.nombre_estado, cp.item.nombre_municipio, cp.item.colonia);
            }
            return cp.codigoPostal;
        }
    });
}