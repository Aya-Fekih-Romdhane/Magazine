import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private auth : AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   let token =req.clone({
    req = req.clone({
      headers: req.headers.set('authorization',this.auth.GetToken())
    });
    return next.handle(req);
  }
}
export const AuthInterceptorProvider ={
  provide:HTTP_INTERCEPTORS,
  useClass:TokenInterceptorService,
  multi : true,
};
