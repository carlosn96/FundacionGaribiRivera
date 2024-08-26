function ready() {

    crearPeticion("api/InicioAdminProyectosAPI.php", {case: "recuperarEmprendedores"}, function (res) {
        print(res);
        var data = [];
        $.each(res, (i, emprendedor) => {
            print(emprendedor.numero_celular.trim());
            data.push({
                "Nombre": emprendedor.nombre + " " + emprendedor.apellidos,
                "Teléfono": $("<a>", {
                    href: "https://wa.me/" + emprendedor.numero_celular.replace(/[\s\(\)-]/g, '').trim(),
                    target: "_blank",
                }).append(
                        $("<i>", {
                            class: "ti ti-brand-whatsapp fs-4 pe-2 text-success"
                        })
                        ).append(" " + emprendedor.numero_celular),
                "Correo": emprendedor.correo_electronico,
                "Status": emprendedor.status
            });
        });

        construirTablaDataTable(data,
                "table table-borderless align-middle text-nowrap mb-1",
                "container",
                "tablaEmprendedores");
    });

}

