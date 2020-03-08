<?php


use App\Http\Controllers\FileController;
use App\Http\Controllers\userController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route; 





Route::post('/login/user','userController@userLogin');
Route::post('/login/admin','adminController@adminLogin');




Route::post('/signup/admin','adminController@createAdmin');
Route::post('/signup/user','userController@createUser');
Route::put('/confirmationmail','userController@confirmmail');
Route::get('category/{id}/getsubcategories','CategoryController@showSubcategories');
Route::get('getAllCategories','CategoryController@index');
Route::get('category/{id}/getsubcategories','CategoryController@showSubcategories');
Route::get('{idsubcat}/allproducts','ProductController@index');
Route::get('{idprod}/getImages','FileController@getImages');
Route::get('{idprod}/getImage','FileController@getFirstImage');
Route::get('/{idproduct}/getProduct','ProductController@show');
Route::get('{idcat}/getAllproducts','CategoryController@getAllproductsbyCategory');
Route::get('hotdeals/{Number}','ProductController@getHotdeals');
Route::get('topselling/{Number}','ProductController@getTopsellings');
Route::get('searchproduct/{word}','ProductController@SearchProduct');
Route::get('{number}/getNewProducts','ProductController@newProductsextract');

Route::post('confirmmail','userController@confirmmail');

Route::post('productsfilter/{idcategory}','ProductController@filterPrice');

Route::get('{idcategory}/getSubcategory','ProductController@getProductsByCategory');


Route::group(['prefix' => 'admin','middleware' => ['assign.guard:admin','jwt.auth']],function ()
{
    

    //Category
    Route::post('addcategory', 'CategoryController@store');
    Route::post('updatecategory/{id}','CategoryController@update');
    Route::get('category/{id}/getsubcategories','CategoryController@showSubcategories');
    Route::get('getAllCategories','CategoryController@index');
    
    //subCategory
    Route::post('category/{id}/subcategory/createSubcategorie', 'SubcategoryController@store');
    Route::post('category/{id}/subcategory/{id1}','SubcategoryController@update');
    Route::get('subcategory/{id}','SubcategoryController@show');
    Route::get('getAllsubCategories','SubCategoryController@index');
    Route::get('getcategory/{id}/subcategory/{id1}','SubcategoryController@getCategory');



    //Product
    Route::post('products/{id}/addproduct','ProductController@store');
    Route::delete('deleteProduit/{idproduit}','ProductController@destroy');
    
    Route::post('updateproduct/{id}','ProductController@update');
    Route::get('{idsubcat}/allproducts','ProductController@index');
    Route::get('/allNewProducts','ProductController@newProductsextract');
    Route::get('/{idproduct}/getProduct','ProductController@show');

    //image
    Route::post('{idprod}/addimage','FileController@StoreFiles');
    Route::get('{idprod}/getImages','FileController@getImages');

    Route::get('getAllproductsWithimage','ProductController@allProductswithimage');

});
    



Route::group(['prefix' => 'user','middleware' => ['assign.guard:api','jwt.auth']],function ()
{
    
    Route::get('/{iduser}','userController@show');
    Route::post('/{userid}/update','userController@update');
    Route::get('logoutUser','userController@logoutUser');
    Route::post('paniers/{iduser}/{idproduct}','PanierController@store');
    Route::get('paniers/{id}/products','PanierController@getAllproductsOfPanierAndTotal');

    //delete product from panier
    Route::post('paniers/{id}/Removeproduct/{idproduct}','PanierController@deleteProductByIdfromPanier');
    Route::get('{iduser}/panier','PanierController@show');
    Route::post('panier/{idpanier}/order','CommandeController@store');
    Route::get('order/{id}/getproducts','CommandeController@getProductsOfOrder');
    Route::get('user/{iduser}/getorders','CommandeController@getAlluserOrders');
    Route::get('{idcommande}/getcommande','CommandeController@show');
    Route::post('wishlist/{iduser}/{idproduct}','WishlistController@store');
    Route::post('{idcommande}/deleteCommande','CommandeController@destroy');
    Route::get('wishlist/{iduser}','WishlistController@show');
    Route::post('wishlist/{id}/Removeproduct/{idproduct}','WishlistController@deleteProductByIdfromwishlist');
    Route::get('{iduser}/getAllcommands','CommandeController@getAlluserOrders');
    Route::get('{iduser}/getRecommanded','ProductController@getToprecommended');
});




