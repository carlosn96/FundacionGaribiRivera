var urlAction = "action/perfil.php";
var caso = $("#idUsuario").val().length ? "actualizar" : "agregarNuevo";
$(document).ready(function () {
    $("#telefono").on("change", separarDigitos);
    $("#fotografia").on("change", function (e) {
        $("#fotografiaLabel").html($(this).val());
        $("#profile-picture").attr("src", URL.createObjectURL(e.target.files[0]));
    });
    var id = $("#idUsuario").val();
    var caso = id.length ? "actualizar" : "agregarNuevo";
    if (caso === "actualizar") {
        recuperarInfoUsuario(id);
    }

    $("#formPerfil").submit(function (e) {
        e.preventDefault();
        var form = new FormData(this);
        fetch(document.getElementById('profile-picture').src).then(res => res.blob()).then(blob => {
            var foto = new File([blob], "fotografia", blob);
            form.append("fotografia", foto, foto.name);
            form.append("case", caso);
            $.ajax({
                url: urlAction,
                processData: false,
                contentType: false,
                type: 'POST',
                dataTyte: 'json',
                data: form,
                enctype: 'multipart/form-data',
                success: mostrarMensajeResultado /*print*/
            });
        });
    });

});


function recuperarInfoUsuario(idUsuario) {
    crearPeticion(urlAction, {"case": "recuperarInfo", "idUsuario": idUsuario}, function (res) {
        //print(res);
        var asistente = JSON.parse(res);
        $("#idAccesoUsuario").val(asistente.identificadorAcceso);
        $("#profile-picture").attr("src", asistente.fotografia);
        $("#tipoUsuario").val(asistente.tipoUsuario);
        $("#nombre").val(asistente.nombre);
        $("#apellidoPaterno").val(asistente.apellidoPaterno);
        $("#correoElectronico").val(asistente.correoElectronico);
        $("#contrasenia").val(asistente.contrasenia);
        $("#tabContrasenia").attr("hidden", true);
        $("#fechaNacimiento").val(asistente.fechaNacimiento);
        $("#genero").val(asistente.genero);
        $("#telefono").val(asistente.telefonoMovil);
    });
}