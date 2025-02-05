
<?php

function inicializarPlantilla($dir, $aside, $scripts = []) {
    ?>
    <!DOCTYPE html>
    <html lang="es" dir="ltr" data-bs-theme="light" data-color-theme="Blue_Theme">
        <head>
            <?php
            // Incluir archivo de la cabecera
            include '../../../assets/commons/head.php';
            ?>
        </head>
        <body>
            <!-- Preloader -->
            <?php
            include '../../../assets/commons/preloader.php';
            ?>

            <div id="main-wrapper">
                <!-- Sidebar Start -->
                <?php
                include $aside;
                ?>
                <!-- Sidebar End -->

                <div class="page-wrapper">
                    <div class="body-wrapper">
                        <div class="container-fluid">
                            <header class="topbar sticky-top">
                                <div class="with-vertical">
                                    <!-- Start Vertical Layout Header -->
                                    <?php
                                    include '../../../assets/commons/header.php';
                                    ?>
                                    <!-- End Vertical Layout Header -->
                                    <!-- Mobile Navbar -->
                                    <?php
                                    // Si deseas habilitar la barra de navegación móvil, puedes descomentar esta línea
                                    // include '../../../assets/commons/mobilenavbar.php';
                                    ?>
                                </div>
                            </header>

                            <main>
                                <div class="row">
                                    <div class="align-items-stretch">
                                        <!-- Incluir contenido específico de la página -->
    <?php include_once $dir . "/content.php"; ?>
                                    </div>
                                </div>
                            </main>

                            <!-- Incluir footer -->
    <?php include '../../../assets/commons/footer.php'; ?>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Incluir scripts generales -->
            <?php
            include '../../../assets/commons/scripts.php';
            ?>

            <!-- Incluir scripts adicionales, si los hay -->
            <?php
            foreach ($scripts as $script) {
                echo '<script src="' . $script . '"></script>';
            }
            ?>
        </body>
    </html>
    <?php
}
