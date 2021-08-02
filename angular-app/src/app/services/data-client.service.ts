import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DataClientService {

  constructor(private http: HttpClient) {
  }

  // For Read Operation
  public get<T>(url: string, params?: any): Observable<T> {
    return this.http.get<T>(url, { params: params });
  }

  // For Create Operation
  public post<T>(url: string, model: T): Observable<T> {
    return this.http.post<T>(url, model);
  }

}
