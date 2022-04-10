import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(
    public userService: UserService,
    public router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
      if (this.userService.isLoggedIn === null) {   // isLoggedIn !== true adapted to 'my' isLoggedIn method
        window.alert("Access not allowed!");
        this.router.navigate(['login'])
      }
  return true;
  }
  
}
