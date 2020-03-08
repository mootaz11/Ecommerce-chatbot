import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './product/products/products.component';
import { OrderComponent } from './order/order.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProfileComponent } from './profile/profile.component';
import { OneproductComponent } from './product/oneproduct/oneproduct.component';
import { HotDealComponent } from './hot-deal/hot-deal.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ConfirmloginComponent } from './confirmlogin/confirmlogin.component';
import { MyordersComponent } from './myorders/myorders.component';

const routes : Routes=[
  {path :'confirmmail',component:HomeComponent},
  {path:'',component:HomeComponent},
  {path:':idcategorie/products',component:ProductsComponent},
  {path:'order',component:OrderComponent},
  {path:'wishlist',component:WishlistComponent},
  {path:'profile',component:ProfileComponent},
  {path:'myorders',component:MyordersComponent},
  {path:':idcategorie/products/:idproduct',component:OneproductComponent},
  {path:'wishlist/:idproduct',component:OneproductComponent},
  {path:'hotdeal' , component:HotDealComponent},
  {path:'hotdeal/:idproduct',component:OneproductComponent},
  {path:'result/:word',component:SearchResultComponent},
  {path:':idproduct',component:OneproductComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ]})



  export class ApproutingModule{}
