const urlAPI = "api/LineaBaseModificarAPI.php";

function ready() {
    crearPeticion(urlAPI, { case: 'recuperarInfoLineaBase' }, (res) => {
        $("#lb-loader").hide();
        $("#modificar-module").fadeIn(500);

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

    const formContainer = $("<form>", { id: "formActualizarLineaBase" });
    const cardContainer = $("<div>").addClass("card border-0 shadow-sm rounded-4 bg-white mb-5").append(formContainer);
    
    // Header interno del form
    const formHeader = $("<div>").addClass("card-header bg-transparent border-bottom px-4 px-md-5 py-4 d-flex align-items-center gap-3").append(
        $("<div>").addClass("d-flex align-items-center justify-content-center rounded-3 bg-light text-primary").css({ width: '48px', height: '48px' }).append($("<i>").addClass("ti ti-edit fs-4")),
        $("<h5>").addClass("fw-bold text-dark mb-0").text("Modificar Valores Financieros")
    );
    formContainer.append(formHeader);

    const formBody = $("<div>").addClass("card-body px-4 px-md-5 py-4 py-md-5");

    // Iterar sobre los rangos
    data.rangos.forEach((rango) => {
        const $selector = crearSelector(null, rango.id, rango.listado);
        $selector.addClass("form-select input-soft border-light-subtle shadow-none text-dark fw-medium");
        
        const card =
            $("<div>").addClass("mb-4 row align-items-center").append(
                $("<label>").addClass("form-label col-sm-5 col-xl-4 col-form-label text-muted fw-bold text-uppercase").css({fontSize: '0.8rem', letterSpacing: '0.03em'}).text(rango.pregunta),
                $("<div>").addClass("col-sm-7 col-xl-8").append(
                    $("<div>").addClass("input-group rounded-3 overflow-hidden shadow-sm border border-light-subtle").append(
                        $("<span>").addClass("input-group-text bg-light text-primary border-0 pe-3").append(
                            $("<i>").addClass("ti ti-list fs-5")
                        ),
                        $selector
                    )
                )
            );
        formBody.append(card);
    });

    // Iterar sobre los valores para los inputs de monto
    data.montos.forEach((monto) => {
        const card =
            $("<div>").addClass("mb-4 row align-items-center").append(
                $("<label>").addClass("form-label col-sm-5 col-xl-4 col-form-label text-muted fw-bold text-uppercase").css({fontSize: '0.8rem', letterSpacing: '0.03em'}).text(monto.pregunta),
                $("<div>").addClass("col-sm-7 col-xl-8").append(
                    $("<div>").addClass("input-group rounded-3 overflow-hidden shadow-sm border border-light-subtle").append(
                        $("<span>").addClass("input-group-text bg-light text-success border-0 pe-3").append(
                            $("<i>").addClass("ti ti-currency-dollar fs-5")
                        ),
                        $("<input>").addClass("form-control input-soft border-0 ps-2 decimal-inputmask text-end fw-medium fs-6 shadow-none")
                            .attr("id", monto.id)
                            .attr("name", monto.id)
                            .val(Number.parseFloat(monto.val).toFixed(2))
                            .attr("placeholder", "0.00")
                            .attr("inputmode", "decimal")
                            .css("text-align", "right")
                    )
                )
            );
        formBody.append(card);
    });

    formContainer.append(formBody);

    const formFooter = $("<div>").addClass("card-footer bg-transparent border-top px-4 px-md-5 py-4");
    const saveButton = $("<div>").addClass("row justify-content-end").append(
        $("<div>").addClass("col-md-8 col-lg-6").append( 
            $("<div>").addClass("d-flex gap-3").append( 
                $("<a>").addClass("btn btn-light text-dark fw-medium w-50 d-flex justify-content-center align-items-center hover-lift")
                    .text("Cancelar")
                    .attr("href", "../lineaBaseAdministracion/")
                    .css("text-decoration", "none")
                    .prepend($("<i>").addClass("ti ti-x fs-5 me-2")),
                $("<button>").addClass("btn btn-primary fw-medium w-50 d-flex justify-content-center align-items-center hover-lift shadow-sm")
                    .text("Guardar")
                    .prepend($("<i>").addClass("ti ti-device-floppy fs-5 me-2"))
            )
        )
    );

    formFooter.append(saveButton);
    formContainer.append(formFooter);
    
    $("#form-container-wrapper").empty().append(cardContainer);

    data.rangos.forEach((rango) => {
        $("#" + rango.id).val(rango.val);
    });

    $(".decimal-inputmask").inputmask({
        alias: "decimal",
        radixPoint: ".",
        groupSeparator: ",",
        autoGroup: true,
        digits: 2,
        digitsOptional: false,
        placeholder: "0"
    });
}


function crearMensajeNoNegocio() {
    const alert = $("<div>").addClass("alert border-0 shadow-sm bg-white rounded-4 p-5 text-center mt-5")
        .attr("role", "alert")
        .append(
            $("<i>").addClass("ti ti-alert-circle text-warning mb-3 d-block").css("font-size", "4rem")
        )
        .append(
            $("<h5>").addClass("text-dark fw-bold mb-3").text("Información del negocio no disponible")
        )
        .append(
            $("<p>").addClass("text-muted mb-0").text("Se ha indicado que el emprendedor no cuenta actualmente con un negocio.")
        );
    $("#form-container-wrapper").empty().append(alert);
}
