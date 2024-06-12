// import { CanActivateFn } from '@angular/router';

// export const authenticatedGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root',
})
export class authenticatedGuard implements CanActivate {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object, private loginService:LoginService) {}
  
  canActivate(
    route: ActivatedRouteSnapshot, 
    state :RouterStateSnapshot):Observable<boolean |UrlTree> | Promise < boolean | UrlTree >| boolean | UrlTree{
      {
        if (isPlatformBrowser(this.platformId) && localStorage.getItem('access_token')) {
          this.router.navigate(['/home']);
          return false;
        } else {
          return true;
        }
      }
    }
  }
