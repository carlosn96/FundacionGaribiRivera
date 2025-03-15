const urlAPI = "api/SeguimientoCasoAPI.php";
const seguimientoCasoForm = "seguimientoCasoForm";

function ready() {
    let get = extraerParametrosURL(window.location);
    if (get.lineaBase && get.emprendedor) {
        $("#idLineaBase").val(get.lineaBase);
        crearPeticion(urlAPI, {case: "recuperarInfoEmprendedor", data: $.param(get)}, (res) => {
            const seguimientoCaso = res.seguimientoCaso;
            $("#idSeguimientoCaso").val(seguimientoCaso.idSeguimientoCaso);
            $("#observacionesGenerales").val(seguimientoCaso.observacionesGenerales);
            if (seguimientoCaso.fotografiasCaso && seguimientoCaso.fotografiasCaso.length > 0) {
                crearCarousel(seguimientoCaso.fotografiasCaso);
            } else {
                $("#fotografiasAgregadas").prop("hidden", true);
            }

            generarCardEmprendedor(res.emprendedor);
        });
        ajustarEventos();
    } else {
        redireccionar("../lineaBaseAdministracion");
    }
}

function crearCarousel(fotografiasCaso) {

    fotografiasCaso.forEach((itm, idx) => {
        const img = `
            <div class="carousel-item ${idx === 0 ? "active" : ""}">
                <img src="data:image/jpeg;base64, ${itm.value}" class="d-block w-100" alt="spike-img" data-id="${itm.id}">
            </div>
        `;
        $("#items").append(img);
    });

}

function eliminarImagen() {
    const $activeItem = $('.carousel-item.active');
    if ($activeItem.length > 0) {
        const imageId = $activeItem.find('img').data('id');
        crearPeticion(urlAPI, {case: "eliminarImagen", data: $.param({id: imageId})});
        //$activeItem.remove();
        if ($('.carousel-item').length === 0) {
            console.log("No quedan imágenes en el carrusel.");
        }
    }
}

function generarCardEmprendedor(emprendedor) {
    const cardHTML = `
        <div class="card w-100 border position-relative overflow-hidden shadow-sm">
            <div class="card-body p-4">
                <div class="text-center">
                    <img src="data:image/jpeg;base64,${emprendedor.fotografia}" alt="${emprendedor.nombre} ${emprendedor.apellidos}" class="img-fluid rounded-circle" width="120" height="120">
                    <h4 class="card-title">${emprendedor.nombre} ${emprendedor.apellidos}</h4>    
                    <div class="mt-4">
                    <p class="card-text">
                        <strong>Correo electrónico:</strong> ${emprendedor.correo_electronico}<br>
                        <strong>Celular:</strong> ${emprendedor.numero_celular}
                    </p>
                </div>
                </div>
            </div>
        </div>
    `;
    $('#emprendedor').append(cardHTML);
}



function ajustarEventos() {
    //Ajustar Dropzone
    Dropzone.autoDiscover = false;
    const myDropzone = Dropzone.forElement("#fotografiasCasoForm");
    myDropzone.options.addRemoveLinks = true;
    myDropzone.options.dictRemoveFile = "Eliminar archivo";
    myDropzone.options.acceptedFiles = ".png, .jpg, .jpeg";
    //Formulario caso nuevo
    $("#" + seguimientoCasoForm).submit(guardarSeguimientoCaso);
    $("#guardarSeguimientoCasoBtn").click(() => {
        $("#" + seguimientoCasoForm).submit();
    });
}

function guardarSeguimientoCaso(e) {
    e.preventDefault();
    const formData = new FormData();
    const dropzoneFiles = Dropzone.forElement("#fotografiasCasoForm").getAcceptedFiles();
    $("#seguimientoCasoForm input[required], #seguimientoCasoForm textarea[required]").each(function () {
        let fn = $(this).val().trim() === '' ? "addClass" : "removeClass";
        $(this)[fn]("is-invalid");
    });
    if ($("#" + seguimientoCasoForm).find('.is-invalid').length > 0) {
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
            mostrarMensajeResultado(rs);
        });
    }
}