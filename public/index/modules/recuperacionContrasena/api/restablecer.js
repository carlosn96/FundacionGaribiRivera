$(document).ready(function () {
    $('#enviarToken').submit(function (event) {
        event.preventDefault();
        var contrasena = $('#contrasena').val();
        var confirmarContrasena = $('#confirmar_contrasena').val();

        // Verificar si los campos de contraseña y confirmar contraseña no están vacíos
        if (contrasena.trim() === '' || confirmarContrasena.trim() === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor ingresa una contraseña y confírmala'
            });
            return;
        }

        // Verificar si las contraseñas coinciden
        if (contrasena !== confirmarContrasena) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las contraseñas no coinciden'
            });
            return;
        }

        // Enviar la solicitud AJAX
        $.ajax({
            type: 'POST',
            url: 'api/RecuperarCuentaAPI.php',
            dataType: 'json',
            data: {
                case: "restablecerContrasenia",
                data: "contrasena=" + contrasena + "&confirmar_contrasena=" + confirmarContrasena
            },
            success: function (response) {
                if (response.es_valor_error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.mensaje
                    });
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: response.mensaje,
                        showConfirmButton: false,
                        timer: 2000
                    }).then(function () {
                        window.location.href = '../inicio'; // Cambiar a la página correspondiente
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error('Error en la solicitud:', xhr.responseText);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al procesar la solicitud'
                });
            }
        });
    });
});