<?php

namespace App\Http\Controllers;

use App\File;
use Illuminate\Http\Request;

class FileController extends Controller
{

    public function StoreFiles(Request $request, $idprod)
{

if($request->hasFile('image_prod'))
{   



    foreach( $request->files as  $file)
{


    $filename=$file->getClientOriginalName();
    $filesize=$file->getClientSize();
    $file->move(public_path() . '/Productsimg/',$file->getClientOriginalName());
    $filemodel = new File();
    $filemodel->filename = url('/Productsimg',$filename);
    $filemodel->filsize=$filesize;
    $filemodel->idproduct=$idprod;
    $filemodel->save();

    
}

}
else {
    return response()->json(['message'=>'image not found'],404);
}

return response()->json(['message'=>'image added',$filemodel],201);

}



public function getFirstImage($id){
    $image  = File::where('idproduct','=',$id)->first();

    if($image){
        return response()->json([$image],200);
    }
    else {
        return response()->json(['message'=>'image not found'],404);
    }
}


public function getImages($id){

$Images = File::where('idproduct','=',$id)->get();

if($Images){
    return response()->json(['message'=>'images found',$Images],200);
}
else {
    return response()->json(['message'=>'images not  found'],404);
}


}


}
