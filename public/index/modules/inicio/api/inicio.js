

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

    apiPostRequest('auth/login', {
        correo: correo,
        contrasena: contrasena,
        rememberMe: $('#rememberMe').is(':checked')
    }, function (response) {
        console.log(response);
        if (response.status === 200 || response.access_token || response.data) {
            const token = response.data && response.data.access_token ? response.data.access_token : null;
            const redirectUrl = getBasePath() + '/public/bridge_login/index.php';
            if (token) {
                redireccionar(redirectUrl + '?token=' + encodeURIComponent(token));
            } else {
                redireccionar(redirectUrl);
            }
        } else {
            resetButtonState();
            mostrarMensajeError(response.message || 'Inicio de sesión fallido', false);
        }
    }, function (error) {
        resetButtonState();
        procesarErrorApi(error);
    });
});