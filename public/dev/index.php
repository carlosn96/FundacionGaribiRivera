
<?php

include_once '../../loader.php';

$endpoint = "https://fundaciongaribirivera.com/wp-json/tribe/events/v1/events";

$params = [
    'status' => 'publish', // Solo eventos publicados
    'start_date' => '2024-01-01', // Fecha inicial opcional
    'order' => 'desc', // Cambiado a descendente
    'orderby' => 'start_date' // Ordenar por fecha de inicio
];

$url = $endpoint . '?' . http_build_query($params);
//var_dump($url);
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Retorna el resultado en lugar de imprimirlo
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Desactivar verificación SSL (si es necesario)

$response = curl_exec($ch);

// Verificar si hubo errores
if (curl_errno($ch)) {
    echo "cURL error: " . curl_error($ch) . "\n";
    curl_close($ch);
    exit;
}

curl_close($ch);

// Procesar la respuesta
$respuestaJSON = json_decode($response, true);

$eventos = [];

if (isset($respuestaJSON['events']) && is_array($respuestaJSON['events'])) {
    foreach ($respuestaJSON['events'] as $evento) {

        array_push($eventos,
                (new Evento(
                        $evento["title"],
                        $evento["description"],
                        $evento["date"],
                        $evento["url"],
                        $evento["image"]["url"],
                ))->toArray()
        );
    }
} else {
    echo "No events found.\n";
}


