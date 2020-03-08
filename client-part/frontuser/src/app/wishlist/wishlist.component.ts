import { Component, OnInit } from '@angular/core';
import {TokenService} from '../services/token.service';
import { WishlistService } from '../services/wishlist.service';
import { ProductService } from '../services/product.service';
import { PanierService } from '../services/panier.service';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  public username:String ;
  
  public products =[]

  

  constructor(private tokenservice : TokenService ,
    private wishservice : WishlistService,
    private productService :ProductService,
    private panierService: PanierService) 
    
    
    { }
  
    addproducttoPanier(idproduit)
  {
    const iduser = this.tokenservice.getpayload().sub;
    this.panierService.addProduct(iduser,idproduit).subscribe(resultat=>{
      console.log(resultat);
    })
    

  }
  ngOnInit() {
    this.username=this.tokenservice.getUsername();

    this.wishservice.getwishlist().subscribe(resultat=>{
      
     
      this.products=JSON.parse(JSON.stringify(resultat)).data[0].items
      this.products.map(product=>{
          this.productService.getImage(product.id).subscribe(resultat=>{
          product.image=JSON.parse(JSON.stringify(resultat))[0].filename; 
          })
          
      })

      console.log(this.products);
      localStorage.setItem('wishlistSize',this.products.length.toString());

    })
  
  }

}
