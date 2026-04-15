<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\Usuario;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\TipoUsuario;

class UserController extends Controller
{
    /**
     * List all users
     */
    public function index(): JsonResponse
    {
        try {
            $users = Usuario::all();
            return ApiResponse::success($users, 'Usuarios recuperados exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al recuperar usuarios: ' . $e->getMessage());
        }
    }

    public function getAllAsistentes(): JsonResponse
    {
        try {
            $currentUser = Auth::user();
            
            // Obtenemos los usuarios con sus permisos desde la vista legacy
            $users = DB::table('listar_asistentes')
                ->where('id', '!=', $currentUser->id)
                ->get();

            // Formateamos los datos para el frontend (permisos y fotografía)
            $users = $users->map(function($user) {
                if (isset($user->permisos)) {
                    $user->permisos = is_string($user->permisos) ? json_decode($user->permisos, true) : $user->permisos;
                }
                
                if (isset($user->fotografia)) {
                    if (!empty($user->fotografia)) {
                        $user->fotografia_base64 = base64_encode($user->fotografia);
                    }
                    unset($user->fotografia); // Limpieza obligatoria para JSON
                }
                
                return $user;
            });

            return ApiResponse::success($users, 'Usuarios recuperados exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al recuperar usuarios: ' . $e->getMessage());
        }
    }

    /**
     * Get a specific user
     */
    public function show($id): JsonResponse
    {
        try {
            $user = Usuario::find($id);
            if (!$user) {
                return ApiResponse::notFound('Usuario no encontrado');
            }
            return ApiResponse::success($user, 'Usuario recuperado');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al recuperar usuario: ' . $e->getMessage());
        }
    }

    /**
     * Create a new user
     */
    public function storeAsistente(Request $request): JsonResponse
    {
        try {
            $this->validate($request, [
                'nombre' => 'required|string|max:255',
                'apellidos' => 'required|string|max:255',
                'correo_electronico' => 'required|email|unique:usuario,correo_electronico',
                'numero_celular' => 'nullable|string|max:20',
                'permisos' => 'array'
            ]);

            $data = $request->only([
                'nombre',
                'apellidos',
                'correo_electronico',
                'numero_celular',
                'tipo_usuario',
            ]);

            // Handle password
            if ($request->has('contrasena') && !empty($request->contrasena)) {
                $data['contrasena'] = Hash::make($request->contrasena);
            } else {
                $data['contrasena'] = Hash::make('123456');
            }

            // Handle base64 image
            if ($request->has('fotografia_base64') && !empty($request->fotografia_base64)) {
                $data['fotografia'] = base64_decode($request->fotografia_base64);
            } else {
                $data['fotografia'] = self::obtenerFotografiaRand();
            }
            $data['tipo_usuario'] = TipoUsuario::ASISTENTE; // Asistente

            // Crear el usuario
            $user = Usuario::create($data);

            // Si hay permisos, guardarlos mediante el SP legacy
            if ($request->has('permisos') && is_array($request->permisos)) {
                DB::statement('CALL actualizar_permisos_usuario_asistente(?, ?)', [
                    $user->id,
                    json_encode($request->permisos)
                ]);
            }

            return ApiResponse::success($user, 'Usuario creado exitosamente', 201);
        } catch (\Exception $e) {
            return ApiResponse::error('Error al crear usuario: ' . $e->getMessage());
        }
    }

    /**
     * Update an existing user
     */
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $user = Usuario::find($id);
            if (!$user) {
                return ApiResponse::notFound('Usuario no encontrado');
            }

            $this->validate($request, [
                'nombre' => 'sometimes|string|max:255',
                'apellidos' => 'sometimes|string|max:255',
                'correo_electronico' => 'sometimes|email|unique:usuario,correo_electronico,' . $id,
                'numero_celular' => 'nullable|string|max:20',
                'tipo_usuario' => 'sometimes|integer',
                'permisos' => 'array'
            ]);

            $data = $request->only([
                'nombre',
                'apellidos',
                'correo_electronico',
                'numero_celular',
                'tipo_usuario',
            ]);

            // Handle password update if provided
            if ($request->has('contrasena') && !empty($request->contrasena)) {
                $data['contrasena'] = Hash::make($request->contrasena);
            }

            // Handle base64 image
            if ($request->has('fotografia_base64') && !empty($request->fotografia_base64)) {
                $data['fotografia'] = base64_decode($request->fotografia_base64);
            }

            $user->update($data);

            // Actualizar permisos mediante el SP legacy si vienen en el request
            if ($request->has('permisos') && is_array($request->permisos)) {
                DB::statement('CALL actualizar_permisos_usuario_asistente(?, ?)', [
                    $id,
                    json_encode($request->permisos)
                ]);
            }

            return ApiResponse::success($user, 'Usuario actualizado exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al actualizar usuario: ' . $e->getMessage());
        }
    }

    /**
     * Delete a user
     */
    public function destroy($id): JsonResponse
    {
        try {
            $user = Usuario::find($id);
            if (!$user) {
                return ApiResponse::notFound('Usuario no encontrado');
            }

            $user->delete();
            return ApiResponse::success(null, 'Usuario eliminado exitosamente');
        } catch (\Exception $e) {
            return ApiResponse::error('Error al eliminar usuario: ' . $e->getMessage());
        }
    }

    /**
     * Get a random profile photograph from the assets directory.
     */
    private static function obtenerFotografiaRand()
    {
        $fotos = [];
        $dir = base_path("../public/assets/images/profile");
        if (is_dir($dir)) {
            $archivos = array_diff(scandir($dir), array('.', '..'));
            foreach ($archivos as $fotografias) {
                $fotos[] = $dir . DIRECTORY_SEPARATOR . $fotografias;
            }
        }
        
        if (count($fotos) > 0) {
            return file_get_contents($fotos[rand(0, count($fotos) - 1)]);
        }
        
        return null;
    }
}
