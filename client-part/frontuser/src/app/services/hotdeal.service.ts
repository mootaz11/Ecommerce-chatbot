import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotdealService {
    private url ="http://127.0.0.1:8000";
    constructor(private httpclient : HttpClient){}
  
  
  
getHotdeal(number){
  
  return this.httpclient.get(`${this.url}/api/hotdeals/${number}`);

}  
  
}
