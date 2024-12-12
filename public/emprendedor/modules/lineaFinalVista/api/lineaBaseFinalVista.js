
const urlAPI = "api/lineaBaseFinalVistaAPI.php";

function ready() {
    var $seccionContent = $("#contenido");
    bloquearSeccion($seccionContent);
    crearPeticion(urlAPI, {case: "recuperarCamposInformacion"}, (rs) => {
        // print(rs);
        if (rs.existeLineaBase) {
            completarCamposFormulario(rs.data);
            desbloquearSeccion($seccionContent);
        } else {
            redireccionar("../lineaFinal");
        }
    });
}

function completarCamposFormulario(data) {
    print(data);
    let socioeconomico = data.socioeconomico;
    let negocio = data.negocio;
    let direccionNegocio = "Direccion";
    let analisisNegocio = data.analisisNegocio;
    let administracionIngresos = data.administracionIngresos;
    /* Asignar datos de la etapa
     $("#etapaNombre").text(data.etapa.nombre);
     $("#etapaTipo").text(data.etapa.tipo);*/

    // Asignar datos socioeconómicos
    $("#ocupacionActual").text(socioeconomico.ocupacionActual.descripcion);
    $("#ingresoMensual").text(socioeconomico.ingresoMensual.descripcion);

    // Asignar datos del negocio
    $("#nombreNegocio").text(negocio.nombre);
    $("#telefonoNegocio").text(negocio.telefono);
    $("#direccionNegocio").text(direccionNegocio);
    $("#giroNegocio").text(negocio.giro.descripcion);
    $("#actividadNegocio").text(negocio.actividad.descripcion);

    // Asignar datos del análisis del negocio
    $("#problemasNegocio").text(analisisNegocio.problemasNegocio);
    $("#clientesNegocio").text(analisisNegocio.clientesNegocio);
    $("#ventajasNegocio").text(analisisNegocio.ventajasNegocio);

    // Asignar datos de administración de ingresos
    $("#ventasMensuales").text(administracionIngresos.montoMensualVentas);
    $("#gastosMensuales").text(administracionIngresos.montoMensualEgresos);
    $("#utilidadesMensuales").text(administracionIngresos.montoMensualUtilidades);
    $("#sueldoMensual").text(administracionIngresos.sueldoMensual);

}