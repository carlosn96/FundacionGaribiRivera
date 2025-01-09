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

        if(data.length !== 0) {
            construirTablaDataTable(data,
                "table table-borderless align-middle text-nowrap mb-1",
                "container",
                "tablaEmprendedores", "");
        } else {
            const $tablaVacia = $('<table>', {class: "table table-bordered align-middle text-nowrap mb-1", id: "tablaEmprendedores"});
            const $thead = $('<thead>').append($('<tr>').append($('<th>', {text: "Nombre"})).append($('<th>', {text: "Nuevo"})).append($('<th>', {text: "Consultar"})));
            $tablaVacia.append($thead);
            $("#container").empty().append($tablaVacia);
            crearDataTable("#tablaEmprendedores");
        }
    });

}


function crearVisitaSeguimiento(boton) {
    //redireccionar("../visitaSeguimientoNuevo/?idEmprendedor=" + boton.value);
}

function crearFormAdmVisitasSeguimiento(lista) {
    // Crear el formulario con su acción
    var $form = $("<form>", {action: "../trabajoSocialVisitaSeguimiento/function/consultaVisitaSeguimiento.php"});
    var $row = $("<div>", {class: "row g-3"});  // Aumentamos el espacio entre las filas
    var $col = $("<div>", {class: "col-12"});
    var $inputGroup = $("<div>", {class: "d-flex align-items-center gap-3"})  // Usamos flexbox para una distribución armoniosa
            .append(crearSelector(null, "visitaSeguimiento", lista)) // Selector
            .append($("<div>", {class: "btn-group"})  // Agrupamos los botones en un "btn-group"
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