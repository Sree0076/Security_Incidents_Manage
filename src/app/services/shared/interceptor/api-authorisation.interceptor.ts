import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const excludedUrls = ['/api/Employee/GetEmployeeByToken/getUserRole'];

    const isExcluded = excludedUrls.some(url => req.url.includes(url));

    if (isExcluded) {
      console.log("Request URL is excluded, not adding token:", req.url);
      return next.handle(req);
    }

    const token = localStorage.getItem('accessToken');

    if (token) {
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      console.log("Request with token:", clonedRequest);
      return next.handle(clonedRequest);
    } else {
      console.log("No token found in localStorage.");
      // If no token is present, send the request without token
      return next.handle(req);
    }
  }
}
