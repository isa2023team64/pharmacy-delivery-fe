import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../../env/environment';
import { SystemAdmin } from './model/system-admin.model';

@Injectable({
  providedIn: 'root'
})
export class SystemAdminService {
  basePath: string;
  headers: HttpHeaders = new HttpHeaders({'COntent-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem("jwt")}`})
  constructor(private http: HttpClient) {
    this.basePath = environment.apiHost;
  }

  getById(id: number): Observable<any> {
    const path = this.basePath + "system-administrators/" + id;
    return this.http.get<any>(path);
  }

  update(id: number, updatedUser: any): Observable<any> {
    const path = this.basePath + "system-administrators/" + id;
    console.log(path);
    return this.http.put<any>(path, updatedUser);
  }

  getByName(name: String): Observable<any> {
    const path = this.basePath + "system-administrators/by-email";
    return this.http.put<any>(path, name);
  }
}
