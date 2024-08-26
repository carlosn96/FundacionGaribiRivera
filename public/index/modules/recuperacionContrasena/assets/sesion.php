<?php

$correoElectronico = $_SESSION['correoElectronico'] ?? "";
if (!strlen($correoElectronico)) {
    echo header("Location: ../");
}