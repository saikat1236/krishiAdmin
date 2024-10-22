import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ApplicationService } from "../core/services/application.service";
import { NotifierService } from "angular-notifier";
@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent {

  isLoading= false;
  orderStatus: any;
  selectedValue: any;

  constructor(public notifier: NotifierService, public applicationService: ApplicationService,
  public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<OrderStatusComponent>){
    this.orderStatus = this.data.status;
  }

  ngOnInit(): void {}

  trackOrderStatus(element: any, index: any){
    this.selectedValue = element
  }

  onSubmit(){
    if(this.selectedValue && this.selectedValue !== undefined){
      this.data ={...this.data, optionSelect: this.selectedValue}
      this.isLoading = false;
      this.close();
    }
  }

  close(){
    this.dialogRef.close(this.data);
  }
}
