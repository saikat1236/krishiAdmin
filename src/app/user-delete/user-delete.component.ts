import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApplicationService } from "../core/services/application.service";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { NotifierService } from "angular-notifier";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent {

  deleteUser: FormGroup;
  isLoading = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, public applicationService: ApplicationService,
    public dialog: MatDialog, public notifier: NotifierService, public dialogRef: MatDialogRef<UserDeleteComponent>) {
    this.deleteUser = this.fb.group({
      email: [data.selectedApplication.email, Validators.required],
    });
  }
  ngOnInit(): void {}

  onSubmit() {
    const formData = this.deleteUser.value;
    if (this.deleteUser.valid) {
      const request = {
        email: formData.email
      }
      this.confirm(request);
    }
    else {
      this.isLoading = false;
      this.notifier.notify('error', 'Please fill your email address.')
    }
  }

  confirm(request: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: 'Are you sure to delete this account ?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.isLoading = true;
        this.applicationService.userDelete(request).subscribe((response: any) => {
          if (response.status) {
            this.isLoading = false;
            this.notifier.notify('success', response.message);
            this.closeUserProfileDialog(true);
          }
          else {
            this.isLoading = false;
            this.notifier.notify('error', response.message);
          }
        })
      }
    });
  }

  closeUserProfileDialog(event: boolean){
    setTimeout(()=>{
      this.dialogRef.close(event);
    }, 2000)
  }
}

