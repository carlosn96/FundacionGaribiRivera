function fijarSubmitFormulario(idFormulario, urlAPI, submitCase, fnValidateNoError = () => {return true; }, fnSuccess = mostrarMensajeResultado) {
    $(idFormulario.startsWith('#') ? idFormulario : '#' + idFormulario).submit(function (e) {
        e.preventDefault();
        e.stopPropagation();
        const form = $(this);
        if (form[0].checkValidity() && fnValidateNoError()) {
            crearPeticion(urlAPI, {case: submitCase, data: form.serialize()}, fnSuccess);
        }
        form.addClass("was-validated");
    });
}

function crearPeticion(url, data, fnSuccess = mostrarMensajeResultado, fnError = procesarRespuestaError, dataType = "json", contentType = 'application/x-www-form-urlencoded') {
    const isFormData = data instanceof FormData;
    if (isFormData) {
        contentType = false;
    }
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: fnSuccess,
        dataType: dataType,
        contentType: contentType,
        processData: !isFormData, // Evitar que jQuery convierta los datos en una cadena si es FormData
        error: fnError
    });
}

function procesarRespuestaError(jqXHR, textStatus, errorThrown) {
    //print(errorThrown);
    print(jqXHR.responseText);
    if (jqXHR.status === 0) {
        mostrarMensajeError("Sesión caducada");
    } else if (jqXHR.status === 404) {
        mostrarMensajeAdvertencia('Solicitud denegada: recurso no encontrado');
    } else if (jqXHR.status === 500) {
        mostrarMensajeError(JSON.stringify(jqXHR));
    } else if (textStatus === 'parsererror') {
        mostrarMensajeError("Error en la presentación de datos " + errorThrown);
    } else if (textStatus === 'timeout') {
        mostrarMensajeError('Time out error.');
    } else if (textStatus === 'abort') {
        mostrarMensajeError('Petición abortada');
    } else {
        mostrarMensajeError('Uncaught Error: ' + jqXHR.responseText);
    }
}

function mostrarMensajeResultado(result) {
    //print(result);
    var mensajeRespuesta = typeof result === "string" ? JSON.parse(result) : result;
    if (mensajeRespuesta.es_valor_error) {
        mostrarMensajeError(mensajeRespuesta.mensaje);
    } else {
        mostrarMensajeOk(mensajeRespuesta.mensaje);
    }
}

function mostrarMensajeOk(msg = "OK", reloading = true, fnthen = () => {}) {
    mostrarMensajeReload("Operación completa", "success", msg, reloading, fnthen);
    //location.reload();
}

function mostrarMensajeError(msg = "No se ha podido completar la operacion ...", reloading = true) {
    mostrarMensajeReload("Error", "error", msg, reloading);
}

function mostrarMensajeAdvertencia(msg, reloading = true) {
    mostrarMensajeReload("Atención", "warning", msg, reloading);
}

function mostrarMensajeInfo(msg, reloading = true, fnthen = () => {}) {
    return mostrarMensajeReload("Información:", "info", msg, reloading, fnthen);
}

function mostrarMensajeThen(title, type, msg, then, moreOptions = {}) {
    mostrarMensaje(title, type, msg, moreOptions).then((rs) => {
        if (rs.isConfirmed) {
            then();
        }
    });
}

function mostrarMensajeReload(title, type, msg, reloading = true, fnthen = () => {}) {
    return mostrarMensajeThen(title, type, msg, reloading ? refresh : fnthen);
}

function mostrarMensaje(title, type, msg, moreOptions) {
    var options = {
        title: title,
        text: msg,
        icon: type,
        allowOutsideClick: false
    };
    $.each(moreOptions, function (i, val) {
        options[i] = val;
    });
    return Swal.fire(options);
}

function redireccionar(url) {
    window.location = url;
}

function refresh() {
    location.reload();
}

