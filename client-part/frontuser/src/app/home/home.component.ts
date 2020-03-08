import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public topsellings=[];
  public newProducts=[];

  constructor(private productService : ProductService,private router :Router ,private userservice : UserService,private actroute: ActivatedRoute) { }


getNewProducts()

{
this.productService.getNewProducts().subscribe(resultat=>{
  console.log(resultat);
      this.newProducts=JSON.parse(JSON.stringify(resultat))
      this.newProducts.map(product=>{
      this.productService.getImage(product.id).subscribe(
        
        resultat=>{product.image=JSON.parse(JSON.stringify(resultat))[0].filename;})


  })

  this.newProducts.map(product=>{
    product.newprice=((product.price)*((100-product.remise)/100));
  });



console.log(this.newProducts);


})

}







getTopSelling(){
  this.productService.getTopSelling().subscribe(resultat=>{
        this.topsellings=JSON.parse(JSON.stringify(resultat)).data;
       
        this.topsellings.map(product=>{
          this.productService.getImage(product.id).subscribe(
            
            resultat=>{product.image=JSON.parse(JSON.stringify(resultat))[0].filename;})
  

      })

      this.topsellings.map(product=>{
        product.newprice=((product.price)*((100-product.remise)/100));
      });
})
 

}

  
  ngOnInit() 
  {

    this.actroute.url.subscribe(url=>
    {
          if(url[0].path=="confirmmail"){
            this.userservice.confirmMail(localStorage.getItem('email')).subscribe(result=>{
              localStorage.removeItem('email');
              this.router.navigateByUrl('');
            })
          }
    }
    );
  
    this.getTopSelling();
    this.getNewProducts();
  
    
    
        var deadline = new Date("jan 10, 2020 16:47:00").getTime(); 
        var x = setInterval(function() { 
        var now = new Date().getTime(); 
        var t = deadline - now; 
        var days = Math.floor(t / (1000 * 60 * 60 * 24)); 
        var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
        var seconds = Math.floor((t % (1000 * 60)) / 1000); 

        document.getElementById("day").innerHTML =days.toString() ; 
        document.getElementById("hour").innerHTML =hours.toString(); 
        document.getElementById("minute").innerHTML = minutes.toString();  
        document.getElementById("second").innerHTML =seconds.toString();  
      
      if (t < 0) { 
              clearInterval(x); 
              document.getElementById("day").innerHTML ='0'; 
              document.getElementById("hour").innerHTML ='0'; 
              document.getElementById("minute").innerHTML ='0' ;  
              document.getElementById("second").innerHTML = '0'; } 
      }, 1000);
    }


}
