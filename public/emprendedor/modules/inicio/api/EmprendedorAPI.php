<?php

include_once '../../../../../loader.php';

class EmprendedorAPI extends API {

    public function obtenerInfoPerfil() {
        $this->enviarRespuesta(Sesion::obtenerUsuarioActual());
    }

}

Util::iniciarAPI("EmprendedorAPI");
/*
function reescribir() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {


        $nombre_completo = ($_POST['nombre_completo']);
        $genero = ($_POST['genero']);
        $fecha_nacimiento = ($_POST['fecha_nacimiento']);
        $edad = ($_POST['edad']);
        $correo_electronico = ($_POST['correo_electronico']);
        $telefono = ($_POST['telefono']);
        $calle_numero = ($_POST['calle_numero']);
        $colonia = ($_POST['colonia']);
        $cp = ($_POST['codigo_postal']);
        $municipio = ($_POST['municipio']);
        $estado = ($_POST['estado']);
        $parroquia = ($_POST['parroquia']);
        $escolaridad = ($_POST['escolaridad']);
        $discapacidad = ($_POST['discapacidad']);
        $e_civil = ($_POST['estado_civil']);
        $ingreso_mensual = ($_POST['ingreso_mensual']);
        $ocupacion = ($_POST['ocupacion']);
        $calle_numero_negocio = ($_POST['calle_numero_negocio']);
        $colonia_negocio = ($_POST['colonia_negocio']);
        $codigo_postal = ($_POST['codigo_Postal']);
        $municipio_negocio = ($_POST['municipio_negocio']);
        $estado_negocio = ($_POST['estado_negocio']);
        $telefono_negocio = ($_POST['telefono_negocio']);
        $antiguedad_negocio = ($_POST['antiguedad_Negocio']);
        $num_empleados = ($_POST['num_Empleados']);
        $giro_negocio = ($_POST['giro_Negocio']);
        $otro_giro = ($_POST['otro_Giro']);
        $principal_actividad = ($_POST['principal_Actividad']);
        $otra_actividad = isset($_POST['otra_Actividad_Input']);
        $tiene_competencia = isset($_POST['si_Competencia']);
        $tiene_sueldo_negocio = isset($_POST['si_Sueldo']);
        $conoce_utilidad_negocio = isset($_POST['si_Utilidad']);
        $competencia_input = isset($_POST['competencia_InputText']);
        $ingresos_personales = $_POST['ingresos_Personales'];
        $ingresos_familiares = $_POST['ingresos_Familiares'];
        $estrategias_ventas = isset($_POST['estrategias_Ventas']);
        $otras_estrategias = isset($_POST['otrasEstrategiasInput']);
        $productos_utilidad = isset($_POST['productosUtilidad']);
        $utilidades_negocio = isset($_POST['utilidadesNegocio']);
        $punto_equilibrio = isset($_POST['puntoEquilibrio']);
        $gastos_separados = isset($_POST['gastosSeparados']);
        $presupuesto_negocio = isset($_POST['presupuestoNegocio']);
        $clientes_negocio = $_POST['clientes_Negocio'];
        $ventajas_negocio = $_POST['ventajas_Negocio'];
        $lleva_Registros = isset($_POST['lleva_Registros']);
        $ventas_Mensuales = $_POST['ventas_Mensuales'];
        $gastos_Mensuales = $_POST['gastos_Mensuales'];
        $utilidades_Mensuales = $_POST['utilidades_Mensuales'];
        $sueldo_Mensual = $_POST['sueldo_Mensual'];
        $ahorroPermanente = $_POST['ahorroPermanente'];
        $sistemaAhorro = isset($_POST['sistemaAhorro']);
        $objetivoAhorro = isset($_POST['objetivoAhorro']);
        $montoAhorroMensual = isset($_POST['montoAhorroMensual']);
        $ahorroNegocio = isset($_POST['ahorroNegocio']);

// Crear una instancia de la clase Fichainscripcion_emprendedor
        include 'Fichainscripcion_emprendedor.php';

//emprendedor
        $Ficha_emprendedor = new Fichainscripcion_emprendedor(
                $nombre_completo,
                $genero,
                $fecha_nacimiento,
                $edad,
                $correo_electronico,
                $telefono,
                $calle_numero,
                $colonia,
                $cp,
                $municipio,
                $estado,
                $parroquia,
                $escolaridad,
                $discapacidad,
                $e_civil,
                $ingreso_mensual,
                $ocupacion,
                $calle_numero_negocio,
                $colonia_negocio,
                $codigo_postal,
                $municipio_negocio,
                $estado_negocio,
                $telefono_negocio,
                $antiguedad_negocio,
                $num_empleados,
                $giro_negocio,
                $otro_giro,
                $principal_actividad,
                $otra_actividad,
                $tiene_competencia,
                $tiene_sueldo_negocio,
                $conoce_utilidad_negocio,
                $competencia_input,
                $ingresos_personales,
                $ingresos_familiares,
                $estrategias_ventas,
                $otras_estrategias,
                $productos_utilidad,
                $utilidades_negocio,
                $punto_equilibrio,
                $gastos_separados,
                $presupuesto_negocio,
                $clientes_negocio,
                $ventajas_negocio,
                $lleva_Registros,
                $ventas_Mensuales,
                $gastos_Mensuales,
                $utilidades_Mensuales,
                $sueldo_Mensual,
                $ahorroPermanente,
                $sistemaAhorro,
                $objetivoAhorro,
                $montoAhorroMensual,
                $ahorroNegocio
        );



//ahorro
// Puedes realizar operaciones adicionales aquí, como guardar en una base de datos
// Devolver una respuesta JSON
        echo json_encode($Ficha_emprendedor->toArray());
    } else {
// Devolver un mensaje de error si se accede directamente al archivo PHP sin una petición POST
        http_response_code(400);
        echo json_encode(array("message" => "Error: Método no permitido"));
    }
}
*/