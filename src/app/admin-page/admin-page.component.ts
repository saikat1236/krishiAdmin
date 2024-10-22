import { Component, OnInit } from '@angular/core';
import { ThemePalette } from "@angular/material/core";
import { Router } from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import { NotifierService } from "angular-notifier";
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit{

  viewMode: boolean = false;
  color: ThemePalette = 'warn';
  value = 100;
  isLoading = false;
  selectedItem: any='English';
  userData: any;
  constructor(public notifier: NotifierService, public router: Router, private translate: TranslateService ){
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    if(this.router.url === '/krishi-mandi'){
      this.viewMode = true;
    }
    console.log('ViewMode', this.viewMode);
  }

  checkUrl(){
    if(this.router.url === '/krishi-mandi' || this.router.url === '/krishi-mandi/login'){
      return false;
    }
    return true;
  }

  navigate(viewMode: string){
    this.viewMode = false;

    if(viewMode === 'order'){
      this.router.navigate(['krishi-mandi/order']);
    }

    if(viewMode === 'product'){
      this.router.navigate(['krishi-mandi/product']);
    }
  }

  langChangeModel(newValue: any){
    if(this.selectedItem === 'English'){
      this.selectedItem = 'en';
    }
    this.selectedItem = newValue;
    this.changeSystemLanguage(this.selectedItem)
  }

  changeSystemLanguage(lang: string){
    if(lang === 'English'){
      lang = 'en';
    }
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }

  navigateToLogin(){
    this.viewMode = false;
    localStorage.clear();
    this.router.navigate(['/krishi-mandi/login'])
  }
}
