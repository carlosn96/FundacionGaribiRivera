document.addEventListener('DOMContentLoaded', function () {
    $('#formValidarCodigo').submit(function (event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'api/RecuperarCuentaAPI.php',
            dataType: 'json',
            data: {case: "validarCodigoSeguridad", data: "codigo=" + $(this).serializeArray().map((i) => {
                    return i.value;
                }).join('')},
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
                        window.location.href = 'restablecer.php';
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error('Error en la solicitud:', xhr.responseText);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al procesar la solicitud '
                });
            }
        });
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
