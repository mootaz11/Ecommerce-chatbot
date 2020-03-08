<?php

namespace App;


use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable ;
use Tymon\JWTAuth\Contracts\JWTSubject;



class User extends Authenticatable  implements  JWTSubject
{   
    use Notifiable;
    public $timestamps = false;
    protected $guard='user';
    protected $fillable = ['name','secondname','email','password','verified'];
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
    public function Panier(){
        return $this->hasOne('App\Panier');
    }

    public function Wishlist(){
        return $this->hasOne('App\Wishlist');
    }

    public function Commande(){
        return $this->hasMany('App\Commande');
    }

    protected $casts = [
        'favs' => 'array',
    ];
}
