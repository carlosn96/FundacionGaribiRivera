

function ready() {

    // Toggle password
    $('#togglePassword').on('click', function (e) {
        e.preventDefault();
        const passwordInput = $('#contrasena');
        const eyeIcon = $('#eyeIcon');
        const isPassword = passwordInput.attr('type') === 'password';

        passwordInput.attr('type', isPassword ? 'text' : 'password');
        eyeIcon.toggleClass('fa-eye fa-eye-slash');
        $(this).attr('aria-label', isPassword ? 'Ocultar contraseña' : 'Mostrar contraseña');
    });

    // Enhanced focus states
    $('.input-group .form-control').on('focus', function () {
        $(this).closest('.input-group').addClass('shadow-sm');
        $(this).closest('.input-group').find('.input-group-text, .btn').css('border-color', '#ffc107');
    }).on('blur', function () {
        $(this).closest('.input-group').removeClass('shadow-sm');
        $(this).closest('.input-group').find('.input-group-text, .btn').css('border-color', '');
    });

    // Remember me functionality
    if (localStorage.getItem('rememberedEmail')) {
        $('#correo').val(localStorage.getItem('rememberedEmail'));
        $('#rememberMe').prop('checked', true);
    }

    $('#rememberMe').on('change', function () {
        if (this.checked && $('#correo').val()) {
            localStorage.setItem('rememberedEmail', $('#correo').val());
        } else {
            localStorage.removeItem('rememberedEmail');
        }
    });

    $('#correo').on('change', function () {
        if ($('#rememberMe').is(':checked')) {
            localStorage.setItem('rememberedEmail', this.value);
        }
    });

    // Auto-focus email if empty
    if (!$('#correo').val()) {
        $('#correo').focus();
    }
}



$('#loginForm').submit(function (event) {
    event.preventDefault();
    var correo = $('#correo').val();
    var contrasena = $('#contrasena').val();

    const submitButton = $(this).find('#submitButton');
    const buttonText = $(this).find('#buttonText');
    const spinner = $(this).find('#spinner');

    // --- Start loading state ---
    submitButton.prop('disabled', true);
    buttonText.addClass('opacity-0');
    spinner.removeClass('d-none');

    const resetButtonState = () => {
        submitButton.prop('disabled', false);
        buttonText.removeClass('opacity-0');
        spinner.addClass('d-none');
    };

    crearPeticion('api/IndexAPI.php', {
        case: 'iniciarSesion',
        data: $.param({
            "correo": correo,
            "contrasena": contrasena,
            "recordar": $('#rememberMe').is(':checked') ? 1 : 0
        })
    }, function (response) {
        if (response.es_valor_error) {
            resetButtonState();
            Swal.fire({
                icon: 'error',
                title: 'Inicio de sesión fallido',
                text: response.mensaje,
                showConfirmButton: false,
                timer: 2000
            });
        } else {
            // On successful login, the page will refresh, so no need to reset the button.
            refresh();
        }
    }, function (xhr, status, error) {
        resetButtonState();
        Swal.fire({
            icon: 'error',
            title: 'Error en la solicitud',
            text: 'Hubo un problema al procesar la respuesta del servidor. Inténtalo de nuevo más tarde.'
        });
    });
});