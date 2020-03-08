import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/services/categorie.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public Categories = [] ; 
  constructor(private categorieService : CategorieService , private route : Router) { }

  ngOnInit() {

      this.getCategories();

  }

getCategories()
{

  this.categorieService.getAllCategories().subscribe(result=>{
    this.Categories = JSON.parse(JSON.stringify(result)).data; 
    console.log(this.Categories);
  })

}

}
