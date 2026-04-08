// ==================== HELPERS ====================

function formatearFechaIso(dateObj) {
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

function agregarOpcionCP(selector, id, cp) {
    const $sel = $(selector);
    $sel.html(`<option value="${id}" selected>${cp}</option>`);
}

function inicializarBuscadorCP(selectId, coloniaId, municipioId, estadoId) {
    if (typeof $.fn.select2 === 'undefined') return;

    $(selectId).select2({
        placeholder: 'Buscar C.P...',
        minimumInputLength: 3,
        ajax: {
            delay: 300,
            transport: function (params, success, failure) {
                ExpedienteAPI.buscarCodigosPostales(params.data.term, (res) => {
                    const items = res?.data?.data || res?.data || [];
                    success({
                        results: items.map(i => ({
                            id: i.id_codigo,
                            text: `${i.codigo_postal} - ${i.colonia || ''}`,
                            cp: i
                        }))
                    });
                }, (err) => {
                    console.error('Error al buscar CP:', err);
                    failure(err);
                });
            }
        },
        language: {
            noResults: () => "No se encontraron resultados",
            searching: () => "Buscando...",
            inputTooShort: () => "Por favor ingrese 3 o más caracteres",
            loadingMore: () => "Cargando más resultados...",
            errorLoading: () => "Error al cargar resultados"
        },
        width: '100%'
    }).on('select2:select', function (e) {
        const cp = e.params.data.cp;
        if (!cp) return;

        if (coloniaId) $(coloniaId).val(cp.colonia || '');
        if (municipioId && cp.municipio) {
            $(municipioId).val(cp.municipio.nombre || '');
        }
        if (estadoId && cp.municipio?.estado) {
            $(estadoId).val(cp.municipio.estado.nombre || cp.municipio.estado || '');
        }
    });
}
function inicializarMascarasTelefono(selector) {
    if (typeof $.fn.inputmask === 'undefined') return;

    $(selector).inputmask("(99) 9999-9999", {
        placeholder: "_",
        clearMaskOnLostFocus: true
    });
}


// === HELPERS DE FORMATEO (Específicos para este doc) ===

function formatearMoneda(val) {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val);
}

function formatearFechaSimple(isoDate) {
    if (!isoDate) return '—';
    const meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
    const cleanDate = isoDate.split('T')[0];
    const date = new Date(cleanDate + 'T00:00:00');
    return `${date.getDate()} DE ${meses[date.getMonth()]} DEL ${date.getFullYear()}`;
}

function formatearFechaLarga(isoDate) {
    if (!isoDate) return 'A — DE — DEL —';
    const cleanDate = isoDate.split('T')[0];
    const date = new Date(cleanDate + 'T00:00:00');
    return `A ${date.getDate()} DE ${formatearMes(date.getMonth())} DEL ${date.getFullYear()}`;
}

function formatearMes(m) {
    const meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
    return meses[m];
}

