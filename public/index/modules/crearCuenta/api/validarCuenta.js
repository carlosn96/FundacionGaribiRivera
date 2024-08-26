$(document).ready(function () {
    // Captura el evento clic del botón 'submitBtn'
    $('#formValidarCuenta').submit(function (event) {
        event.preventDefault();
        crearPeticion(
                'api/CrearCuentaAPI.php',
                {case: "registrarNuevaCuenta", data: "codigo=" + $(this).serializeArray().map((i) => {
                        return i.value;
                    }).join('')},
                function (response) {
                    if (response.success) {
                        // Si la respuesta indica éxito, muestra un mensaje de éxito
                        Swal.fire({
                            icon: 'success',
                            title: response.mensaje,
                            showConfirmButton: false,
                            timer: 2000
                        }).then(function () {
                            redireccionar("../");
                        });
                    } else {
                        // Si la respuesta indica un error, muestra un mensaje de error
                        Swal.fire({
                            icon: 'error',
                            title: 'Error en el registro',
                            text: response.mensaje,
                            showConfirmButton: false,
                            timer: 3000
                        });
                    }
                },
                function (xhr, status, error) {
                    // Maneja los errores de la solicitud AJAX
                    console.error('Error en la solicitud:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error en la solicitud',
                        text: 'Hubo un problema al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.'
                    });
                }
        );
    });
    const inputs = $('input[type="text"]');

    inputs.on('input', function () {
        const index = inputs.index(this);
        if (this.value.length === 1) {
            if (index < inputs.length - 1) {
                inputs.eq(index + 1).val('').focus();
            } else {
                $(this).closest('form').submit();
            }
        }
    });

    inputs.on('keydown', function (e) {
        const index = inputs.index(this);
        if (e.key === 'Backspace') {
            if (this.value.length === 0 && index > 0) {
                inputs.eq(index - 1).focus().val('');
            }
        }
    });
});


function reenviarCodigo() {
    var $reenviarCod = $("#reenviarCodigo");
    $reenviarCod.prop("hidden", true);
    crearPeticion( 'api/CrearCuentaAPI.php', {case: "reenviarCodigoCrearCuenta"},
            function (response) {
                if (response.success) {
                    refresh();
                } else {
                    print("codigo no enviado");
                }
            },
            function (xhr, status, error) {
                // Maneja los errores de la solicitud AJAX
                console.error('Error en la solicitud:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error en la solicitud',
                    text: 'Hubo un problema al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.'
                });
            }
    );
}