<?php

namespace App\Http\Controllers;

use App\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Contracts\Providers\JWT;
use Tymon\JWTAuth\Facades\JWTAuth;

class adminController extends Controller
{



    public function __construct()
    {

        }



    protected function createAdmin(Request $request)
    {
        $admin = new Admin();
        
        $admin->name=$request['name'];
        $admin->secondname=$request['secondname'];
        $admin->email=$request['email'];
        $admin->password=bcrypt($request['password']);
        
        if($admin->save()){
        
            return response()->json(['message'=>'admin has been  created',$admin],201);
                }


        else {
            return response()->json(['message'=>'error has been occured'],400);
        }
    }



public function adminLogin(Request $request){

        $token = null;
    if (!$token = auth('admin')->attempt(['email'=>$request['emaillogin'],'password'=>$request['passwordlogin']]) )
        {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Email or Password',
            ], 401);
        
        
        }
       
                  return response()->json([
                    'access_token'=>$token,
                    'token_type'=>'bearer',
                    'expires_in' => auth('admin')->factory()->getTTL() * 60,
                    'admin'=>auth('admin')->user()->id]);

                }
        
}
