import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  apiUrl = 'https://localhost:3000/api';
  constructor(private http: HttpClient) { }
  addMatch(groupId, restaurantToAdd) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.put<any>(`${this.apiUrl}/groups/${groupId}/addmatch`, restaurantToAdd, { headers });
  }
}
