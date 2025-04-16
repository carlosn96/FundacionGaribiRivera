<?php

class EstudioSocioeconomicoSeccionFamiliares {

    use Entidad;

    private array $familiares;

    public function __construct(array $data) {
        $this->familiares = array();
        foreach ($data as $familiar) {
            $nombre = $familiar["nombre"];
            $parentesco = $familiar["parentesco"];
            $edad = $familiar["edad"];
            $ocupacion = $familiar["ocupacion"];
            $ingresMensualFijo = $familiar["ingresoMensualFijo"];
            $ingresoMensualVariable = $familiar["ingresoMensualVariable"];
            $estadoCivil = $familiar["estadoCivil"];
            $escolaridad = $familiar["escolaridad"];
            $this->agregarFamiliar($nombre, $parentesco,
                    $edad,
                    $estadoCivil,
                    $escolaridad,
                    $ocupacion,
                    $ingresMensualFijo,
                    $ingresoMensualVariable
            );
        }
    }

    public function agregarFamiliar($nombre,
            $parentesco,
            $edad,
            $estadoCivil,
            $escolaridad,
            $ocupacion,
            $ingresMensualFijo,
            $ingresoMensualVariable) {
        $this->familiares[] = (new FamiliarEmprendedor(
                        $nombre,
                        $parentesco,
                        $edad,
                        $estadoCivil,
                        $escolaridad,
                        $ocupacion,
                        $ingresMensualFijo,
                        $ingresoMensualVariable
                ))->toArray();
    }

    public function getFamiliares(): array {
        return $this->familiares;
    }

    private function getSumaIngresoMensual(string $tipoIngreso): float {
        $obtenerIngreso = function ($familiar) use ($tipoIngreso) {
            if (is_object($familiar)) {
                $metodo = 'get' . ucfirst($tipoIngreso);
                return $familiar->$metodo();
            }
            else if (is_array($familiar)) {
                $indice = strtolower('ingresoMensual' . ucfirst($tipoIngreso));
                return isset($familiar[$indice]) ? $familiar[$indice] : 0;
            }
            return 0;
        };
        $ingresos = array_map($obtenerIngreso, $this->familiares);
        return array_sum($ingresos);
    }

    public function getSumaIngresoMensualFijo(): float {
        return $this->getSumaIngresoMensual('fijo');
    }

    public function getSumaIngresoMensualVariable(): float {
        return $this->getSumaIngresoMensual('variable');
    }

    public function getTotalFamiliares() {
        return $this->familiares !== null ? count($this->familiares) : 0;
    }
}
