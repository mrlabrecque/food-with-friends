import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'env';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  baseUrl = environment.restaurantApiBaseURL;
  apiKey = environment.restaurantApiKey;
  httpOptions = {
    headers: new HttpHeaders({
      authorization: `Bearer ${this.apiKey}`,
      accept: 'jsonp',
      'x-requested-with': 'xmlhttprequest',
      'content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Access-Control-Allow-Origin': '*',
    }),
    params: new HttpParams().set('limit', '50')
  };
  allRestaurants: any;
  filteredRestaurants$: BehaviorSubject<any[]> = new BehaviorSubject(null);


  constructor(private http: HttpClient) { }



  // Get all posts from the API
  getAllRestaurants() {
    return this.http.get(`${this.baseUrl}search?`, this.httpOptions).pipe(map(res => res[Object.keys(res)[0]]));
  }
  searchRestaurants(params: HttpParams) {
    this.httpOptions.params = params;
    return this.http.get(`${this.baseUrl}search?`, this.httpOptions).pipe(map(res => res[Object.keys(res)[0]]));
  }
}
