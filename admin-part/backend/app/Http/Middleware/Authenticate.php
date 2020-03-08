<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Support\Facades\Auth;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            return route('login');
        }
    }



    public function handle($request, Closure $next, $guards = NULL)
    {

        if($guards=="admin" && Auth::guard($guards)->check()){
            return response()->json(['message'=>'welcome']);
        }
        if($guards=="user"&& Auth::guard($guards)->check()){
            return response()->json(['message'=>'welcome']);

        }
        if(Auth::guard()->check())
            {
                return response()->json(['message'=>'home']);

            }


            return $next($request);

    }
}
