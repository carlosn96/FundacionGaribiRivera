const urlAPI = "api/ConfigurarPerfilAPI.php";

var idEmprendedor = null;

function ready() {
    const urlParams = new URLSearchParams(window.location.search);
    idEmprendedor = urlParams.get('id');
    if (idEmprendedor == null) {
        $('#container').html('<div class="alert alert-danger" role="alert"><strong>Error:</strong> No se ha especificado un ID de emprendedor.</div>')
        return;
    }

    // Cargar datos del emprendedor para poblar el formulario
    crearPeticion(urlAPI, { case: 'getEmprendedor', data: $.param({ id: idEmprendedor }) }, function (respuesta) {
        //print(respuesta);
        if (respuesta.data && !Array.isArray(respuesta.data)) {
            const emprendedor = respuesta.data;
            ajustarCampos(emprendedor);
            fijarSubmitFormulario("#configuracionForm", urlAPI, "actualizarContrasenia", validarConstrasenias);
        } else {
            const mensaje = respuesta.message || 'No se pudo cargar la información del emprendedor.';
            $('#container').html(`<div class="alert alert-danger" role="alert"><strong>Error:</strong> ${mensaje}</div>`);
        }
    });
}

function ajustarCampos(usuario) {
    $('#idEmprendedor').val(idEmprendedor);
    $('#profileName').text(`${usuario.nombre} ${usuario.apellidos}`);
    $('#profileEmail').val(usuario.correo_electronico);
    $('#numero_celular').val(usuario.numero_celular);
    $('#nombre').val(usuario.nombre);
    $('#apellidos').val(usuario.apellidos);
    ajustarImagenPerfil(usuario);

    $('#btnEstandarizarNombre').on('click', function () {
        estandarizarCampo('nombre');
    });

    $('#btnEstandarizarApellidos').on('click', function () {
        estandarizarCampo('apellidos');
    });

    $('#btnEstandarizarAmbos').on('click', estandarizarAmbosCampos);

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
                    data: $.param({
                        "img": imgData,
                        id: idEmprendedor
                    })
                });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    });
}


function actualizarCampo() {
    let $spinner = $("<div>", { class: "spinner-border spinner-border-sm", role: "status" });
    let $btn = $(this);
    let input = $btn.attr("aria-controls");
    $btn.find("i").detach();
    $btn.append($spinner);
    crearPeticion(urlAPI, {
        case: "actualizarCampo",
        data: $.param({ id: idEmprendedor, text: $("#" + input).val(), input: input })
    });
}

function estandarizarCampo(nombreCampo) {
    const input = $(`#${nombreCampo}`);
    const valorActual = input.val();
    if (!valorActual) {
        mostrarMensajeAdvertencia("Campo vacío, nada que estandarizar.", false);
        return;
    }
    const boton = $(`#btnEstandarizar${nombreCampo.charAt(0).toUpperCase() + nombreCampo.slice(1)}`);
    const contenidoOriginal = boton.html();
    const spinner = '<div class="spinner-grow spinner-grow-sm" role="status"><span class="visually-hidden">Loading...</span></div>';
    boton.html(spinner);
    boton.prop('disabled', true);
    crearPeticion(urlAPI, {
        case: 'estandarizarTexto',
        data: $.param({ texto: valorActual })
    }, function (respuesta) {
        if (respuesta && respuesta.nombre) {
            input.val(respuesta.nombre);
        } else {
            mostrarMensajeError("Error al estandarizar", false);
        }
        boton.html(contenidoOriginal);
        boton.prop('disabled', false);
    });
}

function estandarizarAmbosCampos() {
    const nombreInput = $('#nombre');
    const apellidosInput = $('#apellidos');
    const nombreActual = nombreInput.val();
    const apellidosActual = apellidosInput.val();

    if (!nombreActual && !apellidosActual) {
        if (typeof mostrarMensajeAdvertencia === 'function') {
            mostrarMensajeAdvertencia("Ambos campos están vacíos.", false);
        }
        return;
    }

    const boton = $('#btnEstandarizarAmbos');
    const contenidoOriginal = boton.html();
    const spinner = '<div class="spinner-border spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></div>';

    boton.html(spinner);
    boton.prop('disabled', true);

    crearPeticion(urlAPI, {
        case: 'estandarizarNombreCompleto',
        data: $.param({
            id: idEmprendedor
        })
    }, function (respuesta) {
        if (respuesta && !respuesta.es_resultado_error) {
            mostrarMensajeOk("Campos estandarizados.");
        } else {
            mostrarMensajeError("Error al estandarizar.", false);
            boton.html(contenidoOriginal);
            boton.prop('disabled', false);
        }
    });
}