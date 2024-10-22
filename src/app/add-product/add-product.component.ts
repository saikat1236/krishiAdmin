import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import * as moment from 'moment';
import { ThemePalette } from "@angular/material/core";
import { ApplicationService } from "../core/services/application.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  updateProductQuantity: FormGroup;
  allowedFileTypes = ['png, jpg'];
  myFiles: any[] = [];
  blob: any;
  attachmentsName: any[] = [];
  selectedFile: any;
  sendBlob: any;
  // img: any;
  isLoading = false;
  color: ThemePalette = 'warn';
  value = 100;
  fileSelected: File[] =[];
  units: any[] = [
    { measure: 'Kilogram', value: 'kg' },
    { measure: 'Gram', value: 'gm' }
  ];
  // labels: any[] = [
  //   { value: 'Organic', viewValue: 'Organic' },
  //   { value: 'Fresh', viewValue: 'Fresh' },
  //   { value: 'Imported', viewValue: 'Imported' }
  // ];
  // categories: any[] = [
  //   { value: 'Organic', viewValue: 'Organic' },
  //   { value: 'Fresh', viewValue: 'Fresh' },
  //   { value: 'Imported', viewValue: 'Imported' }
  // ];
  labels: any[] = [];
  categories: any[]=[];
  

  constructor(private fb: FormBuilder, public notifier: NotifierService, public applicationService: ApplicationService,
    public router: Router, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddProductComponent>) {
    this.updateProductQuantity = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      minQuantity: ['', Validators.required],
      unit: ['', Validators.required],
      totalAvailableQuantity: ['', Validators.required],
      totalAddedQuantity: ['', Validators.required],
      pricePerUnit: ['', Validators.required],
      about: ['', Validators.required],
      // discountMatrix: this.fb.array([this.createDiscountGroup()]),
      images: this.fb.array([], Validators.required),
      labels: this.fb.array([], Validators.required),
      // labels: ['', Validators.required],
      discount: ['', Validators.required],
      // bulkOrderDiscounts: this.fb.array([this.createBulkOrderDiscounts()]),
      expireDate: ['', Validators.required],
    }
  );
  }

  ngOnInit(): void {
    // this.initializeLabels();
    if (this.data) {
      this.getCategories();
      this.getlabels();
    } else {
      console.error('No data provided');
    }
  }
  // initializeLabels() {
  //   this.labels.forEach(() => {
  //     this.labelsArray.push(this.fb.control(false)); // Add a checkbox for each label
  //   });
  // }
  // get labelsArray(): FormArray {
  //   return this.updateProductQuantity.get('labels') as FormArray;
  // }

  // onLabelChange(label: any, isChecked: boolean) {
  //   const index = this.labels.indexOf(label);
  //   this.labelsArray.at(index).setValue(isChecked);
  // }

  onSubmit() {
    const formData = this.updateProductQuantity.value;
    this.isLoading = true;
    formData.expireDate = moment(formData.expireDate).format('YYYY-MM-DD');
    if (this.updateProductQuantity.valid) {
      const request = {
        name: formData.name,
        category: formData.category,
        minQuantity: formData.minQuantity,
        unit: formData.unit,
        totalAvailableQuantity: formData.totalAvailableQuantity,
        totalAddedQuantity: formData.totalAddedQuantity,
        pricePerUnit: formData.pricePerUnit.toString(),
        about: formData.about,
        images: formData.images,
        lebels: formData.labels,
        discount: formData.discount,
        expireDate: formData.expireDate,
        margin: 20
      }
      console.log('Form Data is', request);
      this.applicationService.addProduct(request).subscribe((response: any) => {
        if (response.status) {
          this.isLoading = false;
          this.notifier.notify('success', 'Product Update Successfully');
          this.close();
        }
        else {
          this.isLoading = false;
          this.notifier.notify('error', response.message);
        }
      }, (error) =>{
        this.isLoading = false;
        this.notifier.notify('error', error.error.message[0]);
      });
    }
    else {
      this.isLoading = false;
      this.notifier.notify('error', 'Please fill the form completely.');
    }
  }

  close() {
    this.dialogRef.close(true);
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

  // createBulkOrderDiscounts(): FormGroup {
  //   return this.fb.group({
  //     minKg: [0, [Validators.required, Validators.min(0)]],
  //     maxKg: [0, [Validators.required, Validators.min(0)]],
  //     discountPercentage: [0, [Validators.required, Validators.min(0)]]
  //   });
  // }

  // get bulkOrderDiscounts(): FormArray {
  //   return this.updateProductQuantity.get('bulkOrderDiscounts') as FormArray;
  // }

  get images(): FormArray {
    return this.updateProductQuantity.get('images') as FormArray;
  }

  get discountMatrix(): FormArray {
    return this.updateProductQuantity.get('discountMatrix') as FormArray;
  }

  removeFile(index: any) {
    this.myFiles.splice(index, 1);
    this.images.removeAt(index);
  }

  // removeFile(index: number) {
  //   this.myFiles.splice(index, 1);
  //   // const control = this.updateProductQuantity.get('images') as FormArray;
  //   control.removeAt(index);
  // }

  // getFileDetails(e: any) {
  //   for (const selectedFile of e.target.files) {
  //     const fileExtension = selectedFile.name.split('.').pop();
  //     this.fileSelected.push(selectedFile);
  //     console.log('File is ', this.fileSelected);
  //     this.selectedFileAdd(selectedFile)
  //   }
  // }

  getFileDetails(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.myFiles.push({
        name: file.name,
        url: URL.createObjectURL(file),
      });
      // Add the file to the FormArray
      this.images.push(this.fb.control(file));
    }
  }

  selectedFileAdd(selectedFile: any){
    const reader = new FileReader();
    reader.onload = (e: any) => {
      console.log('E', e);
      this.myFiles.push({ name: selectedFile.name, url: e.target.result });
      const nameOrderMap = this.images.value.map((item: any) => item.name);
      this.myFiles.sort((a, b) => {
        return nameOrderMap.indexOf(a.name) - nameOrderMap.indexOf(b.name);
      });
      this.selectedFile = this.myFiles;
      this.attachmentsName.push(selectedFile.name);
    };
    const newItem = this.fb.control(selectedFile, Validators.required);
    reader.readAsDataURL(selectedFile);
    this.images.push(newItem);
  }

  validateNumber(event: KeyboardEvent): void {
    const key = event.key;
    const currentValue = (event.target as HTMLInputElement).value;
    if (key === '.' && !currentValue.includes('.')) {
      return;
    }
    if (!/^\d$/.test(key)) {
      event.preventDefault();
    }
  }

    getCategories() {
      this.applicationService.getCategoriesAdmin().subscribe((response: any) => {
        if (response.status) {
          this.categories = response.payload;
        }
      });
    }
    getlabels() {
      this.applicationService.getLabels().subscribe((response: any) => {
        if (response.status) {
          this.labels = response.payload;
          this.initializeLabels(); 
        }
      });
    }

    initializeLabels() {
      this.labels.forEach(() => {
        this.labelsArray.push(this.fb.control(false)); // Initialize checkbox controls
      });
    }
    
    get labelsArray(): FormArray {
      return this.updateProductQuantity.get('labels') as FormArray;
    }
    onLabelChange(label: any, isChecked: boolean) {
      const index = this.labels.indexOf(label);
      this.labelsArray.at(index).setValue(isChecked); // Set the FormArray control value
    }
    


}
