import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../../env/environment';
import { RegisteredUser } from './model/registered-user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisteredUserService {
  basePath: string;

  constructor(private http: HttpClient) {
    this.basePath = environment.apiHost;
  }

  getById(id: number): Observable<RegisteredUser> {
    const path = this.basePath + "registered-users/" + id;
    return this.http.get<RegisteredUser>(path);
  }

  update(id: number, updatedUser: any): Observable<RegisteredUser> {
    const path = this.basePath + "registered-users/" + id;
    return this.http.put<RegisteredUser>(path, updatedUser);
  }
}
