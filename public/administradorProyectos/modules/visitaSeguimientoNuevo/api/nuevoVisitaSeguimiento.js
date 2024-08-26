const urlAPI = "api/NuevoVisitaSeguimientoAPI.php";

function ready() {
    let id = extraerParametrosURL(window.location);
    print(id);
    if (id.idEmprendedor) {
        recuperarCamposInformacion(id.idEmprendedor);
    } else {
        redireccionar("../visitaSeguimiento");
    }
}

function recuperarCamposInformacion(emprendedor) {
    $("#fechaRealizacion").val(getFechaHoraActual());
    crearPeticion(urlAPI, {case: "recuperarCamposInformacion", data: "emprendedor=" + emprendedor}, function (res) {
        //print(res);

        $.each(res.selector, (idx, elementos) => {
            crearSelector($("#" + idx + "List"), idx, elementos);
        });
        $.each(res.checkbox, (idx, elementos) => {
            crearGroupCheckbox($("#" + idx), elementos, idx);
        });
        ajustarEventos();

    });

}


function ajustarEventos() {
    $("#visitaNoRealizada").change(function () {
        $("#resultadoVisitaSeguimiento").prop("disabled", !$(this).prop("checked"));
    });
    $("#visitaNoRealizada").trigger("change");
}