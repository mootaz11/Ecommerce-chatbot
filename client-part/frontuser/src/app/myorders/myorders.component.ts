import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../services/commande.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {
  public orders=[];
  constructor(private commande : CommandeService){}

  ngOnInit() {
    this.getAllcommands();
  }


  getAllcommands(){
    this.commande.getAllcommands().subscribe(result=>{

      this.orders=JSON.parse(JSON.stringify(result)).data;
      this.orders.map(order=>{
        order.productsNumber = order.items.length;
      })
      console.log(this.orders);
    })
  }

}
