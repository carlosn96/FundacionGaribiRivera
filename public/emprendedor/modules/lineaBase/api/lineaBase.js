
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
            configurarSeccionAdministracionIngresosNegocio();
            
            desbloquearSeccion($("#contenido"));
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
    configurarCampoComunidadParroquial();
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

function configurarCampoComunidadParroquial() {
    $("#comunidadParroquial").select2({
        placeholder: "Buscar parroquia...",
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
                    case: "buscarParroquia",
                    data: "parroquia=" + params.term
                };
            },
            processResults: function (data) {
                return {
                    results: data.map(function (item) {
                        return {
                            id: item.id_comunidad,
                            text: "<strong>" + item.nombre + "</strong>, " + item.nombre_decanato,
                            idComunidad: item.id_comunidad,
                            item: item
                        };
                    })
                };
            },
            cache: true
        },
        escapeMarkup: function (markup) {
            return markup;
        },
        minimumInputLength: 3,
        templateSelection: function (data) {
            $("#idComunidad").val(data.idComunidad);
            return data.text;
        }
    });
}
