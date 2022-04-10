import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService} from './user.service'


@Injectable()
export class UserInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // adapted from https://www.positronx.io/angular-jwt-user-authentication-tutorial/
    const authToken = this.userService.getToken();
        request = request.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken
            }
        });
    return next.handle(request);
  }
}
