<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function verifyEmail(Request $request)
    {
        $this->validate($request, [
            'correo_electronico' => 'required|email',
        ]);

        $user = Usuario::where('correo_electronico', $request->input('correo_electronico'))->first();

        if ($user) {
            return response()->json(['exists' => true], 200);
        }

        return response()->json(['exists' => false], 200);
    }

    public function register(Request $request)
    {
        $this->validate($request, [
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'correo_electronico' => 'required|email|unique:usuario',
            'numero_celular' => 'required|string|max:15',
            'contrasena' => 'required|string|min:6',
            'estado_activo' => 'required|in:activo,inactivo',
            'tipo_usuario' => 'required|integer',
            // 'fotografia' => 'nullable|string', // Assuming base64 encoded string or URL
        ]);

        $user = Usuario::create([
            'nombre' => $request->input('nombre'),
            'apellidos' => $request->input('apellidos'),
            'correo_electronico' => $request->input('correo_electronico'),
            'numero_celular' => $request->input('numero_celular'),
            'contrasena' => Hash::make($request->input('contrasena')),
            'estado_activo' => $request->input('estado_activo'),
            'tipo_usuario' => $request->input('tipo_usuario'),
            // 'fotografia' => $request->input('fotografia'),
        ]);

        return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
    }
}
