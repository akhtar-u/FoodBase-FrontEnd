import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/login') || req.url.includes('/public')) {
      return next.handle(req);
    }
    else {
      const jwtRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('JWT'))
      });
      return next.handle(jwtRequest);
    }
  }
}
