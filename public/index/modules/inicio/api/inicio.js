function ready() {
    $(document).ready(function () {
        $('#loginForm').submit(function (event) {
            event.preventDefault();
            var correo = $('#correo').val();
            var contrasena = $('#contrasena').val();
            $('#buttonText').addClass('visually-hidden');
            $('#spinner').removeClass('d-none');
            crearPeticion('api/IndexAPI.php', {
                case: 'iniciarSesion',
                data: "correo=" + correo + "&contrasena=" + contrasena
            }, function (response) {
                $('#buttonText').removeClass('visually-hidden');
                $('#spinner').addClass('d-none');
                if (response.es_valor_error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Inicio de sesión fallido',
                        text: response.mensaje,
                        showConfirmButton: false,
                        timer: 3000
                    });
                } else {
                    refresh();
                }
            }, function (xhr, status, error) {
                console.log(xhr);
                console.error('Error en la solicitud:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error en la solicitud',
                    text: 'Hubo un problema al procesar la respuesta del servidor. Inténtalo de nuevo más tarde.'
                }).then(refresh);
            }
            , "text");
        });

    });
}