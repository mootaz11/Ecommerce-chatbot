import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  public token:String ;
  
  
  constructor() { }


  isTokenExpired()
  
  {
      
    if(this.isValid())
      
      {
    const diff  =  this.getpayload().exp-this.getpayload().iat;
    const diff1 = ((new Date().getTime())/1000)-this.getpayload().iat;  
    

    if(diff1>=diff)
    {
      return true;
    }
    
    else {
      return false ; 
    }
  
  }
  }
  
  




logoutToken(b){
    
    
  if(this.isTokenExpired()){
      this.deleteToken();
      localStorage.removeItem('username');
      localStorage.removeItem('wishlistSize');
      document.location.reload();
    }
  else if(b) {
    this.deleteToken();
      localStorage.removeItem('username');
      localStorage.removeItem('wishlistSize');
      document.location.reload();
  }


  }




  setUsername(username){
    localStorage.setItem('username',username);
  }
  getUsername(){
    return localStorage.getItem('username');
  }
  deleteUsername(){
    localStorage.removeItem('username');
  }



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
            return (payload.iss ==='http://127.0.0.1:8000/api/login/user') ? true : false ;
          }


    }
    return false ;

  }


  deleteToken(){
    localStorage.removeItem('token');
  }
  
  
  getpayload()
  
  
  {
    const payload = JSON.parse(atob(this.getToken().split('.')[1]))
    return payload;

  }


  isLoggedIn()
  {
    return this.isValid();
  }





}
