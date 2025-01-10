
const urlAPI = "api/LineaBaseFinalAPI.php";

function ready() {
    bloquearSeccion($("#contenido"));
    crearPeticion(urlAPI, {case: "recuperarCamposInformacion"}, (rs) => {
        //print(rs);
        let {inicial, final} = rs.lineaBase;
        if (inicial.existeLineaBase) {
            if (!final.existeLineaBase) {
                completarCamposFormulario(rs);
            } else {
                redireccionar("../lineaBaseVista");
            }
        } else {
            mostrarMensajeInfo("Sin información disponible de la Linea Base inicial", false, () => {
                redireccionar("../lineaBase");
            });
        }
    });
}

function completarCamposFormulario(rs) {
    let inicial = rs.lineaBase.inicial.data;
    $.each(rs.checkbox, (idx, elementos) => {
        crearGroupCheckbox($("#" + idx), elementos, idx);
    });
    $.each(rs.selector, (idx, elementos) => {
        crearSelector($("#" + idx + "List"), idx, elementos);
    });
    $.each(rs.radio, (idx, elementos) => {
        crearGroupRadio($("#" + idx), elementos, idx);
    });
    $("#objetivosAhorro").attr("required", false);
    configurarSeccionPreliminar(inicial);
    configurarSeccionInformacionNegocio(inicial.negocio);
    configurarSeccionAnalisisNegocio(inicial.analisisNegocio);
    configurarSeccionAdministracionIngresosNegocio(inicial.administracionIngresos);
    desbloquearSeccion($("#contenido"));
}

function enviarForm() {
    crearPeticion(urlAPI, {case: "guardar", data: $("#lineaBaseForm").serialize()});
}

function configurarSeccionAnalisisNegocio(analisisNegocio) {
    //print(analisisNegocio);
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

    if (analisisNegocio !== undefined) {
        //Asignacion de valores
        $(`#registros${analisisNegocio.registraEntradaSalida.val === 1 ? 'Si' : 'No'}`).prop('checked', true);
        $(`#sueldo${analisisNegocio.asignaSueldo.val === 1 ? 'Si' : 'No'}`).prop('checked', true);
        $(`#utilidad${analisisNegocio.conoceUtilidades.val === 1 ? 'Si' : 'No'}`).prop('checked', true);
        if (analisisNegocio.competencia.identifica.val === 1) {
            $(`#competenciaSi`).prop('checked', true);
            $("#competenciaField").prop("hidden", false);
            $("#quienCompetencia").val(analisisNegocio.competencia.quien);
        }
        $("#clientesNegocio").val(analisisNegocio.clientesNegocio);
        $("#ventajasNegocio").val(analisisNegocio.ventajasNegocio);
        $("#problemasNegocio").val(analisisNegocio.problemasNegocio);

        print(analisisNegocio.listaEstrategiaVentas);

        if (analisisNegocio.listaEstrategiaVentas.length !== 0) {
            analisisNegocio.listaEstrategiaVentas.forEach(item => {
                $(`#estrategiasIncrementarVentas${item.idEstrategia}`).prop('checked', true);
            });
        } else {
            $(`#noSeComoResponderEstrategias`).prop('checked', true);
        }
        analisisNegocio.listaEmpleoGanancias.forEach(item => {
            $('#comoEmpleaGanancias' + item.idEmpleoGanancia).prop('checked', true);
        });
        if (analisisNegocio.conoceProductosMayorUtilidad.conoce.val === 1) {
            $(`#conoceProductosMayorUtilidadSi`).prop('checked', true);
            $("#utilidadProductosField").prop("hidden", false);
            $("#porcentajeGanancias").val(analisisNegocio.conoceProductosMayorUtilidad.porcentaje);
        }
        if (analisisNegocio.ahorro.asigna.val === 1) {
            $(`#ahorroSi`).prop('checked', true);
            $("#cuantoAhorroField").prop("hidden", false);
            $("#cuantoAhorro").val(analisisNegocio.ahorro.detalles);
            $("#razonesNoAhorroField").prop("hidden", true);
        } else {
            $("#razonesNoAhorro").val(analisisNegocio.ahorro.detalles);
        }
        $(`#conocePuntoEquilibrio${analisisNegocio.conoceUtilidades.val === 1 ? 'Si' : 'No'}`).prop('checked', true);
        $(`#separaGastos${analisisNegocio.separaGastos.val === 1 ? 'Si' : 'No'}`).prop('checked', true);
        $(`#elaboraPresupuesto${analisisNegocio.elaboraPresupuesto.val === 1 ? 'Si' : 'No'}`).prop('checked', true);

    }
}

