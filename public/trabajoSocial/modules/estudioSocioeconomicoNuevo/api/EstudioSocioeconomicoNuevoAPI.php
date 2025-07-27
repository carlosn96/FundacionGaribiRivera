<?php
require_once '../../../../../loader.php';

class EstudioSocioeconomicoNuevoAPI extends API
{

    /**
     * Guarda el estudio socioeconómico usando los datos recibidos.
     * Recupera archivos de evidencia, asigna el trabajador social actual,
     * y envía el resultado de la operación.
     *
     * @return void
     */
    function guardar()
    {
        $nombreInputFile = "fotografiasEvidencia"; 
        $this->data[$nombreInputFile] = Util::recuperarArchivosServidor($nombreInputFile);
        $this->data["trabajadorSocial"] = $this->getUsuarioActual();
        $this->enviarResultadoOperacion(getAdminEstudioSocioeconomico()->guardarEstudioSocioeconomico($this->data));
    }

    function recuperarCamposInformacion()
    {
        $admin = getAdminLineaBase();
        $existeLineaBase = $admin->getLineaBase($id = $this->getData("id"))["inicial"]["existeLineaBase"];
        $estudioSocioeconomico = getAdminEstudioSocioeconomico()->getEstudioSocioeconomico($id);
        Sesion::setInfoTemporal("estudioSocioeconomico", $estudioSocioeconomico);
        Sesion::setInfoTemporal("emprendedor", $emprendedor = getAdminUsuario()->buscarUsuarioPorID($id));
        $this->enviarRespuesta(
            [
            "emprendedor" => $emprendedor,
            "existeLineaBase" => $existeLineaBase,
            "existeEstudioSocioeconomico" => $estudioSocioeconomico !== null,
            "campos" => $this->recuperarCampos($admin)
            ]
        );
    }

    private function recuperarCampos(AdminLineaBase $admin)
    {
        $adminEstudioSocioeconomico = getAdminEstudioSocioeconomico();
        return [
            "selector" => [
                "modal" => [
                    "estadoCivilFamiliar" => $admin->recuperarListaEstadoCivil(),
                    "escolaridadFamiliar" => $admin->recuperarListaEscolaridad(),
                    "ocupacionFamiliar" => $admin->recuperarListaOcupaciones(),
                ],
                "secciones" => [
                    "ingresoMensual" => $admin->recuperarListaRangosIngreso()
                ]
            ],
            "radio" => [
                "tipoVivienda" => $adminEstudioSocioeconomico->recuperarTiposVivienda(),
                "condicionVivienda" => $adminEstudioSocioeconomico->recuperarCondicionVivienda(),
                "usoVivienda" => $adminEstudioSocioeconomico->recuperarUsoVivienda(),
                "familiasHabitantesVivienda" => $adminEstudioSocioeconomico->recuperarTipoFamiliaHabitanteVivienda()
            ],
            "seleccionMultiple" => [
                "vulnerabilidad" => $adminEstudioSocioeconomico->recuperarVulnerabilidades(),
                "actitudes" => [
                    "actitudesPositivas" => $adminEstudioSocioeconomico->recuperarActitudesPositivas(),
                    "actitudesNegativas" => $adminEstudioSocioeconomico->recuperarActitudesNegativas(),
                ],
                "vivienda" => [
                    "piso" => $adminEstudioSocioeconomico->recuperarTipoPisosVivienda(),
                    "techo" => $adminEstudioSocioeconomico->recuperarTipoTechoVivienda(),
                    "pared" => $adminEstudioSocioeconomico->recuperarTipoParedVivienda(),
                    
                ],
                "distribucionVivienda" => $adminEstudioSocioeconomico->recuperarDistribucionVivienda(),
                "servicios" => $adminEstudioSocioeconomico->recuperarServicioVivienda()
            ]
        ];
    }
}

EstudioSocioeconomicoNuevoAPI::start();
