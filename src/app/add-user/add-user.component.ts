import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { ApplicationService } from "src/app/core/services/application.service";
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit{

  private readonly notifier: NotifierService;
  addUserForm: FormGroup;
  roleOption: any[] = [];
  isLoading =false;

  constructor( public dialogRef: MatDialogRef<AddUserComponent>, public applicationService: ApplicationService,
    public notifierService: NotifierService, private fb: FormBuilder, public router: Router) {
    this.notifier = this.notifierService;
    this.addUserForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.roleOption = [
      {role: 'admin', viewValue: 'Admin'},
      {role: 'superAdmin',  viewValue: 'superAdmin'}
    ]
  }

  onSubmit(): void {

    this.isLoading = true;
    if (this.addUserForm.valid) {
      const formData = this.addUserForm.value;
      const request = {
        userName: formData.userName,
        email: formData.email,
        role: formData.role,
        password: formData.password
      }
      this.applicationService.createUser(request).subscribe((response: any) =>{
        if(response.status){
          this.isLoading = false;
          this.notifier.notify('success', response.message);
          this.close(true);
        }
        else{
          this.isLoading = false;
          this.notifier.notify('error', response.message);
        }
      })
    }
    else{
      this.isLoading = false;
      this.notifier.notify('error', 'Please fill complete form.')
    }
  }

  close(status: boolean){
    this.dialogRef.close(status);
  }
}