// === NÚMEROS A LETRAS (Simplificado para montos de crédito comunes) ===
function numeroALetras(num) {
    const conversion = window.Unidades || function(num) { 
        // Implementación básica si no existe global
        const unidades = ['', 'un ', 'dos ', 'tres ', 'cuatro ', 'cinco ', 'seis ', 'siete ', 'ocho ', 'nueve '];
        const decenas = ['', 'diez ', 'veinte ', 'treinta ', 'cuarenta ', 'cincuenta ', 'sesenta ', 'setenta ', 'ochenta ', 'noventa '];
        // ... (Para brevedad, usaré una versión funcional rápida)
        return num.toString();
    };

    // Usaremos un conversor más completo para producción
    const data = {
        numero: num,
        enteros: Math.floor(num),
        centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
        letrasCentavos: "",
        letrasMonedaPlural: 'PESOS',
        letrasMonedaSingular: 'PESO',
        letrasMonedaCentavoPlural: 'CENTAVOS',
        letrasMonedaCentavoSingular: 'CENTAVO'
    };

    if (data.centavos > 0) {
        data.letrasCentavos = "CON " + (function() {
            if (data.centavos >= 1 && data.centavos <= 9) return "0" + data.centavos;
            return data.centavos;
        })() + "/100 M.N.";
    } else {
        data.letrasCentavos = "00/100 M.N.";
    }

    return millares(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
}

function unidades(num) {
    switch (num) {
        case 1: return "UN";
        case 2: return "DOS";
        case 3: return "TRES";
        case 4: return "CUATRO";
        case 5: return "CINCO";
        case 6: return "SEIS";
        case 7: return "SIETE";
        case 8: return "OCHO";
        case 9: return "NUEVE";
    }
    return "";
}

function decenas(num) {
    let decena = Math.floor(num / 10);
    let unidad = num - (decena * 10);

    switch (decena) {
        case 1:
            switch (unidad) {
                case 0: return "DIEZ";
                case 1: return "ONCE";
                case 2: return "DOCE";
                case 3: return "TRECE";
                case 4: return "CATORCE";
                case 5: return "QUINCE";
                default: return "DIECI" + unidades(unidad);
            }
        case 2:
            if (unidad == 0) return "VEINTE";
            return "VEINTI" + unidades(unidad);
        case 3: return decenaY("TREINTA", unidad);
        case 4: return decenaY("CUARENTA", unidad);
        case 5: return decenaY("CINCUENTA", unidad);
        case 6: return decenaY("SESENTA", unidad);
        case 7: return decenaY("SETENTA", unidad);
        case 8: return decenaY("OCHENTA", unidad);
        case 9: return decenaY("NOVENTA", unidad);
        case 0: return unidades(unidad);
    }
}

function decenaY(strDecena, numUnidad) {
    if (numUnidad > 0) return strDecena + " Y " + unidades(numUnidad);
    return strDecena;
}

function centenas(num) {
    let centenas = Math.floor(num / 100);
    let decenas_val = num - (centenas * 100);

    switch (centenas) {
        case 1:
            if (decenas_val > 0) return "CIENTO " + decenas(decenas_val);
            return "CIEN";
        case 2: return "DOSCIENTOS " + decenas(decenas_val);
        case 3: return "TRESCIENTOS " + decenas(decenas_val);
        case 4: return "CUATROCIENTOS " + decenas(decenas_val);
        case 5: return "QUINIENTOS " + decenas(decenas_val);
        case 6: return "SEISCIENTOS " + decenas(decenas_val);
        case 7: return "SETECIENTOS " + decenas(decenas_val);
        case 8: return "OCHOCIENTOS " + decenas(decenas_val);
        case 9: return "NOVECIENTOS " + decenas(decenas_val);
    }
    return decenas(decenas_val);
}

function seccion(num, divisor, strSingular, strPlural) {
    let cientos = Math.floor(num / divisor);
    let resto = num - (cientos * divisor);

    let letras = "";
    if (cientos > 0) {
        if (cientos > 1) letras = centenas(cientos) + " " + strPlural;
        else letras = strSingular;
    }

    if (resto > 0) letras += "";
    return letras;
}

function miles(num) {
    let divisor = 1000;
    let cientos = Math.floor(num / divisor);
    let resto = num - (cientos * divisor);

    let strMiles = seccion(num, divisor, "MIL", "MIL");
    let strCentenas = centenas(resto);

    if (strMiles == "") return strCentenas;
    return strMiles + " " + strCentenas;
}

function millares(num) {
    let divisor = 1000000;
    let cientos = Math.floor(num / divisor);
    let resto = num - (cientos * divisor);

    let strMillones = seccion(num, divisor, "UN MILLON", "MILLONES");
    let strMiles = miles(resto);

    if (strMillones == "") return strMiles;
    return strMillones + " " + strMiles;
}
