var urlAction = "action/actualizacionParametros.php";

$(document).ready(function () {
    $("#formCampoNuevo").submit(function (e) {
        e.preventDefault();
        var campo = $("#campo");
        campo.val(campo.val().toUpperCase());
        crearPeticion(urlAction, $(this).serialize() + "&case=inserta");
    });
    crearPeticion(urlAction, {"case": "recuperarCamposFicha"}, function (res) {
        //print(res);
        var options = "";
        $.each(JSON.parse(res), function (name, listaCampos) {
            //print(value)
            var crearInputs = function (array) {
                var html = "";
                var obj = {"name": name};
                array.forEach(function (e) {
                    obj.id = e[0];
                    obj.val = e[1];
                    html += crearCampoActualizable(obj);
                });
                return {"forms": html, "data": obj};
            };
            var campos = crearInputs(listaCampos);
            $("#inputGroup" + name).html(campos.forms);
            options += "<option value='" + name + "'>" + separarPalabras(name) + "</option>";
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
    var input = $("#" + obj.name + obj.id);
    input.val(input.val().toUpperCase());
    crearPeticion(urlAction, {
        "case": "actualizar",
        "tipoCampo": obj.name,
        "idElemento": obj.id,
        "data": input.val()
    }, print);
}

function crearCampoActualizable(obj) {
    return "<div class='input-group'>"
            + "<div class='input-group-prepend'>"
            + crearBotonEliminar(obj)
            + "</div>"
            + "<input id='" + obj.name + obj.id + "' class='form-control' value='" + obj.val + "' onChange='actualizar(" + JSON.stringify(obj) + ")'>"
            + "</div>";
}
