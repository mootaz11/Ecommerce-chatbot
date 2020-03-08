import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  
  public result ="";
  public products=[];
  public size =0;
  
  constructor(private dataservice :SearchService, private productService : ProductService, private Activateroute : ActivatedRoute) {}





  ngOnInit() 
  
  
  {
     this.dataservice.currentMessage.subscribe(message=>
      { this.result=message;

        })






      this.productService.getSearchResult(this.Activateroute.snapshot.params['word']).subscribe(resultat=>{
        this.products=JSON.parse(JSON.stringify(resultat)).data
        this.size=this.products.length;
        this.products.map(product=>{
          this.productService.getImage(product.id).subscribe(resultat=>{
            product.image=JSON.parse(JSON.stringify(resultat))[0].filename;

          })
        })




  })
}

}


