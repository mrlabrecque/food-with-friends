import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Group } from '../models/group-model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  currentGroupId: number;
  currentGroupFilters$: BehaviorSubject<Group> = new BehaviorSubject(null);
  apiUrl = 'https://localhost:3000/api';


  constructor(private http: HttpClient) { }

  public updateCurrentGroupFilters(updatedGroupFilters) {
    this.currentGroupFilters$.next(updatedGroupFilters);
  }
  public createGroup(newGroup: Group): Observable<Group> {
    return this.http.post<Group>(`${this.apiUrl}/groups/new`, newGroup);
  }
  public deleteGroupById(id: number): Observable<any[]> {
    return this.http.delete<any[]>(`${this.apiUrl}/groups/${id}/delete`);
  }
  public getGroupById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/groups/${id}`);
  }
  public getUsersGroupsByUserId(id: number): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiUrl}/groups/user/${id}`);

  }
  public refreshGroup() {
    this.getGroupById(this.currentGroupId);
  }

  public updateGroupFilters(groupId: number, preparedGroup: Group): Observable<any> {
    const body = JSON.stringify(preparedGroup);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http.put<any>(`${this.apiUrl}/groups/${groupId}/updatefilters`, preparedGroup, { headers });

  }
  public removeMemberFromGroup(memberIdToRemove: number): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    const removeMember = { groupId: this.currentGroupId, memberId: memberIdToRemove };
    console.log(`${this.apiUrl}/groups/${this.currentGroupId}/removemember/${memberIdToRemove}`);
    return this.http.put<any>(`${this.apiUrl}/groups/${this.currentGroupId}/removemember/${memberIdToRemove}`, removeMember, { headers });
  }
  public addMembersToGroup(membersToBeAdded) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.put<any>(`${this.apiUrl}/groups/${this.currentGroupId}/addmembers`, membersToBeAdded, { headers });
  }
}
