import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { ApplicationService } from "src/app/core/services/application.service";
import { EditProfileComponent } from "src/app/edit-profile/edit-profile.component";
import { UpdateProfileComponent } from "src/app/update-profile/update-profile.component";
import { UserDeleteComponent } from "src/app/user-delete/user-delete.component";
import { AddUserComponent } from "src/app/add-user/add-user.component";
import { ThemePalette } from "@angular/material/core";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, AfterViewInit{

  @ViewChild(MatSort) sort!: MatSort;
  searchQuery: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ELEMENT_DATA: any[] = [];
  sortColumn: string = '';
  sortDirection: any = 'asc';
  dataSource: any= MatTableDataSource<any>;
  isSearchData: boolean = false;
  pageSize = 5;
  currentPage = 0;
  totalSize = 0;
  userData: any;
  color: ThemePalette = 'warn';
  value = 100;
  isLoading = false;
  disabledEdit = false;
  links = [
    { name: 'Order', icon: 'public' },
    { name: 'Product', icon: 'shopping_basket' },
    { name: 'Profile', icon: 'account_circle' },
  ];
  displayedColumns: string[] = ['userName', 'email', 'role', 'status', 'action'];
  originalPageLimit: any;
  selectPage: string = "1";
  pageOptionSize= ['5', '10', '25', '100'];
  editDisabledPassword = true;

  constructor(public notifierService: NotifierService, public applicationService: ApplicationService,
    public router: Router, public dialog: MatDialog){
    this.originalPageLimit =  this.pageOptionSize[0];
    this.userData =  JSON.parse(localStorage.getItem('User_Details') as any);
    console.log('Data user', this.userData);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  deleteAccount(){
    const dialogRef = this.dialog.open(UserDeleteComponent, {
      data: {
        modal: true,
        selectedApplication: '',
      },
      width: '500px',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){

      }
    })
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

  initiateTable(){
    this.isLoading = true;
    const request = {
      "page": parseInt(this.selectPage),
      "size": parseInt(this.originalPageLimit)
    }
    this.applicationService.listUsers(request).subscribe((response: any) =>{
      if(response.status){
        this.isLoading = false;
        this.ELEMENT_DATA = response.payload;
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      }
      else{
        this.notifierService.notify('error', response.message);
        this.ELEMENT_DATA = [];
      }
    })
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

  handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.initiateTable();
  }

  isVisible(){
    if(this.userData.role === 'superAdmin'){
      return true;
    }
    return false;
  }

  removeUser(element: any){
    const dialogRef = this.dialog.open(UserDeleteComponent, {
      data: {
        modal: true,
        selectedApplication: element,
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

  updateUser(element: any){
    const dialogRef = this.dialog.open(UpdateProfileComponent, {
      data: {
        modal: true,
        selectedApplication: element,
      },
      width: '500px',
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log('Result is', result);
        this.initiateTable();
      }
    })
  }

  getDisabled(element: any){
    if(element.role === 'superAdmin'){
      return true;
    }
    // else{
    //   this.editProfile(element);
    // }
    return false;
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

  updateProfile(){
    const dialogRef = this.dialog.open(UpdateProfileComponent, {
      data: {
        modal: true,
        selectedApplication: '',
      },
      width: '500px',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log('Result is', result);
        this.initiateTable();
      }
    })
  }

  clearSearch() {
    this.searchQuery = '';
    if (this.dataSource) {
      this.dataSource.filter = '';
    }
    this.isSearchData = false;
  }

  isSortingDisabled(columnText: any): boolean {
    if (columnText === 'action') {
      return true;
    }
    return false;
  }

  applyFilter(filterValue: Event) {
    this.isSearchData = true;
    if (filterValue.target && filterValue.target instanceof HTMLInputElement) {
      this.dataSource.filter = filterValue.target.value;
      if(!filterValue.target.value){
        this.isSearchData = false;
      }
    }
  }

  navigate(event: any){
    if(event.name === 'Order'){
      this.router.navigate(['/krishi-mandi/order']);
    }

    if(event.name === 'Product'){
      this.router.navigate(['/krishi-mandi/product']);
    }

    if(event === 'logout'){
      localStorage.clear();
      this.router.navigate(['/krishi-mandi/login'])
    }
  }

  addProduct(){
    const dialogRef = this.dialog.open(AddUserComponent, {
      data: {
        modal: true,
      },
      width: '600px',
      height: '485px',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log('Result is', result);
        this.initiateTable();
      }
    })
  }

  ngOnInit(): void {
    const sort: Sort = {
      active: '',
      direction: ''
    };
    this.sortChange(sort);
    this.initiateTable();
  }
}