function configurarSeccionInformacionNegocio(negocio) {
    //print(negocio);
    $("#btnEditarCodigoPostal").click(function () {
        $("#codigoPostalView").hide();
        $("#selectorCodigoPostal").removeAttr("hidden").show();
    });
    $("#btnCancelarEditarCodigoPostal").click(function () {
        $("#codigoPostalView").show();
        $("#selectorCodigoPostal").attr("hidden", true);
    });
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
    // Configure the "codigoPostal" field with Select2 and handle additional fields
    configurarCampoCodigoPostal($("#codigoPostalNegocio"), function (idCodigoPostal, estado, municipio, colonia) {
        $("#idCodigoPostalNegocio").val(idCodigoPostal);
        $("#estadoNegocio").val(estado);
        $("#municipioNegocio").val(municipio);
        $("#coloniaNegocio").val(colonia);
    });

    if (negocio !== undefined) {
        $('input[name="tieneNegocio"][value="1"]').prop('checked', true).trigger('change');
        $("#nombreNegocio").val(negocio.nombre);
        $('#telefonoNegocio').val(negocio.telefono);
        $('#antiguedadNegocio').val(negocio.antiguedad);
        $('#codigoPostalVal').val(negocio.codigoPostal.codigo);
        $('#idCodigoPostalNegocio').val(negocio.codigoPostal.id);
        $('#municipioNegocio').val(negocio.municipio.nombre);
        $('#estadoNegocio').val(negocio.estado);
        $('#calleNegocio').val(negocio.calle);
        $('#numExteriorNegocio').val(negocio.numExterior);
        $('#numInteriorNegocio').val(negocio.numInterior);
        $('#calleCruce1Negocio').val(negocio.calleCruce1);
        $('#calleCruce2Negocio').val(negocio.calleCruce2);
        $('#cantEmpleadosNegocio').val(negocio.cantEmpleados.num);
        $('#coloniaNegocio').val(negocio.codigoPostal.colonia);
        $('#giroNegocio').val(negocio.giro.id);
        if (negocio.actividad.id) {
            $actividadNegocio.val(negocio.actividad.id);
        } else {
            $actividadNegocio.val(TEXTO_OTRA_ACTIVIDAD);
            $actividadNegocio.trigger("change");
            $("#otraActividadNegocio").val(negocio.actividad.descripcion);
        }
    }
}

function configurarSeccionAdministracionIngresosNegocio(administracionIngresos) {
    //print(administracionIngresos);
    $("input[name='cuentaConSistemaAhorro']").change(function () {
        let sinSistema = $(this).val() === "0";
        $("#seccionDetallesSistemaAhorro").prop("hidden", sinSistema);
        $("#detallesSistemaAhorro").attr("disabled", sinSistema);
    });
    if (administracionIngresos !== undefined) {
        $("#ventasMensuales").val(administracionIngresos.montoMensualVentas);
        $("#gastosMensuales").val(administracionIngresos.montoMensualEgresos);
        $("#utilidadesMensuales").val(administracionIngresos.montoMensualUtilidades);
        $("#sueldoMensual").val(administracionIngresos.sueldoMensual);
        $(`#ingresoPrincipal${administracionIngresos.esNegocioPrincipalFuentePersonal.val === 1 ? 'Si' : 'No'}`).prop('checked', true);
        $(`#esIngresoPrincipalFamiliar${administracionIngresos.esNegocioPrincipalFuenteFamiliar.val === 1 ? 'Si' : 'No'}`).prop('checked', true);
        $(`#habitoAhorro${administracionIngresos.habitoAhorro.val === 1 ? 'Si' : 'No'}`).prop('checked', true);
        if (administracionIngresos.sistemaAhorro.cuenta.val === 1) {
            $("#detallesSistemaAhorro").val(administracionIngresos.sistemaAhorro.detalle);
        } else {
            $("#sistemaAhorroNo").prop('checked', true);
            $("input[name='cuentaConSistemaAhorro']").trigger("change");
        }
        if (administracionIngresos.objetivosAhorro.length !== 0) {
            administracionIngresos.objetivosAhorro.forEach(item => {
                $(`#objetivosAhorro${item.id_objetivo}`).prop('checked', true);
            });
        }
        $("#ahorroMensual").val(administracionIngresos.montoAhorroMensual);
    }
}

function configurarSeccionPreliminar(data) {
    //print(data);
    $('input[name="huboBeneficioPersonal"]').change(function () {
        $('#beneficiosObtenidos').prop('disabled', !($(this).val() === '1'));
    });
    let etapa = data.etapa;
    $("#etapaFormacion").val(etapa.nombre);
    $("#idLineaBaseInicial").val(data.idLineaBase);
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