const urlAPI = "api/SeguimientoCasoAPI.php";

function ready() {
    crearPeticion(urlAPI, {case: "recuperarEmprendedores"}, function (data) {
        construirSelectorEtapas(data.etapas);
        construirTablaEmprendedores(data);
    });

    $("#filterForm").submit(function (e) {
        e.preventDefault();
        const $boton = $("#botonAplicarFiltro");
        const textoOriginal = $boton.text();
        $boton.prop('disabled', true).text('Cargando...');
        const $spinner = $('<span class="spinner-grow spinner-grow-sm me-2" role="status"></span>');
        $boton.prepend($spinner);
        crearPeticion(urlAPI, {case: "filtrarEmprendedores", data: $(this).serialize()}, function (data) {
            construirTablaEmprendedores(data);
            $boton.prop('disabled', false).text(textoOriginal);
            $spinner.remove();
        });
    });
}

function construirTablaEmprendedores(data) {
    const dataTabla = data.emprendedores.map(emprendedor => ({
            "Etapa": emprendedor.etapa,
            "Nombre": `<a href="#" class="text-primary text-decoration-none hover-underline">${emprendedor.nombre} ${emprendedor.apellidos}</a>`,
            "Seguimiento de caso": crearBotonSeguimiento(emprendedor)
        }));
    if (dataTabla.length !== 0) {
        construirTablaDataTable(dataTabla, "table-hover table-bordered", "tablaEmprendedoresContenedor", "tablaEmprendedores", "");
    } else {
        const $tablaVacia = $('<table>', {class: "table table-bordered align-middle text-nowrap mb-1", id: "tablaEmprendedores"});
        const $thead = $('<thead>').append($('<tr>').append($('<th>', {text: "Etapa"})).append($('<th>', {text: "Nombre"})).append($('<th>', {text: "Correo electrónico"})));
        $tablaVacia.append($thead);
        $("#tablaEmprendedoresContenedor").empty().append($tablaVacia);
        crearDataTable("#tablaEmprendedores");
    }
}

function construirSelectorEtapas(etapas) {
    const $selector = crearSelector(null, "etapa", etapas);
    $("#selector").prepend($selector);
    $selector.val(etapas.estapaSeleccionada);
}


function crearBotonSeguimiento(emprendedor) {
    var $boton = $('<button>', {
        class: 'btn btn-sm btn-outline-primary',
        'data-bs-toggle': 'modal',
        'data-bs-target': '#modalEmprendedor',
        click: function () {
            cargarSeguimientoCaso(emprendedor.idLineaBase, emprendedor.nombre, emprendedor.correo);
        }
    }).text('Seguimiento');

    return $boton;
}

function cargarSeguimientoCaso(idLineaBase, nombre, correo) {
    crearPeticion(urlAPI, {case: "recuperarSeguimientoCaso", data: `idLineaBase=${idLineaBase}`}, (rs) => {
        const emprendedor = encodeURIComponent(JSON.stringify([idLineaBase, nombre, correo]));
        const $btnSeguimiento = $("#btnDarSeguimiento");
        const $btnEliminarSeguimiento = $("#btnEliminarSeguimiento");
        const seguimientoExistente = Array.isArray(rs.seguimientoCaso);
        const textBtn = seguimientoExistente ? "Hacer" : "Ver";
        const icon = seguimientoExistente ? "ti-plus" : "ti-file-export";
        const rsEncoded = seguimientoExistente ? '' : encodeURIComponent(JSON.stringify(rs));
        const urlBtn = seguimientoExistente
                ? `../seguimientoCasoNuevo/?emprendedor=${emprendedor}`
                : `../seguimientoCasoVista/?sc=12&emprendedor=${emprendedor}`;
        $btnSeguimiento.attr("data-bs-original-title", `${textBtn} seguimiento de caso`);
        $btnSeguimiento.attr("href", urlBtn);
        $btnSeguimiento.html(`<span class="ti ${icon}"></span>`);
        $btnEliminarSeguimiento.prop("hidden", seguimientoExistente);
        $btnEliminarSeguimiento.attr("href", `javascript:eliminarSeguimientoCaso(${rs.seguimientoCaso.idSeguimientoCaso})`);
        $('#cardModalEmprendedorContent').html(`<p class="card-text">${correo}</p>`);
        $("#nombreEmprendedor").text(nombre);
        $("#modalEmprendedor").modal('show');
    });
}

function eliminarSeguimientoCaso(id) {
    alertaEliminar({
        mensajeAlerta: "Se eliminará el seguimiento de caso",
        url: urlAPI,
        data: {"case": "eliminarSeguimientoCaso", "data": `id=${id}`}
    });
}