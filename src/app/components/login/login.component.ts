import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { ApplicationService } from "src/app/core/services/application.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  color: ThemePalette = 'warn';
  value = 100;
  isLoading = false;
  passwordFieldType: string = 'password';

  constructor(public applicationService: ApplicationService, public fb: FormBuilder,
    public router: Router, public notifier: NotifierService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.isLoading = false;
    sessionStorage.clear();
    localStorage.clear();
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onSubmit(): void {
    const formData = this.loginForm.value;
    if (this.loginForm.valid) {
      const request = {
        email: formData.email,
        password: formData.password
      }
      this.applicationService.signInUser(request).subscribe((response: any) =>{
        if(response.status){
          localStorage.setItem('token', response.payload.token.token)
          this.notifier.notify('success', response.message);
          if(response.status)
          this.router.navigate(['krishi-mandi/product']);
        }
        else{
          this.notifier.notify('error', response.message);
        }
      })
    }
    else{
      this.notifier.notify('error', 'Please fill complete form.')
    }
  }

  navigateOpen(){
    this.router.navigate(['krishi-mandi/signup']);
  }
}
