<?php

trait Entidad {

    public function toArray() {
        $array = [];
        $reflectionClass = new ReflectionClass($this);

        while ($reflectionClass) {
            foreach ($reflectionClass->getProperties() as $property) {
                $property->setAccessible(true);
                $value = $property->getValue($this);

                // Verifica si la propiedad es un objeto y si implementa el método toArray
                if (is_object($value) && method_exists($value, 'toArray')) {
                    $array[$property->getName()] = $value->toArray(); // Llama a toArray() en la propiedad
                } else {
                    $array[$property->getName()] = $value; // No es un objeto, simplemente asigna el valor
                }
            }
            $reflectionClass = $reflectionClass->getParentClass(); // Avanza a la clase padre
        }

        return $array;
    }
}
