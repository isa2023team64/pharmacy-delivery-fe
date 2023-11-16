import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorage } from './jwt/token.service';
import { JwtHelperService } from '@auth0/angular-jwt';
//import { Login } from './model/login.model';
import { AuthenticationResponse } from './model/authentication-response.model';
import { User } from './model/user.model';
import { Registration } from './model/registration.model';
//import { environment } from '../../../env/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<User>({
    id: 0,
    name: '',
    surname: '',
    email: '',
    password: '',
    city: '',
    country: '',
    phoneNumber: '',
    workplace: '',
    company: '',
    active: false,
    lastPasswordResetDate: new Date()});

  constructor(
    //private http: HttpClient,
    //private tokenStorage: TokenStorage,
    private router: Router
  ) {}

  register(registration: Registration)//: Observable<AuthenticationResponse> 
  {
    /*return this.http
      .post<AuthenticationResponse>(environment.apiHost + 'registration', registration)
      .pipe(
        tap((authenticationResponse) => {
          console.log("hi");
        })
      );*/
      
    
  }
}
