<?php

namespace App\Http\Controllers;

use App\Mail\ConfirmationMail;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException as exception ; 

class userController extends Controller
{
    
    public function logoutUser (){
        try {

        auth('api')->logout();
        
        }
        
        
        catch(exception $e){
            
        }

        return response()->json(['message'=>'user logged out ']);

    }

    public function index()
    {

     $users = User::all();

     if(sizeof($users)>0){

        return response()->json(['Message'=>'here are users',$users],200);
     }

     else {
         return response()->json(['Message'=>'users not found'],400);
     }
    
    
    }


    public function show($iduser)
        {
        $user = User::findOrfail($iduser);

       
        return response()->json(['message'=>'user  found ',$user],200);
        
    }

    
    protected function sendMail($email){
        Mail::to($email)->send(new ConfirmationMail);
        return "mail has been sent , check your inbox";
    }


        protected function confirmmail(Request $request)
        {
            $user = User::where('email','=',$request->get('email'))->first();
            $user->verified=true; 
            
            if($user->save())
            {
                return response()->json(['message'=>'mail confirmed',$user->verified],200);
            }
            else 
            {
                
                return response()->json(['message'=>'mail confirmation failed try again'],400);

            }


        }


        protected function createUser(Request $request)
        {

            $user = new User();
            $user->name=$request['name'];
            $user->secondname=$request['secondname'];
            $user->email=$request['email'];
            $user->password=bcrypt($request['password']);
            if($user->save())
            {
                $mail_message=$this->sendMail($user->email);
                
            return response()->json(['message'=>'user created',$user/*,$mail_message*/],201);
            }
            else {
                return response()->json(['message'=>'error has been occured'],400);
            }
        }
    




    
public function update(Request $request, $iduser)
    {

            $user = User::findOrfail($iduser);
            if($user){
                $user->name=$request->input('name');
                $user->name=$request->input('secondname');
                $user->name=$request->input('email');
                $user->name=bcrypt($request->input('password'));

                if($user->save())
                {
                    return response()->json(['message'=>'update done',$user],200);
                }
                else {
                    return response()->json(['message'=>'update failed'],400);
                }

                    }
                else {
                    return response()->json(['message'=>'user not found'],404);
                }
    }

   
    public function destroy($iduser)
    {
        $user=User::find($iduser);
        if($user){
            if($user->delete()){
                return response()->json(['message'=>'destroying done',$user],200);
            }
            else {
                return response()->json(['message'=>'destroying failed'],400);
            }


        }
        else {
            response()->json(['message'=>'user not found'],400);
        }

    }

    

    public function userLogin(Request $request){

        $token = null;


        $user=User::where('email',$request['emaiLogin'])->first();


        


                if (!$token = auth('api')->attempt(['email'=>$request['emaiLogin'],'password'=>$request['passwordLogin']]) )
                        {

                        return response()->json([
                                'success' => false,
                                    'message' => 'Invalid Email or Password',
                                    ], 401);
                        }

                        return response()->json(
                            [
                           'access_token'=>$token,
                           'token_type'=>'bearer',
                           'expires_in' => auth('api')->factory()->getTTL() * 60,
                           $user
                           ]
                        );

                }
        
        

   

            
          


}