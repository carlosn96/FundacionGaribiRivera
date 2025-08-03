const urlAPI = "api/InicioAdminProyectosAPI.php";

function ready() {
    crearPeticion(urlAPI, {case: "recuperarEmprendedores"}, function (res) {
        construirSelectorEtapas(res.etapas);
        construirTablaEmprendedores(res.emprendedores);
        $("#filterForm").submit(function (e) {
            e.preventDefault();
            const $boton = $("#botonAplicarFiltro");
            const textoOriginal = $boton.text();
            $boton.prop('disabled', true).text('Cargando...');
            const $spinner = $('<span class="spinner-grow spinner-grow-sm me-2" role="status"></span>');
            $boton.prepend($spinner);
            crearPeticion(urlAPI, {case: "filtrarEmprendedores", data: $(this).serialize()}, function (response) {
                construirTablaEmprendedores(response);
                $boton.prop('disabled', false).text(textoOriginal);
                $spinner.remove();
            });
        });
    });
}

function construirSelectorEtapas(etapas) {
    const $selector = crearSelector(null, "etapa", etapas.lista);
    $("#selector").prepend($selector);
    $selector.val(etapas.estapaSeleccionada);
}

function construirTablaEmprendedores(emprendedores) {
    var data = [];
    $.each(emprendedores, (i, emprendedor) => {
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

    if (data.length !== 0) {
        construirTablaDataTable(data, "table-hover", "container", "tablaEmprendedores");
    } else {
        const $tablaVacia = $('<table>', {class: "table table-bordered align-middle text-nowrap mb-1", id: "tablaEmprendedores"});
        const $thead = $('<thead>').append($('<tr>').append($('<th>', {text: "Nombre"})).append($('<th>', {text: "Telefono"})).append($('<th>', {text: "Correo"})));
        $tablaVacia.append($thead);
        $("#container").empty().append($tablaVacia);
        crearDataTable("#tablaEmprendedores");
    }
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