import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from '../auth.service';
import { TokenStorage } from '../jwt/token.service';

import { SystemAdminService } from '../../rest/system-admin.service';
import { SystemAdmin } from '../../rest/model/system-admin.model';
import { first } from 'rxjs';
import { ex } from '@fullcalendar/core/internal-common';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthGuardService,private aService: AuthService, private router: Router,private tokenStorage: TokenStorage, private systemAdminService: SystemAdminService) { } 

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data['expectedRole'];
    const role = this.aService.user$.value.roles;
    // decode the token to get its payload
    console.log("EXPECTED ROLE:")
    console.log(expectedRole)
    console.log("ROLE:")
    console.log(this.aService.user$.value.roles)
    console.log(this.aService.user$.value.email)    
    if (
      !this.aService.user$ || 
      !role.includes(expectedRole)
    ) {
      this.router.navigate(['']);
      return false;
    }

    if(expectedRole == 'ROLE_SYSTEM_ADMIN'){
      console.log("UNUTRA")
      if(this.isSystemAdminFirstLogged(this.aService.user$.value.email)){
        console.log("UNUTRA 2")
        this.router.navigate(['/change-password']);
        return false;
      }
    }


    return true;
  }

  

  isSystemAdminFirstLogged(name: String): boolean{

    let firstLogged = false; 
    console.log("U METODI")
    this.systemAdminService.getByName(name).subscribe({
      next: (systemAdmin: SystemAdmin) => {
        if (systemAdmin && systemAdmin.firstLogged !== undefined) {
          console.log("U METODI 2")
          firstLogged = systemAdmin.firstLogged;
          console.log(firstLogged)
          return firstLogged;
        }
        return firstLogged;
      },
      error: (error) => {
        console.error("Error occurred:", error);
        return true;
      }
    });
  
    console.log("U METODI 3")
    return firstLogged;
  }
  
}