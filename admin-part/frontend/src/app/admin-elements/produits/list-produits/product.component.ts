import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public products=[];
     public  produits=[
       {idproduit:1, souscat:'Shirt',name:'Denim shirt',price:'120$',imageSource:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12.jpg"},
       {idproduit:2, souscat:'Shirt',name:'Denim shirt',price:'120$',imageSource:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/13.jpg"},
       {idproduit:3, souscat:'Shirt',name:'Denim shirt',price:'120$',imageSource:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/14.jpg"},       
       {idproduit:4, souscat:'Shirt',name:'Denim shirt',price:'120$',imageSource:"https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/15.jpg"}
      
      ];
  
  
  
     constructor(private productService : ProductService) { }

  ngOnInit() {

this.productService.getProductsWithimage().subscribe(result=>{
  JSON.parse(JSON.stringify(result))[0].map(element=>{
      this.products.push({product:element.product,image:element.image.filename})
      
  });
  
console.log(this.products);
})

  }

}
