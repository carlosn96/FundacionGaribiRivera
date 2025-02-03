const urlAPI = "api/SeguimientoCasoNuevoAPI.php";
const nuevoCasoForm = "#nuevoCasoForm";
function ready() {
    $(document).ready(() => {
        let res = extraerParametrosURL(window.location).emprendedor;
        if (res) {
            recuperarCamposFormulario(JSON.parse(res));
            ajustarEventos();
        } else {
            redireccionar("../seguimientoCaso/");
        }
    });
}

function recuperarCamposFormulario(emprendedor) {
    crearPeticion(urlAPI, {case: "listarTiposEtapasFormacion"}, (res) => {
        crearSelectorMultiple($("#etapasFormacionCursadas"), "etapasFormacionCursadas", res);
    });
    $("#tituloCard").append(emprendedor[1]);
    $("#idLineaBase").val(emprendedor[0]);
}

function ajustarEventos() {
    //Ajustar Dropzone
    Dropzone.autoDiscover = false;
    const myDropzone = Dropzone.forElement("#fotografiasCasoForm");
    myDropzone.options.addRemoveLinks = true;
    myDropzone.options.dictRemoveFile = "Eliminar archivo";
    myDropzone.options.acceptedFiles = ".png, .jpg, .jpeg";
    //Formulario caso nuevo
    $(nuevoCasoForm).submit(guardarSeguimientoCaso);
    $("#guardarSeguimientoCasoBtn").click(() => {
        $(nuevoCasoForm).submit();
    });
}

function guardarSeguimientoCaso(e) {
    e.preventDefault();
    const formData = new FormData();
    const dropzoneFiles = Dropzone.forElement("#fotografiasCasoForm").getAcceptedFiles();
    $("#nuevoCasoForm input[required], #nuevoCasoForm textarea[required]").each(function () {
        let fn = $(this).val().trim() === '' ? "addClass" : "removeClass";
        $(this)[fn]("is-invalid");
    });
    if ($("#nuevoCasoForm").find('.is-invalid').length > 0 ||
            $('select[name="etapasFormacionCursadas[]"]').val().length === 0 ||
            dropzoneFiles.length === 0) {
        mostrarMensajeAdvertencia('Por favor, completa todos los campos requeridos.', false);
    } else {
        const dropzoneFiles = Dropzone.forElement("#fotografiasCasoForm").getAcceptedFiles();
        dropzoneFiles.forEach((file, index) => {
            formData.append(`fotografiasCaso[${index}]`, file, file.name);
        });
        formData.append("case", "guardarCaso");
        formData.append("data", $(this).serialize());
        $('#guardarSeguimientoCasoBtn').addClass('visually-hidden');
        $('#spinner').removeClass('d-none');
        crearPeticion(urlAPI, formData, (rs) => {
            $('#guardarSeguimientoCasoBtn').removeClass('visually-hidden');
            $('#spinner').addClass('d-none');
            if (rs.es_valor_error) {
                mostrarMensajeError(rs.mensaje);
            } else {
                mostrarMensajeOk(rs.mensaje, false, function () {
                    redireccionar("../seguimientoCaso/");
                });
            }
        });
    }
}