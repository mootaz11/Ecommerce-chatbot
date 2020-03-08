import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './services/token.service';


@Injectable({
  providedIn: 'root'
})


export class ProductService {
  public url="http://127.0.0.1:8000"
  constructor(private http :HttpClient,private tokenservice:TokenService) { }




addImage(image_prod:File,idprod){
  const t = this.tokenservice.getToken()
  const http_header = new HttpHeaders({'Authorization' : "Bearer " + t})
  const fd= new FormData()
  fd.append('image_prod',image_prod,image_prod.name);
return this.http.post(`${this.url}/api/admin/${idprod}/addimage`,fd,{headers:http_header});

}

getImage(idproduct){
  return this.http.get(`${this.url}/api/${idproduct}/getImage`);

 }
 getProduct(idproduct)
 {
   return this.http.get(`${this.url}/api/${idproduct}/getProduct`);
 }

 getImages(idproduct){
   return this.http.get(`${this.url}/api/${idproduct}/getImages`);
        }


deleteProduct(idprod)
{
  const t = this.tokenservice.getToken()
  const http_header = new HttpHeaders({'Authorization' : "Bearer " + t})
  return this.http.delete(`${this.url}/api/admin/deleteProduit/${idprod}`,{headers:http_header});
}


getProductsWithimage(){
  
  const t = this.tokenservice.getToken()
  const http_header = new HttpHeaders({'Authorization' : "Bearer " + t})
  return this.http.get(`${this.url}/api/admin/getAllproductsWithimage`,{headers:http_header});

}



addproduct(idsubcat,product){
  const t = this.tokenservice.getToken();
  const http_header = new HttpHeaders({'Authorization' : "Bearer " + t})
  return this.http.post(`${this.url}/api/admin/products/${idsubcat}/addproduct`,product,{headers:http_header});

}



}
