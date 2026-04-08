

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

    if (submitButton.hasClass('auth-btn--loading')) {
        return;
    }

    const setButtonLoadingState = (isLoading) => {
        submitButton.prop('disabled', isLoading);
        submitButton.toggleClass('auth-btn--loading', isLoading);
        submitButton.attr('aria-busy', isLoading ? 'true' : 'false');
        submitButton.attr('aria-disabled', isLoading ? 'true' : 'false');
        buttonText.toggleClass('opacity-0', isLoading);
        spinner.toggleClass('d-none', !isLoading);
        buttonText.text(isLoading ? 'Entrando...' : 'Entrar');
    };

    let requestSettled = false;
    const resetButtonState = () => {
        if (requestSettled) {
            return;
        }
        requestSettled = true;
        setButtonLoadingState(false);
    };

    setButtonLoadingState(true);

    apiPostRequest('auth/login', {
        correo: correo,
        contrasena: contrasena,
        rememberMe: $('#rememberMe').is(':checked')
    }, function (response) {
        console.log(response);
        if (response.status === 200 || response.access_token || response.data) {
            const token = response.access_token || (response.data ? response.data.access_token : null);
            const redirectUrl = getBasePath() + '/public/bridge_login/index.php';
            redireccionar(token ? `${redirectUrl}?token=${encodeURIComponent(token)}` : redirectUrl);
        } else {
            const errorMsg = response.message || response.mensaje || 'Inicio de sesión fallido';
            mostrarMensajeError(errorMsg, false, function() {
                resetButtonState();
            });
        }
    }, function (err) {
        let errorMsg = 'Ocurrió un error en la solicitud.';
        if (err.body) {
            try {
                const parsed = JSON.parse(err.body);
                errorMsg = parsed.message || errorMsg;
            } catch (e) {
                errorMsg = err.body || errorMsg;
            }
        } else if (err.message) {
            errorMsg = err.message;
        }
        mostrarMensajeError(errorMsg, false, function() {
            resetButtonState();
        });
    });
});
