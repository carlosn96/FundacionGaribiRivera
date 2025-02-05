var urlAction = "action/myProfile.php";

$(document).ready(function () {
    $("#genero").val($("#generoSelect").val());
    $("#telefono").on("change", separarDigitos);
    $("#fotografia").on("change", function (e) {
        $("#fotografiaLabel").html($(this).val());
        $("#profile-picture").attr("src", URL.createObjectURL(e.target.files[0]));
    });
    $("#formPerfil").submit(function (e) {
        e.preventDefault();
        var form = new FormData(this);
        fetch(document.getElementById('profile-picture').src).then(res => res.blob()).then(blob => {
            var foto = new File([blob], "fotografia", blob);
            form.append("fotografia", foto, foto.name);
            form.append("case", "actualizar");
            form.append("tipoUsuario", "2");
            $.ajax({
                url: urlAction,
                processData: false,
                contentType: false,
                type: 'POST',
                dataTyte: 'json',
                data: form,
                enctype: 'multipart/form-data',
                success: mostrarMensajeResultado/*print */
            });
        });
    });
    $("#formContraseña").submit(function (e) {
        e.preventDefault();
        crearPeticion(urlAction, $(this).serialize() + "&case=contrasenia");
    });
});