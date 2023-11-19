import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../../env/environment';
import { CompanyAdmin } from './model/company-admin.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyAdminService {
  basePath: string;

  constructor(private http: HttpClient) {
    this.basePath = environment.apiHost;
  }

  getById(id: number): Observable<CompanyAdmin> {
    const path = this.basePath + "company-administrators/" + id;
    return this.http.get<CompanyAdmin>(path);
  }

  update(id: number, updatedUser: any): Observable<CompanyAdmin> {
    const path = this.basePath + "company-administrators/" + id;
    console.log(path);
    return this.http.put<CompanyAdmin>(path, updatedUser);
  }
}
