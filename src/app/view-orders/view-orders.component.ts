import { Component, Inject, OnInit } from '@angular/core';
import { NotifierService } from "angular-notifier";
import { ApplicationService } from "../core/services/application.service";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent implements OnInit {

  viewOrder: any;
  addressData = [
    { key: 'name', value: '' },
    { key: 'email', value: '' },
    { key: 'mobile', value: '' },
    { key: 'city', value: '' },
    { key: 'addressLine1', value: '' },
    { key: 'addressLine2', value: '' },
    { key: 'pin', value: '' }
  ];
  productData :any[] =[];
  constructor(public notifier: NotifierService, public applicationService: ApplicationService,
    public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewOrdersComponent>) {
      console.log('Selected Data', data);

    this.viewOrder = data.selectedApplication;
    this.viewOrder = {
      'applicationData': data.selectedApplication
    }

  }

  ngOnInit(): void {
    this.addressData = [
      { key: 'name', value: this.data.selectedApplication.address.name },
      { key: 'email', value: this.data.selectedApplication.address.email },
      { key: 'mobile', value: this.data.selectedApplication.address.mobile },
      { key: 'city', value: this.data.selectedApplication.address.city },
      { key: 'addressLine1', value: this.data.selectedApplication.address.addressLine1 },
      { key: 'addressLine2', value: this.data.selectedApplication.address.addressLine2 },
      { key: 'pin', value: this.data.selectedApplication.address.pin }
    ]
    this.productData = this.data.selectedApplication.productsOrdered
    console.log('Product', this.productData, this.data.selectedApplication);

  }

  closeDialog(){
    this.dialogRef.close();
  }
}
