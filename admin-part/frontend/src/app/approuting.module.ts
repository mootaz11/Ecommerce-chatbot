import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component'
import { AdminnavComponent } from './admin-elements/adminnav/adminnav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './not-found/not-found.component';
import { CreateProductComponent } from './admin-elements/produits/create-product/create-product.component';
import { OneproductComponent } from './admin-elements/produits/oneproduct/oneproduct.component';
import  {ProductComponent} from './admin-elements/produits/list-produits/product.component';
import { ProduitsComponent } from './admin-elements/produits/produits.component';
import { CategoriesComponent } from './admin-elements/categories/categories.component';
import { ListsouscategoriesComponent } from './admin-elements/listsouscategories/listsouscategories.component';
import {UsersComponent} from './admin-elements/users/users.component';

import { from } from 'rxjs';
import { CommandesComponent } from './admin-elements/commandes/commandes.component';

const routes: Routes =
  [

    { path: '', component: IntroComponent },
    
    
    
    {
      path: 'adminnav', component: AdminnavComponent,
        
      children: [
        {path:'userslist',component:UsersComponent},
        {

          path: 'produits', component: ProduitsComponent , children:
          
        [
          {path:'create',component:CreateProductComponent}
          ,
          {path:'',component:ProductComponent}
          
          ,
          {path:':idproduit',component:OneproductComponent}



        ]}
        
        ,
        
        
        {path:'categories',component:CategoriesComponent}
        
        ,
        {path:'souscategories',component:ListsouscategoriesComponent},
        {path:'commandes',component:CommandesComponent}                
                  
      ]

    }

    ,{path:'**',component:NotFoundComponent}


  ]





@NgModule({
  declarations: [],
  imports: [BrowserAnimationsModule,
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [[RouterModule]]
})


export class ApproutingModule { }
