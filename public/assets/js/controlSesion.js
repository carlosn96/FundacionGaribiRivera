window.usuario = {};
$(document).ready(function () {
    print("Validando sesión ...");
    crearPeticion("../../../../controller/RevisorSesion.php", {"case": "verificarSesion"}, function (res) {
        print(res);
        const usuario = res.usuario;
        const inicioSesionPath = res.root;
        const isSesionActiva = res.sesionActiva;
        const urlUsuario = usuario ? res.usuario.tipo_usuario.url : null;
        const currentPath = window.location.pathname;
        window.usuario = usuario;
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