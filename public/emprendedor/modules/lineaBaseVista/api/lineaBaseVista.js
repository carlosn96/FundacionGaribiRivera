
const urlAPI = "api/LineaBaseAPI.php";

function ready() {
    bloquearSeccion($("#content"));
    crearPeticion(urlAPI, {case: "consultarLineaBase"}, function (rs) {
        if (rs.existeLineaBase) {
            construirFormulario(rs.data);
        } else {
            redireccionar("../lineaBase/");
        }
        desbloquearSeccion($("#content"));
    });
}


function construirFormulario(lineaBase) {
print(lineaBase);

    let construirLista = function (lista) {
        let $lista = $("<ul>", {class: "list-group list-group-flush"});
        if (lista.length > 0) {
            lista.forEach(function (item, idx) {
                $lista.append(
                        $("<li>", {class: "list-group-item"})
                        .append($("<i>", {class: item.icon + " text-success"}))
                        .append(" ")
                        .append(item.descripcion)
                        );
            });
        }
        return $lista;
    };

    let $ul = construirLista(lineaBase.preliminar.listaMedioConoceFundacion);
    $ul.append($("<li>", {class: "list-group-item"}).append(lineaBase.preliminar.otroMedioConoceFundacion));
    $('#preliminar-listaMedioConoceFundacion').append($ul);

    $('#preliminar-otraRazonRecurreFundacion').text(lineaBase.preliminar.otraRazonRecurreFundacion);
    $('#preliminar-razonRecurreFundacion-descripcion').text(lineaBase.preliminar.razonRecurreFundacion.descripcion);
    $('#preliminar-solicitaCredito-descripcion').text(lineaBase.preliminar.solicitaCredito.descripcion);
    $('#preliminar-utilizaCredito-descripcion').text(lineaBase.preliminar.utilizaCredito.descripcion);
    $('#preliminar-tiempoDedicaCapacitacion-descripcion').text(lineaBase.preliminar.tiempoDedicaCapacitacion.descripcion);

    $('#identificacion-genero').text(lineaBase.identificacion.genero);
    $('#identificacion-edad').text(lineaBase.identificacion.edad);
    $('#identificacion-estadoCivil-descripcion').text(lineaBase.identificacion.estadoCivil.descripcion);
    $('#identificacion-escolaridad-descripcion').text(lineaBase.identificacion.escolaridad.descripcion);
    $('#identificacion-discapacidad').text(lineaBase.identificacion.discapacidad);

    $('#domicilio-calle').text(lineaBase.domicilio.calle);
    $('#domicilio-calleCruce1').text(lineaBase.domicilio.calleCruce1);
    $('#domicilio-calleCruce2').text(lineaBase.domicilio.calleCruce2);
    $('#domicilio-numeroExterior').text(lineaBase.domicilio.numeroExterior);
    $('#domicilio-numeroInterior').text(lineaBase.domicilio.numeroInterior);
    $('#domicilio-codigoPostal-codigo').text(lineaBase.domicilio.codigoPostal.codigo);
    $('#domicilio-codigoPostal-colonia').text(lineaBase.domicilio.codigoPostal.colonia);
    $('#domicilio-municipio-nombre').text(lineaBase.domicilio.municipio.nombre);
    $('#domicilio-estado').text(lineaBase.domicilio.estado);
    $('#domicilio-comunidadParroquial-nombre').text(lineaBase.domicilio.comunidadParroquial.nombre);
    $('#domicilio-comunidadParroquial-decanato').text(lineaBase.domicilio.comunidadParroquial.decanato);
    $('#domicilio-comunidadParroquial-vicaria').text(lineaBase.domicilio.comunidadParroquial.vicaria);

    $('#socioeconomico-cantidadDependientes').text(lineaBase.socioeconomico.cantidadDependientes);
    $('#socioeconomico-ocupacionActual-descripcion').text(lineaBase.socioeconomico.ocupacionActual.descripcion);
    $('#socioeconomico-ingresoMensual-descripcion').text(lineaBase.socioeconomico.ingresoMensual.descripcion);

    if (lineaBase.negocio) {
        $('#negocio-nombre').text(lineaBase.negocio.nombre);
        $('#negocio-telefono').text(lineaBase.negocio.telefono);
        $('#negocio-calle').text(lineaBase.negocio.calle);
        $('#negocio-calleCruce1').text(lineaBase.negocio.calleCruce1);
        $('#negocio-calleCruce2').text(lineaBase.negocio.calleCruce2);
        $('#negocio-numExterior').text(lineaBase.negocio.numExterior);
        $('#negocio-numInterior').text(lineaBase.negocio.numInterior);
        $('#negocio-codigoPostal-codigo').text(lineaBase.negocio.codigoPostal.codigo);
        $('#negocio-codigoPostal-colonia').text(lineaBase.negocio.codigoPostal.colonia);
        $('#negocio-municipio-nombre').text(lineaBase.negocio.municipio.nombre);
        $('#negocio-estado-nombre').text(lineaBase.negocio.estado);
        $('#negocio-antiguedad').text(lineaBase.negocio.antiguedad);
        $('#negocio-cantEmpleados').text(lineaBase.negocio.cantEmpleados);
        $('#negocio-giro-descripcion').text(lineaBase.negocio.giro.descripcion || lineaBase.negocio.otroGiro);
        $('#negocio-actividadPrincipal').text(lineaBase.negocio.actividadPrincipal);

        $('#analisisNegocio-problemasNegocio').text(lineaBase.analisisNegocio.problemasNegocio);
        $('#analisisNegocio-registraEntradaSalida').text(lineaBase.analisisNegocio.registraEntradaSalida);
        $('#analisisNegocio-asignaSueldo').text(lineaBase.analisisNegocio.asignaSueldo);
        $('#analisisNegocio-conoceUtilidades').text(lineaBase.analisisNegocio.conoceUtilidades);
        $('#analisisNegocio-competencia').text(lineaBase.analisisNegocio.competencia);
        $('#analisisNegocio-clientesNegocio').text(lineaBase.analisisNegocio.clientesNegocio);
        $('#analisisNegocio-ventajasNegocio').text(lineaBase.analisisNegocio.ventajasNegocio);
        $('#analisisNegocio-porcentajeProductosMayorUtilidad').text(lineaBase.analisisNegocio.porcentajeProductosMayorUtilidad);
        $('#analisisNegocio-ahorro').text(lineaBase.analisisNegocio.ahorro);
        $('#analisisNegocio-conocePuntoEquilibrio').text(lineaBase.analisisNegocio.conocePuntoEquilibrio);
        $('#analisisNegocio-separaGastos').text(lineaBase.analisisNegocio.separaGastos);
        $('#analisisNegocio-elaboraPresupuesto').text(lineaBase.analisisNegocio.elaboraPresupuesto);

        $('#analisisNegocio-listaEmpleoGanancias').append(construirLista(lineaBase.analisisNegocio.listaEmpleoGanancias));
        $('#analisisNegocio-listaEstrategiaVentas').append(construirLista(lineaBase.analisisNegocio.listaEstrategiaVentas));


    } else {
        $("#infoNegocio").prop("hidden", true);
        $("#msgNoNegocio").prop("hidden", false);

    }
}