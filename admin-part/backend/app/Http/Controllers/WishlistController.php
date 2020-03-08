<?php

namespace App\Http\Controllers;
use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Http\Request;
use App\wishlist;
use App\Product;

class WishlistController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $wishlist=Wishlist::all();
        return $this->sendResponse($wishlist->toArray(), 'wishlist retrieved successfully.');
    }
    


    
    public function store(Request $request,$id,$idproduct)
    {
        $wishlist=Wishlist::where('id_user','=',$id)->first();
        $product=Product::find($idproduct);
        if(is_null($wishlist)){
            $wishlist= Wishlist::create([
                'id_user'=> $id,
                'items'=>[ "0"=>$product]
            ]);}
        else {
            $items = $wishlist->items;
            array_push($items,$product);
            $wishlist->items=$items;
            $wishlist->save();
        }
        return $this->sendResponse($wishlist->toArray(), 'wishlist created or updated successfully.');
    }
    



    public function show($id)
    {
        $wishlist=Wishlist::Where('id_user',$id);
        if(is_null($wishlist)){
            return $this->sendResponse($wishlist, 'wishlist not found.');
        }
        else
        {
            return $this->sendResponse($wishlist->get()->toArray(), 'wishlist retrieved successfully.');
        }
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Wishlist $wishlist)
    {
        $wishlist->delete();
        return $this->sendResponse($wishlist->toArray(), 'wishlist deleted successfully.');
    }
    public function deleteProductByIdfromwishlist($id,$idproduct)
    {
        $wishlist=Wishlist::where('id_user','=',$id)->first();
        $items = $wishlist->items;
        //$items=array_diff($items,array($idproduct));
        $key = array_search($idproduct, $items);
        unset($items[$key]);
        $wishlist->items=$items;
        $wishlist->save();
        return $this->sendResponse($wishlist->toArray(), 'wishlist update successfully.');
    }
}
