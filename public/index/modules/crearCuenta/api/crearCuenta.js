
$(document).ready(function () {
    'use strict';
    const urlAPI = 'api/CrearCuentaAPI.php';

    $('#correo').on('change', function () {
        const correoInput = $(this);
        console.log(correoInput.val());
        crearPeticion(urlAPI, {case: "revisarExisteCorreo", data: "correo=" + correoInput.val()}, function (res) {
            console.log(res);
            $("#submitBtn").prop("disabled", res.existeCorreo);
            if (res.existeCorreo) {
                correoInput.addClass('is-invalid');
                correoInput.removeClass('is-valid');

            } else {
                correoInput.removeClass('is-invalid');
                correoInput.addClass('is-valid');
            }
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
                crearPeticion(
                        urlAPI,
                        {case: "preregistro", data: form.serialize()},
                        function (response) {
                            $('#spinner').addClass('d-none');
                            if (response.success) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Se envió un código de verificación al correo ingresado!',
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
