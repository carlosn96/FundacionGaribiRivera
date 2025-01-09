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
                    <?php
                    include_once '../../includes/selectorCarrera.php';
                    ?>
                    <div class="col-md-12 col-lg-12">
                        <div class="card border-primary">
                            <div class="card-body">
                                <h4 class="card-title text-primary mb-3">Crear nuevo grupo</h4>
                                <p class="card-subtitle mb-4 text-muted">Completa los siguientes campos para crear un grupo.</p>
                                <form id="grupoForm">
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control border border-primary" id="claveGrupo" name="clave" placeholder="Clave del Grupo" required>
                                        <label for="claveGrupo">
                                            <i class="ti ti-key me-2 fs-4 text-primary"></i>
                                            Clave del Grupo
                                        </label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control border border-primary" id="seudonimo" name="seudonimo" placeholder="Seudónimo">
                                        <label for="seudonimo">
                                            <i class="ti ti-user-bolt me-2 fs-4 text-primary"></i>
                                            Seudónimo (Opcional)
                                        </label>
                                    </div>
                                    <!-- Botón de enviar -->
                                    <div class="d-md-flex align-items-center">
                                        <div class="mt-3 mt-md-0 ms-auto">
                                            <button type="submit" class="btn btn-primary hstack gap-2">
                                                <i class="ti ti-check me-2 fs-4"></i>
                                                Crear Grupo
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12">
                        <div class="card border-primary">
                            <div class="card-body p-4">
                                <h4 class="card-title text-primary mb-3">Listado de grupos</h4>
                                <div class="table-responsive mb-4 border rounded-1" id="tabContent">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <?php
        include_once '../../includes/script.php';
        ?>
        <script src="api/grupos.js"></script> 
    </body>

</html>