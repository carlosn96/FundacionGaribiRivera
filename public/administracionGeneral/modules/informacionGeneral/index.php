
<!DOCTYPE html>
<html lang="en">
    <?php include("../includes/header.php"); ?>
    <body data-background-color="bg3">
        <div class="wrapper">
            <?php
            include("../includes/main-header.php");
            include("../includes/sidebar.php");
            ?>
            <div class="main-panel">
                <div class="content">
                    <div class="panel-header bg-gray-gradient">
                        <div class="page-inner py-5">
                            <div class="d-flex align-items-left align-items-md-center flex-column flex-md-row">
                                <div>
                                    <h2 class="text-dark pb-2">Información General</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="page-inner mt--5">
                        <div class="row">
                            <div class="col-md-12">

                                <div class="card">
                                    <div class="card-header bg-dark2">
                                        <h4 class="card-title text-center text-white">Fundación Cardenal Garibi Rivera</h4>
                                    </div>
                                    <div class="card-body">
                                        <div class="card card-profile">
                                            <div class="card-body bg-grey2">
                                                <div class="row mt-3">
                                                    <div class="col-md-12">
                                                        <div class="form-group form-group-default">
                                                            <label>Cuenta bancaria</label>
                                                            <div class="ml-md-auto py-2 py-md-0">
                                                                <button type="button" onclick="agregarFilaCuenta(this)" class="btn btn-outline-primary btn-round btn-sm"> <span><i class="fas fa-plus"></i></span></button>
                                                            </div>
                                                            <div class="table-responsive">
                                                                <table id="tablaCuentas" class="table dt-responsive table-sm">
                                                                    <thead class="thead-light">
                                                                        <tr>
                                                                            <th>Acciones</th>
                                                                            <th>Numero de cuenta</th>
                                                                            <th>Institución bancaria</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id="bodyTablaCuentasBancarias">
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row mt-3">
                                                    <div class="col-md-12">
                                                        <div class="form-group form-group-default">
                                                            <label>Correo electrónico</label>
                                                            <div class="ml-md-auto py-2 py-md-0">
                                                                <button type="button" onclick="agregarFilaCorreo(this)" class="btn btn-outline-primary btn-round btn-sm"> <span><i class="fas fa-plus"></i></span></button>
                                                            </div>
                                                            <div class="table-responsive">
                                                                <table id="tablaCorreos" class="table table-striped dt-responsive table-sm">
                                                                    <thead class="thead-light">
                                                                        <tr>
                                                                            <th>Acciones</th>
                                                                            <th>Correo</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id="bodyTablaCorreos">
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row mt-3">
                                                    <div class="col-md-12">
                                                        <div class="form-group form-group-default">
                                                            <label>Número de teléfono</label>
                                                            <div class="ml-md-auto py-2 py-md-0">
                                                                <button type="button" onclick="agregarFilaNumTelefono(this)" class="btn btn-outline-primary btn-round btn-sm"> <span><i class="fas fa-plus"></i></span></button>
                                                            </div>
                                                            <div class="table-responsive">
                                                                <table id="tablaNumTelefonos" class="table table-striped dt-responsive table-sm">
                                                                    <thead class="thead-light">
                                                                        <tr>
                                                                            <th>Acciones</th>
                                                                            <th>Número de teléfono</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id="bodyTablaTelefonos">
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row mt-3">
                                                    <div class="col-md-12">
                                                        <div class="form-group form-group-default">
                                                            <label>Clásula de cobranza</label>
                                                            <div class="ml-md-auto py-2 py-md-0">
                                                                <button type="button" onclick="agregarFilaClausula(this)" class="btn btn-outline-primary btn-round btn-sm"> <span><i class="fas fa-plus"></i></span></button>
                                                            </div>
                                                            <div class="table-responsive">
                                                                <table id="tablaClausulas" class="table table-striped dt-responsive table-sm">
                                                                    <thead class="thead-light">
                                                                        <tr>
                                                                            <th>Acciones</th>
                                                                            <th>Cláusula</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id="bodyTablaClausulas">
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal fade" id="modalModificarCampo" role="dialog">
                                            <div class="modal-dialog" role="document">
                                                <form id="formModalModificarTupla">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title">Modificar campo</h5>
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div class="modal-body" id="modalModificarCampoBody">

                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="submit" class="btn btn-info">Actualizar</button>
                                                            <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <?php include("../includes/footer.php") ?>

            </div>
            <?php include("../includes/lib-footer.php") ?>
            <script src="action/informacionGeneral.js"></script>

    </body>
</html>