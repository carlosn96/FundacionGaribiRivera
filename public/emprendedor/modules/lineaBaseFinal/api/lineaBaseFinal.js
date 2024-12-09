
const urlAPI = "api/LineaBaseFinalAPI.php";

function ready() {

    bloquearSeccion($("#contenido"));

    crearPeticion(urlAPI, {case: "recuperarCamposInformacion"}, (rs) => {
        print(rs.data);
        let data = rs.data;
        if (rs.existeLineaBase) {

            $.each(rs.checkbox, (idx, elementos) => {
                crearGroupCheckbox($("#" + idx), elementos, idx);
            });
            $.each(rs.selector, (idx, elementos) => {
                crearSelector($("#" + idx + "List"), idx, elementos);
            });
            configurarSeccionPreliminar(data);
            configurarSeccionInformacionNegocio(data);
            configurarSeccionAnalisisNegocio(data);
            configurarSeccionAdministracionIngresosNegocio(data);
            desbloquearSeccion($("#contenido"));
        } else {
            mostrarMensajeInfo("Sin información disponible de la Linea Base incial", false, () => {
                redireccionar("../lineaBase");
            });
        }
    });
}

function enviarForm() {
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
    $("#noSeComoResponderEstrategias").change(function () {
        $("#estrategiasIncrementarVentas").prop("hidden", $(this).is(":checked"));
    });
}

function configurarSeccionInformacionNegocio() {
    const TEXTO_OTRA_ACTIVIDAD = "Otra";
    let $actividadNegocio = $("#actividadNegocio");
    if ($actividadNegocio.length > 0) {
        crearOpcionSelector($actividadNegocio, null, TEXTO_OTRA_ACTIVIDAD);
        $actividadNegocio.change(() => {
            $("#otraActividadDiv").prop("hidden", $('#actividadNegocio option:selected').text() !== TEXTO_OTRA_ACTIVIDAD);
        });
    }
    $("input[name='tieneNegocio']").change(function () {
        let tieneNegocio = $(this).val() === "1";
        $("#camposTieneNegocio").prop("hidden", !tieneNegocio);
        $("#mensajeNoTieneNegocio1").prop("hidden", tieneNegocio);
        $("#mensajeNoTieneNegocio2").prop("hidden", tieneNegocio);
        $("#seccionAnalisisNegocio").prop("hidden", !tieneNegocio);
        $("#seccionAdministracionIngresosNegocio").prop("hidden", !tieneNegocio);
    });
    configurarCampoCodigoPostal($("#codigoPostalNegocio"), function (idCodigoPostal, estado, municipio, colonia) {
        $("#idCodigoPostalNegocio").val(idCodigoPostal);
        $("#estadoNegocio").val(estado);
        $("#municipioNegocio").val(municipio);
        $("#coloniaNegocio").val(colonia);
    });
}

function configurarSeccionAdministracionIngresosNegocio() {
    $("input[name='cuentaConSistemaAhorro']").change(function () {
        let sinSistema = $(this).val() === "0";
        $("#seccionDetallesSistemaAhorro").prop("hidden", sinSistema);
        $("#detallesSistemaAhorro").attr("disabled", sinSistema);
    });
}

function configurarSeccionPreliminar(data) {
    $('input[name="huboBeneficioPersonal"]').change(function () {
        $('#beneficiosObtenidos').prop('disabled', !($(this).val() === '1'));
    });
    let etapa = data.etapa;
    $("#etapaFormacion").val(etapa.nombre);
    $("#idEtapa").val(etapa.idEtapa);
    $("#ocupacionActual").val(data.socioeconomico.ocupacionActual.id);
    $("#ingresoMensual").val(data.socioeconomico.ingresoMensual.id);
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