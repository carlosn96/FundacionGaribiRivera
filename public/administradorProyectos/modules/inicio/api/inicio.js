const urlAPI = "api/InicioAdminProyectosAPI.php";

function ready() {
    crearPeticion(urlAPI, {case: "recuperarEmprendedores"}, function (res) {
        var data = [];
        $.each(res, (i, emprendedor) => {
            data.push({
                "Nombre": emprendedor.nombre + " " + emprendedor.apellidos,
                "Teléfono": $("<a>", {
                    href: "https://wa.me/" + emprendedor.numero_celular.replace(/[\s\(\)-]/g, '').trim(),
                    target: "_blank"
                }).append($("<i>", {class: "ti ti-brand-whatsapp fs-4 pe-2 text-success"}))
                  .append(emprendedor.numero_celular),
                "Correo": $("<a>", {
                    href: "mailto:" + emprendedor.correo_electronico
                }).append($("<i>", {class: "ti ti-mail fs-4 pe-2 text-info"})).append(emprendedor.correo_electronico),
                "Acciones": crearBotonesAccion(emprendedor.id)
            });
        });
        
        if(data.length !== 0) {
            construirTablaDataTable(data, "table-hover", "container", "tablaEmprendedores");
        } else {
            const $tablaVacia = $('<table>', {class: "table table-bordered align-middle text-nowrap mb-1", id: "tablaEmprendedores"});
            const $thead = $('<thead>').append($('<tr>').append($('<th>', {text: "Nombre"})).append($('<th>', {text: "Telefono"})).append($('<th>', {text: "Correo"})));
            $tablaVacia.append($thead);
            $("#container").empty().append($tablaVacia);
            crearDataTable("#tablaEmprendedores");
        }
    });
}


function crearBotonesAccion(id) {
    return crearBotonEliminar({
        idRegistro: id,
        url: urlAPI,
        tituloBoton: "Eliminar",
        data: {
            case: "eliminarEmprendedor",
            data: $.param({
                id: id
            })
        }
    });
}