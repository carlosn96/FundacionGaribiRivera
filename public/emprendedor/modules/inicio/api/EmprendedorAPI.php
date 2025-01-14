<?php

include_once '../../../../../loader.php';

class EmprendedorAPI extends API {
    
    public function recuperarNovedades() {
        $this->enviarRespuesta([
            "eventos" => $this->extraerEventos(),
            "publicaciones" => $this->extraerPublicaciones()
        ]);
    }
    

    public function extraerPublicaciones() {
        $endpoint = "https://fundaciongaribirivera.com/wp-json/wp/v2/posts";

        /* $params = [
          'status' => 'publish',
          'start_date' => '1900-01-01',
          'end_date' => Util::obtenerFechaActual("Y-m-d")
          ]; */

        $url = $endpoint /* . '?' . http_build_query($params) */;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Retorna el resultado en lugar de imprimirlo
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Desactivar verificación SSL (si es necesario)

        $response = curl_exec($ch);

        if (curl_errno($ch)) {
            echo "cURL error: " . curl_error($ch) . "\n";
            curl_close($ch);
            exit;
        }

        curl_close($ch);

        $posts = json_decode($response, true);
        $publicaciones = [];
        foreach (array_slice($posts, 0, 3) as $evento) {
            array_push($publicaciones,
                    (new Evento(
                            $evento["title"]["rendered"],
                            $evento["excerpt"]["rendered"],
                            $evento["date"],
                            $evento["link"],
                            $this->getMedia($evento["_links"]["wp:featuredmedia"][0]["href"]),
                    ))->toArray()
            );
        }
        return $publicaciones;
    }

    public function extraerEventos() {
        $endpoint = "https://fundaciongaribirivera.com/wp-json/tribe/events/v1/events";

        $params = [
            'status' => 'publish',
            'start_date' => '1900-01-01',
            'end_date' => Util::obtenerFechaActual("Y-m-d")
        ];

        $url = $endpoint . '?' . http_build_query($params);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Retorna el resultado en lugar de imprimirlo
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Desactivar verificación SSL (si es necesario)

        $response = curl_exec($ch);

        if (curl_errno($ch)) {
            echo "cURL error: " . curl_error($ch) . "\n";
            curl_close($ch);
            exit;
        }

        curl_close($ch);

        $events = json_decode($response, true)["events"];
        $eventos = [];
        foreach (array_slice(array_reverse($events), 0, 3) as $evento) {
            array_push($eventos,
                    (new Evento(
                            $evento["title"],
                            $evento["description"],
                            $evento["date"],
                            $evento["url"],
                            $evento["image"]["sizes"]["large"]["url"],
                    ))->toArray()
            );
        }

        return $eventos;
    }

    private function getMedia($mediaEndpoint) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $mediaEndpoint);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Retorna el resultado en lugar de imprimirlo
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Desactivar verificación SSL (si es necesario)

        $response = curl_exec($ch);

        if (curl_errno($ch)) {
            echo "cURL error: " . curl_error($ch) . "\n";
            curl_close($ch);
            exit;
        }

        curl_close($ch);

         return json_decode($response, true)["guid"]["rendered"];
    }
}

Util::iniciarAPI("EmprendedorAPI");
