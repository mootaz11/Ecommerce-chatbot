import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { FooterComponent } from './navigation/footer/footer.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MatIconModule,MatSidenavModule,MatSnackBarModule, MatDialogModule,MatPaginatorModule,MatTableModule,MatToolbarModule,MatButtonModule,MatListModule,MatSelectModule,MatCheckboxModule,MatInputModule} from '@angular/material';
import {ApproutingModule} from './approuting.module';
import { OneproductComponent } from './admin-elements/produits/oneproduct/oneproduct.component';
import { CreateProductComponent } from './admin-elements/produits/create-product/create-product.component';
import { AdminnavComponent } from './admin-elements/adminnav/adminnav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProduitsComponent } from './admin-elements/produits/produits.component';
import  {ProductComponent} from './admin-elements/produits/list-produits/product.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap' ;
import{ReactiveFormsModule} from '@angular/forms';
import { CategoriesComponent } from './admin-elements/categories/categories.component';
import { ListsouscategoriesComponent } from './admin-elements/listsouscategories/listsouscategories.component';
import { UsersComponent } from './admin-elements/users/users.component';
import { CommandesComponent } from './admin-elements/commandes/commandes.component';
import {UserService} from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { SubcategoryService } from './subcategory.service';
@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    NavbarComponent,
    FooterComponent,
    CategoriesComponent,
    ProductComponent,
    OneproductComponent,
    CreateProductComponent,
    
    AdminnavComponent,
    NotFoundComponent,
    ProduitsComponent,
    ListsouscategoriesComponent,
    UsersComponent,
    CommandesComponent
  ],
  schemas:[NO_ERRORS_SCHEMA]
  ,
  imports: [MatSidenavModule,
    BrowserModule,MatDialogModule,
    MatIconModule,MatInputModule,
    ApproutingModule,MatSidenavModule,
    MDBBootstrapModule.forRoot(),
    LayoutModule,NgbPaginationModule,NgbModule,
    MatToolbarModule,ReactiveFormsModule,
    MatButtonModule,MatSelectModule,MatCheckboxModule,
    MatListModule,MatPaginatorModule,MatTableModule,HttpClientModule,MatSnackBarModule
  ],
  providers: [UserService,SubcategoryService],
  bootstrap: [AppComponent]
})


export class AppModule
{

}
