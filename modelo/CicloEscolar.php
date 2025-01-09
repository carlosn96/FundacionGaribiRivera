<?php

class CicloEscolar {

    use Entidad;

    private int $id_ciclo_escolar;
    private string $nombre;

    public function __construct(string $nombre, int $id_ciclo_escolar = 0) {
        $this->id_ciclo_escolar = $id_ciclo_escolar;
        $this->nombre = $nombre;
    }

    public function getId_ciclo_escolar(): int {
        return $this->id_ciclo_escolar;
    }

    public function getNombre(): string {
        return $this->nombre;
    }

    public function setId_ciclo_escolar(int $id_ciclo_escolar): void {
        $this->id_ciclo_escolar = $id_ciclo_escolar;
    }

    public function setNombre(string $nombre): void {
        $this->nombre = $nombre;
    }
}
