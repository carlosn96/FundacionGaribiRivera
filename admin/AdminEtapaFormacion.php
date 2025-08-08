<?php

class AdminEtapaFormacion extends Admin
{

    public function __construct()
    {
        parent::__construct(new EtapaFormacionDAO());
    }

    public function crearEtapa($data)
    {
        return $this->dao->insertarEtapa($this->construirEtapa($data));
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
        $etapa = new EtapaFormacion(
            $idEtapa, $nombre, $fechaInicio, $fechaFin,
            $tipo,  $esActual
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
}
