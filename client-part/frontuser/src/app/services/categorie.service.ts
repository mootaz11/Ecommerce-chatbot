import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Categorie} from '../interfaces/categorie';
import {Souscat} from '../interfaces/souscat';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import {Product} from '../interfaces/product';



@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  public url ="http://127.0.0.1:8000";


  constructor(private httpclient : HttpClient , private router : Router, private token : TokenService) 
  {}


getProductsByCategorie(idcategorie):Observable<Product[]>{

  return this.httpclient.get<Product[]>(`${this.url}/api/${idcategorie}/getAllproducts`);

}

getSubCategories(id):Observable<Souscat>{

var t = this.token.getToken();
const http_header = new HttpHeaders({'Authorization':'Bearer '+t});
return this.httpclient.get<Souscat>(`${this.url}/api/category/${id}/getsubcategories`,{headers:http_header}); 

}

getAllCategories():Observable<Categorie[]>

{
 
  var t = this.token.getToken()
  console.log(t);
  const http_header = new HttpHeaders({'Authorization':'Bearer '+t});

return this.httpclient.get<Categorie[]>(`${this.url}/api/getAllCategories`,{headers:http_header});

}



}
