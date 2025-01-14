const urlAPI = "api/EmprendedorAPI.php";

function ready() {
    crearPeticion(urlAPI, {case: "recuperarNovedades"}, (novedades) => {
        novedades.eventos.forEach((e) => {
           $("#eventos-container").append(construirCardNovedades(e));
        });
        novedades.publicaciones.forEach((p) => {
           $("#publicaciones-container").append(construirCardNovedades(p));
        });
    });
}

function construirCardNovedades(novedad) {
    return `<div class="col-lg-4">
                <div class="card">
                    <img class="card-img-top img-responsive" src="${novedad.imagen}" alt="${novedad.titulo}"> <!-- Imagen del evento -->
                    <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                            <span class="d-flex align-items-center">
                                <i class="ti ti-calendar me-1 fs-5"></i> ${novedad.fecha} <!-- Fecha del evento -->
                            </span>
                        </div>
                        <h4 class="card-title">${novedad.titulo}</h4> <!-- Título del evento -->
                        <p class="mb-0 card-subtitle">${novedad.descripcion}</p> <!-- Descripción del evento -->
                        <div class="text-end">
                            <a href="${novedad.url}" class="btn btn-outline-primary mt-3" target="_blank">Leer más</a>
                        </div>
                    </div>
                </div>
                </div>
            `;
}