const urlAPI = "api/ConfigurarPerfilAPI.php";

function ready() {
    ajustarCampos();
    fijarSubmitFormulario("#configuracionForm", urlAPI, "actualizarContrasenia", validarConstrasenias);
}

function ajustarCampos() {
    crearPeticion(urlAPI, {case: "recuperarInfoUsuario"}, function (res) {
        let usuario = res;
        $('#profileName').text(`${usuario.nombre} ${usuario.apellidos}`);
        $('#profileEmail').val(usuario.correo_electronico);
        $('#numero_celular').val(usuario.numero_celular);
        $('#nombre').val(usuario.nombre);
        $('#apellidos').val(usuario.apellidos);
        ajustarImagenPerfil(usuario);
    });

    $('#btnActualizarNombre, #btnActualizarApellidos, #btnActualizarTelefono').click(actualizarCampo);

    $('#correo').change(function () {
        var correo = $(this).val();
        var formatoIncorrecto = correo.includes(' ');
        if (formatoIncorrecto) {
            $(this).addClass('is-invalid');
            $('#correoFeedback').text('El correo no contienen el formato correcto.');
        } else {
            $(this).removeClass('is-invalid').addClass('is-valid');
            $('#correoFeedback').text('');
        }
        $('#btnGuardar').prop('disabled', formatoIncorrecto);
    });
    $('#newPassword, #confirmPassword').change(validarConstrasenias);
}

function validarConstrasenias() {
    let isValid = true;
    const newPassword = $('#newPassword').val().trim();
    const confirmPassword = $('#confirmPassword').val().trim();
    const isNewPasswordEmpty = newPassword === '';
    const isConfirmPasswordEmpty = confirmPassword === '';
    const contraseniasCoinciden = newPassword === confirmPassword;
    if (isNewPasswordEmpty || isConfirmPasswordEmpty) {
        $('#confirmPassword').addClass('is-invalid').removeClass('is-valid');
        $('#confirmPasswordFeedback').text('Este campo es obligatorio.');
        isValid = false;
    }
    if (!contraseniasCoinciden) {
        $('#confirmPassword').addClass('is-invalid').removeClass('is-valid');
        $('#confirmPasswordFeedback').text('Las contraseñas no coinciden.');
        isValid = false;
    } else {
        $('#confirmPassword').removeClass('is-invalid').addClass('is-valid');
        $('#confirmPasswordFeedback').text('');
    }
    $("#configuracionForm").attr("novalidate", !isValid);
    return isValid;
}

function ajustarImagenPerfil(usuario) {
    let $img = $("#imgPerfil");
    let $uploadImage = $('#uploadImage');
    $img.prop("src", $img.prop("src") + usuario.fotografia);
    $img.on("click", function () {
        $uploadImage.click();
    });
    $uploadImage.on('change', function (event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var imgData = e.target.result;
                $img.attr('src', imgData);
                crearPeticion('api/ConfigurarPerfilAPI.php', {
                    case: "actualizarImagen",
                    data: "img=" + imgData
                });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    });
}


function actualizarCampo() {
    let $spinner = $("<div>", {class: "spinner-border spinner-border-sm", role: "status"});
    let $btn = $(this);
    let input = $btn.attr("aria-controls");
    let data = input + "=" + $("#" + input).val();
    $btn.find("i").detach();
    $btn.append($spinner);
    crearPeticion(urlAPI, {case: "actualizarCampo", data: data});
}