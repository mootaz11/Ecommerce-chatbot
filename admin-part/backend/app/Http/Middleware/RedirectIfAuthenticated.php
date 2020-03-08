<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = NULL)
    {   

        


        if($guard=="admin" && Auth::guard($guard)->check()){
            return response()->json(['message'=>'welcome']);
        }
        if($guard=="user"&& Auth::guard($guard)->check()){
            return response()->json(['message'=>'welcome']);

        }
        if(Auth::guard()->check())
            {
                return response()->json(['message'=>'home']);

            }


            return $next($request);

    }
}
