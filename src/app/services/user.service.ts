import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  getAddedMembersOnNewGroup(addedGroupMembers) {
    return this.http.post<any[]>(`${this.apiUrl}/users/getusersbyemails`, addedGroupMembers);
  }
}
