<!doctype html>
<html lang="es">
    <?php
    include_once '../../includes/head.php';
    ?>

    <body>
        <!--  Body Wrapper -->
        <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
             data-sidebar-position="fixed" data-header-position="fixed">
            <!-- Sidebar Start -->
            <?php
            include_once '../../includes/aside.php';
            ?>
            <!--  Sidebar End -->
            <!--  Main wrapper -->
            <div class="body-wrapper">
                <!--  Header Start -->
                <?php
                include_once '../../includes/header.php';
                ?>
                <!--  Header End -->    
                <div class="container-fluid">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title fw-semibold mb-4">Nuevo docente</h5>
                            <form id="profesorForm">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control border border-primary" id="nombre" name="nombre" placeholder="Nombre" required>
                                    <label for="nombre">
                                        <i class="ti ti-user me-2 fs-4 text-primary"></i>
                                        <span class="border-start border-primary ps-3">Nombre</span>
                                    </label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control border border-primary" id="apellido" name="apellidos" placeholder="Apellidos" required>
                                    <label for="apellido">
                                        <i class="ti ti-user-plus me-2 fs-4 text-primary"></i>
                                        <span class="border-start border-primary ps-3">Apellidos</span>
                                    </label>
                                </div>
                                <div class="input-group mb-3">
                                    <input class="form-control border border-primary" id="correo" name="correo" placeholder="Correo institucional" required>
                                    <span class="input-group-text" id="correo">@</span>
                                    <input type="text" class="form-control border border-primary" id="dominio" name="dominio" readonly value="universidad-une.com" placeholder="Dominio">
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control border border-primary" id="perfilProfesional" name="perfil_profesional" placeholder="Perfil Profesional" required>
                                    <label for="perfilProfesional">
                                        <i class="ti ti-briefcase me-2 fs-4 text-primary"></i>
                                        <span class="border-start border-primary ps-3">Perfil Profesional</span>
                                    </label>
                                </div>
                                <div class="d-md-flex align-items-center">
                                    <div class="mt-3 mt-md-0 ms-auto">
                                        <button type="submit" class="btn btn-primary hstack gap-6">
                                            <i class="ti ti-send me-2 fs-4"></i>
                                            Guardar docente
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title mb-4 pb-2">Listado de Docentes activos en la Universidad</h4>
                            <div class="table-responsive pb-4" id="tabContent">
                                
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <?php
            include_once '../../includes/script.php';
            ?>
            <script src="api/docente.js"></script>
    </body>

</html>