import { Injectable } from '@angular/core';
import { Config } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeService {
  mode$: BehaviorSubject<string> = new BehaviorSubject(null);
  constructor(private config: Config) { }
  getMode() {
    this.mode$.next(this.config.get("mode"));
  }
}
