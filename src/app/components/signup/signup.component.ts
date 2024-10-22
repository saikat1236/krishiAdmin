import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { ApplicationService } from "src/app/core/services/application.service";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{

  signupForm: FormGroup;
  roleOption: any[] = [];

  constructor(public applicationService: ApplicationService, public notifier: NotifierService,
    private fb: FormBuilder, public router: Router) {
    this.signupForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.roleOption = [
      {role: 'admin', viewValue: 'Admin'},
      {role: 'user',  viewValue: 'User'}
    ]
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      const request = {
        userName: formData.userName,
        email: formData.email,
        role: formData.role,
        password: formData.password
      }
      this.applicationService.createUser(request).subscribe((response: any) =>{
        console.log('Response ', response);
        if(response.status){
          this.notifier.notify('success', response.message + 'Please Login First');
          this.router.navigate(['krishi-mandi/login']);
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
    this.router.navigate(['krishi-mandi/login']);
  }
}
