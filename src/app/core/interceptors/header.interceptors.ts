
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { jwtDecode } from "jwt-decode";
@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  isCustomSpinner= true;
  constructor() {}
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timeout= 0;
    const token = `${localStorage.getItem('token')}`;
    let headers;
      headers =  { setHeaders: {
        'Authorization': token,
        'x-api-key': environment.apiKey,
      }
    }
    let decodeToken = this.jwtDecoderService(token)
    localStorage.setItem('User_Details', JSON.stringify(decodeToken));
    return next.handle(httpRequest.clone(headers)).pipe(delay(timeout));
  }

  jwtDecoderService(token: any){
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
}
