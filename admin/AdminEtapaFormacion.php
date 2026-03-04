<?php

class AdminEtapaFormacion extends Admin
{

    public function __construct()
    {
        parent::__construct(new EtapaFormacionDAO());
    }

    public function crearEtapa($data)
    {
        $etapa = $this->construirEtapa($data);
        $idEtapa = $this->dao->insertarEtapa($etapa);
        if ($idEtapa) {
            $this->generarCronograma($idEtapa, $etapa->getFechaInicio(), $etapa->getModalidad());
            return true;
        }
        return false;
    }

    private function getProximoDiaHabil(\DateTime $fecha, $diasAumento = 1)
    {
        for ($i = 0; $i < $diasAumento; $i++) {
            $fecha->modify('+1 day');
            while (in_array($fecha->format('N'), [6, 7])) {
                $fecha->modify('+1 day');
            }
        }
        return $fecha;
    }

    private function generarCronograma($idEtapa, $fechaInicioStr, $modalidad)
    {
        $fecha = new \DateTime($fechaInicioStr);
        while (in_array($fecha->format('N'), [6, 7])) {
            $fecha->modify('+1 day');
        }

        $talleresDAO = new TallerDAO();
        $talleres = $talleresDAO->selectPorCamposEspecificos("id_taller, numero_taller", "taller", "ORDER BY numero_taller ASC", true);

        foreach ($talleres as $index => $t) {
            $numero = $t['numero_taller'];
            $idTaller = $t['id_taller'];

            if ($index > 0) {
                if ($modalidad == 1) { // MODALIDAD A
                    if ($numero <= 5) {
                        $this->getProximoDiaHabil($fecha, 1);
                    } else {
                        $fecha->modify('+7 days');
                    }
                } else { // MODALIDAD B (2)
                    if ($numero <= 10) {
                        $diasAumento = ($index % 2 == 1) ? 3 : 4;
                        $fecha->modify("+$diasAumento days");
                        while (in_array($fecha->format('N'), [6, 7])) {
                            $fecha->modify('+1 day');
                        }
                    } else {
                        $fecha->modify('+7 days');
                    }
                }
            }
            $this->dao->agendarCronograma($idEtapa, $idTaller, $fecha->format('Y-m-d'));
        }
    }

    public function eliminarEtapa($id)
    {
        return $this->dao->eliminarEtapa($id);
    }

    public function actualizarEtapa($data)
    {
        return $this->dao->actualizarEtapa($this->construirEtapa($data));
    }

    public function actualizarEtapaActual($id)
    {
        return $this->dao->actualizarEtapaActual($id);
    }

    public function obtenerEtapaActual()
    {
        return empty(($data = $this->dao->obtenerEtapaActual())) ? $data : $this->construirEtapa($data)->toArray();
    }

    public function listarEtapasFormacion()
    {
        return $this->listarEtapasFormacionPorAnio(null);
    }

    public function listarEtapasFormacionPorAnio($anio)
    {
        $etapas = [];
        foreach ($this->dao->listarEtapasFormacion($anio) as $data) {
            $etapas[] = $this->construirEtapa($data)->toArray();
        }
        return $etapas;
    }

    public function listarTiposEtapasFormacion()
    {
        return $this->dao->listarTiposEtapasFormacion();
    }

    private function construirEtapa($data): EtapaFormacion
    {
        $idEtapa = $data["idEtapa"] ?? 0;
        $nombre = $data["nombre"];
        $fechaInicio = $data["fechaInicio"];
        $fechaFin = $data["fechaFin"];
        $tipo = isset($data["descripcionTipo"]) ?
            Util::map($data["tipo"], $data["descripcionTipo"]) : $data["tipo"];
        $esActual = $data["esActual"] ?? false;
        $modalidad = isset($data["modalidad"]) ? (int) $data["modalidad"] : 1;
        $etapa = new EtapaFormacion(
            $idEtapa,
            $nombre,
            $fechaInicio,
            $fechaFin,
            $tipo,
            $esActual,
            $modalidad
        );
        if (isset($data["talleres"])) {
            $etapa->setTalleres($data["talleres"]);
        }
        return $etapa;
    }

    public function listarTalleresPorEtapa($idEtapa)
    {
        $this->dao->listarTalleresPorEtapa($idEtapa);
    }

    public function obtenerEtapaPorId($idEtapa)
    {
        return $this->construirEtapa($this->dao->buscarPorId($idEtapa))->toArray();
    }

    public function recuperarCronograma($idEtapa)
    {
        return $this->dao->recuperarCronograma($idEtapa);
    }
}
