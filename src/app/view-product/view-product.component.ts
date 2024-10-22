import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { NotifierService } from "angular-notifier";
import { ApplicationService } from "../core/services/application.service";
import { Router } from "@angular/router";
import { UpdateProductComponent } from "../update-product/update-product.component";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  viewProduct: any;

  constructor(public notifier: NotifierService, public applicationService: ApplicationService,
    public router: Router, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ViewProductComponent>) {
    this.viewProduct = data.selectedApplication;
    this.viewProduct = {
      'applicationData': data.selectedApplication
    }
  }

  ngOnInit(): void {
  }

  updateProduct() {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: 'Are you sure you want to update Product ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.updateViewDialogOpen();
      }
    })
  }

  closeDialog(result: any){
    this.dialogRef.close(result);
  }

  updateViewDialogOpen(){
  const dialogRef = this.dialog.open(UpdateProductComponent, {
      data: {
        modal: true,
        selectedApplication: this.data.selectedApplication,
      },
      width: '800px',
      height: '600px',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.closeDialog(result)
      }
    })
  }
}
