import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { UrlEndPoint } from "src/app/components/constants/constants/urlEndpoints.constant";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  userAdmin = environment.user;
  productAdmin = environment.product;
  orderAdmin = environment.order;
  combinedBlob: any;

  constructor(public http: HttpClient, public router: Router) { }

  listUsers(reqData: any) {
    const url= environment.apiServiceUrl + this.userAdmin + UrlEndPoint.listUsers;
    return this.http.post(url, reqData);
  }

  createUser(reqData: any) {
    const url= environment.apiServiceUrl + this.userAdmin + UrlEndPoint.createUser;
    return this.http.post(url, reqData);
  }

  signInUser(reqData: any) {
    const url= environment.apiServiceUrl + this.userAdmin + UrlEndPoint.signIn;
    return this.http.post(url, reqData);
  }

  updateUser(reqData: any) {
    const url= environment.apiServiceUrl + this.userAdmin + UrlEndPoint.updateUser;
    return this.http.post(url, reqData);
  }

  changePassword(reqData: any) {
    const url= environment.apiServiceUrl + this.userAdmin + UrlEndPoint.changePassword;
    return this.http.post(url, reqData);
  }

  userDelete(reqData: any){
    const url= environment.apiServiceUrl + this.userAdmin + UrlEndPoint.deleteUser;
    return this.http.post(url, reqData);
  }


  addProduct(reqData: any){
    const formData = new FormData();
    reqData.images.forEach((element: any, index: any) => {
      formData.append(`files`, element);
    });
    reqData.images = [];
    formData.append('productJsonData', JSON.stringify(reqData));
    const url= environment.apiServiceUrl + this.productAdmin + UrlEndPoint.addNewProduct;
    return this.http.post(url, formData);
  }

  filteredProduct(reqData: any){
    const url= environment.apiServiceUrl + this.productAdmin + UrlEndPoint.filteredProduct;
    return this.http.post(url, reqData);
  }

  productQuantity(reqData: any){
    const url= environment.apiServiceUrl + this.productAdmin + UrlEndPoint.quantityProduct;
    return this.http.post(url, reqData);
  }

  productSearch(reqData: any){
    const url= environment.apiServiceUrl + this.productAdmin + UrlEndPoint.searchProduct;
    return this.http.post(url, reqData);
  }

  updateProduct(reqData: any){
    const url= environment.apiServiceUrl + this.productAdmin + UrlEndPoint.updateProduct;
    return this.http.post(url, reqData);
  }

  listOfOrders(reqData: any){
    const url= environment.apiServiceUrl + this.orderAdmin + UrlEndPoint.listOrders;
    return this.http.post(url, reqData);
  }

  listOrdersByOrderType(reqData: any){
    const url= environment.apiServiceUrl + this.orderAdmin + UrlEndPoint.listOrdersByOrderType;
    return this.http.post(url, reqData);
  }

  listOrdersByPaymentStatus(reqData: any){
    const url= environment.apiServiceUrl + this.orderAdmin + UrlEndPoint.listOrdersByPaymentStatus;
    return this.http.post(url, reqData);
  }


  listOrdersByCurrentOrderStatus(reqData: any){
    const url= environment.apiServiceUrl + this.orderAdmin + UrlEndPoint.listOrdersByCurrentOrderStatus;
    return this.http.post(url, reqData);
  }

  changeOrderStatusShipped(reqData: any){
    const url= environment.apiServiceUrl + this.orderAdmin + UrlEndPoint.changeOrderStatusShipped;
    return this.http.post(url, reqData);
  }

  OutForDelivery(reqData: any){
    const url= environment.apiServiceUrl + this.orderAdmin + UrlEndPoint.orderStatusOutForDelivery;
    return this.http.post(url, reqData);
  }

  OrderStatusDelivered(reqData: any){
    const url= environment.apiServiceUrl + this.orderAdmin + UrlEndPoint.orderStatusDelivered;
    return this.http.post(url, reqData);
  }

  getCategoriesAdmin() {
    const authToken = localStorage.getItem('token');
    const url = environment.apiServiceUrl + UrlEndPoint.getCategoriesAdmin;
    console.log(url);
    const body = {};
    return this.http.post(url, body);
  }

  getLabels() {
    const authToken = localStorage.getItem('token');
    const url = environment.apiServiceUrl  + UrlEndPoint.getLabels;
    const body = {authToken};
    return this.http.post(url, body);
  }

}
