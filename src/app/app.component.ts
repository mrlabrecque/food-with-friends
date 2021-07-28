import { Component } from '@angular/core';
import { LocationService } from './location.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public loggedUser: any = {
    name: 'Martin Labrecque', email: 'mrlabrecque@gmail.com'
  };
  public appPages = [
    { title: 'Food with Friends', url: '/folder/Home', icon: 'Home' },
    { title: 'Match', url: '/folder/Match', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Groups', url: '/folder/Groups', icon: 'people' },
    { title: 'Settings', url: '/folder/Settings', icon: 'stopwatch' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private locationService: LocationService) {
    this.locationService.getUserLocation();
  }
}
