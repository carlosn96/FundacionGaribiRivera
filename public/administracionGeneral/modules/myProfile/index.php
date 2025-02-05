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
                                    <h2 class="text-dark pb-2">Edición del perfil</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="page-inner mt--5">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h4 class="card-title text-center">Información de usuario</h4>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-4 border-right">
                                                <div class="d-flex flex-column align-items-center text-center p-3 ">
                                                    <img class="rounded-circle mt-5" width="150px" id="profile-picture" src="<?= $usuario["fotografia"] ?>">
                                                    <span class="font-weight-bold" id="nombreCompleto"><?= $usuario["nombreCompleto"] ?></span>
                                                    <span class="text-black-50" id="mailDescripcion"><?= $usuario["correoElectronico"] ?></span>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="input-group">
                                                        <div class="custom-file">
                                                            <input type="file" class="custom-file-input" id="fotografia" name="fotografia" accept=".jpg, .jpeg, .png">
                                                            <label class="custom-file-label" for="fotografia" id="fotografiaLabel">Elige fotografía</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mt-5 text-center">
                                                    <button class="btn btn-outline-info" data-toggle="modal" data-target="#exampleModalCenter">
                                                        <span class="btn-label">
                                                            <i class="fas fa-user-lock"></i>
                                                        </span>
                                                        Modificar contraseña
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-md-8 border-right">
                                                <form id="formPerfil">
                                                    <input  id="idUsuario" hidden="" name="idUsuario"  value="<?= $usuario["identificadorUsuario"] ?>">
                                                    <input  id="idAccesoUsuario" hidden=" " name="idAccesoUsuario" value="<?= $usuario["identificadorAcceso"] ?>">
                                                    <input  id="contrasenia" hidden name="contrasenia" value="<?= $usuario["contrasenia"] ?>">
                                                    <div class="p-3 py-5">
                                                        <div class="d-flex justify-content-between align-items-center mb-3">
                                                            <h4 class="text-right">Configuración del Perfil</h4>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <div class="col-md-6"><label class="labels">Nombre</label>
                                                                <input type="text" class="form-control" placeholder="Nombre" name="nombre" value="<?= $usuario["nombre"] ?>">
                                                            </div>
                                                            <div class="col-md-6">
                                                                <label class="labels">Apellidos</label>
                                                                <input type="text" class="form-control" name="apellidoPaterno" placeholder="Apellidos" value="<?= $usuario["apellidoPaterno"] ?>">
                                                            </div>
                                                        </div>
                                                        <div class="row mt-3">
                                                            <div class="col-md-12">
                                                                <label class="labels">Correo electrónico</label>
                                                                <input type="email" class="form-control" placeholder="Correo electrónico" name="correoElectronico" value="<?= $usuario["correoElectronico"] ?>">
                                                            </div>
                                                        </div>
                                                        <div class="row mt-3">
                                                            <div class="col-md-4">
                                                                <label class="labels">Teléfono móvil</label>
                                                                <input type="tel" class="form-control" placeholder="Número de teléfono" name="telefono" id="telefono" value="<?= $usuario["telefonoMovil"] ?>">
                                                            </div>
                                                            <div class="col-md-4">
                                                                <label class="labels">Fecha de nacimiento</label>
                                                                <input type="date" class="form-control" name="fechaNacimiento" value="<?= $usuario["fechaNacimiento"] ?>">
                                                            </div>
                                                            <div class="col-md-4">
                                                                <input hidden id="generoSelect" value="<?= $usuario["genero"] ?>">
                                                                <label class="labels">Género</label>
                                                                <select class="form-control" id="genero" required name="genero" >
                                                                    <option value="H">Hombre</option>
                                                                    <option value="M">Mujer</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="mt-5 text-center">
                                                            <button type="submit" class="btn btn-primary profile-button" type="button"><span class="btn-label"><i class="fa fa-save"></i></span> Guardar </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered" role="document">
                                            <form class="form-inline" id="formContraseña">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalLongTitle">Modificar contraseña</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <input type="password" hidden value="<?= $usuario["contrasenia"] ?>" name="contraseniaHash" id="contraseniaHash">
                                                        <div class="form-group">
                                                            <label for="contraseniaActual">Contraseña actual</label>
                                                            <input type="password" id="contraseniaActual" name="contraseniaActual" class="form-control mx-sm-3" required="">
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="contraseniaNueva">Contraseña nueva</label>
                                                            <input type="password" id="contraseniaNueva" name="contraseniaNueva" class="form-control mx-sm-3" required="">
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                                        <button type="submit" class="btn btn-info"><span class="btn-label"><i class="fa fa-save"></i></span>Cambiar</button>
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
                <?php include("../includes/footer.php") ?>
            </div>
            <?php include("../includes/lib-footer.php") ?>
            <script src="action/myProfile.js"></script>

    </body>
</html>