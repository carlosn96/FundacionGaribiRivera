let urlAPI = "api/DocenteAPI.php";

let contadorMaterias = 0;

function ready() {

    consultarDocentes();

    $('#profesorForm').submit(function (event) {
        event.preventDefault();
        crearPeticion(urlAPI, {
            case: "guardar_docente",
            data: $(this).serialize()
        });
    });

    $('#nombre, #apellido').on('input', function () {
        const nombreVal = $('#nombre').val();
        const apellidosVal = $('#apellido').val();
        const nombre = removerAccentos(nombreVal.trim().toLowerCase().replace(/ /g, ''));
        const apellidos = removerAccentos(apellidosVal.trim().toLowerCase().split(' ')[0]);
        if (nombre && apellidos) {
            const correoUsuario = `${nombre}.${apellidos}`;
            $('#correo').val(correoUsuario);
        }
    });



}

function consultarDocentes() {
    crearPeticion(urlAPI, {case: "listar_docentes"}, (res) => {
        //    print(res);
        $("#tabContent").empty();
        const tabla = $("<table>", {class: "table text-nowrap mb-0 align-middle", id: "tablaDocentes"})
                .append($("<thead>", {class: "text-dark fs-4"})
                        .append($("<tr>")
                                .append($("<th>").append($("<h6>", {class: "fs-4 fw-semibold mb-0", text: "Nombre"})))
                                .append($("<th>").append($("<h6>", {class: "fs-4 fw-semibold mb-0", text: "Correo electrónico"})))
                                .append($("<th>").append($("<h6>", {class: "fs-4 fw-semibold mb-0", text: "Ver detalles"})))
                                )
                        )
                .append($("<tbody>"));
        let html = "";
        JSON.parse(res).forEach(function (docente) {

            const nombre = `<div class="d-flex align-items-center">
                                                    <div>
                                                        <h6 class="mb-1">${docente.nombre} ${docente.apellidos}</h6>
                                                        <p class="fs-3 mb-0">${docente.perfil_profesional}</p>
                                                    </div>
                                                </div>`;
            const verDetalles = `
                        <a href="javascript:verDetalles(${docente.id_docente})" class="link-primary"
                           data-bs-toggle="tooltip"
                           data-bs-placement="top"
                           aria-label="View Details"
                           data-bs-original-title="Ver detalles">
                          <i class="ti ti-eye fs-7"></i>
                        </a>`;
            const mail = `<a href="mailto:${docente.correo_electronico}">${docente.correo_electronico}</a>`;
            html += "<tr>";
            html += crearColumnaTabla(nombre);
            html += crearColumnaTabla(mail);
            html += crearColumnaTabla(verDetalles);
            // html += crearColumnaTablaCentrada(crearBotonMenuDesplegable("Acciones", btnsMenu, "primary"));
            html += "</tr>";
        });
        tabla.find("tbody").append(html);
        $("#tabContent").append(tabla);
        crearDataTable($("#tablaDocentes"));
    });
}

function verDetalles(id) {
    crearPeticion(urlAPI, {case: "ver_detalles", data: "id=" + id}, (rs) => {
        if (!rs.es_valor_error) {
            redireccionar("detallesDocente.php");
        } else {
            print(rs);
        }
    }, "json");
}