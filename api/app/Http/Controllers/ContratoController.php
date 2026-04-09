<?php

namespace App\Http\Controllers;

use App\Models\Emprendedor;
use App\Models\LineaBase\LineaBase;
use App\Utils\ContractHelper;
use Carbon\Carbon;
use App\Http\Controllers\PdfController;
use App\Http\Responses\ApiResponse;
use App\Models\ConfiguracionContrato;
use \Illuminate\Http\Request;

class ContratoController extends Controller
{
    private function getDefaultDomicilioFundacion(): array
    {
        return [
            'calle' => 'Calle Cobre',
            'numero_exterior' => '4235',
            'numero_interior' => '',
            'colonia' => 'Lomas de la Victoria',
            'codigo_postal' => '45580',
            'municipio' => 'San Pedro Tlaquepaque',
            'estado' => 'Jalisco',
            'entre_calles' => '',
            'referencias' => '',
        ];
    }

    private function getDefaultConfigData(): array
    {
        return [
            'testigo_1' => 'CARMEN ÁLVAREZ FLORES',
            'testigo_2' => 'MA. EMMA VALADEZ CRUZ',
            'representante_legal' => 'PBRO. LIC. Eduardo Delfino Mendoza Medina',
            'nombre_fundacion' => 'Fundación Garibi Rivera, Fundación',
            'domicilio_fundacion' => json_encode($this->getDefaultDomicilioFundacion(), JSON_UNESCAPED_UNICODE),
        ];
    }

    private function parseDomicilioFundacion(?string $domicilioRaw): array
    {
        $default = $this->getDefaultDomicilioFundacion();

        if (empty($domicilioRaw)) {
            return $default;
        }

        $decoded = json_decode($domicilioRaw, true);
        if (is_array($decoded)) {
            return array_merge($default, $decoded);
        }

        // Compatibilidad con valores legacy que eran texto libre.
        $default['legacy_text'] = trim($domicilioRaw);
        return $default;
    }

    private function formatDomicilioFundacion(array $domicilio): string
    {
        if (!empty($domicilio['legacy_text'])) {
            return trim((string) $domicilio['legacy_text']);
        }

        $calle = trim((string) ($domicilio['calle'] ?? ''));
        $numeroExterior = trim((string) ($domicilio['numero_exterior'] ?? ''));
        $numeroInterior = trim((string) ($domicilio['numero_interior'] ?? ''));
        $colonia = trim((string) ($domicilio['colonia'] ?? ''));
        $codigoPostal = trim((string) ($domicilio['codigo_postal'] ?? ''));
        $municipio = trim((string) ($domicilio['municipio'] ?? ''));
        $estado = trim((string) ($domicilio['estado'] ?? ''));
        $entreCalles = trim((string) ($domicilio['entre_calles'] ?? ''));
        $referencias = trim((string) ($domicilio['referencias'] ?? ''));

        $lineaPrincipal = trim($calle . ' ' . ($numeroExterior !== '' ? 'No. ' . $numeroExterior : ''));
        if ($numeroInterior !== '') {
            $lineaPrincipal .= ', Int. ' . $numeroInterior;
        }

        $partes = array_filter([
            $lineaPrincipal,
            $colonia !== '' ? 'Col. ' . $colonia : '',
            $codigoPostal !== '' ? 'C.P. ' . $codigoPostal : '',
            trim($municipio . ($estado !== '' ? ', ' . $estado : '')),
        ]);

        $texto = implode(', ', $partes);

        if ($entreCalles !== '') {
            $texto .= '. Entre calles: ' . $entreCalles;
        }
        if ($referencias !== '') {
            $texto .= '. Referencias: ' . $referencias;
        }

        return $texto;
    }

    private function buildTestigosPayload(?string $testigo1, ?string $testigo2): array
    {
        $testigos = [];
        foreach ([$testigo1, $testigo2] as $testigo) {
            $nombre = trim((string) $testigo);
            if ($nombre !== '') {
                $testigos[] = $nombre;
            }
        }

        return $testigos;
    }

    private function buildConfigPayload(ConfiguracionContrato $config): array
    {
        $domicilio = $this->parseDomicilioFundacion($config->domicilio_fundacion);
        $testigos = $this->buildTestigosPayload($config->testigo_1, $config->testigo_2);

        return [
            'id' => $config->id,
            'representante_legal' => $config->representante_legal,
            'nombre_fundacion' => $config->nombre_fundacion,
            'domicilio' => $domicilio,
            'domicilio_fundacion' => $this->formatDomicilioFundacion($domicilio),
            'testigos' => $testigos,
            // Campos legacy para mantener compatibilidad con consumo existente.
            'testigo_1' => $config->testigo_1,
            'testigo_2' => $config->testigo_2,
        ];
    }

