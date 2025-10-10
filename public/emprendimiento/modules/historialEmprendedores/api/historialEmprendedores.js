
function ready() {
    function loadCapacitacionData() {
        $.ajax({
            url: 'api/historialEmprendedoresAPI.php',
            type: 'GET',
            data: { type: 'capacitacion' },
            dataType: 'json',
            success: function(data) {
                let table = '<table class="table table-bordered table-striped"><thead><tr><th>ID</th><th>Nombre</th><th>Etapa</th></tr></thead><tbody>';
                data.forEach(function(item) {
                    table += `<tr><td>${item.id}</td><td>${item.nombre}</td><td>${item.etapa}</td></tr>`;
                });
                table += '</tbody></table>';
                $('#tabla-capacitacion-container').html(table);
            },
            error: function(e) {
                $('#tabla-capacitacion-container').html('<p>Error al cargar los datos.</p>'+e);
            }
        });
    }

    function loadCreditoData() {
        $.ajax({
            url: 'api/historialEmprendedoresAPI.php',
            type: 'GET',
            data: { type: 'credito' },
            dataType: 'json',
            success: function(data) {
                let table = '<table class="table table-bordered table-striped"><thead><tr><th>ID</th><th>Nombre</th><th>Monto</th></tr></thead><tbody>';
                data.forEach(function(item) {
                    table += `<tr><td>${item.id}</td><td>${item.nombre}</td><td>${item.monto}</td></tr>`;
                });
                table += '</tbody></table>';
                $('#tabla-credito-container').html(table);
            },
            error: function() {
                $('#tabla-credito-container').html('<p>Error al cargar los datos.</p>');
            }
        });
    }

    // Cargar datos de capacitación por defecto
    loadCapacitacionData();

    $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href");
        if (target === '#pills-capacitacion') {
            loadCapacitacionData();
        } else if (target === '#pills-credito') {
            loadCreditoData();
        }
    });
}