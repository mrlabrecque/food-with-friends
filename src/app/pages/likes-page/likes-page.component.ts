import { Component, OnInit } from '@angular/core';
import { Matches } from 'src/app/models/matches.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-likes-page',
  templateUrl: './likes-page.component.html',
  styleUrls: ['./likes-page.component.scss'],
})
export class LikesPageComponent implements OnInit {
  currentUser: User;
  likes: Matches[];
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.authenticatedUser.value;
    if (this.currentUser) {
      this.likes = this.currentUser.likes;
    }
  }
}
