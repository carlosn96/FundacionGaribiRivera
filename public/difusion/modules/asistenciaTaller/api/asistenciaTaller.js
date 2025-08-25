var urlAPI = 'api/AsistenciaTallerAPI.php';

function ready() {
    getEtapas();
    $('#etapa').change(function () {
        getTalleresPorEtapa();
    });
}


function getEtapas() {
    crearPeticion(urlAPI, { case: 'getEtapas' }, function (etapas) {
        let options = '<option value="">Seleccione una etapa</option>';
        etapas.forEach(etapa => {
            options += `<option value="${etapa.id_etapa}">${etapa.nombre}</option>`;
        });
        $('#etapa').html(options);
        getTalleresPorEtapa();
    });
}

function getTalleresPorEtapa() {
    let etapaId = $('#etapa').val();
    crearPeticion(urlAPI, { case: 'getTalleresPorEtapa', id_etapa: etapaId }, function (talleres) {
        let options = '<option value="">Seleccione un taller</option>';
        talleres.forEach(taller => {
            options += `<option value="${taller.id_taller}">${taller.nombre_taller}</option>`;
        });
        $('#taller').html(options);
        getEmprendedoresPorEtapa();
    });
}


function getEmprendedoresPorEtapa() {
    let etapaId = $('#etapa').val();
    crearPeticion(urlAPI, { case: 'getEmprendedoresPorEtapa', id_etapa: etapaId }, function (emprendedores) {
        let rows = '';
        emprendedores.forEach(emprendedor => {
            rows += `<tr>
                            <td>${emprendedor.nombre}</td>
                            <td><input type="checkbox" value="${emprendedor.id}"></td>
                        </tr>`;
        });
        $('#asistencia-table-body').html(rows);
    });

}

function registrarAsistencia() {
    let asistencia = [];
    $('#asistencia-table-body input[type=checkbox]:checked').each(function () {
        asistencia.push($(this).val());
    });
    let data = {
        id_taller: $('#taller').val(),
        fecha: $('#fecha').val(),
        emprendedores: asistencia
    };
    $.ajax({
        url: urlAPI,
        type: 'POST',
        data: { q: 'asistencia', data: JSON.stringify(data) },
        success: function (data) {
            alert('Asistencia guardada');
        }
    });
}