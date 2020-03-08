import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { TokenService } from './token.service';
import {User} from '../interfaces/user';
import { Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})


export class UserService {
public url ="http://127.0.0.1:8000";

  constructor(private httpclient : HttpClient , private router : Router , private token : TokenService) 
  {}


  login(data){
    return this.httpclient.post(`${this.url}/api/login/user`,data);

  }


confirmMail(email)
{
return this.httpclient.post(`${this.url}/api/confirmmail`,{email});
}


getUser(iduser):Observable<any>{
  var t=this.token.getToken();
  console.log(t);
  var headers_object = new HttpHeaders({'Authorization' : "Bearer " + t});
  return this.httpclient.get(`${this.url}/api/user/${iduser}`,{headers:headers_object});

}


  adduser(data)
{
  return this.httpclient.post(`${this.url}/api/signup/user`,data);
}







}
