import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Matches } from 'src/app/models/matches.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-likes-page',
  templateUrl: './likes-page.component.html',
  styleUrls: ['./likes-page.component.scss'],
})
export class LikesPageComponent implements OnInit {
  currentUserSubscription: Subscription;
  likes: Restaurant[];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.currentUserLikes$.subscribe(likes => {
      this.likes = likes;
    });
  }
}