    /**
     * Reune los datos de la base de datos y de Helpers para la construcción del contrato.
     */
    private function getContratoViewData($id)
    {
        $emprendedor = Emprendedor::with([
            'usuario',
            'expediente.aval.parentesco',
            'expediente.aval.codigoPostal.municipio.estado',
            'expediente.inmuebleGarantia.codigoPostal.municipio.estado',
            'expediente.resumenEjecutivo',
        ])->find($id);

        if (!$emprendedor || !$emprendedor->usuario || !$emprendedor->expediente) {
            throw new \Exception('Información insuficiente para generar el contrato.');
        }

        // Cargar la última línea base para el domicilio del emprendedor
        $lineaBase = LineaBase::with(['domicilio.codigoPostal.municipio.estado', 'negocio.codigoPostal.municipio.estado'])
            ->where('id_usuario', $emprendedor->usuario->id)
            ->latest('id_linea_base')
            ->first();

        $domicilio = $lineaBase ? $lineaBase->domicilio : null;
        $domicilio_negocio = $lineaBase ? $lineaBase->negocio : null;
        $expediente = $emprendedor->expediente;
        $aval = $expediente->aval;
        $domicilio_aval = $aval ? $aval : null;
        $inmueble = $expediente->inmuebleGarantia;

        // Datos calculados
        $monto = floatval($expediente->monto_solicitado);
        $monto_letras = ContractHelper::numeroALetras($monto);

        $num_pagos = ($expediente->resumenEjecutivo && $expediente->resumenEjecutivo->numero_pagos)
            ? intval($expediente->resumenEjecutivo->numero_pagos)
            : 12;

        $montoMensual = $num_pagos > 0 ? $monto / $num_pagos : 0;
        $montoMensual_letras = ContractHelper::numeroALetras($montoMensual);

        // Fecha del crédito
        $fechaCreditoRaw = $emprendedor->fecha_credito;
        $fecha_actual = Carbon::now('America/Mexico_City');
        $fecha_credito = $fechaCreditoRaw ? Carbon::parse($fechaCreditoRaw) : $fecha_actual;
        $fecha_letras = ContractHelper::formatearFechaLarga($fecha_credito);

        $configuracion = ConfiguracionContrato::first();
        if (!$configuracion) {
            $configuracion = new ConfiguracionContrato($this->getDefaultConfigData());
        }

        $domicilioFundacion = $this->parseDomicilioFundacion($configuracion->domicilio_fundacion);
        $testigos = $this->buildTestigosPayload($configuracion->testigo_1, $configuracion->testigo_2);

        $viewData = [
            'emprendedor' => $emprendedor,
            'expediente' => $expediente,
            'domicilio' => $domicilio,
            'domicilio_negocio' => $domicilio_negocio,
            'aval' => $aval,
            'domicilio_aval' => $domicilio_aval,
            'inmueble' => $inmueble,
            'monto' => $monto,
            'monto_letras' => $monto_letras,
            'num_pagos' => $num_pagos,
            'monto_mensual' => $montoMensual,
            'monto_mensual_letras' => $montoMensual_letras,
            'fecha_letras' => $fecha_letras,
            'configuracion' => $configuracion,
            'domicilio_fundacion_texto' => $this->formatDomicilioFundacion($domicilioFundacion),
            'testigos' => $testigos,
        ];

        return [
            'emprendedor' => $emprendedor,
            'viewData' => $viewData
        ];
    }

    /**
     * Reune los datos y solicita al PdfController la generación del contrato de préstamo en PDF.
     */
    public function pdf($id)
    {
        try {
            $data = $this->getContratoViewData($id);

            $pdfController = new PdfController();
            $pdfController->renderPdfBase(
                'contrato_pdf', // $viewName
                $data['viewData'],      // $viewData
                "Contrato_{$data['emprendedor']->usuario->nombre}.pdf" // $filename
            );

        } catch (\Exception $e) {
            return ApiResponse::errorInterno('Error al generar el contrato: ' . $e->getMessage());
        }
    }

    public function html($id)
    {
        try {
            $data = $this->getContratoViewData($id);
            $html = view('contrato_html', $data['viewData'])->render();
            return ApiResponse::success(['html' => $html], 'Contrato generado correctamente');
        } catch (\Exception $e) {
            return ApiResponse::errorInterno('Error al generar el contrato: ' . $e->getMessage());
        }
    }

    public function getConfiguracion()
    {
        $config = ConfiguracionContrato::query()->first();
        if (!$config) {
            $config = ConfiguracionContrato::query()->create($this->getDefaultConfigData());
        }

        return ApiResponse::success($this->buildConfigPayload($config));
    }

    public function saveConfiguracion(Request $request)
    {
        $validatedData = $this->validate($request, [
            'testigos' => 'nullable|array|max:2',
            'testigos.*' => 'nullable|string|max:255',
            'representante_legal' => 'nullable|string|max:255',
            'domicilio' => 'required|array',
            'domicilio.calle' => 'required|string|max:255',
            'domicilio.numero_exterior' => 'required|string|max:50',
            'domicilio.numero_interior' => 'nullable|string|max:50',
            'domicilio.colonia' => 'required|string|max:255',
            'domicilio.codigo_postal' => 'required|string|max:10',
            'domicilio.municipio' => 'required|string|max:255',
            'domicilio.estado' => 'required|string|max:255',
            'domicilio.entre_calles' => 'nullable|string|max:255',
            'domicilio.referencias' => 'nullable|string|max:500',
            'nombre_fundacion' => 'nullable|string|max:255',
        ]);

        $testigos = [];
        foreach (($validatedData['testigos'] ?? []) as $testigo) {
            $nombre = trim((string) $testigo);
            if ($nombre !== '' && count($testigos) < 2) {
                $testigos[] = $nombre;
            }
        }

        $config = ConfiguracionContrato::query()->firstOrNew([]);
        $config->fill([
            'testigo_1' => $testigos[0] ?? null,
            'testigo_2' => $testigos[1] ?? null,
            'representante_legal' => $validatedData['representante_legal'] ?? null,
            'nombre_fundacion' => $validatedData['nombre_fundacion'] ?? null,
            'domicilio_fundacion' => json_encode($validatedData['domicilio'], JSON_UNESCAPED_UNICODE),
        ]);
        $config->save();

        return ApiResponse::updated($this->buildConfigPayload($config), 'Configuración de contrato guardada exitosamente');
    }
}
