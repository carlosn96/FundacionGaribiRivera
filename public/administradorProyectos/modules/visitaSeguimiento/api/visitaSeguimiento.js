const urlAPI = "api/VisitaSeguimientoAPI.php";

function ready() {
    crearPeticion(urlAPI, {case: "recuperarEmprendedores"}, function (res) {
        print(res);
        var data = [];
        $.each(res, (i, emprendedor) => {
            let idUsuario = emprendedor.idUsuario;
            data.push({
                "Nombre": emprendedor.nombre + " " + emprendedor.apellidos,
                "Nuevo": crearBoton("", "btn btn-outline-success", "fas fa-plus", idUsuario, "visita" + idUsuario, "crearVisitaSeguimiento(this)"),
                "Consultar": crearFormAdmVisitasSeguimiento(emprendedor.visitasSeguimiento)
            });
        });

        construirTablaDataTable(data,
                "table table-borderless align-middle text-nowrap mb-1",
                "container",
                "tablaEmprendedores");
    });

}


function crearVisitaSeguimiento(boton) {
    redireccionar("../visitaSeguimientoNuevo/?idEmprendedor=" + boton.value);
}

function crearFormAdmVisitasSeguimiento(lista) {
    // Crear el formulario con su acción
    var $form = $("<form>", {action: "../trabajoSocialVisitaSeguimiento/function/consultaVisitaSeguimiento.php"});

    var $row = $("<div>", {class: "row g-2"});
    var $col = $("<div>", {class: "col-12"});
    // Crear el grupo de entrada
    var $inputGroup = $("<div>", {class: "input-group"})
            .append(crearSelector(null, "visitaSeguimiento", lista))
            .append($("<div>", {class: "input-group-append"})
                    .append($("<button>", {
                        type: "submit",
                        class: "btn btn-outline-warning",
                        html: $("<i>", {class: "ti ti-download"})
                    }))
                    .append($("<button>", {
                        type: "button",
                        class: "btn btn-outline-danger",
                        click: eliminarVisita, // Asignar el evento click
                        html: $("<i>", {class: "fas fa-trash-alt"})
                    }))
                    );
    $col.append($inputGroup);
    $row.append($col);
    $form.append($row);
    return $form;
}


function eliminarVisita() {
    var id = $("#idVisitaSeguimiento").val();
    if (id) {
        crearPeticion(urlAPI, {"case": "eliminarVisita", "idVisita": id});
    } else {
        mostrarMensajeAdvertencia("¡Elige el elemento a eliminar!", false);
    }
}