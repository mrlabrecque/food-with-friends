import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: any = {
    _id: 2,
    name: 'Harry Potter',
    email: 'harrypotter@hogwarts.com',
    avatar: ''
  };
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getCurrentUser() {
    return this.currentUser;
  }
  getAddedMembersOnNewGroup(addedGroupMembers) {
    return this.http.post<any[]>(`${this.apiUrl}/v1/users/getusersbyemails`, addedGroupMembers);
  }
}
