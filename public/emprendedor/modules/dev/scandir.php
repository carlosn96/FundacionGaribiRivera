<?php

include '../../../../loader.php';


$fotografia = Util::obtenerFotografiaRand();

$img64 = base64_encode(file_get_contents($fotografia));



//echo base64_decode($data);

?>

<img src="data:image/jpeg;base64,<?=$img64?>"  class="img-usuario" alt="img-usuario">