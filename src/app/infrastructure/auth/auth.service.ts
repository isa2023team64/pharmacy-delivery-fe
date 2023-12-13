import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  
  currentUser!:any;

  user$ = new BehaviorSubject<any>({
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
    lastPasswordResetDate: new Date(),
    roles: []
  });
    

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private router: Router,
  ) {}
  private access_token = null;

  /*login(login: Login): Observable<AuthenticationResponse> {
      console.log('Sending login request:', login);
      return this.http
          .post<AuthenticationResponse>('http://localhost:8080/auth/login', login)
          .pipe(
              tap((authenticationResponse) => {
                  console.log('Received authentication response:', authenticationResponse);
                  this.tokenStorage.saveAccessToken(authenticationResponse.accessToken);
                  this.setUser();
              })
          );
  }*/
  login(login: Login) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.http.post<any>('http://localhost:8080/auth/login', login, { headers })
      .pipe(map((res) => {
        console.log(res);
        this.access_token = res.accessToken;
        localStorage.setItem("jwt", res.accessToken);
        console.log(`Logged in as ${JSON.parse(atob(res.accessToken.split('.')[1])).sub}`);
            this.http.get<any>(`localhost:8080/api/registered-users/by-email/${JSON.parse(atob(res.accessToken.split('.')[1])).sub}`)
            .pipe(map(user => {
              this.currentUser = user;
              console.log(this.currentUser)
            }));
      }));
  }

  register(registration: Registration): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(environment.apiHost + 'registration', registration)
      .pipe(
        tap((authenticationResponse) => {
          this.tokenStorage.saveAccessToken(authenticationResponse.accessToken);
          console.log(authenticationResponse.accessToken)
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

  tokenIsPresent() {
    return this.access_token != undefined && this.access_token != null;
  }

  getToken() {
    return this.access_token;
  }

  logout(): void {
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

    localStorage.removeItem("jwt");
    this.access_token = null;
    this.router.navigate(['/login']);
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


  setUserInfo(email: string) {
    console.log("Setting current user info:"+ email);
    return this.http.get<any>(`${environment.apiHost}registered-users/by-email/${email}`)
    .pipe(map(user => {
      this.currentUser = user;
      return user;
    }));
  }
}
