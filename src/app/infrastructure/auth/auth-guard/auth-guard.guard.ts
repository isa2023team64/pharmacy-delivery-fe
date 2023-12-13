import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from '../auth.service';
import { TokenStorage } from '../jwt/token.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthGuardService,private aService: AuthService, private router: Router,private tokenStorage: TokenStorage,) { } 

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data['expectedRole'];
    const role = this.aService.user$.value.roles;
    // decode the token to get its payload
    if (
      !this.aService.user$ || 
      !expectedRole.includes(role)
    ) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
  
}
