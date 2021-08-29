import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Matches } from 'src/app/models/matches.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-likes-page',
  templateUrl: './likes-page.component.html',
  styleUrls: ['./likes-page.component.scss'],
})
export class LikesPageComponent implements OnInit {
  currentUserSubscription: Subscription;
  likes: BehaviorSubject<Matches[]> = new BehaviorSubject(null);
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.currentUserSubscription = this.authService.authenticatedUser.subscribe(user => {
      this.likes.next(user.likes);
    });
  }
}
