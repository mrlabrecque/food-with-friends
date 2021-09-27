import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '@ionic/angular';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  addMatch(groupId, restaurantToAdd) {
    console.log(restaurantToAdd);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.put<any>(`${this.apiUrl}/v1/groups/${groupId}/addmatch`, restaurantToAdd, { headers });
  }
  updateMatch(groupId, restaurantToAdd) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.put<any>(`${this.apiUrl}/v1/groups/${groupId}/updatematch`, restaurantToAdd, { headers });
  }
}
