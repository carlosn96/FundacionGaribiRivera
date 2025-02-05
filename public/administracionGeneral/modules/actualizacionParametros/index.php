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
                    <div class="panel-header bg-primary-gradient">
                        <div class="page-inner py-5">
                            <div class="d-flex align-items-left align-items-md-center flex-column flex-md-row">
                                <div>
                                    <h2 class="text-white pb-2">Actualización de Parámetros</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="page-inner mt--5">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <button class="btn btn-outline-info btn-round btn-lg" data-toggle="modal" data-target="#modalAgregarCampo">
                                                    <span class="btn-label">
                                                        <i class="fas fa-plus"></i>
                                                    </span>
                                                    Agregar nuevo campo
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-header text-center">
                                        <h4 class="card-title">Ficha de Inscripción</h4>
                                    </div>
                                    <div class="card-body">
                                        <div class="row mt-2">
                                            <div class="col-md-4">
                                                <label>Estado civil</label>
                                                <div id="inputGroupEstadoCivil">
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <label>Grado de estudios</label>
                                                <div id="inputGroupGradoEstudios">
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <label>¿Cómo conoció a la Fundación?</label>
                                                <div id="inputGroupMedioConocimiento">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-4">
                                                <label>Ocupación actual</label>
                                                <div id="inputGroupOcupacionActual">
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <label>El crédito lo utilizarías para:</label>
                                                <div id="inputGroupUtilidadCredito">
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <label>Tipo de asentamiento (Domicilio)</label>
                                                <div id="inputGroupTipoAsentamiento">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-12">
                                                <label>¿Qué estrategias utilizas para incrementar tus ventas?</label>
                                                <div id="inputGroupEstrategiaVentas">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-header text-center">
                                        <h4 class="card-title">Estudio Socioeconomico</h4>
                                    </div>
                                    <div class="card-body">

<!--                                        <div class="row mt-2">
                                            <div class="col-md-12">
                                                <label>Información diocesana</label>
                                            </div>

                                        </div>
                                        <div class="row mt-2">

                                            <div class="col-md-4">
                                                <label>Vicaria</label>
                                                <div id="inputGroupVicaria">
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <label>Decanato</label>
                                                <div id="inputGroupDecanato">
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <label>Comunidad parroquial</label>
                                                <div id="inputGroupComunidadParroquial">
                                                </div>
                                            </div>
                                        </div>-->
                                        <div class="row mt-2">
                                            <div class="col-md-6">
                                                <label>Condición de la vivienda</label>
                                                <div id="inputGroupCondicionVivienda">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <label>Tipo de vivienda</label>
                                                <div id="inputGroupTipoVivienda">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row mt-2">
                                            <div class="col-md-6">
                                                <label>La vivienda es para:</label>
                                                <div id="inputGroupViviendaPara">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <label>La vivienda se utiliza como:</label>
                                                <div id="inputGroupUtilizacionVivienda">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-12">
                                                <label>Ventajas del negocio sobre la competencia</label>
                                                <div id="inputGroupVentajasCompetencia">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-12">
                                                <label>Tipo de vulnerabilidad encontrada: </label>
                                                <div id="inputGroupVulnerabilidad">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="modalAgregarCampo" role="dialog" aria-hidden="true">
                        <div class="modal-dialog " role="document">
                            <form id="formCampoNuevo">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLongTitle">Campo nuevo</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="form-group form-floating-label">
                                            <select name="tipoCampo" class="form-control input-border-bottom" id="campoNuevoSelect" required>
                                            </select>
                                            <label for="campoNuevoSelect" class="placeholder">Elige tipo de campo</label>
                                        </div>
                                        <div class="form-group form-floating-label">
                                            <input id="campo" name="campo" type="text" class="form-control input-border-bottom" required>
                                            <label for="campo" class="placeholder" >Valor del campo</label>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-info" data-dismiss="modal">Cancelar</button>
                                        <button type="submit" class="btn btn-success"><span class="btn-label"><i class="fa fa-save"></i></span>Guardar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div class="modal fade" id="modalEditarCampo" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <form id="formActualizarCampo">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="title"></h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <button type="button" data-toggle="tooltip" data-placement="top" title="" class="btn btn-danger btn-icon" data-original-title="" id="btnEliminarCampo">
                                                    <span class="btn-label">
                                                        <i class="fas fa-trash-alt"></i>
                                                    </span>
                                                </button>
                                            </div>
                                            <input name="campoEditar" id="campoEditar" class="form-control" required>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                                        <button type="submit" class="btn btn-success"><span class="btn-label"><i class="fa fa-save"></i></span>Actualizar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <?php include("../includes/footer.php") ?>
            </div>
        </div>
        <?php include("../includes/lib-footer.php") ?>
        <script src="action/actualizacionParametros.js"></script>

    </body>
</html>