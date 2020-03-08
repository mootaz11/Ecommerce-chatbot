import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private url ="http://127.0.0.1:8000";
  constructor(private httpclient:HttpClient , private tokenservice : TokenService) { }



getAllcommands(){
  var t = this.tokenservice.getToken();
 

  const http_headers = new HttpHeaders({'Authorization':'Bearer '+t});
  const iduser=this.tokenservice.getpayload().sub;
 return this.httpclient.get(`${this.url}/api/user/${iduser}/getAllcommands`,{headers:http_headers});
  

}


addCommande(userinfo,idpanier)
{

var t = this.tokenservice.getToken();
const http_headers = new HttpHeaders({'Authorization':'Bearer '+t});

return this.httpclient.post(`${this.url}/api/user/panier/${idpanier}/order`,userinfo,{headers:http_headers});

}


getCommande(idcommande)
{

var t = this.tokenservice.getToken();
const http_headers = new HttpHeaders({'Authorization':'Bearer '+t});

return this.httpclient.get(`${this.url}/api/user/${idcommande}/getcommande`,{headers:http_headers});

}


gettAllcommandes(iduser)
{

  var t = this.tokenservice.getToken();
  const http_headers = new HttpHeaders({'Authorization':'Bearer '+t});
  return this.httpclient.get(`${this.url}/api/user/${iduser}/getorders`,{headers:http_headers});
}

deleteorder(idorder)
{
  var t = this.tokenservice.getToken();
  const http_headers = new HttpHeaders({'Authorization':'Bearer '+t});

return this.httpclient.post(`${this.url}/api/user/${idorder}/deleteCommande`,{},{headers:http_headers});

}



}
