import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApplicationService } from "../core/services/application.service";
import { NotifierService } from "angular-notifier";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit{

  editForm: FormGroup;
  isErrorOccurred = false;
  isLoading = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, public applicationService: ApplicationService,
    public notifier: NotifierService, public dialogRef: MatDialogRef<EditProfileComponent>){
    this.editForm = this.fb.group({
      oldPassword: [this.data.selectedApplication.password, [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  passwordMatchValidator(): void {
    const password = this.editForm.get('newPassword')?.value;
    const confirmPassword = this.editForm.get('confirmPassword')?.value;
    this.isErrorOccurred = (password !== confirmPassword);
  }

  ngOnInit(): void {}

  onSubmit(){
    const formData = this.editForm.value;
    this.passwordMatchValidator();
    this.isLoading = true;
    if (this.editForm.valid && !this.isErrorOccurred) {
      const request = {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword
      }
      this.applicationService.changePassword(request).subscribe((response: any)=>{
        if(response.status){
          this.isLoading = false;
          this.notifier.notify('success', response.message);
          this.dialogRef.close(true);
        }
        else{
          this.isLoading = false;
          this.notifier.notify('error', response.message);
        }
      }, (error) =>{
        this.isLoading = false;
        this.notifier.notify('error', error.error.message[0]);
      })
    }
    else{
      this.isLoading = false;
      this.errorValidation();
    }
  }

  errorValidation(){
    if(this.isErrorOccurred){
      this.notifier.notify('error', 'Password and Confirm Password must be same.')
    }
    else{
      this.notifier.notify('error', 'Password must be atLeast 8 character')
    }
  }
}
