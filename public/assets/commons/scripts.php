<script src="../../../assets/libs/jquery/jquery-3.7.1.min.js"></script>
<script src="../../../assets/js/vendor.min.js"></script>
<!-- Import Js Files -->
<script src="../../../assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
<script src="../../../assets/libs/simplebar/dist/simplebar.min.js"></script>
<script src="../../../assets/js/theme/app.init.js"></script>
<script src="../../../assets/js/theme/theme.js"></script>
<script src="../../../assets/js/theme/app.min.js"></script>
<script src="../../../assets/js/theme/sidebarmenu.js"></script>
<script src="../../../assets/js/theme/feather.min.js"></script>

<!-- Datatables -->
<script src="../../../assets/libs/datatables.net/js/jquery.dataTables.min.js"></script>
<script src="../../../assets/libs/datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js"></script>
<script src="../../../assets/libs/datatables.net/buttons/2.4.2/js/buttons.html5.min.js"></script>
<script src="../../../assets/libs/datatables.net/buttons/2.4.2/js/buttons.print.min.js"></script>
<script src="../../../assets/libs/jszip/3.10.1/jszip.min.js"></script>
<script src="../../../assets/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
<script src="../../../assets/libs/pdfmake/0.1.53/vfs_fonts.js"></script>

<!-- Utilidades -->
<script src="../../../assets/libs/dropzone/dist/min/dropzone.min.js"></script>
<script src="../../../assets/libs/select2/dist/js/select2.full.min.js"></script>
<script src="../../../assets/libs/select2/dist/js/select2.min.js"></script>
<script src="../../../assets/libs/block-ui/jquery.blockUI.js"></script> 
<script src="../../../assets/libs/inputmask/dist/jquery.inputmask.min.js"></script>

<!-- solar icons -->
<script src="../../../assets/libs/iconify/iconify-icon.min.js"></script>

<script src="../../../assets/libs/jquery-steps/build/jquery.steps.min.js"></script>
<script src="../../../assets/libs/jquery-validation/dist/jquery.validate.min.js"></script>
<script src="../../../assets/libs/jvectormap/jquery-jvectormap.min.js"></script>
<script src="../../../assets/libs/apexcharts/dist/apexcharts.min.js"></script>
<script src="../../../assets/libs/sweetalert2/dist/sweetalert2.min.js"></script>
<script src="../../../assets/js/util.js"></script>
<script src="../../../assets/js/form-wizard.js"></script>
<script src="../../../assets/js/controlSesion.js"></script>



<script>
    function inicializarPerfil() {
        
        const datos = window.usuario;
        //print(datos);
        if (datos) {
            const nombreCompleto = `${datos.nombre} ${datos.apellidos}`;
            const rol = datos.tipo_usuario.rol;
            const correoElectronico = datos.correo_electronico;
            $('.profile-name-full').text(nombreCompleto);
            $('.profile-role').text(rol);
            $('.profile-email').text(correoElectronico);
            // menú
            $('.profile-name').text(datos.nombre);
            $('.profile-subtext').text(rol);
            $('.profile-name-full').text(nombreCompleto);
            $('.profile-subtextH').text(rol);
            // detalles
            $('.profile-name-fullD').text(nombreCompleto);
            $('.profile-nameD').text(nombreCompleto);
            $('.profile-roleD').text(rol);
            $('.profile-emailD').text(correoElectronico);
            $('.profile-nameSB').text(nombreCompleto);
            $('.img-usuario').each(function () {
                $(this).attr('src', $(this).attr('src') + datos.fotografia);
            });
            //$("urlPerfil1").attr("href", datos.id_tipo_usuario === 1 ? "perfil" : "");
        } else {
            console.error("Usuario no está definido.");
        }
    }
    $(document).ready(function () {
        $(document).on('usuarioInicializado', inicializarPerfil);
    });
</script>

