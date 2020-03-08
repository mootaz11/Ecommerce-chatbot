import { Injectable } from '@angular/core';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public token:String ;
  
  constructor() { }


  
  setToken(token){

    localStorage.setItem('token',token);
  }
  
  
  
  getToken(){

    return localStorage.getItem('token');
  }



  isValid(){

    const token =this.getToken();
    if(token){

        const payload=this.getpayload();
        if(payload)
          {
            return (payload.iss ==='http://127.0.0.1:8000/api/login/admin') ? true : false ;
          }


    }
    return false ;

  }


  deleteToken(){
    localStorage.removeItem('token');
  }
  
  
  getpayload(){
    
    const payload = JSON.parse(atob(this.getToken().split('.')[1]))
    
    return payload;

  }
  isLoggedIn()
  {

    return this.isValid();
  }





}
