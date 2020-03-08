import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './services/token.service';


@Injectable({
  providedIn: 'root'
})

export class SubcategoryService 
{
  url="http://127.0.0.1:8000"
  constructor(private http:HttpClient , private tokenservice : TokenService) { }




  
getSubCategories()

{

const t = this.tokenservice.getToken();
const http_header = new HttpHeaders({'Authorization' : "Bearer " + t});
return this.http.get(`${this.url}/api/admin/getAllsubCategories`,{headers:http_header});

}




}
