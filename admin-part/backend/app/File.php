<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected  $fillable=['filename','filesize','idproduct'];


    public function File()
    {

        return $this->belongsTo('App/Product');


    }
}
