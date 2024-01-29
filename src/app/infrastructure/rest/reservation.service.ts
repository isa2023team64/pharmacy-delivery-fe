import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorage } from '../auth/jwt/token.service';
import { Router } from '@angular/router';
import { environment } from '../../../env/environment';
import { Appointment } from './model/appointmen.model';
import { Observable } from 'rxjs';
import { AppointmentRequest } from './model/appointment-request.model';
import { ReservationItem } from './model/reservation-item-qr';
import { Reservation } from './model/reservation-qr';

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

  getReservationItemsByReservationId(reservationId: number): Observable<ReservationItem[]> {
    const path = this.basePath + "reservations/reservation-items-by-reservation-id/" + reservationId;
    return this.http.get<ReservationItem[]>(path, { headers: this.headers });
  }

  getById(reservationId: number): Observable<any>{
    const path = this.basePath + "reservations/" + reservationId;
    return this.http.get<Reservation>(path, { headers: this.headers });    
  }

  markAsTakenQR(reservationId: number): Observable<any>{
    const path = this.basePath + "reservations/mark-as-taken/" + reservationId;
    return this.http.patch<any>(path, { headers: this.headers });
  }

}
