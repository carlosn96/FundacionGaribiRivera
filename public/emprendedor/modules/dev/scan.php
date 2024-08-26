<?php

$directorio = "codigosPostales";

$files = ["aguascalientes", "colima", "jalisco", "nayarit", "nuevo_leon"];

$total = 0;

foreach ($files as $file) {
    include "$directorio/$file.php";
    $total += count($estados["$file"]);
    echo "$file tiene " . $total . "<br>";
}



echo "en total=$total";
