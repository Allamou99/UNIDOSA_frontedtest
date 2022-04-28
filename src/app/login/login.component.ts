import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../services/authservice.service';
import { Router } from '@angular/router';

interface UserLogin {
  username : string,
  password : string
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm !: FormGroup;

  constructor(private fb : FormBuilder,
    private AuthService : AuthserviceService,
    private router : Router
    ) { }

  Userlogin : UserLogin = {username : "",
   password : "",
  };

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.LoginForm = this.fb.group({
      username:['',[Validators.required]],
      password:['',Validators.required],
    })
  }

  onSubmit(){
    this.Userlogin.username = this.LoginForm.controls['username'].value;
    this.Userlogin.password = this.LoginForm.controls['password'].value;
    this.AuthService.Login(this.Userlogin).subscribe(res=>{console.log(res);
      if(res.success){
        this.router.navigateByUrl('/adminpage')
        this.LoginForm.reset();
      }
    });
  }

}
