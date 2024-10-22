import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from "@angular/material/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { ApplicationService } from "src/app/core/services/application.service";
import { EditProfileComponent } from "src/app/edit-profile/edit-profile.component";
import { OrderStatusComponent } from "src/app/order-status/order-status.component";
import { TrackOrdersComponent } from "src/app/track-orders/track-orders.component";
import { ViewOrdersComponent } from "src/app/view-orders/view-orders.component";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit{
  @ViewChild(MatSort) sort!: MatSort;
  searchQuery: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ELEMENT_DATA: any[] = [];
  dataSource: any= MatTableDataSource<any>;
  sortColumn: string = '';
  sortDirection: any = 'asc';
  isSearchData: boolean = false;
  selectQuery: any;
  userData: any;
  color: ThemePalette = 'warn';
  value = 100;
  isLoading = false;
  originalPageLimit: any;
  selectPage: string = "1";
  pageOptionSize= ['5', '10', '25', '100'];
  statusType: any;
  label: any;
  orderType: number = 2;
  displayedColumns: string[] = ['userName', 'email', 'currentOrderStatus', 'mobileNumber', 'paymentStatus',
  'paymentType', 'dateAndTimeOrderPlaced', 'action'];

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

  selectedOption: string = '';
  options: string[] = ['Order List', 'Order Status', 'Payment Status'];

  constructor(public dialog:MatDialog, public router: Router, public http: HttpClient, public applicationService: ApplicationService,
    public notifierService: NotifierService
  ){
    this.originalPageLimit =  this.pageOptionSize[0];
    setTimeout(() =>{
      this.userData = JSON.parse(localStorage.getItem('User_Details') as any);
      console.log('Data user', this.userData);
    }, 2000);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('User_Details') as any);
    if(this.userData.role === 'admin'){
      this.links.pop();
    }
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

  initiateTable(){
    this.isLoading = true;
    const request = {
      "page": parseInt(this.selectPage),
      "limit": parseInt(this.originalPageLimit),
      "type": this.orderType
    }
    this.applicationService.listOfOrders(request).subscribe((response: any) =>{
      if(response.status){
        this.ELEMENT_DATA = response.payload.map((obj: any)=> {
          delete response.payload.productsOrdered;
          console.log();
          console.log('Element data', obj);
          return obj;
        });
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
        console.log('This dataSource', this.dataSource);
      }
      else{
        this.ELEMENT_DATA = [];
      }
      this.isLoading = false;
    })
  }

  applyFilter(filterValue: Event) {
    this.isSearchData = true;
    if (filterValue.target && filterValue.target instanceof HTMLInputElement) {
      const filterString = filterValue.target.value.trim().toLowerCase();
      this.dataSource.filter = filterString;
      if(!filterValue.target.value){
        this.isSearchData = false;
      }
    }
  }

  redirectsPage(event: string){
    if(event === 'Product'){
      this.router.navigate(['/krishi-mandi/product'])
    }

    if(event === 'Order'){
      this.router.navigate(['/krishi-mandi/order'])
    }

    if(event === 'Profile'){
      this.router.navigate(['/krishi-mandi/profile']);
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

  isSortingDisabled(columnText: any): boolean {
    if (columnText === 'action') {
      return true;
    }
    return false;
  }

  orderSection(){
    this.label = 'Check Status Of Your Orders'
    this.statusType = [
      { label: 'placed', value: '1' },
      { label: 'delivered', value: '2' },
      { label: 'shipped', value: '3' },
      { label: 'outForDelivery', value: '4'},
      { label: 'cancelled', value: '5'}
    ];
  }

  paymentSection(){
    this.label = 'Check Status Of Your Orders'
    this.statusType = [
      { label: 'pending', value: '1' },
      { label: 'completed', value: '2' },
      { label: 'failed', value: '3' },
    ];
  }

  OrderListType(){
    this.label = 'Choose Order Type'
    this.statusType = [
      { label: 'farmers', value: '1' },
      { label: 'consumers', value: '0' },
      { label: 'Both', value: '2' },
    ];
  }

  checkOrderStatusType(result: any){
    if(result.optionSelect === 'farmers'){
      this.orderType = 1;
    }
    else if(result.optionSelect === 'consumers'){
      this.orderType  = 0
    }
    else{
      this.orderType = 2
    }
    this.initiateTable();
  }

  orderStatus(type: string){
    if(type === 'Order Status'){
      this.orderSection();

      const dialogRef = this.dialog.open(OrderStatusComponent, {
        data: {
          modal: true,
          orderType: type,
          status: this.statusType,
          title: this.label,
          optionSelect: ''
        },
        width: '620px',
        height: '250px',
        autoFocus: false
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result.modal){
          this.isLoading = true;
          this.checkOrderStatus(result.optionSelect)
        }
      })
    }

    if(type === 'Payment Status'){
      this.paymentSection();
        const dialogRef = this.dialog.open(OrderStatusComponent, {
          data: {
            modal: true,
            orderType: type,
            status: this.statusType,
            title: this.label,
            optionSelect: ''
          },
          width: '620px',
          height: '250px',
          autoFocus: false
        });
        dialogRef.afterClosed().subscribe(result => {
          if(result.modal){
            this.isLoading = true;
            this.checkOrderStatus(result.optionSelect)
          }
        }
      )
    }

    if(type === 'Order List'){
      this.OrderListType();
      const dialogRef = this.dialog.open(OrderStatusComponent, {
        data: {
          modal: true,
          orderType: type,
          status: this.statusType,
          title: this.label,
          optionSelect: ''
        },
        width: '620px',
        height: '250px',
        autoFocus: false
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result.modal){
          this.isLoading = true;
          this.checkOrderStatusType(result);
        }
      }
    )}
  }

  viewOrders(orderData: any){
   console.log('Order Data', orderData);
   const dialogRef = this.dialog.open(ViewOrdersComponent, {
    data: {
      modal: true,
      selectedApplication: orderData,
    },
    width: '800px',
    height: '600px',
    autoFocus: false
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result){
      console.log('Order Result', result);
    }
  })
}

  trackOrderStatus(application: any, orderStatus: any){
      const dialogRef = this.dialog.open(TrackOrdersComponent, {
        data: {
          modal: true,
          status: orderStatus,
          selectedApplication: application,
        },
        width: '500px',
        autoFocus: false
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result){
          console.log('Track Order Status', result);
          this.initiateTable();
        }
      }
    )
  }

  checkOrderStatus(event: string){
    const request ={
      "status": event,
      "page": parseInt(this.selectPage),
      "limit": parseInt(this.originalPageLimit)
    }

    let applicationReq: any;
    if(event === 'pending' || event === 'completed' || event === 'failed'){
      applicationReq = this.applicationService.listOrdersByPaymentStatus(request);
    }

    if(event === 'placed' || event ==='delivered' || event === 'shipped'
      || event === 'outForDelivery'  || event === 'cancelled'){
      applicationReq = this.applicationService.listOrdersByCurrentOrderStatus(request);
    }

    applicationReq.subscribe((response: any) =>{
      if(response.status){
        this.isLoading = false;
        this.ELEMENT_DATA = response.payload.map((obj: any)=> {
          delete response.payload.productsOrdered;
          console.log('Element data', obj);
          return obj;
        });
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      }
      else{
        this.isLoading = false;
        this.ELEMENT_DATA = [];
      }
    })
  }

  change($event: Event){
    console.log($event);
  }

  checkOrderType(event: any){
    const request = {
      "type": 1,
      "page": parseInt(this.selectPage),
      "limit": parseInt(this.originalPageLimit)
    }
    this.applicationService.listOrdersByOrderType(request).subscribe((response: any) =>{
      if(response.status){
        this.ELEMENT_DATA = response.payload.map((obj: any)=> {
          delete response.payload.productsOrdered;
          return obj;
        });
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      }
      else{
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

  navigate(event: string)
  {
    if(event === 'logout'){
      localStorage.clear();
      this.router.navigate(['/krishi-mandi/login'])
    }

    if(event === 'profile'){
      this.router.navigate(['/krishi-mandi/profile'])
    }
  }
}
