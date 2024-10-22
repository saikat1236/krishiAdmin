import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApplicationService } from "../core/services/application.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  updateForm: FormGroup;
  isLoading = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, public applicationService: ApplicationService,
    public notifier: NotifierService, public dialogRef: MatDialogRef<UpdateProfileComponent>){
    this.updateForm = this.fb.group({
      userName: [data.selectedApplication.userName, Validators.required],
      role: [data.selectedApplication.role, Validators.required],
      email: [data.selectedApplication.email, Validators.required],
    });
  }
  ngOnInit(): void {}

  onSubmit(){
    const formData = this.updateForm.value;
    this.isLoading = true;
    if (this.updateForm.valid) {
      const request = {
        userName: formData.userName,
        role: formData.role,
        email: formData.email
      }
      this.applicationService.updateUser(request).subscribe((response: any)=>{
         if(response.status){
          this.isLoading = false;
          this.notifier.notify('success', response.message);
          this.dialogRef.close(true);
         }
         else{
          this.isLoading = false;
          this.notifier.notify('error', response.message);
         }
      })
    }
    else{
      this.isLoading = false;
      this.notifier.notify('error', 'Password must be atLeast 8 character')
    }
  }
}

