<?php

include_once '../../../../../loader.php';

class EmprendedorAPI extends API {

    public function recuperarEventos() {
        $eventos = [];
        foreach (array_slice(array_reverse($this->extraerEventos()), 0, 3) as $evento) {
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

        $this->enviarRespuesta($eventos);
    }

    private function extraerEventos() {
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

        return json_decode($response, true)["events"];
    }
}

Util::iniciarAPI("EmprendedorAPI");
