// Configuración global de jQuery Validate
$.validator.setDefaults({
    errorClass: "is-invalid text-danger",
    successClass: "is-valid text-success",
    highlight: function (element, errorClass, validClass) {
        $(element).addClass(errorClass).removeClass(validClass);
        $(element).closest('.form-group').addClass('has-danger');
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass(errorClass).addClass(validClass);
        $(element).closest('.form-group').removeClass('has-danger').addClass('has-success');
    },
    errorPlacement: function (error, element) {
        if (element.is(":radio") || element.is(":checkbox")) {
            error.appendTo(element.closest('.mb-3'));
        } else if (element.is("select")) {
            error.appendTo(element.closest('.mb-3'));
        } else if (element.parent('.input-group').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    }
});

// Agregar mensajes personalizados
$.extend($.validator.messages, {
    required: "Respuesta incompleta.",
    email: "Por favor, ingrese un correo electrónico válido.",
    number: "Ingresa un valor válido.",
    radio: "Por favor, selecciona una opción.",
    select: "Elige una de las opciones mostradas.",
    checkbox: "Elige una de las opciones mostradas."
});

const wizardOrientaciones = {
    HORIZONTAL: $.fn.steps.stepsOrientation.horizontal,
    VERTICAL: $.fn.steps.stepsOrientation.vertical
};

$(".validation-wizard-horizontal").steps(getWizardCoonfigs($.fn.steps.stepsOrientation.horizontal));
$(".validation-wizard-vertical").steps(getWizardCoonfigs($.fn.steps.stepsOrientation.vertical));

function getWizardCoonfigs(stepsOrientation) {
    return {
        stepsOrientation: stepsOrientation,
        headerTag: "h6",
        bodyTag: "section",
        transitionEffect: "fade",
        titleTemplate: '<span class="step">#index#</span> #title#',
        labels: {
            finish: "Enviar",
            next: "Siguiente",
            previous: "Anterior"
        },
        onStepChanging: function (event, currentIndex, newIndex) {
            // Permite siempre avanzar hacia atrás sin validación
            if (currentIndex > newIndex) {
                return true;
            }
            // Realiza validación solo cuando se avanza al siguiente paso
            var form = $(this).closest('form');
            form.validate().settings.ignore = ":disabled,:hidden";
            return form.valid();
        },
        onFinishing: function (event, currentIndex) {
            // Valida todo el formulario al finalizar
            var form = $(this).closest('form');
            form.validate().settings.ignore = ":disabled,:hidden";
            return form.valid();
        },
        onFinished: function (event, currentIndex) {
            enviarForm();
        }
    };
}