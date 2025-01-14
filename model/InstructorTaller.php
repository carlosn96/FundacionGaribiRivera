<?php

class InstructorTaller {

    use Entidad;

    private int $id;
    private string $nombre;
    private string $apellidoPaterno;
    private string $apellidoMaterno;
    private string $correoElectronico;
    private string $telefono;
    private $fotografia;
    private string $nombreCompleto;  // Propiedad para el nombre completo

    public function __construct(string $nombre, string $apellidoPaterno, string $apellidoMaterno, string $correoElectronico, string $telefono, $fotografia, int $id = 0) {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->apellidoPaterno = $apellidoPaterno;
        $this->apellidoMaterno = $apellidoMaterno;
        $this->correoElectronico = $correoElectronico;
        $this->telefono = $telefono;
        $this->fotografia = $fotografia;

        $this->actualizarNombreCompleto();  // Actualizamos el nombre completo al momento de crear la instancia
    }

    public function getId(): int {
        return $this->id;
    }

    public function getNombre(): string {
        return $this->nombre;
    }

    public function getApellidoPaterno(): string {
        return $this->apellidoPaterno;
    }

    public function getApellidoMaterno(): string {
        return $this->apellidoMaterno;
    }

    public function getNombreCompleto(): string {
        return $this->nombreCompleto;
    }

    public function getCorreoElectronico(): string {
        return $this->correoElectronico;
    }

    public function getTelefono(): string {
        return $this->telefono;
    }

    public function getFotografia() {
        return $this->fotografia;
    }

    public function setId(int $id): void {
        $this->id = $id;
    }

    public function setNombre(string $nombre): void {
        $this->nombre = $nombre;
        $this->actualizarNombreCompleto();  // Actualizamos el nombre completo cada vez que se cambia el nombre
    }

    public function setApellidoPaterno(string $apellidoPaterno): void {
        $this->apellidoPaterno = $apellidoPaterno;
        $this->actualizarNombreCompleto();  // Actualizamos el nombre completo cada vez que se cambia el apellido paterno
    }

    public function setNombreMaterno(string $nombreMaterno): void {
        $this->apellidoMaterno = $nombreMaterno;
        $this->actualizarNombreCompleto();  // Actualizamos el nombre completo cada vez que se cambia el apellido materno
    }

    public function setCorreoElectronico(string $correoElectronico): void {
        $this->correoElectronico = $correoElectronico;
    }

    public function setTelefono(string $telefono): void {
        $this->telefono = $telefono;
    }

    public function setFotografia($fotografia): void {
        $this->fotografia = $fotografia;
    }

    // Método privado para actualizar el nombre completo
    private function actualizarNombreCompleto(): void {
        $this->nombreCompleto = $this->nombre . ' ' . $this->apellidoPaterno . ' ' . $this->apellidoMaterno;
    }
}
