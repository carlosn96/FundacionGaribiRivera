var urlAPI = "api/InformeAPI.php";

function ready() {
    recuperarCarreras(function () {
        let data = {
            carrera: $("#selectorCarrera").find('option:selected').val(),
            plantel: $("#selectorPlantel").find('option:selected').val(),
            ciclo: $("#selectorCicloEscolar").find('option:selected').val()
        };
        crearPeticion(urlAPI, {case: "recuperar_supervisiones", data: $.param(data)}, fillTable, "json");
    });
}


function fillTable(data) {
    const container = $("#container");  // Asegúrate de tener un contenedor en tu HTML donde colocar la tabla y el mensaje.
    container.empty();
    const carrera = $("#selectorCarrera").find('option:selected').text();
    const plantel = $("#selectorPlantel").find('option:selected').text();
    const ciclo = $("#selectorCicloEscolar").find('option:selected').text();
    if (data.length === 0) {
        const text = `No se encontraron registros para mostrar para ${carrera}, Plantel ${plantel} (${ciclo})`;
        const card = $('<div>', {class: 'card border-start border-danger'})
                .append(
                        $('<div>', {class: 'card-body'})
                        .append(
                                $('<div>', {class: 'd-flex align-items-center justify-content-between'})
                                .append(
                                        $('<span>', {class: 'text-danger display-6'})
                                        .append($('<i>', {class: 'ti ti-bell'}))
                                        )
                                .append(
                                        $('<div>')
                                        .append($('<h4>', {class: 'card-title fs-7', text: 'Sin supervisiones realizadas'}))
                                        .append($('<p>', {class: 'card-subtitle text-danger', text: text}))
                                        )
                                )
                        );
        container.append(card);
    } else {
        const supervisionTable = $('<table>', {class: 'table table-striped table-hover', id: 'supervisionTable'})
                .append(
                        $('<thead>', {class: 'table-light'})
                        .append(
                                $('<tr>')
                                .append($('<th>', {text: 'Docente'}))
                                .append($('<th>', {text: 'Comentarios'}))
                                .append($('<th>', {text: 'Fecha'}))
                                .append($('<th>', {text: 'Resultado'}))
                                )
                        )
                .append($('<tbody>'));
        container.append(supervisionTable);
        const tbody = supervisionTable.find('tbody');
        data.forEach(item => {
            const row = $('<tr>')
                    .append($('<td>', {text: item.docente}))
                    .append($('<td>', {html: item.conclusion_general.replace(/\n/g, '<br>')}))
                    .append($('<td>', {text: new Date(item.fecha_supervision).toLocaleString()}))
                    .append($('<td>', {text: `${item.promedio_cumplimiento}%`}));

            tbody.append(row);
        });
    }
}
