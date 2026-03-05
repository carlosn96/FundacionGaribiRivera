
$(document).ready(function () {
    'use strict';
    const urlAPI = 'api/CrearCuentaAPI.php';
    const $form = $('#crearCuentaForm');
    const $btnEnviar = $('#submitBtn');
    let correoValido = false;

    // ── Central: habilitar/deshabilitar botón según validez del formulario ──
    function validarFormulario() {
        const camposNativosValidos = $form[0].checkValidity();
        $btnEnviar.prop('disabled', !(camposNativosValidos && correoValido));
    }

    // Escuchar cambios en TODOS los campos para revalidar en tiempo real
    $form.on('input change', 'input, select, textarea', function () {
        validarFormulario();
    });

    // ── Validación específica del correo (regex + existencia en BD) ──
    $('#correo').on('change', function () {
        const $input = $(this);
        const value = $input.val();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        function actualizarEstado(isValid) {
            correoValido = isValid;
            $input.toggleClass('is-invalid', !isValid);
            $input.toggleClass('is-valid', isValid);
            validarFormulario();
        }

        if (!emailRegex.test(value)) {
            actualizarEstado(false);
            return;
        }

        crearPeticion(urlAPI, { case: "revisarExisteCorreo", data: "correo=" + value }, function (res) {
            actualizarEstado(!res.existeCorreo);
        });
    });

    // ── Submit ──
    $form.on('submit', function (event) {
        event.preventDefault();
        if ($form[0].checkValidity() === false || !correoValido) {
            event.stopPropagation();
            $form.addClass('was-validated');
            return;
        }

        $('#spinner').removeClass('d-none');
        $btnEnviar.prop('disabled', true);

        crearPeticion(
            urlAPI,
            { case: "preregistro", data: $form.serialize() },
            function (response) {
                $('#spinner').addClass('d-none');
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        text: 'Se envió un código de verificación al correo ingresado!',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(function () {
                        redireccionar("validacion.php");
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error en el registro',
                        text: 'Hubo un problema al registrar la cuenta. Por favor, inténtalo de nuevo más tarde.',
                        showConfirmButton: false,
                        timer: 3000
                    });
                    $btnEnviar.prop('disabled', false);
                }
            },
            function (xhr, status, error) {
                console.error('Error en la solicitud:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error en la solicitud',
                    text: 'Hubo un problema al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.'
                });
            }
        );
    });
});
