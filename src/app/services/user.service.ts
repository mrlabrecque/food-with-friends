/* eslint-disable no-underscore-dangle */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Restaurant } from '../models/restaurant.model';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: BehaviorSubject<User> = new BehaviorSubject(null);
  currentUserLikes$: BehaviorSubject<Restaurant[]> = new BehaviorSubject(null);
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private toastController: ToastController) { }
  getCurrentUser() {
  }
  getUserById(userId: number) {
    return this.http.get<any>(`${this.apiUrl}/v1/users/${userId}`);
  }
  getAddedMembersOnNewGroup(addedGroupMembers) {
    return this.http.post<any[]>(`${this.apiUrl}/v1/users/getusersbyemails`, addedGroupMembers);
  }
  addLikeToUser(like, userId: number) {
    return this.http.put<any>(`${this.apiUrl}/v1/users/${userId}/addlike`, like);
  }
  removeLikeFromUser(like, userId: number) {
    return this.http.put<any>(`${this.apiUrl}/v1/users/${userId}/removelike`, like);
  }

  addLike(rest, userId) {
    const like: Restaurant = { ...rest };
    this.addLikeToUser(like, userId).subscribe((res) =>
      this.addLikeSuccess(res));
  }
  async addLikeSuccess(likes) {
    this.currentUserLikes$.next(likes);
    const toast = await this.toastController.create({
      message: 'Like added',
      duration: 1000
    });
    toast.present();
  }
  removeLike(rest, userId) {
    const like: Restaurant = { ...rest };
    this.removeLikeFromUser(like, userId).subscribe((res) => {
      this.removeLikeSuccess(res);
    });
  }
  async removeLikeSuccess(likes) {
    this.currentUserLikes$.next(likes);
    const toast = await this.toastController.create({
      message: 'Like removed',
      duration: 1000
    });
    toast.present();
  }
}
