import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private url ="http://127.0.0.1:8000";
  constructor(private httpclient : HttpClient , private token : TokenService)
  {}




  addToWishlist(idproduct){
    var t=this.token.getToken();
    var headers_object = new HttpHeaders({'Authorization' : "Bearer " + t});
    return this.httpclient.post(`${this.url}/api/user/wishlist/${this.token.getpayload().sub}/${idproduct}`,{},{headers:headers_object});

}

  getwishlist():Observable<any[]>{
    var t=this.token.getToken();
    var headers_object = new HttpHeaders({'Authorization' : "Bearer " + t});
    return this.httpclient.get<any[]>(`${this.url}/api/user/wishlist/${this.token.getpayload().sub}`,{headers:headers_object});
  }




}
