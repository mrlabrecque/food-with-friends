import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { LocationService } from './services/location.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private authService: AuthService,
    private router: Router,
    private locationService: LocationService
  ) {
    let incomingUrl = window.location.href;
    if (incomingUrl.indexOf('restaurant') === -1) {
      this.initializeApp();
    } else {
      incomingUrl = incomingUrl.substring(incomingUrl.indexOf('/restaurant/') + 1);
      this.router.navigateByUrl(`${incomingUrl}`);
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.authService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigateByUrl('/members');
          this.locationService.getUserLocation();
        } else {
          this.router.navigateByUrl('/');
        }
      });

    });
  }
}
