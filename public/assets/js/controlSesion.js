window.usuario = {};
$(document).ready(function () {
    print("Validando sesión ...");
    crearPeticion("../../../../controller/RevisorSesion.php", {"case": "verificarSesion"}, function (res) {
        //print(res);
        // print(window.location.pathname);
        const inicioSesionPath = res.root;
        const isSesionActiva = res.sesionActiva;
        const urlUsuario = res.url;
        const currentPath = window.location.pathname;
        window.usuario = res.usuario;
        //print(window.usuario);
        $(document).trigger('usuarioInicializado');
        if (currentPath.endsWith("index/modules/inicio/")) {// En la página de inicio de sesión
            if (isSesionActiva && !currentPath.endsWith(urlUsuario)) {
                redireccionar("../../../" + urlUsuario); // Si la sesión está activa, redirigir al módulo correspondiente
            }
        } else { // En otra página, diferente a la de inicio de sesión
            if (!isSesionActiva) {// Si la sesión no está activa, redirigir al inicio de sesión
                if (!currentPath.endsWith(inicioSesionPath)) {
                    redireccionar(inicioSesionPath);
                }
            }
        }
    });

    ready();
});

function cerrarSesion() {
    crearPeticion("../../../../controller/RevisorSesion.php", {"case": "cerrarSesion"}, refresh);
}