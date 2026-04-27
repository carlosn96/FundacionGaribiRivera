<?php

include_once '../../../../../loader.php';

class InstructorAPI extends API {

    function recuperarInstructor() {
        
        
        $this->enviarRespuesta([
            "instructor" => ($admin = getAdminTaller())->recuperarInstructor($id = $this->getData("id")),
            "talleres" => $admin->listarTalleresPorInstructor($id)
        ]);
    }
}

InstructorAPI::start();
