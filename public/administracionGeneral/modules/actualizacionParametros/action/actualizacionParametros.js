var urlAction = "action/actualizacionParametros.php";

$(document).ready(function () {
    $("#formCampoNuevo").submit(function (e) {
        e.preventDefault();
        var campo = $("#campo");
        campo.val(campo.val().toUpperCase());
        crearPeticion(urlAction, $(this).serialize() + "&case=inserta");
    });

    crearPeticion(urlAction, {"case": "recuperarCamposFicha"}, function (res) {
        var options = "";
        $.each(JSON.parse(res), function (name, listaCampos) {
//            print(name);
//            print(listaCampos);
            var campoEditar = separarPalabras(name);
            options += "<option value='" + name + "'>" + campoEditar + "</option>";
            $("#inputGroup" + name).html(listaCampos);
            var obj = {"name": name};
            $("#" + name).change(function () {
                var selected = $("#" + name + " option:selected");
                var text = selected.html();
                var id = selected.val();
                $("#campoEditar").val(text);
                $("#title").html("Editar Campo: "+campoEditar);
                obj.id = id;
                obj.val = text;
                $("#formActualizarCampo").submit(function (e) {
                    e.preventDefault();
                    actualizar(obj);
                });
                $("#btnEliminarCampo").click(function () {
                    eliminarRegistro(obj);
                });
                $("#modalEditarCampo").modal('show');
            });
        });
        $("#campoNuevoSelect").append(options);
    });
});


function crearBotonEliminar(obj) {
    var id = obj.name + obj.id;
    return crearBoton(
            "",
            "btn btn-danger btn-icon",
            "fas fa-trash-alt",
            id, "btnEliminar" + id, "eliminarRegistro(" + JSON.stringify(obj) + ")");
}

function eliminarRegistro(obj) {
    mostrarAlertaOpciones("Se eliminará '" + obj.val + "' de " + separarPalabras(obj.name), function () {
        crearPeticion(urlAction, {
            "case": "eliminar",
            "tipoCampo": obj.name,
            "idElemento": obj.id
        });
    });
}

function actualizar(obj) {
    var input = $("#campoEditar");
    input.val(input.val().toUpperCase());
    crearPeticion(urlAction, {
        "case": "actualizar",
        "tipoCampo": obj.name,
        "idElemento": obj.id,
        "data": input.val()
    });
}

function crearCampoActualizable(obj) {
    return "<div class='input-group'>"
            + "<div class='input-group-prepend'>"
            + crearBotonEliminar(obj)
            + "</div>"
            + "<input id='" + obj.name + obj.id + "' class='form-control' value='" + obj.val + "' onChange='actualizar(" + JSON.stringify(obj) + ")'>"
            + "</div>";
}
