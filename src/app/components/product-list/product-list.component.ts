import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { AddProductComponent } from "src/app/add-product/add-product.component";
import { ApplicationService } from "src/app/core/services/application.service";
import { ViewProductComponent } from "src/app/view-product/view-product.component";
import { EditProfileComponent } from "src/app/edit-profile/edit-profile.component";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  @ViewChild(MatSort) sort!: MatSort;
  searchQuery: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ELEMENT_DATA: any[] = [];
  dataSource: any= MatTableDataSource<any>;
  sortColumn: string = '';
  sortDirection: any = 'asc';
  isSearchData: boolean = false;
  displayedColumns: string[] = ['name', 'about', 'pricePerUnit', 'expireDate', 'totalAvailableQuantity',
  'minQuantity', 'action'];
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  originalPageLimit: any;
  selectPage: string = "1";
  pageOptionSize= ['5', '10', '25', '100'];
  selectedOption: any[] = [];
  options: string[] = ['Fruits', 'Vegetables'];
  pageSize = 5;
  currentPage = 0;
  totalSize = 0;
  userData: any;
  color: ThemePalette = 'warn';
  value = 100;
  isLoading = false;

  links = [
    { name: 'Order', icon: 'public' },
    { name: 'Product', icon: 'shopping_basket' },
    { name: 'Profile', icon: 'account_circle' },
  ];

  cards = [
    { title: 'Users', content: 'Manage user accounts and permissions', icon: 'people' },
    { title: 'Settings', content: 'Configure application settings', icon: 'settings' },
    { title: 'Reports', content: 'View system reports and analytics', icon: 'assessment' }
  ];

  constructor(public dialog: MatDialog,  public router: Router, public http: HttpClient, public applicationService: ApplicationService,
    public notifierService: NotifierService, private changeDetectorRef: ChangeDetectorRef
  ){
    this.originalPageLimit =  this.pageOptionSize[0];
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.userData =  JSON.parse(localStorage.getItem('User_Details') as any);
    if(this.userData.role === 'admin'){
      this.links.pop();
    }
  }

  ngOnInit(): void {
    const sort: Sort = {
      active: '',
      direction: ''
    };
    this.sortChange(sort);
    this.initiateTable();
  }

  selectPageNumber(option: any){
    this.originalPageLimit = option;
  }

  changePageLimit(option: any){
    this.selectPage = option;
  }

  listFind(){
    if(this.originalPageLimit && this.selectPage){
      this.initiateTable();
    }
  }

  editProfile(){
    const dialogRef = this.dialog.open(EditProfileComponent, {
      data: {
        modal: true,
        selectedApplication: 'xyz',
      },
      width: '500px',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.initiateTable();
      }
    })
  }

  initiateTable(){
    this.isLoading = true;
    const request = {
      "categories": this.selectedOption,
      "page": parseInt(this.selectPage),
      "limit": parseInt(this.originalPageLimit)
    }
    this.applicationService.filteredProduct(request).subscribe((response: any) =>{
      if(response.status){
        this.ELEMENT_DATA = response.payload;
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      }
      else{
        this.ELEMENT_DATA = [];
      }
      this.isLoading = false;
    })
  }

  selectionChange(){
    this.initiateTable();
  }

  applyFilter(filterValue: Event) {
    this.isSearchData = true;
    if (filterValue.target && filterValue.target instanceof HTMLInputElement) {
      this.dataSource.filter = filterValue.target.value;
      this.searchProduct()
      if(!filterValue.target.value){
        this.isSearchData = false;
      }
    }
  }

  searchProduct(){
    if(this.dataSource.filter.length === 0){
      this.initiateTable();
    }
    if(this.dataSource.filter.length >= 3){
      const request = {
        "query": this.dataSource.filter,
        "page": parseInt(this.selectPage),
        "limit": parseInt(this.originalPageLimit)
      }
      this.applicationService.productSearch(request).subscribe((response: any) =>{
        if(response.status){
          this.ELEMENT_DATA = response.payload;
          this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
        }
        else{
          this.ELEMENT_DATA = [];
        }
      })
    }
  }

  clearSearch() {
    this.searchQuery = '';
    if (this.dataSource) {
      this.dataSource.filter = '';
    }
    if(this.dataSource.filter.length === 0){
      this.initiateTable();
    }
    this.isSearchData = false;
  }

  redirectsPage(event: any){
    if(event === 'Order'){
      this.router.navigate(['/krishi-mandi/order'])
    }

    if(event === 'Profile'){
      this.router.navigate(['/krishi-mandi/profile']);
    }
  }


  isSortingDisabled(columnText: any): boolean {
    if (columnText === 'action') {
      return true;
    }
    return false;
  }


  sortChange(event: any) {
    this.sortColumn = event.active;
    this.sortDirection = event.direction;
    this.dataSource.sort = this.sort;

    if (this.sort) {
      const sortState: Sort = { active: this.sortColumn, direction: this.sortDirection };
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      const sortData = this.dataSource.sortData(this.dataSource.filteredData, this.dataSource.sort);
    }
  }

  navigate(event: string){
    if(event === 'logout'){
      localStorage.clear();
      this.router.navigate(['/krishi-mandi/login'])
    }

    if(event === 'profile'){
      this.router.navigate(['/krishi-mandi/profile'])
    }
  }

  viewQuantity(application: any){

    const dialogRef = this.dialog.open(ViewProductComponent, {
      data: {
        modal: true,
        selectedApplication: application,
      },
      width: '800px',
      height: '600px',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.clearSearch();
        this.initiateTable();
      }
    })
  }

  addProduct(){
    const dialogRef = this.dialog.open(AddProductComponent, {
      data: {
        modal: true,
      },
      width: '800px',
      height: '600px',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.initiateTable();
      }
    })
  }
}
