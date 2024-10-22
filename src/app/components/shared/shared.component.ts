import { Router } from '@angular/router';

export abstract class SharedComponent {

  urlPath: string;

  constructor(public router: Router) {
    this.urlPath = this.router.url;
    // this.getUrlTab(this.urlPath);
  }


  /* istanbul ignore next */
  // getNavigateRoute(tabName) {
  // }
}
