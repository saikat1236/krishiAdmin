import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ApplicationService } from '../core/services/application.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  updateProductQuantity: FormGroup;
  isLoading = false;
  units: any[] = [
    { measure: 'Kilogram', value: 'kg' },
    { measure: 'Gram', value: 'gm' },
  ];
  labels: any[] = [];
  categories: any[] = [];
  labels2: any[] = [
    {
      name: 'organic',
      imageUrl:
        'https://krishi-consumer-products.s3.amazonaws.com/labels/pureorganic.jpeg',
      info: 'This is a label',
    },
    {
      name: 'fresh',
      imageUrl:
        'https://krishi-consumer-products.s3.amazonaws.com/labels/fresh.jpeg',
      info: 'This is a label',
    },
    {
      name: 'off5',
      imageUrl:
        'https://krishi-consumer-products.s3.amazonaws.com/labels/off5.jpeg',
      info: 'This is a label',
    },
    {
      name: 'off10',
      imageUrl:
        'https://krishi-consumer-products.s3.amazonaws.com/labels/off10.jpeg',
      info: 'This is a label',
    },
  ];

  constructor(
    private fb: FormBuilder,
    public notifier: NotifierService,
    public applicationService: ApplicationService,
    public router: Router,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateProductComponent>
  ) {
    console.log('Data', data);

    this.updateProductQuantity = this.fb.group({
      productId: [data.selectedApplication.productId, Validators.required],
      name: [data.selectedApplication.name, Validators.required],
      category: [data.selectedApplication.category, Validators.required],
      minQuantity: [data.selectedApplication.minQuantity, Validators.required],
      unit: [data.selectedApplication.unit, Validators.required],
      totalAvailableQuantity: [
        data.selectedApplication.totalAvailableQuantity,
        Validators.required,
      ],
      totalAddedQuantity: [
        data.selectedApplication.totalAddedQuantity,
        Validators.required,
      ],
      pricePerUnit: [
        data.selectedApplication.pricePerUnit,
        Validators.required,
      ],
      about: [data.selectedApplication.about, Validators.required],
      // discountMatrix: this.fb.array([this.createDiscountGroup()]),
      // images: [data.selectedApplication.images, Validators.required],
      // sellerId: [data.selectedApplication.sellerId, Validators.required],
      // bulkOrderDiscounts: this.fb.array([this.createBulkOrderDiscounts()]),
      images: [data.selectedApplication.images, Validators.required],
      discount: [data.selectedApplication.discount, Validators.required],
      selectedLabels: [data.selectedApplication.selectedLabels, Validators.required], // Use a single FormControl for selected labels
      expireDate: [data.selectedApplication.expireDate, Validators.required],
    });
  }
  // ngOnInit(): void {
  //   // if(this.data.selectedApplication.discountMatrix){
  //   //   this.preFetchDiscountMatrix(this.data.selectedApplication.discountMatrix);
  //   // }
  //   // if(this.data.selectedApplication.bulkOrderDiscounts){
  //   //   this.preFetchDiscountBulkOrderMatrix(this.data.selectedApplication.bulkOrderDiscounts)
  //   // }
  // }
  ngOnInit(): void {
    if (this.data) {
      this.getCategories();
      this.getLabels();
    } else {
      console.error('No data provided');
    }
  }

  // createDiscountGroup(): FormGroup {
  //   return this.fb.group({
  //     minKg: [0, [Validators.required, Validators.min(0)]],
  //     maxKg: [0, [Validators.required, Validators.min(0)]],
  //     discountPercentage: [0, [Validators.required, Validators.min(0)]]
  //   });
  // }

  // addDiscount() {
  //   this.discountMatrix.push(this.createDiscountGroup());
  // }

  // addDiscountBulk() {
  //   this.bulkOrderDiscounts.push(this.createBulkOrderDiscounts());
  // }

  // removeDiscountBulk(index: number) {
  //   this.bulkOrderDiscounts.removeAt(index);
  // }

  // removeDiscount(index: number) {
  //   this.discountMatrix.removeAt(index);
  // }

  // selectedFileAdd(selectedFile: any) {
  //   const reader = new FileReader();
  //   reader.onload = (e: any) => {
  //     console.log('E', e);
  //     this.myFiles.push({ name: selectedFile.name, url: e.target.result });
  //     const nameOrderMap = this.images.value.map((item: any) => item.name);
  //     this.myFiles.sort((a, b) => {
  //       return nameOrderMap.indexOf(a.name) - nameOrderMap.indexOf(b.name);
  //     });
  //     this.selectedFile = this.myFiles;
  //     this.attachmentsName.push(selectedFile.name);
  //   };
  //   const newItem = this.fb.control(selectedFile, Validators.required);
  //   reader.readAsDataURL(selectedFile);
  //   this.images.push(newItem);
  // }
  validateNumber(event: KeyboardEvent): void {
    const key = event.key;
    const currentValue = (event.target as HTMLInputElement).value;

    // Allow digits and one decimal point
    if (key === '.' && !currentValue.includes('.')) {
      return;
    }
    if (!/^\d$/.test(key)) {
      event.preventDefault();
    }
  }

  // Validate paste event to allow only numbers
  validatePaste(event: ClipboardEvent): void {
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData?.getData('text');

    if (pastedText && !/^\d+$/.test(pastedText)) {
      event.preventDefault();
    }
  }

  // createBulkOrderDiscounts() {
  //   return this.fb.group({
  //     minKg: [0, [Validators.required, Validators.min(0)]],
  //     maxKg: [0, [Validators.required, Validators.min(0)]],
  //     discountPercentage: [0, [Validators.required, Validators.min(0)]]
  //   });
  // }

  // preFetchDiscountMatrix(data: any[]) {
  //   data.forEach(discount => {
  //     this.discountMatrix.push(this.fb.group(discount));
  //   });
  // }

  // preFetchDiscountBulkOrderMatrix(data: any[]) {
  //   data.forEach(discount => {
  //     this.bulkOrderDiscounts.push(this.fb.group(discount));
  //   });
  // }

  // get bulkOrderDiscounts(): FormArray {
  //   return this.updateProductQuantity.get('bulkOrderDiscounts') as FormArray;
  // }

  get items(): FormArray {
    return this.updateProductQuantity.get('images') as FormArray;
  }

  // get discountMatrix(): FormArray {
  //   return this.updateProductQuantity.get('discountMatrix') as FormArray;
  // }

  onSubmit() {
    const formData = this.updateProductQuantity.value;
    console.log('Form Data is', formData);
    this.isLoading = true;

    const selectedLabelNames =
    this.updateProductQuantity.get('selectedLabels')?.value || [];

  // Filter and map the labels to get the required format
  const selectedLabelObjects = this.labels
    .filter((label) => selectedLabelNames.includes(label.name))
    .map((label) => ({
      name: label.name,
      imageUrl: label.imageUrl,
      info: label.info,
    })); // Send the desired structure

  console.log('Selected labels to send:', selectedLabelObjects);

    if (this.updateProductQuantity.valid) {
      const request = {
        productId: formData.productId,
        name: formData.name,
        category: formData.category,
        minQuantity: formData.minQuantity,
        unit: formData.unit,
        totalAvailableQuantity: formData.totalAvailableQuantity,
        totalAddedQuantity: formData.totalAddedQuantity,
        pricePerUnit: formData.pricePerUnit.toString(),
        about: formData.about,
        images: formData.images,
        labels: selectedLabelObjects, // Send selected labels directly
        discount: formData.discount,
        expireDate: formData.expireDate,
        margin: 20,
      };
      this.applicationService.updateProduct(request).subscribe(
        (response: any) => {
          if (response.status) {
            this.isLoading = false;
            this.notifier.notify('success', 'Product Update Successfully');
            this.close();
          } else {
            this.isLoading = false;
            this.notifier.notify('error', response.message[0]);
          }
        },
        (error) => {
          this.isLoading = false;
          this.notifier.notify('error', error.error.message[0]);
        }
      );
    } else {
      this.isLoading = false;
      this.notifier.notify('error', 'All Fields are mandatory.');
    }
  }

  close() {
    this.dialogRef.close(true);
  }


  getCategories() {
    this.applicationService.getCategoriesAdmin().subscribe((response: any) => {
      if (response.status) {
        this.categories = response.payload;
      }
    });
  }

  getLabels() {
    this.applicationService.getLabels().subscribe((response: any) => {
      if (response.status) {
        this.labels = response.payload;
      }
    });
  }

















}
