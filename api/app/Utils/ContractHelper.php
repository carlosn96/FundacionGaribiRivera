<?php

namespace App\Utils;

/**
 * ContractHelper - Funciones auxiliares para la generación de contratos y documentos.
 */
class ContractHelper
{
    /**
     * Formatea una fecha en formato largo de texto en español.
     * Ejemplo: "5 DE ABRIL DEL 2026"
     */
    public static function formatearFechaLarga($date)
    {
        if (!$date) return '— — —';
        
        $meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
        return $date->day . " DE " . $meses[$date->month - 1] . " DEL " . $date->year;
    }

    /**
     * Convierte un monto numérico a su representación en letras.
     * Ejemplo: "(CINCUENTA MIL PESOS 00/100 M.N.)"
     */
    public static function numeroALetras($num)
    {
        $num = floatval($num);
        $enteros = floor($num);
        $centavos = round(($num - $enteros) * 100);
        $letras = self::convertirEnteros($enteros);
        
        $centavosStr = str_pad($centavos, 2, "0", STR_PAD_LEFT);
        return "({$letras} PESOS {$centavosStr}/100 M.N.)";
    }

    /**
     * Lógica recursiva para convertir números enteros a letras (hasta 1 millón).
     */
    private static function convertirEnteros($num)
    {
        if ($num == 0) return "CERO";
        if ($num == 1) return "UN";
        if ($num == 1000) return "MIL";
        
        $unidades = ["", "UN", "DOS", "TRES", "CUATRO", "CINCO", "SEIS", "SIETE", "OCHO", "NUEVE"];
        $decenas = ["", "DIEZ", "VEINTE", "TREINTA", "CUARENTA", "CINCUENTA", "SESENTA", "SETENTA", "OCHENTA", "NOVENTA"];
        $dieces = ["DIEZ", "ONCE", "DOCE", "TRECE", "CATORCE", "QUINCE", "DIECISEIS", "DIECISIETE", "DIECIOCHO", "DIECINUEVE"];
        
        if ($num < 10) return $unidades[$num];
        if ($num < 20) return $dieces[$num - 10];
        if ($num < 100) {
            $u = $num % 10;
            $d = floor($num / 10);
            return $decenas[$d] . ($u > 0 ? " Y " . $unidades[$u] : "");
        }
        if ($num < 1000) {
            $c = floor($num / 100);
            $resto = $num % 100;
            $c_str = "";
            if ($c == 1) $c_str = ($resto > 0 ? "CIENTO" : "CIEN");
            else if ($c == 5) $c_str = "QUINIENTOS";
            else if ($c == 7) $c_str = "SETECIENTOS";
            else if ($c == 9) $c_str = "NOVECIENTOS";
            else $c_str = $unidades[$c] . "CIENTOS";
            
            return $c_str . ($resto > 0 ? " " . self::convertirEnteros($resto) : "");
        }
        if ($num < 1000000) {
            $m = floor($num / 1000);
            $resto = $num % 1000;
            $m_str = ($m == 1 ? "MIL" : self::convertirEnteros($m) . " MIL");
            return $m_str . ($resto > 0 ? " " . self::convertirEnteros($resto) : "");
        }
        
        return strval($num);
    }
}
