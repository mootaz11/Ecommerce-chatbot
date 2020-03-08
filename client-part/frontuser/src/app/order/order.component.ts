import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder , Validators} from '@angular/forms' ; 
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';
import {User} from '../interfaces/user';
import { PanierService } from '../services/panier.service';
import { CommandeService } from '../services/commande.service';


@Component({
  selector: 'app-cart',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private fb:FormBuilder , 
    private token : TokenService, 
    private userservice : UserService, 
    private panierService : PanierService,
    private commandeService : CommandeService
    ) { }
    
    
    public productsPanier=[];
    public pricetotal =""; 
    public BillingDetails : FormGroup;
    public haveAccount:Boolean;
    public user ;
    public idpanier=0;
    ngOnInit() {
      const userid= this.token.getpayload().sub;

      this.userservice.getUser(userid).subscribe(resultat=>
        {
        
          this.user=JSON.parse(JSON.stringify(resultat))[0];
      
      }
      
      )


      this.panierService.showpanier(userid).subscribe(resultat=>{
        
        this.idpanier=JSON.parse(JSON.stringify(resultat)).data.id
        
        this.pricetotal=" $ "+JSON.parse(JSON.stringify(resultat)).data.Price;
        
        this.productsPanier=JSON.parse(JSON.stringify(resultat)).data.items;

      }
          );
         
    this.BillingDetails=this.fb.group({
      FirstName:['',[Validators.required]],
      SecondName:['',[Validators.required]],
      email:['',[Validators.required]],
      adresse:['',[Validators.required]],
      phone:['',[Validators.required]],
      password:[''],
      terms:['',[Validators.requiredTrue]]
      });
      
this.haveAccount=this.token.isLoggedIn();


}


addBillingDetails()
{

  console.log(this.BillingDetails.value);
  console.log(this.idpanier);

  this.commandeService.addCommande(this.BillingDetails.value,this.idpanier).subscribe(resultat=>{
    var message= JSON.parse(JSON.stringify(resultat)).message;
  
console.log(message);  
  
  })

}


}
