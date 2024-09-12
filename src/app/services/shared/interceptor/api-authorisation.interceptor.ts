import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Define a list of URLs or patterns for which the token should not be added
    const excludedUrls = ['/api/Employee/GetEmployeeByToken/getUserRole'];

    // Check if the request URL is in the excluded list
    const isExcluded = excludedUrls.some(url => req.url.includes(url));

    if (isExcluded) {
      // If the request URL is excluded, pass it along without adding the token
      console.log("Request URL is excluded, not adding token:", req.url);
      return next.handle(req);
    }

    // If the URL is not excluded, add the token to the request
    const token = localStorage.getItem('accessToken');
    console.log("Token retrieved from localStorage:", token);

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
