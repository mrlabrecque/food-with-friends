/* eslint-disable no-underscore-dangle */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Group } from 'src/app/models/group-model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss'],
})
export class GroupsPageComponent implements OnInit, OnDestroy {
  currentUser: User;
  usersGroups: Group[];
  usersGroupsSubscription: Subscription;

  constructor(private groupService: GroupService, private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.authenticatedUser.value;
    this.usersGroupsSubscription = this.groupService.getUsersGroupsByUserId(this.currentUser._id).subscribe(
      res => this.usersGroups = res
    );
  }
  ngOnDestroy() {
    this.usersGroupsSubscription.unsubscribe();
  }
}