function crearBotonMenuDesplegable(title, enlaces, color) {
    var links = "";
    enlaces.forEach(function (link) {
        if (link.button) {
            links += link.modal;
        } else {
            links += "<a class='dropdown-item' href='" + link.url + "'>" + link.titulo + "</a>";
        }
    });
    return "<div class='btn-group'>" +
            "<button id='group' type='button' class='btn btn-round btn-sm btn-outline-" + color + " dropdown-toggle' data-bs-toggle='dropdown' aria-expanded='false'>" +
            title +
            "</button>" +
            "<ul class='dropdown-menu'>" +
            links +
            "</ul>" +
            "</div>";
}

function crearBoton(title, clase, icono, value, id, action) {
    return "<button type='button' " +
            "class='" + clase + " position-relative' data-bs-toggle='tooltip' data-bs-placement='top' " +
            "data-bs-title='" + title + "' value='" + value + "' onclick='" + action + "()' id='" + id + "'>" +
            "<span class='btn-label'><i class='" + icono + "'></i></span> " + title + "</button>";
}

function crearBotonIcon(title, clase, icono, value, id, action) {
    return "<button type='button' " +
            "class='" + clase + " position-relative' data-bs-toggle='tooltip' data-bs-placement='top' " +
            "data-bs-title='" + title + "' value='" + value + "' onclick='" + action + "()' id='" + id + "'>" +
            "<i class='" + icono + "'></i>" +
            "</button>";
}

/**
 * Crea un botón de eliminación con las opciones especificadas.
 * 
 * @param {Object} opcionesPeticion - Opciones para la petición y configuración del botón.
 * @param {string} opcionesPeticion.mensajeAlerta - Mensaje de alerta a mostrar al eliminar.
 * @param {string} opcionesPeticion.url - URL a la que se enviará la petición de eliminación.
 * @param {Object} opcionesPeticion.data - Datos que incluyen el caso y la información necesaria para la petición.
 * @param {string|number} opcionesPeticion.idRegistro - ID del registro a eliminar.
 * @param {string} [opcionesPeticion.tituloBoton] - Texto del botón. Si no se proporciona, se deja vacío.
 * @param {string} [opcionesPeticion.clase] - Clases CSS para el botón. Si no se proporciona, se usa una clase predeterminada.
 * 
 * @returns {HTMLElement} - El botón de eliminación creado.
 */
function crearBotonEliminar(opcionesPeticion) {
    var idRegistro = opcionesPeticion.idRegistro;
    var tituloBoton = opcionesPeticion.tituloBoton ?
            opcionesPeticion.tituloBoton : "";
    return crearBoton(
            tituloBoton,
            opcionesPeticion.clase ? opcionesPeticion.clase : "btn btn-outline-danger btn-raised btn-sm btn-rounded",
            "far fa-trash-alt",
            idRegistro, "btnEliminar" + idRegistro, "alertaEliminar(" + JSON.stringify(opcionesPeticion) + ")");
}

function alertaEliminar(opcionesPeticion) {
    var msg = opcionesPeticion.mensajeAlerta;
    var url = opcionesPeticion.url;
    var data = opcionesPeticion.data;
    mostrarMensajeThen("¿Estás seguro?", "warning", msg, function () {
        //crearPeticion(url, data, print);
        crearPeticion(url, data);
    }, {
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#F1C84A",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "No, cancelar"
    });
}

function crearColumnaTablaCentrada(value, clase = "") {
    return crearColumnaTabla(value, "text-center " + clase);
}
function crearColumnaTabla(value, clase = "") {
    return "<td class='" + clase + "'>" + value + "</td>";
}

function crearColumnaHeaderTabla(value, clase = "") {
    return "<th class='" + clase + "'>" + value + "</th>";
}

function toMoneda(numero) {
    //return numeral(numero).format('$ 0,0.00');
    return numero.length !== 0 ? Intl.NumberFormat("es-MX", {style: "currency", currency: "MXN", minimunFractionDigits: 2}).format(numero) : "";
}

function deshabilitarHabilitarInput(input) {
    var attr = "disabled";
    if (input.prop(attr)) {
        input.removeAttr(attr);
    } else {
        input.attr(attr, attr);
    }
}

