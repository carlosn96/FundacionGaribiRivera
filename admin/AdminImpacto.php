<?php

class AdminImpacto extends Admin
{

    public function __construct()
    {
        parent::__construct(new ImpactoDAO());
    }

    public function getMedicionImpacto($usuario)
    {
        return $this->dao->getMedicionImpacto($usuario);
    }

    public function actualizarConfiguracionAnios($inicio, $fin, $usuario)
    {
        return $this->dao->actualizarConfiguracionAnios($inicio, $fin, $usuario);
    }

    public function actualizarConfiguracionListaEmprendedores(array $lista, int $idUsuario)
    {
        return $this->dao->actualizarConfiguracionListaEmprendedores(array_map('intval', $lista), $idUsuario);
    }

    public function actualizarConfiguracionPreprocesamiento($preprocesamiento, $usuario)
    {
        return $this->dao->actualizarConfiguracionPreprocesamiento($preprocesamiento, $usuario);
    }

    public function recuperarVistaGeneral($tipo)
    {
        return $this->dao->recuperarVistaGeneral($tipo);
    }
    public function recuperarSeguimientoGraduado($emprendedor)
    {
        return $this->existeSeguimientoGraduado($emprendedor) ? $this->dao->recuperarSeguimientoGraduado($emprendedor) : [];
    }
    public function existeSeguimientoGraduado($emprendedor)
    {
        return boolval($this->dao->existeSeguimientoGraduado($emprendedor));
    }

    public function guardarSeguimientoGraduado($data)
    {
        $idEmprendedor = intval($data["idEmprendedor"]);
        $analisisNegocio = new LineaBaseAnalisisNegocio(
            registraEntradaSalida: $data["registraEntradaSalida"] ?? null,
            asignaSueldo: $data["asignaSueldo"] ?? null,
            conoceUtilidades: $data["conoceUtilidades"] ?? null,
            identificaCompetencia: $data["identificaCompetencia"] ?? null,
            quienCompetencia: $data["quienCompetencia"] ?? null,
            clientesNegocio: $data["clientesNegocio"] ?? '',
            ventajasNegocio: $data["ventajasNegocio"] ?? '',
            problemasNegocio: $data["problemasNegocio"] ?? '',
            estrategiasIncrementarVentas: $data["estrategiasIncrementarVentas"] ?? [],
            comoEmpleaGanancias: intval($data["comoEmpleaGanancias"]),
            conoceProductosMayorUtilidad: $data["conoceProductosMayorUtilidad"] ?? 0,
            porcentajeGanancias: floatval($data["porcentajeGanancias"] ?? 0),
            ahorro: $data["ahorro"] ?? null,
            cuantoAhorro: floatval($data["cuantoAhorro"] ?? 0),
            razonesNoAhorro: $data["razonesNoAhorro"] ?? null,
            conocePuntoEquilibrio: $data["conocePuntoEquilibrio"] ?? null,
            separaGastos: $data["separaGastos"] ?? null,
            elaboraPresupuesto: $data["elaboraPresupuesto"] ?? null
        );

        $administracionIngresos = new LineaBaseAdministracionIngresosNegocio(
            sueldoMensual: $data["sueldoMensual"],
            utilidadesMensuales: $data["utilidadesMensuales"],
            ahorroMensual: $data["cuantoAhorro"] ?? 0,
        );
        $seguimiento = new SeguimientoGraduado(
            $idEmprendedor,
            $analisisNegocio,
            $administracionIngresos
        );
        return $this->existeSeguimientoGraduado($idEmprendedor)
            ? $this->dao->actualizarSeguimientoGraduado($seguimiento)
            : $this->dao->guardarSeguimientoGraduado($seguimiento);
    }

    public function eliminarSeguimientoGraduado($idEmprendedor)
    {
        return $this->dao->eliminarSeguimientoGraduado($idEmprendedor);
    }
}
