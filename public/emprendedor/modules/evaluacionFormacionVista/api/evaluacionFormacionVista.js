function ready() {

    crearPeticion("api/EvaluacionFormacionVistaAPI.php", {case: "recuperarEvaluacion"}, (evaluacion) => {
        if (!Array.isArray(evaluacion)) {
            const $detailsContainer = $('#contenidoEvaluacion');
            // Diccionario de preguntas y respuestas
            const detalles = {
                '¿Consideras que hubo algún beneficio a nivel personal después de la formación o acompañamiento?': boolToString(evaluacion.huboBeneficioPersonal),
                '¿Cuáles fueron los beneficios obtenidos?': evaluacion.beneficiosObtenidos || 'Ninguno',
                '¿Cuál es tu sueldo mensual?': `$${evaluacion.sueldoMensual}`,
                '¿Cuál es el monto mensual de tus ventas?': `$${evaluacion.ventasMensuales}`,
                '¿Cuál es el monto mensual de tus gastos/egresos?': `$${evaluacion.gastosMensuales}`,
                '¿Cuál es el monto de tus utilidades mensuales?': `$${evaluacion.utilidadesMensuales}`,
                '¿Es tu negocio la principal fuente de ingresos para ti, a nivel personal?': boolToString(evaluacion.esIngresoPrincipalPersonal),
                '¿Es tu negocio la principal fuente de ingresos para tu familia?': boolToString(evaluacion.esIngresoPrincipalFamiliar),
                '¿Tienes el hábito de ahorrar de manera constante y a largo plazo?': boolToString(evaluacion.tieneHabitoAhorro),
                '¿Cuentas con algún sistema de ahorro?': boolToString(evaluacion.cuentaConSistemaAhorro)
            };
            if (evaluacion.cuentaConSistemaAhorro) {
                detalles['¿Con qué sistema de ahorro cuentas?'] = evaluacion.detallesSistemaAhorro;
                detalles['¿Cuál es el monto aproximado de tus ahorros mensuales?'] = `$${evaluacion.ahorroMensual}`;
            }
            $.each(detalles, function (label, value) {
                const pregunta = $('<div>', {class: 'row mb-3'})
                        .append($('<div>', {class: 'col-sm-8 col-md-8 font-weight-bold'}).html(`<strong>${label}</strong>`))
                        .append($('<div>', {class: 'col-sm-4 col-md-4', text: value}));
                $detailsContainer.append(pregunta);
            });
            if (evaluacion.objetivosAhorro && evaluacion.objetivosAhorro.length > 0) {
                let objetivosHtml = $('<div>', {class: 'row mb-3'})
                        .append($('<div>', {class: 'col-sm-8 col-md-8 font-weight-bold', text: 'Objetivos de Ahorro:'}))
                        .append($('<div>', {class: 'col-sm-4 col-md-4'})
                                .append($('<ul>', {class: 'list-group'})
                                        .append($.map(evaluacion.objetivosAhorro, function (objetivo, index) {
                                            return $('<li>', {class: 'list-group-item', text: `${index + 1}. ${objetivo.descripcion}`});
                                        })))
                                );
                $detailsContainer.append(objetivosHtml);
            }
        }
    });




}
