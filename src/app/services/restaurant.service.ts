/* eslint-disable max-len */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { env } from 'process';
import { environment } from 'src/environments/environment';
import { Restaurant } from '../models/restaurant.model';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  public restaurantResults$: BehaviorSubject<Restaurant[]> = new BehaviorSubject(null);


  private yelpApiKey = environment.yelpApi;
  private yelpApiBaseUrl = "https://api.yelp.com/v3/businesses";
  private proxyUrl = environment.corsUrl;
  private headerDict = {
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${this.yelpApiKey}`
  };
  private requestOptions = new HttpHeaders(this.headerDict);
  constructor(private http: HttpClient) { }

  searchRestaurants(parametersToRequest) {
    return this.http.get(`${this.proxyUrl}/${this.yelpApiBaseUrl}/search`, { headers: this.requestOptions, params: parametersToRequest }).pipe(
      map((res: any) => {
        const restaurants: Restaurant[] = res.businesses;
        _.each(restaurants, rest => {
          rest.liked = false;
        });
        return restaurants;
      })
    );
  }

  // Get all posts from the API
}
