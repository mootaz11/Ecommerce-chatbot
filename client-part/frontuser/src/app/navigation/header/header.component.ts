import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { PanierService } from 'src/app/services/panier.service';
import { ProductService } from 'src/app/services/product.service';
import { SearchService } from 'src/app/services/search.service';
import { ChatbotService ,Message} from 'src/app/services/chatbot.service';
import {Observable} from 'rxjs';
import { scan } from 'rxjs/operators'




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})



export class HeaderComponent implements OnInit {
  messages : Observable<Message[]>;
  public conversation =[];
  public isLoggedin : Boolean=false ; 
  public signupform:FormGroup;
  public SearchForm:FormGroup;
  public loginform:FormGroup;
  public username : String ; 
  public wishlistnumber :String ;
  public productsPanier=[];
  public helpForm : FormGroup;
  public pricetotal =""; 
  public itemsNumber = "";
  
  
  constructor(private fb : FormBuilder , private panierService : PanierService ,
    
    private productService:ProductService,
    private userservice: UserService , private tokenservice:TokenService , 
    private router : Router,
    private dataservice : SearchService   ,
    private chat : ChatbotService  ) { }

 




  showpanier()
  {
      const userid= this.tokenservice.getpayload().sub;
      this.panierService.showpanier(userid).subscribe(resultat=>{
      this.pricetotal=" $ "+JSON.parse(JSON.stringify(resultat)).data.Price;
      this.productsPanier=JSON.parse(JSON.stringify(resultat)).data.items;
      
      console.log(JSON.parse(JSON.stringify(resultat)).data.items);
      console.log(this.productsPanier.length);

      this.itemsNumber=this.productsPanier.length.toString();
      
       

      this.productsPanier.map(product=>{
          
            this.productService.getImage(product.id).subscribe(resultat=>{
            product.image=JSON.parse(JSON.stringify(resultat))[0].filename ; 
            })
            
        })
        
         
        
        
        this.ngOnInit();
     }
      
      
      )
      

  }


  deleteProduct(idproduct)
  
  {


    console.log(idproduct);
    this.panierService.deleteProduct(this.tokenservice.getpayload().sub,idproduct).subscribe(resultat=>
      { 
        console.log(resultat);
        /*this.pricetotal=" $ "+JSON.parse(JSON.stringify(resultat)).data.Price;
        this.productsPanier=JSON.parse(JSON.stringify(resultat)).data.items;
        this.itemsNumber=this.productsPanier.length.toString();
        this.productsPanier.map(product=>{
        this.productService.getImage(product.id).subscribe(resultat=>{
          product.image=JSON.parse(JSON.stringify(resultat))[0].filename ; 
          })

    })*/
  });
  this.ngOnInit();

}
logout(){
  console.log('logout');
  this.tokenservice.logoutToken(true);
  
}

onHelpSubmit()

{
this.chat.converse(this.helpForm.value.helpquestion);
this.helpForm.reset();
}

ngOnInit() {


  this.messages=this.chat.conversation.asObservable().pipe(
    scan((acc, val) => acc.concat(val))
  );


  this.messages.subscribe(result=>
    {
      this.conversation=result
      this.conversation.map(message=>{
        if(message.sentBy=='user'){
          message.color='cornflowerblue'
          message.colortext='white',
          message.float ='left';
        }
        
        else {
          message.color='#ededed'
          message.colortext='black'
          message.float='right'
        }
      })
      console.log(this.conversation);
    }
  );


  this.tokenservice.logoutToken(false);  


    this.signupform=this.fb.group({
      name:['',[Validators.required]],
      email:['',[Validators.required]],
      secondname:['',[Validators.required]],
      password:['',[Validators.required]]
      });




    this.SearchForm=this.fb.group({
      searchField:['']
    }
    );
    this.helpForm = this.fb.group({
      helpquestion:['']
    });




    this.loginform=this.fb.group(
      {
      emaiLogin:['',[Validators.required]],
      passwordLogin:['',[Validators.required]]
      }
)

this.isLoggedin=this.tokenservice.isLoggedIn();
this.username=this.tokenservice.getUsername();
this.wishlistnumber=localStorage.getItem('wishlistSize');
}

Onsearch(){

  this.router.navigate(['/result',this.SearchForm.value.searchField]);
  this.SearchForm.reset();

}

onsignupSubmit()
{
  localStorage.setItem('email',this.signupform.value.email)
  this.userservice.adduser(this.signupform.value).subscribe(result=>{
    console.log(result);
  });}




onLoginSubmit()
      {
        
        console.log(this.loginform)
        this.userservice.login(this.loginform.value).subscribe(result=>{
          console.log(JSON.parse(JSON.stringify(result))[0]);
          this.tokenservice.setToken(JSON.parse(JSON.stringify(result)).access_token);

        this.tokenservice.setUsername(JSON.parse(JSON.stringify(result))[0].name);
        this.username=this.tokenservice.getUsername();
        
        console.log(this.tokenservice.getpayload());

        console.log(this.tokenservice.getUsername());
        this.isLoggedin=this.tokenservice.isLoggedIn();
        this.router.navigateByUrl('wishlist')
          setInterval(()=>{ document.location.reload();
          },3000);


      });
      }
  
}
  
    