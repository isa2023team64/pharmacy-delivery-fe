import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegistrationCompany } from './model/registration-company.model';
import { environment } from '../../env/environment';
import { AuthenticationResponse } from '../infrastructure/auth/model/authentication-response.model';
import { TokenStorage } from '../infrastructure/auth/jwt/token.service';
import { Company } from './model/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {


  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private router: Router,
  ) {}

  registerCompany(company : Company): Observable<AuthenticationResponse>{
    return this.http
      .post<AuthenticationResponse>(environment.apiHost + 'companies', company)
      .pipe(
        tap((authenticationResponse) => {
            console.log("AUTHENTICATED COMPANY")
            

        })
      );
  }


}



