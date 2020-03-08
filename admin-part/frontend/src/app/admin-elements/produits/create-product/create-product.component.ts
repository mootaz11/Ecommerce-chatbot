import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { ProductService } from 'src/app/product.service';
import { SubcategoryService } from 'src/app/subcategory.service';
import { MatSnackBar } from '@angular/material';
var $:any;


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  public genders:Array<any>
  public subcategories:Array<any>
  public productForm :FormGroup;
  public tabFiles : FileList ; 
  public idsubcat ="";
  constructor(private productservice:ProductService ,private _snackBar: MatSnackBar , private fb:FormBuilder, private subservice : SubcategoryService) {}


  ngOnInit() {

this.subservice.getSubCategories().subscribe(result=>
  
  {
  this.subcategories=  JSON.parse(JSON.stringify(result)).data;
  console.log(this.subcategories);

  }

)





    this.productForm=this.fb.group({
      title:[''],
      details:[''],
      price:[''],
      status:[''],
      os_product:[''],
      Ram_product:[''],
      remise:[''],
      company:['']
  });

}

  
handlefileinput(event:any){
   this.tabFiles  = event.target.files ; 
    }




    
getSubcat(i)
{
  
  this.idsubcat=document.getElementsByTagName("mat-option")[i].id.toString();

}





addProduct()
{
 
this.productservice.addproduct(this.idsubcat,this.productForm.value).subscribe(result=>{
const message =JSON.parse(JSON.stringify(result)).message;
const idprod = JSON.parse(JSON.stringify(result)).data.id;     

  for(var i =0 ; i<this.tabFiles.length ; i++)
      {
            this.productservice.addImage(this.tabFiles.item(i),idprod).subscribe(result=>{
              console.log(result);
            })
      }  

   
this._snackBar.open(message.toString(), 'close', {
  duration: 2000,
  });        


      })
  
}




}
