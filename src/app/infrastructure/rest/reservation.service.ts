import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorage } from '../auth/jwt/token.service';
import { Router } from '@angular/router';
import { environment } from '../../../env/environment';
import { Appointment } from './model/appointmen.model';
import { Observable } from 'rxjs';
import { AppointmentRequest } from './model/appointment-request.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  basePath: string;
  headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem("jwt")}`})

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private router: Router,
  ) {
    this.basePath = environment.apiHost;
  }

  createReservation(reservation: any): Observable<any> {
    const path = this.basePath + "reservations/regular";
    return this.http.post<any>(path, reservation, {headers: this.headers});
  }

  getUserAppointmentsByUserId(userId: number): Observable<any> {
    const path = this.basePath + "reservations/user-appointments/"+ userId;
    return this.http.get<Appointment[]>(path, {headers: this.headers});
  }

  createExtraordinaryReservation(reservation: any): Observable<any> {
    const path = this.basePath + "reservations/extraordinary";
    return this.http.post<any>(path, reservation, {headers: this.headers});
  }
}
