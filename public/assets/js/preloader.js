// Preloader management script
$(document).ready(function () {
    var preloader = document.querySelector(".preloader");
    if (preloader) {
        preloader.classList.add('hidden');
    }
});

// Fallback: hide preloader after 10 seconds if not hidden
setTimeout(function() {
    var preloader = document.querySelector(".preloader");
    if (preloader && !preloader.classList.contains('hidden')) {
        preloader.classList.add('hidden');
    }
}, 10000);