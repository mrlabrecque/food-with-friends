import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: any = {
    _id: 0,
    name: "Harry Potter",
    email: "harrypotter@hogwarts.com",
    avatar: ''
  };
  apiUrl = 'https://localhost:3000/api';
  constructor(private http: HttpClient) { }
  getCurrentUser() {
    return this.currentUser;
  }
  getAddedMembersOnNewGroup(addedGroupMembers) {
    return this.http.post<any[]>(`${this.apiUrl}/users/getusersbyemails`, addedGroupMembers);
  }
}
