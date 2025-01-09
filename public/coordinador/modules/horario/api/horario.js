var urlAPI = "api/HorarioAPI.php";

function ready() {
    recuperarCarreras(()=>{
        $(".body").removeAttr("hidden");
        construirTabla();
    });
    ajustarEventos();
}

function ajustarEventos() {
    $("input[name=tipoHorario]").change(construirTabla);
    $("#disponibilidadHoraDiaForm").submit(construirTablaDisponibilidad);
}

function construirTablaDisponibilidad(ev) {
    ev.preventDefault();
    const carrera = "&carrera=" + $("#selectorCarrera").find('option:selected').val();
    const plantel = "&plantel=" + $("#selectorPlantel").find('option:selected').val();
    const ciclo = "&ciclo=" + $("#selectorCicloEscolar").find('option:selected').val();
    const formData = $(this).serialize() + carrera + plantel + ciclo;
    crearPeticion(urlAPI, {case: "consultar_disponibilidad", data: formData}, function (rs) {
        print(rs);
        const table = $('<table>', {id: "tablaDisponibilidad"}).addClass('table table-striped table-responsive');
        const thead = $('<thead>').append(
                $('<tr>').append(
                $('<th>').text("Docente"),
                $('<th>').text("Materia"),
                $('<th>').text("Grupo"),
                $('<th>').text("Hora Inicio"),
                $('<th>').text("Hora Fin")
                )
                );
        const tbody = $('<tbody>');
        rs.forEach(item => {
            tbody.append($('<tr>').append(
                    $('<td>').text(item.docente),
                    $('<td>').text(item.nombre_materia),
                    $('<td>').text(item.grupo),
                    $('<td>').text(item.hora_inicio),
                    $('<td>').text(item.hora_fin)
                    ));
        });
        table.append(thead).append(tbody);
        $('#compDisponibilidad').empty().append(table);
        crearDataTable("#tablaDisponibilidad");
    }, "json");
}

function construirTabla() {
    let data = {
        carrera: $("#selectorCarrera").find('option:selected').val(),
        plantel: $("#selectorPlantel").find('option:selected').val(),
        cicloEscolar: $("#selectorCicloEscolar").find('option:selected').val(),
        tipoHorario: $("input[name=tipoHorario]:checked").val()
    };
    crearPeticion(urlAPI, {case: "obtener_lista_elementos", data: $.param(data)}, function (rs) {
        //print(rs);
        let lista = rs.tabla_horario;
        let tipoElemento = Object.keys(lista)[0];
        const table = $('<table>', {id: "tablaHorario"}).addClass('table table-striped table-responsive');
        const thead = $('<thead>').append($('<tr>').append($('<th>').text(tipoElemento)));
        const tbody = $('<tbody>');
        //print(lista[tipoElemento]);
        lista[tipoElemento].forEach(item => {
            const row = $('<tr>').append(
                    $('<td>').html($("<a>", {href: "javascript:void(0)", onclick: `verHorario("${tipoElemento}", ${item.id})`, text: item.text, class: "btn btn-link"}))
                    );
            tbody.append(row);
        });
        table.append(thead).append(tbody);
        $('#tabla').html(table);
        crearDataTable("#tablaHorario");
    }, "json");
}

function verHorario(tipo, id) {
    let data = {
        tipo: tipo,
        id: id,
        carrera: $("#selectorCarrera").find('option:selected').val(),
        plantel: $("#selectorPlantel").find('option:selected').val(),
        ciclo: $("#selectorCicloEscolar").find('option:selected').val()
    };
    print(data);
    crearPeticion(urlAPI, {case: "recuperar_horario", data: $.param(data)}, function (res) {
        //print(res);
        redireccionar("../verHorario");
    });
}