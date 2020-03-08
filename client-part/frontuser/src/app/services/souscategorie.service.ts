import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SouscategorieService {

  
  constructor(private httpclient : HttpClient , private router : Router) 
  {}

}
