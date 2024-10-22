import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { SharedModule } from "../shared/shared.module";
import { NotifierModule } from "angular-notifier";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    UserProfileComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    SharedModule,
    CommonModule,
    UserProfileRoutingModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
          distance: 12
        },
        vertical: {
          position: 'top',
          distance: 12,
          gap: 10
        }
      },
      behaviour: {
        autoHide: 2000
      }
    }),
  ]
})
export class UserProfileModule { }
