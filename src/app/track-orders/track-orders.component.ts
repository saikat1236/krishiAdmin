import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { ApplicationService } from "../core/services/application.service";
@Component({
  selector: 'app-track-orders',
  templateUrl: './track-orders.component.html',
  styleUrls: ['./track-orders.component.scss']
})
export class TrackOrdersComponent implements OnInit{

  trackOrderStatus: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, public notifier: NotifierService, public applicationService: ApplicationService,
    public router: Router, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TrackOrdersComponent>){
      console.log('Data', data);
      this.trackOrderStatus = this.fb.group({
        orderId: [data.selectedApplication.orderId, Validators.required],
        remarks: ['', Validators.required],
      }
    );
  }
  ngOnInit(): void {}

  onSubmit(){
    const formData = this.trackOrderStatus.value;
    this.isLoading = true;

    if (this.trackOrderStatus.valid) {
      const request = {
        orderId: formData.orderId,
        remarks: formData.remarks
      }
      let requestApplication: any;

      if(this.data.status === "placed"){
        requestApplication = this.applicationService.changeOrderStatusShipped(request);
      }

      if(this.data.status === "shipped"){
        requestApplication = this.applicationService.OutForDelivery(request);
      }

      if(this.data.status === 'outForDelivery'){
        requestApplication = this.applicationService.OrderStatusDelivered(request);
      }

      requestApplication.subscribe((response: any) =>{
         if(response.status){
          this.isLoading = false;
          this.notifier.notify('success', response.message)
          this.close();
         }
         else{
          this.isLoading = false;
          this.notifier.notify('error', response.message.message);
         }
      })
    }
    else{
      this.isLoading = false;
      this.notifier.notify('error', 'Please fill remarks.');
    }
  }

  close(){
    this.dialogRef.close(true);
  }
}
