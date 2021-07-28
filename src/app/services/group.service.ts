import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Group } from '../models/group-model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  apiUrl = 'http://localhost:3000/api';


  constructor(private http: HttpClient) { }
  public createGroup(newGroup: Group): Observable<Group> {
    return this.http.post<Group>(`${this.apiUrl}/groups/new`, newGroup);
  }
  public getGroupById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/groups/${id}`);
  }
  public getUsersGroupsByUserId(id: number): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiUrl}/groups/user/${id}`);

  }

  public updateGroupFilters(groupId: number, preparedGroup: Group): Observable<any> {
    const body = JSON.stringify(preparedGroup);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http.put<any>(`${this.apiUrl}/groups/updatefilters/${groupId}`, preparedGroup, { headers });

  }
}
