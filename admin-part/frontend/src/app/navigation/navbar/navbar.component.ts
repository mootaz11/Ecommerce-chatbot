import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validator,FormControl, Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit 
{
  
  public signupForm:FormGroup;
  public loginForm : FormGroup;
  public snackbarmessage :String ; 
  public isLoggedIn:Boolean;

  constructor(private fb :FormBuilder , private userService:UserService , private route :Router, private _snackBar: MatSnackBar, private tokenService:TokenService)
  {

  }

  ngOnInit() 
  
  {

    this.isLoggedIn=this.tokenService.isLoggedIn();

    
    
    
    this.signupForm=this.fb.group(
        {

          name:['',[Validators.required,Validators.minLength(3)]],
          secondname:['',[Validators.required,Validators.minLength(3)]],
          email:['',[Validators.email]],
          password:['',[Validators.required,Validators.minLength(8)]],
          password2:['',[Validators.required,Validators.minLength(8)]]
       
       
        }

      );
     this.loginForm=this.fb.group({

        emaillogin :['',[Validators.required]],
        passwordlogin:['',[Validators.required]]


     }); 
    }




    onSubmitSignup(){
      this.userService.signup(this.signupForm.value).subscribe(result=>{
        
        this.snackbarmessage=JSON.parse(JSON.stringify(result)).message;
       
        this._snackBar.open(this.snackbarmessage.toString(), 'close', {
          duration: 2000,
        
        });        
      
      }
        
      
      )
    }

onSubmitLogin()
      {
      this.userService.login(this.loginForm.value).subscribe(result=>{
        
        console.log(JSON.parse(JSON.stringify(result)).access_token);
        
        this.tokenService.setToken(JSON.parse(JSON.stringify(result)).access_token);
        console.log(this.tokenService.getpayload());

        this.route.navigateByUrl('adminnav/produits');
        this.isLoggedIn=this.tokenService.isLoggedIn();
        
       })

    }

Logout(){
  this.tokenService.deleteToken();
  this.isLoggedIn=false ;
  this.route.navigateByUrl('');
}

  }

  

