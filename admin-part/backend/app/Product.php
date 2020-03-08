<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //

    protected $fillable = [
        'idsouscat','title','details','price','status','os_product','Ram_product','company','remise','Nbrvente'
    ];

    public function subcategory(){
        return $this->belongsTo('App\Subcategory');
    }
    public function product(){
        return $this->hasMany('App\File');
    }

}
