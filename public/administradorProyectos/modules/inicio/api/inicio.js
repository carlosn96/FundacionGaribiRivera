const urlAPI = "api/InicioAdminProyectosAPI.php";

function ready() {

    crearPeticion(urlAPI, {case: "recuperarEmprendedores"}, function (res) {
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
                "Acciones": crearBotonesAccion(emprendedor.id)
            });
        });

        construirTablaDataTable(data,
                "table table-borderless align-middle text-nowrap mb-1",
                "container",
                "tablaEmprendedores");
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
    }) + crearBoton(
            "Ver Ficha", // Título del botón
            "btn btn-sm btn-primary", // Clase del botón con estilo Bootstrap
            "fas fa-search", // Icono (Font Awesome, puedes cambiarlo por otro)
            "", // Value (no necesario en este caso)
            "verFicha_" + id, // ID único para el botón
            "verFichaInscripcion(" + id + ")" // Acción (llamar a la función verFichaInscripcion)
            );
}

function verFichaInscripcion(id) {
   print(id);
}
