import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouteReuseStrategy, Router } from '@angular/router';
import { SouscategorieService } from 'src/app/services/souscategorie.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { Location } from '@angular/common';
import { PanierService } from 'src/app/services/panier.service';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { TokenService } from 'src/app/services/token.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray, Form } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})



export class ProductsComponent implements OnInit {
  public numberPage = 1;
  public SubCategories = [];
  public products = [];
  public images = [];
  public pricemin = "";
  public pricemax = "";
  public src = 'http://127.0.0.1:8000/Productsimg/product03.png';
  myform: FormGroup;



  constructor(private Activeroute: ActivatedRoute, private categorieService: CategorieService,
    private route: Router,
    private location: Location,
    private panierService: PanierService,
    private tokenService: TokenService,
    private wishlistService: WishlistService,
    private fb: FormBuilder,
    private productService:ProductService
  ) { }

  changeNumber(number, event) {
    this.numberPage = number;
    console.log(event.target);
    this.ngOnInit();
  }


  



  onKeydown(event) 
  
  {

    const tab = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

    if (tab.indexOf(event.key) >-1) 
    {
      
      
      if (event.target.id == "price-max") 
      {
        this.pricemax += event.key;
      
      }

      else {
    this.pricemin += event.key;
      }
    }
if(event.key=='Backspace'){
      if (event.target.id == "price-max") 
      {
      this.pricemax= this.pricemax.substring(0,this.pricemax.length-1);
      }
      else {
          this.pricemin= this.pricemin.substring(0,this.pricemin.length-1);
          }
}
    

if(this.pricemax!='' || this.pricemin !=''){
    this.products = [];
    this.productService.filterByprice(this.Activeroute.snapshot.params['idcategorie'],this.pricemax,this.pricemin).subscribe(result=> {
      JSON.parse(JSON.stringify(result))[0].map(resultat => {
          resultat.product.image = resultat.product_image.filename.toString();
          this.products.push(resultat.product);

      });

      this.products.map(product => {
        product.newprice = ((product.price) * ((100 - product.remise) / 100)).toString();

      });

    })

   
    console.log("price max : " + this.pricemax);
    console.log("price min : " + this.pricemin);
  }

else 
{
  this.products=[];
  this.getSubCategorieByCategorie();


}

  }





  ngOnInit(){

    this.getProductsByCategorie(this.numberPage);
    this.getSubCategorieByCategorie();



    // Simply add the list of FormControls to the FormGroup as a FormArray
    this.myform = this.fb.group({


    });



  }
  submit() {
    console.log('hello');
  }


  addproducttoPanier(idproduit) {
    const iduser = this.tokenService.getpayload().sub;
    this.panierService.addProduct(iduser, idproduit).subscribe(resultat => {
      console.log(resultat);
    })
  }





  addToWishlist(idproduit) {
    this.wishlistService.addToWishlist(idproduit).subscribe(resultat => {
      console.log(resultat);
    })

  }






  getProductsByCategorie(number) {
    this.products = [];

    this.categorieService.getProductsByCategorie(this.Activeroute.snapshot.params['idcategorie']).subscribe(result => {
      JSON.parse(JSON.stringify(result))[0].map(resultat => {


        if ((resultat.product.id > (number - 1) * 9) && (resultat.product.id <= (9 * number))) {
          resultat.product.image = resultat.product_image.filename.toString();
          this.products.push(resultat.product);
        }

      });

      this.products.map(product => {
        product.newprice = ((product.price) * ((100 - product.remise) / 100)).toString();

      });

    })

  }










  getSubCategorieByCategorie() {
    this.categorieService.getSubCategories(this.Activeroute.snapshot.params['idcategorie']).subscribe(result => {

      this.SubCategories = JSON.parse(JSON.stringify(result)).data;





    })




  }



}
