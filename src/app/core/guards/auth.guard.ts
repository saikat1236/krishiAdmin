import { inject } from "@angular/core";
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = `${localStorage.getItem('token')}`;

  if (!token || token === 'null') {
    console.log('====================================');
    console.log('Log', token);
    console.log('====================================');
    router.navigate(['/krishi-mandi/login']);
    return true;
  }
  return true;
};

