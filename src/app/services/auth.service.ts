/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-shadow */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { UserService } from './user.service';

const helper = new JwtHelperService();
const TOKEN_KEY = 'token';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = `${environment.apiUrl}`;
  authenticationState: BehaviorSubject<boolean> = new BehaviorSubject(false);

  user: any;
  loading;
  authenticatedUser: BehaviorSubject<User> = new BehaviorSubject(null);
  pageLoading$: BehaviorSubject<boolean> = new BehaviorSubject(null);

  constructor(private storage: Storage, private http: HttpClient, private plt: Platform,
    private helper: JwtHelperService, private router: Router, private alertController: AlertController, private userService: UserService,
    public loadingController: LoadingController) {
    this.storage.create();
    this.plt.ready().then(() => {
      this.loadStoredToken();
    });
  }
  loadStoredToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        const decoded = this.helper.decodeToken(token);
        const isExpired = this.helper.isTokenExpired(token);
        if (!isExpired) {
          this.user = decoded;
          this.setAuthenticatedUser();

        } else {
          this.storage.remove(TOKEN_KEY);
        }
      }
    });
  }
  setAuthenticatedUser() {
    this.userService.getUserById(+this.user.id).subscribe((res) => this.setAuthenticatedUserSuccess(res));
  }
  setAuthenticatedUserSuccess(user: User) {
    this.authenticatedUser.next(user);
    this.authenticationState.next(true);
    this.userService.isPro$.next(user.premium);
  }
  refreshUser() {
    this.userService.getUserById(+this.user.id).subscribe((res) => this.authenticatedUser.next(res));
  }
  login(credentials) {
    return this.http.post(`${this.apiUrl}/v1/users/login`, credentials)
      .pipe(
        tap(res => {
          this.storage.set(TOKEN_KEY, res['token']);
          this.user = this.helper.decodeToken(res['token']);
          this.setAuthenticatedUser();
          // this.authenticatedUser.next(this.user.user);
          // this.authenticationState.next(true);
        }),
        catchError(e => {
          this.showAlert(e.error.msg);
          throw new Error(e);
        })
      );
  }
  register(credentials) {
    return this.http.post(`${this.apiUrl}/v1/users/register`, credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }
  getUser() {
    return this.authenticatedUser.getValue();
  }
  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl('/');
      this.authenticationState.next(false);
      this.authenticatedUser.next(null);
    });
  }
  getSpecialData() {
    return this.http.get(`${this.apiUrl}/v1/users/special`).pipe(
      catchError(e => {
        const status = e.status;
        if (status === 401) {
          this.showAlert('You are not authorized for this!');
          this.logout();
        }
        throw new Error(e);
      })
    );
  }
  isAuthenticated() {
    return this.authenticationState.value;
  }

  showAlert(msg) {
    const alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }



  openLoader() {
    this.loadingController.create({
    }).then((response) => {
      response.present();
    });
    this.pageLoading(true);
  }
  pageLoading(loading: boolean) {
    this.pageLoading$.next(loading);
  }
  loadingComplete() {
    this.loadingController.dismiss().then((response) => {
      console.log('Loader closed!', response);
    }).catch((err) => {
      console.log('Error occured : ', err);
    });
    this.pageLoading(false);
  }
}
