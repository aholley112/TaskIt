import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  // Interceptor method for HttpInterceptor
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}

// Testing again
