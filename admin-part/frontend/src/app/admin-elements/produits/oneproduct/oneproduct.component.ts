import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ProductService } from 'src/app/product.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-oneproduct',
  templateUrl: './oneproduct.component.html',
  styleUrls: ['./oneproduct.component.scss']
})
export class OneproductComponent implements OnInit {
   public produit = null;
   public isOpened = false ; 
   public source="" ;
   public images = [];
   public image='';
   public product;

   


  constructor(private Actroute:ActivatedRoute, private router: Router,private _snackBar: MatSnackBar,private productservice:ProductService) {
     

   }

   deleteproduct(){
     this.productservice.deleteProduct(this.Actroute.snapshot.params['idproduit']).subscribe(result=>{
       this.router.navigateByUrl('adminnav/produits');
       this._snackBar.open(JSON.parse(JSON.stringify(result)).message.toString(), 'close', {
        duration: 2000,
        });  
       
     })

   }
   getProduct() {
    this.productservice.getProduct(this.Actroute.snapshot.params['idproduit']).subscribe(
      resultat => {
        this.product = JSON.parse(JSON.stringify(resultat)).data;
      this.product.newprice=((this.product.price)*((100-this.product.remise)/100)).toString();
      console.log(this.product);

      }
   
        )




    this.productservice.getImage(this.Actroute.snapshot.params['idproduit']).subscribe(resultat=>{
              this.image=JSON.parse(JSON.stringify(resultat))[0].filename;

      })

  }



  getImages() {
    var idproduct = this.Actroute.snapshot.params['idproduit'];
    this.productservice.getImages(idproduct).subscribe(resultat => {
      this.images = JSON.parse(JSON.stringify(resultat))[0]

    })
  }

  ngOnInit() {
    this.getProduct();
    this.getImages();

  }

}
