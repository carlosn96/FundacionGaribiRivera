let urlAPI = "api/GrupoAPI.php";

function ready() {
    $(document).ready(function () {

        $('#grupoForm').submit(function (event) {
            event.preventDefault();
            print($(this).serialize());
            crearPeticion(urlAPI, {
                case: "crear_grupo",
                data: $(this).serialize() + "&" + recuperarParametrosCarreraCiclo()
            });
        });

        recuperarCarreras(function () {
            const data = {
                case: "recuperar_grupos",
                data: recuperarParametrosCarreraCiclo()
            };
            crearPeticion(urlAPI, data, function (res) {
                //print(res);
                $("#tabContent").empty();
                const tabla = $("<table>", {class: "table text-nowrap mb-0 align-middle", id: "tablaGrupos"})
                        .append($("<thead>", {class: "text-dark fs-4"})
                                .append($("<tr>")
                                        .append($("<th>").append($("<h6>", {class: "fs-4 fw-semibold mb-0", text: "Clave"})))
                                        .append($("<th>").append($("<h6>", {class: "fs-4 fw-semibold mb-0", text: "Seudónimo"})))
                                        .append($("<th>").append($("<h6>", {class: "fs-4 fw-semibold mb-0", text: "Acciones"})))
                                        )
                                )
                        .append($("<tbody>"));
                let html = "";
                JSON.parse(res).forEach(function (grupo) {
                    const g = JSON.stringify(grupo);
                    const btnsMenu = [
                        {"url": "javascript:editarGrupo(" + g + ")", "titulo": "<i class='ti ti-edit'></i> Editar"},
                        {"url": "javascript:eliminar(" + g + ")", "titulo": "<i class='ti ti-trash'></i> Eliminar"}
                    ];
                    html += "<tr>";
                    html += crearColumnaTabla(grupo.clave);
                    html += crearColumnaTabla(grupo.seudonimo);
                    html += crearColumnaTablaCentrada(crearBotonMenuDesplegable("Acciones", btnsMenu, "primary"));
                    html += "</tr>";
                });
                tabla.find("tbody").append(html);
                $("#tabContent").append(tabla);
                crearDataTable($("#tablaGrupos"));
            });
        });
    });
}

function recuperarParametrosCarreraCiclo() {
    const carrera = $("#selectorCarrera").find('option:selected').val();
    const plantel = $("#selectorPlantel").find('option:selected').val();
    const ciclo = $("#selectorCicloEscolar").find('option:selected').val();
    return $.param({carrera: carrera, plantel: plantel, ciclo: ciclo});
}

function eliminar(grupo) {
    alertaEliminar({
        mensajeAlerta: "Se elimininará " + grupo.clave,
        url: urlAPI,
        data: {"case": "eliminar", "data": "id=" + grupo.id_grupo}
    });
}