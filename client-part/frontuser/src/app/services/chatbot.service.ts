import { Injectable } from '@angular/core';
import {ApiAiClient} from 'api-ai-javascript';
import {environment} from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { CommandeService } from './commande.service';
import { TokenService } from './token.service';


export class Message {

  constructor(public content :string , public sentBy : string)
      {
        
      }

}

@Injectable({
  providedIn: 'root'
})

export class ChatbotService {

  items=""; 
  orders="";
  readonly token = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({accessToken:this.token});
  conversation = new BehaviorSubject<Message[]>([]);


  constructor(private orderservice : CommandeService , private tokenservice : TokenService) {}


update(msg : Message){
this.conversation.next([msg]);
}  


converse(msg : string)
{

  const userMessage = new Message(msg,'user');
  this.update(userMessage);

  return this.client.textRequest(msg).then(result=>{
    
    const speech =result.result.fulfillment.speech;
    const botMessage = new Message(speech,'bot');
    this.update(botMessage); 

    
    if(JSON.parse(JSON.stringify(result)).result.metadata.intentName=="order.status"){
      
      if(JSON.parse(JSON.stringify(result)).result.parameters['order-number'])
      {   
        this.orderservice.getCommande(JSON.parse(JSON.stringify(result)).result.parameters['order-number']).subscribe(res=>
          { 
            JSON.parse(JSON.stringify(res)).data.items.map(item=>{
              this.items += item.title + " | ";
            })

            const chaine =" number of items token : " + JSON.parse(JSON.stringify(res)).data.items.length.toString() + "     | "
            const speech =chaine + this.items ;
           
            const botMessage = new Message(speech,'bot');
            this.update(botMessage); 
          }

          )


      }

    




    }


    if(JSON.parse(JSON.stringify(result)).result.metadata.intentName=="order.cancel"){
      console.log(JSON.parse(JSON.stringify(result)).result);
      if(JSON.parse(JSON.stringify(result)).result.parameters['order_number'])
      {
        this.orderservice.deleteorder(JSON.parse(JSON.stringify(result)).result.parameters['order_number']).subscribe(res=>{
          
          const botMessage = new Message('order deleted succeffully','bot');
          this.update(botMessage); 


        })
      }

    }




    if(JSON.parse(JSON.stringify(result)).result.metadata.intentName=="GetAllorders")
      {

        this.orderservice.getAllcommands().subscribe(result=>{
             var orders =[];
             orders= JSON.parse(JSON.stringify(result)).data;
              orders.map(order=>{
                  this.orders+=" order number : "+order.id+ " ; order price :  "+order.price_com + " | ";
              })
              const chaine = this.orders;
              const botMessage = new Message(chaine,'bot');
              this.update(botMessage); 
  

              
        })
      
      }   
    
    


  })



}


}
