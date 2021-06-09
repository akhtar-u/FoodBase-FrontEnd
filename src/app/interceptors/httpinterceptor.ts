import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/login') || req.url.includes('/public') || req.url.includes('/registration')) {
      return next.handle(req);
    }
    else {
      const jwtRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('JWT'))
          .set('access-control-allow-origin', 'https://www.foodbase.ca')
      });
      return next.handle(jwtRequest);
    }
  }
}
