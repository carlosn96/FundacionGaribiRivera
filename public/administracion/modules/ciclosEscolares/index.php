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
                            <h2 class="text-center mb-5">Administración de Ciclos Escolares</h2>
                            <form id="agregarCicloEscolarForm">
                                <h5 class="fw-semibold mb-4">Agregar nuevo</h5>
                                <div class="mb-3">
                                    <label for="anio" class="form-label">Año</label>
                                    <input id="anio" name="anio" required="" class="form-control">
                                </div>
                                <div class="mb-3">
                                    <label for="ciclo" class="form-label">Ciclo</label>
                                    <select id="ciclo" required="" name="ciclo" class="form-control">
                                        <option>A</option>
                                        <option>B</option>
                                        <option>C</option>
                                    </select>
                                </div>
                                <button type="submit" class="btn btn-outline-primary">Guardar</button>
                            </form>
                        </div>
                    </div>
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title fw-semibold mb-4">Lista de Ciclos escolares</h5>
                            <div class="table-responsive">
                                <table class="table table-striped" id="tablaPlanteles">
                                    <thead>
                                        <tr>
                                            <th>Ciclo escolar</th>
                                            <th class="text-center">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyCiclosEscolares">
                                        <!-- Aquí se agregarán las filas de la tabla dinámicamente -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="modalEditarPlantel" tabindex="-1" aria-labelledby="modalEditarPlantelLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalEditarPlantelLabel">Editar Nombre del Plantel</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form id="formEditarPlantel">
                                <input hidden="" id="idCiclo" name="idCiclo">
                                <div class="modal-body">
                                    <div class="mb-3">
                                        <label for="anioEditar" class="form-label">Nuevo año</label>
                                        <input class="form-control" id="anioEditar" name="anioEditar" required>
                                    </div>
                                    <div class="mb-3">
                                    <label for="cicloEditar" class="form-label">Ciclo</label>
                                    <select id="cicloEditar" required="" name="cicloEditar" class="form-control">
                                        <option>A</option>
                                        <option>B</option>
                                        <option>C</option>
                                    </select>
                                </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="submit" class="btn btn-primary">Guardar cambios</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
        include_once '../../includes/script.php';
        ?>
        <script src="api/cicloEscolar.js"></script> 
    </body>

</html>