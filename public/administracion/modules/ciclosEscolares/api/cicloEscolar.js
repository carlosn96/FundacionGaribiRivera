let urlAPI = "api/CicloEscolarAPI.php";

function ready() {
    $(document).ready(function () {
        listarPlanteles();
        $("#agregarCicloEscolarForm").submit(function (e) {
            e.preventDefault();
            crearPeticion(urlAPI, {"case": "agregar", "data": $(this).serialize()});
        });
    });
}

function listarPlanteles() {
    crearPeticion(urlAPI, {case: "listar"}, function (res) {
        //print(res);
        let html = "";
        JSON.parse(res).forEach(function (ciclo) {
            const p = JSON.stringify(ciclo);
            const btnsMenuPlantel = [
                {"url": "javascript:editarPlantel(" + p + ")", "titulo": "<i class='ti ti-edit'></i> Editar"},
                {"url": "javascript:eliminar(" + p + ")", "titulo": "<i class='ti ti-trash'></i>Eliminar"}
            ];

            html += "<tr>";
            html += crearColumnaTabla(ciclo.ciclo_escolar);
            html += crearColumnaTablaCentrada(crearBotonMenuDesplegable("Acciones", btnsMenuPlantel, "primary"));
            html += "</tr>";
        });
        $("#tbodyCiclosEscolares").html(html);
        //crearDataTable($("#tablaPlanteles"));
    });
}


function editarPlantel(plantel) {
    $('#modalEditarPlantelLabel').text('Editar "' + plantel.ciclo_escolar + '"');
    $('#idCiclo').val(plantel.id_ciclo_escolar);
    $('#modalEditarPlantel').modal('show');
    print(plantel);
    //enviarFormulario('#formEditarPlantel', urlAPI, "editar_plantel");
}

function eliminar(plantel) {
    alertaEliminar({
        mensajeAlerta: "Se eliminará " + plantel.ciclo_escolar,
        url: urlAPI,
        data: {"case": "eliminar", "data": "id=" + plantel.id_ciclo_escolar}
    });
}