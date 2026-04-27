<?php

require_once '../../../../../loader.php';

class AltaEmprendedoresAPI extends API
{

    private const DEFAULT_PASSWORD = 'emprendedor_';
    private const DICCIONARIO_PASSWORD = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; 
    /**
     * Maneja la creación de un emprendedor individual.
     * La acción ('case') en la petición AJAX debe ser 'crearIndividual'.
     * Los datos del se esperan en $this->data como una cadena serializada.
     * 
     * @return void
     */
    public function crearIndividual()
    {
        // La clase base API se encarga de recibir los datos de POST y los pone en $this->data.
        // Para un formulario, vienen serializados y la clase Util los convierte en array.
        $this->enviarRespuesta($this->registrarNuevaCuenta($this->getDataAll()));
    }
    private function registrarNuevaCuenta($data)
    {
        $nombre = $data["nombre"];
        $apellidos = $data["apellidos"];
        $correo = $data["correo"];
        $numeroCelular = $data["celular"];
        $contrasena = (isset($data["contrasena"]) && trim($data["contrasena"]) !== "") ? $data["contrasena"] : $this->generarContrasena();
        
        $success = getAdminUsuario()->insertarUsuario(
            $nombre,
            $apellidos,
            $correo,
            $numeroCelular,
            $contrasena,
            TipoUsuario::EMPRENDEDOR
        );
    
        $mensaje = $success ? "Se creó el registro de \"{$nombre}\" con la contraseña \"{$contrasena}\"" : "Ha ocurrido un error";
        $respuesta = Util::enum($mensaje, !$success);
        $respuesta["emprendedor"] = [
            "nombre" => $nombre,
            "apellidos" => $apellidos,
            "celular" => $numeroCelular,
            "correo" => $correo,
            "contrasena" => $contrasena
        ];
        return $respuesta;
    }

    /**
     * Maneja la creación masiva de emprendedores desde un CSV.
     * La acción ('case') en la petición AJAX debe ser 'crearMasivo'.
     * Los datos se esperan en $this->data como un array asociativo (ej: ['emprendedores' => [...] ]).
     */
    public function crearMasivo()
    {
        $emprendedores = $this->getData("emprendedores");
        if (empty($emprendedores)) {
            $this->enviarRespuesta(Util::enum("No se proporcionaron emprendedores para crear.", true));
            return;
        }
        $creados = [];
        $errores = []; 
        foreach ($emprendedores as $emprendedor) {
            $correo = $emprendedor["correo"];
            $nombre = $emprendedor["nombre"];
            $apellidos = $emprendedor["apellidos"];
            if ($this->existeCorreo($correo)) {
                $errores[] = "El correo {$correo} ya está registrado.";
                continue;
            }
            try {
                $respuesta = $this->registrarNuevaCuenta($emprendedor);
                if (!$respuesta['es_valor_error']) {
                    $creados[] = $respuesta["emprendedor"];;
                } else {
                    $errores[] = "{$nombre} {$apellidos}: {$respuesta['mensaje']}";
                }
            } catch (Exception $e) {
                $errores[] = "{$nombre} {$apellidos}: Error al crear el registro - {$e->getMessage()}";
            }
        }
        $this->enviarRespuesta(
            [
            "creados" => $creados,
            "errores" => $errores,
            "es_valor_error" => !empty($errores) && count($creados) === 0,
            "mensaje" => empty($errores) ? "Todos los emprendedores fueron creados exitosamente." : "Algunos emprendedores no pudieron ser creados "
            ]
        );
    }

    private function existeCorreo($correo)
    {
        return getAdminUsuario()->existeCorreo($correo);
    }

    private function generarContrasena()
    {
        $lengthDiccionario = strlen(self::DICCIONARIO_PASSWORD) - 1;
        $a = self::DICCIONARIO_PASSWORD[rand(0, $lengthDiccionario)];
        $b = self::DICCIONARIO_PASSWORD[rand(0, $lengthDiccionario)];
        $c = self::DICCIONARIO_PASSWORD[rand(0, $lengthDiccionario)];
        return self::DEFAULT_PASSWORD . Util::obtenerFechaActual("Ym")."_".$a.$b.$c;
    }
}


AltaEmprendedoresAPI::start();
