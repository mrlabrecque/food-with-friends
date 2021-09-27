/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable arrow-body-style */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { Storage } from '@ionic/storage-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2/ngx';
export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get('access_token');
    },
    whitelistedDomains: [environment.apiUrl]
  };
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage],
      }
    })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, InAppPurchase2],
  bootstrap: [AppComponent],
})
export class AppModule { }
