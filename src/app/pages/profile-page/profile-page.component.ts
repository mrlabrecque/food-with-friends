import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  currentUser: User;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.currentUser = this.auth.authenticatedUser.value;
  }
  onLogoutClicked() {
    this.auth.logout();
  }
}
