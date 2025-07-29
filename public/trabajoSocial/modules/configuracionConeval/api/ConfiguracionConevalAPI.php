<?php

require_once '../../../../../loader.php';

class ConfiguracionConevalAPI extends API
{
    /**
     * Obtiene todas las configuraciones CONEVAL.
     * Corresponde al caso 'getAll'.
     *
     * @return void
     */
    public function getAll()
    {
        // Este método debería devolver un array en caso de éxito o false en caso de error.
        $configuraciones = getAdminEstudioSocioeconomico()->listarConfiguracionesConeval();
        if ($configuraciones !== false) {
            $this->enviarRespuesta(['success' => true, 'data' => $configuraciones]);
        } else {
            // Ocurrió un error en la base de datos.
            $this->enviarRespuesta(['success' => false, 'message' => 'Error al obtener las configuraciones desde la base de datos.']);
        }
    }

    /**
     * Crea una nueva configuración CONEVAL.
     * Corresponde al caso 'create'.
     *
     * @return void
     */
    public function create()
    {
        $formData = $this->getDataAll();
        $this->enviarResultadoOperacion(getAdminEstudioSocioeconomico()->crearConfiguracionConeval($formData));
    }

    /**
     * Actualiza una configuración CONEVAL existente.
     * Corresponde al caso 'update'.
     *
     * @return void
     */
    public function update()
    {
        $formData = $this->getDataAll();
        $this->enviarResultadoOperacion(getAdminEstudioSocioeconomico()->actualizarConfiguracionConeval($formData));
    }

    /**
     * Elimina una configuración CONEVAL.
     * Corresponde al caso 'delete'.
     *
     * @return void
     */
    public function delete()
    {
        $id = $this->getData("id");

        if (!isset($id) || empty($id)) {
            $this->enviarRespuesta(Util::enum('No se proporcionó un ID válido para eliminar.', true));
            return;
        }
        $this->enviarResultadoOperacion(getAdminEstudioSocioeconomico()->eliminarConfiguracionConeval($id));
    }
}

ConfiguracionConevalAPI::start();
