var urlAPI = 'api/ReportesAPI.php';

function ready() {

    function getAniosDisponibles() {
        crearPeticion(urlAPI, { case: 'getAniosDisponibles' }, function (anios) {
            let options = '';
            anios.forEach(anio => {
                options += `<option value="${anio.anio}">${anio.anio}</option>`;
            });
            $('#reporteAnio').html(options);
        });
    }

    function getPersonasCapacitadasPorAnio() {
        crearPeticion(urlAPI, { case: 'getPersonasCapacitadasPorAnio', data: $.param({ anio: anio }) }, function (resultado) {
            let html = `<div class="alert alert-success">Total de personas capacitadas en ${anio}: <strong>${resultado.total}</strong></div>`;
            $('#resultadoReporte').html(html);
        });
        let anio = $('#reporteAnio').val();
    }

    function getEmprendedoresConAsistenciaIncompleta() {
        crearPeticion(urlAPI, { case: 'getEmprendedoresConAsistenciaIncompleta' }, function (emprendedores) {
            let html = '<table class="table table-striped"><thead><tr><th>Nombre</th><th>Email</th><th>Teléfono</th><th>Talleres Asistidos</th><th>Talleres Totales</th></tr></thead><tbody>';
            emprendedores.forEach(emprendedor => {
                html += `<tr>
                                <td>${emprendedor.nombre}</td>
                                <td>${emprendedor.email}</td>
                                <td>${emprendedor.telefono}</td>
                                <td>${emprendedor.talleres_asistidos}</td>
                                <td>${emprendedor.talleres_totales}</td>
                            </tr>`;
            });
            html += '</tbody></table>';
            $('#reporteAsistenciaIncompleta').html(html);
        });


    }

    $('#generarReporteBtn').click(function () {
        getPersonasCapacitadasPorAnio();
    });

    getAniosDisponibles();
    getEmprendedoresConAsistenciaIncompleta();

};