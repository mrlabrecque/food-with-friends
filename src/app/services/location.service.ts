import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  userLat: BehaviorSubject<number> = new BehaviorSubject(null);
  userLong: BehaviorSubject<number> = new BehaviorSubject(null);

  constructor() { }

  getUserLocation() {
    Geolocation.getCurrentPosition()
      .then((res) => this.onGetCurrentPositionSuccess(res))
      .catch((res) => this.onGetCurrentPositionError(res));
  }
  onGetCurrentPositionSuccess(location) {
    this.userLat.next(location.coords.latitude);
    this.userLong.next(location.coords.longitude);
  }
  onGetCurrentPositionError(error) {
    console.log(error.message);
  }

}
