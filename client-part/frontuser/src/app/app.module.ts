import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { NewstellerComponent } from './navigation/newsteller/newsteller.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { OneproductComponent } from './product/oneproduct/oneproduct.component';
import { ProductsComponent } from './product/products/products.component';
import {ApproutingModule} from './approuting.module';
import { OrderComponent } from './order/order.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import {MDBBootstrapModule} from'angular-bootstrap-md';
import {ReactiveFormsModule } from '@angular/forms';
import {UserService} from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import {TokenService} from './services/token.service';
import { HotDealComponent } from './hot-deal/hot-deal.component';
import { CategorieService } from './services/categorie.service';
import { SouscategorieService } from './services/souscategorie.service';
import { PanierService } from './services/panier.service';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { SearchResultComponent } from './search-result/search-result.component';
import { ConfirmloginComponent } from './confirmlogin/confirmlogin.component'
import { ChatbotService } from './services/chatbot.service';
import { MyordersComponent } from './myorders/myorders.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewstellerComponent,
    FooterComponent,
    HomeComponent,
    ProductComponent,
    OneproductComponent,
    ProductsComponent,
    OrderComponent,
    WishlistComponent,
    ProfileComponent,
    NavbarComponent,
    HotDealComponent,
    SearchResultComponent,
    ConfirmloginComponent,
    MyordersComponent  ],
  imports: [
    BrowserModule,
    RouterModule,
    ApproutingModule,MDBBootstrapModule.forRoot(),ReactiveFormsModule,HttpClientModule
  ],
  providers: [UserService,TokenService,CategorieService,SouscategorieService,PanierService,ChatbotService],
  bootstrap: [AppComponent]
})
export class AppModule { }