function crearDataTable(idTabla, buttons) {
    if ($.fn.dataTable.isDataTable(idTabla)) {
        $(idTabla).DataTable().clear().destroy();
    }
    const tabla = $(idTabla).DataTable({
        dom: "Bfrtip",
        buttons: Array.isArray(buttons) ? buttons : [],
        responsive: true,
        order: [[0, "asc"]],
        scrollY: "auto",
        paging: true,
        language: {
            "paginate": {
                "previous": "Anterior",
                "next": "Siguiente"
            },
            "sInfoThousands": ",",
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Sin registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Filtrar:",
            "searchPlaceholder": "Buscar en la tabla...",
            "sLoadingRecords": "Cargando..."
        }
    });
    return tabla;
}


function calcuarEdad(fechaNacimiento) {
    return parseInt((new Date() - new Date(fechaNacimiento)) /
            (1000 * 60 * 60 * 24 * 365));
}

function extraerFechaHora(input, fechaHora) {
    var strFechaHora = fechaHora.split(" ");
    $("#fecha" + input).val(strFechaHora[0]);
    $("#hora" + input).val(strFechaHora[1]);
}

function getFechaActual(sp = "-") {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10)
        dd = '0' + dd;
    if (mm < 10)
        mm = '0' + mm;
    return (yyyy + sp + mm + sp + dd);
}

function getFechaHoraActual() {
    return getFechaActual() + "T" + (new Date().toLocaleTimeString());
}

function habilitarDeshabilitarCampoBinario(inputRadioName, componenteName) {
    var inputRadio = $("input[name=" + inputRadioName + "]");
    var componente = $("#" + componenteName);
    inputRadio.on("change", function () {
        componente.attr("disabled", !Boolean(Number($(this).val())))
    });
}

function domicilioStr(domicilio) {
    var asentamiento;
    if (domicilio.calle !== null && domicilio.calle.length > 0) {
        asentamiento = domicilio.asentamiento;
        return " Calle " + domicilio.calle + " " + asentamiento.nombre +
                " (" + asentamiento.tipoAsentamiento.text + ") " + asentamiento.municipio.text + " " + asentamiento.estado.text;
    } else {
        return "Sin domicilio";
    }
}

function checkRadio(radio) {
    radio.attr("checked", "checked");
}

function elegirOpcionesMultipleSelect(input, values) {
    $.each(values, function (i, e) {
        $("#" + input + " option[value='" + e.value + "']").prop("selected", true);
    });
}

function separarDigitos() {
    $(this).val($.trim($(this).val().replace(/ /g, "").replace(/(\d{2})/g, '$1 ')));
}

function firstUpperCase(str, idxStart = 0) {
    var idx = -1;
    var isUpperCase = function (char) {
        return char === char.toUpperCase(char);
    };
    for (var i = idxStart, len = str.length; i < len; i++) {
        if (isUpperCase(str[i])) {
            idx = i;
            break;
        }
    }
    return idx;
}

function separarPalabras(str) {
    var cadena = str.substring(0, firstUpperCase(str, 1));
    return cadena + " " + str.substring(cadena.length);
}

function descargarTablaCSV(idTabla, nombreArchivo) {
    $("#" + idTabla).first().table2csv({"filename": nombreArchivo + ".csv"});
}

function print(res) {
    console.log(res);
}

function printError(res) {
    console.error(res.responseText ? res.responseText : res);
}

function llenar_inputs_form(obj) {
    $.each(obj, function (i, v) {
        let input = $("#" + i);
        if (input.length) {
            input.val(v);
        }
    });
}

function crearOpcionSelector($selector, val, text) {
    $selector.append($('<option>', {
        value: val,
        text: text
    }));
}

function crearSelector($container, name, arrayObjetos, required = true) {
    let $selector = $("<select>", {
        class: "form-select",
        name: name,
        id: name,
        required: required
    });
    crearOpcionSelector($selector, "", "Selecciona una opción");
    arrayObjetos.forEach((elemento) => {
        let keys = Object.keys(elemento);
        crearOpcionSelector($selector, elemento[keys[0]], elemento[keys[1]]);
    });

    if ($container) {
        $container.append($selector);
    } else {
        return $selector;
}

}

