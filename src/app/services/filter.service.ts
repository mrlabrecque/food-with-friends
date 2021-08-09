/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Group } from '../models/group-model';
import { Param } from '../models/param-model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  apiUrl = environment.apiUrl;
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Access-Control-Allow-Headers', 'Content-Type');

  constructor(private http: HttpClient) { }
  public getFilterObjectById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/v1/filters/${id}`);
  }
  public getFilterParamObjectById(id: number, param: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/v1/filters/${param}/${id}`);
  }
}
