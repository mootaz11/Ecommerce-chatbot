import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { TokenService } from 'src/app/services/token.service';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-oneproduct',
  templateUrl: './oneproduct.component.html',
  styleUrls: ['./oneproduct.component.css']
})
export class OneproductComponent implements OnInit {

  public product =null;
  public images = [];
  public image='';
  constructor(private productservice: ProductService, private Actroute: ActivatedRoute,
    private tokenService:TokenService,
    private panierService : PanierService
    
    ) {

  }






  addToPanier(){
    const iduser = this.tokenService.getpayload().sub;
    
    this.panierService.addProduct(iduser,this.Actroute.snapshot.params['idproduct']).subscribe(resultat=>{
      console.log(resultat);
  }
    )
  
  }

  ngOnInit() {
    
    this.getProduct();
    this.getImages();

  }


  getProduct() {
    this.productservice.getProduct(this.Actroute.snapshot.params['idproduct']).subscribe(
      resultat => {
        this.product = JSON.parse(JSON.stringify(resultat)).data;
      this.product.newprice=((this.product.price)*((100-this.product.remise)/100)).toString();
      
      }
   
        )




    this.productservice.getImage(this.Actroute.snapshot.params['idproduct']).subscribe(resultat=>{
              this.image=JSON.parse(JSON.stringify(resultat))[0].filename;
      })


  }


  getImages() {
    var idproduct = this.Actroute.snapshot.params['idproduct'];
    this.productservice.getImages(idproduct).subscribe(resultat => {
      this.images = JSON.parse(JSON.stringify(resultat))[0]

    })
  }



  changeImage(event) {
    const imagesrc = event.target.src.toString();
    document.getElementById('main_image').setAttribute('src', imagesrc);
  }







}
