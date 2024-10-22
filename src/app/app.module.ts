import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { SharedModule } from "./components/shared/shared.module";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderInterceptor } from "./core/interceptors/header.interceptors";
import { ResponseInterceptor } from "./core/interceptors/response.interceptors";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { TrackOrdersComponent } from './track-orders/track-orders.component';
import { AddUserComponent } from './add-user/add-user.component';
import { JwtModule } from "@auth0/angular-jwt";
import { OrderStatusComponent } from './order-status/order-status.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { TransformPipe } from './core/pipes/transform.pipe';
import { ViewOrdersComponent } from './view-orders/view-orders.component';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

// Custom options for the Notifier
const customNotifierOptions: NotifierOptions = {
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

@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent,
    EditProfileComponent,
    PageNotFoundComponent,
    UpdateProfileComponent,
    UserDeleteComponent,
    ConfirmDialogComponent,
    UpdateProductComponent,
    AddProductComponent,
    TrackOrdersComponent,
    AddUserComponent,
    OrderStatusComponent,
    ViewProductComponent,
    ViewOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter:  () => localStorage.getItem('access_token')
      }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
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
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
