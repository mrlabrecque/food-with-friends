import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { mergeMap } from 'rxjs/operators';
import { LocationService } from './services/location.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private locationService: LocationService, public auth: AuthService) {
    this.locationService.getUserLocation();
  }
  ngOnInit(): void {
    // Use Capacitor's App plugin to subscribe to the `appUrlOpen` event
    App.addListener('appUrlOpen', ({ url }) => {
      if (url?.startsWith('callbackUri')) {
        // If the URL is an authentication callback URL..
        if (
          url.includes('state=') &&
          (url.includes('error=') || url.includes('code='))
        ) {
          // Call handleRedirectCallback and close the browser
          this.auth
            .handleRedirectCallback(url)
            .pipe(mergeMap(() => Browser.close()))
            .subscribe();
        } else {
          Browser.close();
        }
      }
    });
  }
}
