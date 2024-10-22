import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { AuthGuard } from "./core/guards/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/krishi-mandi', pathMatch: 'full' },
  { path: 'krishi-mandi', component: AdminPageComponent,
    children: [
    {
      path: 'login',
      loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)
    },
    {
      path: 'signup',
      loadChildren: () => import('./components/signup/signup.module').then(m => m.SignUpModule)
    },
    {
      path: 'order',
      loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
    },
    {
      path: 'profile',
      loadChildren: () => import('./components/user-profile/user-profile.module').then(m => m.UserProfileModule)
    },
    {
      path: 'product',
      loadChildren: () => import('./components/product-list/product-list.module').then(m => m.ProductListModule)
    },
  ]},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
