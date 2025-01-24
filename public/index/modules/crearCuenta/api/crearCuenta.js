
$(document).ready(function () {
    'use strict';
    const urlAPI = 'api/CrearCuentaAPI.php';

    $("#correo").change(function () {
        const $input = $(this);
        const value = $input.val();
        const $btnEnviar = $("#submitBtn");
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        function actualizarEstado(isValid, isDisabled) {
            $input.toggleClass('is-invalid', !isValid);
            $input.toggleClass('is-valid', isValid);
            $btnEnviar.prop("disabled", isDisabled);
        }
        if (!emailRegex.test(value)) {
            actualizarEstado(false, true);
            return;
        }
        crearPeticion(urlAPI, {case: "revisarExisteCorreo", data: "correo=" + value}, function (res) {
            const isValid = !res.existeCorreo;
            actualizarEstado(isValid, !isValid);
        });
    });

    $('.needs-validation').each(function () {
        var form = $(this);
        form.on('submit', function (event) {
            event.preventDefault();
            if (form[0].checkValidity() === false) {
                event.stopPropagation();
                form.addClass('was-validated');
            } else {
                $('#spinner').removeClass('d-none');
                $("#submitBtn").prop("disabled", true);
                crearPeticion(
                        urlAPI,
                        {case: "preregistro", data: form.serialize()},
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
                                $("#submitBtn").prop("disabled", false);
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
            }
        });
    });
});
