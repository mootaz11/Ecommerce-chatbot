<?php

namespace App\Http\Controllers;

use App\Category;
use App\File;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Product;
use App\Subcategory;
use Illuminate\Http\Request;
use App\User ; 

class ProductController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($idsubcat)
    {
        $products=Product::where('idsouscat','=',$idsubcat)->get();

        return $this->sendResponse($products->toArray(), 'products retrieved successfully.');
    }

    public function allProductswithimage(){
            $productsArray=[];
            $products =Product::all()->toArray();
        
            if(sizeof($products)>0)
            {
               
                foreach ($products as $key => $product) {
                        $image=File::where('idproduct',$product['id'])->first();
                        array_push($productsArray,['image'=>$image,'product'=>$product]);
                    }
                    return response()->json(['message'=>'ok',$productsArray],200);
            }                
            
            else 
            {
                    return response()->json(['message'=>'products not found '],404);
            }
 }



    public function store(Request $request,$id)
    {
      

        $product = Product::create([
            
            'idsouscat'=> $id,
            'title'=>$request->get('title'),
            'details'=> $request->get('details'),
            'price'=> floatval($request->get('price')),
            'os_product'=> $request->get('os_product'),
            'Ram_product'=>$request->get('Ram_product'),
            'company'=>$request->get('company'),
            'status'=> $request->get('status'),
            "remise"=>$request->get('remise'),
            "Nbrvente"=>"0"
        ]
    );
        if($product){   
        return $this->sendResponse($product->toArray(), 'product created successfully.');
        }
        else {
            return $this->sendResponse($product,'error : product not uploaded');
        }
    }

   



    
    public function show($id)
    {
        $product = Product::find($id);
        if (is_null($product))
        {
            return $this->sendError('product not found.');
        }
        return $this->sendResponse($product->toArray(), 'one product retrieved successfully.');
    }


    public function update(Request $request, $id)
    {


        $product=Product::find($id);
        if ($request->has('img_product')) {
            $image = $request->file('img_product');
            $path = public_path() . '/Prodcutsimgs';
            $image->move($path,$image->getClientOriginalName());
            $product->img_product= $path.$image->getClientOriginalName();
        }

        $product->title =  $request->input('title');
        $product->details =  $request->input('details');
        $product->compagny =  $request->input('compagny');
        $product->os_product =  $request->input('os_product');
        $product->Ram_product =  $request->input('Ram_product');
        $product->price =  floatval($request->input('price'));
        $product->status =  $request->input('status');
        $product->save();
        return $this->sendResponse($product->toArray(), 'product updated successfully.');



    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return $this->sendResponse($product->toArray(), ' product deleted successfully.');
    }




    public function newProductsextract($number)
    {   $arrayNew =[];
       
        $newprods = Product::where('created_at','>=', date('Y-m-d', (time()-300000)))->get()->toarray();

        if($number<=sizeof($newprods))
        {
            for($i=0;$i<$number;$i++)
            {

                array_push($arrayNew,$newprods[$i]);

            }
            
            return response()->json($arrayNew,200);


        }
        
        else 
        
        {
            return response()->json(['message'=>'new products are limited'],200);
        }
        
        

    
    
    
    }





    public function getHotdeals(Request $request,$number)
    {
        $Products=Product::all();
        $ArrayP=$Products->toArray();
        $ArrayMax=0;
        $Hotsdeals=[];
        $index=0;
        for($i=0;$i<$number;$i++)
        {

        foreach ($ArrayP as $key=>$item)
        {
               
            if($item['remise']>$ArrayMax)
               {
                   $ArrayMax=$item['remise'];
                   $index=$key;
               }
        }


            array_push($Hotsdeals,$ArrayP[$index]);
            unset($ArrayP[$index]);
            $ArrayMax=0;
        }
        return $this->sendResponse($Hotsdeals, 'Hotdeals retrieved successfully.');
    }
    public function getTopsellings(Request $request,$id)
    
    
    {

        $Products=Product::where('Nbrvente','>',0)->get();
            if(sizeof($Products)>0)   
            {
                $ArrayP=$Products->toArray();
                $ArrayMax=0;
                $Top=[];
                $index=0;
                 if(sizeof($ArrayP)>=$id)
                 
                 {

                for($i=0;$i<$id;$i++){
                    foreach ($ArrayP as $key=>$item)
                     {
                        if($item['Nbrvente']>$ArrayMax)
                            {
                            $ArrayMax=$item['Nbrvente'];
                            $index=$key;
                            }
                    }
                    
                array_push($Top,$ArrayP[$index]);
    
                 unset($ArrayP[$index]);
                $ArrayMax=0;
            
                }
        return $this->sendResponse($Top, 'Top sellings retrieved successfully.');
        }
            else return response()->json(['message'=>'please pass another number']);
        }
    else return response()->json(['message'=>'no top selling']);
    }


    public function filterPrice(Request $request,$idcategory){


        $sub_categories = Subcategory::where('idcat',$idcategory)->get();
        $products=[];
        
            if(sizeOf($sub_categories)>-1)
            {
                foreach ($sub_categories as $sub_cat) 
                {
                    $products_by_sub = Product::where('idsouscat',$sub_cat->id)->get();
                    if(sizeOf($products_by_sub)>-1)
                    {
                       if(($request->get('pricemin')>0) || ( $request->get('pricemax')>0)  )
                         {
                        foreach($products_by_sub as $prod)
                                {
                                if(  ($prod->price>=$request->get('pricemin')) &&  (($prod->price)<=$request->get('pricemax')) )   
                                        {
                                    $images= File::where('idproduct',$prod->id)->first();
                                    array_push($products,['product_image'=>$images,'product'=>$prod]);    
                                        }
                                }
                            }
                        else {
                            foreach($products_by_sub as $prod)
                            {
                                $images= File::where('idproduct',$prod->id)->first();
                                array_push($products,['product_image'=>$images,'product'=>$prod]);    
                                
                            }

                        }
                    return response()->json([$products],200);
                    }
                else {
                    return response()->json(['message'=>'products not found '],404);
                }
            }

        }

        else {
            return response()->json(['message'=>'products not found '],404);

        }
        }



    public function SearchProduct($word)
    {
        $valueSearch=$word;
        $Products=Product::where('title','LIKE','%'.$valueSearch.'%')->orWhere('details','LIKE','%'.$valueSearch.'%')->get();
        if (($Products)->isEmpty())
        {
            return $this->sendError('search produt not found.');
        }
        return $this->sendResponse($Products, 'search retrieved successfully.');
    }



    public function getToprecommended(Request $request,$id)
    {
        
        $user=User::find($id);
        $favouritesSub=$user->favs;
        $Hotsdeals=[];
        
        
        
        foreach ($favouritesSub as $idsub)
        
        {
            $Products=Product::where('idsouscat',$idsub)->get();
            $ArrayP=$Products->toArray();
            $ArrayMax=0;
            $index=0;

                foreach ($ArrayP as $key=>$item)
                {
                    if($item['remise']>$ArrayMax){
                        $ArrayMax=$item['remise'];
                        $index=$key;
                    }
                }
                array_push($Hotsdeals,$ArrayP[$index]);
        }
        if(empty($Hotsdeals)){
            return $this->sendError('Top recommended not found.');
        }
        return $this->sendResponse($Hotsdeals, 'Top recommended retrieved successfully.');
    }





}
