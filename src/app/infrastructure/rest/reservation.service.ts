import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorage } from '../auth/jwt/token.service';
import { Router } from '@angular/router';
import { environment } from '../../../env/environment';
import { Appointment } from './model/appointmen.model';
import { Observable } from 'rxjs';
import { Reservation } from './model/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  basePath: string;
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  });

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private router: Router
  ) {
    this.basePath = environment.apiHost;
  }

  createReservation(reservation: any): Observable<any> {
    const path = this.basePath + 'reservations/regular';
    return this.http.post<any>(path, reservation, { headers: this.headers });
  }

  getUserAppointmentsByUserId(userId: number): Observable<any> {
    const path = this.basePath + 'reservations/user-appointments/' + userId;
    return this.http.get<Appointment[]>(path, { headers: this.headers });
  }

  createExtraordinaryReservation(reservation: any): Observable<any> {
    const path = this.basePath + 'reservations/extraordinary';
    return this.http.post<any>(path, reservation, { headers: this.headers });
  }

  deleteReservation(reservationId: any): Observable<any> {
    const path =
      this.basePath + 'reservations/deleteReservation/' + reservationId;
    return this.http.delete<any>(path, { headers: this.headers });
  }

  getReservationsByCompanyId(companyId: number): Observable<Reservation[]> {
    const path = this.basePath + 'reservations/by-company/' + companyId;
    return this.http.get<Reservation[]>(path, { headers: this.headers });
  }

  markAsTaken(reservation: Reservation): Observable<any> {
    const path = this.basePath + 'reservations/mark-as-taken/' + reservation.id;
    return this.http.patch<any>(path, { headers: this.headers });
  }
}
