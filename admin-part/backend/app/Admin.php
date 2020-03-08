<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Admin extends Authenticatable implements JWTSubject
{   
    
    
    use Notifiable;

    public $timestamps = false;
    
    protected $guard='admin';

    protected $fillable = ['name','secondname','email','password'];
    protected $hidden=['password','remember_token'];




    public function getJWTIdentifier()
    {
        return $this->getKey();
        
    }
    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
