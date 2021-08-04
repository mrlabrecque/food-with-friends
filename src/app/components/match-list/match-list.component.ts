/* eslint-disable no-underscore-dangle */
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Matches } from 'src/app/models/matches.model';
import { User } from 'src/app/models/user.model';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss'],
})
export class MatchListComponent implements OnInit, OnChanges {

  @Input() cardData: Matches[];
  @Input() groupOwner: User;
  currentUserId: number;
  isLoggedUserGroupOwner = false;
  constructor(private userService: UserService, private groupService: GroupService) { }

  ngOnInit() {
    this.currentUserId = this.userService.getCurrentUser()._id;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.groupOwner) {
      this.isLoggedUserGroupOwner = this.currentUserId === this.groupOwner._id ? true : false;
    }
  }
  removeMember(memberToRemove) {
    // this.groupService.removeMemberFromGroup(memberToRemove._id).subscribe(res => this.reloadGroup());
  }
  reloadGroup() {
    // this.groupService.refreshGroup();
  }

}
