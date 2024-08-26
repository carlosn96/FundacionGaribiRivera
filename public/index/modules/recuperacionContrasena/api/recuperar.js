$(document).ready(function () {
    $('#formEnviarCorreo').submit(function (event) {
        event.preventDefault();
        var correoElectronico = $('#correo_electronico').val();
        console.log("Correo electrónico enviado: ", correoElectronico);
        $('#spinner').removeClass('d-none');
        $.ajax({
            type: 'POST',
            url: 'api/RecuperarCuentaAPI.php',
            dataType: 'json',
            data: {case: "recuperarCuenta", data: "correo_electronico=" + correoElectronico},
            success: function (response) {
                console.log("Respuesta del servidor: ", response);
                $('#spinner').addClass('d-none');
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
                        window.location.href = 'validacion.php';
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