function crearSelectorMultiple(container, name, arrayObjetos, required = true) {
    let $selector = $("<select>", {
        class: "form-control",
        name: `${name}[]`,
        id: name,
        multiple: true,
        required: required
    });
    arrayObjetos.forEach((elemento) => {
        let keys = Object.keys(elemento);
        crearOpcionSelector($selector, elemento[keys[0]], elemento[keys[1]]);
    });
    container.append($selector);
    $selector.select2({
        language: {
            noResults: function () {
                return "Sin resultados";
            }
        }
    });
}

function crearGroupCheckbox($contenedor, arrayObjetos, name) {
    arrayObjetos.forEach((elemento) => {
        let keys = Object.keys(elemento);
        let val = elemento[keys[0]];
        let text = elemento[keys[1]];
        let id = name + val;
        $contenedor.append(construirInputCheckbox(id, val, name, text));
    });
}

function construirInputCheckbox(id, value, name, text, checked = false) {
    return $('<div>', {class: 'form-check'})
            .append($('<input>', {
                class: 'form-check-input',
                type: 'checkbox',
                id: id,
                value: value,
                name: `${name}[]`,
                checked: checked
            }))
            .append($('<label>', {
                class: 'form-check-label',
                for : id,
                text: text
            }));
}

function crearGroupRadio(idSelector, arrayObjetos, name, required = true) {
    arrayObjetos.forEach((elemento) => {
        let keys = Object.keys(elemento);
        let val = elemento[keys[0]];
        let text = elemento[keys[1]];
        let id = name + val;
        idSelector.append(construirInputRadio(id, val, name, text, required));
    });
}

function construirInputRadio(id, value, name, text, required, checked = false, changeHandler = null) {
    var radioInput = $('<input>', {
        class: 'form-check-input',
        type: 'radio',
        id: id,
        value: value,
        name: name,
        required: required,
        checked: checked ? 'checked' : null
    });
    if (changeHandler) {
        radioInput.on('change', changeHandler);
    }
    var radioLabel = $('<label>', {
        class: 'form-check-label',
        for : id,
        html: typeof text === 'object' ? text.html() : text
    });
    return $('<div>', {class: 'form-check'})
            .append(radioInput)
            .append(radioLabel);
}

function extraerParametrosURL(location) {
    var queryParams = location.search.substring(1).split('&');
    var parametros = {};
    queryParams.forEach(function (param) {
        var keyValue = param.split('=');
        var key = decodeURIComponent(keyValue[0]);
        var value = decodeURIComponent(keyValue[1]);
        parametros[key] = value;
    });
    return parametros;
}

function boolToString(valor) {
    return typeof valor === 'boolean' ? (valor ? 'Sí' : 'No') : valor;
}

function construirTabla(data, tableClass, container, tableID) {
    const $tabla = $('<table>', {
        class: `table ${tableClass}`,
        id: tableID
    });
    const keys = Object.keys(data[0]);
    const $thead = $('<thead>').append(
            $('<tr>').append(keys.map(key => $('<th>', {text: key})))
            );

    const $tbody = $('<tbody>').append(
            data.map(item => $('<tr>').append(
                        keys.map(key => $('<td>', {html: item[key]}))
                        ))
            );
    $tabla.append($thead, $tbody);
    $(`#${container}`).empty().append($tabla);
}

function construirTablaDataTable(data, tableClass, container, tableID, botones = ["copy", "csv", "excel", "pdf", "print"]) {
    construirTabla(data, tableClass, container, tableID);
    return crearDataTable("#" + tableID, botones);
}

function recuperarListadoInputsValue(nombre) {
    return $(nombre).map(function () {
        return $(this).val();
    }).get();
}

function isArrayEmpty(array) {
    return Array.isArray(array) && array.length === 0;
}

function bloquearSeccion($seccion) {
    $seccion.block({
        message: '<i class="ti ti-refresh text-white fs-5"></i>',
        overlayCSS: {
            opacity: 0.5,
            cursor: "wait"
        },
        css: {
            border: 0,
            padding: 0,
            backgroundColor: "transparent"
        }
    });
}

function desbloquearSeccion($seccion) {
    $seccion.unblock();
}