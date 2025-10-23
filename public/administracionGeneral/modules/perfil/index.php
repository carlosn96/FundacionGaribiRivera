
<!DOCTYPE html>
<html lang="en">
    <head>
        <?php
        // Incluir archivo de la cabecera
        include '../../../assets/commons/head.php';
        ?>
    </head>
    <body data-background-color="bg3">
        <div class="wrapper">
            <?php
            include("../../../assets/commons/header.php");
            
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
                                        <form id="formPerfil">
                                            <input hidden id="idUsuario" name="idUsuario"  value="<?= isset($_GET["idUsuario"]) ? $_GET["idUsuario"] : null ?>">
                                            <input hidden id="idAccesoUsuario" name="idAccesoUsuario">
                                            <div class="card card-profile">
                                                <div class="card-header bg-dark2">
                                                    <div class="profile-picture">
                                                        <div class="avatar avatar-xxl">
                                                            <img id="profile-picture" src="../../recursos/img/perfil/no-foto-H.jpeg" alt="..." class="avatar-img rounded-circle">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card-body bg-grey2">
                                                    <div class="row mt-3">
                                                        <div class="col-md-12">
                                                            <div class="input-group">
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input" id="fotografia" name="fotografia" accept=".jpg, .jpeg, .png">
                                                                    <label class="custom-file-label" for="fotografia" id="fotografiaLabel">Elige fotografía</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row mt-3">
                                                        <div class="col-md-12">
                                                            <div class="form-group form-group-default">
                                                                <label>Tipo de Usuario</label>
                                                                <select class="form-control" id="tipoUsuario" required name="tipoUsuario">
                                                                    <option value="2">Administrador General</option>
                                                                    <option value="4">Asistente de Recuperación de Apoyos</option>
                                                                    <option value="5">Asistente de Proyectos</option>
                                                                    <option value="6">Asistente de Trabajo Social</option>
                                                                </select>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div class="row mt-3">
                                                        <div class="col-md-6">
                                                            <div class="form-group form-group-default">
                                                                <label>Nombre</label>
                                                                <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Nombre" required>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group form-group-default">
                                                                <label>Apellidos</label>
                                                                <input type="text" class="form-control" name="apellidoPaterno" id="apellidoPaterno" placeholder="Apellidos" required>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row mt-3">
                                                        <div class="col-md">
                                                            <div class="form-group form-group-default">
                                                                <label>Correo electrónico</label>
                                                                <input type="email" class="form-control" name="correoElectronico" id="correoElectronico" placeholder="somebody@example.com" required>
                                                            </div>
                                                        </div>
                                                        <div class="col-md" id="tabContrasenia">
                                                            <div class="form-group form-group-default">
                                                                <label>Contraseña</label>
                                                                <input type="password" class="form-control" name="contrasenia" id="contrasenia" placeholder="**************" required>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row mt-3">
                                                        <div class="col-md-4">
                                                            <div class="form-group form-group-default">
                                                                <label>Fecha de nacimiento</label>
                                                                <input type="date" class="form-control" id="fechaNacimiento" name="fechaNacimiento" required>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <div class="form-group form-group-default">
                                                                <label>Género</label>
                                                                <select class="form-control" id="genero" required name="genero">
                                                                    <option value="H">Hombre</option>
                                                                    <option value="M">Mujer</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <div class="form-group form-group-default">
                                                                <label>Teléfono</label>
                                                                <input type="text" class="form-control" name="telefono" id="telefono" placeholder="00 00 00 00 00" required>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="text-right mt-3 mb-3">
                                                        <button type="submit" class="btn btn-success">
                                                            <span class="btn-label">
                                                                <i class="fa fa-check"></i>
                                                            </span>Guardar
                                                        </button>
                                                        <a class="btn btn-default" href="../inicio/">
                                                            <span class="btn-label">
                                                                <i class="fas fa-arrow-alt-circle-left"></i>
                                                            </span>
                                                            Regresar
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <?php include("../../../assets/commons/footer.php") ?>
            </div>
            <?php
        include '../../../assets/commons/scripts.php';
        ?>
            <script src="action/perfil.js"></script>

    </body>
</html>