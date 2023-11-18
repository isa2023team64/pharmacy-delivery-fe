import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorage } from './jwt/token.service';
import { environment } from '../../../env/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from './model/login.model';
import { AuthenticationResponse } from './model/authentication-response.model';
import { User } from './model/user.model';
import { Registration } from './model/registration.model';

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
    companyName: '',
    active: false,
    lastPasswordResetDate: new Date()});
    

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private router: Router,
  ) {}

  login(login: Login): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(environment.apiHost + 'users/login', login)
      .pipe(
        tap((authenticationResponse) => {
          this.tokenStorage.saveAccessToken(authenticationResponse.accessToken);
          this.setUser();
        })
      );
  }

  register(registration: Registration): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(environment.apiHost + 'registration', registration)
      .pipe(
        tap((authenticationResponse) => {
          this.tokenStorage.saveAccessToken(authenticationResponse.accessToken);
          console.log(authenticationResponse.accessToken)
          //this.setUser();
        })
      );
  }
  
  activateRegistratedUser(id: number): void {
    console.log("Sad treba da se aktivira " + id);
    
    this.http
      .put<AuthenticationResponse>(environment.apiHost + 'registration/activate/' + id, {})
      .subscribe({
        next: (authenticationResponse) => {
          console.log("USER AKTIVIRAN");
          // Handle the response or perform any other actions here
        },
        error: (error) => {
          console.error("Error activating user:", error);
          // Handle the error if needed
        }
      });
  }
  

  logout(): void {
    this.router.navigate(['/home']).then((_) => {
      this.tokenStorage.clear();
      this.user$.next({
        id: 0,
        name: '',
        surname: '',
        email: '',
        password: '',
        city: '',
        country: '',
        phoneNumber: '',
        workplace: '',
        companyName: '',
        active: false,
        lastPasswordResetDate: new Date()});
    });
  }

  checkIfUserExists(): void {
    const accessToken = this.tokenStorage.getAccessToken();
    if (accessToken == null) {
      return;
    }
    this.setUser();
  }

  private setUser(): void {
    const jwtHelperService = new JwtHelperService();
    const accessToken = this.tokenStorage.getAccessToken() || '';
    const user: User = {
      id: +jwtHelperService.decodeToken(accessToken).id,
      email: jwtHelperService.decodeToken(accessToken).email,
      name: jwtHelperService.decodeToken(accessToken).name,
      surname: jwtHelperService.decodeToken(accessToken).surname,
      password: jwtHelperService.decodeToken(accessToken).password,
      city: jwtHelperService.decodeToken(accessToken).city,
      country: jwtHelperService.decodeToken(accessToken).country,
      phoneNumber: jwtHelperService.decodeToken(accessToken).phoneNumber,
      workplace: jwtHelperService.decodeToken(accessToken).workplace,
      companyName: jwtHelperService.decodeToken(accessToken).companyName,
      active: jwtHelperService.decodeToken(accessToken).active,
      lastPasswordResetDate: jwtHelperService.decodeToken(accessToken).lastPasswordResetDate,
      
    };
    this.user$.next(user);
  }
}
