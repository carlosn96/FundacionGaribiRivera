const urlAPI = "api/EmprendedoresFortalecimientoAPI.php";

function ready() {
    crearPeticion(urlAPI, { case: "recuperarEmprendedoresFortalecimiento" }, function (res) {
        construirTablaFortalecimiento(res.emprendedores || []);
    });
}

function construirTablaFortalecimiento(emprendedores) {
    const claseTabla = "table table-hover align-middle text-nowrap mb-1";
    const data = [];

    $.each(emprendedores, (i, emprendedor) => {
        const botonEliminar = crearBotonEliminar({
            idRegistro: emprendedor.id_fortalecimiento,
            url: urlAPI,
            tituloBoton: "Desuscribir de fortalecimiento",
            data: {
                case: "eliminarEmprendedorFortalecimiento",
                data: $.param({
                    id: emprendedor.id_fortalecimiento
                })
            }
        });

        data.push({
            "Etapa": $('<span>', { class: 'badge bg-light text-dark border', text: emprendedor.etapa_nombre || 'Sin etapa' }),
            "Nombre": emprendedor.nombre + " " + emprendedor.apellidos,
            "Teléfono": $("<a>", {
                href: "https://wa.me/" + emprendedor.numero_celular.replace(/[\s\(\)-]/g, '').trim(),
                target: "_blank"
            }).append($("<i>", { class: "ti ti-brand-whatsapp fs-4 pe-2 text-success" }))
                .append(emprendedor.numero_celular),
            "Correo": $("<a>", {
                href: "mailto:" + emprendedor.correo_electronico
            }).append($("<i>", { class: "ti ti-mail fs-4 pe-2 text-info" }))
                .append(emprendedor.correo_electronico),
            "Acciones": $("<div>", { class: "btn-group", role: "group" })
                .append($("<a>", {
                    href: "./../actualizarEmprendedores?id=" + emprendedor.id_usuario,
                    role: "button",
                    class: "btn btn-outline-warning btn-sm"
                }).append($("<i>", { class: "far fa-edit me-1" })).append("Editar"))
                .append(botonEliminar)
        });
    });

    if (data.length !== 0) {
        construirTablaDataTable(data, claseTabla, "containerFortalecimiento", "tablaFortalecimiento");
    } else {
        const $tablaVacia = $('<table>', { class: claseTabla, id: "tablaFortalecimiento" });
        const $thead = $('<thead>').append(
            $('<tr>')
                .append($('<th>', { text: "Etapa" }))
                .append($('<th>', { text: "Nombre" }))
                .append($('<th>', { text: "Teléfono" }))
                .append($('<th>', { text: "Correo" }))
                .append($('<th>', { text: "Acciones" }))
        );
        $tablaVacia.append($thead);
        $("#containerFortalecimiento").empty().append($tablaVacia);
        crearDataTable("#tablaFortalecimiento");
    }
}
