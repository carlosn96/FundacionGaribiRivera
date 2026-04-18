<?php

namespace App\Http\Controllers;

use App\Models\Instructor;
use App\Http\Resources\InstructorResource;
use Illuminate\Http\Request;
use App\Http\Responses\ApiResponse;
use Illuminate\Http\JsonResponse;

class InstructorController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $instructores = Instructor::whereKeyNot(0)->get();
            return ApiResponse::success(InstructorResource::collection($instructores), 'Instructores obtenidos exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener los instructores: ' . $e->getMessage());
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $instructor = Instructor::find($id);
            if (!$instructor) {
                return ApiResponse::notFound('Instructor no encontrado');
            }
            return ApiResponse::success(new InstructorResource($instructor), 'Instructor obtenido exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al obtener el instructor: ' . $e->getMessage());
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $this->validate($request, [
                'nombre' => 'required|string|max:45',
                'apellidoPaterno' => 'required|string|max:45',
                'apellidoMaterno' => 'nullable|string|max:45',
                'correo' => 'nullable|email|max:45',
                'telefono' => 'nullable|string|max:45',
            ]);

            $data = $request->all();
            
            $instructorData = [
                'nombre_instructor' => $data['nombre'],
                'apellido_paterno' => $data['apellidoPaterno'],
                'apellido_materno' => $data['apellidoMaterno'] ?? null,
                'correo_electronico' => $data['correo'] ?? null,
                'telefono' => $data['telefono'] ?? null,
            ];

            // Si suben un archivo directo (FormData)
            if ($request->hasFile('fotografia') && $request->file('fotografia')->isValid()) {
                $instructorData['fotografia'] = file_get_contents($request->file('fotografia')->getRealPath());
            } 
            // Si mandan un string base64
            elseif (!empty($data['fotografia']) && preg_match('/^data:image\/(\w+);base64,/', $data['fotografia'])) {
                $base64 = substr($data['fotografia'], strpos($data['fotografia'], ',') + 1);
                $instructorData['fotografia'] = base64_decode($base64);
            }

            $instructor = Instructor::create($instructorData);
            return ApiResponse::success(new InstructorResource($instructor), 'Instructor creado exitosamente');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ApiResponse::error('Fallo en la validación: ' . current($e->errors())[0]);
        } catch (\Exception $e) {
            return ApiResponse::error('Error al crear instructor: ' . $e->getMessage());
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $instructor = Instructor::find($id);
            if (!$instructor) {
                return ApiResponse::notFound('Instructor no encontrado');
            }

            $this->validate($request, [
                'nombre' => 'required|string|max:45',
                'apellidoPaterno' => 'required|string|max:45',
                'apellidoMaterno' => 'nullable|string|max:45',
                'correo' => 'nullable|email|max:45',
                'telefono' => 'nullable|string|max:45',
            ]);

            $data = $request->all();
            
            $instructorData = [
                'nombre_instructor' => $data['nombre'],
                'apellido_paterno' => $data['apellidoPaterno'],
                'apellido_materno' => $data['apellidoMaterno'] ?? null,
                'correo_electronico' => $data['correo'] ?? null,
                'telefono' => $data['telefono'] ?? null,
            ];

            // Si suben un archivo directo (FormData)
            if ($request->hasFile('fotografia') && $request->file('fotografia')->isValid()) {
                $instructorData['fotografia'] = file_get_contents($request->file('fotografia')->getRealPath());
            } 
            // Si mandan un string base64 recién cargado
            elseif (!empty($data['fotografia']) && preg_match('/^data:image\/(\w+);base64,/', $data['fotografia'])) {
                $base64 = substr($data['fotografia'], strpos($data['fotografia'], ',') + 1);
                $instructorData['fotografia'] = base64_decode($base64);
            } 
            // Si la envían vacía o con una marca de borrado y se desea purgar (ej string "DELETE")
            elseif (isset($data['fotografia']) && $data['fotografia'] === 'DELETE') {
                $instructorData['fotografia'] = null;
            }

            $instructor->update($instructorData);
            return ApiResponse::updated(new InstructorResource($instructor), 'Instructor actualizado exitosamente');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return ApiResponse::error('Fallo en la validación: ' . current($e->errors())[0]);
        } catch (\Exception $e) {
            return ApiResponse::error('Error al actualizar instructor: ' . $e->getMessage());
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $instructor = Instructor::find($id);
            if (!$instructor) {
                return ApiResponse::notFound('Instructor no encontrado');
            }

            $instructor->delete();
            return ApiResponse::success(null, 'Instructor eliminado exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al eliminar instructor: ' . $e->getMessage());
        }
    }

    /**
     * Endpoint dedicado para servir el BLOB de la fotografía directamente como archivo
     * Evita sobrecargar el JSON con base64
     */
    public function fotografia($id)
    {
        $instructor = Instructor::select('fotografia')->find($id);

        if (!$instructor || empty($instructor->fotografia)) {
            // Retornar un 404 o podrías servir un archivo por defecto con response()->file(...)
            return response()->json(['error' => 'Fotografía no encontrada'], 404);
        }

        // Intentar detectar el tipo MIME, por defecto jpeg
        $mime = 'image/jpeg';
        try {
            $finfo = new \finfo(FILEINFO_MIME_TYPE);
            $detectedMime = $finfo->buffer($instructor->fotografia);
            if ($detectedMime) $mime = $detectedMime;
        } catch (\Exception $e) {
            // Ignorar silenciosamente si finfo no está disponible
        }

        return response($instructor->fotografia)
            ->header('Content-Type', $mime)
            ->header('Cache-Control', 'max-age=86400, public'); // Cacheable por 1 día
    }
}
