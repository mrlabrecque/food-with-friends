import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { TooltipsModule } from 'ionic4-tooltips';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RestaurantService } from './restaurant.service';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocationService } from './location.service';
// import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';

@NgModule({
  declarations: [AppComponent
  ],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    TooltipsModule.forRoot(),
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, RestaurantService, LocationService, AsyncPipe, JsonPipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
