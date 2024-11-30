import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';
import { ApplicationService } from '../core/services/application.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
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
  fileSelected: File[] = [];
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
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updateProductQuantity = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      minQuantity: ['', Validators.required],
      unit: ['', Validators.required],
      totalAvailableQuantity: ['', Validators.required],
      totalAddedQuantity: ['', Validators.required],
      pricePerUnit: ['', Validators.required],
      about: ['', Validators.required],
      images: this.fb.array([], Validators.required),
      selectedLabels: [[], Validators.required], // Use a single FormControl for selected labels
      discount: ['', Validators.required],
      expireDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.getCategories();
      this.getLabels();
    } else {
      console.error('No data provided');
    }
  }

  onSubmit() {
    const formData = this.updateProductQuantity.value;
    this.isLoading = true;
    formData.expireDate = moment(formData.expireDate).format('YYYY-MM-DD');

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
        name: formData.name,
        category: formData.category,
        minQuantity: formData.minQuantity,
        unit: formData.unit,
        totalAvailableQuantity: formData.totalAvailableQuantity,
        totalAddedQuantity: formData.totalAddedQuantity,
        pricePerUnit: formData.pricePerUnit,
        about: formData.about,
        images: formData.images,
        labels: selectedLabelObjects, // Send selected labels directly
        discount: formData.discount,
        expireDate: formData.expireDate,
        margin: 20,
      };
      console.log('Form Data is', request);
      this.applicationService.addProduct(request).subscribe(
        (response: any) => {
          this.isLoading = false;
          if (response.status) {
            this.notifier.notify('success', 'Product Updated Successfully');
            this.close();
          } else {
            this.notifier.notify('error', response.message);
          }
        },
        (error) => {
          this.isLoading = false;
          this.notifier.notify('error', error.error.message[0]);
        }
      );
    } else {
      this.isLoading = false;
      this.notifier.notify('error', 'Please fill the form completely.');
    }
  }

  close() {
    this.dialogRef.close(true);
  }

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
  selectedFileAdd(selectedFile: any) {
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

  getLabels() {
    this.applicationService.getLabels().subscribe((response: any) => {
      if (response.status) {
        this.labels = response.payload;
      }
    });
  }
}
