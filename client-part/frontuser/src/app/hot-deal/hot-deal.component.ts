import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { HotdealService } from '../services/hotdeal.service';
import { ProductService } from '../services/product.service';
import { WishlistService } from '../services/wishlist.service';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-hot-deal',
  templateUrl: './hot-deal.component.html',
  styleUrls: ['./hot-deal.component.css']
})
export class HotDealComponent implements OnInit {
  public products = [

  ]

  

  constructor(private tokenservice : TokenService,
    private hotdealService : HotdealService,
    private productService : ProductService,
    private wishlistService : WishlistService,
    private panierService : PanierService,
    private tokenService : TokenService
    
    ) { }



    addToWishlist(idproduct)
    
    {
      this.wishlistService.addToWishlist(idproduct).subscribe(resultat=>{
        console.log(resultat);
      })
    }

    
    addproducttoPanier(idproduit)
    {
      const iduser = this.tokenService.getpayload().sub;
      this.panierService.addProduct(iduser,idproduit).subscribe(resultat=>{
        console.log(resultat);
      })
      
  
    }


  ngOnInit(){
     this.hotdealService.getHotdeal(4).subscribe(resultat=>{
        this.products=JSON.parse(JSON.stringify(resultat)).data

        this.products.map(product=>{
          this.productService.getImage(product.id).subscribe(resultat=>{
            product.image=JSON.parse(JSON.stringify(resultat))[0].filename;
          })
        })

        
        this.products.map(product=>{
            product.newprice=((product.price)*((100-product.remise)/100)).toString();
        });



      })


}







}
