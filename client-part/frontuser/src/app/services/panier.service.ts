import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  public url ="http://127.0.0.1:8000";

  constructor(private tokenservice : TokenService ,private  httpclient :HttpClient) { }




showpanier(iduser){
  var t = this.tokenservice.getToken();
  const http_header = new HttpHeaders({'Authorization':'Bearer '+t});
  return this.httpclient.get(`${this.url}/api/user/${iduser}/panier`,{headers:http_header});

}  

deleteProduct(iduser,idproduct)
{
var t = this.tokenservice.getToken();
const http_header = new HttpHeaders({'Authorization':'Bearer '+t});
return this.httpclient.post(`${this.url}/api/user/paniers/${iduser}/Removeproduct/${idproduct}`,{},{headers:http_header});

}



addProduct(iduser,idproduct)
{
  var t = this.tokenservice.getToken();
const http_header = new HttpHeaders({'Authorization':'Bearer '+t});

  return this.httpclient.post(`${this.url}/api/user/paniers/${iduser}/${idproduct}`,{},{headers:http_header});

}




}
