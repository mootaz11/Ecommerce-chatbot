<?php

namespace App\Http\Controllers;

use App\Subcategory;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Category;
use App\File;
use App\Product;

class CategoryController extends BaseController
{
    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\Response
     */
    
     public function index()
    {
        $category = Category::all();
        return $this->sendResponse($category->toArray(), 'category retrieved successfully.');
    }




    public function getAllproductsbyCategory ($id) {
            $sub_categories = Subcategory::where('idcat',$id)->get();
        $products=[];
        
            if(sizeOf($sub_categories)>-1)
            {
                foreach ($sub_categories as $sub_cat) 
                {
                    $products_by_sub = Product::where('idsouscat',$sub_cat->id)->get();
                    
                    if(sizeOf($products_by_sub)>-1)
                    {
                        foreach($products_by_sub as $prod)
                        {
                            
                            $images= File::where('idproduct',$prod->id)->first();
                            array_push($products,['product_image'=>$images,'product'=>$prod]);    
                        }
                    }
                    else 
                    {
                        return response()->json(['message'=>'products not found'],404);
                    }

                }
                return response()->json(['message'=>'products found ',$products],200);

            }
            else {
                return response()->json(['message'=>'sub cat not found'],404);
            }
            
    }



    public function store(Request $request)
    {
        
        $input = $request->all();
        if ($request->has('icon_cat')) {
            // Get image file
            $image = $request->file('icon_cat');
            $path = public_path() . '/CategoryIcons';
            $image->move($path, $image->getClientOriginalName());
            // Make a image name based on user name and current timestamp
        }
       
        $category = Category::create([
            'name_cat' => $request->get('name_cat'),
            'icon_cat' => $path.$image->getClientOriginalName()
        ]);
        return $this->sendResponse($category->toArray(), 'category created successfully.');
    }




    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = Category::find($id);
       if (is_null($category))
        {
            return $this->sendError('category not found.');
        }
        return $this->sendResponse($category->toArray(), 'category retrieved successfully.');
    }




    public function showSubcategories($id)
    {
        $subcategories=Subcategory::where('idcat','=',$id)->get();
        return $this->sendResponse($subcategories, 'category retrieved successfully.');
    }
    



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    
     
    
    public function update(Request $request, $id)
    {
        $category = Category::find($id);
        if ($request->has('icon_cat')) {
            $image = $request->file('icon_cat');
            $path = public_path() . '/CategoryIcons/';
            $image->move($path,$image->getClientOriginalName());
            $category->icon_cat= $path.$image->getClientOriginalName();
        }

        $category->name_cat = is_null($request->input('name_cat') )? $category->name_cat: $request->input('name_cat');
        $category->save();
        return $this->sendResponse($category->toArray(), 'category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return $this->sendResponse($category->toArray(), ' category deleted successfully.');
    }
}
