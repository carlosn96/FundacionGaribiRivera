<style>
/* Minimal branding-aware module styles */
.anim-slide-up { animation: lbSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; transform: translateY(20px); }
@keyframes lbSlideUp { to { opacity: 1; transform: translateY(0); } }

.hover-lift { transition: transform .18s ease, box-shadow .18s ease; }
.hover-lift:hover { transform: translateY(-3px); box-shadow: var(--bs-box-shadow-sm, 0 4px 15px rgba(0,0,0,0.03)) !important; }

.icon-box { width:48px; height:48px; display:inline-flex; align-items:center; justify-content:center; border-radius: calc(var(--bs-border-radius-sm, .5rem)); }

.inicial { background: linear-gradient(135deg, rgba(var(--bs-primary-rgb,24,63,55),1), rgba(var(--bs-primary-rgb,24,63,55),0.85)) !important; color: white; }
.final { background: linear-gradient(135deg, rgba(var(--bs-success-rgb,17,153,142),1), rgba(var(--bs-success-rgb,17,153,142),0.85)) !important; color: white; }
</style>

<div class="container-fluid py-4" id="linea-base-module">
    <!-- Contenedor principal (Se oculta hasta que carga js) -->
    <div id="lb-main-container" style="display: none;">
        <div class="row g-4 mb-5">
            <!-- Sidebar / Columna Izquierda -->
            <div class="col-lg-4 col-xl-3">
                <aside class="card border-0 shadow-sm rounded-4 sticky-top text-center p-4 bg-white" style="top: 2rem; z-index: 10;">
                    <img id="lb-profile-img" class="rounded-circle mx-auto mb-3 shadow-sm object-fit-cover" 
                         style="width: 140px; height: 140px; border: 4px solid #fff; background-color: var(--bs-body-bg);" src="" alt="Perfil">
                    
                    <div class="mb-3">
                        <span id="lb-badge-tipo" class="badge rounded-pill px-3 py-2 text-uppercase fw-bold shadow-sm inicial" style="letter-spacing: 0.05em;">Inicial</span>
                    </div>
                    
                    <h3 id="lb-profile-name" class="fw-bold mb-1 text-dark">...</h3>
                    <p class="text-muted small mb-4">Línea base actualizada el <br><strong id="lb-date-val">...</strong></p>
                    
                    <button class="btn btn-outline-primary w-100 fw-medium d-flex align-items-center justify-content-center gap-2 rounded-3 hover-lift" onclick="descargarLineaBase()">
                        <i class="ti ti-download fs-5"></i> Descargar PDF
                    </button>

                    <ul id="lb-nav-menu" class="nav nav-pills flex-column text-start mt-4 gap-1">
                        <!-- Generados dinámicamente -->
                    </ul>
                </aside>
            </div>

            <!-- Sections Area / Columna Derecha -->
            <div class="col-lg-8 col-xl-9">
                <main id="lb-content-area" class="d-flex flex-column gap-4">
                    <!-- Cards inyectadas por js -->
                </main>
            </div>
        </div>
    </div>
    
    <!-- Esqueleto de carga -->
    <div id="lb-loader" class="text-center py-5 my-5">
        <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
            <span class="visually-hidden">Cargando...</span>
        </div>
        <p class="mt-3 text-muted fw-semibold">Preparando información...</p>
    </div>
</div>

<template id="tmpl-section">
    <section class="lb-section card border-0 shadow-sm rounded-4 bg-white anim-slide-up">
        <div class="card-body p-4 p-md-5">
            <div class="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
                <div class="lb-section-icon icon-box bg-light text-primary fs-3"><i></i></div>
                <h4 class="lb-section-title fw-bold mb-0 text-dark"></h4>
            </div>
            <div class="lb-data-grid row g-3"></div>
        </div>
    </section>
</template>

<template id="tmpl-data-item">
    <div class="lb-data-item col-sm-6 col-xxl-4">
        <div class="card h-100 hover-lift border border-light-subtle rounded-3 bg-light">
            <div class="card-body p-3">
                <div class="lb-data-label d-flex align-items-center gap-2 text-muted mb-2 text-uppercase" style="font-size: 0.75rem; letter-spacing: 0.05em; font-weight: 600;">
                    <i></i> <span class="label-text"></span>
                </div>
                <div class="lb-data-value-wrapper">
                    <p class="lb-data-value mb-0 fw-medium text-dark fs-6"></p>
                </div>
            </div>
        </div>
    </div>
</template>