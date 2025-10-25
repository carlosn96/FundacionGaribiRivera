<?php

/**
 * Description of SeguimientoGraduado
 *
 * @author JuanCarlos
 */
class SeguimientoGraduado {

    use Entidad;
    private LineaBaseAnalisisNegocio $analisisNegocio;
    private LineaBaseAdministracionIngresosNegocio $administracionIngresos;
    private int $id;
    private int $idEmprendedor;
    private $fechaCreacion;

    public function __construct(int $idEmprendedor,
            LineaBaseAnalisisNegocio $analisisNegocio,
            LineaBaseAdministracionIngresosNegocio $administracionIngresos,
            $fechaCreacion = "",
            $id = 0) {
        $this->analisisNegocio = $analisisNegocio;
        $this->administracionIngresos = $administracionIngresos;
        $this->id = $id;
        $this->fechaCreacion = $fechaCreacion;
        $this->idEmprendedor = $idEmprendedor;
    }
}
