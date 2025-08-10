const urlAPI = "api/LineaBaseModificarAPI.php";

function ready() {
    crearPeticion(urlAPI, { case: 'recuperarInfoLineaBase' }, (res) => {
        $("#tipoLineaBase").text(res.tipo);
        if (res.existeLineaBase) {
            const data = res.data;
            const emprendedor = res.emprendedor;

            $("#fechaCreacion").text(data.fechaCreacion);
            $("#nombreEmprendedor").text(emprendedor.nombre + " " + emprendedor.apellidos);
            $("#perfilEmprendedor").prop("src", "data:image/jpeg;base64," + emprendedor.fotografia);

            if (data.rangos) {
                llenarFormLineaBase(data);
            } else {
                crearMensajeNoNegocio();
            }

            fijarSubmitFormulario("#formActualizarLineaBase", urlAPI, "actualizarLineaBase", () => { return true; });
        }
    });
}

function llenarFormLineaBase(data) {

    const formContainer = $("<form>", { id: "formActualizarLineaBase" }).addClass("card-body");
    // Iterar sobre los rangos
    data.rangos.forEach((rango) => {
        const $selector = crearSelector(null, rango.id, rango.listado);
        const card =
            $("<div>").addClass("mb-4 row align-items-center").append(
                $("<label>").addClass("form-label col-sm-3 col-form-label").text(rango.pregunta),
                $("<div>").addClass("col-sm-9").append(
                    $("<div>").addClass("input-group border rounded-1").append(
                        $("<span>").addClass("input-group-text bg-transparent px-6 border-0").append(
                            $("<i>").addClass("ti ti-arrow-right fs-6")
                        ),
                        $selector
                    )
                )
            );
        formContainer.append(card);
    });

    // Iterar sobre los valores para los inputs de monto
    data.montos.forEach((monto) => {
        const card =
            $("<div>").addClass("mb-4 row align-items-center").append(
                $("<label>").addClass("form-label col-sm-3 col-form-label").text(monto.pregunta),
                $("<div>").addClass("col-sm-9").append(
                    $("<div>").addClass("input-group border rounded-1").append(
                        $("<span>").addClass("input-group-text bg-transparent px-6 border-0").append(
                            $("<i>").addClass("ti ti-currency-dollar fs-6")
                        ),
                        $("<input>").addClass("form-control border-0 ps-2 decimal-inputmask text-end")
                            .attr("id", monto.id)
                            .attr("name", monto.id)
                            .val(Number.parseFloat(monto.val).toFixed(2))
                            .attr("placeholder", "Monto")
                            .attr("inputmode", "decimal")
                            .css("text-align", "right")
                    )
                )
            );
        formContainer.append(card);
    });

    const saveButton = $("<div>").addClass("row").append(
        $("<div>").addClass("col-lg-12"),
        $("<div>").addClass("col-md-12").append( // Asegura que los botones ocupen todo el ancho
            $("<div>").addClass("btn-group w-100").append( // Agrupamos los botones de manera horizontal
                $("<button>").addClass("btn btn-outline-primary w-50 d-flex justify-content-center align-items-center")
                    .text("Guardar cambios")
                    .prepend($("<i>").addClass("ti ti-device-floppy me-2"))  // Icono de guardar
            ).append(
                $("<a>").addClass("btn btn-outline-danger w-50 d-flex justify-content-center align-items-center")
                    .text("Cancelar")
                    .attr("href", "../lineaBaseAdministracion/")
                    .css("text-decoration", "none")
                    .prepend($("<i>").addClass("ti ti-x me-2"))  // Icono de cancelar
            )
        )
    );



    formContainer.append(saveButton);
    const cardContainer = $("<div>").addClass("card w-100").append(formContainer);
    $("#content").append(cardContainer);

    data.rangos.forEach((rango) => {
        $("#" + rango.id).val(rango.val);
    });

    $(".decimal-inputmask").inputmask({
        alias: "decimal",
        radixPoint: "."
    });
}


function crearMensajeNoNegocio() {
    const alert = $("<div>").addClass("alert alert-danger text-primary p-4")
        .attr("role", "alert")
        .append(
            $("<h5>").addClass("text-dark mb-3").html("<strong>Información del negocio no disponible</strong>")
        )
        .append(
            $("<p>").addClass("text-muted").text("Se ha indicado que no cuenta con un negocio.")
        );
    $("#content").append(alert);
}
