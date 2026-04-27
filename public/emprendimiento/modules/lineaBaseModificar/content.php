<style>
/* Minimal module styles using project branding variables */
.anim-slide-up {
    animation: lbSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
    transform: translateY(20px);
}
@keyframes lbSlideUp { to { opacity: 1; transform: translateY(0); } }

.input-soft {
    background-color: var(--bs-body-bg, #f8f9fa) !important;
    transition: all 0.18s ease-in-out;
    border-radius: var(--bs-border-radius-sm, .5rem);
    border: 1px solid rgba(0,0,0,0.04);
}
.input-soft:focus {
    background-color: #fff !important;
    border-color: var(--bs-primary, #183f37) !important;
    box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb, 24,63,55), 0.12) !important;
}

.hover-lift { transition: transform .18s ease, box-shadow .18s ease; }
.hover-lift:hover { transform: translateY(-3px); box-shadow: var(--bs-box-shadow-sm, 0 4px 15px rgba(0,0,0,0.03)) !important; }
</style>

<div class="container-fluid py-4 anim-slide-up" id="modificar-module" style="display: none;">
    <div class="row justify-content-center">
        <div class="col-xl-8 col-lg-10">
            <!-- Header Card del Emprendedor -->
            <div class="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                <div class="w-100" style="height: 120px; background: linear-gradient(135deg, rgba(var(--bs-primary-rgb,24,63,55),1), rgba(var(--bs-primary-rgb,24,63,55),0.85));"></div>
                <div class="card-body px-4 pb-4 px-md-5 d-flex flex-column flex-md-row align-items-center position-relative" style="margin-top: -50px;">
                    <img id="perfilEmprendedor" class="rounded-circle shadow-sm object-fit-cover bg-white" 
                         style="width: 130px; height: 130px; border: 5px solid #fff; z-index: 2;" src="" alt="Perfil">
                    <div class="ms-md-4 mt-3 mt-md-5 text-center text-md-start flex-grow-1" style="margin-top: 1rem !important;">
                        <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
                            <div>
                                <h3 class="fw-bold mb-1 text-dark" id="nombreEmprendedor">...</h3>
                                <p class="text-muted fw-medium mb-0">Línea Base: <span id="tipoLineaBase" class="badge bg-light text-secondary border px-2 py-1 ms-1 text-uppercase">...</span></p>
                            </div>
                            <div class="text-md-end mt-3 mt-md-0">
                                <span class="badge bg-transparent text-primary px-0 text-md-end d-flex align-items-center justify-content-center justify-content-md-end gap-2" style="font-size: 0.9rem; font-weight: 500;">
                                    <i class="ti ti-calendar-event fs-5"></i> Actualizado el <span id="fechaCreacion">...</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contenedor del Formulario -->
            <div id="form-container-wrapper">
                <!-- Se inyecta por JS -->
            </div>
            
        </div>
    </div>
</div>

<!-- Loader -->
<div id="lb-loader" class="text-center py-5 my-5">
    <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
        <span class="visually-hidden">Cargando...</span>
    </div>
    <p class="mt-3 text-muted fw-semibold">Cargando información editable...</p>
</div>
