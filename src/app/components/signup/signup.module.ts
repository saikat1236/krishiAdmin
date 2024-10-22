import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SignUpRoutingModule } from "./signup-routing.module";
import { SignupComponent } from "./signup.component";
import { SharedModule } from "../shared/shared.module";
import { NotifierModule } from "angular-notifier";
@NgModule({
  declarations: [
    SignupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    SharedModule,
    SignUpRoutingModule,
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
export class SignUpModule { }
