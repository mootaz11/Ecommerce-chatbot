import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import {Product} from '../interfaces/product';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url ="http://127.0.0.1:8000";

  constructor(private httpclient : HttpClient , private router : Router, private token : TokenService) 
  {}


 getImage(idproduct){
   return this.httpclient.get(`${this.url}/api/${idproduct}/getImage`);
 
  }

getImages(idproduct){
  return this.httpclient.get(`${this.url}/api/${idproduct}/getImages`);

}

getTopSelling(number=4)
{
return this.httpclient.get(`${this.url}/api/topselling/${number}`);

}






getProduct(idproduct):Observable<Product>
  {


  return this.httpclient.get<Product>(`${this.url}/api/${idproduct}/getProduct`);
  
}

filterByprice(idcategory,pricemax,pricemin)

{

  if(pricemax===''){pricemax='0'}
if(pricemin===''){pricemin='0'}

return this.httpclient.post(`${this.url}/api/productsfilter/${idcategory}`,{pricemax,pricemin});

}
getRecommanded()
{
  var t = this.token.getToken();
  const http_headers = new HttpHeaders({'Authorization':'Bearer '+t});
  const iduser = this.token.getpayload().sub;
  return this.httpclient.get(`${this.url}/api/user/${iduser}/getRecommanded`,{headers:http_headers});

}
getNewProducts(number=4)
{
return this.httpclient.get(`${this.url}/api/${number}/getNewProducts`);

}

getSearchResult(word){
  return this.httpclient.get(`${this.url}/api/searchproduct/${word}`);
}



}
