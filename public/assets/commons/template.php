
<?php


function inicializarPlantilla($dir, $aside, $scripts = []) {
    ?>
    <!DOCTYPE html>
    <html lang="es" dir="ltr" data-bs-theme="light" data-color-theme="Blue_Theme">
        <head>
            <?php
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
                <!--  Sidebar End -->
                <div class="page-wrapper">
                    <div class="body-wrapper">
                        <div class="container-fluid">
                            <header class="topbar sticky-top">
                                <div class="with-vertical">
                                    <!-- ---------------------------------- -->
                                    <!-- Start Vertical Layout Header -->
                                    <!-- ---------------------------------- -->
                                    <?php
                                    include '../../../assets/commons/header.php';
                                    ?>
                                    <!-- ---------------------------------- -->
                                    <!-- End Vertical Layout Header -->
                                    <!-- ---------------------------------- -->
                                    <!--  Mobilenavbar -->
                                    <?php
                                    //include '../../../assets/commons/mobilenavbar.php';
                                    ?>
                                </div>
                            </header>
                            <main>
                                <div class="row">
                                    <div class=" align-items-stretch">
                                        <?php include_once $dir."/content.php"; ?>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
            <?php
            include '../../../assets/commons/scripts.php';
            ?>
            <?php
            foreach ($scripts as $script) {
                echo '<script src="' . $script . '"></script>';
            }
            ?>
        </body>

    </html>
    <?php
}
?>
