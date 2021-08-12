/* eslint-disable no-underscore-dangle */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: BehaviorSubject<User> = new BehaviorSubject(null);
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getCurrentUser() {
  }
  getUserById(userId: number) {
    return this.http.get<any>(`${this.apiUrl}/v1/users/${userId}`);
  }
  getAddedMembersOnNewGroup(addedGroupMembers) {
    return this.http.post<any[]>(`${this.apiUrl}/v1/users/getusersbyemails`, addedGroupMembers);
  }
  addLikeToUser(like) {
    const userId = this.currentUser.value._id;
    return this.http.post<any>(`${this.apiUrl}/v1/users/${userId}/addlike`, like);
  }
}
