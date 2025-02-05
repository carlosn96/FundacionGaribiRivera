var urlAction = "action/informacionGeneral.php";

$(document).ready(function () {
    $("#formModalModificarTupla").submit(modificarTupla);

    crearPeticion(urlAction, {"case": "recuperarInfo"}, function (res) {
        //print(res);
        //print(JSON.parse(res));
        $.each(JSON.parse(res), function (idx, values) {
            var html = "";
            $.each(values, function (id, values) {
                html += "<tr>";
                $.each(values, function (i, v) {
                    if (i !== "id") {
                        html += crearColumnaTabla(v);
                    } else {
                        html += crearColumnaTabla(crearBotonesAccion(idx, v));
                    }
                });
                html += "</tr>";
            });
            $("#bodyTabla" + idx.charAt(0).toUpperCase() + idx.slice(1)).html(html);
        });
    });
});


function agregarFilaCuenta(boton) {
    crearFilas("Cuentas", [["numero_cuenta", "Número de Cuenta"], ["institucion_bancaria", "Institución Bancaria"]], boton);
}

function agregarFilaCorreo(boton) {
    crearFilas("Correos", [["correo", "Correo electrónico"]], boton);
}

function agregarFilaNumTelefono(boton) {
    crearFilas("NumTelefonos", [["numero_telefono", "Número de Teléfono"]], boton);
}

function agregarFilaClausula(boton) {
    crearFilas("Clausulas", [["clausula", "Nueva clausula"]], boton);
}

function crearFilas(idxBodyTabla, cols, btn) {
    var data = {"cols": cols, "tabla": idxBodyTabla};
    var html = "<tr>";
    html += crearColumnaTabla(crearBotonIcon("", "btn btn-icon btn-round btn-outline-success", "fas fa-save", "", "btnActualizar", "guardarTupla(" + JSON.stringify(data) + ")"));
    cols.forEach(function (value) {
        html += crearColumnaTabla(crearInput(value[0], value[1]));
    });
    html += "</tr>";
    $("#tabla" + idxBodyTabla + " > tbody").append(html);
    btn.disabled = true;
}

function crearInput(id, placeholder) {
    return  "<div class='form-group form-group-default'>" +
            "<input id='" + id + "' name='" + id + "' class='form-control' placeholder='" + placeholder + "'>" +
            "</div>";
}

function crearBotonesAccion(tipo, id) {
    const opcionesEliminar = {
        "mensajeAlerta": "El registro ya no estará disponible",
        "url": urlAction,
        "data": {"tipoRegistro": tipo, "id": id, "case": "eliminar"}
    };
    var btnModal = "<button type='button' class='dropdown-item' onclick='abrirModalTupla(" + JSON.stringify({"tipo": tipo, "id": id}) + ")'><i class='fas fa-pencil-alt'></i> Modificar</button>";
    const btnsMenuEditar = [
        {"button": true, "modal": btnModal},
        {"url": "javascript:alertaEliminar(" + JSON.stringify(opcionesEliminar) + ")", "titulo": "<i class='far fa-trash-alt'></i> Borrar registro"}
    ];
    return crearBotonMenuDesplegable("Editar", btnsMenuEditar, "success");
}

function guardarTupla(cols) {
    var data = [];
    var input;
    var campoVacio;
    for (var i = 0, len = cols.cols.length; i < len; i++) {
        input = $("#" + cols.cols[i][0]).val();
        if ((campoVacio = input.length === 0)) {
            break;
        } else {
            data.push(cols.cols[i][0] + "|" + input);
        }
    }
    if (campoVacio) {
        mostrarMensajeError("¡Campo vacio!");
    } else {
        cols.data = data;
        cols.case = "guardarTupla";
        crearPeticion(urlAction, cols);
    }
}


function modificarTupla(form) {
    form.preventDefault();
    crearPeticion(urlAction, {"case": "actualizarCampoInfoGeneral", "data": $(this).serialize()});
}

function abrirModalTupla(data) {
    crearPeticion(urlAction, {"case": "recuperarInfoCampo", "data": data}, function (res) {
        var htmlForm = "";
        var info = JSON.parse(res);
        var name = data.tipo + info.id;
        var inputid = "<input hidden id='" + info.id + "' value='" + info.id + "' name='id'>" +
                "<input hidden id='tipoRegistro' value='" + data.tipo + "' name='tipoRegistro'>";
        delete info.id;
        $.each(info, function (idx, v) {
            htmlForm += "<div class='form-group'>" +
                    "<textarea rows='5' id='" + idx + "' name='" + idx + "' class='form-control mx-sm-' required>" + v + "</textarea>" +
                    "</div>";
        });
        $("#modalModificarCampoBody").html(inputid + htmlForm);
        $("#modalModificarCampo").modal("show");
    });
}
