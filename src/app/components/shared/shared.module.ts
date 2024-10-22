import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { MaterialModule } from "src/material.module";
import { NotifierModule } from "angular-notifier";
import { TransformPipe } from "src/app/core/pipes/transform.pipe";
@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        RouterModule,
        HttpClientModule,
        MaterialModule,
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
        }
      ),
    ],
    declarations: [
      TransformPipe,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [],
    exports: [
      ReactiveFormsModule,
      FormsModule,
      CommonModule,
      RouterModule,
      HttpClientModule,
      MaterialModule,
      TransformPipe,
    ]
})
export class SharedModule { }
