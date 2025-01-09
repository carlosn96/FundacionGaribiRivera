const urlAPI = "api/EmprendedorAPI.php";

function ready() {
    crearPeticion(urlAPI, {case: "recuperarEventos"}, (eventos) => {
        eventos.forEach((e) => {
            const card = `
                <div class="col-lg-4">
                <div class="card">
                    <img class="card-img-top img-responsive" src="${e.imagen}" alt="${e.titulo}"> <!-- Imagen del evento -->
                    <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                            <span class="d-flex align-items-center">
                                <i class="ti ti-calendar me-1 fs-5"></i> ${e.fecha} <!-- Fecha del evento -->
                            </span>
                        </div>
                        <h4 class="card-title">${e.titulo}</h4> <!-- Título del evento -->
                        <p class="mb-0 card-subtitle">${e.descripcion}</p> <!-- Descripción del evento -->
                        <div class="text-end">
                            <a href="${e.url}" class="btn btn-outline-primary mt-3" target="_blank">Leer más</a> <!-- URL del evento -->
                        </div>
                    </div>
                </div>
                </div>
            `;
           $("#eventos-container").append(card);
        });
    });
}