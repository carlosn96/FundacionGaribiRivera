// Preloader management script
function hidePreloader() {
    var preloader = document.querySelector(".preloader");
    if (preloader && !preloader.classList.contains('hidden')) {
        preloader.classList.add('hidden');
    }
}

$(document).ready(function () {
    // Retrasar la verificación para permitir que otros scripts en $(document).ready initien llamadas AJAX
    setTimeout(function() {
        if ($.active > 0) {
            // Si hay peticiones AJAX activas, esperar a que terminen todas
            $(document).one("ajaxStop", function () {
                hidePreloader();
            });
        } else {
            // Si no hay peticiones AJAX activas, ocultar inmediatamente
            hidePreloader();
        }
    }, 100);
});

// Fallback: hide preloader after 10 seconds if not hidden
setTimeout(hidePreloader, 10000);