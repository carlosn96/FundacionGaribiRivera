<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Models\TipoUsuario;
use App\Models\LineaBase\LineaBase;

class Usuario extends Model implements AuthenticatableContract, AuthorizableContract, JWTSubject
{
    use Authenticatable, Authorizable, HasFactory;

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['rol', 'fotografia_base64'];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array of any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }


    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'usuario';

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'nombre',
        'apellidos',
        'correo_electronico',
        'numero_celular',
        'contrasena',
        'estado_activo',
        'tipo_usuario',
        'fotografia',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var string[]
     */
    protected $hidden = [
        'contrasena',
        'fotografia',
    ];

    /**
     * Get the password for the user.
     *
     * @return string
     */
    public function getAuthPassword()
    {
        return $this->contrasena;
    }

    /**
     * Get the user's type name.
     *
     * @return string
     */
    public function getRolAttribute()
    {
        $tipoUsuarioInfo = TipoUsuario::get($this->tipo_usuario);
        return is_array($tipoUsuarioInfo) ? $tipoUsuarioInfo['rol'] : 'Desconocido';
    }

    /**
     * Get the user's fotografia as base64.
     *
     * @return string|null
     */
    public function getFotografiaBase64Attribute()
    {
        if ($this->attributes['fotografia']) {
            return base64_encode($this->attributes['fotografia']);
        }
        return null;
    }

    /**
     * Get the linea base for the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function lineaBase()
    {
        return $this->hasOne(LineaBase::class, 'id_usuario');
    }
}