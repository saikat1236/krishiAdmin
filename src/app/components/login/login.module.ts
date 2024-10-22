import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LoginComponent } from "./login.component";
import { LoginRoutingModule } from "./login-routing.module";
import { SharedModule } from "../shared/shared.module";
import { NotifierModule } from "angular-notifier";
@NgModule({
  declarations: [
    LoginComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    SharedModule,
    LoginRoutingModule,
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
export class LoginModule { }
