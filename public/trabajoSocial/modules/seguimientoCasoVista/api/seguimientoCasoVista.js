const urlAPI = "api/SeguimientoCasoAPI.php";

function ready() {
    $("#contenido").block({
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
    let res = extraerParametrosURL(window.location).emprendedor;
    if (res) {
        recuperarInfoSeguimientoCaso(JSON.parse(res));
    } else {
        redireccionar("../seguimientoCaso/");
    }
}

function recuperarInfoSeguimientoCaso(emprendedor) {
    const [idLineaBase, etapa, nombre, apellidos, correo] = emprendedor;
    $("#nombre").text(`${nombre} ${apellidos}`);
    $("#correo").text(correo);
    crearPeticion(urlAPI, {case: "recuperarSeguimientoCaso", data: `idLineaBase=${idLineaBase}`}, (rs) => {
        const $btnSeguimiento = $("#btnDarSeguimiento");
        const seguimientoCaso = rs.seguimientoCaso;
        $("#numeroCaso").append(`"${seguimientoCaso.numeroCaso}"`);
        $("#etapasFormacionCursadas").append(seguimientoCaso.etapasFormacion.join(", "));
        $("#observacionesGenerales").text(seguimientoCaso.observacionesGenerales);
        seguimientoCaso.fotografiasCaso.forEach((itm, idx) => {
            const img = `<div class="carousel-item ${idx===0 ? "active" : ""}"> 
                        <img src="data:image/jpeg;base64, ${itm}" class="d-block w-100" alt="spike-img">
                        </div>`;
            $("#items").append(img);
        });
        $("#contenido").unblock();
    });
}