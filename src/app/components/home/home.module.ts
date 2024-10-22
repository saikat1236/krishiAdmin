import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MaterialModule } from "src/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { SharedModule } from "../shared/shared.module";
@NgModule({
  declarations: [
    HomeComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
