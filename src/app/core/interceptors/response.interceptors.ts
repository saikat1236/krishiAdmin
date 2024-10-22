import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable} from 'rxjs';
import { ApplicationService } from "../services/application.service";
import { NotifierService } from "angular-notifier";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(public applicationService: ApplicationService, public notifier: NotifierService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request ', request);

    return next.handle(request);
  }
}
