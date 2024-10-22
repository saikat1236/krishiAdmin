import { NgModule } from '@angular/core';
import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './product-list.component';
import { NotifierModule } from "angular-notifier";
import { SharedModule } from "../shared/shared.module";
import { TransformPipe } from "src/app/core/pipes/transform.pipe";


@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    SharedModule,
    ProductListRoutingModule,
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
export class ProductListModule { }
